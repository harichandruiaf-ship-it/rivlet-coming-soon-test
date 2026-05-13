import { useEffect, useRef, useState } from "react";

type Stack = { b: string; t: string; showT: boolean };

const VARIANT = {
  fabric: {
    stack: "hero-fabric-stack",
    instant: "hero-fabric-stack--instant",
    layer: "hero-fabric-layer",
  },
  frame: {
    stack: "ed-frame-xfade",
    instant: "ed-frame-xfade--instant",
    layer: "ed-frame-xfade-layer",
  },
} as const;

type Variant = keyof typeof VARIANT;

/**
 * Two stacked images crossfade on `src` change — preload next frame before fading (no pop-in).
 * When both layers show the same URL (initial mount), render a single `<img>` so the browser does not request the same asset twice.
 */
export function CrossfadeFabricImg({
  src,
  alt,
  fetchPriority,
  variant = "fabric",
}: {
  src: string;
  alt: string;
  /** Set `"high"` on the hero’s first fabric only (LCP / fetch budget). */
  fetchPriority?: "high" | "low" | "auto";
  /** `frame` = full-bleed wardrobe image in `.ed-frame` (uses `.ed-frame-xfade*` CSS). */
  variant?: Variant;
}) {
  const { stack, instant, layer } = VARIANT[variant];
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
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sameUrl = d.b === d.t;
  const stackClass = stack + (prefersReducedMotion ? ` ${instant}` : "");

  const vis = (onBottom: boolean) => (onBottom ? !d.showT : d.showT);

  return (
    <span className={stackClass}>
      {sameUrl ? (
        <img
          className={`${layer} crossfade-visible`}
          src={d.b}
          alt={alt}
          decoding="async"
          fetchPriority={fetchPriority}
        />
      ) : (
        <>
          <img
            className={`${layer} ${vis(true) ? "crossfade-visible" : "crossfade-hidden"}`}
            src={d.b}
            alt={alt}
            decoding="async"
            fetchPriority={fetchPriority}
          />
          <img
            className={`${layer} ${vis(false) ? "crossfade-visible" : "crossfade-hidden"}`}
            src={d.t}
            alt={alt}
            decoding="async"
            fetchPriority={fetchPriority === "high" ? "low" : fetchPriority}
          />
        </>
      )}
    </span>
  );
}
