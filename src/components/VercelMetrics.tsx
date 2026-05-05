import { useEffect, useState, type ComponentType } from "react";

type MetricsPair = {
  Analytics: ComponentType;
  SpeedInsights: ComponentType;
};

/**
 * Load Vercel Analytics + Speed Insights after idle so they do not compete with
 * first paint, scroll reveals, or the fabric ribbon rAF loop.
 */
export function VercelMetrics() {
  const [pair, setPair] = useState<MetricsPair | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = () => {
      if (cancelled) return;
      void Promise.all([import("@vercel/analytics/react"), import("@vercel/speed-insights/react")]).then(
        ([a, s]) => {
          if (cancelled) return;
          setPair({ Analytics: a.Analytics, SpeedInsights: s.SpeedInsights });
        },
      );
    };

    let cancelScheduled: (() => void) | undefined;

    if (typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(load, { timeout: 6000 });
      cancelScheduled = () => {
        if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idleId);
      };
    } else {
      const timeoutId = window.setTimeout(load, 2000);
      cancelScheduled = () => window.clearTimeout(timeoutId);
    }

    return () => {
      cancelled = true;
      cancelScheduled?.();
    };
  }, []);

  if (!pair) return null;
  const { Analytics, SpeedInsights } = pair;
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
