import type { ComponentType, ReactNode } from "react";
import { Activity, Wind, Layers, Leaf } from "../components/icons";

/** Files in `public/assets/`; encode spaces for reliable URLs */
function asset(filename: string): string {
  return `/assets/${encodeURIComponent(filename)}`;
}

/** Hero floating PNG (transparent) */
function floatPng(filename: string): string {
  return asset(filename);
}

export type TabKey = "active" | "sport" | "athleisure" | "easy";

export type TabDef = {
  key: TabKey;
  label: string;
  icon: ComponentType<{ size?: number }>;
  title: string;
  tagline: string;
  frameTitle: ReactNode;
  frameBody: string;
  pct: number;
  accent: string;
  image: string;
  /** Hero wardrobe: three floating fabric images (left ledge, top float, right float) for this collection */
  heroFloats: { left: string; top: string; right: string };
  items: { label: string; meta: string; done: boolean }[];
};

export const TABS: TabDef[] = [
  {
    key: "active",
    label: "Sports",
    icon: Activity,
    title: "For the work: run, lift, stretch.",
    tagline: "Built for the run, the lift, and the long stretch.",
    frameTitle: (
      <>
        Run with the <em>river.</em>
      </>
    ),
    frameBody:
      "Lightweight Madurai cotton, woven to wick yet loose enough to breathe. The first mile is the test; the rest becomes habit.",
    pct: 25,
    accent: "#7A5C3A",
    image: asset("Sports wear.jpeg"),
    heroFloats: {
      left: floatPng("Sports left.png"),
      top: floatPng("Sports top.png"),
      right: floatPng("Sports right.png"),
    },
    items: [
      { label: "Performance knit cotton", meta: "GOTS · 250gsm", done: true },
      { label: "4-way stretch waistband", meta: "Bonded seam", done: true },
      { label: "Sweat-wick laser perforation", meta: "Per panel", done: false },
      { label: "Reflective trim, dawn runs", meta: "Optional", done: false },
    ],
  },
  {
    key: "sport",
    label: "Performance",
    icon: Wind,
    title: "Built for sport-specific demands.",
    tagline: "Performance fabrics for sport-specific demands.",
    frameTitle: (
      <>
        Built to <em>last the round.</em>
      </>
    ),
    frameBody:
      "Salt-tested seams, four-way stretch, recovery on cycle fifty. We don't write specs we can't keep on the second wash.",
    pct: 67,
    accent: "#C4963A",
    image: asset("Performance.jpeg"),
    heroFloats: {
      left: floatPng("Performance left.png"),
      top: floatPng("Performance top.png"),
      right: floatPng("Performance right.png"),
    },
    items: [
      { label: "Recovery-blend mesh", meta: "Linen White", done: true },
      { label: "Anti-chafe gusset", meta: "Flatlock", done: true },
      { label: "Reinforced compression zones", meta: "Quad · Calf", done: true },
      { label: "Salt-tested seam tape", meta: "50 wash cycles", done: false },
    ],
  },
  {
    key: "athleisure",
    label: "Athleisure",
    icon: Layers,
    title: "Crossover: gym, street, dinner.",
    tagline: "Gym to street to dinner without a change of clothes.",
    frameTitle: (
      <>
        Move like water, <em>feel like air.</em>
      </>
    ),
    frameBody:
      "Soft hand, quiet seams, fabrics that breathe and recover. The garment should disappear on the body and read only as ease. That is the brief: set once, kept every season.",
    pct: 88,
    accent: "#4A5C6A",
    image: asset("Athleisure.jpeg"),
    heroFloats: {
      left: floatPng("Athleisure left.png"),
      top: floatPng("Athleisure top.png"),
      right: floatPng("athleisure right.png"),
    },
    items: [
      { label: "Tencel × cotton hand-feel", meta: "Sand · Navy · Ink", done: true },
      { label: "Hidden technical pockets", meta: "3 placements", done: true },
      { label: "Tailored, gym-tolerant cut", meta: "Pattern v2.4", done: true },
      { label: "Quiet hardware, no logos", meta: "Brass · matte", done: true },
    ],
  },
  {
    key: "easy",
    label: "Easy wear",
    icon: Leaf,
    title: "For the quiet hours. Travel, rest.",
    tagline: "For the quiet hours. Travel, rest, walk, read.",
    frameTitle: (
      <>
        For the <em>quiet hours.</em>
      </>
    ),
    frameBody:
      "Garment-washed Madurai cotton, lived-in cuts, travel-folded dimensions. Carry-on optimised. Built to wear in, never out.",
    pct: 100,
    accent: "#3e6b34",
    image: asset("Easy wear.jpeg"),
    heroFloats: {
      left: floatPng("Easy wear left.png"),
      top: floatPng("Easy wear top.png"),
      right: floatPng("Easy wear right.png"),
    },
    items: [
      { label: "Garment-washed Madurai cotton", meta: "Hand-finished", done: true },
      { label: "Loose, lived-in cuts", meta: "Pre-broken in", done: true },
      { label: "Travel-folded dimensions", meta: "Carry-on optimised", done: true },
      { label: "Wears in, never out", meta: "Built for 5 yrs+", done: true },
    ],
  },
];
