export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { message } = req.body;
  console.log("🚀 Gelen mesaj:", message);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();
    console.log("🧠 OpenAI cevabı:", data);

    const result = data.choices?.[0]?.message?.content || "Cevap alınamadı.";
    res.status(200).json({ result });

  } catch (error) {
    console.error("❌ API hatası:", error);
    res.status(500).json({ error: "Sunucu hatası" });
  }
}
