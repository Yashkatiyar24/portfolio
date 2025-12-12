export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages = [] } = req.body || {};
    const apiKey = process.env.OPENAI_API_KEY; // set this in Vercel env vars

    if (!apiKey) {
      return res.status(500).json({
        error: "Missing OPENAI_API_KEY in Vercel environment variables.",
      });
    }

    // System prompt – adjust content as desired
    const system = {
      role: "system",
      content:
        "You are Yash Katiyar's portfolio assistant. Answer briefly, confidently, and helpfully. " +
        "Only talk about Yash, his skills, projects, education, contact, and experience. " +
        "If asked unrelated things, politely redirect to portfolio topics.\n\n" +
        "Key projects: Salasar Stay Manager (React Native/Expo, production, deployed on Play Store), " +
        "GenBook/GENBOOK.AI (AI booking/book generation platform), FinSight.ai (AI personal finance insights), " +
        "NutriWise (budget AI meal planning), Movie Recommender (ML/Streamlit), Audio Transcriber.\n" +
        "Skills: React/Next/TS, React Native/Expo, Firebase/Supabase, Python, ML/NLP/CV, LLMs.\n" +
        "Education: B.Tech AI & Data Science, also IIT Madras BS Data Science.",
    };

    const payload = {
      model: "gpt-4o-mini", // adjust model as needed
      messages: [system, ...messages].slice(-20),
      temperature: 0.4,
    };

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const errText = await r.text();
      return res.status(500).json({ error: "LLM request failed", details: errText });
    }

    const data = await r.json();
    const text = data?.choices?.[0]?.message?.content ?? "Sorry, I couldn’t generate a response.";
    return res.status(200).json({ text });
  } catch (e) {
    return res.status(500).json({ error: "Server error", details: String(e) });
  }
}
