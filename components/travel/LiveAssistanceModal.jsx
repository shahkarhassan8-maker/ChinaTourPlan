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

          {/* Direct Contact */}
          <div className="mt-6 pt-4 border-t border-slate-200">
            <p className="text-center text-sm text-slate-600 mb-3">Or contact us directly:</p>
            <a 
              href="https://wa.me/message/L2U465RFNFKME1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          <p className="text-center text-xs text-slate-500 mt-4">
            Cancel anytime • Instant refund if not satisfied
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}