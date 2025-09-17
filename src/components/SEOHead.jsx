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
  
  // Use custom data if provided, otherwise use config data
  const title = customTitle || seoData.title;
  const description = customDescription || seoData.description;
  const keywords = customKeywords || seoData.keywords;
  const image = customImage || seoData.image;
  const url = `${seoData.url}${window.location.pathname}`;

  // Aggressive meta tag update approach
  useEffect(() => {
    // Function to update or create meta tags
    const updateMetaTag = (selector, attribute, content) => {
      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement('meta');
        if (attribute === 'name') {
          meta.setAttribute('name', selector.replace('meta[name="', '').replace('"]', ''));
        } else if (attribute === 'property') {
          meta.setAttribute('property', selector.replace('meta[property="', '').replace('"]', ''));
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Function to perform all updates
    const performSEOUpdates = () => {
      // Update title
      document.title = title;
      
      // Update basic meta tags
      updateMetaTag('meta[name="description"]', 'name', description);
      updateMetaTag('meta[name="keywords"]', 'name', keywords);
      updateMetaTag('meta[name="title"]', 'name', title);
      
      // Update Open Graph tags
      updateMetaTag('meta[property="og:title"]', 'property', title);
      updateMetaTag('meta[property="og:description"]', 'property', description);
      updateMetaTag('meta[property="og:image"]', 'property', image);
      updateMetaTag('meta[property="og:url"]', 'property', url);
      
      // Update Twitter tags
      updateMetaTag('meta[name="twitter:title"]', 'name', title);
      updateMetaTag('meta[name="twitter:description"]', 'name', description);
      updateMetaTag('meta[name="twitter:image"]', 'name', image);
    };

    // Immediate update
    performSEOUpdates();
    
    // Multiple updates with different intervals
    const intervals = [10, 50, 100, 200, 500, 1000];
    intervals.forEach(delay => {
      setTimeout(performSEOUpdates, delay);
    });
    
    // Also update on next tick and when DOM is ready
    requestAnimationFrame(performSEOUpdates);
    
    // Update when window loads (if not already loaded)
    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', performSEOUpdates);
      window.addEventListener('load', performSEOUpdates);
    }
    
    // Debug log
    console.log('🔍 SEO Updated:', { 
      type, 
      slug, 
      title: title?.substring(0, 50) + '...', 
      description: description?.substring(0, 50) + '...'
    });
    
    // Cleanup
    return () => {
      window.removeEventListener('DOMContentLoaded', performSEOUpdates);
      window.removeEventListener('load', performSEOUpdates);
    };
    
  }, [title, description, keywords, image, url, type, slug]);

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
