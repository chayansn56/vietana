import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({
      success: false,
      error: 'Configuration Error: Missing Supabase credentials.'
    });
  }

  // Server-side Authorization Check
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\s+/, '').trim();
  const expectedSecret = process.env.ADMIN_SECRET || 'vietana_secret_123';

  if (token !== expectedSecret) {
    return res.status(401).json({ success: false, error: 'Unauthorized admin access.' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // GET: Retrieve all leads
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return res.status(200).json({ success: true, data });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  // POST/PATCH: Update lead status
  if (req.method === 'POST' || req.method === 'PATCH') {
    const { id, status, qualification_status, quote_status, booking_status, booking_value, revenue, gross_profit, loss_reason, internal_notes } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, error: 'Lead ID is required' });
    }

    try {
      const updateData = {};
      if (status !== undefined) updateData.status = status;
      if (qualification_status !== undefined) updateData.qualification_status = qualification_status;
      if (quote_status !== undefined) updateData.quote_status = quote_status;
      if (booking_status !== undefined) updateData.booking_status = booking_status;
      if (booking_value !== undefined) updateData.booking_value = booking_value;
      if (revenue !== undefined) updateData.revenue = revenue;
      if (gross_profit !== undefined) updateData.gross_profit = gross_profit;
      if (loss_reason !== undefined) updateData.loss_reason = loss_reason;
      if (internal_notes !== undefined) updateData.message = internal_notes; // overlay message

      const { data, error } = await supabase
        .from('leads')
        .update(updateData)
        .eq('id', id)
        .select();

      if (error) throw error;
      return res.status(200).json({ success: true, data });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
