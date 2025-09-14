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

    // Replace placeholders or existing meta tags in the HTML
    // This is a robust way to handle both cases where tags exist or not
    const escape = (str) => str.replace(/"/g, '&quot;');
    const replacements = {
      '<title>TPH | The Planner Herbal International</title>': `<title>${escape(product.name)} | TPH Int.</title>`,
      '"og:title" content="Premium Health Products | The Planner Herbal International"': `"og:title" content="${escape(product.name)}"`,
      '"og:description" content="Premium herbal health products from The Planner Herbal International."': `"og:description" content="${escape(product.description)}"`,
      '"og:image" content="/favicon.png"': `"og:image" content="${escape(imageUrl)}"`,
      '"twitter:card" content="summary"': '"twitter:card" content="summary_large_image"',
      '"twitter:title" content="Premium Health Products | The Planner Herbal International"': `"twitter:title" content="${escape(product.name)}"`,
      '"twitter:description" content="Premium herbal health products from The Planner Herbal International."': `"twitter:description" content="${escape(product.description)}"`,
      '"twitter:image" content="/favicon.png"': `"twitter:image" content="${escape(imageUrl)}"`,
    };

    for (const [key, value] of Object.entries(replacements)) {
      html = html.replace(key, value);
    }

    // Return the modified HTML
    return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  return NextResponse.next();
}

