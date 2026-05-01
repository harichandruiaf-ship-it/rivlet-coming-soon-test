import { useCallback, useRef } from "react";
import { useFabricRibbonScroll } from "../hooks/useFabricRibbonScroll";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import { ArrowLeft, ArrowRight } from "./icons";

const techs: {
  n: string;
  name: string;
  desc: JSX.Element;
  tag: string;
  bg: string;
}[] = [
  { n: "01", name: "AquaFlow", desc: <>Moisture moves <em>through, not into.</em></>, tag: "Moisture tech", bg: "/assets/tech-aquaflow.jpg" },
  { n: "02", name: "SecondSkin", desc: <>Seamless. Zero <em>distraction.</em></>, tag: "Seamless knit", bg: "/assets/tech-secondskin.jpg" },
  { n: "03", name: "NeutralCore", desc: <>Anti-odour, <em>worn or rinsed.</em></>, tag: "Anti-odour", bg: "/assets/tech-neutralcore.jpg" },
  { n: "04", name: "TerraWeave", desc: <>Cotton, hemp, <em>linen in the blend.</em></>, tag: "Natural blend", bg: "/assets/tech-terraweave.jpg" },
  { n: "05", name: "CloudPress", desc: <>Compression that <em>breathes back.</em></>, tag: "Compression", bg: "/assets/tech-cloudpress.jpg" },
  { n: "06", name: "EcoThread", desc: <>Recycled yarn, <em>first-life feel.</em></>, tag: "Recycled yarns", bg: "/assets/tech-ecothread.jpg" },
];

function nudgeFabricRail(el: HTMLDivElement, dir: -1 | 1, pauseUntil: { until: number }) {
  const half = el.scrollWidth / 2;
  if (half < 16) return;

  const track = el.querySelector(".fab-track");
  let gap = 24;
  if (track instanceof HTMLElement) {
    const g = getComputedStyle(track).gap;
    gap = parseFloat(g) || 24;
  }
  const first = el.querySelector(".fab-card");
  const cardW = first instanceof HTMLElement ? first.getBoundingClientRect().width : 220;
  const step = Math.max(120, Math.min(cardW + gap, el.clientWidth * 0.85));

  pauseUntil.until = performance.now() + 4500;
  let s = el.scrollLeft + dir * step;
  while (s >= half) s -= half;
  while (s < 0) s += half;
  el.scrollTo({ left: s, top: 0, behavior: "smooth" });
}

export function Promises() {
  const [fabRef, fabRevealed] = useRevealOnScroll<HTMLElement>({ rootMargin: "0px 0px -11% 0px" });
  const railRef = useRef<HTMLDivElement>(null);
  const ribbonPauseRef = useRef({ until: 0 });
  useFabricRibbonScroll(railRef, ribbonPauseRef);

  const onRibbonPrev = useCallback(() => {
    const el = railRef.current;
    if (el) nudgeFabricRail(el, -1, ribbonPauseRef.current);
  }, []);
  const onRibbonNext = useCallback(() => {
    const el = railRef.current;
    if (el) nudgeFabricRail(el, 1, ribbonPauseRef.current);
  }, []);

  const loop = [...techs, ...techs];
  return (
    <section ref={fabRef} className={"fab section-await" + (fabRevealed ? " reveal-in" : "")} id="promises">
      <div className="fab-head">
        <div>
          <div className="eyebrow">Fabric systems</div>
          <h2 className="disp">
            Fabric is not a detail.
            <br />
            <em>It is the entire point.</em>
          </h2>
        </div>
        <div className="meta">
          Six proprietary fabric platforms.
          <br />
          Engineered in-house, named and tracked batch to batch, and held to one standard: the garment disappears on the
          body.
        </div>
      </div>

      <div className="fab-ribbon">
        <div
          ref={railRef}
          id="fabric-ribbon"
          className="fab-track-wrap"
          tabIndex={0}
          aria-label="Fabric systems carousel: more cards to the left and right. Swipe, drag, or use the adjacent buttons."
        >
          <div className="fab-track">
            {loop.map((t, i) => (
              <div className="fab-card" key={i}>
                <div className="bg" style={{ backgroundImage: `url("${t.bg}")` }} />
                <div className="scrim" />
                <div>
                  <div className="num">{t.n}</div>
                  <div className="name">
                    {t.name}
                    <span className="tm">™</span>
                  </div>
                  <div className="desc">{t.desc}</div>
                </div>
                <div className="tag">{t.tag}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="fab-ribbon-nav" aria-label="Scroll fabric carousel">
          <button
            type="button"
            className="fab-ribbon-btn fab-ribbon-btn--prev"
            onClick={onRibbonPrev}
            aria-controls="fabric-ribbon"
            aria-label="Show previous fabric cards"
          >
            <ArrowLeft size={20} sw={1.9} />
          </button>
          <button
            type="button"
            className="fab-ribbon-btn fab-ribbon-btn--next"
            onClick={onRibbonNext}
            aria-controls="fabric-ribbon"
            aria-label="Show next fabric cards"
          >
            <ArrowRight size={20} sw={1.9} />
          </button>
        </div>
      </div>
    </section>
  );
}
