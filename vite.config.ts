import { existsSync, readFileSync } from "node:fs";
import { normalize, join } from "node:path";
import { parse as parseDotenv } from "dotenv";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { buildSiteIdentityJsonLd } from "./src/data/siteIdentitySchema";

/** Same file order as Vite’s getEnvFilesForMode; later files override earlier. */
function applyDotenvFilesFromDir(dir: string, mode: string) {
  const files = [".env", ".env.local", `.env.${mode}`, `.env.${mode}.local`];
  for (const f of files) {
    const p = join(dir, f);
    if (!existsSync(p)) continue;
    try {
      const parsed = parseDotenv(readFileSync(p, "utf8"));
      for (const [k, v] of Object.entries(parsed)) {
        process.env[k] = v;
      }
    } catch (e) {
      console.warn(`[rivlet-subscribe-api] could not read ${p}:`, e);
    }
  }
}

export default defineConfig(() => ({
  server: {
    port: 5173,
    // Fail fast if 5173 is still taken (e.g. old `npm run dev` in another terminal) instead of jumping to 5174+.
    strictPort: true,
  },
  plugins: [
    {
      name: "rivlet-site-identity-jsonld",
      transformIndexHtml(html) {
        const json = JSON.stringify(buildSiteIdentityJsonLd());
        return html.replace(
          "</head>",
          `<script type="application/ld+json" id="rivlet-site-identity">${json}</script>\n</head>`,
        );
      },
    },
    {
      name: "rivlet-subscribe-api",
      enforce: "pre",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const rawUrl = req.url ?? "/";
          let pathname: string;
          try {
            pathname = new URL(rawUrl, "http://vite.local").pathname;
          } catch {
            pathname = rawUrl.split("?")[0] ?? "/";
          }
          if (pathname !== "/api/subscribe") return next();

          // Load server secrets from disk: loadEnv(..., "") can miss long values or odd paths; dotenv
          // reads the same .env* files Vite uses. Try envDir, root, then cwd (deduped).
          const mergeEnv = () => {
            const { mode, envDir, root } = server.config;
            const dirs: string[] = [];
            const seen = new Set<string>();
            for (const d of [envDir, root, process.cwd()]) {
              const key = normalize(d);
              if (seen.has(key)) continue;
              seen.add(key);
              dirs.push(d);
            }
            for (const dir of dirs) applyDotenvFilesFromDir(dir, mode);
            const loaded = loadEnv(mode, envDir, "");
            for (const [k, v] of Object.entries(loaded)) {
              if (v !== undefined) process.env[k] = v;
            }
          };

          if (req.method === "OPTIONS") {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");
            res.statusCode = 204;
            res.end();
            return;
          }

          if (req.method !== "POST") {
            res.statusCode = 405;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Method not allowed" }));
            return;
          }

          const chunks: Buffer[] = [];
          req.on("data", (c: Buffer) => chunks.push(c));
          req.on("end", () => {
            void (async () => {
              mergeEnv();
              try {
                const mod = await server.ssrLoadModule("/server/subscribeLogic.ts");
                const { executePostSubscribe } = mod as {
                  executePostSubscribe: (body: unknown) => Promise<{ status: number; body: Record<string, unknown> }>;
                };
                const raw = Buffer.concat(chunks).toString("utf8");
                const parsed = raw ? JSON.parse(raw) : {};
                const result = await executePostSubscribe(parsed);
                res.statusCode = result.status;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(result.body));
              } catch (e) {
                console.error(e);
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "Server error" }));
              }
            })();
          });
        });
      },
    },
    react(),
  ],
}));
