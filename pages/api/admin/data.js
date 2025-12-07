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

  console.log('Admin API - URL exists:', !!supabaseUrl);
  console.log('Admin API - Key exists:', !!supabaseServiceKey);

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Admin API - Missing config:', { url: !!supabaseUrl, key: !!supabaseServiceKey });
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Admin API - Token length:', token?.length);
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    console.log('Admin API - Auth result:', authError ? authError.message : user?.email);
    
    if (authError || !user) {
      console.error('Admin API - Auth error:', authError);
      return res.status(401).json({ error: 'Unauthorized - Invalid token', details: authError?.message });
    }

    if (!ADMIN_EMAILS.includes(user.email?.toLowerCase())) {
      return res.status(403).json({ error: 'Forbidden - Admin access required' });
    }

    console.log('Admin API - Fetching data from Supabase...');
    
    const [usersResult, itinerariesResult] = await Promise.all([
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('itineraries').select(`
        *,
        profiles:user_id (name, email, plan)
      `).order('created_at', { ascending: false })
    ]);

    console.log('Admin API - Users result:', usersResult.error ? usersResult.error.message : `${usersResult.data?.length} users`);
    console.log('Admin API - Itineraries result:', itinerariesResult.error ? itinerariesResult.error.message : `${itinerariesResult.data?.length} itineraries`);

    if (usersResult.error) {
      console.error('Admin API - Users error:', usersResult.error);
      throw usersResult.error;
    }
    if (itinerariesResult.error) {
      console.error('Admin API - Itineraries error:', itinerariesResult.error);
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
