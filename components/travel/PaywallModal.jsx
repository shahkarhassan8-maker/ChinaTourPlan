import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { 
  Check, Lock, MapPin, MessageCircle, Phone, 
  FileText, Clock, Shield, Star, Sparkles,
  Zap, Crown, Gift
} from 'lucide-react';

const VisuallyHidden = ({ children }) => (
  <span style={{
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: 0,
  }}>
    {children}
  </span>
);

const PLANS = [
  {
    id: 'basic',
    name: 'Detailed Itinerary',
    price: 5,
    originalPrice: 15,
    popular: false,
    color: 'blue',
    icon: FileText,
    features: [
      'Full detailed day-by-day itinerary',
      'All location addresses in Chinese',
      'Copy-paste addresses for taxi/DiDi',
      'Google Maps integration',
      '50+ essential Chinese phrases',
      'Restaurant recommendations with menus',
      'Hotel booking details',
      'Offline PDF download',
    ],
    notIncluded: [
      'Live WeChat/WhatsApp support',
      '24/7 emergency assistance',
      'Real-time translation help',
    ]
  },
  {
    id: 'premium',
    name: 'Premium + Live Support',
    price: 25,
    originalPrice: 50,
    popular: true,
    color: 'red',
    icon: Crown,
    features: [
      'Everything in Detailed Itinerary',
      '24/7 WeChat/WhatsApp support',
      'Live human translation assistance',
      'Emergency help hotline',
      'Restaurant reservation help',
      'Taxi/DiDi ordering assistance',
      'Real-time problem solving',
      'Local insider tips on demand',
      'Flight/train rebooking help',
      'Valid for entire trip duration',
    ],
    notIncluded: []
  },
];

const FeatureItem = ({ text, included = true }) => (
  <div className="flex items-start gap-2">
    {included ? (
      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
    ) : (
      <Lock className="w-4 h-4 text-slate-300 mt-0.5 flex-shrink-0" />
    )}
    <span className={included ? 'text-slate-700 text-sm' : 'text-slate-400 text-sm line-through'}>
      {text}
    </span>
  </div>
);

export default function PaywallModal({ isOpen, onClose, onPurchase, tripDuration }) {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    onPurchase(selectedPlan);
    setIsProcessing(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 overflow-hidden bg-slate-50 max-h-[90vh] overflow-y-auto" aria-describedby="paywall-description">
        <VisuallyHidden>
          <DialogTitle>Unlock Your Complete China Travel Guide</DialogTitle>
          <DialogDescription id="paywall-description">
            Choose a plan to get your detailed itinerary with Chinese addresses, phrases, and optional live support.
          </DialogDescription>
        </VisuallyHidden>
        {/* Header */}
        <div className="bg-gradient-to-br from-[#E60012] to-red-700 p-6 text-white text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm mb-4">
            <Gift className="w-4 h-4" />
            Limited Time: 60% Off
          </div>
          <h2 className="text-2xl font-bold mb-2">Unlock Your Complete China Travel Guide</h2>
          <p className="text-white/80">Everything you need for a stress-free trip</p>
        </div>

        {/* Plans */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-4">
            {PLANS.map((plan) => (
              <motion.button
                key={plan.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative p-5 rounded-2xl border-2 text-left transition-all ${
                  selectedPlan === plan.id
                    ? plan.id === 'premium' 
                      ? 'border-[#E60012] bg-red-50'
                      : 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#FFD700] text-amber-900 text-xs font-bold rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    BEST VALUE
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    plan.id === 'premium' ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    <plan.icon className={`w-5 h-5 ${
                      plan.id === 'premium' ? 'text-[#E60012]' : 'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{plan.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-slate-900">${plan.price}</span>
                      <span className="text-sm text-slate-400 line-through">${plan.originalPrice}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <FeatureItem key={idx} text={feature} included={true} />
                  ))}
                  {plan.notIncluded.map((feature, idx) => (
                    <FeatureItem key={idx} text={feature} included={false} />
                  ))}
                </div>

                {/* Selection indicator */}
                {selectedPlan === plan.id && (
                  <div className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center ${
                    plan.id === 'premium' ? 'bg-[#E60012]' : 'bg-blue-500'
                  }`}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </motion.button>
            ))}
          </div>

          {/* What You Get Preview */}
          <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
            <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Included in Your {tripDuration}-Day Itinerary:
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div className="p-2">
                <div className="text-2xl font-bold text-amber-700">{tripDuration * 3}+</div>
                <div className="text-xs text-amber-600">Activities</div>
              </div>
              <div className="p-2">
                <div className="text-2xl font-bold text-amber-700">100+</div>
                <div className="text-xs text-amber-600">Chinese Phrases</div>
              </div>
              <div className="p-2">
                <div className="text-2xl font-bold text-amber-700">{tripDuration}</div>
                <div className="text-xs text-amber-600">Restaurant Picks</div>
              </div>
              <div className="p-2">
                <div className="text-2xl font-bold text-amber-700">All</div>
                <div className="text-xs text-amber-600">Maps & Addresses</div>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>Instant Access</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4" />
              <span>Money Back Guarantee</span>
            </div>
          </div>

          {/* CTA */}
          <Button 
            onClick={handlePurchase}
            disabled={isProcessing}
            className="w-full mt-6 bg-[#E60012] hover:bg-[#cc0010] text-white py-6 text-lg font-semibold rounded-xl"
          >
            {isProcessing ? (
              <>Processing...</>
            ) : (
              <>
                Unlock Now - ${PLANS.find(p => p.id === selectedPlan)?.price}
                <Sparkles className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>

          <p className="text-center text-xs text-slate-500 mt-3">
            One-time payment • No subscription • Lifetime access to this itinerary
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}