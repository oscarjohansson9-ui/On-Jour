export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const userMsg = req.body.message;
  if (!userMsg) return res.status(400).json({ reply: 'Ingen text' });

  const { OpenAI } = await import('openai');
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Du är en hjälpsam assistent som svarar på svenska.' },
        { role: 'user', content: userMsg }
      ],
      max_tokens: 300,
      temperature: 0.7
    });
    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: 'Fel vid anrop till OpenAI' });
  }
}
