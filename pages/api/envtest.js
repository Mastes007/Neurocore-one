export default function handler(req, res) {
  res.status(200).json({
    envKey: process.env.OPENAI_API_KEY ? "✅ Yüklü" : "❌ Eksik",
  });
}
