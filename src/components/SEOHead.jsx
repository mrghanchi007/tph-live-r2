import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { getSEOData } from '../config/seoConfig';

const SEOHead = ({ 
  type = 'page', 
  slug = null, 
  customTitle = null, 
  customDescription = null,
  customKeywords = null,
  customImage = null,
  structuredData = null
}) => {
  // Get SEO data from centralized config
  const seoData = getSEOData(type, slug);
  
  // Debug log to check what data we're getting
  if (process.env.NODE_ENV === 'development') {
    console.log('SEO Data Retrieved:', { type, slug, seoData });
  }
  
  // Use custom data if provided, otherwise use config data
  const title = customTitle || seoData.title;
  const description = customDescription || seoData.description;
  const keywords = customKeywords || seoData.keywords;
  const image = customImage || seoData.image;
  const url = `${seoData.url}${window.location.pathname}`;

  // Force update document title and meta tags as backup
  useEffect(() => {
    // Update immediately
    document.title = title;
    
    // Manually update meta tags as fallback
    const updateMetaTag = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Also update after a short delay to ensure it overrides any other updates
    setTimeout(() => {
      document.title = title;
      updateMetaTag('description', description);
      updateMetaTag('keywords', keywords);
    }, 100);
    
    // Debug log to verify SEO is working (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log('SEO Updated:', { 
        type, 
        slug, 
        title: title || 'No title', 
        description: description ? description.substring(0, 50) + '...' : 'No description'
      });
    }
  }, [title, type, slug, description, keywords]);

  return (
    <Helmet defer={false} prioritizeSeoTags>
      {/* Force update and clear existing tags */}
      <meta name="cache-control" content="no-cache, no-store, must-revalidate" />
      
      {/* Basic Meta Tags - explicitly override defaults */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="TPH Live" />
      <link rel="canonical" href={url} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="TPH Live" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@tphlive" />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="PK" />
      <meta name="geo.country" content="Pakistan" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {/* Additional structured data for organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "TPH Live",
          "url": "https://tphlive.com",
          "logo": "https://tphlive.com/images/tph-live-logo.png",
          "description": "Pakistan's trusted herbal products store offering premium natural supplements and traditional remedies.",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "Pakistan"
          },
          "sameAs": [
            "https://www.facebook.com/tphlive",
            "https://www.instagram.com/tphlive"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
