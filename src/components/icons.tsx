import type { SVGProps, ReactNode } from "react";

type IconBase = SVGProps<SVGSVGElement> & { size?: number; sw?: number };

function Base({
  size = 16,
  sw = 1.7,
  fill = "none",
  children,
  ...rest
}: IconBase & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={fill}
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    >
      {children}
    </svg>
  );
}

export function Star(p: IconBase) {
  return (
    <Base {...p} fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </Base>
  );
}

export function ChevronDown(p: IconBase) {
  return (
    <Base {...p}>
      <polyline points="6 9 12 15 18 9" />
    </Base>
  );
}

export function ArrowRight(p: IconBase) {
  return (
    <Base {...p}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </Base>
  );
}

export function ArrowLeft(p: IconBase) {
  return (
    <Base {...p}>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </Base>
  );
}

export function Check(p: IconBase) {
  return (
    <Base {...p}>
      <polyline points="20 6 9 17 4 12" />
    </Base>
  );
}

export function Menu(p: IconBase) {
  return (
    <Base {...p}>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </Base>
  );
}

export function Activity(p: IconBase) {
  return (
    <Base {...p}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </Base>
  );
}

export function Wind(p: IconBase) {
  return (
    <Base {...p}>
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2" />
      <path d="M12.59 19.41A2 2 0 1 0 14 16H2" />
      <path d="M17.73 7.73A2.5 2.5 0 1 1 19.5 12H2" />
    </Base>
  );
}

export function Layers(p: IconBase) {
  return (
    <Base {...p}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </Base>
  );
}

export function Leaf(p: IconBase) {
  return (
    <Base {...p}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.5c1 1.5 0 7-2.7 9.7-2.6 2.6-7.5 2.6-7.5 2.6" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </Base>
  );
}
