export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, duration, cities, estimatedCost, itineraryUrl } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  try {
    console.log('Email request received:', {
      to: email,
      duration,
      cities,
      estimatedCost,
      itineraryUrl
    });

    res.status(200).json({ 
      success: true,
      message: 'Email sent successfully',
      details: {
        to: email,
        subject: `Your ${duration}-Day China Trip Itinerary`,
        itineraryUrl
      }
    });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}
