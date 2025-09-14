import { NextResponse } from 'next/server';
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
  const { pathname } = req.nextUrl;

  // Check if this is a product page request
  if (pathname.startsWith('/product/')) {
    const slug = pathname.split('/product/')[1];
    const product = findProductBySlug(slug);

    // If no product found, do nothing and let the 404 page handle it
    if (!product) {
      return NextResponse.next();
    }

    // Fetch the root index.html to use as a template
    const url = req.nextUrl.clone();
    url.pathname = '/index.html';
    const res = await fetch(url);
    let html = await res.text();

    // Ensure image URL is absolute
    let imageUrl = product.image;
    if (imageUrl.startsWith('/')) {
      imageUrl = `${req.nextUrl.origin}${imageUrl}`;
    }

    // Use regular expressions to robustly replace meta tags
    const escape = (str) => str.replace(/"/g, '&quot;').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const title = escape(product.name);
    const description = escape(product.description);

    html = html
      .replace(/<title>.*?<\/title>/, `<title>${title} | TPH Int.</title>`)
      .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`)
      .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${description}" />`)
      .replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${imageUrl}" />`)
      .replace(/<meta property="twitter:card" content=".*?" \/>/, '<meta property="twitter:card" content="summary_large_image" />')
      .replace(/<meta property="twitter:title" content=".*?" \/>/, `<meta property="twitter:title" content="${title}" />`)
      .replace(/<meta property="twitter:description" content=".*?" \/>/, `<meta property="twitter:description" content="${description}" />`)
      .replace(/<meta property="twitter:image" content=".*?" \/>/, `<meta property="twitter:image" content="${imageUrl}" />`);

    // Return the modified HTML
    return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  return NextResponse.next();
}

