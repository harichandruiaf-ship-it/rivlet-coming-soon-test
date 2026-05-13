import { Fragment, useEffect, useRef, useState } from "react";
import { TABS, type TabKey } from "../data/tabs";
import { CrossfadeFabricImg } from "./CrossfadeFabricImg";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import { ArrowRight, Star } from "./icons";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  const [tab, setTab] = useState<TabKey>("active");
  const wardrobeHoverRef = useRef(false);
  const [heroRef, heroRevealed] = useRevealOnScroll<HTMLElement>({
    rootMargin: "0px 0px -10% 0px",
    threshold: 0.06,
  });

  useEffect(() => {
    const id = window.setInterval(() => {
      if (wardrobeHoverRef.current) return;
      setTab((t) => {
        const i = TABS.findIndex((x) => x.key === t);
        return TABS[(i + 1) % TABS.length]!.key;
      });
    }, 4500);
    return () => clearInterval(id);
  }, []);
  const active = TABS.find((t) => t.key === tab) ?? TABS[0]!;
  const { left: fabLeft, top: fabTop, right: fabRight } = active.heroFloats;
  const fabricVisualAlt = `Rivlet ${active.label}: fabric and silhouette, brand visual`;

  return (
    <section
      ref={heroRef}
      className={"hero" + (heroRevealed ? " reveal-in" : "")}
      aria-labelledby="hero-heading"
    >
      <div
        className="hero-wardrobe"
        onMouseEnter={() => {
          wardrobeHoverRef.current = true;
        }}
        onMouseLeave={() => {
          wardrobeHoverRef.current = false;
        }}
      >
        <div className="hero-soon-zone">
          <div className="hero-soon-bg" aria-hidden="true">
            <span className="hero-soon-line">Coming soon</span>
            <span className="hero-soon-line">Coming soon</span>
          </div>
          <div className="hero-soon-fg">
            <div className="badge anim" style={{ animationDelay: ".2s" }}>
              <span className="sq">
                <Star size={12} />
              </span>
              <span>4.9 from early-access readers · Madurai studio</span>
            </div>

            <h1 className="hero-h anim" id="hero-heading" style={{ animationDelay: ".3s" }}>
              <span className="l1">Move like you mean it.</span>
              <span className="l2">A wardrobe that flows with you.</span>
            </h1>

            <p className="hero-sub anim" style={{ animationDelay: ".4s" }}>
              Activewear, sportswear, athleisure and easy wear: Indian-made to global standards, without compromise, for
              days spent in motion.
            </p>

            <button
              type="button"
              className="hero-cta anim"
              style={{ animationDelay: ".5s" }}
              onClick={() => scrollToId("join")}
            >
              Join the early list
              <span className="arr">
                <ArrowRight size={16} />
              </span>
            </button>

            <div className="tabs-wrap anim" style={{ animationDelay: ".6s" }}>
              <div className="tabs" role="tablist" aria-label="Collection focus">
                {TABS.map((t, i) => {
                  const Ic = t.icon;
                  return (
                    <Fragment key={t.key}>
                      <button
                        type="button"
                        className={"tab" + (tab === t.key ? " active" : "")}
                        onClick={() => setTab(t.key)}
                        role="tab"
                        aria-selected={tab === t.key}
                      >
                        <span className="ico">
                          <Ic size={15} />
                        </span>
                        <span>{t.label}</span>
                      </button>
                      {i < TABS.length - 1 && (
                        <span
                          className={"tab-divider" + (tab === t.key || tab === TABS[i + 1]!.key ? " hide" : "")}
                          aria-hidden
                        />
                      )}
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Between tab row + bottom “Coming soon”; bridges toward “Rivlet in practice” */}
          <div className="hero-fabric-cluster" aria-hidden="true">
            <div className="hero-fabric-left-ledge">
              <div className="hero-fabric hero-fabric--cutout hero-fabric--left">
                <CrossfadeFabricImg src={fabLeft} alt={fabricVisualAlt} />
              </div>
            </div>
            <div className="hero-fabric-float">
              <div className="hero-fabric hero-fabric--cutout hero-fabric--top">
                <CrossfadeFabricImg src={fabTop} alt={fabricVisualAlt} fetchPriority="low" />
              </div>
              <div className="hero-fabric hero-fabric--cutout hero-fabric--right">
                <CrossfadeFabricImg src={fabRight} alt={fabricVisualAlt} fetchPriority="low" />
              </div>
            </div>
          </div>
        </div>

        <div className="anim hero-ed-deck" style={{ animationDelay: ".7s" }}>
          <div className="ed-show" id="collections">
            <div className="ed-intro">
              <div className="eyebrow">Rivlet in practice</div>
              <h3 className="ed-title">
                A wardrobe for <em>motion.</em>
              </h3>
              <p className="ed-sub">
                One wardrobe, four roles: training, daily life, and the hours between that hold most of a week.
              </p>
            </div>

            <div className="ed-list ed-rail" aria-label="Collection details">
              {TABS.map((t, i) => {
                const isActive = t.key === tab;
                return (
                  <div
                    key={t.key}
                    className={"ed-row" + (isActive ? " is-active" : "")}
                    onClick={() => setTab(t.key)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setTab(t.key);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                  >
                    <div className="ed-num">{String(i + 1).padStart(2, "0")}</div>
                    <div>
                      <div className="ed-rt">{t.label}</div>
                      <div className="ed-rb">{t.tagline}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="ed-frame">
              <CrossfadeFabricImg
                variant="frame"
                src={active.image}
                alt=""
                fetchPriority={tab === "active" ? "high" : "low"}
              />
              <div className="tint" />
              <div className="ed-inner ed-inner--tab-anim" key={tab}>
                <div className="ed-eyebrow">Featured · {active.label}</div>
                <div className="ed-h">{active.frameTitle}</div>
                <div className="ed-body">{active.frameBody}</div>
                <button type="button" className="ed-cta" onClick={() => scrollToId("vision")}>
                  <span className="arr">
                    <ArrowRight size={14} />
                  </span>
                  <span>Know more</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
