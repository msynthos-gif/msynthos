import os
import json
import random
import time
import re
import firebase_admin
from firebase_admin import credentials, firestore
from openai import OpenAI

# 1. Firebase Initialize
service_account_info = json.loads(os.environ["FIREBASE_SERVICE_ACCOUNT"])
cred = credentials.Certificate(service_account_info)
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)
db = firestore.client()

# 2. OpenRouter OpenAI-Compatible Client Setup
OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY")
if not OPENROUTER_API_KEY:
    raise ValueError("OPENROUTER_API_KEY environment variable is not set.")

OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"

client = OpenAI(
    base_url=OPENROUTER_BASE_URL,
    api_key=OPENROUTER_API_KEY,
    default_headers={
        "HTTP-Referer": "https://msynthos.online",
        "X-Title": "Msynthos Minijob Rechner"
    }
)

# OpenRouter Free Models with Automatic Fallback
MODELS = [
    "meta-llama/llama-3.3-70b-instruct:free",
    "deepseek/deepseek-chat:free",
    "qwen/qwen-2.5-72b-instruct:free"
]

def generate_with_fallback(prompt):
    for model_name in MODELS:
        try:
            print(f"Trying generation with OpenRouter model: {model_name}")
            response = client.chat.completions.create(
                model=model_name,
                messages=[
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
            )

            if response and response.choices and len(response.choices) > 0:
                content = response.choices[0].message.content
                if content and content.strip():
                    print(f"Success with {model_name}!")
                    return content
        except Exception as e:
            print(f"Failed with {model_name}: {e}. Waiting 3s before fallback...")
            time.sleep(3)
    raise RuntimeError("All OpenRouter models failed in the fallback chain.")

# 3. German Minijob Niche Keywords Pool
KEYWORD_TOPICS = [
    {
        "keyword": "Urlaubsanspruch Minijob 2026",
        "angle": "Berechnung der gesetzlichen Urlaubstage beim 603-Euro-Job nach Bundesurlaubsgesetz (BUrlG) mit Rechenbeispielen."
    },
    {
        "keyword": "Minijob Höchstarbeitszeit Mindestlohn 13,90 Euro",
        "angle": "Wie viele Stunden darf man 2026 maximal pro Monat arbeiten, um die 603 € Geringfügigkeitsgrenze nicht zu überschreiten?"
    },
    {
        "keyword": "Rentenversicherungspflicht Minijob Befreiung",
        "angle": "Vor- und Nachteile der 3,6 % Eigenleistung: Lohnt sich die Befreiung oder verliert man wichtige Reha- und Rentenansprüche?"
    },
    {
        "keyword": "Zwei Minijobs gleichzeitig Steuern",
        "angle": "Mehrfachbeschäftigung: Was passiert, wenn zwei Minijobs zusammen über 603 Euro steigen? Ab wann greift der Übergangsbereich?"
    },
    {
        "keyword": "Lohnfortzahlung im Krankheitsfall Minijob",
        "angle": "Rechte von Minijobbern nach dem Entgeltfortzahlungsgesetz (EFZG) bei Krankheit und Feiertagen."
    },
    {
        "keyword": "Minijob neben Hauptberuf Steuern 2026",
        "angle": "Minijob als Nebenjob zu einer versicherungspflichtigen Vollzeitstelle: Abgabenfreiheit des ersten Minijobs."
    },
    {
        "keyword": "Midijob Übergangsbereich 2026",
        "angle": "Gleitzone zwischen 603,01 € und 2.000 €: Wie berechnen sich die reduzierten Sozialabgaben für Arbeitnehmer?"
    }
]

selected_topic = random.choice(KEYWORD_TOPICS)

# 4. Strict German SEO Prompt
prompt = f"""
Du bist ein führender deutscher Fachredakteur für Arbeitsrecht und Lohnabrechnung.
Erstelle einen detaillierten, SEO-optimierten Fachartikel für das Portal https://msynthos.online/de/minijob-rechner.

Fokus-Thema: "{selected_topic['keyword']}"
Inhaltlicher Schwerpunkt: {selected_topic['angle']}
Aktuelle Gesetzeslage: 2026 (Mindestlohn 13,90 €/Std., Geringfügigkeitsgrenze 603,00 €).

Formatierungs-Regeln:
1. Gib die Antwort STRENG als valides JSON-Objekt zurück. Kein Markdown-Codeblock um das JSON herum (kein ```json).
2. Das JSON muss folgende Keys enthalten:
   - "title": Ein klickstarker, suchmaschinenoptimierter deutscher H1-Titel (maximal 70 Zeichen).
   - "slug": URL-tauglicher Slug (z.B. "urlaubsanspruch-minijob-2026-berechnen").
   - "excerpt": Kurze prägnante Zusammenfassung (140-160 Zeichen).
   - "readTime": Lesezeit als String (z.B. "5 Min. Lesezeit").
   - "contentHtml": Der gesamte Artikeltext in sauberem HTML (nutze <h2>, <h3>, <p>, <ul>, <li>, <strong>, keine <h1>). Umfang: ca. 600-800 Wörter. Erwähne gesetzliche Paragraphen (z.B. § 8 SGB IV, BUrlG, EFZG). Baue einen natürlichen Verweis auf unseren kostenlosen Minijob-Rechner ein ("Nutzen Sie unseren Rechner oben...").
   - "faqs": Eine Liste von genau 3 Fragen und Antworten im Format [{{"question": "...", "answer": "..."}}].
   - "keywords": Array mit 4-6 relevanten deutschen Suchbegriffen.
"""

raw_output = generate_with_fallback(prompt)

cleaned_json = raw_output.strip()
if "```" in cleaned_json:
    match = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", cleaned_json)
    if match:
        cleaned_json = match.group(1).strip()
else:
    match = re.search(r"(\{[\s\S]*\})", cleaned_json)
    if match:
        cleaned_json = match.group(1).strip()

data = json.loads(cleaned_json)
data["createdAt"] = firestore.SERVER_TIMESTAMP
data["status"] = "published"

slug = data["slug"]
doc_ref = db.collection("german_blog_posts").document(slug)
doc_ref.set(data)
print(f"Successfully published blog post: '{data['title']}' to Firestore collection 'german_blog_posts'.")

# Also save local backup copy to ensure repository sync
try:
    posts_dir = os.path.join(os.path.dirname(__file__), "..", "public", "posts")
    os.makedirs(posts_dir, exist_ok=True)
    post_backup_path = os.path.join(posts_dir, f"{slug}.json")
    backup_payload = {k: v for k, v in data.items() if k != "createdAt"}
    backup_payload["createdAt"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    with open(post_backup_path, "w", encoding="utf-8") as f:
        json.dump(backup_payload, f, ensure_ascii=False, indent=2)
    print(f"Saved local backup: {post_backup_path}")
except Exception as e:
    print(f"Warning: could not write local backup: {e}")
