import { useLayoutEffect } from "react";
import { CTA } from "./components/CTA";
import { Difference } from "./components/Difference";
import { FaqSection } from "./components/FaqSection";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Promises } from "./components/Promises";
import { SeoJsonLd } from "./components/SeoJsonLd";
import { Standards } from "./components/Standards";
import { Vision } from "./components/Vision";
import { VercelMetrics } from "./components/VercelMetrics";

function scrollToTop() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export default function App() {
  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    scrollToTop();
  }, []);

  return (
    <>
      <SeoJsonLd />
      <header>
        <Nav />
      </header>
      <main id="main">
        <Hero />
        <Difference />
        <Vision />
        <Promises />
        <Standards />
        <FaqSection />
        <CTA />
      </main>
      <Footer />
      <VercelMetrics />
    </>
  );
}
