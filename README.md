# Rivlet — coming soon

Vite + React (TypeScript) port of the Rivlet landing page. Subscriptions go through **`POST /api/subscribe`**: in local dev Vite serves this route (see [`vite.config.ts`](./vite.config.ts)); on [Vercel](https://vercel.com) the same logic runs as a serverless function ([`api/subscribe.ts`](./api/subscribe.ts)). Firestore (Admin SDK) and [Resend](https://resend.com) handle storage and email.

The **Firebase JS SDK (client)** is installed for optional **Analytics** — see [`src/lib/firebaseClient.ts`](./src/lib/firebaseClient.ts) and the `VITE_FIREBASE_*` keys below. It does not send subscriber emails or write to Firestore from the browser (that stays on the server).

## Environment variables (Vite / browser, public)

Set these in `.env.local` and in the Vercel project for **Preview + Production** so the build embeds the config. Copy field names and values from Firebase Console → Project settings → *Your apps* (the npm / modular snippet). See [`.env.example`](./.env.example) for the full list. Optional: `VITE_FIREBASE_MEASUREMENT_ID` (e.g. `G-...`) for Analytics.

## Environment variables (server — `.env.local` locally, dashboard when hosted)

| Variable | Description |
| --- | --- |
| `FIREBASE_SERVICE_ACCOUNT` | Full JSON of a Firebase **service account** (single-line string in the Vercel dashboard). Not the client `firebaseConfig`. On Vercel, do **not** rely on `FIREBASE_SERVICE_ACCOUNT_PATH` (no secret JSON file in the deployment); use this var or Vercel’s secret store. |
| `FIREBASE_SERVICE_ACCOUNT_PATH` | **Local dev only:** path to the JSON file next to `package.json` (see [`.env.example`](./.env.example)). Ignored if unset. |
| `RESEND_API_KEY` | API key from Resend. If omitted, signup still saves to Firestore but no email is sent (useful for local UI dev). |
| `MAIL_FROM` | Sender address, e.g. `earlyaccess@therivlet.com` (after domain verification in Resend). |
| `MAIL_NOTIFY_TO` | Inbox for internal “new subscriber” messages, e.g. `earlyaccess@therivlet.com`. |

Copy [`.env.example`](./.env.example) to **`.env.local`** at the repo root; Vite loads it for both the app and the dev-server subscribe handler. When you host on Vercel, set the same names in Project Settings → Environment Variables.

## Firestore

- **Rules:** [`firestore.rules`](./firestore.rules) — deny all client access to `subscribers`; only the server (Admin SDK) writes.
- **Deploy rules:** in Firebase Console → Firestore → Rules, or `firebase deploy --only firestore:rules` if you use the Firebase CLI.

## Local development (full stack)

```bash
npm install
npm run dev
```

Open the URL Vite prints (default `http://localhost:5173`). The dev server implements **`POST /api/subscribe`** with the same behavior as production (shared code in [`server/subscribeLogic.ts`](./server/subscribeLogic.ts)).

1. Copy [`.env.example`](./.env.example) to **`.env.local`** at the repo root.
2. Set **`VITE_FIREBASE_*`** for the client (optional Analytics).
3. Set **`FIREBASE_SERVICE_ACCOUNT`**: entire service account JSON as **one single line** (minify if needed).
4. Set **`RESEND_API_KEY`**, **`MAIL_FROM`**, **`MAIL_NOTIFY_TO`** for welcome + notify emails; if `RESEND_API_KEY` is omitted, sign-up still writes to Firestore and skips email (see [`server/subscribeLogic.ts`](./server/subscribeLogic.ts)).

Submit the early-access form with a test email, then confirm in **Firebase Console → Firestore** under **`subscribers`**, and check inboxes if Resend is configured.

**Note:** Keep a single Vite config at the repo root — **`vite.config.ts`**. If a stray **`vite.config.js`** exists, Vite may load it first and skip the dev API (see [Vite config resolution](https://vite.dev/config/)).

## Production (Vercel)

1. Connect the repo; set the environment variables for Production (and Preview if you want sign-up on preview deploys with test keys).
2. Build: `npm run build` (default for Vite).
3. Output: `dist`. SPA fallback is configured in [`vercel.json`](./vercel.json) (`/api/*` is **not** rewritten to `index.html`, so `POST /api/subscribe` hits the serverless handler).
4. **Images:** put JPGs under **`public/assets/`** so these URLs resolve: `fabric-1.jpg` … `fabric-6.jpg`, `vision-fabric.jpg`, `tech-aquaflow.jpg`, `tech-secondskin.jpg`, `tech-neutralcore.jpg`, `tech-terraweave.jpg`, `tech-cloudpress.jpg`, `tech-ecothread.jpg` (see [`src/components/Hero.tsx`](./src/components/Hero.tsx), [`src/data/tabs.tsx`](./src/data/tabs.tsx), [`src/components/Promises.tsx`](./src/components/Promises.tsx), [`src/index.css`](./src/index.css)).
5. Deploy Firestore rules separately (Firebase Console or CLI) — they are not deployed by Vercel.

## Legacy

The original single-file app is kept as `index.legacy.html` for reference.
