import { PRODUCTS, slugifyProduct } from './src/common/products';

// Helper to find a product by its URL slug
const findProductBySlug = (slug) => {
  for (const category of Object.values(PRODUCTS)) {
    const product = category.find(p => slugifyProduct(p.name) === slug);
    if (product) return product;
  }
  return null;
};

export async function middleware(req) {
  const url = new URL(req.url);
  const { pathname, origin } = url;

  // Only process product pages
  if (!pathname.startsWith('/product/')) {
    return; // Do nothing for other pages
  }

  const slug = pathname.split('/product/')[1];
  const product = findProductBySlug(slug);

  // If no product found, let the normal 404 flow handle it
  if (!product) {
    return;
  }

  try {
    // Fetch the root index.html to use as a template
    const indexUrl = new URL('/', origin);
    const res = await fetch(indexUrl);
    let html = await res.text();

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

    // Return the modified HTML as the response
    return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
    });

  } catch (e) {
    // If fetching or processing fails, fall back to the original request
    return;
  }
}
