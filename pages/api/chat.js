export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const apiKey = "sk-proj-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"; // 
  const { message } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    }),
  });

  const data = await response.json();
  const result = data.choices?.[0]?.message?.content || "Cevap alınamadı.";

  res.status(200).json({ result });
}
