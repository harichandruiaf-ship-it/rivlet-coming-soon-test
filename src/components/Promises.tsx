import { useRef } from "react";
import { useFabricRibbonScroll } from "../hooks/useFabricRibbonScroll";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

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

export function Promises() {
  const [fabRef, fabRevealed] = useRevealOnScroll<HTMLElement>({ rootMargin: "0px 0px -11% 0px" });
  const railRef = useRef<HTMLDivElement>(null);
  useFabricRibbonScroll(railRef);
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

      <div
        ref={railRef}
        className="fab-track-wrap"
        tabIndex={0}
        aria-label="Fabric systems: auto-scrolling ribbon; drag, scroll, or pause by hovering"
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
    </section>
  );
}
