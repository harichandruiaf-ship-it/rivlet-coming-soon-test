/**
 * WebSite + Organization JSON-LD inlined into index.html at build time so crawlers
 * see the preferred site name ("Rivlet") without waiting for React.
 */
import { SITE_ORIGIN } from "./seoFaq";

const ORG_ID = `${SITE_ORIGIN}/#organization`;
const WEB_ID = `${SITE_ORIGIN}/#website`;
const BRAND_ID = `${SITE_ORIGIN}/#brand`;

/** Organization + Brand + WebSite in one @graph for crawlers (inlined in document head). Google site name uses WebSite.name. */
export function buildSiteIdentityJsonLd(): Record<string, unknown> {
  const homeUrl = `${SITE_ORIGIN}/`;

  const organization = {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Rivlet",
    alternateName: ["Rivlet Activewear", "Rivlet India"],
    url: homeUrl,
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

  const brandEntity = {
    "@type": "Brand",
    "@id": BRAND_ID,
    name: "Rivlet",
    alternateName: ["Rivlet Activewear", "Rivlet India"],
    description:
      "Premium Indian activewear, sportswear, athleisure and easy wear brand. Six proprietary fabric technologies. Built without compromise.",
    logo: `${SITE_ORIGIN}/logo.png`,
    url: homeUrl,
    slogan: "Move like water. Feel like air.",
  };

  const website = {
    "@type": "WebSite",
    "@id": WEB_ID,
    url: homeUrl,
    name: "Rivlet",
    alternateName: ["Rivlet Activewear", "Rivlet India"],
    description: "Premium Indian activewear, sportswear, athleisure and easy wear, coming 2026",
    publisher: { "@id": ORG_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en-IN",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, brandEntity, website],
  };
}
