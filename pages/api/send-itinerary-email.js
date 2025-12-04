import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check if API key is configured
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured');
    return res.status(500).json({
      error: 'Email service not configured',
      details: 'Please add RESEND_API_KEY to your .env file'
    });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { email, duration, cities, estimatedCost, itineraryUrl, itinerary } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  console.log('Sending email to:', email);
  console.log('API Key starts with:', process.env.RESEND_API_KEY?.substring(0, 10));

  try {
    // Generate itinerary HTML for email
    const itineraryHtml = itinerary ? itinerary.map((day, index) => `
      <div style="margin-bottom: 24px; padding: 16px; background: #f8fafc; border-radius: 12px;">
        <h3 style="color: #E60012; margin: 0 0 8px 0; font-size: 18px;">
          Day ${day.dayNumber || index + 1}: ${day.title || day.city}
        </h3>
        <p style="color: #64748b; margin: 0 0 12px 0; font-size: 14px;">
          📍 ${day.city} ${day.cityChinese ? `(${day.cityChinese})` : ''}
        </p>
        ${day.activities ? `
          <div style="margin-bottom: 12px;">
            <strong style="color: #1e293b;">Activities:</strong>
            <ul style="margin: 8px 0; padding-left: 20px; color: #475569;">
              ${day.activities.map(act => `<li>${typeof act === 'string' ? act : act.name || act}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
        ${day.food ? `
          <p style="color: #475569; margin: 4px 0;">
            🍜 <strong>Food:</strong> ${day.food.name || day.food}
          </p>
        ` : ''}
        ${day.hotel ? `
          <p style="color: #475569; margin: 4px 0;">
            🏨 <strong>Stay:</strong> ${day.hotel.name || day.hotel}
          </p>
        ` : ''}
        ${day.cost ? `
          <p style="color: #16a34a; margin: 8px 0 0 0; font-weight: 600;">
            💰 Est. Cost: $${day.cost.usd} USD
          </p>
        ` : ''}
      </div>
    `).join('') : '';

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f1f5f9;">
        <div style="max-width: 600px; margin: 0 auto; background: white;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #E60012 0%, #cc0010 100%); padding: 32px 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Your China Trip Itinerary</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px;">${duration} Days • ${cities}</p>
          </div>
          
          <!-- Summary -->
          <div style="padding: 24px; background: #fef3c7; border-bottom: 1px solid #fcd34d;">
            <div style="display: flex; justify-content: space-between; text-align: center;">
              <div style="flex: 1;">
                <div style="font-size: 24px; font-weight: bold; color: #1e293b;">${duration}</div>
                <div style="font-size: 12px; color: #64748b;">Days</div>
              </div>
              <div style="flex: 1;">
                <div style="font-size: 24px; font-weight: bold; color: #16a34a;">$${estimatedCost}</div>
                <div style="font-size: 12px; color: #64748b;">Est. Cost</div>
              </div>
            </div>
          </div>
          
          <!-- View Button -->
          <div style="padding: 24px; text-align: center; background: #f8fafc;">
            <a href="${itineraryUrl}" style="display: inline-block; background: #E60012; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
              View Full Itinerary Online
            </a>
            <p style="color: #64748b; font-size: 12px; margin: 12px 0 0 0;">Click above to see your complete day-by-day plan</p>
          </div>
          
          <!-- Itinerary Preview -->
          <div style="padding: 24px;">
            <h2 style="color: #1e293b; margin: 0 0 16px 0; font-size: 20px;">Your Daily Itinerary</h2>
            ${itineraryHtml}
          </div>
          
          <!-- Footer -->
          <div style="padding: 24px; background: #1e293b; text-align: center;">
            <p style="color: white; margin: 0 0 8px 0; font-weight: 600;">Need Help?</p>
            <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 14px;">
              WeChat: Shahkarhassan
            </p>
            <p style="color: rgba(255,255,255,0.5); margin: 16px 0 0 0; font-size: 12px;">
              © ChinaTourPlan - Your China Travel Expert
            </p>
          </div>
          
        </div>
      </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: 'ChinaTourPlan <onboarding@resend.dev>',
      to: [email],
      subject: `Your ${duration}-Day China Trip Itinerary 🇨🇳`,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);

      // Check for common errors
      if (error.message?.includes('verify')) {
        return res.status(400).json({
          error: 'Email verification required',
          details: 'On Resend free tier, you can only send to your verified email address. Please upgrade Resend or add a custom domain.'
        });
      }

      return res.status(500).json({
        error: 'Failed to send email',
        details: error.message || 'Unknown error from email service'
      });
    }

    console.log('Email sent successfully:', data);

    res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      details: {
        to: email,
        subject: `Your ${duration}-Day China Trip Itinerary`,
        itineraryUrl,
        id: data?.id
      }
    });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({
      error: 'Failed to send email',
      details: error.message || 'Server error'
    });
  }
}
