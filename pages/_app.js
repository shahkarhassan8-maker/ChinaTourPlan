import '../styles/globals.css'
import { Toaster } from 'sonner'
import { LanguageProvider } from '@/lib/LanguageContext'
import Script from 'next/script'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { 
  startSessionMonitoring, 
  stopSessionMonitoring, 
  onUserLogin, 
  onUserLogout,
  checkSessionOnLoad 
} from '@/lib/sessionManager'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    checkSessionOnLoad();
    
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      startSessionMonitoring();
    }

    if (!supabase) return;

    const syncUserToLocalStorage = async (session) => {
      if (session?.user) {
        try {
          const { data: profile } = await supabase.from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          const userData = {
            id: session.user.id,
            name: profile?.name || session.user.user_metadata?.name || 'Traveler',
            email: session.user.email,
            plan: profile?.plan || 'free',
            memberSince: profile?.created_at || new Date().toISOString(),
          };
          
          localStorage.setItem('user', JSON.stringify(userData));
          onUserLogin();
        } catch (error) {
          console.error('Error syncing user profile:', error);
        }
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        syncUserToLocalStorage(session);
      } else {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          if (userData.id) {
            localStorage.removeItem('user');
            onUserLogout();
          }
        }
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      
      if (event === 'SIGNED_IN' && session) {
        await syncUserToLocalStorage(session);
      } else if (event === 'SIGNED_OUT') {
        localStorage.removeItem('user');
        onUserLogout();
      } else if (event === 'TOKEN_REFRESHED' && session) {
        await syncUserToLocalStorage(session);
      }
    });

    return () => {
      subscription?.unsubscribe();
      stopSessionMonitoring();
    };
  }, []);

  return (
    <LanguageProvider>
      <Component {...pageProps} />
      <Toaster position="top-center" richColors />
      <Script 
        src="https://assets.lemonsqueezy.com/lemon.js" 
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && window.createLemonSqueezy) {
            window.createLemonSqueezy();
          }
        }}
      />
    </LanguageProvider>
  )
}

export default MyApp
