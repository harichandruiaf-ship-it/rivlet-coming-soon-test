import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { initFirebaseClient } from "./lib/firebaseClient";
import "./index.css";

/** Defer Firebase so it does not compete with first paint (PageSpeed / TBT). */
const bootFirebase = () => void initFirebaseClient();
if (typeof window !== "undefined") {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(bootFirebase, { timeout: 2500 });
  } else {
    globalThis.setTimeout(bootFirebase, 1);
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
