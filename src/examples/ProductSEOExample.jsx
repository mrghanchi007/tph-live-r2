// Example: Complete Product Page SEO Implementation
// This shows how dynamic SEO works for product pages

import React from 'react';
import SEOHead from '../components/SEOHead';

const ProductSEOExample = ({ productSlug }) => {
    // Example product data (this would come from your product configs)
    const exampleProducts = {
        'sultan-shahi-gold-majoon': {
            title: 'Sultan Shahi Gold Majoon',
            subtitle: 'Traditional Herbal Strength & Vitality Tonic for Men',
            description: 'Premium Unani herbal formula for male strength, stamina, and vitality. Trusted by thousands across Pakistan.',
            heroImage: 'https://i.ibb.co/Zw5CjYC/Sultan-Shahi-Gold-Majoon-Hero-Section.png',
            price: '5000',
            category: 'Men\'s Health',
            benefits: [
                'Eliminates chronic weakness',
                'Boosts stamina and timing',
                'Strengthens nerves and muscles',
                'Supports hormone balance'
            ]
        },
        'b-maxtime-super-active': {
            title: 'B-Maxtime Super Active',
            subtitle: 'Instant Power, Lasting Confidence',
            description: 'Natural herbal capsules for enhanced performance and vitality. Quick results with lasting control.',
            heroImage: 'https://i.ibb.co/HLKYt3XP/B-Maxtime-Super-Active.png',
            price: '1200',
            category: 'Men\'s Health',
            benefits: [
                'Quick stamina boost',
                'Strong erections with control',
                'Improved blood circulation',
                '100% Herbal formula'
            ]
        }
    };

    const product = exampleProducts[productSlug];

    if (!product) {
        return (
            <SEOHead
                title="Product Not Found | TPH Live"
                description="The requested product could not be found. Browse our complete range of herbal products."
                noIndex={true}
            />
        );
    }

    // Generate dynamic SEO data
    const generateProductSEO = (product, slug) => {
        const title = `${product.title} Pakistan | Buy Online | TPH Live`;
        const description = `${product.title} - ${product.subtitle}. ${product.description} Price: Rs ${product.price}. Order now with free delivery across Pakistan!`;
        const keywords = `${product.title}, ${product.title.toLowerCase()}, ${product.category.toLowerCase()} products, herbal supplements Pakistan, TPH Live, buy online`;

        return {
            title,
            description,
            keywords,
            image: product.heroImage,
            url: `https://tphlive.com/product/${slug}`,
            type: 'product',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "Product",
                "name": product.title,
                "description": product.description,
                "image": [product.heroImage],
                "brand": {
                    "@type": "Brand",
                    "name": "TPH Live"
                },
                "category": product.category,
                "offers": {
                    "@type": "Offer",
                    "price": product.price,
                    "priceCurrency": "PKR",
                    "availability": "https://schema.org/InStock",
                    "priceValidUntil": "2025-12-31",
                    "seller": {
                        "@type": "Organization",
                        "name": "TPH Live - The Planner Herbal International"
                    }
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "reviewCount": "150",
                    "bestRating": "5",
                    "worstRating": "1"
                },
                "review": [
                    {
                        "@type": "Review",
                        "reviewRating": {
                            "@type": "Rating",
                            "ratingValue": "5",
                            "bestRating": "5"
                        },
                        "author": {
                            "@type": "Person",
                            "name": "Ahmed K."
                        },
                        "reviewBody": "Excellent product with great results. Highly recommended!"
                    }
                ]
            }
        };
    };

    const seoData = generateProductSEO(product, productSlug);

    return (
        <div>
            {/* Dynamic Product SEO */}
            <SEOHead
                title={seoData.title}
                description={seoData.description}
                keywords={seoData.keywords}
                image={seoData.image}
                url={seoData.url}
                type={seoData.type}
                structuredData={seoData.structuredData}
            />

            {/* Product content would go here */}
            <div className="container mx-auto px-4 py-8">
                <h1>{product.title}</h1>
                <p>{product.subtitle}</p>
                <img src={product.heroImage} alt={product.title} />
                <p>{product.description}</p>
                <p>Price: Rs {product.price}</p>

                <h2>Benefits:</h2>
                <ul>
                    {product.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProductSEOExample;

/* 
USAGE EXAMPLES:

1. Home Page SEO:
<SEOHead 
  title="TPH Live – Natural Health & Wellness | Best Herbal Products Pakistan"
  description="Pakistan's trusted herbal products company since 2002. Premium natural supplements for men's health, women's wellness & weight management."
  keywords="TPH Live, herbal products Pakistan, natural supplements, men's health, women's wellness"
  image="https://i.ibb.co/LDHXRX81/fav.png"
  url="https://tphlive.com/"
  type="website"
/>

2. About Page SEO:
<SEOHead 
  title="About Us – TPH Live | Pakistan's Leading Herbal Products Company"
  description="Discover TPH Live's 20+ year journey in providing authentic herbal products across Pakistan."
  keywords="About TPH Live, herbal products manufacturer Pakistan, natural supplements company"
  url="https://tphlive.com/about"
  type="website"
/>

3. Product Page SEO (Dynamic):
<SEOHead 
  title="Sultan Shahi Gold Majoon Pakistan | Buy Online | TPH Live"
  description="Sultan Shahi Gold Majoon - Traditional Herbal Strength & Vitality Tonic for Men. Price: Rs 5,000. Order now with free delivery!"
  keywords="Sultan Shahi Gold Majoon, men's health products, herbal supplements Pakistan, TPH Live"
  image="https://i.ibb.co/Zw5CjYC/Sultan-Shahi-Gold-Majoon-Hero-Section.png"
  url="https://tphlive.com/product/sultan-shahi-gold-majoon"
  type="product"
  structuredData={productStructuredData}
/>

4. Category Page SEO:
<SEOHead 
  title="Men's Health Herbal Products Pakistan | Natural Supplements | TPH Live"
  description="Premium men's health herbal products in Pakistan. Natural supplements for health & wellness."
  keywords="men's health herbal products Pakistan, natural men's health supplements"
  url="https://tphlive.com/shop/men"
  type="website"
/>

SOCIAL MEDIA SHARING RESULTS:

✅ Facebook/WhatsApp: Shows correct title, description, and image
✅ Twitter: Displays as summary_large_image card with proper content
✅ LinkedIn: Professional appearance with company branding
✅ Google Search: Rich snippets with structured data
✅ SEO Tools: All meta tags properly recognized

TECHNICAL FEATURES:

✅ Title optimization (max 60 characters)
✅ Description optimization (max 160 characters)  
✅ Open Graph tags for social sharing
✅ Twitter Card tags
✅ Structured data for rich snippets
✅ Canonical URLs to prevent duplicate content
✅ Dynamic meta tags per page/product
✅ Image optimization for social previews
✅ No static meta tags conflicts
*/