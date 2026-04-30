import type { ReactNode } from "react";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

const cards: { n: string; t: ReactNode; p: string }[] = [
  {
    n: "01",
    t: (
      <>
        Every ocean <em>begins here.</em>
      </>
    ),
    p: "Every ocean was first fed by a rivlet. Small water, taken seriously, becomes the sea. We begin at the source.",
  },
  {
    n: "02",
    t: (
      <>
        Rooted in the <em>land.</em>
      </>
    ),
    p: "Indian textile predates most nations. We carry that lineage on the label: handloom, mill cotton, contemporary performance knit.",
  },
  {
    n: "03",
    t: (
      <>
        Built for your <em>whole day.</em>
      </>
    ),
    p: "One wardrobe, from your 5:30am run to your 9pm dinner. Train in it. Travel in it. Live in it. No costume changes.",
  },
];

export function Vision() {
  const [visionRef, visionRevealed] = useRevealOnScroll<HTMLElement>({ rootMargin: "0px 0px -11% 0px" });
  return (
    <section
      ref={visionRef}
      className={"block vision-section section-await" + (visionRevealed ? " reveal-in" : "")}
      id="vision"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 32,
          alignItems: "end",
          marginBottom: 8,
        }}
      >
        <h2 className="disp">
          A small water, <em>moving with intent.</em>
        </h2>
        <p className="lead" style={{ maxWidth: "60ch" }}>
          The brief is singular: a wardrobe anchored to its source, cut to disappear on the body and read as quiet
          confidence.
        </p>
      </div>
      <div className="vision-grid">
        {cards.map((c, i) => (
          <div className="v-card" key={i}>
            <div className="v-num">
              <span>{c.n}</span>
              <span className="dash" />
              <span>VISION</span>
            </div>
            <h3>{c.t}</h3>
            <p>{c.p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
