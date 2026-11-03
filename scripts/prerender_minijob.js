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

function transformHtml(sourceHtml) {
  let html = sourceHtml;

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

  // 8. Inject Schema.org WebApplication JSON-LD before </head>
  const schemaScript = `    <!-- Schema.org WebApplication Structured Data -->\n    <script type="application/ld+json">\n${JSON.stringify(WEB_APP_SCHEMA, null, 2)}\n    </script>\n  `;
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

  // Write to public/de/minijob-rechner/index.html (bundled by Vite)
  const publicDir = path.resolve(ROOT_DIR, 'public', 'de', 'minijob-rechner');
  fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(path.resolve(publicDir, 'index.html'), transformed, 'utf-8');
  console.log('[Prerender] Generated public/de/minijob-rechner/index.html');

  // If dist exists, write to dist/de/minijob-rechner/index.html as well
  const distDir = path.resolve(ROOT_DIR, 'dist', 'de', 'minijob-rechner');
  if (fs.existsSync(path.resolve(ROOT_DIR, 'dist'))) {
    fs.mkdirSync(distDir, { recursive: true });
    fs.writeFileSync(path.resolve(distDir, 'index.html'), transformed, 'utf-8');
    console.log('[Prerender] Generated dist/de/minijob-rechner/index.html');
  }
}

run();
