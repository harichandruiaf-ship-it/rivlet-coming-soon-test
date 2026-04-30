import { useId, useState } from "react";
import { FAQ_ITEMS } from "../data/seoFaq";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import { ChevronDown } from "./icons";

export function FaqSection() {
  const [ref, revealed] = useRevealOnScroll<HTMLElement>({ rootMargin: "0px 0px -11% 0px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <section
      ref={ref}
      id="faq"
      className={"faq-section section-await" + (revealed ? " reveal-in" : "")}
      aria-labelledby="faq-heading"
    >
      <div className="faq-head">
        <div className="eyebrow">FAQ</div>
        <h2 id="faq-heading" className="disp">
          Questions about <em>Rivlet</em>
        </h2>
        <p className="faq-lede">Select a question to read the answer. Only one panel stays open at a time.</p>
      </div>
      <div className="faq-list">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openIndex === i;
          const triggerId = `${baseId}-t-${i}`;
          const panelId = `${baseId}-p-${i}`;
          return (
            <article key={item.question} className={"faq-item" + (isOpen ? " faq-item--open" : "")}>
              <h3 className="faq-item-h">
                <button
                  type="button"
                  id={triggerId}
                  className="faq-trigger"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className="faq-trigger-label">{item.question}</span>
                  <span className="faq-trigger-icon" aria-hidden>
                    <ChevronDown size={18} sw={1.65} />
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                aria-hidden={!isOpen}
                className="faq-panel"
              >
                <div className="faq-panel-inner">
                  <p className="faq-a">{item.answer}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
