import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEOHead = ({ 
  title,
  description,
  keywords = "herbal products Pakistan, natural supplements, ayurvedic medicine, TPH Live",
  image = "https://i.ibb.co/LDHXRX81/fav.png",
  url,
  type = "website",
  structuredData = null,
  noIndex = false,
  alternateUrls = null
}) => {
  const location = useLocation();
  
  // Get current URL if not provided
  const currentUrl = url || `https://tphlive.com${location.pathname}`;
  
  // Ensure title is not too long (recommended max 60 characters)
  const optimizedTitle = title.length > 60 ? title.substring(0, 57) + '...' : title;
  
  // Ensure description is optimal length (150-160 characters)
  const optimizedDescription = description.length > 160 ? description.substring(0, 157) + '...' : description;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{optimizedTitle}</title>
      <meta name="description" content={optimizedDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <meta name="author" content="TPH Live - The Planner Herbal International" />
      <meta name="publisher" content="TPH Live" />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph Meta Tags for Facebook/WhatsApp */}
      <meta property="og:title" content={optimizedTitle} />
      <meta property="og:description" content={optimizedDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={optimizedTitle} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="TPH Live" />
      <meta property="og:locale" content="en_US" />
      <meta property="fb:app_id" content="your-facebook-app-id" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={optimizedTitle} />
      <meta name="twitter:description" content={optimizedDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={optimizedTitle} />
      <meta name="twitter:site" content="@tphlive" />
      <meta name="twitter:creator" content="@tphlive" />

      {/* Additional SEO Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="PK" />
      <meta name="geo.country" content="Pakistan" />
      <meta name="geo.placename" content="Pakistan" />
      <meta name="theme-color" content="#dc2626" />
      
      {/* Alternate URLs for different languages/regions */}
      {alternateUrls && alternateUrls.map((alt, index) => (
        <link key={index} rel="alternate" hrefLang={alt.lang} href={alt.url} />
      ))}

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
