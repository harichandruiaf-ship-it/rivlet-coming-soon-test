import { useEffect, useRef, useState } from "react";

export type RevealOptions = {
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
};

/**
 * Sets `revealed` to true when `ref` intersects the viewport. Respects `prefers-reduced-motion`.
 */
export function useRevealOnScroll<E extends HTMLElement = HTMLElement>(options: RevealOptions = {}) {
  const { rootMargin = "0px 0px -11% 0px", threshold = 0.08, once = true } = options;
  const ref = useRef<E | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            if (once) obs.disconnect();
            break;
          }
        }
      },
      { root: null, rootMargin, threshold },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [rootMargin, threshold, once]);

  return [ref, revealed] as const;
}
