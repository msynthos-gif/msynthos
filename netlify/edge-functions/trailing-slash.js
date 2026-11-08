/**
 * Netlify Edge Function: trailing-slash
 * Intercepts requests with trailing slash for /de/minijob-rechner/
 * and issues an immediate 301 permanent redirect to /de/minijob-rechner.
 */
export default async (request, context) => {
  const url = new URL(request.url);

  // Exact match for /de/minijob-rechner/
  if (url.pathname === '/de/minijob-rechner/') {
    url.pathname = '/de/minijob-rechner';
    return Response.redirect(url.toString(), 301);
  }

  // Any sub-route trailing slash under /de/minijob-rechner/
  if (url.pathname.startsWith('/de/minijob-rechner/') && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.slice(0, -1);
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
};

