import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, Crown, Check, Star, Shield, 
  Sparkles, Clock, MapPin, MessageCircle,
  Eye, EyeOff, Mail, Lock, User
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { supabase, signUp, signIn, resetPassword } from '@/lib/supabase';

const MEMBERSHIP_BENEFITS = [
  { icon: MapPin, title: 'Unlimited Itineraries', description: 'Create and save unlimited trip plans' },
  { icon: Star, title: 'Premium Details', description: 'Chinese addresses, phrases & offline access' },
  { icon: MessageCircle, title: '24/7 Live Support', description: 'WhatsApp & WeChat travel assistance' },
  { icon: Shield, title: 'Exclusive Deals', description: 'Special hotel & tour discounts' },
];

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: '',
    description: 'Basic features to get started',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19,
    period: '/month',
    description: 'Full access to all features',
    popular: true,
    savings: 'Most Popular',
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: 99,
    period: 'one-time',
    description: 'Best value forever',
    popular: false,
    savings: 'Best Value',
  },
];

export default function SignupPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [supabaseAvailable, setSupabaseAvailable] = useState(false);

  useEffect(() => {
    setSupabaseAvailable(!!supabase);
  }, []);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    
    try {
      await resetPassword(formData.email);
      toast.success('Password reset link sent! Check your email.');
      setShowForgotPassword(false);
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error(error.message || 'Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    if (!formData.password || formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    if (!isLogin && !formData.name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    
    setLoading(true);
    
    try {
      if (supabaseAvailable) {
        if (isLogin) {
          const { user, profile } = await signIn(formData.email, formData.password);
          toast.success('Welcome back! Redirecting to your dashboard...');
          localStorage.setItem('user', JSON.stringify({
            id: user.id,
            name: profile?.name || formData.name || 'Traveler',
            email: user.email,
            plan: profile?.plan || 'free',
            memberSince: profile?.created_at || new Date().toISOString(),
          }));
        } else {
          const { user } = await signUp(formData.email, formData.password, formData.name);
          toast.success('Account created! Please check your email to verify your account.');
          localStorage.setItem('user', JSON.stringify({
            id: user.id,
            name: formData.name,
            email: user.email,
            plan: selectedPlan,
            memberSince: new Date().toISOString(),
          }));
        }
        window.location.href = '/dashboard';
      } else {
        setTimeout(() => {
          if (isLogin) {
            toast.success('Welcome back! Redirecting to your dashboard...');
          } else {
            toast.success('Account created! Welcome to China Travel Pro!');
          }
          localStorage.setItem('user', JSON.stringify({
            name: formData.name || 'Traveler',
            email: formData.email,
            plan: selectedPlan,
            memberSince: new Date().toISOString(),
          }));
          window.location.href = '/dashboard';
        }, 1500);
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error(error.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="text-slate-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-[#E60012]" />
            <span className="font-semibold text-slate-900">China Travel Pro</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Premium Membership
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {isLogin ? 'Welcome Back!' : 'Join China Travel Pro'}
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              {isLogin 
                ? 'Sign in to access your saved itineraries and premium features.'
                : 'Get unlimited access to detailed itineraries, live support, and exclusive travel perks.'
              }
            </p>

            <div className="space-y-4 mb-8">
              {MEMBERSHIP_BENEFITS.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200"
                >
                  <div className="w-10 h-10 bg-[#E60012]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-[#E60012]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{benefit.title}</h3>
                    <p className="text-sm text-slate-500">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-green-800">30-Day Money Back Guarantee</p>
                  <p className="text-sm text-green-600">Not satisfied? Get a full refund, no questions asked.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8"
          >
            {!isLogin && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Choose Your Plan</h3>
                <div className="grid grid-cols-3 gap-3">
                  {PLANS.map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                        selectedPlan === plan.id
                          ? 'border-[#E60012] bg-red-50/50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {plan.popular && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#E60012] text-white text-xs font-medium rounded-full">
                          Popular
                        </span>
                      )}
                      <p className="font-semibold text-slate-900">{plan.name}</p>
                      <p className="text-xl font-bold text-[#E60012]">${plan.price}</p>
                      <p className="text-xs text-slate-500">{plan.period}</p>
                      {plan.savings && (
                        <p className="text-xs text-green-600 font-medium mt-1">{plan.savings}</p>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {showForgotPassword ? (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Reset Password</h3>
                  <p className="text-slate-600 text-sm">Enter your email and we'll send you a reset link</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-11"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#E60012] hover:bg-[#cc0010] text-white py-6 text-lg font-semibold"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <>
                      <Mail className="w-5 h-5 mr-2" />
                      Send Reset Link
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="text-sm text-[#E60012] font-medium hover:underline"
                  >
                    Back to Sign In
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="pl-11"
                        required
                      />
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-11"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-11 pr-11"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#E60012] hover:bg-[#cc0010] text-white py-6 text-lg font-semibold"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </span>
                  ) : isLogin ? (
                    'Sign In'
                  ) : selectedPlan === 'free' ? (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Create Free Account
                    </>
                  ) : (
                    <>
                      <Crown className="w-5 h-5 mr-2" />
                      {selectedPlan === 'lifetime' ? 'Get Lifetime Access' : 'Start Pro Membership'} - ${PLANS.find(p => p.id === selectedPlan)?.price}
                    </>
                  )}
                </Button>
              </form>
            )}

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-slate-500">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={() => { setIsLogin(!isLogin); setShowForgotPassword(false); }}
                  className="ml-1 text-[#E60012] font-medium hover:underline"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
              {isLogin && !showForgotPassword && (
                <p className="text-sm">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-slate-500 hover:text-[#E60012] transition-colors"
                  >
                    Forgot your password?
                  </button>
                </p>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  Secure Payment
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Instant Access
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
