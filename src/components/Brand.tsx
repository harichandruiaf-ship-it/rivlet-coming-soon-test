export function Brand() {
  return (
    <a href="#" className="brand" onClick={(e) => e.preventDefault()} aria-label="Rivlet home">
      <div className="brand-mark" style={{ backgroundSize: "contain" }} />
      <div className="brand-text">Rivlet</div>
    </a>
  );
}
