// Access Control Utility Module for ChinaTourPlan
// Manages feature access based on user subscription plan

export const PLAN_TIERS = {
  free: 0,
  pro: 1,
  elite: 2,
  lifetime: 2, // Keep for backwards compatibility
  admin: 3,
};

export const FEATURES = {
  BASIC_ITINERARY: 'basic_itinerary',
  DETAILED_ITINERARY: 'detailed_itinerary',
  AI_BOT: 'ai_bot',
  OFFLINE_PDF: 'offline_pdf',
  LIVE_SUPPORT: 'live_support',
  UNLIMITED_ITINERARIES: 'unlimited_itineraries',
  CHINESE_PHRASES: 'chinese_phrases',
  PRIORITY_SUPPORT: 'priority_support',
};

// Admin emails that have full access to all features (for development/testing)
// Note: For production security, the 'admin' or 'lifetime' plan should be set in the Supabase profile
// This client-side check is a convenience for testing only
export const ADMIN_EMAILS = [
  'shahkarhassan8@gmail.com',
  'admin@chinatourplan.com',
];

// Feature access matrix
const FEATURE_ACCESS = {
  [FEATURES.BASIC_ITINERARY]: ['free', 'pro', 'elite', 'lifetime'],
  [FEATURES.DETAILED_ITINERARY]: ['pro', 'elite', 'lifetime'],
  [FEATURES.AI_BOT]: ['pro', 'elite', 'lifetime'],
  [FEATURES.OFFLINE_PDF]: ['pro', 'elite', 'lifetime'],
  [FEATURES.LIVE_SUPPORT]: ['pro', 'elite', 'lifetime'],
  [FEATURES.UNLIMITED_ITINERARIES]: ['pro', 'elite', 'lifetime'],
  [FEATURES.CHINESE_PHRASES]: ['pro', 'elite', 'lifetime'],
  [FEATURES.PRIORITY_SUPPORT]: ['elite', 'lifetime'],
};

// Free plan limits
export const FREE_LIMITS = {
  itinerariesPerMonth: 3,
  maxDaysPerItinerary: 7,
};

/**
 * Check if user is an admin based on their email or plan
 * @param {string} [email] - Optional email to check
 * @returns {boolean} - Whether user is an admin
 */
export const isAdmin = (email = null) => {
  if (typeof window === 'undefined') return false;
  
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.plan === 'admin') return true;
    const userEmail = email || user.email;
    return ADMIN_EMAILS.includes(userEmail?.toLowerCase());
  } catch {
    return false;
  }
};

/**
 * Get user's current plan from localStorage
 * @returns {string} - User's plan ('free', 'pro', 'lifetime', 'admin') or 'free' if not found
 */
export const getUserPlan = () => {
  if (typeof window === 'undefined') return 'free';
  
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (isAdmin(user.email)) return 'admin';
    return user.plan || 'free';
  } catch {
    return 'free';
  }
};

/**
 * Check if user has access to a specific feature
 * @param {string} feature - Feature key from FEATURES constant
 * @param {string} [userPlan] - Optional user plan, defaults to current user's plan
 * @returns {boolean} - Whether user has access to the feature
 */
export const hasAccess = (feature, userPlan = null) => {
  const plan = userPlan || getUserPlan();
  if (plan === 'admin' || isAdmin()) return true;
  const allowedPlans = FEATURE_ACCESS[feature] || [];
  return allowedPlans.includes(plan);
};

/**
 * Check if user is on a paid plan
 * @param {string} [userPlan] - Optional user plan
 * @returns {boolean} - Whether user is on a paid plan
 */
export const isPaidUser = (userPlan = null) => {
  const plan = userPlan || getUserPlan();
  return plan === 'pro' || plan === 'elite' || plan === 'lifetime' || plan === 'admin' || isAdmin();
};

/**
 * Check if user is on free plan
 * @param {string} [userPlan] - Optional user plan
 * @returns {boolean} - Whether user is on free plan
 */
export const isFreeUser = (userPlan = null) => {
  const plan = userPlan || getUserPlan();
  if (plan === 'admin' || isAdmin()) return false;
  return plan === 'free';
};

/**
 * Get remaining itineraries for free users
 * @returns {number} - Remaining itineraries this month
 */
export const getRemainingItineraries = () => {
  if (typeof window === 'undefined') return FREE_LIMITS.itinerariesPerMonth;
  
  const plan = getUserPlan();
  if (plan === 'admin' || isAdmin() || isPaidUser(plan)) return Infinity;
  
  try {
    const usage = JSON.parse(localStorage.getItem('itineraryUsage') || '{}');
    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
    const monthlyUsage = usage[currentMonth] || 0;
    return Math.max(0, FREE_LIMITS.itinerariesPerMonth - monthlyUsage);
  } catch {
    return FREE_LIMITS.itinerariesPerMonth;
  }
};

/**
 * Increment itinerary usage count for free users
 */
export const incrementItineraryUsage = () => {
  if (typeof window === 'undefined') return;
  if (isPaidUser()) return;
  
  try {
    const usage = JSON.parse(localStorage.getItem('itineraryUsage') || '{}');
    const currentMonth = new Date().toISOString().slice(0, 7);
    usage[currentMonth] = (usage[currentMonth] || 0) + 1;
    localStorage.setItem('itineraryUsage', JSON.stringify(usage));
  } catch {
    // Silently fail
  }
};

/**
 * Get upgrade message for a blocked feature
 * @param {string} feature - Feature key
 * @returns {string} - User-friendly upgrade message
 */
export const getUpgradeMessage = (feature) => {
  const messages = {
    [FEATURES.DETAILED_ITINERARY]: 'Upgrade to Pro to unlock detailed itineraries with Chinese addresses and insider tips.',
    [FEATURES.AI_BOT]: 'Upgrade to Pro to access our AI travel assistant for personalized recommendations.',
    [FEATURES.OFFLINE_PDF]: 'Upgrade to Pro to download your itineraries as offline PDFs.',
    [FEATURES.LIVE_SUPPORT]: 'Upgrade to Pro for 24/7 live WeChat & WhatsApp support.',
    [FEATURES.UNLIMITED_ITINERARIES]: 'Upgrade to Pro for unlimited itinerary generation.',
    [FEATURES.CHINESE_PHRASES]: 'Upgrade to Pro to access essential Chinese phrases for your trip.',
    [FEATURES.PRIORITY_SUPPORT]: 'Upgrade to Elite for priority VIP support.',
  };
  return messages[feature] || 'Upgrade your plan to access this feature.';
};

/**
 * Get plan display name
 * @param {string} plan - Plan key
 * @returns {string} - Display name
 */
export const getPlanDisplayName = (plan) => {
  const names = {
    free: 'Free',
    pro: 'Pro',
    elite: 'Elite',
    lifetime: 'Elite', // Map legacy lifetime to Elite
    admin: 'Admin',
  };
  return names[plan] || 'Free';
};

/**
 * Get plan benefits
 * @param {string} plan - Plan key
 * @returns {string[]} - Array of benefit descriptions
 */
export const getPlanBenefits = (plan) => {
  const benefits = {
    free: [
      'Basic itinerary generation',
      '3 itineraries per month',
      'General travel tips',
      'Email support',
    ],
    pro: [
      'Unlimited itineraries',
      'Detailed Chinese addresses',
      'Essential travel phrases',
      'Offline PDF downloads',
      '24/7 live WeChat/WhatsApp support',
      'AI travel assistant',
    ],
    elite: [
      'Everything in Pro',
      'Lifetime access - pay once',
      'VIP priority support',
      'Early access to new features',
      'Exclusive travel deals',
    ],
    lifetime: [
      'Everything in Pro',
      'Lifetime access - pay once',
      'VIP priority support',
      'Early access to new features',
      'Exclusive travel deals',
    ],
  };
  return benefits[plan] || benefits.free;
};
