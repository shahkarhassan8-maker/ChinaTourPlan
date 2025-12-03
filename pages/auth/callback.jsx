import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Loader2, Check, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import Link from 'next/link';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState('processing');
  const [message, setMessage] = useState('Processing your request...');

  useEffect(() => {
    handleAuthCallback();
  }, []);

  const handleAuthCallback = async () => {
    if (!supabase) {
      setStatus('error');
      setMessage('Authentication service not available');
      return;
    }

    try {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      const type = hashParams.get('type');

      if (type === 'recovery' && accessToken) {
        await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || '',
        });
        router.push('/reset-password#' + window.location.hash.substring(1));
        return;
      }

      if (type === 'signup' || type === 'email_confirmation' || type === 'magiclink') {
        if (accessToken) {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || '',
          });

          if (error) throw error;

          if (data.user) {
            const { data: profile } = await supabase.from('profiles')
              .select('*')
              .eq('id', data.user.id)
              .single();

            localStorage.setItem('user', JSON.stringify({
              id: data.user.id,
              name: profile?.name || data.user.user_metadata?.name || 'Traveler',
              email: data.user.email,
              plan: profile?.plan || 'free',
              memberSince: profile?.created_at || new Date().toISOString(),
            }));

            setStatus('success');
            setMessage('Email confirmed successfully! Redirecting to dashboard...');
            toast.success('Email confirmed! Welcome to ChinaTourPlan!');
            
            setTimeout(() => {
              router.push('/dashboard');
            }, 2000);
            return;
          }
        }
      }

      if (accessToken) {
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || '',
        });

        if (error) throw error;

        if (data.user) {
          const { data: profile } = await supabase.from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          localStorage.setItem('user', JSON.stringify({
            id: data.user.id,
            name: profile?.name || data.user.user_metadata?.name || 'Traveler',
            email: data.user.email,
            plan: profile?.plan || 'free',
            memberSince: profile?.created_at || new Date().toISOString(),
          }));

          setStatus('success');
          setMessage('Authentication successful! Redirecting...');
          
          setTimeout(() => {
            router.push('/dashboard');
          }, 2000);
          return;
        }
      }

      setStatus('error');
      setMessage('Invalid or expired link. Please try again.');
    } catch (error) {
      console.error('Auth callback error:', error);
      setStatus('error');
      setMessage(error.message || 'Authentication failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl border border-slate-200 text-center"
      >
        {status === 'processing' && (
          <>
            <Loader2 className="w-16 h-16 text-[#E60012] animate-spin mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Processing</h2>
            <p className="text-slate-600">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Success!</h2>
            <p className="text-slate-600">{message}</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Error</h2>
            <p className="text-slate-600 mb-6">{message}</p>
            <div className="flex gap-3 justify-center">
              <Link href="/signup">
                <Button className="bg-[#E60012] hover:bg-[#cc0010] text-white">
                  Try Again
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline">
                  Go Home
                </Button>
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
