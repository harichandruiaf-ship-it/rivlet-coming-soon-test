/**
 * WebSite + Organization JSON-LD inlined into index.html at build time so crawlers
 * see the preferred site name ("Rivlet") without waiting for React.
 */
import { SITE_ORIGIN } from "./seoFaq";

const ORG_ID = `${SITE_ORIGIN}/#organization`;
const WEB_ID = `${SITE_ORIGIN}/#website`;
const BRAND_ID = `${SITE_ORIGIN}/#brand`;

/** Same entity definitions as previously in SeoJsonLd; logo as ImageObject for Google site name signals. */
export function buildSiteIdentityJsonLd(): Record<string, unknown> {
  const organization = {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Rivlet",
    alternateName: "Rivlet Activewear",
    url: SITE_ORIGIN,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_ORIGIN}/logo.png`,
    },
    image: `${SITE_ORIGIN}/og-image.jpg`,
    description:
      "Rivlet is a premium Indian-crafted activewear, sportswear, athleisure and easy wear brand. Born in Madurai, Tamil Nadu. Manufactured in India to global standards. Built without compromise.",
    slogan: "Move like water. Feel like air.",
    foundingDate: "2026",
    foundingLocation: {
      "@type": "Place",
      name: "Madurai, Tamil Nadu, India",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Madurai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "hello@therivlet.com",
        contactType: "customer service",
        areaServed: "Worldwide",
        availableLanguage: ["English", "Tamil", "Hindi"],
      },
    ],
    sameAs: [
      "https://instagram.com/therivlet",
      "https://facebook.com/therivlet",
      "https://linkedin.com/company/therivlet",
      "https://youtube.com/@therivlet",
    ],
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Activewear" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Sportswear" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Athleisure" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Easy Wear" } },
    ],
    brand: { "@id": BRAND_ID },
  };

  const website = {
    "@type": "WebSite",
    "@id": WEB_ID,
    url: SITE_ORIGIN,
    name: "Rivlet",
    description: "Premium Indian activewear, sportswear, athleisure and easy wear, coming 2026",
    publisher: { "@id": ORG_ID },
    inLanguage: "en-IN",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website],
  };
}
