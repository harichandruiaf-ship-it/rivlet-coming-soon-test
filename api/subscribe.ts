import type { VercelRequest, VercelResponse } from "@vercel/node";
import { executePostSubscribe } from "../server/subscribeLogic";

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

  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  const result = await executePostSubscribe(body);

  if (result.status === 204) {
    return res.status(204).end();
  }
  return res.status(result.status).json(result.body);
}
