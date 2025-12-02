import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Clock, Shield, Star, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const FEATURES = [
  { icon: MessageCircle, text: 'Real-time translation via WhatsApp/WeChat' },
  { icon: Phone, text: 'Voice call support for emergencies' },
  { icon: Clock, text: '24/7 availability during your trip' },
  { icon: Shield, text: 'Help with bookings, negotiations, and navigation' },
];

const PLANS = [
  { days: 1, price: 29, perDay: 29 },
  { days: 7, price: 149, perDay: 21, popular: true },
  { days: 14, price: 249, perDay: 18 },
];

export default function LiveAssistanceModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-br from-[#E60012] to-red-700 p-8 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold mb-2">Live Travel Assistance</DialogTitle>
          <p className="text-white/80">Your personal guide, just a message away</p>
        </div>

        <div className="p-6">
          {/* Features */}
          <div className="space-y-3 mb-8">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-slate-700 text-sm">{feature.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Pricing Plans */}
          <div className="space-y-3">
            {PLANS.map((plan, index) => (
              <button
                key={index}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left relative ${
                  plan.popular
                    ? 'border-[#E60012] bg-red-50/50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-4 px-3 py-1 bg-[#FFD700] text-amber-900 text-xs font-bold rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    MOST POPULAR
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">
                      {plan.days} {plan.days === 1 ? 'Day' : 'Days'} Coverage
                    </div>
                    <div className="text-sm text-slate-500">
                      ${plan.perDay}/day
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-900">${plan.price}</div>
                    {plan.days > 1 && (
                      <div className="text-xs text-green-600 font-medium">
                        Save ${(plan.days * 29) - plan.price}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* CTA */}
          <Button className="w-full mt-6 bg-[#E60012] hover:bg-[#cc0010] text-white py-6 text-lg font-semibold rounded-xl">
            Get Started
          </Button>

          <p className="text-center text-xs text-slate-500 mt-4">
            Cancel anytime • Instant refund if not satisfied
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}