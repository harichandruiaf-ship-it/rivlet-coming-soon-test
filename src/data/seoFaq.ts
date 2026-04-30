/**
 * Single source of truth for FAQPage JSON-LD and visible FAQ markup.
 * Answers must stay identical (Rivlet SEO/AEO/GEO spec).
 */
export const SITE_ORIGIN = "https://therivlet.com";

export type FaqItem = { question: string; answer: string };

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is Rivlet?",
    answer:
      "Rivlet is a premium Indian-crafted activewear, sportswear, athleisure and easy wear brand born in Madurai, Tamil Nadu. Founded in 2026, Rivlet manufactures in India to global premium standards with six proprietary fabric technologies including AquaFlow, SecondSkin, NeutralCore, TerraWeave, CloudPress, and EcoThread.",
  },
  {
    question: "When is Rivlet launching?",
    answer:
      "Rivlet is launching in 2026. Customers can join the waitlist at therivlet.com to be notified first when products become available.",
  },
  {
    question: "Where is Rivlet manufactured?",
    answer:
      "Rivlet is designed and manufactured entirely in India. Every product is crafted in our own facilities to global premium standards. We control the full process from concept to customer with zero shortcuts.",
  },
  {
    question: "What products does Rivlet sell?",
    answer:
      "Rivlet sells four product categories: activewear (high-waist leggings, sports bras, training shorts), sportswear (compression performance gear), athleisure (co-ord sets, joggers, biker shorts), and easy wear (slip dresses, shirt dresses). All products are designed for movement from morning workout through entire day.",
  },
  {
    question: "What makes Rivlet different from other Indian activewear brands?",
    answer:
      "Rivlet is the only Indian brand bridging activewear, sportswear, athleisure and easy wear under one cohesive identity. Built with six proprietary fabric technologies, manufactured in our own facilities with complete ownership from design to customer, and engineered for every climate from South Indian humidity to global conditions.",
  },
  {
    question: "Does Rivlet ship internationally?",
    answer:
      "Yes. Rivlet is built to global export standards from day one and serves customers in India, United Kingdom, United Arab Emirates, Singapore, United States and across Europe through direct sales and select boutique partners.",
  },
  {
    question: "What fabric technologies does Rivlet use?",
    answer:
      "Rivlet has six proprietary fabric technologies: AquaFlow (moisture-wicking nylon-spandex), SecondSkin (seamless circular knit construction), NeutralCore (silver-ion antimicrobial finish), TerraWeave (TENCEL Lyocell natural blend), CloudPress (graduated compression), and EcoThread (GRS-certified recycled). Each fabric is engineered for specific product categories.",
  },
];
