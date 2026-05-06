import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url, type = 'website' }) => {
  const siteTitle = 'swadSetu by Sumit - Artisan Tiffin Service';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDesc = 'swadSetu by Sumit Kumar is a premium artisan tiffin service connecting you with local kitchen artisans for healthy, home-cooked meals delivered daily.';
  const defaultKeywords = 'swadsetu sumit, swadsetu by sumit, swadsetu, sumit kumar, tiffin service, healthy meals, local kitchens, artisan food, meal delivery';
  const siteUrl = 'https://swad-setu.vercel.app';
  const defaultImage = '/preview.png.png'; // Use actual preview image for OG tags

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="author" content="Sumit Kumar" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={url ? `${siteUrl}${url}` : siteUrl} />
      <meta property="og:site_name" content="swadSetu by Sumit" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
      <meta name="twitter:image" content={image || defaultImage} />

      {/* Canonical Link */}
      <link rel="canonical" href={url ? `${siteUrl}${url}` : siteUrl} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "swadSetu by Sumit Kumar",
          "url": siteUrl,
          "logo": `${siteUrl}/logo.png`,
          "description": defaultDesc,
          "founder": {
            "@type": "Person",
            "name": "Sumit Kumar"
          },
          "sameAs": [
            "https://facebook.com/swadsetu",
            "https://instagram.com/swadsetu",
            "https://twitter.com/swadsetu"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
