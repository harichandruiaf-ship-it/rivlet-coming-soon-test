import { useLayoutEffect } from "react";
import { CTA } from "./components/CTA";
import { Difference } from "./components/Difference";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Promises } from "./components/Promises";
import { Standards } from "./components/Standards";
import { Vision } from "./components/Vision";

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
    <div id="main">
      <Nav />
      <Hero />
      <Difference />
      <Vision />
      <Promises />
      <Standards />
      <CTA />
      <Footer />
    </div>
  );
}
