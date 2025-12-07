import { canUserCreateItinerary, supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(200).json({ 
        canCreate: true, 
        remaining: 3,
        used: 0,
        limit: 3,
        isGuest: true
      });
    }

    const token = authHeader.replace('Bearer ', '');
    
    if (!supabase) {
      return res.status(200).json({ 
        canCreate: true, 
        remaining: 3,
        used: 0,
        limit: 3
      });
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return res.status(200).json({ 
        canCreate: true, 
        remaining: 3,
        used: 0,
        limit: 3,
        isGuest: true
      });
    }

    const result = await canUserCreateItinerary(user.id);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error checking itinerary limit:', error);
    return res.status(200).json({ 
      canCreate: true, 
      remaining: 3,
      used: 0,
      limit: 3
    });
  }
}
