import { PRODUCTS, slugifyProduct } from './src/common/products';

// Helper to find a product by its URL slug
const findProductBySlug = (slug) => {
  for (const category of Object.values(PRODUCTS)) {
    const product = category.find(p => slugifyProduct(p.name) === slug);
    if (product) return product;
  }
  return null;
};

// List of routes that should be handled by the SPA (all other routes will be served as static files)
const SPA_ROUTES = ['/product/', '/shop', '/category', '/about', '/contact'];

// Check if the current path should be handled by the SPA
const shouldHandleRoute = (pathname) => {
  return SPA_ROUTES.some(route => pathname.startsWith(route));
};

export default async function middleware(request) {
  const url = new URL(request.url);
  const { pathname, origin } = url;

  // Exit early if the request is for a static asset (e.g., /assets, /images, /favicon.png)
  if (pathname.startsWith('/assets') || pathname.startsWith('/images') || pathname.includes('.')) {
    return;
  }

  // If it's not an SPA route, let Vercel handle it as a static file
  if (!shouldHandleRoute(pathname)) {
    return;
  }

  try {
    // Fetch the root index.html to use as a template for all client-side routes
    const indexUrl = new URL('/', origin);
    const response = await fetch(indexUrl);
    let html = await response.text();

    // Handle SPA routes
    if (pathname.startsWith('/product/')) {
      const slug = pathname.split('/product/')[1];
      const product = findProductBySlug(slug);

      if (product) {
        // Ensure image URL is absolute for social crawlers
        let imageUrl = product.image;
        if (imageUrl && imageUrl.startsWith('/')) {
          imageUrl = `${origin}${imageUrl}`;
        }

        // Robustly replace meta tags using regular expressions
        const escape = (str = '') => str.replace(/"/g, '&quot;').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

        const title = escape(product.name);
        const description = escape(product.description);

        html = html
          .replace(/<title>.*?<\/title>/, `<title>${title} | TPH Int.</title>`)
          .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`)
          .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${description}" />`)
          .replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${imageUrl}" />`)
          .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${description}" />`)
          .replace(/<meta property="twitter:card" content=".*?" \/>/, '<meta property="twitter:card" content="summary_large_image" />')
          .replace(/<meta property="twitter:title" content=".*?" \/>/, `<meta property="twitter:title" content="${title}" />`)
          .replace(/<meta property="twitter:description" content=".*?" \/>/, `<meta property="twitter:description" content="${description}" />`)
          .replace(/<meta property="twitter:image" content=".*?" \/>/, `<meta property="twitter:image" content="${imageUrl}" />`);
      }
    }

    // Return the (potentially modified) HTML for all client-side routes
    return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
    });

  } catch (e) {
    // If fetching or processing fails, fall back to the original request
    return;
  }
}
