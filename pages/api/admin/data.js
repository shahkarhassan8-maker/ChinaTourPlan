import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const ADMIN_EMAILS = [
  'shahkarhassan8@gmail.com',
  'admin@chinatourplan.com',
];

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    const token = authHeader.split(' ')[1];
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }

    if (!ADMIN_EMAILS.includes(user.email?.toLowerCase())) {
      return res.status(403).json({ error: 'Forbidden - Admin access required' });
    }

    const [usersResult, itinerariesResult] = await Promise.all([
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('itineraries').select(`
        *,
        profiles:user_id (name, email, plan)
      `).order('created_at', { ascending: false })
    ]);

    if (usersResult.error) {
      throw usersResult.error;
    }
    if (itinerariesResult.error) {
      throw itinerariesResult.error;
    }

    const users = usersResult.data || [];
    const itineraries = itinerariesResult.data || [];

    const stats = { free: 0, pro: 0, elite: 0, lifetime: 0, total: 0 };
    users.forEach(user => {
      const plan = user.plan || 'free';
      if (stats[plan] !== undefined) stats[plan]++;
      stats.total++;
    });

    return res.status(200).json({
      users,
      itineraries,
      stats
    });

  } catch (error) {
    console.error('Admin API error:', error.message || error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
