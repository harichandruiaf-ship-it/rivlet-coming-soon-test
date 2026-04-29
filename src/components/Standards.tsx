import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

const rows: { n: string; t: JSX.Element; d: string }[] = [
  { n: "01", t: <>Premium, without the <em>price theatre.</em></>, d: "Fabric we'd wear ourselves, cuts that hold their shape after fifty washes, and pricing that respects the people on both sides of the label." },
  { n: "02", t: <>One wardrobe, <em>every hour.</em></>, d: "Activewear to easy wear, in the same closet, with the same standards. Designed to cross over — gym, street, flight, dinner." },
  { n: "03", t: <>Indian-crafted, <em>globally worn.</em></>, d: "Cut and sewn in India, by people we know, with materials we vouch for. Engineered to be benchmarked against the best — and to win." },
  { n: "04", t: <>Move like water, <em>feel like air.</em></>, d: "Soft hands. Quiet seams. Fabrics that breathe and recover. A garment should disappear on the body and only be felt as confidence." },
  { n: "05", t: <>Zero compromise. <em>Always.</em></>, d: "On fabric, on fit, on finish, on fairness. If a corner has to be cut, we don't ship it. The label is the promise." },
];

export function Standards() {
  const [stdRef, stdRevealed] = useRevealOnScroll<HTMLElement>({ rootMargin: "0px 0px -11% 0px" });
  return (
    <section ref={stdRef} className={"promises section-await" + (stdRevealed ? " reveal-in" : "")} id="standards">
      <div className="p-head">
        <h2 className="disp">
          Five things we will <em>never</em> compromise on.
        </h2>
        <div className="meta">A working draft of our standards. Read it. Hold us to it.</div>
      </div>
      <div className="p-list">
        {rows.map((r, i) => (
          <div className="p-row" key={i}>
            <div className="num">— {r.n}</div>
            <div className="ttl">{r.t}</div>
            <div className="bd">{r.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
