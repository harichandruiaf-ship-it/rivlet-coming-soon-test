import { useEffect, useRef, type MutableRefObject, type RefObject } from "react";

/** Optional: bump `until` (ms since epoch) so auto-marquee pauses after arrow / programmatic scroll. */
export type FabricRibbonPauseRef = MutableRefObject<{ until: number }>;

const WHEEL_PAUSE_MS = 2600;
const DURATION_DESKTOP_MS = 38_000;
const DURATION_MOBILE_MS = 56_000;

/**
 * Fabric systems rail: auto marquee by advancing scroll over duplicated content,
 * plus mouse/pen drag and native touch scroll. Runs even when `prefers-reduced-motion` is on
 * (slow continuous scroll, not stepped entrance animations). Pauses only while dragging
 * (mouse/pen) or briefly after wheel.
 */
export function useFabricRibbonScroll(
  ref: RefObject<HTMLElement | null>,
  manualPauseRef?: FabricRibbonPauseRef,
): void {
  const drag = useRef<{
    active: boolean;
    startX: number;
    startScroll: number;
    pointerId: number;
  } | null>(null);
  const pauseUntil = useRef(0);
  const lastTick = useRef<number | null>(null);
  const rafId = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const applyScrollLeft = (x: number) => {
      el.scrollTo({ left: x, top: 0, behavior: "auto" });
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      if (e.button !== 0) return;
      drag.current = {
        active: true,
        startX: e.clientX,
        startScroll: el.scrollLeft,
        pointerId: e.pointerId,
      };
      el.classList.add("fab-track-wrap--dragging");
      el.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      const d = drag.current;
      if (!d?.active || e.pointerId !== d.pointerId) return;
      e.preventDefault();
      applyScrollLeft(d.startScroll - (e.clientX - d.startX));
    };

    const endDrag = (e: PointerEvent) => {
      const d = drag.current;
      if (!d?.active || e.pointerId !== d.pointerId) return;
      drag.current = null;
      el.classList.remove("fab-track-wrap--dragging");
      pauseUntil.current = performance.now() + WHEEL_PAUSE_MS;
      try {
        if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    };

    const onLostCapture = () => {
      drag.current = null;
      el.classList.remove("fab-track-wrap--dragging");
    };

    const onWheel = () => {
      pauseUntil.current = performance.now() + WHEEL_PAUSE_MS;
    };

    const moveOpts: AddEventListenerOptions = { passive: false };
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove, moveOpts);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("lostpointercapture", onLostCapture);
    el.addEventListener("wheel", onWheel, { passive: true });

    const tick = (now: number) => {
      rafId.current = requestAnimationFrame(tick);
      const manualUntil = manualPauseRef?.current.until ?? 0;
      if (drag.current?.active || performance.now() < Math.max(pauseUntil.current, manualUntil)) {
        lastTick.current = now;
        return;
      }

      const half = el.scrollWidth / 2;
      if (half < 8) {
        lastTick.current = now;
        return;
      }

      const prev = lastTick.current ?? now;
      lastTick.current = now;
      const dt = Math.min(64, now - prev);

      const mobile = window.matchMedia("(max-width: 879px)").matches;
      const duration = mobile ? DURATION_MOBILE_MS : DURATION_DESKTOP_MS;
      const speed = half / duration;

      let s = el.scrollLeft + speed * dt;
      while (s >= half) s -= half;
      while (s < 0) s += half;
      applyScrollLeft(s);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId.current);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove, moveOpts);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
      el.removeEventListener("lostpointercapture", onLostCapture);
      el.removeEventListener("wheel", onWheel);
      el.classList.remove("fab-track-wrap--dragging");
    };
  }, [ref, manualPauseRef]);
}
