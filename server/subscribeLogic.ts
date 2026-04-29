import { existsSync, readFileSync } from "node:fs";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Resend } from "resend";
import type { ServiceAccount } from "firebase-admin";
import { buildCustomerWelcomeEmail } from "./emailTemplates/customerWelcome.js";
import { buildNotifySubscriberEmail } from "./emailTemplates/notifySubscriber.js";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

/* Vercel serverless: gRPC transport often fails (FUNCTION_INVOCATION_FAILED); REST is supported. */
if (process.env.VERCEL && process.env.FIRESTORE_PREFER_REST == null) {
  process.env.FIRESTORE_PREFER_REST = "true";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Vercel/Linux env keys are case-sensitive; .env imports sometimes preserve different casing. */
function envFirst(...keys: string[]): string | undefined {
  for (const k of keys) {
    const v = process.env[k]?.trim();
    if (v) return v;
  }
  return undefined;
}

/** Repo root (folder that contains package.json), not process.cwd() — cwd can differ when starting Vite. */
function findPackageRoot(startDir: string): string {
  let dir = startDir;
  for (let i = 0; i < 24; i++) {
    if (existsSync(join(dir, "package.json"))) return dir;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return process.cwd();
}

const PACKAGE_ROOT = findPackageRoot(dirname(fileURLToPath(import.meta.url)));

function resolveServiceAccountFilePath(pathEnv: string): string {
  const p = pathEnv.trim();
  return isAbsolute(p) ? p : resolve(PACKAGE_ROOT, p);
}

/** gRPC-style status from @google-cloud/firestore / gax, plus message fallbacks */
function firestoreHint(code: string | undefined, message: string): string | undefined {
  const m = message.toLowerCase();
  const c = code?.trim() ?? "";
  if (c === "5" || c === "NOT_FOUND" || m.includes("not found"))
    return "Create a Firestore database in Firebase Console (Build → Firestore) using Native mode, or confirm the service account belongs to this project.";
  if (c === "7" || c === "PERMISSION_DENIED" || m.includes("permission") || m.includes("insufficient permissions"))
    return "Enable the Cloud Firestore API for this Google Cloud project, and ensure the downloaded key is for the same project as your VITE_FIREBASE_PROJECT_ID.";
  if (c === "9" || c === "FAILED_PRECONDITION" || m.includes("failed precondition"))
    return "Firestore may be in the wrong mode or not fully initialized; check the Firebase console for database setup.";
  if (c === "14" || c === "UNAVAILABLE" || m.includes("unavailable"))
    return "Firestore temporarily unavailable — retry, or check network / VPN / firewall.";
  return undefined;
}

function parseServiceAccountJson(): ServiceAccount {
  const pathEnv =
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH?.trim() ||
    process.env.FIREBASE_SERVICE_ACCOUNT_FILE?.trim();
  if (pathEnv) {
    const abs = resolveServiceAccountFilePath(pathEnv);
    if (existsSync(abs)) {
      const fileRaw = readFileSync(abs, "utf8").trim();
      try {
        return JSON.parse(fileRaw) as ServiceAccount;
      } catch (parseErr) {
        console.error("service account file JSON.parse failed", parseErr);
        throw new Error(
          "FIREBASE_SERVICE_ACCOUNT_PATH must point to a valid Firebase service account JSON file.",
        );
      }
    }
    /* Local .env often points at a JSON file that is not deployed; fall through to FIREBASE_SERVICE_ACCOUNT. */
    console.warn(
      `FIREBASE_SERVICE_ACCOUNT_PATH not found (${abs}); using FIREBASE_SERVICE_ACCOUNT if set (required on Vercel).`,
    );
  }

  let raw = process.env.FIREBASE_SERVICE_ACCOUNT?.trim();
  if (!raw) {
    throw new Error(
      "Missing Firebase Admin credentials. Locally: FIREBASE_SERVICE_ACCOUNT_PATH to your JSON file, or FIREBASE_SERVICE_ACCOUNT (one-line JSON). On Vercel: add env var FIREBASE_SERVICE_ACCOUNT with the full service account JSON minified to one line (do not rely on a file path).",
    );
  }
  // Whole JSON wrapped in single quotes is common in .env when the value contains double quotes
  if (raw.startsWith("'") && raw.endsWith("'")) {
    raw = raw.slice(1, -1).replace(/\\'/g, "'");
  }
  try {
    return JSON.parse(raw) as ServiceAccount;
  } catch (parseErr) {
    console.error("FIREBASE_SERVICE_ACCOUNT JSON.parse failed", parseErr);
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT must be valid JSON on one line (minify the key file), or use FIREBASE_SERVICE_ACCOUNT_PATH=./your-key.json — multi-line JSON in .env is not supported.",
    );
  }
}

function getDb() {
  const credJson = parseServiceAccountJson();
  if (!getApps().length) {
    initializeApp({ credential: cert(credJson) });
  }
  return getFirestore();
}

export type PostSubscribeResult = {
  status: number;
  body: Record<string, unknown>;
};

/**
 * POST /api/subscribe body: { email: string }
 * Reads FIREBASE_SERVICE_ACCOUNT or FIREBASE_SERVICE_ACCOUNT_PATH, RESEND_API_KEY, MAIL_FROM, MAIL_NOTIFY_TO.
 */
export async function executePostSubscribe(bodyUnknown: unknown): Promise<PostSubscribeResult> {
  let body: { email?: string };
  try {
    body =
      typeof bodyUnknown === "string"
        ? (JSON.parse(bodyUnknown) as { email?: string })
        : (bodyUnknown as { email?: string });
  } catch {
    return { status: 400, body: { error: "Invalid JSON" } };
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(email)) {
    return { status: 400, body: { error: "Invalid email" } };
  }

  const resendKey = envFirst("RESEND_API_KEY", "Resend_API_Key");
  const from =
    envFirst("MAIL_FROM", "Mail_From") ?? "earlyaccess@therivlet.com";
  const notifyTo =
    envFirst("MAIL_NOTIFY_TO", "Mail_Notify_To") ?? "earlyaccess@therivlet.com";

  const name = email.split("@")[0] ?? "there";
  const nowIst = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const nowIso = new Date().toISOString();

  let subscriberNumber: number | undefined;

  try {
    const db = getDb();
    const col = db.collection("subscribers");
    const existing = await col.where("email", "==", email).limit(1).get();
    if (!existing.empty) {
      return { status: 200, body: { ok: true, already: true } };
    }

    await col.add({
      email,
      source: "rivlet-coming-soon",
      subscribedAt: FieldValue.serverTimestamp(),
      subscribedAtIso: nowIso,
      subscribedAtIst: nowIst,
    });

    try {
      const countSnap = await col.count().get();
      subscriberNumber = countSnap.data().count;
    } catch (countErr) {
      console.error("subscriber count aggregate failed", countErr);
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    const raw = e as { code?: unknown; status?: unknown };
    const code =
      raw && typeof raw === "object"
        ? raw.code !== undefined
          ? String(raw.code)
          : raw.status !== undefined
            ? String(raw.status)
            : undefined
        : undefined;
    console.error("firestore subscription error:", msg, code ?? "", e);
    const isConfig =
      msg.includes("FIREBASE_SERVICE_ACCOUNT") ||
      msg.includes("not valid JSON") ||
      /private key|PEM|DECODER/i.test(msg);
    const hint = isConfig ? undefined : firestoreHint(code, msg);
    return {
      status: 500,
      body: {
        error: isConfig ? msg : "Could not save subscription",
        ...(code ? { code } : {}),
        ...(hint ? { hint } : {}),
      },
    };
  }

  if (!resendKey) {
    console.warn("RESEND_API_KEY not set; skipping email send");
    return {
      status: 200,
      body: { ok: true, emailsSkipped: true, ...(subscriberNumber !== undefined ? { subscriberNumber } : {}) },
    };
  }

  try {
    const resend = new Resend(resendKey);
    const welcome = buildCustomerWelcomeEmail(name);

    const notify = buildNotifySubscriberEmail({ email, nowIst, nowIso });

    const [w, n] = await Promise.all([
      resend.emails.send({
        from,
        to: email,
        subject: welcome.subject,
        text: welcome.text,
        html: welcome.html,
      }),
      resend.emails.send({
        from,
        to: notifyTo,
        subject: `New Rivlet subscriber: ${email}`,
        text: notify.text,
        html: notify.html,
      }),
    ]);

    if (w.error) console.error("resend welcome", w.error);
    if (n.error) console.error("resend notify", n.error);
  } catch (e) {
    console.error("resend", e);
  }

  return {
    status: 200,
    body: { ok: true, ...(subscriberNumber !== undefined ? { subscriberNumber } : {}) },
  };
}
