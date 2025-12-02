import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, itineraryContext } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const systemPrompt = `You are a helpful China travel assistant. You help travelers with their trip to China based on their itinerary.

Current Itinerary Context:
${itineraryContext || 'No specific itinerary provided.'}

Guidelines:
- Be friendly, concise, and helpful
- Provide practical travel tips for China
- Share cultural insights when relevant
- Suggest alternatives if asked
- Help with Chinese phrases when needed
- Keep responses under 300 words unless more detail is requested`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = chatCompletion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

    res.status(200).json({ reply });
  } catch (error) {
    console.error('GROQ API Error:', error);
    res.status(500).json({ error: 'Failed to get AI response. Please try again.' });
  }
}
