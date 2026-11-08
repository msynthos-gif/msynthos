import os
import json
import random
import time
import re
import firebase_admin
from firebase_admin import credentials, firestore

# 1. Firebase Initialize
service_account_info = json.loads(os.environ["FIREBASE_SERVICE_ACCOUNT"])
cred = credentials.Certificate(service_account_info)
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)
db = firestore.client()

# 2. Gemini Multi-Model Fallback Setup
GEMINI_API_KEY = os.environ["GEMINI_API_KEY"]

try:
    from google import genai
    client = genai.Client(api_key=GEMINI_API_KEY)
    USE_NEW_GENAI = True
except ImportError:
    import google.generativeai as genai
    genai.configure(api_key=GEMINI_API_KEY)
    USE_NEW_GENAI = False

MODELS = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite",
    "gemini-flash-latest",
    "gemini-flash-lite-latest"
]

def generate_with_fallback(prompt):
    for model_name in MODELS:
        try:
            print(f"Trying generation with: {model_name}")
            if USE_NEW_GENAI:
                response = client.models.generate_content(
                    model=model_name,
                    contents=prompt
                )
            else:
                model = genai.GenerativeModel(model_name)
                response = model.generate_content(prompt)

            if response and response.text:
                print(f"Success with {model_name}!")
                return response.text
        except Exception as e:
            print(f"Failed with {model_name}: {e}. Waiting 3s before fallback...")
            time.sleep(3)
    raise RuntimeError("All Gemini models failed in the fallback chain.")

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

cleaned_json = re.sub(r"^```json\s*", "", raw_output.strip())
cleaned_json = re.sub(r"\s*```$", "", cleaned_json)

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
