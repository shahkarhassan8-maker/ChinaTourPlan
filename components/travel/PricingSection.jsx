import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Star, Zap, MessageCircle, Bell, Plane, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const PRICING_PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: '',
    description: 'Perfect for trying out TourToChina',
    features: [
      'Basic itinerary generation',
      '3 itineraries per month',
      'General travel tips',
      'Email support',
    ],
    cta: 'Get Started',
    popular: false,
    icon: Sparkles,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    description: 'Everything you need for an amazing trip',
    features: [
      'Unlimited itineraries',
      'Detailed Chinese addresses',
      'Essential travel phrases',
      'Offline PDF downloads',
      '24/7 live WeChat/WhatsApp support',
      'Admin-suggested itineraries on WeChat',
      'Free Exhibition Alerts',
      'Discuss itinerary with admin before trip',
      'Flight ticket booking assistance',
      'Priority response times',
    ],
    cta: 'Start Pro Trial',
    popular: true,
    icon: Star,
  },
  {
    name: 'Lifetime',
    price: '$99',
    period: 'one-time',
    description: 'Best value for frequent travelers',
    features: [
      'Everything in Pro',
      'Lifetime access - pay once',
      'VIP support channel',
      'Early access to new features',
      'Exclusive travel deals',
      'Personalized trip consulting',
      'Priority admin assistance',
    ],
    cta: 'Get Lifetime Access',
    popular: false,
    icon: Zap,
  },
];

export default function PricingSection() {
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
            Start for free and upgrade when you need more features
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
              className={`relative bg-white rounded-2xl p-6 border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular 
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

              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                plan.popular ? 'bg-[#E60012]/10 text-[#E60012]' : 'bg-slate-100 text-slate-600'
              }`}>
                <plan.icon className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                {plan.period && (
                  <span className="text-slate-500">{plan.period}</span>
                )}
              </div>
              <p className="text-slate-600 text-sm mb-6">{plan.description}</p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check className={`w-4 h-4 flex-shrink-0 ${plan.popular ? 'text-[#E60012]' : 'text-green-500'}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="/signup">
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-[#E60012] hover:bg-[#cc0010] text-white' 
                      : plan.name === 'Lifetime'
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
            All plans include a 30-day money-back guarantee. Prices may vary slightly based on promotions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}