import { useEffect, useRef, useState } from "react";

type Stack = { b: string; t: string; showT: boolean };

/**
 * Two stacked images crossfade on `src` change — preload next frame before fading (no pop-in).
 * When both layers show the same URL (initial mount), render a single `<img>` so the browser does not request the same asset twice.
 */
export function CrossfadeFabricImg({
  src,
  alt,
  fetchPriority,
}: {
  src: string;
  alt: string;
  /** Set `"high"` on the hero’s first fabric only (LCP / fetch budget). */
  fetchPriority?: "high" | "low" | "auto";
}) {
  const data = useRef<Stack>({ b: src, t: src, showT: false });
  const [, version] = useState(0);
  const bump = () => version((n) => n + 1);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const d = data.current;
    const visible = d.showT ? d.t : d.b;
    if (visible === src) return;

    if (d.showT) d.b = src;
    else d.t = src;
    bump();

    if (reducedMotion) {
      d.showT = !d.showT;
      bump();
      return;
    }

    const im = new Image();
    im.decoding = "async";
    im.src = src;
    const run = () =>
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          data.current.showT = !data.current.showT;
          bump();
        });
      });
    if (im.complete) run();
    else im.onload = () => run();

    return () => {
      im.onload = null;
    };
  }, [src]);

  const d = data.current;
  const instant =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sameUrl = d.b === d.t;

  return (
    <span className={"hero-fabric-stack" + (instant ? " hero-fabric-stack--instant" : "")}>
      {sameUrl ? (
        <img
          className="hero-fabric-layer"
          src={d.b}
          alt={alt}
          decoding="async"
          fetchPriority={fetchPriority}
          style={{ opacity: 1, zIndex: 1 }}
        />
      ) : (
        <>
          <img
            className="hero-fabric-layer"
            src={d.b}
            alt={alt}
            decoding="async"
            fetchPriority={fetchPriority}
            style={{ opacity: d.showT ? 0 : 1, zIndex: d.showT ? 0 : 1 }}
          />
          <img
            className="hero-fabric-layer"
            src={d.t}
            alt={alt}
            decoding="async"
            fetchPriority={fetchPriority === "high" ? "low" : fetchPriority}
            style={{ opacity: d.showT ? 1 : 0, zIndex: d.showT ? 1 : 0 }}
          />
        </>
      )}
    </span>
  );
}
