export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const apiKey = "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"; // 
  const { message } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "appication/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    }),
  });

  const data = await response.json();
  return res.status(200).json({ result: data.choices[0].message.content });
}
