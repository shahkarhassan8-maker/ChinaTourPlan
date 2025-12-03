import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not configured. Some features may not work.');
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function signUp(email, password, name) {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name }
    }
  });
  
  if (error) throw error;
  
  if (data.user) {
    await supabase.from('profiles').upsert({
      id: data.user.id,
      email: data.user.email,
      name,
      plan: 'free',
      created_at: new Date().toISOString()
    });
  }
  
  return data;
}

export async function signIn(email, password) {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) throw error;
  
  const { data: profile } = await supabase.from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();
  
  return { ...data, profile };
}

export async function signOut() {
  if (!supabase) return;
  
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function resetPassword(email) {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }
  
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  
  if (error) throw error;
  return data;
}

export async function updatePassword(newPassword) {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }
  
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  });
  
  if (error) throw error;
  return data;
}

export async function getCurrentUser() {
  if (!supabase) return null;
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  const { data: profile } = await supabase.from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  
  return { user, profile };
}

export async function saveItinerary(userId, itineraryData) {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }
  
  const { data, error } = await supabase.from('itineraries').insert({
    user_id: userId,
    title: itineraryData.title || `${itineraryData.cities?.join(' → ')} Trip`,
    cities: itineraryData.cities,
    duration: itineraryData.duration,
    pace: itineraryData.pace,
    food_preference: itineraryData.food,
    accommodation: itineraryData.accommodation,
    itinerary_data: itineraryData.itinerary,
    created_at: new Date().toISOString()
  }).select().single();
  
  if (error) throw error;
  return data;
}

export async function getUserItineraries(userId) {
  if (!supabase) return [];
  
  const { data, error } = await supabase.from('itineraries')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function deleteItinerary(itineraryId, userId) {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }
  
  const { error } = await supabase.from('itineraries')
    .delete()
    .eq('id', itineraryId)
    .eq('user_id', userId);
  
  if (error) throw error;
}

export async function updateUserPlan(userId, plan) {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }
  
  const { data, error } = await supabase.from('profiles')
    .update({ plan, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function submitReview(userId, reviewData) {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }
  
  const { data, error } = await supabase.from('reviews').insert({
    user_id: userId,
    itinerary_id: reviewData.itineraryId || null,
    rating: reviewData.rating,
    text: reviewData.text,
    trip_details: reviewData.trip,
    attraction_ratings: reviewData.attractionRatings || [],
    created_at: new Date().toISOString()
  }).select().single();
  
  if (error) throw error;
  return data;
}

export async function getItineraryReview(itineraryId) {
  if (!supabase) return null;
  
  const { data, error } = await supabase.from('reviews')
    .select('*')
    .eq('itinerary_id', itineraryId)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function getUserReviews(userId) {
  if (!supabase) return [];
  
  const { data, error } = await supabase.from('reviews')
    .select(`
      *,
      itineraries:itinerary_id (title, cities)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function getPublicReviews(limit = 10) {
  if (!supabase) return [];
  
  const { data, error } = await supabase.from('reviews')
    .select(`
      *,
      profiles:user_id (name)
    `)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data || [];
}
