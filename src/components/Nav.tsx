import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Brand } from "./Brand";
import { ChevronDown, Menu } from "./icons";

type NavReveal = "pending" | "animate" | "instant";

const LINKS = [
  { href: "#collections", label: "Collections" as const, chevron: false },
  { href: "#vision", label: "Vision" as const, chevron: true },
  { href: "#different", label: "How we differ" as const, chevron: false },
  { href: "#promises", label: "Standards" as const, chevron: true },
  { href: "#faq", label: "FAQ" as const, chevron: false },
  { href: "#journal", label: "Journal" as const, chevron: false },
];

function scrollTo(href: string) {
  const id = href.replace("#", "");
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/** Pin header with `position: fixed` until this fraction of total scroll depth (0–1). */
const PIN_UNTIL_SCROLL = 0.7;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [navReveal, setNavReveal] = useState<NavReveal>("pending");
  const [navPinned, setNavPinned] = useState(true);
  const [navSpacerH, setNavSpacerH] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const navRevealSettled = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setNavReveal("instant");
      navRevealSettled.current = true;
      return;
    }

    const hero = document.querySelector("section.hero");
    if (!hero) {
      setNavReveal("instant");
      navRevealSettled.current = true;
      return;
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) settle("animate");
      },
      { threshold: 0.05, rootMargin: "0px" },
    );

    const settle = (mode: "animate" | "instant") => {
      if (navRevealSettled.current) return;
      navRevealSettled.current = true;
      setNavReveal(mode);
      io.disconnect();
    };

    io.observe(hero);

    const rid = requestAnimationFrame(() => {
      const r = hero.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom <= 0 || r.top >= vh) settle("instant");
    });

    return () => {
      cancelAnimationFrame(rid);
      io.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const measure = () => setNavSpacerH(Math.ceil(el.getBoundingClientRect().height));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [navReveal]);

  useEffect(() => {
    const updatePin = () => {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      const p = maxScroll <= 1 ? 0 : window.scrollY / maxScroll;
      setNavPinned(p < PIN_UNTIL_SCROLL);
    };
    updatePin();
    window.addEventListener("scroll", updatePin, { passive: true });
    window.addEventListener("resize", updatePin, { passive: true });
    const ro = new ResizeObserver(updatePin);
    ro.observe(document.documentElement);
    const main = document.getElementById("main");
    if (main) ro.observe(main);
    return () => {
      window.removeEventListener("scroll", updatePin);
      window.removeEventListener("resize", updatePin);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    setTimeout(() => firstLinkRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <a href="#main" className="nav-skip">
        Skip to content
      </a>
      {navPinned && navSpacerH > 0 ? (
        <div className="nav-spacer" style={{ height: navSpacerH }} aria-hidden="true" />
      ) : null}
      <nav
        ref={navRef}
        className={
          "top anim" +
          (navReveal !== "pending" ? " anim-in" : "") +
          (navReveal === "instant" ? " anim-instant" : "") +
          (navPinned ? " nav--pinned" : "")
        }
        style={{ animationDelay: navReveal === "animate" ? ".1s" : undefined }}
        aria-label="Primary"
      >
        <Brand />
        <div className="nav-links">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(l.href);
              }}
            >
              {l.label}
              {l.chevron ? <ChevronDown size={13} sw={1.8} /> : null}
            </a>
          ))}
        </div>
        <div className="nav-right">
          <button
            type="button"
            className="nav-burger"
            aria-expanded={open}
            aria-controls="nav-drawer"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            ref={closeRef}
          >
            <Menu size={20} sw={1.8} />
          </button>
          <a
            href="#join"
            className="pill"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#join");
              close();
            }}
          >
            Get early access
          </a>
        </div>
      </nav>

      <div
        className={"nav-drawer-back" + (open ? " open" : "")}
        aria-hidden={!open}
        onClick={close}
      />
      <div
        id="nav-drawer"
        className={"nav-drawer" + (open ? " open" : "")}
        role="dialog"
        aria-modal="true"
        aria-label="Site sections"
        aria-hidden={!open}
        data-open={open ? "true" : "false"}
      >
        {LINKS.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            ref={i === 0 ? firstLinkRef : undefined}
            onClick={(e) => {
              e.preventDefault();
              scrollTo(l.href);
              close();
            }}
          >
            {l.label}
            {l.chevron ? <ChevronDown size={14} sw={1.8} /> : null}
          </a>
        ))}
        <a
          href="#join"
          className="pill nav-drawer-cta"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#join");
            close();
          }}
        >
          Get early access
        </a>
      </div>
    </>
  );
}
