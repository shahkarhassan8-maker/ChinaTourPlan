import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { 
  Check, Lock, MapPin, MessageCircle, Phone, 
  FileText, Clock, Shield, Star, Sparkles,
  Zap, Crown, Gift, Plane, Bell, Users
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
    name: 'Free Preview',
    price: 0,
    originalPrice: null,
    popular: false,
    color: 'slate',
    icon: FileText,
    features: [
      'Basic itinerary overview',
      '3 itineraries per month',
      'General travel tips',
      'Email support',
    ],
    notIncluded: [
      'Detailed addresses & Chinese text',
      'Offline PDF downloads',
      '24/7 live support',
      'Admin itinerary suggestions',
      'Free exhibition alerts',
      'Flight ticket assistance',
    ],
    cta: 'Continue Free',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19,
    originalPrice: null,
    period: 'one-time',
    popular: true,
    color: 'red',
    icon: Star,
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
    notIncluded: [],
    cta: 'Get Pro Access',
    lemonSqueezyUrl: 'https://chinatourplan.lemonsqueezy.com/buy/d5d05f0b-3fce-4ef9-8c83-5f162d6e1304?embed=1',
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 49,
    originalPrice: null,
    period: 'one-time',
    popular: false,
    color: 'amber',
    icon: Crown,
    features: [
      'Everything in Pro',
      'Lifetime access - pay once',
      'VIP support channel',
      'Early access to new features',
      'Exclusive travel deals',
      'Personalized trip consulting',
      'Priority admin assistance',
    ],
    notIncluded: [],
    cta: 'Get Elite Access',
    lemonSqueezyUrl: 'https://chinatourplan.lemonsqueezy.com/buy/72ccffc3-b57d-4b9c-aa22-52fe3e597389?embed=1',
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
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    onPurchase(selectedPlan);
    setIsProcessing(false);
  };

  const selectedPlanData = PLANS.find(p => p.id === selectedPlan);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl p-0 gap-0 overflow-hidden bg-slate-50 max-h-[90vh] overflow-y-auto" aria-describedby="paywall-description">
        <VisuallyHidden>
          <DialogTitle>Unlock Your Complete China Travel Guide</DialogTitle>
          <DialogDescription id="paywall-description">
            Choose a plan to get your detailed itinerary with Chinese addresses, phrases, and optional live support.
          </DialogDescription>
        </VisuallyHidden>
        
        <div className="bg-gradient-to-br from-[#E60012] to-red-700 p-6 text-white text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm mb-4">
            <Gift className="w-4 h-4" />
            One-Time Payment - Lifetime Access
          </div>
          <h2 className="text-2xl font-bold mb-2">Unlock Your Complete China Travel Guide</h2>
          <p className="text-white/80">Everything you need for a stress-free trip</p>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-4">
            {PLANS.map((plan) => (
              <motion.button
                key={plan.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative p-4 rounded-2xl border-2 text-left transition-all ${
                  selectedPlan === plan.id
                    ? plan.id === 'pro' 
                      ? 'border-[#E60012] bg-red-50'
                      : plan.id === 'elite'
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-slate-400 bg-slate-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#E60012] text-white text-xs font-bold rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    MOST POPULAR
                  </div>
                )}

                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    plan.id === 'pro' ? 'bg-red-100' : plan.id === 'elite' ? 'bg-amber-100' : 'bg-slate-100'
                  }`}>
                    <plan.icon className={`w-4 h-4 ${
                      plan.id === 'pro' ? 'text-[#E60012]' : plan.id === 'elite' ? 'text-amber-600' : 'text-slate-600'
                    }`} />
                  </div>
                  <h3 className="font-bold text-slate-900">{plan.name}</h3>
                </div>

                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-2xl font-bold text-slate-900">
                    {plan.price === 0 ? 'Free' : `$${plan.price}`}
                  </span>
                  {plan.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">${plan.originalPrice}</span>
                  )}
                  {plan.period && (
                    <span className="text-sm text-slate-500">{plan.period}</span>
                  )}
                </div>

                <div className="space-y-1.5 text-xs">
                  {plan.features.slice(0, 5).map((feature, idx) => (
                    <FeatureItem key={idx} text={feature} included={true} />
                  ))}
                  {plan.features.length > 5 && (
                    <p className="text-xs text-slate-500 pl-6">+{plan.features.length - 5} more...</p>
                  )}
                  {plan.notIncluded.slice(0, 2).map((feature, idx) => (
                    <FeatureItem key={idx} text={feature} included={false} />
                  ))}
                </div>

                {selectedPlan === plan.id && (
                  <div className={`absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center ${
                    plan.id === 'pro' ? 'bg-[#E60012]' : plan.id === 'elite' ? 'bg-amber-500' : 'bg-slate-500'
                  }`}>
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </motion.button>
            ))}
          </div>

          {selectedPlan === 'pro' && (
            <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200">
              <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                <Star className="w-4 h-4" />
                Pro Features Include:
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2 text-red-800">
                  <MessageCircle className="w-4 h-4" />
                  Admin itinerary suggestions on WeChat
                </div>
                <div className="flex items-center gap-2 text-red-800">
                  <Bell className="w-4 h-4" />
                  Free Exhibition Alerts
                </div>
                <div className="flex items-center gap-2 text-red-800">
                  <Users className="w-4 h-4" />
                  Discuss with admin before trip
                </div>
                <div className="flex items-center gap-2 text-red-800">
                  <Plane className="w-4 h-4" />
                  Flight ticket booking help
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
            <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Your {tripDuration || 7}-Day Itinerary Includes:
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-sm">
              <div className="p-2">
                <div className="text-xl font-bold text-amber-700">{(tripDuration || 7) * 3}+</div>
                <div className="text-xs text-amber-600">Activities</div>
              </div>
              <div className="p-2">
                <div className="text-xl font-bold text-amber-700">100+</div>
                <div className="text-xs text-amber-600">Chinese Phrases</div>
              </div>
              <div className="p-2">
                <div className="text-xl font-bold text-amber-700">{tripDuration || 7}</div>
                <div className="text-xs text-amber-600">Restaurant Picks</div>
              </div>
              <div className="p-2">
                <div className="text-xl font-bold text-amber-700">All</div>
                <div className="text-xs text-amber-600">Maps & Addresses</div>
              </div>
            </div>
          </div>

          <p className="mt-3 text-xs text-center text-slate-500">
            * Prices may vary slightly based on exchange rates and seasonal promotions
          </p>

          <div className="mt-4 flex items-center justify-center gap-6 text-sm text-slate-500">
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

          {selectedPlanData?.lemonSqueezyUrl ? (
            <a 
              href={selectedPlanData.lemonSqueezyUrl} 
              className={`lemonsqueezy-button flex items-center justify-center w-full mt-4 py-4 text-lg font-semibold rounded-xl cursor-pointer ${
                selectedPlan === 'elite' 
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white'
                  : 'bg-[#E60012] hover:bg-[#cc0010] text-white'
              }`}
            >
              {selectedPlanData?.cta} - ${selectedPlanData?.price}
              <Sparkles className="w-5 h-5 ml-2" />
            </a>
          ) : (
            <Button 
              onClick={handlePurchase}
              disabled={isProcessing}
              className="w-full mt-4 py-6 text-lg font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-white"
            >
              {isProcessing ? (
                <>Processing...</>
              ) : (
                <>Continue with Free Preview</>
              )}
            </Button>
          )}

          <p className="text-center text-xs text-slate-500 mt-3">
            {selectedPlan === 'elite' 
              ? 'One-time payment • Lifetime access • No subscription'
              : selectedPlan === 'pro'
              ? 'One-time payment • 30-day money-back guarantee'
              : 'Limited features • Upgrade anytime'}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}