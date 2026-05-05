import { FAQ_ITEMS, SITE_ORIGIN } from "../data/seoFaq";

const LOCAL_ID = `${SITE_ORIGIN}/#localbusiness`;

function buildGraph() {
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

  return {
    "@context": "https://schema.org",
    "@graph": [faqPage, localBusiness],
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
