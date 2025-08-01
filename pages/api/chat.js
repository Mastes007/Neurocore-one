export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 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`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ result: `Neurocore cevap alınamadı: ${data.error.message}` });
    }

    const result = data.choices?.[0]?.message?.content;
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ result: "Neurocore cevap alınamadı." });
  }
}
