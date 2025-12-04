import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, duration, cities, estimatedCost, itineraryUrl, itinerary } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

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
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: #f1f5f9; padding: 40px 20px; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #E60012 0%, #cc0010 100%); padding: 32px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🇨🇳 Your China Trip</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px;">
              ${duration} Days • ${cities}
            </p>
          </div>
          
          <!-- Summary -->
          <div style="padding: 24px; border-bottom: 1px solid #e2e8f0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="text-align: center; padding: 16px;">
                  <div style="font-size: 32px; font-weight: bold; color: #1e293b;">${duration}</div>
                  <div style="color: #64748b; font-size: 14px;">Days</div>
                </td>
                <td style="text-align: center; padding: 16px;">
                  <div style="font-size: 32px; font-weight: bold; color: #1e293b;">${cities.split('→').length || cities.split(',').length}</div>
                  <div style="color: #64748b; font-size: 14px;">Cities</div>
                </td>
                <td style="text-align: center; padding: 16px;">
                  <div style="font-size: 32px; font-weight: bold; color: #16a34a;">$${estimatedCost}</div>
                  <div style="color: #64748b; font-size: 14px;">Est. Total</div>
                </td>
              </tr>
            </table>
          </div>
          
          <!-- Itinerary Days -->
          <div style="padding: 24px;">
            <h2 style="color: #1e293b; margin: 0 0 16px 0; font-size: 20px;">Your Day-by-Day Itinerary</h2>
            ${itineraryHtml}
          </div>
          
          <!-- CTA Button -->
          <div style="padding: 24px; text-align: center; background: #f8fafc;">
            <a href="${itineraryUrl}" style="display: inline-block; background: #E60012; color: white; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 600; font-size: 16px;">
              View Full Itinerary Online
            </a>
            <p style="color: #64748b; margin: 16px 0 0 0; font-size: 14px;">
              Access your complete itinerary with maps, addresses, and more
            </p>
          </div>
          
          <!-- Footer -->
          <div style="padding: 24px; background: #1e293b; color: white; text-align: center;">
            <p style="margin: 0 0 8px 0; font-size: 14px;">Need help planning your trip?</p>
            <p style="margin: 0; font-size: 14px;">
              WeChat: <strong>Shahkarhassan</strong> • Available 24/7
            </p>
            <p style="margin: 16px 0 0 0; font-size: 12px; color: #94a3b8;">
              © ${new Date().getFullYear()} ChinaTourPlan. Your adventure awaits! 🌏
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
      return res.status(500).json({ error: 'Failed to send email', details: error.message });
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
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
}
