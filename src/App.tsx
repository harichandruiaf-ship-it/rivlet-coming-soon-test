import { lazy, Suspense, useLayoutEffect } from "react";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { SeoJsonLd } from "./components/SeoJsonLd";
import { VercelMetrics } from "./components/VercelMetrics";

const Difference = lazy(() => import("./components/Difference").then((m) => ({ default: m.Difference })));
const Vision = lazy(() => import("./components/Vision").then((m) => ({ default: m.Vision })));
const Promises = lazy(() => import("./components/Promises").then((m) => ({ default: m.Promises })));
const Standards = lazy(() => import("./components/Standards").then((m) => ({ default: m.Standards })));
const FaqSection = lazy(() => import("./components/FaqSection").then((m) => ({ default: m.FaqSection })));
const CTA = lazy(() => import("./components/CTA").then((m) => ({ default: m.CTA })));
const Footer = lazy(() => import("./components/Footer").then((m) => ({ default: m.Footer })));

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
        <Suspense fallback={null}>
          <Difference />
          <Vision />
          <Promises />
          <Standards />
          <FaqSection />
          <CTA />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <VercelMetrics />
    </>
  );
}
