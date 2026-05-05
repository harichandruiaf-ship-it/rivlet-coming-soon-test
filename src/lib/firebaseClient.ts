import type { Analytics } from "firebase/analytics";
import type { FirebaseApp, FirebaseOptions } from "firebase/app";

let app: FirebaseApp | null = null;
let analytics: Analytics | null = null;

function readConfig(): FirebaseOptions | null {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  const appId = import.meta.env.VITE_FIREBASE_APP_ID;
  const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
  const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
  if (!apiKey || !appId || !authDomain || !projectId || !storageBucket || !messagingSenderId) {
    return null;
  }
  return {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || undefined,
  };
}

/**
 * Call once after idle. Dynamic-imports the SDK so the main bundle stays smaller for Lighthouse.
 * Does nothing if VITE_FIREBASE_API_KEY / VITE_FIREBASE_APP_ID are missing (e.g. local .env not created).
 */
export async function initFirebaseClient(): Promise<void> {
  if (import.meta.env.SSR) return;

  const options = readConfig();
  if (!options) {
    if (import.meta.env.DEV) {
      console.warn(
        "[firebase] Client not initialized: set VITE_FIREBASE_* in .env.local (see .env.example).",
      );
    }
    return;
  }

  const { getApp, getApps, initializeApp } = await import("firebase/app");
  const { getAnalytics, isSupported } = await import("firebase/analytics");

  app = getApps().length > 0 ? getApp() : initializeApp(options);

  if (!app) return;
  if (await isSupported()) {
    analytics = getAnalytics(app);
  }
}

export function getFirebaseApp(): FirebaseApp | null {
  return app;
}

export function getFirebaseAnalyticsInstance(): Analytics | null {
  return analytics;
}
