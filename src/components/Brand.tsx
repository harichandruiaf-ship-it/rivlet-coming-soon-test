function scrollPageToTop() {
  const instant = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: instant ? "auto" : "smooth" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function Brand() {
  return (
    <a
      href="#main"
      className="brand"
      onClick={(e) => {
        e.preventDefault();
        scrollPageToTop();
      }}
      aria-label="Rivlet — scroll to top"
    >
      <div className="brand-mark" style={{ backgroundSize: "contain" }} />
      <div className="brand-text">Rivlet</div>
    </a>
  );
}
