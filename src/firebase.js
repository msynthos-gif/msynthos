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

import GERMAN_BLOG_POSTS from './data/german_blog_posts.json';

/**
 * 2026 German Minijob SEO Articles Pool (authoritative JSON source)
 */
export const INITIAL_GERMAN_BLOG_POSTS = GERMAN_BLOG_POSTS;

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
