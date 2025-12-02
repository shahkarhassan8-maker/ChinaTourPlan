import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, MapPin, Wallet, ArrowLeft, Share2, 
  Download, Sparkles, DollarSign, Lock, Crown,
  MessageCircle, Phone, FileText, CheckCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DetailedDayCard from './DetailedDayCard';
import PaywallModal from './PaywallModal';
import { CITY_DATA, getFoodsForPreference } from './cityData';
import { toast } from "sonner";

const generateDetailedItinerary = (formData) => {
  const budgetMultipliers = {
    budget: { cost: 50, hotelKey: 'budget' },
    comfort: { cost: 150, hotelKey: 'comfort' },
    luxury: { cost: 400, hotelKey: 'luxury' },
  };

  const multiplier = budgetMultipliers[formData.budget];
  
  const selectedCities = formData.cities.length > 0 
    ? formData.cities 
    : ['beijing', 'shanghai'];
  
  const totalDays = formData.duration;
  const numCities = selectedCities.length;
  const baseDaysPerCity = Math.floor(totalDays / numCities);
  const extraDays = totalDays % numCities;
  
  const itinerary = [];
  let dayCount = 1;
  let prevCityId = null;

  selectedCities.forEach((cityId, cityIndex) => {
    const cityData = CITY_DATA[cityId];
    if (!cityData) return;

    const daysInThisCity = baseDaysPerCity + (cityIndex < extraDays ? 1 : 0);
    
    for (let i = 0; i < daysInThisCity && dayCount <= totalDays; i++) {
      // Get activities for this day (with full details)
      const activityCount = formData.pace === 'intense' ? 3 : formData.pace === 'moderate' ? 2 : 1;
      const dayActivities = [];
      
      for (let j = 0; j < activityCount; j++) {
        const highlightIndex = (i * activityCount + j) % cityData.highlights.length;
        dayActivities.push(cityData.highlights[highlightIndex]);
      }

      // Get food recommendation based on dietary preference
      const foodOptions = getFoodsForPreference(cityId, formData.food);
      const foodIndex = i % Math.max(1, foodOptions.length);
      const food = foodOptions[foodIndex] || null;

      // Get hotel info
      const hotel = cityData.hotels[multiplier.hotelKey];

      // Get transport info
      let transport = null;
      if (i === 0 && prevCityId && cityData.transport) {
        const transportKey = Object.keys(cityData.transport)[0];
        if (transportKey) {
          transport = cityData.transport[transportKey];
        }
      }

      // Calculate daily cost
      const dailyCost = Math.round(multiplier.cost * (0.9 + Math.random() * 0.2));

      // Build day title
      let dayTitle;
      if (i === 0 && cityIndex > 0) {
        dayTitle = `Travel to ${cityData.name}`;
      } else if (i === 0) {
        dayTitle = `Arrive in ${cityData.name}`;
      } else {
        dayTitle = dayActivities[0]?.name || `Explore ${cityData.name}`;
      }

      itinerary.push({
        dayNumber: dayCount,
        city: cityData.name,
        cityChinese: cityData.nameChinese,
        title: dayTitle,
        image: cityData.image,
        activities: dayActivities,
        transport: transport,
        food: food,
        hotel: hotel,
        tips: cityData.usefulPhrases?.slice(0, 4).map(p => `${p.english}: ${p.chinese} (${p.pinyin})`),
        emergencyInfo: cityData.emergencyInfo,
        cost: {
          rmb: Math.round(dailyCost * 7.2),
          usd: dailyCost,
        },
      });
      
      dayCount++;
    }
    
    prevCityId = cityId;
  });

  return itinerary;
};

export default function ItineraryResult({ formData, onBack }) {
  const [showPaywall, setShowPaywall] = useState(false);
  const [purchasedPlan, setPurchasedPlan] = useState(null); // null, 'basic', or 'premium'
  
  const itinerary = generateDetailedItinerary(formData);
  
  const totalCostUSD = itinerary.reduce((sum, day) => sum + day.cost.usd, 0);
  const totalCostRMB = itinerary.reduce((sum, day) => sum + day.cost.rmb, 0);
  const cityNames = [...new Set(itinerary.map(d => d.city))];

  const handlePurchase = (planId) => {
    setPurchasedPlan(planId);
    setShowPaywall(false);
    toast.success(`🎉 ${planId === 'premium' ? 'Premium' : 'Basic'} plan unlocked! Enjoy your trip!`);
  };

  const isPremium = purchasedPlan === 'premium' || purchasedPlan === 'basic';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="text-slate-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Start Over
          </Button>
          <div className="flex items-center gap-2">
            {purchasedPlan && (
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                {purchasedPlan === 'premium' ? 'Premium' : 'Basic'} Unlocked
              </Badge>
            )}
            <Button variant="outline" size="sm" className="text-slate-600">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="text-slate-600">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Summary Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Your Detailed Itinerary is Ready!
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {formData.duration} Days in China
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            {cityNames.join(' → ')}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="bg-white rounded-2xl p-4 border border-slate-200">
              <Calendar className="w-5 h-5 text-[#E60012] mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900">{formData.duration}</div>
              <div className="text-sm text-slate-500">Days</div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-200">
              <MapPin className="w-5 h-5 text-[#E60012] mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900">{cityNames.length}</div>
              <div className="text-sm text-slate-500">Cities</div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-200">
              <DollarSign className="w-5 h-5 text-[#E60012] mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900">${totalCostUSD}</div>
              <div className="text-sm text-slate-500">Est. Total</div>
            </div>
          </div>
        </motion.div>

        {/* Budget & Pace Badges */}
        <div className="flex justify-center gap-3 mb-8">
          <Badge className={`px-4 py-2 text-sm ${
            formData.budget === 'luxury' 
              ? 'bg-gradient-to-r from-[#FFD700] to-amber-400 text-amber-900'
              : formData.budget === 'comfort'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-green-100 text-green-800'
          }`}>
            {formData.budget === 'luxury' && '✨ '}
            {formData.budget.charAt(0).toUpperCase() + formData.budget.slice(1)} Trip
          </Badge>
          <Badge className="px-4 py-2 text-sm bg-purple-100 text-purple-800">
            {formData.pace.charAt(0).toUpperCase() + formData.pace.slice(1)} Pace
          </Badge>
        </div>

        {/* Unlock CTA for non-premium users */}
        {!purchasedPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 bg-gradient-to-r from-[#E60012]/10 via-red-50 to-amber-50 rounded-2xl border border-[#E60012]/20"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#E60012] rounded-2xl flex items-center justify-center">
                  <Lock className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Unlock Your Complete Travel Guide</h3>
                  <p className="text-slate-600 text-sm">
                    Get detailed addresses, Chinese phrases, maps & live support
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  onClick={() => setShowPaywall(true)}
                  className="border-[#E60012] text-[#E60012]"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  From $5
                </Button>
                <Button 
                  onClick={() => setShowPaywall(true)}
                  className="bg-[#E60012] hover:bg-[#cc0010] text-white"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Get Premium
                </Button>
              </div>
            </div>
            
            {/* Feature preview */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="w-4 h-4 text-[#E60012]" />
                Exact Locations
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MessageCircle className="w-4 h-4 text-[#E60012]" />
                Chinese Phrases
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Phone className="w-4 h-4 text-[#E60012]" />
                Live Support
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Download className="w-4 h-4 text-[#E60012]" />
                Offline Access
              </div>
            </div>
          </motion.div>
        )}

        {/* Premium Support Banner */}
        {purchasedPlan === 'premium' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl text-white"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold">24/7 Live Support Active</h4>
                  <p className="text-sm text-white/80">WeChat: ChinaTravelHelp | WhatsApp: +86 138 xxxx xxxx</p>
                </div>
              </div>
              <Button variant="secondary" size="sm" className="bg-white text-green-700">
                Contact Now
              </Button>
            </div>
          </motion.div>
        )}

        {/* Timeline */}
        <div className="relative">
          {itinerary.map((day, index) => (
            <DetailedDayCard 
              key={day.dayNumber} 
              day={day} 
              isLast={index === itinerary.length - 1}
              isPremium={isPremium}
              onUpgrade={() => setShowPaywall(true)}
            />
          ))}
        </div>

        {/* Total Cost Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-lg font-medium text-slate-300 mb-2">Estimated Total Trip Cost</h3>
          <div className="text-4xl font-bold mb-1">¥{totalCostRMB.toLocaleString()}</div>
          <div className="text-xl text-slate-400">≈ ${totalCostUSD.toLocaleString()} USD</div>
          <p className="text-sm text-slate-400 mt-4 max-w-md mx-auto">
            Includes accommodation, meals, transport, and activities. Prices are estimates based on your {formData.budget} budget selection.
          </p>
        </motion.div>

        {/* Final CTA */}
        {!purchasedPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <Button 
              onClick={() => setShowPaywall(true)}
              size="lg"
              className="bg-[#E60012] hover:bg-[#cc0010] text-white px-10 py-6 text-lg rounded-xl"
            >
              <Crown className="w-5 h-5 mr-2" />
              Unlock Full Itinerary - From $5
            </Button>
            <p className="text-sm text-slate-500 mt-3">
              One-time payment • Instant access • Money back guarantee
            </p>
          </motion.div>
        )}
      </div>

      {/* Paywall Modal */}
      <PaywallModal 
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        onPurchase={handlePurchase}
        tripDuration={formData.duration}
      />
    </div>
  );
}