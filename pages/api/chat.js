export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Sen karanlık ve güçlü analiz yapabilen bir yapay zeka danışmansın." },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();

    if (data?.choices?.[0]?.message?.content) {
      res.status(200).json({ result: data.choices[0].message.content });
    } else {
      res.status(500).json({ error: "Yanıt alınamadı." });
    }
  } catch (error) {
    res.status(500).json({ error: "API isteği başarısız oldu." });
  }
}
