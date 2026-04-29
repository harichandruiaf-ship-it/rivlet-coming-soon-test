import type { ComponentType, ReactNode } from "react";
import { Activity, Wind, Layers, Leaf } from "../components/icons";

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
  items: { label: string; meta: string; done: boolean }[];
};

export const TABS: TabDef[] = [
  {
    key: "active",
    label: "Sports",
    icon: Activity,
    title: "For the work — run, lift, stretch.",
    tagline: "Built for the work — the run, the lift, the long stretch.",
    frameTitle: (
      <>
        Run with the <em>river.</em>
      </>
    ),
    frameBody:
      "Lightweight Madurai cotton woven tight enough to wick, loose enough to breathe. The first mile is the test — the rest, a habit.",
    pct: 25,
    accent: "#7A5C3A",
    image: "/assets/fabric-1.jpg",
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
    image: "/assets/fabric-6.jpg",
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
    title: "Crossover — gym, street, dinner.",
    tagline: "The crossover — gym to street to dinner without a costume change.",
    frameTitle: (
      <>
        Move like water, <em>feel like air.</em>
      </>
    ),
    frameBody:
      "Soft hands. Quiet seams. Fabrics that breathe and recover. A garment should disappear on the body and only be felt as confidence — that is the whole brief, written once and held forever.",
    pct: 88,
    accent: "#4A5C6A",
    image: "/assets/fabric-3.jpg",
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
    image: "/assets/fabric-5.jpg",
    items: [
      { label: "Garment-washed Madurai cotton", meta: "Hand-finished", done: true },
      { label: "Loose, lived-in cuts", meta: "Pre-broken in", done: true },
      { label: "Travel-folded dimensions", meta: "Carry-on optimised", done: true },
      { label: "Wears in, never out", meta: "Built for 5 yrs+", done: true },
    ],
  },
];
