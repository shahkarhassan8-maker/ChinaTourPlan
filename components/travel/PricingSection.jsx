import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Star, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const PRICING_PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Basic features to get started',
    features: [
      'Basic itinerary details',
      'Email support',
      '3 itineraries per month',
    ],
    cta: 'Get Started Free',
    popular: false,
    icon: Sparkles,
    planId: 'free',
  },
  {
    name: 'Pro',
    price: '$19',
    period: 'one-time',
    description: 'Full access to all features',
    features: [
      'Unlimited itineraries',
      'Premium details',
      'Local tips',
      'AI BOT',
      'Offline PDF downloads',
    ],
    cta: 'Sign Up for Pro',
    popular: true,
    icon: Star,
    planId: 'pro',
  },
  {
    name: 'Elite',
    price: '$49',
    period: 'one-time',
    description: 'Best value forever',
    features: [
      'Everything in Pro',
      'Chat with previous travelers',
      'Priority support',
      'Fully funded Exhibition Alerts',
      'Admin-suggested itineraries on WeChat',
      '24/7 live support',
      'Flight ticket booking assistance',
    ],
    cta: 'Sign Up for Elite',
    popular: false,
    icon: Zap,
    planId: 'elite',
  },
];

export default function PricingSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        // Fast check with local storage first
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            if (userData && userData.id) {
              setIsVisible(false);
              setIsChecking(false);
              return;
            }
          } catch (e) {
            // Invalid JSON, continue to Supabase check
          }
        }

        // Verify with Supabase session
        if (supabase) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            setIsVisible(false);
            setIsChecking(false);
            return;
          }
        }

        // No user found, show pricing
        setIsVisible(true);
      } catch (error) {
        console.error('Error checking user:', error);
        setIsVisible(true);
      } finally {
        setIsChecking(false);
      }
    };

    checkUser();
  }, []);

  // Don't render while checking to prevent flash
  if (isChecking) return null;
  if (!isVisible) return null;

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E60012]/10 text-[#E60012] rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Simple Pricing
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Sign up free and upgrade anytime from your dashboard
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {PRICING_PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl p-6 border-2 transition-all duration-300 hover:shadow-xl flex flex-col h-full ${plan.popular
                ? 'border-[#E60012] shadow-lg shadow-red-500/10'
                : 'border-slate-200 hover:border-slate-300'
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#E60012] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${plan.popular ? 'bg-[#E60012]/10 text-[#E60012]' : 'bg-slate-100 text-slate-600'
                }`}>
                <plan.icon className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                {plan.period && (
                  <span className="text-slate-500">/{plan.period}</span>
                )}
              </div>
              <p className="text-slate-600 text-sm mb-6">{plan.description}</p>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check className={`w-4 h-4 flex-shrink-0 ${plan.popular ? 'text-[#E60012]' : 'text-green-500'}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="/signup">
                <Button
                  className={`w-full ${plan.popular
                    ? 'bg-[#E60012] hover:bg-[#cc0010] text-white'
                    : plan.name === 'Elite'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-500 text-sm">
            All paid plans can be purchased from your dashboard after signing up. 30-day money-back guarantee.
          </p>
        </motion.div>
      </div>
    </section>
  );
}