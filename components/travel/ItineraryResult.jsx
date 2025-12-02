import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, MapPin, Wallet, ArrowLeft, Share2, 
  Download, Sparkles, DollarSign, Lock, Crown,
  MessageCircle, Phone, FileText, CheckCircle,
  Star, Quote, Globe, Shield, Clock, Users,
  Bookmark, BookmarkCheck, Mail
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DetailedDayCard from './DetailedDayCard';
import PaywallModal from './PaywallModal';
import ShareModal from './ShareModal';
import EmailModal from './EmailModal';
import { CITY_DATA, getFoodsForPreference } from './cityData';
import { toast } from "sonner";

const CONTACT_INFO = {
  wechat: 'Shahkarhassan',
  whatsapp: 'Coming Soon',
};

const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    country: 'USA',
    text: 'This itinerary saved my trip! The Chinese addresses and phrases were a lifesaver.',
    rating: 5,
    trip: '14 days in Beijing & Shanghai',
  },
  {
    name: 'James L.',
    country: 'UK',
    text: 'Incredible detail and the live support helped us navigate tricky situations.',
    rating: 5,
    trip: '10 days across China',
  },
  {
    name: 'Maria G.',
    country: 'Germany',
    text: 'Best travel investment ever. Everything was planned perfectly.',
    rating: 5,
    trip: '7 days in Chengdu & Zhangjiajie',
  },
];

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
  const [showShareModal, setShowShareModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [purchasedPlan, setPurchasedPlan] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  
  const itinerary = generateDetailedItinerary(formData);
  
  const totalCostUSD = itinerary.reduce((sum, day) => sum + day.cost.usd, 0);
  const totalCostRMB = itinerary.reduce((sum, day) => sum + day.cost.rmb, 0);
  const cityNames = [...new Set(itinerary.map(d => d.city))];

  useEffect(() => {
    const savedItineraries = JSON.parse(localStorage.getItem('itineraries') || '[]');
    const isAlreadySaved = savedItineraries.some(
      i => i.duration === formData.duration && 
           JSON.stringify(i.cities) === JSON.stringify(formData.cities)
    );
    setIsSaved(isAlreadySaved);
  }, [formData]);

  const handleSaveItinerary = () => {
    const savedItineraries = JSON.parse(localStorage.getItem('itineraries') || '[]');
    
    if (isSaved) {
      toast.info('This itinerary is already saved!');
      return;
    }
    
    const newItinerary = {
      id: Date.now(),
      title: `${formData.duration} Days in China`,
      cities: cityNames,
      duration: formData.duration,
      createdAt: new Date().toISOString().split('T')[0],
      budget: formData.budget,
      pace: formData.pace,
      food: formData.food,
      totalCost: totalCostUSD,
    };
    
    savedItineraries.push(newItinerary);
    localStorage.setItem('itineraries', JSON.stringify(savedItineraries));
    setIsSaved(true);
    toast.success('Itinerary saved to your dashboard!');
  };

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
            <Button 
              variant="outline" 
              size="sm" 
              className={isSaved ? "text-green-600 border-green-600" : "text-slate-600"}
              onClick={handleSaveItinerary}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="w-4 h-4 mr-2" />
                  Saved
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-slate-600"
              onClick={() => setShowShareModal(true)}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-slate-600"
              onClick={() => setShowEmailModal(true)}
            >
              <Mail className="w-4 h-4 mr-2" />
              Email
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

        {/* Contact Support Banner - Always Visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl text-white"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Need Help Planning Your Trip?</h4>
                <p className="text-sm text-white/80">Get personalized travel advice from our China experts</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-lg">
                <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c4.8 0 8.691-3.288 8.691-7.343 0-4.053-3.891-7.34-8.691-7.34"/>
                </svg>
                <div>
                  <p className="text-xs text-green-400">WeChat</p>
                  <p className="font-semibold text-white">{CONTACT_INFO.wechat}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-lg">
                <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <div>
                  <p className="text-xs text-blue-400">WhatsApp</p>
                  <p className="font-semibold text-white">{CONTACT_INFO.whatsapp}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

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
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold">Premium Support Active</h4>
                  <p className="text-sm text-white/80">Your 24/7 travel assistance is now unlocked</p>
                </div>
              </div>
              <Badge className="bg-white/20 text-white">Active</Badge>
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

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">What Travelers Say</h3>
            <p className="text-slate-600">Join thousands of happy travelers who explored China with us</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-slate-200 mb-2" />
                <p className="text-slate-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="border-t border-slate-100 pt-4">
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.country} • {testimonial.trip}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-12 py-8 border-t border-slate-200"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-slate-900">5,000+</p>
              <p className="text-sm text-slate-500">Happy Travelers</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-slate-900">50+</p>
              <p className="text-sm text-slate-500">Countries Served</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-amber-600" />
              </div>
              <p className="text-2xl font-bold text-slate-900">4.9/5</p>
              <p className="text-sm text-slate-500">Customer Rating</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-slate-900">100%</p>
              <p className="text-sm text-slate-500">Satisfaction Guarantee</p>
            </div>
          </div>
        </motion.div>

        {/* Footer Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-8 text-center text-sm text-slate-500 pb-8"
        >
          <p className="mb-2">Questions? Reach out anytime</p>
          <div className="flex items-center justify-center gap-6">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c4.8 0 8.691-3.288 8.691-7.343 0-4.053-3.891-7.34-8.691-7.34"/>
              </svg>
              WeChat: <strong>{CONTACT_INFO.wechat}</strong>
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp: <strong>{CONTACT_INFO.whatsapp}</strong>
            </span>
          </div>
        </motion.div>
      </div>

      {/* Paywall Modal */}
      <PaywallModal 
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        onPurchase={handlePurchase}
        tripDuration={formData.duration}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        itinerary={itinerary}
        formData={formData}
      />

      {/* Email Modal */}
      <EmailModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        itinerary={itinerary}
        formData={formData}
      />
    </div>
  );
}