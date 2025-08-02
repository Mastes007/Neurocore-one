export default function handler(req, res) {
  const keyExists = !!process.env.OPENAI_API_KEY;
  res.status(200).json({ keyExists });
}
