export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const apiKey = "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 "; //

  const { message } = req.body;
  console.log("💬 Gelen mesaj:", message);

  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${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}`,
    };

    console.log("📌 Gönderilen header:", headers); // ✅ Burada kontrol ediyoruz

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();
    console.log("🧠 OpenAI cevabı:", data);

    if (data.error) {
      return res.status(500).json({
        result: "Neurocore cevap alınamadı: " + data.error.message,
      });
    }

    return res.status(200).json({ result: data.choices[0].message.content });
  } catch (error) {
    console.error("❌ Sunucu hatası:", error);
    return res.status(500).json({ result: "Sunucu hatası: " + error.message });
  }
} 
