import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

export function Footer() {
  const [footRef, footRevealed] = useRevealOnScroll<HTMLElement>({ rootMargin: "0px 0px -11% 0px" });
  return (
    <footer ref={footRef} className={"bot section-await" + (footRevealed ? " reveal-in" : "")} id="journal">
      <div className="foot-grid">
        <div>
          <div className="foot-mark">Rivlet</div>
          <p style={{ fontSize: 14, color: "var(--ink-70)", maxWidth: "32ch", lineHeight: 1.6 }}>
            Premium Indian activewear, sportswear, athleisure and easy wear. Cut in India. Worn worldwide. No
            compromise on fabric or finish.
          </p>
        </div>
        <div>
          <h4>Studio</h4>
          <ul>
            <li>Madurai</li>
            <li>Tamil Nadu, India</li>
          </ul>
        </div>
        <div>
          <h4>Write to us</h4>
          <ul>
            <li>
              <a href="mailto:hello@therivlet.com">hello@therivlet.com</a>
            </li>
            <li>
              <a href="mailto:support@therivlet.com">support@therivlet.com</a>
            </li>
            <li>
              <a href="mailto:Partners@therivlet.com">Partners@therivlet.com</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Elsewhere</h4>
          <ul>
            <li>
              <a
                href="https://www.instagram.com/rivletindia/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Rivlet on Instagram"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/channel/UCfSh7zi2goRuzoB4-_YC_eQ"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Rivlet on YouTube"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-2C18.88 4 12 4 12 4s-6.88 0-8.59.42a2.78 2.78 0 0 0-1.95 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 2C5.12 20 12 20 12 20s6.88 0 8.59-.42a2.78 2.78 0 0 0 1.95-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon points="9.75,15.02 15.5,12 9.75,8.98" fill="currentColor" stroke="none" />
                </svg>
                YouTube
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/rivlet/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Rivlet on LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="foot-base">
        <span>© 2026 Rivlet · All rights reserved</span>
        <span>Move like water · Feel like air</span>
      </div>
    </footer>
  );
}
