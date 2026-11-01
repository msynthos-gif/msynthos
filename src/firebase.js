/**
 * Firebase Firestore Client Instance & Query Utilities for Msynthos
 * Connects directly to Firestore with automatic fallback to high-value statutory SEO content.
 */

// Configurable Firebase Project ID (defaults to 'msynthos-digital' or environment variable)
const FIREBASE_PROJECT_ID =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_PROJECT_ID) ||
  'msynthos-digital';

/**
 * The Firestore client database instance
 */
export const db = {
  projectId: FIREBASE_PROJECT_ID,
  name: '(default)',
  type: 'firestore-client'
};

/**
 * 2026 German Minijob SEO Articles Pool (authoritative statutory references)
 */
export const INITIAL_GERMAN_BLOG_POSTS = [
  {
    id: 'urlaubsanspruch-minijob-2026-berechnen',
    slug: 'urlaubsanspruch-minijob-2026-berechnen',
    title: 'Urlaubsanspruch im Minijob 2026: Gesetzliche Urlaubstage richtig berechnen',
    excerpt: 'Auch bei einer 603-Euro-Geringfügigkeitsgrenze haben Minijobber vollen gesetzlichen Anspruch auf bezahlten Erholungsurlaub nach dem BUrlG. So berechnen Sie Ihre Urlaubstage.',
    readTime: '5 Min. Lesezeit',
    createdAt: '2026-01-15T09:00:00Z',
    status: 'published',
    keywords: [
      'Urlaubsanspruch',
      'Minijob 2026',
      'Bundesurlaubsgesetz',
      'BUrlG § 3',
      'Urlaubsberechnung',
      'Lohnfortzahlung'
    ],
    faqs: [
      {
        question: 'Haben Minijobber einen gesetzlichen Anspruch auf bezahlten Urlaub?',
        answer: 'Ja, uneingeschränkt. Nach dem Bundesurlaubsgesetz (BUrlG) und dem Teilzeit- und Befristungsgesetz (TzBfG) gilt der Gleichbehandlungsgrundsatz. Minijobber dürfen gegenüber Vollzeitkräften nicht benachteiligt werden und haben denselben gesetzlichen Mindesturlaubsanspruch bezogen auf ihre wöchentlichen Arbeitstage.'
      },
      {
        question: 'Wie berechnet sich der Urlaubsanspruch bei unregelmäßigen Arbeitstagen?',
        answer: 'Die Formel lautet: Gesetzliche Urlaubstage bei Vollzeit geteilt durch Vollzeit-Arbeitstage multipliziert mit den tatsächlichen wöchentlichen Arbeitstagen des Minijobbers (z.B. 24 Werktage / 6 Tage × 2 Arbeitstage = 8 Urlaubstage pro Jahr).'
      },
      {
        question: 'Verfällt nicht genommener Urlaub im Minijob automatisch?',
        answer: 'Urlaub muss grundsätzlich im laufenden Kalenderjahr genommen werden. Nach aktueller Rechtsprechung des Bundesarbeitsgerichts (BAG) verfällt der Urlaub jedoch nur dann, wenn der Arbeitgeber den Arbeitnehmer zuvor konkret und schriftlich aufgefordert hat, den Urlaub zu nehmen, und über den drohenden Verfall belehrt hat.'
      }
    ],
    contentHtml: `
      <h2>Voller Urlaubsanspruch auch bei 603-Euro-Jobs</h2>
      <p>Entgegen weit verbreiteten Irrtümern sind geringfügig Beschäftigte keine Arbeitnehmer zweiter Klasse. Nach <strong>§ 4 Abs. 1 Teilzeit- und Befristungsgesetz (TzBfG)</strong> sowie dem <strong>Bundesurlaubsgesetz (BUrlG)</strong> steht jedem Minijobber ein anteiliger, voll bezahlter Jahresurlaub zu.</p>
      
      <h3>Die gesetzliche Berechnungsformel</h3>
      <p>Entscheidend für die Berechnung ist nicht die geleistete Stundenzahl, sondern ausschließlich die <strong>Anzahl der wöchentlichen Arbeitstage</strong>:</p>
      <ul>
        <li><strong>5-Tage-Woche:</strong> Mindestens 20 Urlaubstage im Kalenderjahr (§ 3 BUrlG).</li>
        <li><strong>3-Tage-Woche:</strong> 20 / 5 × 3 = <strong>12 Urlaubstage</strong> pro Jahr.</li>
        <li><strong>2-Tage-Woche:</strong> 20 / 5 × 2 = <strong>8 Urlaubstage</strong> pro Jahr.</li>
        <li><strong>1-Tag-Woche:</strong> 20 / 5 × 1 = <strong>4 Urlaubstage</strong> pro Jahr.</li>
      </ul>

      <h3>Entgeltfortzahlung während des Erholungsurlaubs</h3>
      <p>Während des Urlaubs muss der Arbeitgeber das sogenannte Urlaubsentgelt weiterzahlen. Dieses berechnet sich nach dem durchschnittlichen Arbeitsverdienst der letzten 13 Wochen vor Beginn des Urlaubs (§ 11 BUrlG). Nutzen Sie unseren interaktiven Rechner oben, um Ihre exakten Nettoauszahlungen im Minijob 2026 zu ermitteln.</p>
    `
  },
  {
    id: 'minijob-hoechstarbeitszeit-2026-mindestlohn',
    slug: 'minijob-hoechstarbeitszeit-2026-mindestlohn',
    title: 'Minijob Höchstarbeitszeit 2026: Maximale Stunden bei 13,90 € Mindestlohn',
    excerpt: 'Mit der Koppelung an 13,90 Euro Mindestlohn und 603 Euro monatlicher Grenze ändert sich die monatliche Stundengrenze für geringfügig Beschäftigte. Das müssen Sie beachten.',
    readTime: '4 Min. Lesezeit',
    createdAt: '2026-01-10T10:30:00Z',
    status: 'published',
    keywords: [
      'Höchstarbeitszeit',
      'Mindestlohn 13,90 €',
      '603 Euro Grenze',
      'Arbeitszeitnachweis',
      'MiLoG § 17',
      'Minijob-Zentrale'
    ],
    faqs: [
      {
        question: 'Wie viele Stunden darf man 2026 im Minijob maximal monatlich arbeiten?',
        answer: 'Bei Zahlung des gesetzlichen Mindestlohns von 13,90 € pro Stunde darf ein Minijobber maximal 43,38 Stunden pro Monat arbeiten (603 € / 13,90 € = 43,38 Std., ca. 10 Stunden pro Woche). Zahlt der Betrieb einen höheren Stundenlohn, sinkt die maximal zulässige Stundenzahl entsprechend.'
      },
      {
        question: 'Gilt die Dokumentationspflicht nach § 17 Mindestlohngesetz auch für Minijobs?',
        answer: 'Ja. Arbeitgeber sind verpflichtet, Beginn, Ende und Gesamtdauer der täglichen Arbeitszeit von Minijobbern innerhalb von 7 Tagen nach der Arbeitsleistung aufzuzeichnen und diese Nachweise mindestens 2 Jahre aufzubewahren.'
      },
      {
        question: 'Was geschieht bei einem gelegentlichen unvorhersehbaren Überschreiten?',
        answer: 'Ein unvorhersehbares Überschreiten der 603-Euro-Grenze ist in maximal 2 Monaten innerhalb eines 12-Monats-Zeitraums zulässig. In diesem Ausnahmemonat darf der Verdienst bis zum Doppelten (1.206 €) betragen, ohne dass die Beschäftigung versicherungspflichtig wird (§ 8 Abs. 1b SGB IV).'
      }
    ],
    contentHtml: `
      <h2>Strikte Grenzen: Mindestlohn und Monatsverdienst 2026</h2>
      <p>Seit der Reform der Geringfügigkeitsgrenze ist der Minijob dynamisch an den gesetzlichen Mindestlohn gekoppelt. Seit dem 1. Januar 2026 beträgt der Mindestlohn <strong>13,90 Euro pro Stunde</strong>. Daraus resultiert die monatliche Verdienstgrenze von <strong>603,00 Euro</strong> (gerechnet auf eine rechnerische 10-Stunden-Woche: 13,90 € × 130 / 3 = 602,33 €, gerundet auf 603 €).</p>

      <h3>Mathematische Arbeitszeitgrenze</h3>
      <p>Daraus ergibt sich eine exakte Höchstarbeitszeit:</p>
      <ul>
        <li><strong>Monatliche Höchstarbeitszeit:</strong> 603,00 € / 13,90 € = <strong>43,38 Stunden</strong>.</li>
        <li><strong>Wöchentliche Arbeitszeit im Schnitt:</strong> 43,38 / 4,33 = <strong>10,02 Stunden</strong>.</li>
      </ul>
      <p>Wird ein höherer Tariflohn oder Firmenstundenlohn gezahlt (z.B. 16,00 €/Std.), reduziert sich das zulässige Arbeitszeitkontingent auf 37,68 Stunden pro Monat.</p>

      <h3>Vermeidung von Nachzahlungsrisiken</h3>
      <p>Übersteigt die Stundenzahl die Grenze dauerhaft, liegt rechtlich ein versicherungspflichtiger Midijob (Übergangsbereich nach § 20 SGB IV) vor. Arbeitgeber riskieren bei Prüfungen durch die Rentenversicherung empfindliche Beitragsnachzahlungen samt Säumniszuschlägen.</p>
    `
  },
  {
    id: 'rentenversicherung-minijob-befreiung-2026',
    slug: 'rentenversicherung-minijob-befreiung-2026',
    title: 'Rentenversicherungspflicht im Minijob: Lohnt sich die Befreiung 2026?',
    excerpt: '3,6 % Eigenleistung oder volle Brutto-Gleich-Netto-Auszahlung? Wir analysieren die Vor- und Nachteile des Befreiungsantrags für Minijobber.',
    readTime: '6 Min. Lesezeit',
    createdAt: '2026-01-05T11:15:00Z',
    status: 'published',
    keywords: [
      'Rentenversicherung',
      'RV-Befreiung',
      '3,6 Prozent Eigenanteil',
      'Rentenanspruch',
      'Reha-Leistungen',
      'Erwerbsminderungsrente'
    ],
    faqs: [
      {
        question: 'Wie hoch ist der Eigenanteil zur Rentenversicherung bei 603 Euro?',
        answer: 'Der Eigenanteil des Minijobbers beträgt 3,6 % des Bruttolohns. Bei genau 603 Euro Verdienst entspricht dies einem Abzug von 21,71 Euro monatlich. Die Nettoauszahlung beträgt dann 581,29 Euro.'
      },
      {
        question: 'Welche Vorteile hat es, die 3,6 % in die Rentenversicherung einzuzahlen?',
        answer: 'Durch die Pflichtbeiträge erwerben Minijobber vollwertige Pflichtbeitragsmonate für die Wartezeit (z.B. für die 35- oder 45-jährige Wartezeit zur Altersrente), sichern ihren Anspruch auf Erwerbsminderungsrente sowie medizinische und berufliche Rehabilitationsmaßnahmen (Reha-Leistungen der DRV) und erhalten die volle Förderfähigkeit für Riester-Rentenverträge.'
      },
      {
        question: 'Wie beantragt man die Befreiung und kann man sie widerrufen?',
        answer: 'Die Befreiung muss schriftlich beim Arbeitgeber beantragt werden. Sie wird ab dem Monat wirksam, der auf den Eingang folgt (sofern die Minijob-Zentrale nicht innerhalb eines Monats widerspricht). Wichtig: Der Antrag ist für die gesamte Dauer dieses Minijobs unumkehrbar und kann nicht widerrufen werden.'
      }
    ],
    contentHtml: `
      <h2>Der 3,6 % Eigenanteil: Grundsatz der Versicherungspflicht</h2>
      <p>Seit 2013 gilt für alle Minijobs in Deutschland die gesetzliche Rentenversicherungspflicht. Während der Arbeitgeber pauschal 15 % (im Gewerbe) an die Deutsche Rentenversicherung abführt, stockt der Arbeitnehmer diesen Betrag mit <strong>3,6 % (im Privathaushalt 13,6 %)</strong> auf den vollen Beitragssatz von 18,6 % auf.</p>

      <h3>Gegenüberstellung: Befreiung vs. Pflichtbeitrag</h3>
      <ul>
        <li><strong>Option A (Keine Befreiung):</strong> Bei 603,00 € brutto werden 21,71 € abgezogen. Auszahlung: <strong>581,29 € netto</strong>. Voller Aufbau von Wartezeitmonaten, Schutz bei Erwerbsminderung und Reha-Anspruch.</li>
        <li><strong>Option B (Befreiung beantragt):</strong> 0,00 € Abzug. Auszahlung: <strong>603,00 € netto</strong> (Brutto = Netto). Verlust des Erwerbsminderungsschutzes und stark reduzierte Rentenanrechnung.</li>
      </ul>

      <h3>Empfehlung für Minijobber</h3>
      <p>Wer nicht anderweitig rentenversichert ist (z.B. über einen Hauptberuf), sollte auf die Befreiung in den meisten Fällen verzichten. Für den geringen Betrag von rund 21 Euro pro Monat erwerben Minijobber wertvolle staatliche Schutzrechte, die im Ernstfall viele tausend Euro wert sein können.</p>
    `
  },
  {
    id: 'zwei-minijobs-gleichzeitig-steuern-2026',
    slug: 'zwei-minijobs-gleichzeitig-steuern-2026',
    title: 'Zwei Minijobs gleichzeitig 2026: Steuern, Abgaben und Übergangsbereich',
    excerpt: 'Was passiert, wenn Sie mehrere Minijobs gleichzeitig ausüben und zusammen über 603 Euro monatlich verdienen? Die Rechtslage nach § 8 Abs. 2 SGB IV.',
    readTime: '5 Min. Lesezeit',
    createdAt: '2026-01-02T14:00:00Z',
    status: 'published',
    keywords: [
      'Zwei Minijobs',
      'Mehrfachbeschäftigung',
      '603 Euro Grenze',
      'Übergangsbereich',
      'Steuerklasse VI',
      'SGB IV § 8'
    ],
    faqs: [
      {
        question: 'Darf man zwei Minijobs bei verschiedenen Arbeitgebern gleichzeitig haben?',
        answer: 'Ja, das ist grundsätzlich erlaubt. Entscheidend ist jedoch das Gesamteinkommen: Liegen beide Gehälter zusammen bei maximal 603,00 Euro monatlich, bleiben beide Minijobs abgabenfrei. Übersteigt die Summe 603,00 Euro, werden beide Jobs sozialversicherungspflichtig im Übergangsbereich (Midijob).'
      },
      {
        question: 'Was gilt, wenn bereits eine versicherungspflichtige Hauptbeschäftigung vorliegt?',
        answer: 'Wer eine Vollzeit- oder Teilzeitstelle ausübt, darf genau einen Minijob bis 603 Euro abgabenfrei nebenher ausüben. Jeder zweite Minijob wird automatisch mit dem Hauptberuf zusammengerechnet und unterliegt der vollen Steuer- und Beitragspflicht (in der Regel Steuerklasse VI).'
      },
      {
        question: 'Müssen die Arbeitgeber über weitere Beschäftigungen informiert werden?',
        answer: 'Ja. Arbeitnehmer sind gesetzlich verpflichtet, jeden Arbeitgeber über weitere Beschäftigungen in Kenntnis zu setzen, damit dieser die korrekte sozialversicherungsrechtliche Meldung an die Minijob-Zentrale oder Krankenkasse vornehmen kann.'
      }
    ],
    contentHtml: `
      <h2>Zusammenrechnung nach § 8 Abs. 2 SGB IV</h2>
      <p>Viele Arbeitnehmer üben mehrere geringfügige Beschäftigungen aus. Nach deutschem Sozialrecht gilt hier das strikte <strong>Additionsprinzip</strong>: Alle ausgeübten Minijobs werden für die versicherungsrechtliche Beurteilung zusammengerechnet.</p>

      <h3>Fallkonstellation A: Zwei Minijobs ohne Hauptjob</h3>
      <ul>
        <li><strong>Beispiel 1:</strong> Job 1 bringt 300 €, Job 2 bringt 250 € = <strong>550 € Gesamtverdienst</strong>. Beide Beschäftigungen bleiben echte Minijobs.</li>
        <li><strong>Beispiel 2:</strong> Job 1 bringt 350 €, Job 2 bringt 300 € = <strong>650 € Gesamtverdienst</strong>. Die 603-Euro-Grenze wird überschritten. Beide Beschäftigungen werden ab dem Tag des Überschreitens sozialversicherungspflichtig im Midijob-Bereich.</li>
      </ul>

      <h3>Fallkonstellation B: Hauptjob plus Nebenjobs</h3>
      <p>Üben Sie bereits eine versicherungspflichtige Haupttätigkeit aus, ist der <em>zeitlich zuerst aufgenommene Minijob</em> bis 603 Euro abgabenfrei. Jeder weitere Minijob wird dem Haupteinkommen hinzugerechnet und voll beitragspflichtig.</p>
    `
  },
  {
    id: 'lohnfortzahlung-krankheit-minijob-2026',
    slug: 'lohnfortzahlung-krankheit-minijob-2026',
    title: 'Lohnfortzahlung im Krankheitsfall: Ihre Rechte als Minijobber nach § 3 EFZG',
    excerpt: 'Minijobber haben bei Krankheit und Feiertagen Anspruch auf volle Lohnfortzahlung durch den Arbeitgeber bis zu 6 Wochen. So setzen Sie Ihr Recht durch.',
    readTime: '4 Min. Lesezeit',
    createdAt: '2025-12-28T09:45:00Z',
    status: 'published',
    keywords: [
      'Lohnfortzahlung',
      'Krankheit Minijob',
      'EFZG § 3',
      'Umlage U1',
      'Feiertagsbezahlung',
      'Arbeitsunfähigkeit'
    ],
    faqs: [
      {
        question: 'Bekommen Minijobber im Krankheitsfall Geld weiterbezahlt?',
        answer: 'Ja. Nach § 3 Entgeltfortzahlungsgesetz (EFZG) haben auch Minijobber Anspruch auf Entgeltfortzahlung im Krankheitsfall für bis zu 6 Wochen (42 Kalendertage), sofern das Arbeitsverhältnis mindestens vier Wochen ununterbrochen bestanden hat.'
      },
      {
        question: 'Wie hoch ist die Fortzahlung bei unregelmäßigen Arbeitszeiten?',
        answer: 'Es gilt das Entgeltausfallprinzip (§ 4 EFZG): Der Arbeitnehmer erhält genau das Entgelt, das er erhalten hätte, wenn er nicht arbeitsunfähig krank geworden wäre. Bei schwankenden Arbeitszeiten wird der Durchschnitt der letzten Wochen herangezogen.'
      },
      {
        question: 'Wie wird der Arbeitgeber für die Lohnfortzahlung entschädigt?',
        answer: 'Arbeitgeber zahlen für gewerbliche Minijobber die Umlage U1 (ca. 0,9 % bis 1,1 % an die Minijob-Zentrale). Im Krankheitsfall erstattet die Minijob-Zentrale dem Arbeitgeber auf Antrag bis zu 80 % des fortgezahlten Bruttolohns.'
      }
    ],
    contentHtml: `
      <h2>Gleiches Recht für alle Beschäftigten: § 3 EFZG</h2>
      <p>Ein weit verbreiteter Irrglaube lautet: "Wer nicht arbeitet, bekommt kein Geld". Für Minijobber gilt jedoch derselbe Schutz wie für Vollzeitkräfte. Wer krank wird, hat Anspruch auf <strong>100 % Fortzahlung seines regelmäßigen Verdienstes</strong>.</p>

      <h3>Voraussetzungen für den Anspruch</h3>
      <ul>
        <li><strong>Vierwöchige Wartezeit:</strong> Das Arbeitsverhältnis muss seit mindestens 4 Wochen bestehen.</li>
        <li><strong>Unverschuldete Arbeitsunfähigkeit:</strong> Die Krankheit darf nicht grob fahrlässig selbst herbeigeführt worden sein.</li>
        <li><strong>Rechtzeitige Krankmeldung:</strong> Der Arbeitgeber muss unverzüglich über die Arbeitsunfähigkeit und deren voraussichtliche Dauer informiert werden.</li>
      </ul>

      <h3>Entlastung für Arbeitgeber über Umlage U1</h3>
      <p>Arbeitgeber müssen die Kosten nicht alleine tragen: Durch das Ausgleichsverfahren nach dem Aufwendungsausgleichsgesetz (AAG) erstattet die Minijob-Zentrale aus den Mitteln der Umlage U1 einen Großteil der Lohnfortzahlungskosten zurück.</p>
    `
  },
  {
    id: 'midijob-uebergangsbereich-2026-vorteile',
    slug: 'midijob-uebergangsbereich-2026-vorteile',
    title: 'Midijob 2026: Rechnerische Vorteile im Übergangsbereich von 603,01 € bis 2.000 €',
    excerpt: 'Die Gleitzone schützt vor der Abgabenklippe: Wie sich reduzierte Arbeitnehmer-Sozialabgaben berechnen und warum voller Schutz gewährleistet ist.',
    readTime: '6 Min. Lesezeit',
    createdAt: '2025-12-20T11:20:00Z',
    status: 'published',
    keywords: [
      'Midijob 2026',
      'Übergangsbereich',
      'Gleitzone',
      'SGB IV § 20',
      'Reduzierte Beiträge',
      'Krankengeld'
    ],
    faqs: [
      {
        question: 'Was ist der Übergangsbereich (Midijob) und wo liegt er 2026?',
        answer: 'Der Übergangsbereich nach § 20 SGB IV umfasst monatliche Bruttoeinkommen von 603,01 Euro bis genau 2.000,00 Euro. In diesem Bereich zahlen Arbeitnehmer reduzierte Sozialabgaben, während der Arbeitgeber den vollen Anteil entrichtet.'
      },
      {
        question: 'Hat man im Midijob vollen Kranken- und Rentenversicherungsschutz?',
        answer: 'Ja, uneingeschränkt! Trotz reduzierter Eigenbeiträge genießen Midijobber vollen Schutz: Anspruch auf Krankengeld, Arbeitslosengeld I, Mutterschaftsgeld und volle Anrechnung der Beitragszeiten für die Rente.'
      },
      {
        question: 'Wie hoch sind die prozentualen Abzüge für den Arbeitnehmer?',
        answer: 'Die Abzüge steigen gleitend von ca. 11,5 % bei 604 Euro bis auf die vollen regulären Sozialabgaben von ca. 20,5 % bei 2.000 Euro. Unser Rechner oben kalkuliert den exakten Wert auf den Cent genau.'
      }
    ],
    contentHtml: `
      <h2>Schutz vor der Abgabenklippe durch § 20 SGB IV</h2>
      <p>Vor Einführung des Übergangsbereichs führte schon ein einziger Euro über der Geringfügigkeitsgrenze dazu, dass sofort die vollen Sozialversicherungsbeiträge von über 20 % fällig wurden. Der Übergangsbereich glättet diesen Übergang mathematisch ab.</p>

      <h3>Gleitzonenformel und Beitragsbemessung</h3>
      <p>Die Beiträge werden über einen gesetzlich definierten Faktor F berechnet. Dadurch zahlen Arbeitnehmer am unteren Rand des Übergangsbereichs (z. B. bei 650 Euro) nur einen Bruchteil der regulären Abgaben.</p>
      <ul>
        <li><strong>Einkommen 603,00 € (Minijob):</strong> 0,00 € bis 21,71 € Abzüge.</li>
        <li><strong>Einkommen 700,00 € (Midijob):</strong> ca. 95 € Gesamtabzüge für Kranken-, Pflege-, Renten- und Arbeitslosenversicherung.</li>
        <li><strong>Einkommen 1.000,00 € (Midijob):</strong> ca. 165 € Gesamtabzüge.</li>
      </ul>

      <h3>Fazit</h3>
      <p>Ein Midijob bietet für viele Arbeitnehmer den idealen Kompromiss: Maximale soziale Absicherung (insbesondere eigener Krankengeld- und Rentenanspruch) bei gleichzeitig stark reduzierter Beitragsbelastung.</p>
    `
  }
];

/**
 * Decodes Firestore REST API typed values into standard JS primitives
 */
function decodeFirestoreValue(value) {
  if (!value || typeof value !== 'object') return value;
  if ('stringValue' in value) return value.stringValue;
  if ('integerValue' in value) return parseInt(value.integerValue, 10);
  if ('doubleValue' in value) return parseFloat(value.doubleValue);
  if ('booleanValue' in value) return value.booleanValue;
  if ('timestampValue' in value) return value.timestampValue;
  if ('nullValue' in value) return null;
  if ('arrayValue' in value) {
    const list = value.arrayValue.values || [];
    return list.map(decodeFirestoreValue);
  }
  if ('mapValue' in value) {
    const fields = value.mapValue.fields || {};
    const res = {};
    for (const [k, v] of Object.entries(fields)) {
      res[k] = decodeFirestoreValue(v);
    }
    return res;
  }
  return value;
}

/**
 * Collection reference builder
 */
export function collection(database, collectionPath) {
  return {
    type: 'collection',
    path: collectionPath,
    db: database || db
  };
}

/**
 * Filter constraint
 */
export function where(field, op, value) {
  return { type: 'where', field, op, value };
}

/**
 * Order constraint
 */
export function orderBy(field, direction = 'asc') {
  return { type: 'orderBy', field, direction };
}

/**
 * Query builder
 */
export function query(collectionRef, ...constraints) {
  return {
    type: 'query',
    collection: collectionRef,
    constraints: constraints.filter(Boolean)
  };
}

/**
 * Executes a Firestore query or fetches a collection
 */
export async function getDocs(queryOrCol) {
  const collectionName =
    queryOrCol.collection?.path || queryOrCol.path || 'german_blog_posts';
  const projectId = queryOrCol.collection?.db?.projectId || queryOrCol.db?.projectId || FIREBASE_PROJECT_ID;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);

    const url = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/(default)/documents/${encodeURIComponent(collectionName)}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      signal: controller.signal
    });

    clearTimeout(timer);

    if (response.ok) {
      const data = await response.json();
      const rawDocs = data.documents || [];
      
      const parsed = rawDocs.map((doc) => {
        const docId = doc.name ? doc.name.split('/').pop() : '';
        const fields = doc.fields || {};
        const decoded = {};
        for (const [k, v] of Object.entries(fields)) {
          decoded[k] = decodeFirestoreValue(v);
        }
        return {
          id: docId,
          slug: decoded.slug || docId,
          ...decoded
        };
      });

      // Filter by status == 'published'
      const published = parsed.filter(p => !p.status || p.status === 'published');

      // Sort by createdAt descending
      published.sort((a, b) => {
        const timeA = new Date(a.createdAt || 0).getTime();
        const timeB = new Date(b.createdAt || 0).getTime();
        return timeB - timeA;
      });

      if (published.length > 0) {
        return createQuerySnapshot(published);
      }
    }
  } catch (err) {
    // Graceful error logging - calculator remains 100% operational
    console.info('Firestore live query fell back to built-in statutory articles:', err?.message || err);
  }

  // Graceful fallback to verified 2026 German SEO articles
  return createQuerySnapshot(INITIAL_GERMAN_BLOG_POSTS);
}

/**
 * Helper to wrap array into standard Firestore QuerySnapshot format
 */
function createQuerySnapshot(items) {
  const docs = items.map(item => ({
    id: item.id || item.slug,
    data: () => item
  }));

  return {
    docs,
    empty: docs.length === 0,
    size: docs.length,
    forEach(callback) {
      docs.forEach(callback);
    }
  };
}
