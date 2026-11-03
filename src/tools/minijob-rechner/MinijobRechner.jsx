import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Landmark, 
  Check, 
  Info, 
  AlertCircle,
  FileText,
  ChevronDown,
  ShieldCheck,
  Scale,
  Building2,
  Users,
  Clock,
  Calculator,
  HelpCircle,
  Calendar,
  BookOpen,
  ChevronUp
} from 'lucide-react';
import { 
  calculateMinijob, 
  formatCurrency, 
  formatPercent,
  STATUTORY_VALUES,
  MINIJOB_LIMIT_2026,
  MINIJOB_LIMIT_2025,
  MINIJOB_LIMIT_2024,
  MIDIJOB_LIMIT 
} from './minijobLogic';
import { 
  db, 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  INITIAL_GERMAN_BLOG_POSTS 
} from './firebase';
import styles from './styles.module.css';

// Quick-select preset values specified by statutory guidelines
const PRESET_VALUES = [
  { label: '250 €', value: 250 },
  { label: '538 € (2024)', value: 538, year: '2024' },
  { label: '556 € (2025)', value: 556, year: '2025' },
  { label: '603 € (2026 Grenze)', value: 603, year: '2026' },
  { label: '1.000 €', value: 1000 },
  { label: '2.000 €', value: 2000 },
];

// Rich Solid Color Palettes for Blog SEO Cards (NO PILLS, NO GLOW, NO BADGES)
const BLOG_CARD_PALETTES = [
  {
    barColor: '#047857',
    accentColor: '#047857',
    btnBg: '#047857',
    cardBorder: '#059669'
  },
  {
    barColor: '#1d4ed8',
    accentColor: '#1d4ed8',
    btnBg: '#1d4ed8',
    cardBorder: '#2563eb'
  },
  {
    barColor: '#b45309',
    accentColor: '#b45309',
    btnBg: '#b45309',
    cardBorder: '#d97706'
  },
  {
    barColor: '#6d28d9',
    accentColor: '#6d28d9',
    btnBg: '#6d28d9',
    cardBorder: '#7c3aed'
  }
];

// Helper to format dates in authoritative German notation
const formatGermanDate = (dateVal) => {
  if (!dateVal) return '';
  try {
    const d = typeof dateVal === 'object' && dateVal?.toDate ? dateVal.toDate() : new Date(dateVal);
    if (isNaN(d.getTime())) return String(dateVal);
    return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }).format(d);
  } catch {
    return String(dateVal);
  }
};

// Base Institutional FAQ Schema Entities for Minijob 2026
const BASE_FAQ_ENTITIES = [
  {
    "@type": "Question",
    "name": "Wie hoch ist die Minijob-Grenze 2026?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Seit dem 1. Januar 2026 liegt die Geringfügigkeitsgrenze bei monatlich 603 Euro, gekoppelt an den gesetzlichen Mindestlohn von 13,90 Euro pro Stunde."
    }
  },
  {
    "@type": "Question",
    "name": "Wie hoch sind die Abzüge für Minijobber bei der Rentenversicherung?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Minijobber zahlen standardmäßig einen Eigenanteil von 3,6 % zur gesetzlichen Rentenversicherung. Auf schriftlichen Antrag beim Arbeitgeber kann eine vollständige Befreiung erfolgen, sodass Brutto gleich Netto ausgezahlt wird."
    }
  },
  {
    "@type": "Question",
    "name": "Welche Abgaben zahlt ein gewerblicher Arbeitgeber?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Gewerbliche Arbeitgeber entrichten pauschale Abgaben von ca. 31,17 % bis 32,47 % an die Minijob-Zentrale (15 % RV, 13 % KV, 2 % Pauschsteuer zzgl. Umlagen)."
    }
  },
  {
    "@type": "Question",
    "name": "Gilt die Verdienstgrenze auch bei mehreren Beschäftigungen?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Ja. Die Gehälter mehrerer Minijobs werden zusammengerechnet. Übersteigt die Gesamtsumme 603 Euro monatlich, wird die Beschäftigung sozialversicherungspflichtig im Übergangsbereich (Midijob)."
    }
  }
];

// FAQ Accordion Data (contains the 4 required JSON-LD schema questions + additional institutional legal FAQs)
const FAQ_ITEMS = [
  {
    question: "Wie hoch ist die Minijob-Grenze 2026?",
    answer: (
      <>
        <p>
          Seit dem <strong>1. Januar 2026</strong> liegt die Geringfügigkeitsgrenze bei monatlich <strong>603 Euro</strong>, gekoppelt an den gesetzlichen Mindestlohn von <strong>13,90 Euro pro Stunde</strong>.
        </p>
        <p>
          Die gesetzliche Grundlage bildet § 8 Abs. 1a SGB IV: Die monatliche Verdienstgrenze entspricht dem Mindestlohn multipliziert mit 130, geteilt durch 3 und kaufmännisch auf volle Euro aufgerundet: <code>(13,90 € × 130) / 3 = 602,33 € → 603,00 €</code>. Auf ein Kalenderjahr gerechnet beläuft sich die zulässige Jahresverdienstgrenze somit auf <strong>7.236 Euro</strong> (12 Monate × 603 Euro).
        </p>
      </>
    )
  },
  {
    question: "Wie hoch sind die Abzüge für Minijobber bei der Rentenversicherung?",
    answer: (
      <>
        <p>
          Minijobber zahlen standardmäßig einen Eigenanteil von <strong>3,6 %</strong> zur gesetzlichen Rentenversicherung. Auf schriftlichen Antrag beim Arbeitgeber kann eine vollständige Befreiung erfolgen, sodass Brutto gleich Netto ausgezahlt wird.
        </p>
        <p>
          Bei der Höchstgrenze von <strong>603 Euro</strong> beträgt der Rentenversicherungs-Eigenanteil genau <strong>21,71 Euro</strong>. Der Minijobber erhält in diesem Fall <strong>581,29 Euro netto</strong> auf sein Konto ausgezahlt. Wird die Befreiung formlos schriftlich beantragt (§ 6 Abs. 1b SGB VI), erhält der Arbeitnehmer die vollen 603,00 Euro netto ausgezahlt.
        </p>
      </>
    )
  },
  {
    question: "Welche Abgaben zahlt ein gewerblicher Arbeitgeber?",
    answer: (
      <>
        <p>
          Gewerbliche Arbeitgeber entrichten pauschale Abgaben von ca. <strong>31,17 % bis 32,47 %</strong> an die Minijob-Zentrale (15 % RV, 13 % KV, 2 % Pauschsteuer zzgl. Umlagen).
        </p>
        <p>
          Die Abgaben setzen sich wie folgt zusammen:
        </p>
        <ul>
          <li><strong>15,0 %</strong> Pauschalbeitrag zur gesetzlichen Rentenversicherung</li>
          <li><strong>13,0 %</strong> Pauschalbeitrag zur Krankenversicherung (sofern der Minijobber gesetzlich versichert ist)</li>
          <li><strong>2,0 %</strong> Pauschale Lohnsteuer (inkl. Solidaritätszuschlag & Kirchensteuer gem. § 40a Abs. 2 EStG)</li>
          <li><strong>ca. 1,2 %</strong> Umlagen (U1 Lohnfortzahlung im Krankheitsfall, U2 Mutterschutz und Insolvenzgeldumlage)</li>
        </ul>
        <p>
          Bei 603,00 Euro Monatslohn beläuft sich der zusätzliche Arbeitgeberaufwand auf rund <strong>188,14 Euro</strong>, was Gesamtkosten von ca. <strong>791,14 Euro</strong> pro Monat ergibt.
        </p>
      </>
    )
  },
  {
    question: "Gilt die Verdienstgrenze auch bei mehreren Beschäftigungen?",
    answer: (
      <>
        <p>
          Ja. Die Gehälter mehrerer Minijobs werden zusammengerechnet. Übersteigt die Gesamtsumme 603 Euro monatlich, wird die Beschäftigung sozialversicherungspflichtig im Übergangsbereich (Midijob).
        </p>
        <p>
          <strong>Besonderheit bei einer versicherungspflichtigen Hauptbeschäftigung:</strong> Wer bereits in Voll- oder Teilzeit versicherungspflichtig arbeitet, darf <em>genau einen Minijob</em> bis 603 Euro nebenher abgabenfrei ausüben. Jeder zweite und weitere Minijob wird automatisch mit der Hauptbeschäftigung zusammengerechnet und unterliegt der vollen Steuer- und Sozialversicherungspflicht (üblicherweise über Steuerklasse VI).
        </p>
      </>
    )
  },
  {
    question: "Wie viele Arbeitsstunden sind im Minijob 2026 bei 13,90 € Mindestlohn erlaubt?",
    answer: (
      <>
        <p>
          Bei der gesetzlichen Geringfügigkeitsgrenze von <strong>603,00 Euro</strong> und einem Mindestlohn von <strong>13,90 Euro pro Stunde</strong> beträgt die maximal zulässige monatliche Arbeitszeit:
        </p>
        <p>
          <code>603,00 € / 13,90 € pro Stunde = ca. 43,38 Stunden pro Monat</code> (oder durchschnittlich rund <strong>10 Stunden pro Woche</strong>).
        </p>
        <p>
          Zahlt der Arbeitgeber einen höheren Stundenlohn als den Mindestlohn (z. B. 16,00 Euro/h), verringert sich die monatlich zulässige Höchstarbeitszeit entsprechend (z. B. 603 € / 16,00 € = ca. 37,68 Stunden).
        </p>
      </>
    )
  },
  {
    question: "Lohnt sich die Befreiung von der Rentenversicherungspflicht?",
    answer: (
      <>
        <p>
          Durch die Befreiung spart der Minijobber 3,6 % seines Lohns (maximal 21,71 Euro bei 603 Euro). Dennoch raten die Deutsche Rentenversicherung und Verbraucherschützer häufig dazu, den Eigenanteil zu zahlen:
        </p>
        <ul>
          <li><strong>Volle Wartezeitmonate:</strong> Jeder gearbeitete Minijob-Monat zählt als vollwertiger Beitragsmonat für die Mindestversicherungszeit von 35 bzw. 45 Jahren für die Altersrente.</li>
          <li><strong>Erwerbsminderungsschutz:</strong> Bestehende Ansprüche auf eine gesetzliche Erwerbsminderungsrente bleiben lückenlos aufrechterhalten.</li>
          <li><strong>Reha-Leistungen:</strong> Voller Anspruch auf medizinische Rehabilitations- und Kurmaßnahmen der Rentenversicherung.</li>
          <li><strong>Staatliche Riester-Förderung:</strong> Minijobber mit RV-Pflicht erhalten die volle staatliche Riester-Zulage bei einem Mindesteigenbeitrag von lediglich 5 Euro monatlich.</li>
        </ul>
      </>
    )
  },
  {
    question: "Darf die 603-Euro-Grenze gelegentlich überschritten werden?",
    answer: (
      <>
        <p>
          Ein <strong>gelegentliches und unvorhersehbares Überschreiten</strong> der 603-Euro-Grenze ist nach den Geringfügigkeits-Richtlinien der Spitzenorganisationen der Sozialversicherung zulässig.
        </p>
        <p>
          Unvorhersehbar ist eine Überschreitung beispielsweise, wenn kurzfristig für eine erkrankte Arbeitskraft eingesprungen werden muss. Dies ist innerhalb eines 12-Monats-Zeitraums in bis zu <strong>zwei Kalendermonaten</strong> zulässig. In diesen Ausnahmemonaten darf der Verdienst bis zum Doppelten der Minijob-Grenze (max. 1.206 Euro im Monat) betragen, ohne dass der Minijob-Status verloren geht. Geplante Mehrarbeit (z. B. im Weihnachtsgeschäft) gilt nicht als unvorhersehbar!
        </p>
      </>
    )
  },
  {
    question: "Haben Minijobber Anspruch auf bezahlten Urlaub und Lohnfortzahlung?",
    answer: (
      <>
        <p>
          <strong>Ja, ohne Ausnahme.</strong> Nach dem Teilzeit- und Befristungsgesetz (§ 4 TzBfG) gilt der Gleichbehandlungsgrundsatz: Minijobber dürfen gegenüber Vollzeitkräften nicht benachteiligt werden.
        </p>
        <p>
          Minijobber haben gesetzlichen Anspruch auf:
        </p>
        <ul>
          <li><strong>Bezahlten Erholungsurlaub</strong> (berechnet nach Arbeitstagen pro Woche, mind. 4 Wochen p.a. nach Bundesurlaubsgesetz).</li>
          <li><strong>Entgeltfortzahlung im Krankheitsfall</strong> (bis zu 6 Wochen Lohnfortzahlung nach dem Entgeltfortzahlungsgesetz).</li>
          <li><strong>Feiertagsbezahlung</strong> für Tage, an denen regelmäßig gearbeitet worden wäre.</li>
          <li><strong>Gesetzlichen Kündigungsschutz</strong> und gesetzliche Kündigungsfristen (§ 622 BGB).</li>
        </ul>
      </>
    )
  }
];

export default function MinijobRechner() {
  const [abrechnungsjahr, setAbrechnungsjahr] = useState('2026');
  const [brutto, setBrutto] = useState(603);
  const [rvBefreit, setRvBefreit] = useState(false);
  const [openFaqs, setOpenFaqs] = useState({ 0: true, 1: true });

  // Dynamic German SEO Blog Posts from Firestore
  const [blogPosts, setBlogPosts] = useState(INITIAL_GERMAN_BLOG_POSTS);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [postsError, setPostsError] = useState(null);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [activeFaqAccordions, setActiveFaqAccordions] = useState({});
  const [openArticleFaqs, setOpenArticleFaqs] = useState({});
  
  // Display limit: 4 posts initially with Load More functionality
  const [visiblePostsCount, setVisiblePostsCount] = useState(4);

  // Sliced blog posts currently visible in the grid
  const displayedPosts = useMemo(() => {
    return (blogPosts || []).slice(0, visiblePostsCount);
  }, [blogPosts, visiblePostsCount]);

  const hasMorePosts = (blogPosts || []).length > visiblePostsCount;

  const handleLoadMore = () => {
    setVisiblePostsCount(prev => prev + 4);
  };

  const { slug } = useParams();

  // Calculation with pure JS engine
  const result = useMemo(() => {
    return calculateMinijob(brutto, rvBefreit, abrechnungsjahr);
  }, [brutto, rvBefreit, abrechnungsjahr]);

  // Query Firestore collection 'german_blog_posts' (status == 'published', ordered by createdAt desc)
  useEffect(() => {
    let isMounted = true;
    async function fetchPublishedPosts() {
      try {
        setLoadingPosts(true);
        setPostsError(null);
        const q = query(
          collection(db, 'german_blog_posts'),
          where('status', '==', 'published'),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const posts = [];
        snapshot.forEach(doc => {
          posts.push({ id: doc.id, ...doc.data() });
        });
        if (isMounted) {
          if (posts.length > 0) {
            setBlogPosts(posts);
          } else {
            setBlogPosts(INITIAL_GERMAN_BLOG_POSTS);
          }
        }
      } catch (err) {
        console.warn('Hinweis: Firestore-Verbindung nicht aktiv, nutze gepflegte Ratgeber:', err);
        if (isMounted) {
          setPostsError('Fachartikel konnten nicht von der Datenbank geladen werden.');
          setBlogPosts(INITIAL_GERMAN_BLOG_POSTS);
        }
      } finally {
        if (isMounted) {
          setLoadingPosts(false);
        }
      }
    }

    fetchPublishedPosts();
    return () => { isMounted = false; };
  }, []);

  // Determine if a specific blog post is active (either from URL param slug or user expansion)
  const activePost = useMemo(() => {
    if (slug) {
      const match = (blogPosts || []).find(p => p.slug === slug || p.id === slug);
      if (match) return match;
    }
    if (expandedPostId) {
      const match = (blogPosts || []).find(p => p.id === expandedPostId || p.slug === expandedPostId);
      if (match) return match;
    }
    return null;
  }, [slug, expandedPostId, blogPosts]);

  // Auto-expand and scroll to article if slug is provided in URL
  useEffect(() => {
    if (slug && blogPosts.length > 0) {
      setExpandedPostId(slug);
      const postIdx = blogPosts.findIndex(p => p.slug === slug || p.id === slug);
      if (postIdx >= 4) {
        setVisiblePostsCount(Math.ceil((postIdx + 1) / 4) * 4);
      }
      setTimeout(() => {
        const articleEl = document.getElementById(`article-${slug}`);
        if (articleEl) {
          articleEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, [slug, blogPosts]);

  // Dynamic SEO metadata based on whether a specific article or the calculator is in focus
  const seoData = useMemo(() => {
    if (activePost) {
      const keywordsStr = Array.isArray(activePost.keywords) 
        ? `${activePost.keywords.join(', ')}, minijob 2026, 603 euro grenze` 
        : 'minijob 2026, 603 euro rechner';

      return {
        title: `${activePost.title} | Minijob-Rechner 2026`,
        description: activePost.excerpt || 'Fundierter Leitfaden zur aktuellen Minijob-Gesetzeslage 2026.',
        keywords: keywordsStr,
        canonical: `https://msynthos.online/ratgeber/${activePost.slug || activePost.id}`,
        ogTitle: activePost.title,
        ogDescription: activePost.excerpt,
        ogType: 'article'
      };
    }

    return {
      title: 'Minijob-Rechner 2026: Brutto-Netto & Abgaben (603 €)',
      description: 'Kostenloser Minijob-Rechner 2026 für Arbeitnehmer & Arbeitgeber. Exakte Berechnung der 603-Euro-Grenze, 13,90 € Mindestlohn, Abgaben und Netto-Auszahlung.',
      keywords: 'minijob rechner, minijob rechner 2026, 603 euro rechner, arbeitgeber abgaben minijob, brutto netto minijob, rentenversicherung befreiung minijob rechner, minijob zentrale rechner, midijob rechner 2026, geringfuegigkeitsgrenze 2026',
      canonical: 'https://msynthos.online/de/minijob-rechner',
      ogTitle: 'Minijob-Rechner 2026: Brutto-Netto & Abgaben (603 €)',
      ogDescription: 'Berechnen Sie Netto-Auszahlung, Rentenversicherungsanteil und Arbeitgeberabgaben nach der neuen 603-Euro-Grenze 2026.',
      ogType: 'website'
    };
  }, [activePost]);

  // Specific WebApplication Structured Data per statutory guidelines
  const webAppSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Minijob-Rechner 2026",
    "url": "https://msynthos.online/de/minijob-rechner",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    }
  }), []);

  // Compute dynamic Schema.org JSON-LD (Article + FAQPage schemas)
  const schemaData = useMemo(() => {
    const dynamicArticleFaqs = (blogPosts || []).flatMap(post => 
      (post.faqs || []).map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": typeof faq.answer === 'string' ? faq.answer : (faq.answer?.props?.children ? String(faq.answer.props.children) : '')
        }
      }))
    );

    const graph = [
      webAppSchema,
      {
        "@type": "FAQPage",
        "mainEntity": [
          ...BASE_FAQ_ENTITIES,
          ...dynamicArticleFaqs
        ]
      }
    ];

    // If an article is active, inject Article structured data
    if (activePost) {
      graph.push({
        "@type": "Article",
        "headline": activePost.title,
        "description": activePost.excerpt,
        "image": "https://msynthos.online/minijob-favicon.png",
        "datePublished": activePost.createdAt,
        "dateModified": activePost.createdAt,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://msynthos.online/ratgeber/${activePost.slug || activePost.id}`
        },
        "author": {
          "@type": "Organization",
          "name": "Msynthos Fachredaktion",
          "url": "https://msynthos.online/"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Msynthos",
          "logo": {
            "@type": "ImageObject",
            "url": "https://msynthos.online/logo.jpeg"
          }
        },
        "inLanguage": "de-DE",
        "keywords": Array.isArray(activePost.keywords) ? activePost.keywords.join(', ') : ''
      });
    }

    return {
      "@context": "https://schema.org",
      "@graph": graph
    };
  }, [blogPosts, activePost]);

  // Route-Specific Favicon & Meta Integration (Isolated strictly to the Minijob Rechner tool)
  useEffect(() => {
    // 1. Snapshot original favicon link tags from document.head to preserve company branding
    const existingIconLinks = Array.from(document.querySelectorAll("link[rel*='icon']"));
    const originalIcons = existingIconLinks.map(link => ({
      element: link,
      rel: link.getAttribute('rel'),
      href: link.getAttribute('href'),
      type: link.getAttribute('type'),
      sizes: link.getAttribute('sizes')
    }));

    // 2. Dynamically set tool-specific favicons while on this route
    existingIconLinks.forEach(link => {
      const rel = (link.getAttribute('rel') || '').toLowerCase();
      const sizes = link.getAttribute('sizes') || '';

      if (rel.includes('apple-touch-icon')) {
        link.setAttribute('href', '/minijob-apple-touch-icon.png');
      } else if (sizes === '32x32' || sizes === '16x16') {
        link.setAttribute('href', '/minijob-favicon-32x32.png');
        link.setAttribute('type', 'image/png');
      } else {
        link.setAttribute('href', '/minijob-favicon.png');
        link.setAttribute('type', 'image/png');
      }
    });

    // Fallback if no icon links were found
    const createdElements = [];
    if (!document.querySelector("link[rel='icon']")) {
      const icon = document.createElement('link');
      icon.rel = 'icon';
      icon.type = 'image/png';
      icon.href = '/minijob-favicon.png';
      document.head.appendChild(icon);
      createdElements.push(icon);
    }
    if (!document.querySelector("link[rel='apple-touch-icon']")) {
      const touchIcon = document.createElement('link');
      touchIcon.rel = 'apple-touch-icon';
      touchIcon.href = '/minijob-favicon.png';
      document.head.appendChild(touchIcon);
      createdElements.push(touchIcon);
    }

    // 3. Cleanup on unmount: restore original company favicons when navigating away to other company routes
    return () => {
      originalIcons.forEach(({ element, rel, href, type, sizes }) => {
        if (rel) element.setAttribute('rel', rel);
        if (href) element.setAttribute('href', href);
        if (type) {
          element.setAttribute('type', type);
        } else {
          element.removeAttribute('type');
        }
        if (sizes) {
          element.setAttribute('sizes', sizes);
        } else {
          element.removeAttribute('sizes');
        }
      });
      createdElements.forEach(el => el.remove());
    };
  }, []);

  // Inject SEO metadata, language tag, Open Graph, Twitter Cards, and dynamic JSON-LD into head
  useEffect(() => {
    // 1. Ensure German language attribute
    document.documentElement.lang = 'de';

    // 2. Document Title
    document.title = seoData.title;

    // Helper for updating or creating meta tags
    const setMetaTag = (attrName, attrValue, content) => {
      let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Standard SEO Tags
    setMetaTag('name', 'description', seoData.description);
    setMetaTag('name', 'keywords', seoData.keywords);

    // Open Graph Tags
    setMetaTag('property', 'og:title', seoData.ogTitle);
    setMetaTag('property', 'og:description', seoData.ogDescription);
    setMetaTag('property', 'og:url', seoData.canonical);
    setMetaTag('property', 'og:type', seoData.ogType);
    setMetaTag('property', 'og:locale', 'de_DE');
    setMetaTag('property', 'og:site_name', 'Msynthos Minijob-Portal');
    // Open Graph Image for Minijob tool
    setMetaTag('property', 'og:image', 'https://msynthos.online/minijob-logo.webp');
    setMetaTag('property', 'og:image:width', '512');
    setMetaTag('property', 'og:image:height', '512');
    setMetaTag('property', 'og:image:alt', 'Minijob-Rechner 2026 Icon & Abgabenrechner');

    // Article Specific Open Graph tags
    if (activePost) {
      setMetaTag('property', 'article:published_time', activePost.createdAt || new Date().toISOString());
      setMetaTag('property', 'article:section', 'Arbeitsrecht & Lohnabrechnung');
      if (activePost.keywords?.[0]) {
        setMetaTag('property', 'article:tag', activePost.keywords[0]);
      }
    }

    // Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', seoData.ogTitle);
    setMetaTag('name', 'twitter:description', seoData.ogDescription);
    setMetaTag('name', 'twitter:image', 'https://msynthos.online/minijob-logo.webp');
    setMetaTag('name', 'twitter:url', seoData.canonical);

    // Canonical link: strictly point to self
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', seoData.canonical);

    // Dynamic JSON-LD structured script for WebApplication
    let webAppScript = document.getElementById('minijob-schema-webapplication');
    if (!webAppScript) {
      webAppScript = document.createElement('script');
      webAppScript.id = 'minijob-schema-webapplication';
      webAppScript.type = 'application/ld+json';
      document.head.appendChild(webAppScript);
    }
    webAppScript.textContent = JSON.stringify(webAppSchema);

    // Dynamic JSON-LD structured script for FAQs and articles
    let script = document.getElementById('minijob-schema-jsonld');
    if (!script) {
      script = document.createElement('script');
      script.id = 'minijob-schema-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schemaData);

    return () => {
      // ONLY restore company standard meta tags if navigating away from minijob route
      const currentPath = window.location.pathname;
      if (!currentPath.startsWith('/de/minijob-rechner') && !currentPath.startsWith('/ratgeber')) {
        const s1 = document.getElementById('minijob-schema-webapplication');
        if (s1) s1.remove();
        const s2 = document.getElementById('minijob-schema-jsonld');
        if (s2) s2.remove();
        document.documentElement.lang = 'en';
        document.title = 'Msynthos | Full-Service Digital Agency & Tech Solutions';
        const ogImg = document.querySelector('meta[property="og:image"]');
        if (ogImg) ogImg.setAttribute('content', 'https://msynthos.online/logo.jpeg');
        const twImg = document.querySelector('meta[name="twitter:image"]');
        if (twImg) twImg.setAttribute('content', 'https://msynthos.online/logo.jpeg');
        const canon = document.querySelector('link[rel="canonical"]');
        if (canon) canon.setAttribute('href', 'https://msynthos.online/');
      }
    };
  }, [seoData, schemaData, webAppSchema, activePost]);

  const toggleExpandPost = (postId) => {
    setExpandedPostId(prev => prev === postId ? null : postId);
  };

  const togglePostFaqsVisibility = (postId) => {
    setActiveFaqAccordions(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const toggleArticleFaq = (faqKey) => {
    setOpenArticleFaqs(prev => ({
      ...prev,
      [faqKey]: !prev[faqKey]
    }));
  };

  const scrollToCalculator = () => {
    const topEl = document.getElementById('rechner-top');
    if (topEl) {
      topEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e) => {
    const val = parseFloat(e.target.value);
    setBrutto(isNaN(val) ? 0 : Math.max(0, val));
  };

  const handleSliderChange = (e) => {
    setBrutto(parseFloat(e.target.value));
  };

  const handlePresetClick = (preset) => {
    setBrutto(preset.value);
    if (preset.year) {
      setAbrechnungsjahr(preset.year);
    }
  };

  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setAbrechnungsjahr(newYear);
    // Align default gross if user was on a limit preset
    if (brutto === 603 || brutto === 556 || brutto === 538) {
      if (newYear === '2026') setBrutto(603);
      else if (newYear === '2025') setBrutto(556);
      else if (newYear === '2024') setBrutto(538);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaqs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className={styles.container}>
      {/* Route-Specific Isolated Favicon & Touch Icon for Minijob Tool */}
      <link rel="icon" type="image/png" href="/minijob-logo.webp" />
      <link rel="apple-touch-icon" href="/minijob-logo.webp" />

      {/* React 19 Document Metadata Hoisting */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords} />
      <link rel="canonical" href={seoData.canonical} />
      {/* Open Graph Tags */}
      <meta property="og:title" content={seoData.ogTitle} />
      <meta property="og:description" content={seoData.ogDescription} />
      <meta property="og:url" content={seoData.canonical} />
      <meta property="og:type" content={seoData.ogType} />
      <meta property="og:locale" content="de_DE" />
      <meta property="og:site_name" content="Msynthos Minijob-Portal" />
      <meta property="og:image" content="https://msynthos.online/minijob-logo.webp" />
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.ogTitle} />
      <meta name="twitter:description" content={seoData.ogDescription} />
      <meta name="twitter:image" content="https://msynthos.online/minijob-logo.webp" />
      <meta name="twitter:url" content={seoData.canonical} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      {/* 1. Institutioneller Portal-Header */}
      <header className={`${styles.header} w-full`}>
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={styles.headerContent}>
            <div className={styles.brandGroup}>
              <div className={styles.brandEmblem}>
                <img 
                  src="/minijob-logo.webp" 
                  alt="Minijob-Rechner Logo" 
                  className={styles.brandLogoImg} 
                  width="40" 
                  height="40" 
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
              <div>
                <h2 className={`${styles.brandTitle} break-words hyphens-auto`}>Minijob-Rechner</h2>
                <p className={`${styles.brandSubtitle} break-words`}>Berechnungsportal für geringfügige Beschäftigung & Übergangsbereich</p>
              </div>
            </div>
            <div className={styles.headerMeta}>
              <span className={styles.jurisdictionTag}>Deutschland</span>
              <span>Stand: 2026 / 2025 / 2024</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Hauptbereich: Standard Centered Container */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 py-8">
        {/* Intro Header */}
        <section className="w-full mb-6" aria-labelledby="heading-overview">
          <div className={`${styles.badge2026} break-words hyphens-auto mb-3`}>
            <Scale size={14} />
            <span>Geringfügigkeitsgrenze 2026: 603 €</span>
          </div>

          <h1 id="heading-overview" className={`${styles.h1} break-words hyphens-auto mb-3`}>
            Minijob-Rechner 2026: Brutto-Netto & Arbeitgeberabgaben
          </h1>
          <p className={`${styles.subtitle} break-words`}>
            Ermitteln Sie die exakte Netto-Auszahlung, den 3,6 % Rentenversicherungs-Eigenanteil 
            nach der neuen <strong>603-Euro-Grenze</strong> (Mindestlohn 13,90 €) sowie die pauschalen 
            Arbeitgeberabgaben (~31,2 %) und den Übergangsbereich nach § 20 SGB IV.
          </p>
        </section>

        {/* 3. 4 Solid Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full my-6">
          <div className={`${styles.kpiCard} ${styles.kpiCardRed} w-full`}>
            <span className={`${styles.kpiValue} break-words`}>603,00 €</span>
            <span className={`${styles.kpiLabel} break-words hyphens-auto`}>Minijob-Grenze 2026</span>
            <p className={`${styles.kpiDesc} break-words`}>Gültig seit 01.01.2026 (7.236 € Jahresverdienstgrenze)</p>
          </div>
          <div className={`${styles.kpiCard} ${styles.kpiCardPurple} w-full`}>
            <span className={`${styles.kpiValue} break-words`}>13,90 €</span>
            <span className={`${styles.kpiLabel} break-words hyphens-auto`}>Gesetzlicher Mindestlohn</span>
            <p className={`${styles.kpiDesc} break-words`}>Gesetzliche Untergrenze für alle Branchen in Deutschland</p>
          </div>
          <div className={`${styles.kpiCard} ${styles.kpiCardAmber} w-full`}>
            <span className={`${styles.kpiValue} break-words`}>3,6 %</span>
            <span className={`${styles.kpiLabel} break-words hyphens-auto`}>RV-Eigenanteil Minijobber</span>
            <p className={`${styles.kpiDesc} break-words`}>Max. 21,71 €/Monat für vollwertige Rentenansprüche</p>
          </div>
          <div className={`${styles.kpiCard} ${styles.kpiCardBlue} w-full`}>
            <span className={`${styles.kpiValue} break-words`}>~31,2 %</span>
            <span className={`${styles.kpiLabel} break-words hyphens-auto`}>Arbeitgeberabgaben</span>
            <p className={`${styles.kpiDesc} break-words`}>Pauschale Abgaben im Gewerbe (RV, KV, Steuer, Umlagen)</p>
          </div>
        </div>

        {/* Calculator Split Section (Desktop vs Mobile 2-Column Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-8" id="rechner-top">
          {/* Left Column (Inputs/Sliders): lg:col-span-7 w-full */}
          <div className="lg:col-span-7 w-full flex flex-col gap-6">
            {/* Formular-Karte */}
            <div className={`${styles.formCard} w-full`}>
              <div className={styles.cardHeader}>
                <h2 className={`${styles.cardTitle} break-words hyphens-auto`}>Angaben zur Beschäftigung</h2>
                <p className={styles.cardSubtitle}>Wählen Sie Abrechnungszeitraum und monatlichen Bruttolohn</p>
              </div>

              {/* Abrechnungsjahr */}
              <div className={styles.formGroup}>
                <label htmlFor="abrechnungsjahr-select" className={styles.label}>
                  Abrechnungsjahr & Gesetzliche Grenze
                </label>
                <select
                  id="abrechnungsjahr-select"
                  value={abrechnungsjahr}
                  onChange={handleYearChange}
                  className={styles.selectInput}
                >
                  <option value="2026">2026 (Neue Grenze: 603 € | Mindestlohn: 13,90 €)</option>
                  <option value="2025">2025 (Grenze: 556 € | Mindestlohn: 12,82 €)</option>
                  <option value="2024">2024 (Grenze: 538 € | Mindestlohn: 12,41 €)</option>
                </select>
              </div>

              {/* Monatlicher Bruttolohn */}
              <div className={styles.formGroup}>
                <label htmlFor="bruttolohn-input" className={styles.label}>
                  Monatlicher Bruttolohn (€)
                </label>
                <div className={styles.inputGroup}>
                  <span className={styles.currencyPrefix} aria-hidden="true">€</span>
                  <input
                    id="bruttolohn-input"
                    type="number"
                    min="0"
                    max="5000"
                    step="1"
                    value={brutto === 0 ? '' : brutto}
                    onChange={handleInputChange}
                    placeholder="603"
                    className={styles.numberInput}
                  />
                  <span className={styles.currencySuffix} aria-hidden="true">EUR / Monat</span>
                </div>

                {/* Range Slider */}
                <div className={styles.sliderContainer}>
                  <input
                    type="range"
                    min="0"
                    max="2500"
                    step="1"
                    value={brutto}
                    onChange={handleSliderChange}
                    className={styles.rangeSlider}
                    aria-label="Bruttolohn Schieberegler"
                  />
                  <div className={styles.sliderMarks}>
                    <button 
                      type="button" 
                      onClick={() => setBrutto(0)} 
                      className={`${styles.markBtn} ${brutto === 0 ? styles.markBtnActive : ''}`}
                    >
                      0 €
                    </button>
                    <button 
                      type="button" 
                      onClick={() => { setAbrechnungsjahr('2024'); setBrutto(538); }} 
                      className={`${styles.markBtn} ${brutto === 538 && abrechnungsjahr === '2024' ? styles.markBtnActive : ''}`}
                    >
                      538 € (2024)
                    </button>
                    <button 
                      type="button" 
                      onClick={() => { setAbrechnungsjahr('2025'); setBrutto(556); }} 
                      className={`${styles.markBtn} ${brutto === 556 && abrechnungsjahr === '2025' ? styles.markBtnActive : ''}`}
                    >
                      556 € (2025)
                    </button>
                    <button 
                      type="button" 
                      onClick={() => { setAbrechnungsjahr('2026'); setBrutto(603); }} 
                      className={`${styles.markBtn} ${brutto === 603 && abrechnungsjahr === '2026' ? styles.markBtnActive : ''}`}
                    >
                      603 € (2026)
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setBrutto(2000)} 
                      className={`${styles.markBtn} ${brutto === 2000 ? styles.markBtnActive : ''}`}
                    >
                      2.000 €
                    </button>
                  </div>
                </div>

                {/* Schnellauswahl Buttons */}
                <div className={styles.presetsRow}>
                  {PRESET_VALUES.map((preset) => {
                    const isSelected = brutto === preset.value && (preset.year ? abrechnungsjahr === preset.year : true);
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => handlePresetClick(preset)}
                        className={`${styles.presetBtn} ${isSelected ? styles.presetBtnActive : ''}`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Checkbox: RV-Befreiung */}
              <div className={styles.checkboxCard}>
                <label className={styles.checkboxLabelRow} htmlFor="rv-checkbox">
                  <input
                    id="rv-checkbox"
                    type="checkbox"
                    checked={rvBefreit && brutto <= result.currentLimit}
                    disabled={brutto > result.currentLimit}
                    onChange={(e) => setRvBefreit(e.target.checked)}
                    className={styles.standardCheckbox}
                  />
                  <div>
                    <span className={`${styles.checkboxTitle} break-words hyphens-auto`}>
                      Befreiung von der Rentenversicherungspflicht beantragen (§ 6 Abs. 1b SGB VI)
                    </span>
                    <p className={styles.checkboxHelp}>
                      {brutto <= result.currentLimit ? (
                        `Gilt ausschließlich im Minijob (bis ${formatCurrency(result.currentLimit)}). Bei Befreiung entfällt der Arbeitnehmer-Eigenanteil von 3,6 % (Netto = Brutto).`
                      ) : (
                        `Im Midijob (ab ${formatCurrency(result.currentLimit + 0.01)}) besteht gesetzliche Sozialversicherungspflicht. Eine Befreiung ist ausgeschlossen.`
                      )}
                    </p>
                  </div>
                </label>

                {brutto <= result.currentLimit && (
                  rvBefreit ? (
                    <div className={`${styles.statusNotice} ${styles.noticeWarning}`}>
                      <AlertCircle size={16} className={styles.noticeIcon} />
                      <span>
                        <strong>Befreiung aktiv:</strong> Volle Auszahlung ({result.formatted.net}), 
                        jedoch keine vollwertigen Pflichtbeitragsmonate in der Rentenversicherung und eingeschränkter Schutz.
                      </span>
                    </div>
                  ) : (
                    <div className={`${styles.statusNotice} ${styles.noticeSuccess}`}>
                      <Check size={16} className={styles.noticeIcon} />
                      <span>
                        <strong>Gesetzliche Pflicht:</strong> Für {result.formatted.rvContribution} Eigenanteil (3,6 %) 
                        sichern Sie sich vollwertige Beitragszeiten, Reha-Leistungen und Erwerbsminderungsschutz.
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Desktop Only: Gesetzliche Grundlagen auf einen Blick & Rechtliche Grundlage */}
            <div className="hidden lg:flex lg:flex-col lg:gap-6">
              <div className={`${styles.infoSection} w-full max-w-full`}>
                <h2 className={`${styles.infoSectionTitle} break-words hyphens-auto`}>
                  <Info size={18} />
                  Gesetzliche Grundlagen auf einen Blick
                </h2>
                <ul className={styles.infoList}>
                  <li className={styles.infoItem}>
                    <Check size={18} className={styles.checkIcon} />
                    <span>
                      <strong>Neue Minijob-Grenze (603 € ab 2026):</strong> Die monatliche Verdienstgrenze 
                      steigt zum 01.01.2026 auf 603,00 € (Jahresgrenze: 7.236 €), direkt gekoppelt an den Mindestlohn von 13,90 €/h.
                    </span>
                  </li>
                  <li className={styles.infoItem}>
                    <Check size={18} className={styles.checkIcon} />
                    <span>
                      <strong>Rentenversicherungspflicht (3,6 %):</strong> Im Minijob zahlt der Arbeitnehmer standardmäßig 
                      3,6 % Eigenanteil ({result.category === 'minijob' && !rvBefreit ? result.formatted.rvContribution : 'max. 21,71 €'}), 
                      um volle Beitragszeiten und Reha-Ansprüche zu erwerben.
                    </span>
                  </li>
                  <li className={styles.infoItem}>
                    <Check size={18} className={styles.checkIcon} />
                    <span>
                      <strong>Befreiungsantrag (§ 6 Abs. 1b SGB VI):</strong> Auf schriftlichen Antrag beim Arbeitgeber 
                      erfolgt die Befreiung. Es gilt: Netto = Brutto (0,00 € Abzug).
                    </span>
                  </li>
                  <li className={styles.infoItem}>
                    <Check size={18} className={styles.checkIcon} />
                    <span>
                      <strong>Arbeitgeberabgaben Gewerbe (~31,2 %):</strong> Gewerbliche Betriebe entrichten pauschal 
                      ca. 31,2 % an die Minijob-Zentrale (15 % RV, 13 % KV, 2 % Steuer zzgl. Umlagen).
                    </span>
                  </li>
                  <li className={styles.infoItem}>
                    <Check size={18} className={styles.checkIcon} />
                    <span>
                      <strong>Übergangsbereich (603,01 € bis 2.000 €):</strong> Im Midijob steigen die 
                      Arbeitnehmer-Sozialabgaben stufenweise von ca. 11 % auf rund 20,5 % an.
                    </span>
                  </li>
                </ul>
              </div>

              <div className={styles.legalReferenceBox}>
                <strong>Rechtliche Grundlage:</strong> Berechnung gemäß Viertes Buch Sozialgesetzbuch (SGB IV) § 8 
                (Geringfügige Beschäftigung) und § 20 (Übergangsbereich / Gleitzone). Richtlinien der Spitzenorganisationen der Sozialversicherung.
              </div>
            </div>
          </div>

          {/* Right Column (Results/Netto Summary Card): lg:col-span-5 w-full lg:sticky lg:top-6 */}
          <div className="lg:col-span-5 w-full lg:sticky lg:top-6">
            {/* Ergebnis-Box */}
            <div className={`${styles.resultsBox} w-full`}>
              <div className={styles.resultsHeader}>
                <div>
                  <p className={styles.resultsHeaderTitle}>Monatlicher Netto-Auszahlungsbetrag</p>
                  <p className={`${styles.resultsNetAmount} break-words`}>{result.formatted.net}</p>
                </div>
                <div className={`${styles.statusIndicator} break-words hyphens-auto`}>
                  {result.status}
                </div>
              </div>

              {/* Tabellarische Aufschlüsselung */}
              <div className={styles.tableContainer}>
                <table className={styles.dataTable} aria-label="Abzüge im Detail">
                  <tbody>
                    <tr>
                      <td className={styles.dataLabel}>Bruttolohn</td>
                      <td className={styles.dataValue}>{result.formatted.gross}</td>
                    </tr>
                    <tr>
                      <td className={styles.dataLabel}>
                        Rentenversicherung (RV)
                        {result.category === 'minijob' && !rvBefreit && ' (3,6 % Eigenanteil)'}
                        {result.category === 'minijob' && rvBefreit && ' (Befreit)'}
                      </td>
                      <td className={`${styles.dataValue} ${result.rvContribution > 0 ? styles.deductionText : ''}`}>
                        {result.rvContribution > 0 ? `- ${result.formatted.rvContribution}` : '0,00 €'}
                      </td>
                    </tr>

                    {result.category !== 'minijob' && (
                      <>
                        <tr>
                          <td className={styles.dataLabel}>Krankenversicherung (KV)</td>
                          <td className={`${styles.dataValue} ${result.kvContribution > 0 ? styles.deductionText : ''}`}>
                            {result.kvContribution > 0 ? `- ${result.formatted.kvContribution}` : '0,00 €'}
                          </td>
                        </tr>
                        <tr>
                          <td className={styles.dataLabel}>Pflegeversicherung (PV)</td>
                          <td className={`${styles.dataValue} ${result.pvContribution > 0 ? styles.deductionText : ''}`}>
                            {result.pvContribution > 0 ? `- ${result.formatted.pvContribution}` : '0,00 €'}
                          </td>
                        </tr>
                        <tr>
                          <td className={styles.dataLabel}>Arbeitslosenversicherung (AV)</td>
                          <td className={`${styles.dataValue} ${result.avContribution > 0 ? styles.deductionText : ''}`}>
                            {result.avContribution > 0 ? `- ${result.formatted.avContribution}` : '0,00 €'}
                          </td>
                        </tr>
                      </>
                    )}

                    <tr>
                      <td className={styles.dataLabel}>Gesamte Sozialabgaben Arbeitnehmer</td>
                      <td className={`${styles.dataValue} ${result.totalDeductions > 0 ? styles.deductionText : ''}`}>
                        {result.totalDeductions > 0 ? `- ${result.formatted.totalDeductions}` : '0,00 €'}
                      </td>
                    </tr>

                    <tr className={styles.totalRow}>
                      <td>Netto-Auszahlung</td>
                      <td className={`${styles.dataValue} ${styles.totalNetValue}`}>
                        {result.formatted.net}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Arbeitgeber Pauschalbeitrag Hinweis (~31,2 %) */}
              <div className={styles.employerNote}>
                <strong>Arbeitgeber-Aufwand (Gewerbe ~31,2 %):</strong> Der gewerbliche Betrieb entrichtet ca. 31,2 % 
                ({result.employerEstimate.formattedTotal}) an pauschalen Abgaben an die Minijob-Zentrale:
                <ul className={styles.employerBreakdownList}>
                  <li>15,0 % Rentenversicherung ({result.employerEstimate.formattedRv})</li>
                  <li>13,0 % Krankenversicherung ({result.employerEstimate.formattedKv})</li>
                  <li>2,0 % Pauschale Lohnsteuer gem. § 40a EStG ({result.employerEstimate.formattedTax})</li>
                  <li>ca. 1,2 % Umlagen U1, U2 und Insolvenzgeldumlage ({result.employerEstimate.formattedUmlagen})</li>
                </ul>
              </div>

              {/* Legal Disclaimer at bottom of Results Card */}
              <div className={styles.calculatorDisclaimerBox}>
                <p className={styles.calculatorDisclaimerText}>
                  Hinweis: Alle Berechnungen erfolgen ohne Gewähr. Dieser Rechner ersetzt keine steuerliche oder rechtliche Beratung gemäß Steuerberatungsgesetz (StBerG).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer clearly visible at bottom of calculator */}
        <div className={styles.calculatorBottomNotice}>
          <p className={styles.calculatorBottomNoticeText}>
            <strong>Hinweis:</strong> Alle Berechnungen erfolgen ohne Gewähr. Dieser Rechner ersetzt keine steuerliche oder rechtliche Beratung gemäß Steuerberatungsgesetz (StBerG).
          </p>
        </div>

        {/* Mobile Only: Gesetzliche Grundlagen & Rechtliche Grundlage (stacked right after calculator on mobile) */}
        <div className="flex flex-col gap-6 lg:hidden my-6">
          <div className={`${styles.infoSection} w-full max-w-full`}>
            <h2 className={`${styles.infoSectionTitle} break-words hyphens-auto`}>
              <Info size={18} />
              Gesetzliche Grundlagen auf einen Blick
            </h2>
            <ul className={styles.infoList}>
              <li className={styles.infoItem}>
                <Check size={18} className={styles.checkIcon} />
                <span>
                  <strong>Neue Minijob-Grenze (603 € ab 2026):</strong> Die monatliche Verdienstgrenze 
                  steigt zum 01.01.2026 auf 603,00 € (Jahresgrenze: 7.236 €), direkt gekoppelt an den Mindestlohn von 13,90 €/h.
                </span>
              </li>
              <li className={styles.infoItem}>
                <Check size={18} className={styles.checkIcon} />
                <span>
                  <strong>Rentenversicherungspflicht (3,6 %):</strong> Im Minijob zahlt der Arbeitnehmer standardmäßig 
                  3,6 % Eigenanteil ({result.category === 'minijob' && !rvBefreit ? result.formatted.rvContribution : 'max. 21,71 €'}), 
                  um volle Beitragszeiten und Reha-Ansprüche zu erwerben.
                </span>
              </li>
              <li className={styles.infoItem}>
                <Check size={18} className={styles.checkIcon} />
                <span>
                  <strong>Befreiungsantrag (§ 6 Abs. 1b SGB VI):</strong> Auf schriftlichen Antrag beim Arbeitgeber 
                  erfolgt die Befreiung. Es gilt: Netto = Brutto (0,00 € Abzug).
                </span>
              </li>
              <li className={styles.infoItem}>
                <Check size={18} className={styles.checkIcon} />
                <span>
                  <strong>Arbeitgeberabgaben Gewerbe (~31,2 %):</strong> Gewerbliche Betriebe entrichten pauschal 
                  ca. 31,2 % an die Minijob-Zentrale (15 % RV, 13 % KV, 2 % Steuer zzgl. Umlagen).
                </span>
              </li>
              <li className={styles.infoItem}>
                <Check size={18} className={styles.checkIcon} />
                <span>
                  <strong>Übergangsbereich (603,01 € bis 2.000 €):</strong> Im Midijob steigen die 
                  Arbeitnehmer-Sozialabgaben stufenweise von ca. 11 % auf rund 20,5 % an.
                </span>
              </li>
            </ul>
          </div>

          <div className={styles.legalReferenceBox}>
            <strong>Rechtliche Grundlage:</strong> Berechnung gemäß Viertes Buch Sozialgesetzbuch (SGB IV) § 8 
            (Geringfügige Beschäftigung) und § 20 (Übergangsbereich / Gleitzone). Richtlinien der Spitzenorganisationen der Sozialversicherung.
          </div>
        </div>

        {/* 3. DYNAMISCHE RATGEBER & AKTUELLES 2026 (FIRESTORE SEO ARTICLES) */}
        <section id="ratgeber-aktuelles" className={`${styles.blogSection} w-full`} aria-labelledby="blog-section-heading">
          <div className={styles.blogHeader}>
            <h2 id="blog-section-heading" className={`${styles.blogSectionTitle} break-words hyphens-auto`}>
              <BookOpen size={24} style={{ color: '#047857' }} />
              Ratgeber & Aktuelles 2026
            </h2>
            <p className={styles.blogSectionSubtitle}>
              Fundierte Fachartikel zu Arbeitsrecht, Mindestlohn 13,90 € und gesetzlichen Minijob-Regelungen. 
              Dynamisch aus der Fachdatenbank aktualisiert.
            </p>
          </div>

          {/* Error Banner (falls Firestore offline ist, zeigen wir verlässliche Fallbacks) */}
          {postsError && (
            <div className={styles.blogErrorBanner} role="alert">
              <AlertCircle size={18} />
              <span>{postsError} Es werden verifizierte gesetzliche Referenzartikel angezeigt.</span>
            </div>
          )}

          {/* Loading Skeletons */}
          {loadingPosts ? (
            <div className={`${styles.blogGrid} grid grid-cols-1 md:grid-cols-2 gap-4 w-full`}>
              {[1, 2, 3].map((n) => (
                <div key={n} className={styles.blogSkeletonCard}>
                  <div className={styles.skeletonLine} style={{ height: '14px', width: '45%' }} />
                  <div className={styles.skeletonLine} style={{ height: '22px', width: '85%' }} />
                  <div className={styles.skeletonLine} style={{ height: '16px', width: '100%' }} />
                  <div className={styles.skeletonLine} style={{ height: '16px', width: '92%' }} />
                  <div className={styles.skeletonLine} style={{ height: '26px', width: '50%', marginTop: '1rem' }} />
                </div>
              ))}
            </div>
          ) : (
            <div className={`${styles.blogGrid} grid grid-cols-1 md:grid-cols-2 gap-4 w-full`}>
              {displayedPosts.map((post, index) => {
                const palette = BLOG_CARD_PALETTES[index % BLOG_CARD_PALETTES.length];
                const postId = post.id || post.slug;
                const isExpanded = expandedPostId === postId;
                const showPostFaqs = Boolean(activeFaqAccordions[postId]);

                return (
                  <article 
                    key={postId} 
                    id={`article-${postId}`}
                    className={`${styles.blogCard} w-full`}
                    style={{ borderTop: `4px solid ${palette.barColor}` }}
                  >
                    <div className={styles.blogCardContent}>
                      {/* Metadaten: Datum & Lesezeit */}
                      <div className={styles.blogMetaRow}>
                        <div className={styles.blogMetaItem}>
                          <Calendar size={13} className={styles.blogMetaIcon} style={{ color: palette.accentColor }} />
                          <span>{formatGermanDate(post.createdAt)}</span>
                        </div>
                        <div className={styles.blogMetaItem}>
                          <Clock size={13} className={styles.blogMetaIcon} style={{ color: palette.accentColor }} />
                          <span>{post.readTime || '5 Min. Lesezeit'}</span>
                        </div>
                      </div>

                      {/* Titel */}
                      <h3 className={`${styles.blogCardTitle} break-words hyphens-auto`}>
                        {post.title}
                      </h3>

                      {/* Auszug / Excerpt */}
                      <p className={`${styles.blogCardExcerpt} break-words`}>
                        {post.excerpt}
                      </p>

                      {/* Keywords Tags (Rechteckig, solide Farben - KEINE Pills, KEINE Badges) */}
                      {Array.isArray(post.keywords) && post.keywords.length > 0 && (
                        <div className={styles.blogKeywordsList} aria-label="Schlagwörter">
                          {post.keywords.map((kw, kwIdx) => (
                            <span key={kwIdx} className={styles.blogKeywordTag}>
                              {kw}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Aktionsleiste */}
                      <div className={styles.blogActionsRow}>
                        <button
                          type="button"
                          onClick={() => toggleExpandPost(postId)}
                          className={styles.blogPrimaryBtn}
                          style={{ backgroundColor: palette.btnBg }}
                          aria-expanded={isExpanded}
                        >
                          <BookOpen size={15} />
                          <span>{isExpanded ? 'Artikel schließen' : 'Vollständigen Artikel lesen'}</span>
                        </button>

                        {Array.isArray(post.faqs) && post.faqs.length > 0 && (
                          <button
                            type="button"
                            onClick={() => togglePostFaqsVisibility(postId)}
                            className={`${styles.blogSecondaryBtn} ${showPostFaqs ? styles.blogSecondaryBtnActive : ''}`}
                            aria-expanded={showPostFaqs}
                          >
                            <HelpCircle size={14} style={{ color: palette.accentColor }} />
                            <span>{post.faqs.length} FAQs</span>
                            <ChevronDown 
                              size={14} 
                              className={`${styles.faqChevron} ${showPostFaqs ? styles.faqChevronOpen : ''}`} 
                            />
                          </button>
                        )}
                      </div>

                      {/* Vollständiger HTML-Artikel (aufklappbar) */}
                      {isExpanded && post.contentHtml && (
                        <div className={styles.blogExpandedSection}>
                          <div 
                            className={styles.blogArticleHtml} 
                            dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
                          />
                          
                          <div className={styles.blogArticleCta} style={{ borderLeftColor: palette.barColor }}>
                            <div>
                              <strong>Minijob 2026 selbst berechnen:</strong> Nutzen Sie unseren kostenlosen Rechner oben, um Ihre individuellen Abzüge und Nettoansprüche exakt zu berechnen.
                            </div>
                            <button 
                              type="button"
                              onClick={scrollToCalculator} 
                              className={styles.blogScrollCtaBtn}
                              style={{ backgroundColor: palette.btnBg }}
                            >
                              <Calculator size={14} />
                              <span>Zum Rechner</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* FAQ-Akkordeon zum Artikel */}
                      {showPostFaqs && Array.isArray(post.faqs) && post.faqs.length > 0 && (
                        <div className={styles.articleFaqAccordion}>
                          <h4 className={styles.articleFaqHeading}>
                            <HelpCircle size={15} style={{ color: palette.accentColor }} />
                            <span>Häufige Fragen zu diesem Ratgeber</span>
                          </h4>
                          <div className={styles.articleFaqList}>
                            {post.faqs.map((faq, faqIdx) => {
                              const faqKey = `${postId}-${faqIdx}`;
                              const isOpen = Boolean(openArticleFaqs[faqKey]);
                              return (
                                <div 
                                  key={faqIdx} 
                                  className={`${styles.articleFaqItem} ${isOpen ? styles.articleFaqItemOpen : ''}`}
                                  style={isOpen ? { borderLeft: `3px solid ${palette.barColor}` } : {}}
                                >
                                  <button
                                    type="button"
                                    onClick={() => toggleArticleFaq(faqKey)}
                                    className={`${styles.articleFaqQuestionBtn} break-words hyphens-auto`}
                                    aria-expanded={isOpen}
                                  >
                                    <span className="break-words hyphens-auto">{faq.question}</span>
                                    <ChevronDown 
                                      size={15} 
                                      className={`${styles.faqChevron} ${isOpen ? styles.faqChevronOpen : ''}`} 
                                    />
                                  </button>
                                  {isOpen && (
                                    <div className={styles.articleFaqAnswer}>
                                      {faq.answer}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Steuerung zur kompakten Anzeige: Weitere Artikel laden */}
          {!loadingPosts && blogPosts.length > 4 && (
            <div className={styles.blogLoadMoreContainer}>
              {hasMorePosts ? (
                <div className={styles.blogLoadMoreWrapper}>
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    className={styles.blogLoadMoreBtn}
                    id="btn-load-more-posts"
                  >
                    <ChevronDown size={16} />
                    <span>Weitere Artikel laden ({blogPosts.length - visiblePostsCount} weitere)</span>
                  </button>
                  <span className={styles.blogPostCountLabel}>
                    Zeige {displayedPosts.length} von {blogPosts.length} Fachartikeln
                  </span>
                </div>
              ) : (
                <div className={styles.blogAllLoadedWrapper}>
                  <div className={styles.blogAllLoadedNotice}>
                    <Check size={14} className={styles.allLoadedCheckIcon} />
                    <span>Alle {blogPosts.length} Fachartikel sind geladen</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setVisiblePostsCount(4)}
                    className={styles.blogCollapseBtn}
                    title="Kompakte Ansicht wiederherstellen"
                  >
                    <ChevronUp size={14} />
                    <span>Auf 4 reduzieren</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </section>

        {/* 4. Ausführlicher SEO Ratgeber & Leitfaden */}
        {/* 4. Ausführlicher SEO Ratgeber & Leitfaden */}
        <section id="ratgeber-minijob" className={`${styles.seoContainer} w-full max-w-full`} aria-labelledby="ratgeber-heading">
          <div className={styles.seoHeader}>
            <h2 id="ratgeber-heading" className={`${styles.seoTitle} break-words hyphens-auto`}>
              Umfassender Minijob-Ratgeber 2026: Gesetze, Grenzen & Praxiswissen
            </h2>
            <p className={`${styles.seoSubtitle} break-words`}>
              Rechtssicherer Leitfaden für Arbeitnehmer und Arbeitgeber zur 603-Euro-Grenze, 
              den Mindestlohn-Auswirkungen und Beitragsberechnungen nach deutschem Sozialrecht.
            </p>
          </div>

          {/* Kapitel 1: Die 603-Euro-Grenze */}
          <article className={styles.guideSection}>
            <h3 className={`${styles.guideSectionTitle} break-words hyphens-auto`}>
              <Calculator size={20} className={styles.sectionIcon} />
              1. Die neue Geringfügigkeitsgrenze ab 2026: Koppelung an den Mindestlohn
            </h3>
            <p className={styles.guideParagraph}>
              Mit der Reform des Mindestlohngesetzes und des Vierten Buches Sozialgesetzbuch (§ 8 Abs. 1a SGB IV) 
              ist die Verdienstgrenze für geringfügig entlohnte Beschäftigungen (Minijobs) dynamisch an die Entwicklung des 
              gesetzlichen Mindestlohns gekoppelt. Zum 1. Januar 2026 stieg der gesetzliche Mindestlohn auf 
              <strong> 13,90 Euro pro Zeitstunde</strong>.
            </p>
            <p className={styles.guideParagraph}>
              Die Berechnung erfolgt nach der gesetzlichen Formel: Bei einer wöchentlichen Arbeitszeit von 10 Stunden 
              ergibt sich multipliziert mit dem Mindestlohn und dem Faktor 130/3 ein Betrag von 
              <code>(13,90 € × 130) / 3 = 602,33 Euro</code>. Nach der gesetzlichen Rundungsvorschrift (§ 8 Abs. 1a Satz 2 SGB IV) 
              wird auf volle Euro aufgerundet, womit die neue <strong>Geringfügigkeitsgrenze exakt 603,00 Euro</strong> beträgt.
            </p>

            {/* Historische Entwicklungstabelle mit alternierenden soliden Zeilenfarben */}
            <div className="w-full overflow-x-auto my-6 border border-slate-200 rounded-lg">
              <table className={styles.guideTable} aria-label="Historische Entwicklung der Minijob-Grenzwerte">
                <thead>
                  <tr>
                    <th>Gültigkeitszeitraum</th>
                    <th>Gesetzlicher Mindestlohn</th>
                    <th>Monatliche Minijob-Grenze</th>
                    <th>Jährliche Verdienstgrenze</th>
                    <th>Max. Monatsstunden (Mindestlohn)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={styles.tableRowRed}>
                    <td>Bis 30.09.2022</td>
                    <td>9,82 € / 10,45 €</td>
                    <td>450,00 €</td>
                    <td>5.400,00 €</td>
                    <td>ca. 43,0 Std.</td>
                  </tr>
                  <tr className={styles.tableRowPurple}>
                    <td>01.10.2022 – 31.12.2023</td>
                    <td>12,00 €</td>
                    <td>520,00 €</td>
                    <td>6.240,00 €</td>
                    <td>ca. 43,3 Std.</td>
                  </tr>
                  <tr className={styles.tableRowAmber}>
                    <td>01.01.2024 – 31.12.2024</td>
                    <td>12,41 €</td>
                    <td>538,00 €</td>
                    <td>6.456,00 €</td>
                    <td>ca. 43,35 Std.</td>
                  </tr>
                  <tr className={styles.tableRowGreen}>
                    <td>01.01.2025 – 31.12.2025</td>
                    <td>12,82 €</td>
                    <td>556,00 €</td>
                    <td>6.672,00 €</td>
                    <td>ca. 43,37 Std.</td>
                  </tr>
                  <tr className={styles.tableRowBlue}>
                    <td><strong>Ab 01.01.2026 (Aktuell)</strong></td>
                    <td><strong>13,90 €</strong></td>
                    <td><strong>603,00 €</strong></td>
                    <td><strong>7.236,00 €</strong></td>
                    <td><strong>ca. 43,38 Std.</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>

          {/* Kapitel 2: Rentenversicherungspflicht & Befreiung */}
          <article className={styles.guideSection}>
            <h3 className={`${styles.guideSectionTitle} break-words hyphens-auto`}>
              <ShieldCheck size={20} className={styles.sectionIcon} />
              2. Rentenversicherungspflicht: 3,6 % Eigenanteil oder Befreiung?
            </h3>
            <p className={styles.guideParagraph}>
              Seit 2013 sind Minijobber in Deutschland grundsätzlich versicherungspflichtig in der gesetzlichen 
              Rentenversicherung. Der Arbeitgeber zahlt hierfür einen Pauschalbetrag von 15,0 %, während der Minijobber 
              die Differenz zum vollen Beitragssatz von 18,6 % als Eigenanteil trägt: <strong>genau 3,6 %</strong>.
            </p>

            <div className={styles.comparisonGrid}>
              <div className={styles.comparisonCard}>
                <div className={styles.comparisonHeader}>
                  <h4 className={`${styles.comparisonTitle} break-words hyphens-auto`}>In der RV-Pflicht verbleiben</h4>
                  <span className={`${styles.comparisonBadge} ${styles.badgeGewerbe}`}>Empfohlen</span>
                </div>
                <ul className={styles.comparisonList}>
                  <li><span>Eigenanteil (bei 603 €):</span> <strong>21,71 €</strong></li>
                  <li><span>Nettoauszahlung:</span> <strong>581,29 €</strong></li>
                  <li><span>Wartezeitmonate für Rente:</span> <strong>12 volle Monate / Jahr</strong></li>
                  <li><span>Erwerbsminderungsschutz:</span> <strong>Voll erhalten</strong></li>
                  <li><span>Reha- & Kuransprüche:</span> <strong>Gesichert</strong></li>
                  <li><span>Riester-Förderung:</span> <strong>Berechtigt (5 € Mindestbeitrag)</strong></li>
                </ul>
              </div>

              <div className={styles.comparisonCard}>
                <div className={styles.comparisonHeader}>
                  <h4 className={`${styles.comparisonTitle} break-words hyphens-auto`}>Befreiung beantragen (§ 6 SGB VI)</h4>
                  <span className={`${styles.comparisonBadge} ${styles.badgeHaushalt}`}>Netto-Maximierung</span>
                </div>
                <ul className={styles.comparisonList}>
                  <li><span>Eigenanteil (bei 603 €):</span> <strong>0,00 €</strong></li>
                  <li><span>Nettoauszahlung:</span> <strong>603,00 € (Brutto = Netto)</strong></li>
                  <li><span>Wartezeitmonate für Rente:</span> <strong>Nur anteilig (~4 Monate)</strong></li>
                  <li><span>Erwerbsminderungsschutz:</span> <strong>Entfällt / geht verloren</strong></li>
                  <li><span>Reha- & Kuransprüche:</span> <strong>Kein Anspruch</strong></li>
                  <li><span>Riester-Förderung:</span> <strong>Ausgeschlossen</strong></li>
                </ul>
              </div>
            </div>

            <div className={styles.guideCallout}>
              <strong>Wichtiger Rechtshinweis:</strong> Der Antrag auf Befreiung von der Rentenversicherungspflicht 
              muss schriftlich beim Arbeitgeber eingereicht werden. Er gilt ab dem Zeitpunkt des Zugangs und ist für die 
              gesamte Dauer der Beschäftigung bindend. Ein Widerruf ist gesetzlich nicht möglich!
            </div>
          </article>

          {/* Kapitel 3: Arbeitgeberabgaben Gewerbe vs. Haushalt */}
          <article className={styles.guideSection}>
            <h3 className={`${styles.guideSectionTitle} break-words hyphens-auto`}>
              <Building2 size={20} className={styles.sectionIcon} />
              3. Arbeitgeberabgaben im Detail: Gewerbe vs. Privathaushalt
            </h3>
            <p className={styles.guideParagraph}>
              Arbeitgeber müssen für Minijobber pauschale Abgaben an die <strong>Minijob-Zentrale</strong> (Deutsche Rentenversicherung Knappschaft-Bahn-See) 
              entrichten. Die Höhe unterscheidet sich elementar zwischen gewerblichen Betrieben und privaten Haushalten:
            </p>

            <div className={styles.comparisonGrid}>
              <div className={styles.comparisonCard}>
                <div className={styles.comparisonHeader}>
                  <h4 className={`${styles.comparisonTitle} break-words hyphens-auto`}>Gewerblicher Arbeitgeber</h4>
                  <span className={`${styles.comparisonBadge} ${styles.badgeGewerbe}`}>ca. 31,2 %</span>
                </div>
                <ul className={styles.comparisonList}>
                  <li><span>Rentenversicherung (pauschal):</span> <strong>15,0 % (90,45 €)</strong></li>
                  <li><span>Krankenversicherung (pauschal):</span> <strong>13,0 % (78,39 €)</strong></li>
                  <li><span>Pauschsteuer (§ 40a EStG):</span> <strong>2,0 % (12,06 €)</strong></li>
                  <li><span>Umlage U1 (Lohnfortzahlung):</span> <strong>ca. 0,9 % (5,43 €)</strong></li>
                  <li><span>Umlage U2 (Mutterschutz):</span> <strong>ca. 0,24 % (1,45 €)</strong></li>
                  <li><span>Insolvenzgeldumlage:</span> <strong>ca. 0,06 % (0,36 €)</strong></li>
                </ul>
                <div className={styles.comparisonTotal}>
                  <span>Gesamtabgaben bei 603 € Lohn:</span>
                  <span>ca. 188,14 € / Monat</span>
                </div>
              </div>

              <div className={styles.comparisonCard}>
                <div className={styles.comparisonHeader}>
                  <h4 className={`${styles.comparisonTitle} break-words hyphens-auto`}>Privathaushalt (Haushaltsscheck)</h4>
                  <span className={`${styles.comparisonBadge} ${styles.badgeHaushalt}`}>ca. 14,9 %</span>
                </div>
                <ul className={styles.comparisonList}>
                  <li><span>Rentenversicherung (pauschal):</span> <strong>5,0 % (30,15 €)</strong></li>
                  <li><span>Krankenversicherung (pauschal):</span> <strong>5,0 % (30,15 €)</strong></li>
                  <li><span>Pauschsteuer:</span> <strong>2,0 % (12,06 €)</strong></li>
                  <li><span>Gesetzl. Unfallversicherung:</span> <strong>1,6 % (9,65 €)</strong></li>
                  <li><span>Umlagen U1 & U2:</span> <strong>ca. 1,3 % (7,84 €)</strong></li>
                  <li><span>Steuerbonus nach § 35a EStG:</span> <strong>20 % Steuernachlass</strong></li>
                </ul>
                <div className={styles.comparisonTotal}>
                  <span>Gesamtabgaben bei 603 € Lohn:</span>
                  <span>ca. 89,85 € / Monat</span>
                </div>
              </div>
            </div>
          </article>

          {/* Kapitel 4: Der Übergangsbereich / Midijob */}
          <article className={styles.guideSection}>
            <h3 className={`${styles.guideSectionTitle} break-words hyphens-auto`}>
              <Scale size={20} className={styles.sectionIcon} />
              4. Der Übergangsbereich (Midijob von 603,01 € bis 2.000,00 €)
            </h3>
            <p className={styles.guideParagraph}>
              Verdient ein Arbeitnehmer mehr als 603,00 Euro monatlich, greift sofort der sogenannte 
              <strong> Übergangsbereich (Midijob nach § 20 SGB IV)</strong>, der bis zu einem Monatseinkommen von 
              <strong> 2.000,00 Euro</strong> reicht.
            </p>
            <p className={styles.guideParagraph}>
              Der Gesetzgeber verhindert damit die berüchtigte "Abgabenklippe": Statt ab 603,01 Euro die vollen 
              Sozialabgaben von ca. 20,5 % zahlen zu müssen, steigen die Arbeitnehmerbeiträge über eine mathematische 
              Gleitzonenformel allmählich von ca. 11 % auf rund 20,5 % an. Der große Vorteil: Der Arbeitnehmer erhält 
              bereits ab dem ersten Euro über der 603-Euro-Grenze den <strong>vollen Sozialversicherungsschutz</strong> in 
              der Kranken-, Pflege-, Renten- und Arbeitslosenversicherung (inkl. Krankengeldanspruch und Arbeitslosengeld I).
            </p>
          </article>

          {/* Kapitel 5: Mehrere Beschäftigungen */}
          <article className={styles.guideSection}>
            <h3 className={`${styles.guideSectionTitle} break-words hyphens-auto`}>
              <Users size={20} className={styles.sectionIcon} />
              5. Zusammenrechnung bei mehreren Minijobs & Hauptbeschäftigung
            </h3>
            <p className={styles.guideParagraph}>
              Nach § 8 Abs. 2 SGB IV werden mehrere geringfügige Beschäftigungen für die versicherungsrechtliche 
              Beurteilung zusammengerechnet:
            </p>
            <ul className={styles.infoList}>
              <li className={styles.infoItem}>
                <Check size={18} className={styles.checkIcon} />
                <span>
                  <strong>Mehrere Minijobs ohne Hauptberuf:</strong> Die Gehälter werden addiert. Ergibt die Summe 
                  maximal 603,00 Euro, bleiben alle Minijobs geringfügig. Übersteigt die Gesamtsumme 603,00 Euro, 
                  werden alle Beschäftigungen ab dem Zeitpunkt des Überschreitens sozialversicherungspflichtig im Übergangsbereich.
                </span>
              </li>
              <li className={styles.infoItem}>
                <Check size={18} className={styles.checkIcon} />
                <span>
                  <strong>Hauptberuf + Minijobs:</strong> Wer bereits eine sozialversicherungspflichtige Hauptbeschäftigung ausübt, 
                  darf <em>genau einen Minijob</em> bis 603 Euro abgabenfrei ausüben. Jeder weitere Minijob wird automatisch 
                  mit der Hauptbeschäftigung zusammengerechnet und ist voll beitragspflichtig (meist Steuerklasse VI).
                </span>
              </li>
            </ul>
          </article>

          {/* Kapitel 6: Arbeitsrecht & Höchstarbeitszeit */}
          <article className={styles.guideSection}>
            <h3 className={`${styles.guideSectionTitle} break-words hyphens-auto`}>
              <Clock size={20} className={styles.sectionIcon} />
              6. Maximale Arbeitszeit & Arbeitsrechte für Minijobber
            </h3>
            <p className={styles.guideParagraph}>
              Mit dem Mindestlohn von 13,90 Euro im Jahr 2026 darf ein Minijobber monatlich maximal 
              <strong> 43,38 Stunden</strong> arbeiten (ca. 10 Stunden pro Woche). 
              Arbeitgeber sind gesetzlich nach § 17 MiLoG verpflichtet, Beginn, Ende und Dauer der täglichen Arbeitszeit 
              von Minijobbern genau aufzuzeichnen und diese Dokumentation mindestens zwei Jahre aufzubewahren.
            </p>
            <p className={styles.guideParagraph}>
              Zudem gilt arbeitsrechtlich der <strong>Gleichbehandlungsgrundsatz (§ 4 TzBfG)</strong>: Minijobber 
              haben die gleichen Rechte wie Vollzeitkräfte – insbesondere auf bezahlten Erholungsurlaub, Lohnfortzahlung im 
              Krankheitsfall (bis zu 6 Wochen), Feiertagsbezahlung und Kündigungsschutz.
            </p>
          </article>

          {/* Interaktive FAQ Accordion Sektion */}
          <section id="faq-accordions" className={styles.faqSection} aria-labelledby="faq-heading">
            <h3 id="faq-heading" className={`${styles.faqSectionTitle} break-words hyphens-auto`}>
              <HelpCircle size={22} className={styles.sectionIcon} />
              Häufig gestellte Fragen (FAQ) zum Minijob 2026
            </h3>
            <p className={styles.faqSectionSubtitle}>
              Die wichtigsten rechtlichen und finanziellen Fragen rund um die 603-Euro-Grenze, Rentenversicherung und Abgaben.
            </p>

            <div className={styles.faqList}>
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = Boolean(openFaqs[index]);
                return (
                  <div 
                    key={index} 
                    className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className={`${styles.faqButton} ${isOpen ? styles.faqButtonActive : ''}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      id={`faq-btn-${index}`}
                    >
                      <span className="break-words hyphens-auto">{item.question}</span>
                      <ChevronDown 
                        size={18} 
                        className={`${styles.faqChevron} ${isOpen ? styles.faqChevronOpen : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div 
                        id={`faq-answer-${index}`} 
                        role="region" 
                        aria-labelledby={`faq-btn-${index}`}
                        className={styles.faqAnswer}
                      >
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </section>
      </main>

      {/* 4. Institutioneller Footer */}
      <footer className={`${styles.footer} w-full`}>
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={styles.footerContent}>
            <div className={styles.footerDisclaimer}>
              <p className={styles.disclaimerText}>
                <strong className={styles.disclaimerHeading}>Rechtlicher Hinweis:</strong> Dieser Rechner dient der unverbindlichen Orientierungsberechnung 
                nach deutschem Sozialversicherungsrecht (SGB IV, SGB VI, MiLoG). Es wird keine Haftung für die Richtigkeit der 
                Ergebnisse übernommen. Eine rechtliche oder steuerliche Beratung durch Fachanwälte oder Steuerberater wird hierdurch nicht ersetzt.
              </p>
              <p className={styles.footerCopyright}>
                © {new Date().getFullYear()} Minijob-Rechner Portal Deutschland • Gesetzliche Vorgaben 2026 / 2025 / 2024.
              </p>
            </div>
            <div className={styles.footerLinks}>
              <span className={styles.footerLink}>Minijob-Grenze 2026: 603 €</span>
              <span className={styles.footerLink}>Mindestlohn: 13,90 €</span>
              <span className={styles.footerLink}>Übergangsbereich: bis 2.000 €</span>
              <span className={styles.footerLink}>SGB IV & SGB VI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
