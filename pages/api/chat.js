export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const apiKey = "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"; //

  const { message } = req.body;
  console.log("Gelen mesaj:", message); // 💡 Kullanıcıdan geleni kontrol

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
    console.log("OpenAI cevabı:", data); // 💡 AI ne cevap verdi?

    if (data.error) {
      console.error("API hatası:", data.error); // 💥 API hatası varsa gör
      return res.status(500).json({ result: "Neurocore cevap alınamadı: " + data.error.message });
    }

    return res.status(200).json({ result: data.choices[0].message.content });

  } catch (error) {
    console.error("Sunucu hatası:", error); // 💣 Fetch hatası varsa gör
    return res.status(500).json({ result: "Neurocore sistem hatası: " + error.message });
  }
}
