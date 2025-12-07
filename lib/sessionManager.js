import { supabase, signOut } from './supabase';

const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds
const ACTIVITY_EVENTS = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click'];
const LAST_ACTIVITY_KEY = 'lastActivityTime';
const SESSION_CHECK_INTERVAL = 60 * 1000; // Check every minute

let inactivityTimer = null;
let activityCheckInterval = null;

export function updateLastActivity() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
  }
}

export function getLastActivity() {
  if (typeof window === 'undefined') return Date.now();
  const stored = localStorage.getItem(LAST_ACTIVITY_KEY);
  return stored ? parseInt(stored, 10) : Date.now();
}

export function isSessionExpired() {
  const lastActivity = getLastActivity();
  const timeSinceActivity = Date.now() - lastActivity;
  return timeSinceActivity > INACTIVITY_TIMEOUT;
}

export async function handleSessionTimeout() {
  try {
    localStorage.removeItem('user');
    localStorage.removeItem(LAST_ACTIVITY_KEY);
    
    if (supabase) {
      await signOut();
    }
    
    if (typeof window !== 'undefined' && !window.location.pathname.includes('/signup')) {
      window.location.href = '/signup?session=expired';
    }
  } catch (error) {
    console.error('Error during session timeout:', error);
    window.location.href = '/signup?session=expired';
  }
}

export function resetInactivityTimer() {
  updateLastActivity();
  
  if (inactivityTimer) {
    clearTimeout(inactivityTimer);
  }
  
  inactivityTimer = setTimeout(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      handleSessionTimeout();
    }
  }, INACTIVITY_TIMEOUT);
}

function handleUserActivity() {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    resetInactivityTimer();
  }
}

export function checkSessionOnLoad() {
  const storedUser = localStorage.getItem('user');
  if (!storedUser) return false;
  
  if (isSessionExpired()) {
    handleSessionTimeout();
    return false;
  }
  
  return true;
}

export function startSessionMonitoring() {
  if (typeof window === 'undefined') return;
  
  if (!checkSessionOnLoad()) {
    return;
  }
  
  resetInactivityTimer();
  
  ACTIVITY_EVENTS.forEach(event => {
    window.addEventListener(event, handleUserActivity, { passive: true });
  });
  
  activityCheckInterval = setInterval(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && isSessionExpired()) {
      handleSessionTimeout();
    }
  }, SESSION_CHECK_INTERVAL);
}

export function stopSessionMonitoring() {
  if (typeof window === 'undefined') return;
  
  if (inactivityTimer) {
    clearTimeout(inactivityTimer);
    inactivityTimer = null;
  }
  
  if (activityCheckInterval) {
    clearInterval(activityCheckInterval);
    activityCheckInterval = null;
  }
  
  ACTIVITY_EVENTS.forEach(event => {
    window.removeEventListener(event, handleUserActivity);
  });
}

export function onUserLogin() {
  updateLastActivity();
  startSessionMonitoring();
}

export function onUserLogout() {
  stopSessionMonitoring();
  localStorage.removeItem(LAST_ACTIVITY_KEY);
}
