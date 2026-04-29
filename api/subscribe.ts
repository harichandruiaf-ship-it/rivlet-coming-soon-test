import type { VercelRequest, VercelResponse } from "@vercel/node";
import { executePostSubscribe } from "../server/subscribeLogic.js";

function parseBody(req: VercelRequest): unknown | "invalid-json" {
  const b = req.body;
  if (b == null || b === "") return {};
  if (typeof b === "string") {
    try {
      return JSON.parse(b) as unknown;
    } catch {
      return "invalid-json";
    }
  }
  return b;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = parseBody(req);
    if (body === "invalid-json") {
      return res.status(400).json({ error: "Invalid JSON" });
    }
    const result = await executePostSubscribe(body);

    if (result.status === 204) {
      return res.status(204).end();
    }
    return res.status(result.status).json(result.body);
  } catch (e) {
    console.error("api/subscribe handler error", e);
    const message = e instanceof Error ? e.message : "Internal error";
    return res.status(500).json({ error: message });
  }
}
