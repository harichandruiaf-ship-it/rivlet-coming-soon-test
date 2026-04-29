import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import { Check } from "./icons";

const pillars = [
  {
    topic: "On who it's for",
    head: (
      <>
        Designed for <em>every body</em>, every climate, every person.
      </>
    ),
    body: "Premium fabric. Indian ownership. Global standards. At a price point that respects you — no apology for where we come from.",
  },
  {
    topic: "On accountability",
    head: (
      <>
        We don&apos;t just say it — <em>we own it.</em>
      </>
    ),
    body: "The supply chain is ours. The label is a promise we keep in the room, on the floor, and in the wash — not a tagline borrowed from elsewhere.",
  },
] as const;

export function Difference() {
  const [diffRef, diffRevealed] = useRevealOnScroll<HTMLElement>({ rootMargin: "0px 0px -11% 0px" });
  return (
    <section ref={diffRef} className={"diff section-await" + (diffRevealed ? " reveal-in" : "")} id="different">
      <div className="head">
        <div>
          <div className="eyebrow">How we&apos;re different</div>
          <h2>
            Premium fabric. Indian ownership. <em>Global standards.</em>
          </h2>
        </div>
        <p className="lede">No apology for where we come from. Read this once, it explains the rest of the wardrobe.</p>
      </div>

      <div className="cmp cmp-rivlet">
        <div className="cmp-rivlet-grid" role="list">
          {pillars.map((p) => (
            <article key={p.topic} className="cmp-pillar" role="listitem">
              <div className="cmp-pillar-top">
                <span className="cmp-pillar-mark" aria-hidden>
                  <Check size={10} />
                </span>
                <span className="cmp-pillar-eyebrow">{p.topic}</span>
              </div>
              <h3 className="cmp-pillar-head">{p.head}</h3>
              <p className="cmp-pillar-body">{p.body}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="gap-strip">
        <div>
          <div className="stamp">
            <span className="ln" />
            The gap we fill
          </div>
          <h3>
            One <em>uncompromising identity</em> for the person who moves through their whole life with intention.
          </h3>
        </div>
        <div className="right">
          <p className="body">
            No brand anywhere currently builds premium activewear, sportswear, athleisure, and everyday easy-wear under
            one completely owned, uncompromising identity. designed for the person who moves through their whole life
            with intention.
          </p>
          <div className="that">That is Rivlet.</div>
          <div className="seal">
            <span className="av">R</span>
            <span>One studio. Four collections. One promise.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
