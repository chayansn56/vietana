import React, { useEffect } from 'react';
import JsonLd from './JsonLd';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "VIETANA | Premium Destination Management Company (DMC) Vietnam",
  description = "VIETANA is the leading premium Destination Management Company (DMC) based in Ho Chi Minh City, specializing in luxury tours, private groups, and customized itineraries for Indian travelers.",
  image = "/vietana_logo.png",
  url = "https://vietana.com",
}) => {
  useEffect(() => {
    // Dynamic tab/head updates
    document.title = title;

    // Helper to set meta tags
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:image', image, true);
    setMeta('og:url', url, true);
    setMeta('og:type', 'website', true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);
  }, [title, description, image, url]);

  // Premium JSON-LD Schemas for Search Visibility
  const travelAgencySchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "VIETANA",
    "alternateName": "Vietana Travel",
    "description": "Premium Destination Management Company (DMC) in Vietnam specializing in Indian traveler experiences.",
    "url": "https://vietana.com",
    "logo": "https://vietana.com/vietana_logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ho Chi Minh City",
      "addressCountry": "Vietnam"
    },
    "telephone": "+84 90 243 4006",
    "email": "booking@vietana.com",
    "sameAs": [
      "https://www.instagram.com/vietana_travel"
    ],
    "areaServed": ["IN", "VN"],
    "priceRange": "$$$"
  };

  const touristDestinationSchema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": "Vietnam",
    "description": "An incredibly diverse and heritage-rich country in Southeast Asia popular with global travelers.",
    "touristType": ["Family", "Luxury Travelers", "Honeymooners", "Gastronomy Enthusiasts"]
  };

  return (
    <>
      <JsonLd data={travelAgencySchema} />
      <JsonLd data={touristDestinationSchema} />
    </>
  );
};

export default SEO;
