/**
 * Dynamic Sitemap Generator for Msynthos
 * Generates public/sitemap.xml with base pages and all published SEO blog posts from Firestore.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.resolve(ROOT_DIR, 'public');
const SITEMAP_PATH = path.resolve(PUBLIC_DIR, 'sitemap.xml');
const DIST_SITEMAP_PATH = path.resolve(ROOT_DIR, 'dist', 'sitemap.xml');

const BASE_URL = 'https://msynthos.online';
const FIREBASE_PROJECT_ID = process.env.VITE_FIREBASE_PROJECT_ID || 'msynthos-digital';

// Core static routes for Msynthos
const STATIC_ROUTES = [
  {
    url: `${BASE_URL}/`,
    changefreq: 'weekly',
    priority: '1.0'
  },
  {
    url: `${BASE_URL}/de/minijob-rechner`,
    changefreq: 'daily',
    priority: '0.9'
  },
  {
    url: `${BASE_URL}/services`,
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    url: `${BASE_URL}/courses`,
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    url: `${BASE_URL}/about`,
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    url: `${BASE_URL}/contact`,
    changefreq: 'monthly',
    priority: '0.7'
  }
];

// Fallback high-value 2026 German Minijob SEO articles
const FALLBACK_POSTS = [
  {
    slug: 'urlaubsanspruch-minijob-2026-berechnen',
    lastmod: '2026-01-15'
  },
  {
    slug: 'minijob-hoechstarbeitszeit-2026-mindestlohn',
    lastmod: '2026-01-10'
  },
  {
    slug: 'rentenversicherung-minijob-befreiung-2026',
    lastmod: '2026-01-05'
  },
  {
    slug: 'zwei-minijobs-gleichzeitig-steuern-2026',
    lastmod: '2026-01-02'
  },
  {
    slug: 'lohnfortzahlung-krankheit-minijob-2026',
    lastmod: '2025-12-28'
  },
  {
    slug: 'midijob-uebergangsbereich-2026-vorteile',
    lastmod: '2025-12-20'
  }
];

/**
 * Fetch published posts from local JSON database and Firestore REST API
 */
async function fetchPublishedPosts() {
  const postMap = new Map();

  // 1. Read from primary source of truth: src/data/german_blog_posts.json
  const jsonPath = path.resolve(ROOT_DIR, 'src', 'data', 'german_blog_posts.json');
  if (fs.existsSync(jsonPath)) {
    try {
      const localPosts = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
      for (const p of localPosts) {
        if (p.slug) {
          const lastmod = (p.createdAt || new Date().toISOString()).split('T')[0];
          postMap.set(p.slug, { slug: p.slug, lastmod });
        }
      }
      console.log(`[Sitemap] Loaded ${postMap.size} articles from src/data/german_blog_posts.json`);
    } catch (err) {
      console.warn('[Sitemap] Warning reading local articles JSON:', err.message);
    }
  }

  // 2. Query Firestore for any additional live posts
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const endpoint = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(FIREBASE_PROJECT_ID)}/databases/(default)/documents/german_blog_posts`;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (response.ok) {
      const data = await response.json();
      const rawDocs = data.documents || [];

      for (const doc of rawDocs) {
        const fields = doc.fields || {};
        const status = fields.status?.stringValue || 'published';
        if (status === 'published') {
          const docId = doc.name ? doc.name.split('/').pop() : '';
          const slug = fields.slug?.stringValue || docId;
          const createdAt = fields.createdAt?.timestampValue || new Date().toISOString();
          const lastmod = createdAt.split('T')[0];
          if (slug) {
            postMap.set(slug, { slug, lastmod });
          }
        }
      }
    }
  } catch (err) {
    console.info(`[Sitemap] Note: Firestore remote query not reachable (${err.message}). Using verified articles.`);
  }

  // Fallback if empty
  if (postMap.size === 0) {
    for (const fb of FALLBACK_POSTS) {
      postMap.set(fb.slug, fb);
    }
  }

  const result = Array.from(postMap.values());
  console.log(`[Sitemap] Total blog articles included in sitemap: ${result.length}`);
  return result;
}

/**
 * Build sitemap XML string
 */
function buildSitemapXml(staticRoutes, blogPosts) {
  const today = new Date().toISOString().split('T')[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // 1. Static Routes
  for (const route of staticRoutes) {
    xml += '  <url>\n';
    xml += `    <loc>${route.url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  }

  // 2. Dynamic Blog Post Routes (both /ratgeber/<slug> and /de/minijob-rechner/<slug>)
  for (const post of blogPosts) {
    const postDate = post.lastmod || today;

    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}/ratgeber/${post.slug}</loc>\n`;
    xml += `    <lastmod>${postDate}</lastmod>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';

    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}/de/minijob-rechner/${post.slug}</loc>\n`;
    xml += `    <lastmod>${postDate}</lastmod>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';
  return xml;
}

/**
 * Main execution
 */
async function generate() {
  console.log('[Sitemap] Generating sitemap.xml...');
  const blogPosts = await fetchPublishedPosts();
  const xml = buildSitemapXml(STATIC_ROUTES, blogPosts);

  // Write to public/sitemap.xml
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }
  fs.writeFileSync(SITEMAP_PATH, xml, 'utf8');
  console.log(`[Sitemap] Successfully wrote ${SITEMAP_PATH}`);

  // Also write to dist/sitemap.xml if dist directory exists
  const distDir = path.resolve(ROOT_DIR, 'dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(DIST_SITEMAP_PATH, xml, 'utf8');
    console.log(`[Sitemap] Successfully updated ${DIST_SITEMAP_PATH}`);
  }
}

generate().catch(err => {
  console.error('[Sitemap] Error generating sitemap:', err);
  process.exit(1);
});
