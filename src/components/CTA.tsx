import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Check } from "./icons";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import { subscribeEmail, type SubscribeResult } from "../lib/subscribeApi";

const confettiCls = ["", "gold", "cardamom", "thin", "gold thin"] as const;

type CParticle = { lx: string; tx: string; d: string; dl: string; cls: string };

function confettiStyle(c: CParticle): CSSProperties {
  return {
    ["--lx" as string]: c.lx,
    ["--tx" as string]: c.tx,
    ["--d" as string]: c.d,
    ["--dl" as string]: c.dl,
  };
}

export function CTA() {
  const [ctaRef, ctaRevealed] = useRevealOnScroll<HTMLElement>({ rootMargin: "0px 0px -11% 0px" });
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [subscribeMeta, setSubscribeMeta] = useState<SubscribeResult | null>(null);
  const confetti = useMemo<CParticle[]>(
    () =>
      Array.from({ length: 38 }).map((_, i) => ({
        lx: (Math.random() * 100).toFixed(1) + "%",
        tx: (Math.random() * 120 - 60).toFixed(0) + "px",
        d: (1.8 + Math.random() * 1.6).toFixed(2) + "s",
        dl: (Math.random() * 0.5).toFixed(2) + "s",
        cls: confettiCls[i % confettiCls.length]!,
      })),
    []
  );

  useEffect(() => {
    if (!showModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [showModal]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setLoading(true);
    setError("");
    try {
      const normalized = email.trim().toLowerCase();
      const result = await subscribeEmail(normalized);
      setSubmittedEmail(normalized);
      setSubscribeMeta(result);
      setDone(true);
      setShowModal(true);
    } catch (err) {
      console.error("Subscription error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong — please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={ctaRef} className={"cta section-await" + (ctaRevealed ? " reveal-in" : "")} id="join">
      <h2>
        You <em>belong</em> here.
      </h2>
      <p>
        The list is small on purpose. <span style={{ color: "var(--gold)" }}>An early-access discount</span>, first
        drops, and the founder&apos;s notes — written from the river, sent at dawn.
      </p>
      <div className="cta-perks">
        <span className="chip">
          <span className="o">
            <Check size={11} />
          </span>
          <strong>15% off</strong> first drop
        </span>
        <span className="chip">
          <span className="o">
            <Check size={11} />
          </span>
          First access · before public
        </span>
        <span className="chip">
          <span className="o">
            <Check size={11} />
          </span>
          Founder&apos;s note from Madurai
        </span>
      </div>
      <form className="capture" onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email"
        />
        <button type="submit" disabled={loading} style={{ opacity: loading ? 0.7 : 1, transition: "opacity .2s" }}>
          {loading ? "Joining…" : "Claim my spot"}
        </button>
      </form>
      {error && <div className="capture-err">{error}</div>}
      <div className={"capture-msg" + (done ? " in" : "")}>You&apos;re on the list. We&apos;ll write at first light.</div>
      <div className="cta-fine">No spam · Unsubscribe in one click · Capped at 1,000 names</div>

      {showModal &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="mdl-overlay"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowModal(false);
            }}
          >
            <div className="mdl-card" role="dialog" aria-modal="true" aria-labelledby="welcome-title" tabIndex={-1}>
              <div className="mdl-confetti" aria-hidden>
                {confetti.map((c, i) => (
                  <i key={i} className={c.cls} style={confettiStyle(c)} />
                ))}
              </div>
              <button type="button" className="mdl-close" onClick={() => setShowModal(false)} aria-label="Close">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>

              <div className="mdl-seal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <div className="mdl-eye">
                <span className="ln" />
                {subscribeMeta?.already ? "Founders' list · Returning" : "Founders' list · Welcome"}
                <span className="ln r" />
              </div>

              {subscribeMeta?.already ? (
                <>
                  <h3 id="welcome-title">
                    You&apos;re <em>already</em> on the list.
                  </h3>
                  <p className="lede">
                    This address is already registered for Rivlet early access. No need to sign up again — we&apos;ll
                    keep sending founder notes and first drops to this inbox.
                  </p>
                </>
              ) : (
                <>
                  <h3 id="welcome-title">
                    Thank you. You just joined a <em>quiet revolution.</em>
                  </h3>
                  <p className="lede">
                    Thank you for sharing your email address. From this moment on, you&apos;re not a customer on a
                    list. You&apos;re a <em>founding voice</em> shaping how India dresses the world.
                  </p>
                </>
              )}

              <div className="mdl-quote">
                &ldquo;Premium is no longer imported.
                <br />
                It is woven, here, with intention.&rdquo;
              </div>

              <div className="mdl-meta">
                {subscribeMeta?.already ? (
                  <>
                    <span className="pos">Already registered</span>
                    <span className="sep" />
                    <span>Madurai studio</span>
                    <span className="sep" />
                    <span>Sent at first light</span>
                  </>
                ) : (
                  <>
                    <span className="pos">
                      {subscribeMeta?.subscriberNumber != null
                        ? `No. ${subscribeMeta.subscriberNumber.toLocaleString("en-US")} of 1,000`
                        : "Founders' list · capped at 1,000"}
                    </span>
                    <span className="sep" />
                    <span>Madurai studio</span>
                    <span className="sep" />
                    <span>Sent at first light</span>
                  </>
                )}
              </div>

              <button type="button" className="mdl-cta" onClick={() => setShowModal(false)}>
                <span>Carry on, quietly</span>
                <ArrowRight size={14} sw={1.8} />
              </button>

              <div className="mdl-share">
                {subscribeMeta?.already ? (
                  <>
                    <span className="mdl-share-email">{submittedEmail}</span> is already registered.
                  </>
                ) : (
                  <>
                    A founder&apos;s note will reach <span className="mdl-share-email">{submittedEmail}</span> shortly.
                  </>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}
