import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const TITLE = 'Minijob-Rechner 2026: Brutto-Netto & Abgaben (603 €)';
const DESCRIPTION = 'Kostenloser Minijob-Rechner 2026 für Arbeitnehmer & Arbeitgeber. Exakte Berechnung der 603-Euro-Grenze, 13,90 € Mindestlohn, Abgaben und Netto-Auszahlung.';
const CANONICAL_URL = 'https://msynthos.online/de/minijob-rechner';
const OG_IMAGE = 'https://msynthos.online/minijob-logo.webp';

const WEB_APP_SCHEMA = {
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
};

function getArticles() {
  const articlesPath = path.resolve(ROOT_DIR, 'src', 'data', 'german_blog_posts.json');
  if (fs.existsSync(articlesPath)) {
    try {
      return JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));
    } catch (e) {
      console.warn('[Prerender] Could not parse german_blog_posts.json:', e.message);
    }
  }
  return [];
}

function transformHtml(sourceHtml) {
  let html = sourceHtml;
  const articles = getArticles();

  // 1. Language attribute
  html = html.replace(/<html lang="[^"]*"/i, '<html lang="de"');

  // 2. Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${TITLE}</title>`);

  // 3. Meta Description
  if (html.includes('<meta name="description"')) {
    html = html.replace(/<meta name="description" content="[^"]*"\s*\/?>/i, `<meta name="description" content="${DESCRIPTION}" />`);
  } else {
    html = html.replace('</head>', `    <meta name="description" content="${DESCRIPTION}" />\n  </head>`);
  }

  // 4. Canonical tag
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${CANONICAL_URL}" />`);
  } else {
    html = html.replace('</head>', `    <link rel="canonical" href="${CANONICAL_URL}" />\n  </head>`);
  }

  // 5. Open Graph Tags
  html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${TITLE}" />`);
  html = html.replace(/<meta property="og:description" content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="Berechnen Sie Netto-Auszahlung, Rentenversicherungsanteil und Arbeitgeberabgaben nach der neuen 603-Euro-Grenze 2026." />`);
  html = html.replace(/<meta property="og:url" content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${CANONICAL_URL}" />`);
  html = html.replace(/<meta property="og:image" content="[^"]*"\s*\/?>/i, `<meta property="og:image" content="${OG_IMAGE}" />`);

  // 6. Twitter Tags
  html = html.replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${TITLE}" />`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="Berechnen Sie Netto-Auszahlung, Rentenversicherungsanteil und Arbeitgeberabgaben nach der neuen 603-Euro-Grenze 2026." />`);
  html = html.replace(/<meta name="twitter:image" content="[^"]*"\s*\/?>/i, `<meta name="twitter:image" content="${OG_IMAGE}" />`);
  html = html.replace(/<meta name="twitter:url" content="[^"]*"\s*\/?>/i, `<meta name="twitter:url" content="${CANONICAL_URL}" />`);

  // 7. Remove root agency schema to keep Minijob WebApplication schema clean and primary
  html = html.replace(/<!-- JSON-LD Structured Data[\s\S]*?<\/script>/i, '');

  // 8. Build complete Schema.org graph: WebApplication + ItemList (all articles) + FAQPage
  const dynamicFaqs = articles.flatMap(post => 
    (post.faqs || []).map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": typeof faq.answer === 'string' ? faq.answer : ''
      }
    }))
  );

  const fullSchemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      WEB_APP_SCHEMA,
      {
        "@type": "ItemList",
        "name": "Minijob 2026 Fachratgeber & Gesetzesleitfäden",
        "numberOfItems": articles.length,
        "itemListElement": articles.map((art, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": art.title,
          "url": `https://msynthos.online/ratgeber/${art.slug}`
        }))
      },
      {
        "@type": "FAQPage",
        "mainEntity": dynamicFaqs
      }
    ]
  };

  const schemaScript = `    <!-- Schema.org WebApplication, Articles ItemList & FAQs Structured Data -->\n    <script type="application/ld+json">\n${JSON.stringify(fullSchemaGraph, null, 2)}\n    </script>\n  `;
  html = html.replace('</head>', `${schemaScript}</head>`);

  return html;
}

function run() {
  const distHtmlPath = path.resolve(ROOT_DIR, 'dist', 'index.html');
  const srcHtmlPath = path.resolve(ROOT_DIR, 'index.html');

  const baseHtml = fs.existsSync(distHtmlPath)
    ? fs.readFileSync(distHtmlPath, 'utf-8')
    : fs.readFileSync(srcHtmlPath, 'utf-8');

  const transformed = transformHtml(baseHtml);

  // 1. Write flat pre-rendered HTML file to public/de/minijob-rechner.html
  // (Flat file prevents Netlify from treating /de/minijob-rechner as a directory and appending a trailing slash)
  const publicDeDir = path.resolve(ROOT_DIR, 'public', 'de');
  fs.mkdirSync(publicDeDir, { recursive: true });
  fs.writeFileSync(path.resolve(publicDeDir, 'minijob-rechner.html'), transformed, 'utf-8');
  console.log('[Prerender] Generated public/de/minijob-rechner.html');

  // Clean up legacy directory public/de/minijob-rechner/ if it exists to avoid directory routing collisions
  const legacyPublicSubdir = path.resolve(ROOT_DIR, 'public', 'de', 'minijob-rechner');
  if (fs.existsSync(legacyPublicSubdir)) {
    fs.rmSync(legacyPublicSubdir, { recursive: true, force: true });
    console.log('[Prerender] Cleaned up legacy directory public/de/minijob-rechner/');
  }

  // 2. If dist exists, write to dist/de/minijob-rechner.html
  if (fs.existsSync(path.resolve(ROOT_DIR, 'dist'))) {
    const distDeDir = path.resolve(ROOT_DIR, 'dist', 'de');
    fs.mkdirSync(distDeDir, { recursive: true });
    fs.writeFileSync(path.resolve(distDeDir, 'minijob-rechner.html'), transformed, 'utf-8');
    console.log('[Prerender] Generated dist/de/minijob-rechner.html');

    const legacyDistSubdir = path.resolve(ROOT_DIR, 'dist', 'de', 'minijob-rechner');
    if (fs.existsSync(legacyDistSubdir)) {
      fs.rmSync(legacyDistSubdir, { recursive: true, force: true });
      console.log('[Prerender] Cleaned up legacy directory dist/de/minijob-rechner/');
    }
  }

  // 3. Ensure public/_redirects has explicit force-redirect rules
  const redirectsContent = `# Force permanent 301 trailing-slash redirect for Minijob Rechner to prevent duplicate indexing in GSC
/de/minijob-rechner/   /de/minijob-rechner   301!

# Serve pre-rendered Minijob Rechner HTML for exact route and sub-routes
/de/minijob-rechner    /de/minijob-rechner.html   200
/de/minijob-rechner/*  /de/minijob-rechner.html   200

# SPA wildcard fallback
/*                     /index.html                200
`;
  fs.writeFileSync(path.resolve(ROOT_DIR, 'public', '_redirects'), redirectsContent, 'utf-8');
  console.log('[Prerender] Updated public/_redirects');

  if (fs.existsSync(path.resolve(ROOT_DIR, 'dist'))) {
    fs.writeFileSync(path.resolve(ROOT_DIR, 'dist', '_redirects'), redirectsContent, 'utf-8');
    console.log('[Prerender] Updated dist/_redirects');
  }
}

run();
