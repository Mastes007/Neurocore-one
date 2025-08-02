export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  // Key'i güvenli şekilde Environment Variables'dan çekiyoruz
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API key bulunamadı" });
  }

  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({
        result: "Neurocore cevap alınamadı: " + data.error.message,
      });
    }

    return res.status(200).json({ result: data.choices[0].message.content });
  } catch (error) {
    return res.status(500).json({ result: "Sunucu hatası: " + error.message });
  }
}
