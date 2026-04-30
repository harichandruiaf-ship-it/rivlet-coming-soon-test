import { FAQ_ITEMS, SITE_ORIGIN } from "../data/seoFaq";

const ORG_ID = `${SITE_ORIGIN}/#organization`;
const WEB_ID = `${SITE_ORIGIN}/#website`;
const LOCAL_ID = `${SITE_ORIGIN}/#localbusiness`;
const BRAND_ID = `${SITE_ORIGIN}/#brand`;

function buildGraph() {
  const organization = {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Rivlet",
    alternateName: "Rivlet Activewear",
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}/logo.png`,
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

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${SITE_ORIGIN}/#faqpage`,
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const localBusiness = {
    "@type": "ClothingStore",
    "@id": LOCAL_ID,
    name: "Rivlet",
    image: `${SITE_ORIGIN}/og-image.jpg`,
    url: SITE_ORIGIN,
    email: "hello@therivlet.com",
    priceRange: "₹₹₹",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Madurai",
      addressRegion: "Tamil Nadu",
      postalCode: "625001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 9.9252,
      longitude: 78.1198,
    },
    areaServed: ["India", "United Kingdom", "United Arab Emirates", "Singapore", "United States", "Europe"],
  };

  const brand = {
    "@type": "Brand",
    "@id": BRAND_ID,
    name: "Rivlet",
    alternateName: ["Rivlet Activewear", "Rivlet India"],
    description:
      "Premium Indian activewear, sportswear, athleisure and easy wear brand. Six proprietary fabric technologies. Built without compromise.",
    logo: `${SITE_ORIGIN}/logo.png`,
    url: SITE_ORIGIN,
    slogan: "Move like water. Feel like air.",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website, faqPage, localBusiness, brand],
  };
}

/**
 * Injects JSON-LD once (StrictMode safe via id guard).
 */
export function SeoJsonLd() {
  const json = JSON.stringify(buildGraph());
  return (
    <script
      type="application/ld+json"
      id="rivlet-schema-graph"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
