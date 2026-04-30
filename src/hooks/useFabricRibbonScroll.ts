import { useEffect, useRef, type RefObject } from "react";

const WHEEL_PAUSE_MS = 2600;
const DURATION_DESKTOP_MS = 38_000;
const DURATION_MOBILE_MS = 56_000;

/**
 * Fabric systems rail: auto marquee by advancing scrollLeft over duplicated content,
 * plus mouse/pen drag and native touch scroll. Pauses auto while dragging, after wheel,
 * and while pointer is over the rail (desktop), matching the previous hover-pause behaviour.
 */
export function useFabricRibbonScroll(ref: RefObject<HTMLElement | null>): void {
  const drag = useRef<{
    active: boolean;
    startX: number;
    startScroll: number;
    pointerId: number;
  } | null>(null);
  const hovering = useRef(false);
  const touchActive = useRef(0);
  const pauseUntil = useRef(0);
  const lastTick = useRef<number | null>(null);
  const rafId = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
      el.scrollLeft = d.startScroll - (e.clientX - d.startX);
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

    const onMouseEnter = () => {
      hovering.current = true;
    };
    const onMouseLeave = () => {
      hovering.current = false;
    };

    const onTouchStart = () => {
      touchActive.current += 1;
    };
    const onTouchEnd = () => {
      touchActive.current = Math.max(0, touchActive.current - 1);
      if (touchActive.current === 0) pauseUntil.current = performance.now() + WHEEL_PAUSE_MS;
    };

    const moveOpts: AddEventListenerOptions = { passive: false };
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove, moveOpts);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("lostpointercapture", onLostCapture);
    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });

    const tick = (now: number) => {
      rafId.current = requestAnimationFrame(tick);
      if (reducedMotion) {
        lastTick.current = now;
        return;
      }
      if (
        drag.current?.active ||
        hovering.current ||
        touchActive.current > 0 ||
        performance.now() < pauseUntil.current
      ) {
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
      el.scrollLeft = s;
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
      el.removeEventListener("mouseenter", onMouseEnter);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      el.classList.remove("fab-track-wrap--dragging");
    };
  }, [ref]);
}
