import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const t = fs.readFileSync(join(root, "index.legacy.html"), "utf8");
const m = t.match(/<style>\s*([\s\S]*?)\s*<\/style>/);
if (!m) throw new Error("No style block");
let css = m[1]
  .replace(/url\("assets\//g, 'url("/assets/')
  .replace(/url\('assets\//g, "url('/assets/");

const head = "/* Breakpoints: 480 / 640 / 760 / 880 / 1200 */\n";

const add = `

  /* === Mobile nav + responsive additions === */
  .nav-burger{display:none;align-items:center;justify-content:center;width:44px;height:44px;border-radius:12px;border:1px solid var(--ink-10);background:var(--bg);color:var(--ink);padding:0;flex-shrink:0;transition:background .2s}
  .nav-burger:hover{background:var(--bg-soft);border-color:var(--ink-30)}
  @media (max-width:879px){
    .nav-burger{display:inline-flex}
  }
  .nav-skip{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}
  .nav-drawer-back{position:fixed;inset:0;background:rgba(14,11,7,.45);z-index:900;opacity:0;visibility:hidden;transition:opacity .3s,visibility .3s}
  .nav-drawer-back.open{opacity:1;visibility:visible}
  .nav-drawer{position:fixed;top:0;right:0;width:min(100vw - 40px,320px);height:100%;background:var(--bg);z-index:901;box-shadow:-8px 0 40px rgba(14,11,7,.12);padding:24px;transform:translateX(100%);transition:transform .35s cubic-bezier(.2,.7,.2,1);display:flex;flex-direction:column;gap:8px}
  .nav-drawer.open{transform:translateX(0)}
  .nav-drawer a{font-size:15px;color:var(--ink-70);font-weight:500;padding:14px 4px;border-bottom:1px solid var(--ink-10);min-height:44px;display:flex;align-items:center;gap:6px;transition:color .2s}
  .nav-drawer a:hover,.nav-drawer a:focus{color:var(--ink);outline:none}
  .nav-drawer-cta{margin-top:16px;align-self:stretch}
  .ed-frame .ed-inner,.ed-frame .corner.tl,.ed-frame .corner.tr,.ed-frame .corner.bl{padding-left:20px;padding-right:20px}
  @media (min-width:401px) and (max-width:879px){
    .ed-frame{min-height:clamp(340px,42vw,480px)}
  }
  @media (min-width:641px) and (max-width:900px){
    .cmp-them p,.cmp-us p{max-width:100%}
  }
  .fab-card{ width: min(92vw, 380px) }
  @media (min-width: 480px){ .fab-card{ width: 360px; }}
  @media (min-width: 1200px){ .fab-card{ width: 380px; }}
  @media (max-width: 400px){
    .capture{ flex-direction: column; border-radius: 16px; padding: 8px; align-items: stretch; gap: 10px; max-width: 100%; }
    .capture input{ min-height: 48px; padding: 0 8px; text-align: center; }
    .capture button{ min-height: 48px; width: 100%; border-radius: 12px; }
    .cta{ padding: 48px 20px 56px; margin: 20px 16px; }
  }
  .mdl-card{ max-height: min(90vh, 720px); overflow-y: auto; -webkit-overflow-scrolling: touch; align-self: center; }
  @media (max-width: 480px){
    .mdl-card{ max-height: 92vh; width: 100%; }
    .mdl-overlay{ padding: 12px; align-items: flex-end; padding-bottom: max(12px, env(safe-area-inset-bottom)); }
  }
  @media (max-width: 479px){
    .foot-base{ flex-direction: column; align-items: flex-start; gap: 8px; }
    .foot-grid{ grid-template-columns: 1fr; gap: 28px; }
  }
  @media (max-width: 879px) and (min-width: 480px){
    .foot-grid{ grid-template-columns: 1fr 1fr; }
  }
  .tab{ min-height: 44px; }
  .hero-cta, .ed-row, .ed-frame .ed-cta{ min-height: 44px; }
`;

fs.writeFileSync(join(root, "src", "index.css"), head + css + add);
console.log("Wrote src/index.css");
