import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  // 1. Retrieve & Validate Environment Variables
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;

  const missingVars = [];
  if (!supabaseUrl) missingVars.push('SUPABASE_URL');
  if (!supabaseKey) missingVars.push('SUPABASE_SERVICE_ROLE_KEY');
  if (!resendApiKey) missingVars.push('RESEND_API_KEY');

  if (missingVars.length > 0) {
    console.error(`Missing Vercel environment variables: ${missingVars.join(', ')}`);
    return res.status(500).json({
      success: false,
      error: `Configuration Error: Missing environment variables: ${missingVars.join(', ')}`
    });
  }

  const { name, email, phoneCode, phone, travelDate, travelers, service, message, source, attribution } = req.body;

  // 2. Input Validation
  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, error: 'Full name is required' });
  }
  if (!phone || !phone.trim()) {
    return res.status(400).json({ success: false, error: 'Phone number is required' });
  }
  const cleanPhone = phone.replace(/[\s-]/g, '');
  if (!/^\d{7,12}$/.test(cleanPhone)) {
    return res.status(400).json({ success: false, error: 'Invalid phone number format (7-12 digits required)' });
  }
  if (!travelDate) {
    return res.status(400).json({ success: false, error: 'Travel date is required' });
  }
  if (email && email.trim() && !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email address format' });
  }

  const finalPhone = `${phoneCode || ''} ${phone}`.trim();
  const finalSource = source || 'Google Ads';

  let finalMessage = message ? message.trim() : '';
  if (attribution) {
    const attrSummary = `\n\n--- Attribution Data ---\n` +
      `Landing Page: ${attribution.landing_page || 'N/A'}\n` +
      `Referrer: ${attribution.document_referrer || 'N/A'}\n` +
      `UTM Source: ${attribution.utm_source || 'N/A'}\n` +
      `UTM Medium: ${attribution.utm_medium || 'N/A'}\n` +
      `UTM Campaign: ${attribution.utm_campaign || 'N/A'}\n` +
      `GCLID: ${attribution.gclid || 'N/A'}\n` +
      `First Touch: ${attribution.first_touch ? JSON.stringify(attribution.first_touch) : 'N/A'}\n` +
      `Current Session: ${attribution.current_session ? JSON.stringify(attribution.current_session) : 'N/A'}`;
    finalMessage = finalMessage ? `${finalMessage}${attrSummary}` : attrSummary.trim();
  }

  try {
    // 3. Initialize Supabase and Save Lead
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    console.log('Saving lead to Supabase...');
    const insertPayload = {
      name: name.trim(),
      phone: finalPhone,
      email: email ? email.trim() : null,
      service: service || null,
      'travel dates': travelDate,
      travelers: travelers || null,
      message: finalMessage || null,
      source: finalSource,
      status: 'New',
      utm_source: (attribution && attribution.utm_source) ? attribution.utm_source : null,
      utm_medium: (attribution && attribution.utm_medium) ? attribution.utm_medium : null,
      utm_campaign: (attribution && attribution.utm_campaign) ? attribution.utm_campaign : null,
      utm_term: (attribution && attribution.utm_term) ? attribution.utm_term : null,
      utm_content: (attribution && attribution.utm_content) ? attribution.utm_content : null,
      gclid: (attribution && attribution.gclid) ? attribution.gclid : null,
      fbclid: (attribution && attribution.fbclid) ? attribution.fbclid : null,
      msclkid: (attribution && attribution.msclkid) ? attribution.msclkid : null,
      landing_page: (attribution && attribution.landing_page) ? attribution.landing_page : null,
      document_referrer: (attribution && attribution.document_referrer) ? attribution.document_referrer : null,
      first_touch_attribution: (attribution && attribution.first_touch) ? attribution.first_touch : null,
      current_session_attribution: (attribution && attribution.current_session) ? attribution.current_session : null
    };

    const { data, error: dbError } = await supabase
      .from('leads')
      .insert([insertPayload])
      .select();

    if (dbError || !data || !Array.isArray(data) || data.length === 0 || !data[0] || !data[0].id) {
      console.error('Supabase DB Insert Error or Missing Lead ID:', dbError || 'No lead ID returned');
      return res.status(500).json({
        success: false,
        error: dbError ? `Database insert failed: ${dbError.message}` : 'Database insert failed to return a valid saved lead ID'
      });
    }

    const savedLead = data[0];
    console.log('Lead saved successfully to database. ID:', savedLead.id);

    // 4. Initialize Resend
    const resend = new Resend(resendApiKey);

    // Branded HTML template for Customer Confirmation Email
    const customerSubject = `We received your travel inquiry - VIETANA`;
    const customerBody = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        <div style="background-color: #0d4f2e; padding: 32px; text-align: center; border-bottom: 3px solid #d4af37;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 2px;">VIETANA</h1>
          <p style="color: #d4af37; margin: 5px 0 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Feel Vietnam, Your Way</p>
        </div>
        <div style="padding: 32px; background-color: #ffffff;">
          <h2 style="color: #0d4f2e; margin-top: 0; font-size: 20px;">Xin chào, ${name.trim()}!</h2>
          <p>Thank you for choosing VIETANA. We have successfully received your travel inquiry and our specialist team in Ho Chi Minh City is already custom-crafting your itinerary route.</p>
          
          <div style="background-color: #f8fafc; border-left: 4px solid #d4af37; padding: 20px; border-radius: 8px; margin: 24px 0;">
            <h3 style="color: #0d4f2e; margin-top: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Your Inquiry Details</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; color: #64748b; width: 40%;"><strong>Travel Date:</strong></td>
                <td style="padding: 6px 0; color: #1e293b;">${travelDate}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Travelers:</strong></td>
                <td style="padding: 6px 0; color: #1e293b;">${travelers || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Service:</strong></td>
                <td style="padding: 6px 0; color: #1e293b;">${service || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>WhatsApp/Phone:</strong></td>
                <td style="padding: 6px 0; color: #1e293b;">${finalPhone}</td>
              </tr>
              ${message ? `
              <tr>
                <td style="padding: 6px 0; color: #64748b; vertical-align: top;"><strong>Message:</strong></td>
                <td style="padding: 6px 0; color: #1e293b;">${message.trim()}</td>
              </tr>` : ''}
            </table>
          </div>

          <h3 style="color: #0d4f2e; font-size: 16px; margin-top: 24px;">What Happens Next?</h3>
          <ol style="padding-left: 20px; margin: 0 0 24px 0;">
            <li style="margin-bottom: 8px;">A dedicated travel specialist will connect with you via WhatsApp or Email <strong style="color: #0d4f2e;">within 30 minutes</strong>.</li>
            <li style="margin-bottom: 8px;">We will share a custom day-by-day interactive itinerary route built around your style.</li>
            <li style="margin-bottom: 8px;">You can customize the plan as many times as you like - 100% free of charge and with no obligation.</li>
          </ol>

          <div style="border-top: 1px solid #e2e8f0; padding-top: 24px; font-size: 13px; color: #64748b;">
            <p style="margin: 0 0 5px 0;"><strong>Ground Support Contact Numbers:</strong></p>
            <p style="margin: 0 0 5px 0;">🇮🇳 India Support: Vikram Sonker (+91 9953294543)</p>
            <p style="margin: 0;">🇻🇳 Vietnam Support: Chayan Soni (+84 902434006)</p>
          </div>
        </div>
        <div style="background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
          <p style="margin: 0;">&copy; 2026 VIETANA. Locally managed from Ho Chi Minh City, Vietnam.</p>
        </div>
      </div>
    `;

    // Branded HTML template for Admin Notification Email
    const adminSubject = `New VIETANA Lead: ${name.trim()} (${service || 'Inquiry'})`;
    const adminBody = `
      <div style="font-family: sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;">
        <h2 style="color: #0d4f2e; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-top: 0;">New Lead Received</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-top: 15px;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #64748b; width: 35%;">Name</td>
            <td style="padding: 10px; color: #1e293b;">${name.trim()}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #64748b;">Phone</td>
            <td style="padding: 10px; color: #1e293b;">${finalPhone}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #64748b;">Email</td>
            <td style="padding: 10px; color: #1e293b;">${email ? email.trim() : 'N/A'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #64748b;">Service</td>
            <td style="padding: 10px; color: #1e293b;">${service || 'N/A'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #64748b;">Travel Dates</td>
            <td style="padding: 10px; color: #1e293b;">${travelDate}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #64748b;">Travelers</td>
            <td style="padding: 10px; color: #1e293b;">${travelers || 'N/A'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #64748b; vertical-align: top;">Message</td>
            <td style="padding: 10px; color: #1e293b;">${message ? message.trim() : 'N/A'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #64748b;">Source</td>
            <td style="padding: 10px; color: #1e293b;">${finalSource}</td>
          </tr>
          ${attribution ? `
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #64748b; vertical-align: top;">Attribution</td>
            <td style="padding: 10px; color: #1e293b; font-size: 12px; font-family: monospace;">
              <strong>Landing:</strong> ${attribution.landing_page || 'N/A'}<br/>
              <strong>Referrer:</strong> ${attribution.document_referrer || 'N/A'}<br/>
              <strong>UTM Source:</strong> ${attribution.utm_source || 'N/A'}<br/>
              <strong>UTM Medium:</strong> ${attribution.utm_medium || 'N/A'}<br/>
              <strong>UTM Campaign:</strong> ${attribution.utm_campaign || 'N/A'}<br/>
              <strong>GCLID:</strong> ${attribution.gclid || 'N/A'}
            </td>
          </tr>` : ''}
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #64748b;">Database ID</td>
            <td style="padding: 10px; font-weight: bold; color: #0d4f2e;">${savedLead.id}</td>
          </tr>
        </table>
      </div>
    `;

    // 5. Send Notification Email to Admins (booking@vietana.com and vietana@vietana.com)
    const adminRecipients = ['booking@vietana.com', 'vietana@vietana.com'];
    let fromSender = 'VIETANA Travel <booking@vietana.com>';

    try {
      console.log('Attempting to send admin notification email from booking@vietana.com...');
      await resend.emails.send({
        from: fromSender,
        reply_to: 'booking@vietana.com',
        to: adminRecipients,
        subject: adminSubject,
        html: adminBody,
      });
      console.log('Admin email sent successfully from booking@vietana.com');
    } catch (adminErr) {
      console.log('Sending admin email from booking@vietana.com failed, falling back to onboarding@resend.dev. Error:', adminErr.message);
      fromSender = 'VIETANA Travel <onboarding@resend.dev>';
      await resend.emails.send({
        from: fromSender,
        reply_to: 'booking@vietana.com',
        to: adminRecipients,
        subject: adminSubject,
        html: adminBody,
      });
      console.log('Admin email sent successfully from onboarding@resend.dev fallback');
    }

    // 6. Send Confirmation Auto-reply Email to Customer (if email is provided)
    if (email && email.trim()) {
      try {
        console.log(`Attempting to send customer confirmation email to ${email.trim()}...`);
        // Use the same verified sender or fallback verified sender determined above
        await resend.emails.send({
          from: fromSender,
          reply_to: 'booking@vietana.com',
          to: email.trim(),
          subject: customerSubject,
          html: customerBody,
        });
        console.log('Customer confirmation email sent successfully');
      } catch (custEmailErr) {
        console.error('Customer auto-reply email failed:', custEmailErr);
      }
    }

    // 7. Return success JSON response
    return res.status(200).json({
      success: true,
      leadId: savedLead.id,
      message: 'Inquiry received, saved, and notified successfully'
    });

  } catch (error) {
    console.error('Server Side Error in /api/inquiry:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error occurred'
    });
  }
}
