import os
import json
import random
import time
import re
# Graceful optional imports for maximum resilience
HAS_FIREBASE = False
try:
    import firebase_admin
    from firebase_admin import credentials, firestore
    HAS_FIREBASE = True
except ImportError:
    print("[Firebase] Notice: firebase_admin module not installed. Running in local static mode.")

HAS_OPENAI = False
try:
    from openai import OpenAI
    HAS_OPENAI = True
except ImportError:
    print("[OpenRouter] Notice: openai module not installed. Running in local topic bank mode.")

# 1. Firebase Initialize (Non-blocking fallback)
db = None
if HAS_FIREBASE:
    try:
        if "FIREBASE_SERVICE_ACCOUNT" in os.environ and os.environ["FIREBASE_SERVICE_ACCOUNT"]:
            service_account_info = json.loads(os.environ["FIREBASE_SERVICE_ACCOUNT"])
            cred = credentials.Certificate(service_account_info)
            if not firebase_admin._apps:
                firebase_admin.initialize_app(cred)
            db = firestore.client()
            print("[Firebase] Initialized Firestore successfully.")
        else:
            print("[Firebase] No FIREBASE_SERVICE_ACCOUNT provided, using local static storage mode.")
    except Exception as fe:
        print(f"[Firebase] Initialization note: {fe}. Continuing in local storage mode.")

# 2. OpenRouter OpenAI-Compatible Client Setup
OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY")
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"

client = None
if HAS_OPENAI and OPENROUTER_API_KEY:
    try:
        client = OpenAI(
            base_url=OPENROUTER_BASE_URL,
            api_key=OPENROUTER_API_KEY,
            default_headers={
                "HTTP-Referer": "https://msynthos.online",
                "X-Title": "MSynthos Auto SEO Blogger"
            }
        )
    except Exception as ce:
        print(f"[OpenRouter] Client initialization error: {ce}")
elif not OPENROUTER_API_KEY:
    print("[OpenRouter] OPENROUTER_API_KEY is not set. Will proceed with local topic bank fallback.")

# 1. Currently active free OpenRouter models with priority fallback
FALLBACK_MODELS = [
    "google/gemini-2.0-flash-exp:free",
    "meta-llama/llama-3.2-3b-instruct:free",
    "mistralai/mistral-7b-instruct:free",
    "google/gemini-2.0-flash-thinking-exp:free"
]

def generate_with_fallback(prompt):
    if not client:
        return None

    for model_name in FALLBACK_MODELS:
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
            print(f"Notice: Failed with {model_name}: {e}. Trying next model...")
            time.sleep(2)

    print("[OpenRouter] All free models in fallback chain were unavailable.")
    return None

# 3. Built-in High-Value German Minijob 2026 Topic Bank (15 Expert Articles)
FALLBACK_TOPIC_BANK = [
    {
        "slug": "minijob-nebenjob-hauptberuf-steuern-2026",
        "title": "Minijob als Nebenjob neben dem Hauptberuf: Steuer- & Abgabenregeln 2026",
        "excerpt": "Wer neben dem Hauptberuf einen Minijob bis 603 Euro ausübt, profitiert von völliger Abgabenfreiheit. Welche Regeln bei mehreren Nebenjobs gelten.",
        "readTime": "5 Min. Lesezeit",
        "keywords": ["Minijob Nebenjob", "Zweitjob Steuern", "Hauptbeschäftigung Minijob", "603 Euro Nebenjob", "Steuerklasse 6 vermeiden"],
        "faqs": [
            {
                "question": "Muss der Arbeitgeber des Hauptberufs den Minijob genehmigen?",
                "answer": "Grundsätzlich besteht Informationspflicht, wenn dies im Arbeits- oder Tarifvertrag vereinbart ist. Ein Verbot ist nur zulässig bei berechtigten betrieblichen Interessen, z.B. bei Konkurrenztätigkeit oder Überschreitung der gesetzlichen Höchstarbeitszeit von 48 Wochenstunden nach Arbeitszeitgesetz."
            },
            {
                "question": "Ist der erste Minijob neben einer Vollzeitstelle steuerfrei?",
                "answer": "Ja, genau ein Minijob bis 603 Euro monatlich bleibt neben einer versicherungspflichtigen Hauptbeschäftigung sozialabgaben- und steuerfrei für den Arbeitnehmer (§ 8 Abs. 2 SGB IV)."
            },
            {
                "question": "Was passiert bei einem zweiten Minijob neben dem Hauptberuf?",
                "answer": "Jeder zweite und weitere Minijob wird mit der Hauptbeschäftigung zusammengerechnet und über Steuerklasse VI voll versicherungs- und steuerpflichtig abgerechnet."
            }
        ],
        "contentHtml": """
            <h2>Der Minijob als lukrativer Zuverdienst zur Hauptbeschäftigung</h2>
            <p>Die Kombination aus einer sozialversicherungspflichtigen Haupttätigkeit und einem 603-Euro-Minijob ist in Deutschland eines der beliebtesten Arbeitszeitmodelle. Der Gesetzgeber räumt Minijobbern hierbei ein bedeutendes Privileg ein: <strong>Genau ein Minijob bleibt komplett beitragsfrei in Kranken-, Pflege- und Arbeitslosenversicherung</strong>.</p>
            <h3>Die rechtliche Sonderstellung des ersten Minijobs</h3>
            <p>Gemäß § 8 Abs. 2 Satz 1 SGB IV wird der erste geringfügig entlohnte Nebenjob nicht mit der versicherungspflichtigen Hauptbeschäftigung zusammengerechnet. Das bedeutet: Verdienen Sie in Vollzeit 3.500 Euro brutto und im Nebenjob 603 Euro, erhalten Sie vom Minijob-Gehalt bei Befreiung von der Rentenversicherungspflicht exakt <strong>603,00 Euro netto ausgezahlt</strong>.</p>
            <p>Nutzen Sie unseren kostenlosen <a href="/de/minijob-rechner">Minijob-Rechner 2026</a> oben, um die genauen Abgaben und Arbeitgeberbelastungen transparent zu berechnen.</p>
            <h3>Falle Mehrfachbeschäftigung: Der zweite Minijob</h3>
            <p>Sobald ein Arbeitnehmer neben dem Hauptberuf einen <em>zweiten</em> Minijob aufnimmt, greift die gesetzliche Zusammenrechnung (§ 8 Abs. 2 Satz 2 SGB IV). Der zweite Minijob verliert den Geringfügigkeitsstatus und unterliegt der vollen Steuer- und Sozialversicherungspflicht über die elektronische Lohnsteuerkarte (in der Regel ungünstige Steuerklasse VI).</p>
        """
    },
    {
        "slug": "minijob-kuendigungsschutz-fristen-bgb-2026",
        "title": "Kündigungsschutz & Kündigungsfristen im Minijob nach § 622 BGB",
        "excerpt": "Geringfügig Beschäftigte haben die gleichen Rechte wie Vollzeitkräfte: Kündigungsfristen, Schriftformerfordernis und Sonderkündigungsschutz im Detail.",
        "readTime": "5 Min. Lesezeit",
        "keywords": ["Kündigungsfrist Minijob", "Kündigungsschutzgesetz Minijob", "§ 622 BGB", "Fristlose Kündigung Minijob", "Arbeitsrecht Minijobber"],
        "faqs": [
            {
                "question": "Welche gesetzliche Kündigungsfrist gilt für Minijobber?",
                "answer": "Nach § 622 Abs. 1 BGB gilt die Grundkündigungsfrist von vier Wochen zum 15. oder zum Ende eines Kalendermonats, sofern keine Probezeit oder vertragliche Sonderregelung vereinbart wurde."
            },
            {
                "question": "Reicht eine Kündigung per E-Mail oder WhatsApp aus?",
                "answer": "Nein. Jede Kündigung bedarf zwingend der strengen Schriftform mit handschriftlicher Originalunterschrift auf Papier (§ 623 BGB). Kündigungen per SMS, WhatsApp, E-Mail oder Fax sind unwirksam."
            },
            {
                "question": "Gilt das Kündigungsschutzgesetz (KSchG) auch bei 603-Euro-Jobs?",
                "answer": "Ja, wenn der Betrieb in der Regel mehr als 10 Vollzeit-Arbeitnehmer beschäftigt und das Arbeitsverhältnis länger als 6 Monate bestanden hat (§ 1 KSchG)."
            }
        ],
        "contentHtml": """
            <h2>Voller Kündigungsschutz für Minijobber nach deutschem Arbeitsrecht</h2>
            <p>Ein weit verbreiteter Irrglaube lautet, Minijobber könnten jederzeit grundlos oder von heute auf morgen entlassen werden. Nach dem Gleichbehandlungsgrundsatz des Teilzeit- und Befristungsgesetzes (§ 4 TzBfG) genießen Minijobber jedoch <strong>exakt dieselben arbeitsrechtlichen Schutzrechte wie Vollzeitangestellte</strong>.</p>
            <h3>Gesetzliche Kündigungsfristen nach § 622 BGB</h3>
            <p>Ohne abweichende tarifliche Regelung gilt die gesetzliche Grundkündigungsfrist:</p>
            <ul>
                <li><strong>Grundfrist:</strong> 4 Wochen zum 15. oder zum Monatsende (§ 622 Abs. 1 BGB).</li>
                <li><strong>In der Probezeit:</strong> 2 Wochen zu jedem beliebigen Kalendertag (Probezeit max. 6 Monate, § 622 Abs. 3 BGB).</li>
                <li><strong>Verlängerte Fristen bei langer Betriebszugehörigkeit:</strong> Mit steigender Betriebszugehörigkeit verlängert sich die Kündigungsfrist für den Arbeitgeber schrittweise auf bis zu 7 Monate bei 20 Dienstjahren (§ 622 Abs. 2 BGB).</li>
            </ul>
            <p>Berechnen Sie Ihre Nettolöhne und Arbeitgeberbeiträge unkompliziert mit unserem aktuellen <a href="/de/minijob-rechner">Minijob-Rechner 2026</a>.</p>
            <h3>Besonderer Kündigungsschutz</h3>
            <p>Schwangere Minijobberinnen (Mutterschutzgesetz § 17 MuSchG), schwerbehinderte Minijobber (§ 168 SGB IX) und Eltern in Elternzeit (§ 18 BEEG) genießen unkündbaren Sonderschutz. Eine Kündigung ist hier nur mit vorheriger behördlicher Zustimmung wirksam.</p>
        """
    },
    {
        "slug": "studenten-minijob-werkstudent-vergleich-2026",
        "title": "Minijob oder Werkstudentenprivileg? Der große Vergleich für Studierende 2026",
        "excerpt": "Verdienstgrenzen, Krankenversicherung und 20-Stunden-Regel: Wann lohnt sich für Studenten der 603-Euro-Minijob und wann der Werkstudentenstatus?",
        "readTime": "6 Min. Lesezeit",
        "keywords": ["Werkstudent oder Minijob", "20-Stunden-Regel Studium", "Familienversicherung Studenten", "Studentenjob 603 Euro", "Werkstudentenprivileg"],
        "faqs": [
            {
                "question": "Kann man als Student Minijob und Werkstudententätigkeit kombinieren?",
                "answer": "Ja, das ist möglich. Allerdings darf die Gesamtarbeitszeit während der Vorlesungszeit zusammen nicht mehr als 20 Wochenstunden betragen, da sonst das Werkstudentenprivileg in der Sozialversicherung entfällt."
            },
            {
                "question": "Bis zu welchem Verdienst bleibt man in der kostenlosen Familienversicherung?",
                "answer": "Für Minijobber gilt die Geringfügigkeitsgrenze von 603 Euro monatlich. Wer ausschließlich einen Minijob ausübt, kann bis 603 Euro in der beitragsfreien Familienversicherung der Eltern verbleiben (§ 10 Abs. 1 Nr. 5 SGB V)."
            },
            {
                "question": "Welche Abgaben zahlt ein Werkstudent im Vergleich zum Minijobber?",
                "answer": "Werkstudenten sind versicherungsfrei in Kranken-, Pflege- und Arbeitslosenversicherung, müssen aber den vollen Arbeitnehmeranteil zur gesetzlichen Rentenversicherung (9,3 %) entrichten. Minijobber zahlen bei RV-Befreiung 0 % Abgaben."
            }
        ],
        "contentHtml": """
            <h2>Studieren und Geld verdienen: Welches Modell ist optimal?</h2>
            <p>Studierende stehen bei der Jobwahl meist vor der Entscheidung: <strong>Minijob bis 603 Euro</strong> oder eine <strong>Werkstudententätigkeit</strong> mit höherem Stundensatz? Beide Arbeitsformen bieten steuerliche und sozialversicherungsrechtliche Privilegien, verfolgen jedoch unterschiedliche Ziele.</p>
            <h3>Der 603-Euro-Minijob für Studierende</h3>
            <p>Der Minijob eignet sich besonders für Studierende, die wenig Zeit investieren können und zwingend in der <strong>beitragsfreien gesetzlichen Familienversicherung</strong> bleiben möchten:</p>
            <ul>
                <li>Verdienst bis 603,00 Euro monatlich komplett abgabenfrei (bei RV-Befreiung).</li>
                <li>Keine Beitragspflicht zur studentischen Kranken- und Pflegeversicherung.</li>
                <li>Maximal ca. 10 Arbeitsstunden pro Woche bei 13,90 Euro Mindestlohn.</li>
            </ul>
            <p>Ermitteln Sie Ihren exakten Auszahlungsbetrag im <a href="/de/minijob-rechner">Online Minijob-Rechner 2026</a>.</p>
            <h3>Das Werkstudentenprivileg (§ 6 Abs. 1 Nr. 3 SGB V)</h3>
            <p>Wer monatlich mehr als 603 Euro verdienen möchte, profitiert als Werkstudent von reduzierten Sozialabgaben. Es fällt lediglich der Rentenversicherungsbeitrag von 9,3 % an. Voraussetzung ist das Einhalten der 20-Stunden-Grenze während des Semesters.</p>
        """
    },
    {
        "slug": "rentner-minijob-hinzuverdienstgrenze-2026",
        "title": "Minijob für Rentner 2026: Hinzuverdienst, Steuern & Rentenansprüche",
        "excerpt": "Altersrentner dürfen unbegrenzt hinzuverdienen. Welche Besonderheiten bei Steuern, Rentenbeiträgen und Regelaltersgrenze im 603-Euro-Job gelten.",
        "readTime": "5 Min. Lesezeit",
        "keywords": ["Minijob Rente Hinzuverdienst", "Rente und 603 Euro Job", "Rentenversicherungspflicht Rentner", "Hinzuverdienstgrenze Altersrente", "Minijob Regelaltersgrenze"],
        "faqs": [
            {
                "question": "Wird der Minijob auf die reguläre Altersrente angerechnet?",
                "answer": "Nein. Die Hinzuverdienstgrenzen für vorgezogene Altersrenten wurden komplett abgeschafft. Ein Minijob führt zu keinerlei Rentenkürzung."
            },
            {
                "question": "Müssen Rentner im Minijob Rentenversicherungsbeiträge zahlen?",
                "answer": "Rentner, die die Regelaltersgrenze erreicht haben und eine Vollrente beziehen, sind versicherungsfrei in der Rentenversicherung. Sie können jedoch freiwillig auf die Versicherungsfreiheit verzichten, um ihre laufende Rente jährlich weiter zu steigern."
            },
            {
                "question": "Muss der Minijob in der Steuererklärung des Rentners angegeben werden?",
                "answer": "Wird der Minijob vom Arbeitgeber pauschal mit 2 % versteuert (§ 40a EStG), muss das Einkommen nicht in der jährlichen Einkommensteuererklärung deklariert werden."
            }
        ],
        "contentHtml": """
            <h2>Attraktiver Zuverdienst im Ruhestand ohne Rentenabzüge</h2>
            <p>Immer mehr Ruheständler in Deutschland nutzen die Möglichkeit, ihre Rente durch einen Minijob aufzubessern. Seit der ersatzlosen Streichung der Hinzuverdienstgrenzen bei Altersrenten können Senioren <strong>unbegrenzt hinzuverdienen, ohne Rentenkürzungen befürchten zu müssen</strong>.</p>
            <h3>Rentenversicherungspflicht vor und nach der Regelaltersgrenze</h3>
            <p>Es muss zwischen Frührentnern und Regelaltersrentnern unterschieden werden:</p>
            <ul>
                <li><strong>Vor Erreichen der Regelaltersgrenze:</strong> Es gilt die reguläre Rentenversicherungspflicht im Minijob mit einem Eigenanteil von 3,6 % (Befreiung auf schriftlichen Antrag möglich).</li>
                <li><strong>Nach Erreichen der Regelaltersgrenze:</strong> Rentner sind versicherungsfrei. Der Arbeitgeber zahlt den Pauschalbeitrag von 15 %, der Arbeitnehmer zahlt 0 % Eigenanteil.</li>
            </ul>
            <p>Die genauen Abzüge und Auszahlungsbeträge können Sie im <a href="/de/minijob-rechner">Minijob-Rechner 2026</a> nachvollziehen.</p>
            <h3>Freiwillige Beitragszahlung für höhere Rente</h3>
            <p>Regelaltersrentner haben das Recht, durch Verzichtserklärung weiterhin den 3,6 %-Eigenanteil zu entrichten. Dadurch erhöht sich die monatliche Rente ab dem 1. Juli des Folgejahres spürbar.</p>
        """
    },
    {
        "slug": "minijob-im-privathaushalt-haushaltsscheck-2026",
        "title": "Minijob im Privathaushalt: Haushaltsscheckverfahren & 20 % Steuervorteil",
        "excerpt": "Haushaltshilfen, Gärtner und Pflegekräfte legal im Privathaushalt anstellen: Extrem günstige Pauschalabgaben und bis zu 510 € direkte Steuerermäßigung.",
        "readTime": "5 Min. Lesezeit",
        "keywords": ["Minijob Privathaushalt", "Haushaltsscheckverfahren", "§ 35a EStG", "Pauschale Abgaben Privathaushalt", "Putzhilfe legal anmelden"],
        "faqs": [
            {
                "question": "Wie hoch sind die Arbeitgeberabgaben im Privathaushalt?",
                "answer": "Die Gesamtabgaben im Privathaushalt sind mit ca. 14,8 % bis 15,2 % nur halb so teuer wie bei gewerblichen Arbeitgebern (5 % RV, 5 % KV, 2 % Steuer, plus Umlagen und Unfallversicherung)."
            },
            {
                "question": "Welchen Steuervorteil erhalten private Arbeitgeber nach § 35a EStG?",
                "answer": "Privathaushalte können 20 % der Gesamtkosten (Lohn plus Abgaben), maximal 510 Euro pro Kalenderjahr, direkt von ihrer tariflichen Einkommensteuerschuld abziehen."
            },
            {
                "question": "Ist die Haushaltshilfe bei Unfällen gesetzlich abgesichert?",
                "answer": "Ja, durch die Anmeldung über das Haushaltsscheckverfahren ist die Beschäftigte automatisch bei der zuständigen gesetzlichen Unfallversicherung (Unfallkasse) gegen Arbeits- und Wegeunfälle versichert."
            }
        ],
        "contentHtml": """
            <h2>Legale Beschäftigung im Haushalt wird staatlich stark gefördert</h2>
            <p>Wer eine Haushaltshilfe, Reinigungskraft, Betreuungsperson oder einen Gärtner im Privathaushalt beschäftigt, profitiert vom vereinfachten <strong>Haushaltsscheckverfahren der Minijob-Zentrale</strong>. Der Gesetzgeber fördert private Arbeitgeber durch drastisch reduzierte Abgabensätze und einen attraktiven Steuerabzug.</p>
            <h3>Niedrige Pauschalabgaben für Privathaushalte</h3>
            <p>Im Gegensatz zu Gewerbebetrieben (ca. 31,5 % Abgaben) zahlen Privathaushalte lediglich rund <strong>14,8 % Pauschalabgaben</strong>:</p>
            <ul>
                <li><strong>5,0 %</strong> Pauschalbeitrag zur gesetzlichen Rentenversicherung</li>
                <li><strong>5,0 %</strong> Pauschalbeitrag zur Krankenversicherung</li>
                <li><strong>2,0 %</strong> Pauschale Lohnsteuer</li>
                <li><strong>1,6 %</strong> Gesetzliche Unfallversicherung</li>
                <li><strong>ca. 1,2 %</strong> Umlagen (U1 Lohnfortzahlung, U2 Mutterschutz)</li>
            </ul>
            <p>Nutzen Sie unseren Rechner oben auf <a href="/de/minijob-rechner">Minijob-Rechner 2026</a>, um die Unterschiede zwischen Privathaushalt und Gewerbe zu vergleichen.</p>
            <h3>Steuerbonus: 20 % direkt von der Steuerschuld abziehen</h3>
            <p>Nach § 35a Abs. 1 EStG ermäßigt sich die tarifliche Einkommensteuer um 20 % der Aufwendungen des Steuerpflichtigen, höchstens um 510 Euro im Jahr. Durch diesen Steuervorteil amortisieren sich die Abgaben für private Arbeitgeber nahezu vollständig.</p>
        """
    },
    {
        "slug": "arbeitgeber-gesamtkosten-minijob-berechnung-2026",
        "title": "Arbeitgeber-Gesamtkosten im Minijob 2026: Pauschalbeiträge & Umlagen",
        "excerpt": "Was kostet ein 603-Euro-Minijobber den Betrieb wirklich? Detaillierte Aufschlüsselung von Pauschalsteuer, RV, KV und den Umlagen U1, U2 und U3.",
        "readTime": "6 Min. Lesezeit",
        "keywords": ["Arbeitgeberkosten Minijob", "Pauschalabgaben Minijob 2026", "Umlage U1 U2 Minijob", "Minijob Gesamtaufwand", "Minijob-Zentrale Abgaben"],
        "faqs": [
            {
                "question": "Wie hoch sind die prozentualen Gesamtkosten für gewerbliche Arbeitgeber?",
                "answer": "Gewerbliche Betriebe zahlen zusätzlich zum Bruttolohn ca. 31,17 % bis 32,47 % an die Minijob-Zentrale (15 % RV, 13 % KV, 2 % Pauschsteuer zzgl. Umlagen)."
            },
            {
                "question": "Muss der Arbeitgeber für privat krankenversicherte Minijobber KV-Pauschalbeiträge zahlen?",
                "answer": "Nein. Ist der Minijobber privat krankenversichert oder als Familienangehöriger privat versichert, entfällt der 13 %-ige Pauschalbeitrag zur Krankenversicherung komplett."
            },
            {
                "question": "Was erstattet die Minijob-Zentrale über die Umlage U1 bei Krankheit?",
                "answer": "Über das U1-Verfahren erhalten Arbeitgeber mit bis zu 30 Mitarbeitern auf Antrag bis zu 80 % des fortgezahlten Entgelts im Krankheitsfall von der Minijob-Zentrale erstattet."
            }
        ],
        "contentHtml": """
            <h2>Budgetplanung für Unternehmen: Was kostet ein Minijobber?</h2>
            <p>Für Personalabteilungen und Unternehmer ist der Bruttolohn von 603 Euro nicht der Gesamtaufwand. Gewerbliche Betriebe führen monatlich verbindliche Pauschalabgaben und Umlagen an die Minijob-Zentrale ab. Im Jahr 2026 belaufen sich diese Zusatzkosten auf rund <strong>31,5 Prozent</strong>.</p>
            <h3>Detaillierte Zusammensetzung der Abgabensätze</h3>
            <ul>
                <li><strong>15,0 % Rentenversicherung:</strong> Pauschalbetrag an die DRV Knappschaft-Bahn-See.</li>
                <li><strong>13,0 % Krankenversicherung:</strong> Für gesetzlich versicherte Arbeitnehmer.</li>
                <li><strong>2,0 % Pauschsteuer:</strong> Deckt Lohnsteuer, Solidaritätszuschlag und Kirchensteuer ab (§ 40a Abs. 2 EStG).</li>
                <li><strong>ca. 1,0 % Umlage U1:</strong> Ausgleich der Arbeitgeberaufwendungen bei Krankheit (§ 1 AAG).</li>
                <li><strong>0,22 % Umlage U2:</strong> Ausgleich bei Mutterschutz (§ 1 AAG).</li>
                <li><strong>0,06 % Insolvenzgeldumlage (U3):</strong> Gesetzliche Insolvenzsicherung.</li>
            </ul>
            <p>Mit unserem interaktiven Tool <a href="/de/minijob-rechner">Minijob-Rechner 2026</a> können Sie die exakten Arbeitgeberbelastungen auf Cent und Euro genau berechnen.</p>
            <h3>Rechenbeispiel bei 603 Euro Höchstgrenze</h3>
            <p>Zahlt der Arbeitgeber den Maximalbetrag von 603,00 Euro monatlich, beträgt die zusätzliche Abgabenlast ca. 188,14 Euro. Der betriebliche Gesamtaufwand beläuft sich somit auf ca. <strong>791,14 Euro pro Monat</strong>.</p>
        """
    },
    {
        "slug": "minijob-feiertagsbezahlung-anspruch-2026",
        "title": "Feiertagsbezahlung im Minijob: Gesetzlicher Anspruch nach § 2 EntgFG",
        "excerpt": "Haben Minijobber Anspruch auf Feiertagsvergütung? Das Entgeltfortzahlungsgesetz verbietet das Nacharbeiten von gesetzlichen Feiertagen.",
        "readTime": "4 Min. Lesezeit",
        "keywords": ["Feiertage Minijob Bezahlung", "EntgFG § 2", "Feiertagsvergütung Minijob", "Nacharbeiten Feiertag verboten", "Arbeitsrecht Minijob Feiertag"],
        "faqs": [
            {
                "question": "Darf der Arbeitgeber verlangen, dass Minijobber Feiertage nacharbeiten?",
                "answer": "Nein, das ist gesetzwidrig. Nach § 2 Abs. 1 EntgFG darf die Arbeitszeit, die wegen eines Feiertags ausfällt, nicht vor- oder nachgearbeitet werden müssen."
            },
            {
                "question": "Wann besteht ein Anspruch auf Feiertagsbezahlung?",
                "answer": "Immer dann, wenn der Feiertag auf einen Wochentag fällt, an dem der Minijobber nach Dienstplan oder gewohnheitsmäßig gearbeitet hätte."
            },
            {
                "question": "Zählt das Feiertagsentgelt zum 603-Euro-Verdienst dazu?",
                "answer": "Ja. Das bezahlte Feiertagsentgelt ist reguläres Arbeitsentgelt und fließt in die 603-Euro-Grenze ein. Es darf nicht dazu führen, dass die Grenze unzulässig überschritten wird."
            }
        ],
        "contentHtml": """
            <h2>Voller Entgeltanspruch an gesetzlichen Feiertagen</h2>
            <p>Fällt ein Arbeitstag auf einen gesetzlichen Feiertag (wie Ostermontag, Christi Himmelfahrt oder den 1. Mai), gilt für geringfügig Beschäftigte das <strong>Lohnausfallprinzip</strong>. Nach § 2 Abs. 1 des Entgeltfortzahlungsgesetzes (EntgFG) hat der Arbeitgeber für Arbeitszeit, die infolge eines gesetzlichen Feiertages ausfällt, dem Arbeitnehmer das Arbeitsentgelt zu zahlen, das er ohne den Arbeitsausfall erhalten hätte.</p>
            <h3>Keine Pflicht zum Nacharbeiten</h3>
            <p>Häufig fordern Arbeitgeber Minijobber auf, ausgefallene Feiertagsstunden an einem anderen Tag vor- oder nachzuarbeiten. Arbeitsgerichte haben wiederholt klargestellt: Eine solche Weisung ist nach § 2 Abs. 1 EntgFG unwirksam und verstößt gegen zwingendes Bundesrecht.</p>
            <p>Berechnen Sie Ihre Bezüge jederzeit im <a href="/de/minijob-rechner">Online Minijob-Rechner 2026</a>.</p>
            <h3>Dokumentation im Dienstplan</h3>
            <p>Um Streitigkeiten zu vermeiden, sollten regelmäßige Arbeitstage schriftlich fixiert werden. Bei flexibler Arbeit auf Abruf (§ 12 TzBfG) berechnet sich die Feiertagsvergütung nach dem Durchschnitt der letzten Wochen.</p>
        """
    },
    {
        "slug": "kurzfristige-beschaeftigung-70-tage-grenze-2026",
        "title": "Kurzfristige Beschäftigung vs. 603-Euro-Minijob: Die 70-Tage-Regel erklärt",
        "excerpt": "Völlig abgabenfreier Saisonjob: Bis zu 70 Arbeitstage oder 3 Monate ohne Verdienstgrenze arbeiten. Unterschiede, Voraussetzungen und Berufsmäßigkeit.",
        "readTime": "6 Min. Lesezeit",
        "keywords": ["Kurzfristige Beschäftigung", "70-Tage-Regelung", "Saisonarbeit Minijob", "Berufsmäßigkeit Prüfung", "§ 8 SGB IV Abs. 1 Nr. 2"],
        "faqs": [
            {
                "question": "Gibt es bei der kurzfristigen Beschäftigung eine monatliche Verdienstgrenze?",
                "answer": "Nein. Im Gegensatz zum regulären Minijob (max. 603 Euro/Monat) darf das Einkommen bei der kurzfristigen Beschäftigung beliebig hoch sein (z.B. 2.500 Euro im Monat)."
            },
            {
                "question": "Was bedeutet das Kriterium der Berufsmäßigkeit?",
                "answer": "Die Beschäftigung darf nicht berufsmäßig ausgeübt werden, d.h. sie darf nicht zur Sicherung des Lebensunterhalts dienen. Arbeitslose oder arbeitssuchend Gemeldete können daher keine kurzfristige Beschäftigung ausüben."
            },
            {
                "question": "Fallen bei einer kurzfristigen Beschäftigung Sozialversicherungsbeiträge an?",
                "answer": "Nein. Es fallen weder für Arbeitnehmer noch für Arbeitgeber Beiträge zur Kranken-, Pflege-, Renten- oder Arbeitslosenversicherung an (§ 8 Abs. 1 Nr. 2 SGB IV)."
            }
        ],
        "contentHtml": """
            <h2>Die kurzfristige Beschäftigung als Sonderform des Minijobs</h2>
            <p>Neben dem entgeltbezogenen 603-Euro-Minijob kennt das Sozialgesetzbuch (§ 8 Abs. 1 Nr. 2 SGB IV) die <strong>zeitbezogene kurzfristige Beschäftigung</strong>. Sie wird vor allem in der Gastronomie, im Messebau, in der Landwirtschaft (Erntehelfer) und bei Ferienjobs genutzt.</p>
            <h3>Voraussetzungen für die Abgabenfreiheit</h3>
            <ul>
                <li><strong>Zeitgrenze:</strong> Die Beschäftigung ist von vornherein vertraglich auf maximal 3 Monate (bei mindestens 5 Arbeitstagen pro Woche) oder 70 Arbeitstage (bei weniger als 5 Arbeitstagen pro Woche) innerhalb eines Kalenderjahres befristet.</li>
                <li><strong>Keine Berufsmäßigkeit:</strong> Bei einem Verdienst von über 603 Euro monatlich darf die Tätigkeit nicht berufsmäßig ausgeübt werden. Ideale Zielgruppen sind Schüler, Studierende, Hausfrauen oder Ruheständler.</li>
            </ul>
            <p>Nutzen Sie den <a href="/de/minijob-rechner">Minijob-Rechner 2026</a>, um Abgaben und Höchstarbeitszeiten für Minijobs zu prüfen.</p>
            <h3>Vorteil für Arbeitgeber</h3>
            <p>Für den Arbeitgeber entfallen die 15 % Renten- und 13 % Krankenversicherungspauschalen. Es sind lediglich geringe Umlagen für Krankheit und Unfallversicherung zu entrichten.</p>
        """
    },
    {
        "slug": "mindestlohn-erhoehung-13-90-euro-auswirkungen-2026",
        "title": "Mindestlohnerhöhung auf 13,90 Euro: Was Minijobber & Betriebe wissen müssen",
        "excerpt": "Die Anhebung des Mindestlohns auf 13,90 Euro und die Anpassung der Geringfügigkeitsgrenze auf 603 Euro: Rechtslage, Stundensätze und Pflichten.",
        "readTime": "5 Min. Lesezeit",
        "keywords": ["Mindestlohn 13,90 Euro", "Mindestlohn 2026", "Minijob-Grenze 603 Euro", "Stundenlohn Anpassung", "Mindestlohnkommission"],
        "faqs": [
            {
                "question": "Wann trat der Mindestlohn von 13,90 Euro in Kraft?",
                "answer": "Der gesetzliche Mindestlohn wurde zum 1. Januar 2026 wirksam auf 13,90 Euro brutto pro Zeitstunde angehoben."
            },
            {
                "question": "Wie wird die Minijob-Grenze berechnet?",
                "answer": "Die Formel lautet: Mindestlohn × 130 / 3, kaufmännisch aufgerundet auf volle Euro (13,90 € × 130 / 3 = 602,33 € -> gerundet 603 Euro)."
            },
            {
                "question": "Müssen Altverträge bei Lohnerhöhungen angepasst werden?",
                "answer": "Ja. Arbeitsverträge mit unzulässigen Alt-Stundenlöhnen müssen angepasst werden, um Verstöße gegen das Mindestlohngesetz (MiLoG) und Nachzahlungsansprüche auszuschließen."
            }
        ],
        "contentHtml": """
            <h2>Die dynamische Koppelung des Minijobs an den Mindestlohn</h2>
            <p>Mit der gesetzlichen Regelung aus § 8 Abs. 1a SGB IV ist die Geringfügigkeitsgrenze fest mit der Höhe des allgemeinen Mindestlohns verknüpft. Seit dem 1. Januar 2026 beträgt der Mindestlohn <strong>13,90 Euro pro Zeitstunde</strong>. Dadurch stieg die Verdienstgrenze synchron auf <strong>603,00 Euro pro Monat</strong>.</p>
            <h3>Die 10-Stunden-Woche als Bemessungsgrundlage</h3>
            <p>Ziel der gesetzlichen Koppelung ist es, Minijobbern eine regelmäßige Wochenarbeitszeit von rund 10 Stunden zum Mindestlohn zu ermöglichen:</p>
            <ul>
                <li>10 Stunden / Woche × 13,90 € / Std. = 139,00 € wöchentlich.</li>
                <li>139,00 € × 13 Wochen / 3 Monate = <strong>602,33 € -> aufgerundet 603,00 Euro monatlich</strong>.</li>
            </ul>
            <p>Prüfen Sie Ihre Lohnabrechnungen mit unserem verifizierten <a href="/de/minijob-rechner">Minijob-Rechner 2026</a>.</p>
            <h3>Achtung bei Überstunden und Sachbezügen</h3>
            <p>Betriebe müssen strikt darauf achten, dass geleistete Mehrarbeit oder Zulagen nicht zu einem Überschreiten der 603-Euro-Grenze führen, da sonst rückwirkend Sozialversicherungspflicht eintritt.</p>
        """
    },
    {
        "slug": "sonderzahlungen-weihnachtsgeld-minijob-2026",
        "title": "Weihnachtsgeld und Einmalzahlungen im Minijob: So bleibt der Status abgabenfrei",
        "excerpt": "Urlaubs- oder Weihnachtsgeld im Minijob: Wie Einmalzahlungen den 603-Euro-Status gefährden und welche Freibeträge und Lösungen existieren.",
        "readTime": "5 Min. Lesezeit",
        "keywords": ["Weihnachtsgeld Minijob", "Einmalzahlung Minijob", "Jahresverdienstgrenze 7236 Euro", "Sonderzahlung Minijobber", "Gleichbehandlungsgrundsatz"],
        "faqs": [
            {
                "question": "Haben Minijobber Anspruch auf Weihnachtsgeld, wenn Festangestellte es erhalten?",
                "answer": "Ja. Nach dem arbeitsrechtlichen Gleichbehandlungsgrundsatz (§ 4 TzBfG) dürfen Minijobber bei Sonderzahlungen nicht grundlos ausgeschlossen werden."
            },
            {
                "question": "Wie hoch ist die maximale Jahresverdienstgrenze 2026?",
                "answer": "Die Jahresverdienstgrenze beträgt genau 12 × 603 Euro = 7.236,00 Euro pro Kalenderjahr."
            },
            {
                "question": "Was passiert, wenn Weihnachtsgeld die 7.236-Euro-Grenze sprengt?",
                "answer": "Wird durch eine planbare Einmalzahlung die Jahresgrenze von 7.236 Euro überschritten, verliert die Beschäftigung ab dem Monat der Zahlung oder rückwirkend den Minijob-Status."
            }
        ],
        "contentHtml": """
            <h2>Jahresbetrachtung: Wann Sonderzahlungen den Minijob gefährden</h2>
            <p>Arbeitgeber belohnen Mitarbeiter gerne mit Weihnachts- oder Urlaubsgeld. Bei Minijobbern führt eine solche Einmalzahlung jedoch häufig zu einem bösen Erwachen: Sie kann dazu führen, dass der <strong>Minijob-Status rückwirkend erlischt</strong> und Beiträge nachgezahlt werden müssen.</p>
            <h3>Die 7.236-Euro-Jahresgrenze nach § 8 SGB IV</h3>
            <p>Für das Vorliegen eines Minijobs ist nicht allein der Kalendermonat entscheidend, sondern die <strong>Jahresverdienstgrenze von 7.236 Euro</strong> (12 Monate × 603 Euro). Planbare Sonderzahlungen müssen in das regelmäßige Jahresarbeitsentgelt eingerechnet werden:</p>
            <ul>
                <li>Verdient ein Mitarbeiter 550 Euro monatlich und erhält 500 Euro Weihnachtsgeld, liegt der Jahresverdienst bei 7.100 Euro (550 × 12 + 500) -> <strong>Status Minijob bleibt erhalten</strong>.</li>
                <li>Verdient der Mitarbeiter jedoch 603 Euro monatlich und erhält 300 Euro Weihnachtsgeld, liegt der Jahresverdienst bei 7.536 Euro -> <strong>Versicherungspflicht tritt ein!</strong></li>
            </ul>
            <p>Berechnen Sie Ihre Vergütungsgrenzen jederzeit im <a href="/de/minijob-rechner">Minijob-Rechner 2026</a>.</p>
            <h3>Steuerfreie Alternativen: Sachbezüge & Gutscheine</h3>
            <p>Um Minijobbern trotzdem eine Sonderzuwendung zukommen zu lassen, bieten sich steuerfreie Sachbezüge nach § 8 Abs. 2 EStG (z.B. 50 Euro monatlich als Gutschein) an, da diese nicht als sozialversicherungspflichtiges Arbeitsentgelt zählen.</p>
        """
    },
    {
        "slug": "minijob-arbeitsvertrag-muster-klauseln-2026",
        "title": "Der Minijob-Arbeitsvertrag 2026: Wichtige Pflichtklauseln nach Nachweisgesetz",
        "excerpt": "Rechtssichere Gestaltung von Minijob-Verträgen: Arbeitszeitvereinbarung, Überstunden, Ausschlussfristen und die Vorgaben des Nachweisgesetzes (NachwG).",
        "readTime": "6 Min. Lesezeit",
        "keywords": ["Minijob Arbeitsvertrag", "Nachweisgesetz Minijob", "Mustervertrag Minijob 2026", "Arbeit auf Abruf Klausel", "Pflichtangaben Arbeitsvertrag"],
        "faqs": [
            {
                "question": "Muss ein Minijob-Arbeitsvertrag schriftlich abgeschlossen werden?",
                "answer": "Zwar ist ein mündlicher Vertrag theoretisch wirksam, das Nachweisgesetz (NachwG) verpflichtet den Arbeitgeber jedoch, die wesentlichen Vertragsbedingungen schriftlich auf Papier unterschrieben auszuhändigen."
            },
            {
                "question": "Was gilt, wenn im Vertrag keine feste Arbeitszeit vereinbart wurde?",
                "answer": "Nach § 12 Abs. 1 TzBfG (Arbeit auf Abruf) gilt ohne vertragliche Festlegung automatisch eine wöchentliche Arbeitszeit von 20 Stunden als vereinbart, was sofort zur vollen Sozialversicherungspflicht führt!"
            },
            {
                "question": "Welche Fristen müssen bei Arbeit auf Abruf eingehalten werden?",
                "answer": "Der Arbeitgeber muss dem Mitarbeiter die jeweilige Arbeitsleistung mindestens 4 Tage im Voraus ankündigen (§ 12 Abs. 3 TzBfG)."
            }
        ],
        "contentHtml": """
            <h2>Rechtssicherheit für Arbeitgeber und Beschäftigte</h2>
            <p>Auch bei geringfügigen Beschäftigungsverhältnissen ist ein professioneller, schriftlicher Arbeitsvertrag unerlässlich. Nach der Reform des <strong>Nachweisgesetzes (NachwG)</strong> drohen Arbeitgebern bei fehlender schriftlicher Fixierung der Vertragsbedingungen Bußgelder von bis zu 2.000 Euro pro Einzelfall.</p>
            <h3>Zwingende Pflichtinhalte nach dem Nachweisgesetz</h3>
            <ul>
                <li>Name und Anschrift der Vertragsparteien</li>
                <li>Beginn und Dauer des Arbeitsverhältnisses (bei Befristung: konkrete Enddaten)</li>
                <li>Tätigkeitsbeschreibung und Arbeitsort</li>
                <li>Genaue Zusammensetzung des Arbeitsentgelts (Stundenlohn mind. 13,90 €)</li>
                <li>Konkret vereinbarte Arbeitszeit (wöchentliche Stunden und Verteilung)</li>
                <li>Dauer des Erholungsurlaubs und Kündigungsfristen</li>
            </ul>
            <p>Nutzen Sie den <a href="/de/minijob-rechner">Minijob-Rechner 2026</a> für die Berechnung rechtssicherer Stundensätze und Lohnkosten.</p>
            <h3>Die Gefahr der Klausel 'Arbeit auf Abruf'</h3>
            <p>Wird die Klausel 'Arbeit auf Abruf' unpräzise formuliert, greift die gesetzliche Fiktion von 20 Stunden pro Woche (§ 12 TzBfG). Bei 13,90 € Mindestlohn entspräche dies über 1.200 Euro Monatslohn – mit verheerenden sozialversicherungsrechtlichen Nachzahlungskonsequenzen.</p>
        """
    },
    {
        "slug": "minijob-elternzeit-elterngeld-zuverdienst-2026",
        "title": "Minijob während Elternzeit & Elterngeld: Anrechnung & Freibeträge 2026",
        "excerpt": "Teilzeitarbeit in der Elternzeit: Bis zu 32 Stunden pro Woche arbeiten. Wie sich der 603-Euro-Verdienst auf das Basiselterngeld und ElterngeldPlus auswirkt.",
        "readTime": "6 Min. Lesezeit",
        "keywords": ["Minijob Elternzeit", "Elterngeld Minijob Anrechnung", "ElterngeldPlus Zuverdienst", "BEEG 32 Stunden", "Freibetrag Elterngeld"],
        "faqs": [
            {
                "question": "Wie viele Stunden darf man in Elternzeit im Minijob arbeiten?",
                "answer": "Nach § 15 Abs. 4 BEEG darf die wöchentliche Arbeitszeit während der Elternzeit bis zu 32 Wochenstunden im Monatsdurchschnitt betragen."
            },
            {
                "question": "Wird der Minijob auf das Basiselterngeld angerechnet?",
                "answer": "Ja. Das im Bezugszeitraum erzielte Einkommen mindert die Höhe des Basiselterngelds, da das Elterngeld als Entgeltersatzleistung berechnet wird."
            },
            {
                "question": "Warum ist ElterngeldPlus ideal für Minijobber?",
                "answer": "Beim ElterngeldPlus kann man hinzuverdienen, ohne dass der Elterngeldbetrag gekürzt wird, solange das Gesamteinkommen den errechneten Deckelungsbetrag nicht übersteigt."
            }
        ],
        "contentHtml": """
            <h2>Erwerbstätigkeit während der Elternzeit rechtssicher gestalten</h2>
            <p>Viele Mütter und Väter möchten während der Elternzeit den Kontakt zur Arbeitswelt halten und die Haushaltskasse durch einen Minijob aufbessern. Das Bundeselterngeld- und Elternzeitgesetz (BEEG) erlaubt Teilzeitarbeit von <strong>bis zu 32 Wochenstunden</strong> während der Elternzeit.</p>
            <h3>Auswirkungen auf das Elterngeld</h3>
            <p>Die Anrechnung des Minijob-Verdienstes hängt von der gewählten Elterngeldform ab:</p>
            <ul>
                <li><strong>Basiselterngeld:</strong> Einkünfte aus dem Minijob werden auf das Elterngeld angerechnet und reduzieren den monatlichen Auszahlungsbetrag.</li>
                <li><strong>ElterngeldPlus:</strong> Diese Bezugsform wurde speziell für Eltern mit Zuverdienst konzipiert. In der Regel kann ein Minijob bis 603 Euro abzugsfrei bezogen werden.</li>
            </ul>
            <p>Ermitteln Sie die exakte Höhe des Nettobetrags mit dem <a href="/de/minijob-rechner">Online Minijob-Rechner 2026</a>.</p>
            <h3>Sonderkündigungsschutz bleibt bestehen</h3>
            <p>Auch wer während der Elternzeit im Minijob tätig ist, genießt den unantastbaren Sonderkündigungsschutz nach § 18 BEEG. Eine Kündigung durch den Arbeitgeber ist ohne Genehmigung der Aufsichtsbehörde unwirksam.</p>
        """
    },
    {
        "slug": "minijob-buergergeld-anrechnung-freibetrag-2026",
        "title": "Minijob und Bürgergeld 2026: Freibeträge und Anrechnung auf die Regelleistung",
        "excerpt": "Wie viel Geld bleibt vom 603-Euro-Minijob beim Bürgergeld übrig? Grundfreibetrag, Erwerbstätigenfreibetrag und Rechenbeispiele nach § 11b SGB II.",
        "readTime": "5 Min. Lesezeit",
        "keywords": ["Bürgergeld Minijob Anrechnung", "Freibetrag Bürgergeld 2026", "§ 11b SGB II", "Hinzuverdienst Bürgergeld", "Minijob Jobcenter"],
        "faqs": [
            {
                "question": "Wie hoch ist der Grundfreibetrag beim Bürgergeld?",
                "answer": "Die ersten 100 Euro aus Erwerbseinkommen sind komplett anrechnungsfrei (Grundfreibetrag nach § 11b Abs. 2 SGB II)."
            },
            {
                "question": "Wie viel Geld darf man bei einem 603-Euro-Minijob behalten?",
                "answer": "Bei 603 Euro Bruttoverdienst bleiben dem Bürgergeld-Empfänger genau 200,60 Euro zusätzlich zur vollen Regelleistung erhalten (100 € Grundfreibetrag + 20 % von 503 € = 100,60 €)."
            },
            {
                "question": "Muss der Minijob dem Jobcenter gemeldet werden?",
                "answer": "Ja, jede Aufnahme einer Erwerbstätigkeit muss dem zuständigen Jobcenter unverzüglich mit Arbeitsvertrag und monatlicher Entgeltabrechnung mitgeteilt werden."
            }
        ],
        "contentHtml": """
            <h2>Lohnt sich ein Minijob beim Bezug von Bürgergeld?</h2>
            <p>Viele Bürgergeld-Bezieher stellen sich die Frage, wie viel von einem 603-Euro-Minijob nach Anrechnung durch das Jobcenter tatsächlich übrig bleibt. Nach § 11b SGB II gelten <strong>gestaffelte Erwerbstätigenfreibeträge</strong>, die sicherstellen, dass Erwerbstätige stets mehr Geld zur Verfügung haben als Nicht-Erwerbstätige.</p>
            <h3>Berechnung des Freibetrags nach § 11b SGB II</h3>
            <p>Die Anrechnung erfolgt nach folgender gesetzlicher Staffelung:</p>
            <ul>
                <li><strong>Erste 100,00 Euro:</strong> 100 % anrechnungsfrei (Grundfreibetrag für Werbungskosten).</li>
                <li><strong>100,01 € bis 520,00 €:</strong> 20 % Freibetrag (420 € × 20 % = 84,00 Euro).</li>
                <li><strong>520,01 € bis 603,00 €:</strong> 20 % Freibetrag (83 € × 20 % = 16,60 Euro).</li>
            </ul>
            <p>Prüfen Sie Ihr Brutto- und Nettogehalt im <a href="/de/minijob-rechner">Minijob-Rechner 2026</a>.</p>
            <h3>Ergebnis: 200,60 Euro monatliches Plus</h3>
            <p>Von einem vollen 603-Euro-Minijob behält der Leistungsbezieher exakt <strong>200,60 Euro monatlich zusätzlich</strong> zu den vollen Bürgergeld-Leistungen (Regelbedarf plus Kosten der Unterkunft). Der Restbetrag von 402,40 Euro wird mit dem Auszahlungsbetrag des Jobcenters verrechnet.</p>
        """
    },
    {
        "slug": "minijob-sv-befreiungsantrag-muster-fristen-2026",
        "title": "Befreiungsantrag von der Rentenversicherung: Fristen, Formular & Vorlage",
        "excerpt": "3,6 % Eigenanteil sparen: Wie Sie den Antrag auf Befreiung von der Rentenversicherungspflicht (§ 6 Abs. 1b SGB VI) formgerecht stellen und abgeben.",
        "readTime": "5 Min. Lesezeit",
        "keywords": ["Befreiungsantrag Rentenversicherung Minijob", "§ 6 Abs. 1b SGB VI", "Rentenversicherungspflicht befreien Formular", "Frist Befreiung Minijob-Zentrale", "Muster Befreiungsantrag"],
        "faqs": [
            {
                "question": "Wann wird die Befreiung von der Rentenversicherungspflicht wirksam?",
                "answer": "Der Antrag wirkt ab dem Tag des Eingangs beim Arbeitgeber, wenn der Arbeitgeber die Befreiung innerhalb von 6 Wochen der Minijob-Zentrale meldet und diese nicht innerhalb eines Monats widerspricht (§ 6 Abs. 4 SGB VI)."
            },
            {
                "question": "Kann eine erfolgte Befreiung widerrufen werden?",
                "answer": "Nein. Die Befreiung von der Rentenversicherungspflicht gilt unwiderruflich für die gesamte Dauer des jeweiligen Minijob-Arbeitsverhältnisses."
            },
            {
                "question": "Gilt die Befreiung automatisch für andere Minijobs?",
                "answer": "Übt der Minijobber mehrere geringfügige Beschäftigungen aus, kann der Befreiungsantrag nur einheitlich für alle zeitgleich ausgeübten Minijobs gestellt werden."
            }
        ],
        "contentHtml": """
            <h2>Die Formalitäten zur Befreiung von der Rentenversicherungspflicht</h2>
            <p>Seit 2013 sind geringfügig entlohnte Beschäftigte grundsätzlich gesetzlich rentenversicherungspflichtig. Sie können sich jedoch auf schriftlichen Antrag nach § 6 Abs. 1b SGB VI von dieser Beitragspflicht befreien lassen. Dadurch spart der Minijobber den <strong>Eigenanteil von 3,6 %</strong> (bei 603 Euro monatlich genau 21,71 Euro).</p>
            <h3>Schritt-für-Schritt: So stellen Sie den Antrag</h3>
            <ol>
                <li><strong>Schriftform:</strong> Der Antrag muss schriftlich verfasst und vom Arbeitnehmer handschriftlich unterschrieben werden.</li>
                <li><strong>Übergabe an den Arbeitgeber:</strong> Das Dokument wird beim Arbeitgeber eingereicht, nicht direkt bei der Minijob-Zentrale!</li>
                <li><strong>Meldung durch den Arbeitgeber:</strong> Der Arbeitgeber meldet den Befreiungsantrag mit der nächsten Entgeltmeldung (Schlüssel '2' in der Rentenversicherung) an die Minijob-Zentrale.</li>
                <li><strong>Widerspruchsfrist:</strong> Widerspricht die Minijob-Zentrale nicht innerhalb eines Monats, gilt die Befreiung rückwirkend als genehmigt.</li>
            </ol>
            <p>Sehen Sie die Auszahlungseffekte mit und ohne Befreiung im <a href="/de/minijob-rechner">Minijob-Rechner 2026</a>.</p>
            <h3>Aufbewahrung im Lohnkonto</h3>
            <p>Der Arbeitgeber muss den Originalantrag des Minijobbers als prüfungsrelevanten Beleg zum Lohnkonto nehmen und mindestens bis zum Ablauf der Verjährungsfrist aufbewahren.</p>
        """
    },
    {
        "slug": "minijob-sachbezug-50-euro-gutschein-2026",
        "title": "Sachbezüge & 50-Euro-Gutscheine steuerfrei zusätzlich zum 603-Euro-Minijob",
        "excerpt": "Mehr Netto ohne Statusverlust: Sachbezugsgutscheine bis 50 Euro monatlich (§ 8 Abs. 2 EStG) steuer- und sozialversicherungsfrei gewähren.",
        "readTime": "5 Min. Lesezeit",
        "keywords": ["Sachbezug Minijob", "50 Euro Sachbezugsgutschein", "§ 8 Abs. 2 EStG", "Zusatzleistungen Minijob", "Gutschein steuerfrei Minijobber"],
        "faqs": [
            {
                "question": "Darf der 50-Euro-Sachbezug zusätzlich zu den 603 Euro gewährt werden?",
                "answer": "Ja. Echte Sachbezüge im Rahmen der 50-Euro-Freigrenze (§ 8 Abs. 2 Satz 11 EStG) zählen weder zum steuerpflichtigen noch zum sozialversicherungspflichtigen Arbeitsentgelt."
            },
            {
                "question": "Was passiert, wenn der Sachbezug 50,01 Euro beträgt?",
                "answer": "Da es sich um eine Freigrenze (nicht Freibetrag) handelt, wird bei Überschreitung auch nur um einen Cent der gesamte Betrag steuer- und beitragspflichtig und gefährdet den Minijob-Status!"
            },
            {
                "question": "Dürfen Gutscheine bar ausgezahlt werden?",
                "answer": "Nein. Eine Bargeldauszahlung oder Rücktauschfunktion ist streng unzulässig. Gutscheine müssen den Kriterien des Zahlungsdiensteaufsichtsgesetzes (ZAG) entsprechen."
            }
        ],
        "contentHtml": """
            <h2>Legale Gehaltsextras: Bis zu 653 Euro monatlicher Gesamtvorteil</h2>
            <p>Arbeitgeber, die ihren Minijobbern mehr als die regulären 603 Euro zukommen lassen möchten, ohne die Sozialversicherungspflicht auszulösen, können auf steuerfreie <strong>Sachbezüge nach § 8 Abs. 2 Satz 11 EStG</strong> zurückgreifen. Die monatliche Freigrenze liegt bei genau 50,00 Euro.</p>
            <h3>Zulässige Formen des 50-Euro-Sachbezugs</h3>
            <ul>
                <li>Tankkarten und Ladekarten für Strom</li>
                <li>Gutscheinkarten für den regionalen Einzelhandel oder geschlossene Händlernetze</li>
                <li>Einkaufsgutscheine von Supermarktketten</li>
                <li>Gutscheine für Fitnessstudios oder Kulturveranstaltungen</li>
            </ul>
            <p>Berechnen Sie Ihre Grundvergütung und Arbeitgeberabgaben im <a href="/de/minijob-rechner">Online Minijob-Rechner 2026</a>.</p>
            <h3>Strikte Einhaltung der Freigrenze</h3>
            <p>Arbeitgeber müssen sicherstellen, dass die 50-Euro-Freigrenze im Kalendermonat nicht überschritten wird. Wird in einem Monat auch nur 50,01 Euro gewährt, wird die gesamte Leistung beitragspflichtig. Sachbezüge müssen zwingend <em>zusätzlich zum ohnehin geschuldeten Arbeitslohn</em> gewährt werden.</p>
        """
    }
]

def get_next_fallback_article(db_instance):
    existing_slugs = set()

    # 1. Inspect existing local JSON post files
    posts_dir = os.path.join(os.path.dirname(__file__), "..", "public", "posts")
    if os.path.exists(posts_dir):
        for fname in os.listdir(posts_dir):
            if fname.endswith(".json"):
                existing_slugs.add(fname[:-5])

    # 2. Inspect Firestore collection if connection is active
    if db_instance:
        try:
            docs = db_instance.collection("german_blog_posts").select(["slug"]).stream()
            for doc in docs:
                data = doc.to_dict()
                if "slug" in data:
                    existing_slugs.add(data["slug"])
        except Exception as e:
            print(f"[Topic Bank] Notice checking existing Firestore posts: {e}")

    # Find the first unpublished article from our 15-article bank
    for article in FALLBACK_TOPIC_BANK:
        if article["slug"] not in existing_slugs:
            print(f"[Topic Bank] Selected fresh unpublished article: '{article['title']}' ({article['slug']})")
            return dict(article)

    # If all 15 have been published, rotate deterministically based on day of year
    day_idx = int(time.time() / 86400) % len(FALLBACK_TOPIC_BANK)
    chosen = dict(FALLBACK_TOPIC_BANK[day_idx])
    print(f"[Topic Bank] All 15 articles published. Selecting rotation slot {day_idx + 1}/15: '{chosen['title']}'")
    return chosen

# 4. Keyword pool for live AI generation attempts
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

# 5. Strict German SEO Prompt for AI generation
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

# Execution flow: Try OpenRouter AI first; on failure, gracefully use built-in topic bank
data = None
raw_output = generate_with_fallback(prompt)

if raw_output:
    try:
        cleaned_json = raw_output.strip()
        if "```" in cleaned_json:
            match = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", cleaned_json)
            if match:
                cleaned_json = match.group(1).strip()
        else:
            match = re.search(r"(\{[\s\S]*\})", cleaned_json)
            if match:
                cleaned_json = match.group(1).strip()

        parsed_data = json.loads(cleaned_json)
        required_keys = ["title", "slug", "excerpt", "readTime", "contentHtml", "faqs", "keywords"]
        if all(k in parsed_data for k in required_keys):
            data = parsed_data
            print(f"[OpenRouter] Successfully parsed AI generated article: '{data['title']}'")
        else:
            print("[OpenRouter] Parsed JSON missing required keys. Switching to topic bank fallback...")
    except Exception as parse_err:
        print(f"[OpenRouter] JSON parsing exception: {parse_err}. Switching to topic bank fallback...")

# Robust Fallback: Guarantee article is always ready
if not data:
    print("[Fallback] Activating built-in topic bank fallback...")
    data = get_next_fallback_article(db)

# Set common metadata
data["createdAt"] = firestore.SERVER_TIMESTAMP if db else time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
data["status"] = "published"

slug = data["slug"]

# 6. Publish to Firestore (if available)
if db:
    try:
        doc_ref = db.collection("german_blog_posts").document(slug)
        doc_ref.set(data)
        print(f"[Firestore] Successfully published blog post: '{data['title']}' (slug: {slug}).")
    except Exception as fe:
        print(f"[Firestore] Warning writing to Firestore: {fe}. Local backup will preserve content.")

# 7. Always save local backup copy to ensure repository sync & Netlify build deployment
try:
    posts_dir = os.path.join(os.path.dirname(__file__), "..", "public", "posts")
    os.makedirs(posts_dir, exist_ok=True)
    post_backup_path = os.path.join(posts_dir, f"{slug}.json")
    backup_payload = {k: v for k, v in data.items() if k != "createdAt"}
    backup_payload["createdAt"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    with open(post_backup_path, "w", encoding="utf-8") as f:
        json.dump(backup_payload, f, ensure_ascii=False, indent=2)
    print(f"[Local Sync] Successfully saved local backup: {post_backup_path}")
except Exception as e:
    print(f"[Local Sync] Warning: could not write local backup: {e}")

print("Auto-blogger completed successfully with exit code 0.")
