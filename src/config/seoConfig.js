// SEO Configuration for TPH Live
export const DEFAULT_SEO = {
  siteName: 'TPH Live',
  siteUrl: 'https://tphlive.com',
  defaultTitle: 'TPH Live – Natural Health & Wellness | Best Herbal Products Pakistan',
  defaultDescription: 'Pakistan\'s trusted herbal products company since 2002. Premium natural supplements for men\'s health, women\'s wellness & weight management.',
  defaultImage: 'https://i.ibb.co/LDHXRX81/fav.png',
  defaultKeywords: 'TPH Live, herbal products Pakistan, natural supplements, men\'s health, women\'s wellness, weight management',
  twitterHandle: '@tphlive',
  facebookAppId: 'your-facebook-app-id'
};

// Page-specific SEO configurations
export const PAGE_SEO = {
  home: {
    title: 'TPH Live – Natural Health & Wellness | Best Herbal Products Pakistan',
    description: 'Pakistan\'s trusted herbal products company since 2002. Premium natural supplements for men\'s health, women\'s wellness & weight management. Free delivery nationwide!',
    keywords: 'TPH Live, herbal products Pakistan, natural supplements, men\'s health, women\'s wellness, weight management, ayurvedic medicine, herbal store Pakistan'
  },
  about: {
    title: 'About Us – TPH Live | Pakistan\'s Leading Herbal Products Company',
    description: 'Discover TPH Live\'s 20+ year journey in providing authentic herbal products across Pakistan. Quality natural ingredients, customer satisfaction & trusted since 2002.',
    keywords: 'About TPH Live, herbal products manufacturer Pakistan, natural supplements company, The Planner Herbal International, herbal medicine company Pakistan'
  },
  shop: {
    title: 'Shop Herbal Products Online | TPH Live Pakistan',
    description: 'Browse our complete range of herbal products for men\'s health, women\'s wellness & weight management. Authentic natural supplements with free delivery.',
    keywords: 'buy herbal products online Pakistan, natural supplements shop, men\'s health products, women\'s wellness products, weight management supplements'
  },
  contact: {
    title: 'Contact Us – TPH Live | Order Herbal Products Pakistan',
    description: 'Get in touch with TPH Live for orders, queries & support. Call 0332-8888935 for herbal products across Pakistan. Free delivery & cash on delivery available.',
    keywords: 'contact TPH Live, order herbal products Pakistan, customer support, herbal products helpline, TPH Live phone number'
  }
};

// Generate product structured data
export const generateProductStructuredData = (product, category) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "category": category,
    "brand": {
      "@type": "Brand",
      "name": "TPH Live"
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "PKR",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "TPH Live"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150"
    }
  };
};

// Generate organization structured data
export const generateOrganizationStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TPH Live - The Planner Herbal International",
    "alternateName": "TPH Live",
    "url": DEFAULT_SEO.siteUrl,
    "logo": DEFAULT_SEO.defaultImage,
    "description": DEFAULT_SEO.defaultDescription,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PK",
      "addressRegion": "Pakistan"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+92-332-8888935",
      "contactType": "customer service",
      "availableLanguage": ["English", "Urdu"]
    },
    "sameAs": [
      "https://www.facebook.com/tphlive",
      "https://www.instagram.com/tphlive"
    ]
  };
};

// Generate breadcrumb structured data
export const generateBreadcrumbStructuredData = (breadcrumbs) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `${DEFAULT_SEO.siteUrl}${crumb.url}`
    }))
  };
};

// SEO utility functions
export const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
};

export const optimizeTitle = (title) => truncateText(title, 60);
export const optimizeDescription = (description) => truncateText(description, 160);

// Meta tag generators
export const generateMetaTags = (pageConfig) => {
  return {
    title: optimizeTitle(pageConfig.title || DEFAULT_SEO.defaultTitle),
    description: optimizeDescription(pageConfig.description || DEFAULT_SEO.defaultDescription),
    keywords: pageConfig.keywords || DEFAULT_SEO.defaultKeywords,
    image: pageConfig.image || DEFAULT_SEO.defaultImage,
    url: pageConfig.url || DEFAULT_SEO.siteUrl,
    type: pageConfig.type || 'website'
  };
};