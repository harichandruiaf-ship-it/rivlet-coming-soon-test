const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SubscribeResult = {
  already?: boolean;
  subscriberNumber?: number;
  emailsSkipped?: boolean;
};

export async function subscribeEmail(raw: string): Promise<SubscribeResult> {
  const email = raw.trim().toLowerCase();
  if (!EMAIL.test(email)) throw new Error("Invalid email");

  const res = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    let msg = "Something went wrong. Please try again in a moment.";
    try {
      const j = (await res.json()) as { error?: string; code?: string | number; hint?: string };
      if (j.error) {
        const parts = [j.error];
        if (j.code !== undefined && j.code !== "") parts.push(`(code ${j.code})`);
        if (j.hint) parts.push(j.hint);
        msg = parts.join(" ");
      }
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }

  try {
    const j = (await res.json()) as {
      already?: boolean;
      subscriberNumber?: number;
      emailsSkipped?: boolean;
    };
    return {
      already: Boolean(j.already),
      subscriberNumber: typeof j.subscriberNumber === "number" ? j.subscriberNumber : undefined,
      emailsSkipped: Boolean(j.emailsSkipped),
    };
  } catch {
    return {};
  }
}
