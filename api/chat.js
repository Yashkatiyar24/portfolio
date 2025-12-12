const windowMs = 5 * 60 * 1000; // 5 minutes
const maxRequests = 25;
const requestLog = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const entries = requestLog.get(ip) || [];
  const recent = entries.filter((t) => now - t < windowMs);
  if (recent.length >= maxRequests) return true;
  recent.push(now);
  requestLog.set(ip, recent);
  return false;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const hfToken = process.env.HF_TOKEN;
  const endpoint = process.env.MODEL_API_URL || process.env.HF_MODEL_ENDPOINT;

  if (!hfToken || !endpoint) {
    return res.status(500).json({
      error: "Missing HF_TOKEN or HF_MODEL_ENDPOINT/MODEL_API_URL in environment variables.",
    });
  }

  const ip =
    (req.headers["x-forwarded-for"] || "").toString().split(",").shift()?.trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  if (rateLimited(ip)) {
    return res.status(429).json({ error: "Rate limit exceeded. Please wait a bit and try again." });
  }

  try {
    const body = req.body || {};
    const directMessage = body.message;
    const history = body.history || [];
    const legacyMessages = body.messages || []; // backward compatible with older widget

    let userMessage = directMessage;
    let mergedHistory = history;

    if (!userMessage && Array.isArray(legacyMessages) && legacyMessages.length) {
      const last = legacyMessages[legacyMessages.length - 1];
      userMessage = last?.content || "";
      mergedHistory = legacyMessages.slice(0, -1);
    }

    if (!userMessage) {
      return res.status(400).json({ error: "Missing message in request body." });
    }

    const promptHistory = (mergedHistory || [])
      .filter((h) => h?.content)
      .map((h) => `${h.role === "user" ? "User" : "Assistant"}: ${h.content}`)
      .join("\n");

    const systemPrompt =
      "You are Yash Katiyar's portfolio assistant model. Answer concisely, confidently, and keep responses focused on Yash: his skills, projects, education, contact, and experience. " +
      "If asked unrelated things, politely redirect back to portfolio topics. " +
      "Mention that this model is a fine-tuned SLM (LoRA) hosted from Hugging Face endpoints.";

    const finalInput = `${systemPrompt}\n${promptHistory ? promptHistory + "\n" : ""}User: ${userMessage}\nAssistant:`;

    const hfPayload = {
      inputs: finalInput,
      parameters: {
        max_new_tokens: 320,
        temperature: 0.4,
        top_p: 0.95,
      },
    };

    const r = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${hfToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hfPayload),
    });

    if (!r.ok) {
      const errText = await r.text();
      return res.status(r.status).json({ error: "Model request failed", details: errText });
    }

    const data = await r.json().catch(() => null);
    let text =
      (Array.isArray(data) && data[0]?.generated_text) ||
      data?.generated_text ||
      data?.text ||
      data?.choices?.[0]?.text ||
      "Sorry, I couldn’t generate a response.";

    // Remove the echoed prompt if returned
    if (text && text.includes("Assistant:")) {
      text = text.split("Assistant:").pop().trim();
    }

    return res.status(200).json({ text });
  } catch (e) {
    return res.status(500).json({ error: "Server error", details: String(e) });
  }
}
