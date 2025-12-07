import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft, Crown, MapPin, Calendar, Trash2,
  Plus, Star, Settings, LogOut, Edit, Eye,
  MessageCircle, Sparkles, Clock, User, AlertTriangle, X,
  Lock, Zap, Download, Bot, Check
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { CITY_DATA } from '@/components/travel/cityData';
import {
  hasAccess,
  isFreeUser,
  isPaidUser,
  FEATURES,
  getRemainingItineraries,
  getUpgradeMessage,
  getPlanDisplayName
} from '@/lib/accessControl';
import {
  supabase,
  signOut,
  getUserItineraries,
  deleteItinerary as deleteItineraryFromDb,
  submitReview as submitReviewToDb,
  updateUserPlan
} from '@/lib/supabase';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Basic features to get started',
    popular: false,
    features: ['Basic itinerary details', 'Email support', '3 itineraries per month'],
    lemonSqueezyUrl: null,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19,
    period: 'one-time',
    description: 'Full access to all features',
    popular: true,
    features: ['Unlimited itineraries', 'Premium details', 'Local tips', 'AI BOT', 'Offline PDF downloads'],
    lemonSqueezyUrl: 'https://chinatourplan.lemonsqueezy.com/buy/d5d05f0b-3fce-4ef9-8c83-5f162d6e1304?embed=1',
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 49,
    period: 'one-time',
    description: 'Best value forever',
    popular: false,
    features: ['Everything in Pro', 'Chat with previous travelers', 'Priority support', 'Fully funded Exhibition Alerts', 'Admin-suggested itineraries on WeChat', '24/7 live support', 'Flight ticket booking assistance'],
    lemonSqueezyUrl: 'https://chinatourplan.lemonsqueezy.com/buy/72ccffc3-b57d-4b9c-aa22-52fe3e597389?embed=1',
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [itineraries, setItineraries] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewItinerary, setReviewItinerary] = useState(null);
  const [review, setReview] = useState({ rating: 5, text: '', attractionRatings: {} });
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeFeature, setUpgradeFeature] = useState(null);
  const [supabaseAvailable, setSupabaseAvailable] = useState(false);
  const [viewItinerary, setViewItinerary] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState('pro');

  useEffect(() => {
    setSupabaseAvailable(!!supabase);
    loadUserData();

    // Initialize LemonSqueezy
    if (typeof window !== 'undefined' && window.createLemonSqueezy) {
      window.createLemonSqueezy();
    }

    // Listen for payment success
    const handleMessageEvent = async (event) => {
      if (!event.origin.includes('lemonsqueezy.com')) return;

      if (event.data && event.data.event === 'Checkout.Success') {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);

          // Update plan in Supabase database first
          if (supabase && userData.id) {
            try {
              await updateUserPlan(userData.id, selectedPlan);
              console.log('✅ Plan updated in Supabase:', selectedPlan);
            } catch (error) {
              console.error('❌ Error updating plan in Supabase:', error);
              toast.error('Payment received but failed to update account. Please contact support.');
              return;
            }
          }

          // Then update localStorage
          userData.plan = selectedPlan;
          localStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
          setShowUpgradeModal(false);
          toast.success(`Upgraded to ${selectedPlan === 'elite' ? 'Elite' : 'Pro'}! Enjoy your premium features.`);

          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      }
    };

    window.addEventListener('message', handleMessageEvent);
    return () => window.removeEventListener('message', handleMessageEvent);
  }, [selectedPlan]);

  const loadUserData = async () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        
        if (!userData.id) {
          setIsLoading(false);
          return;
        }
        
        setUser(userData);

        if (supabase && userData.id) {
          try {
            const { data: profile } = await supabase.from('profiles')
              .select('*')
              .eq('id', userData.id)
              .single();
            
            if (profile && profile.plan !== userData.plan) {
              const updatedUser = { ...userData, plan: profile.plan };
              localStorage.setItem('user', JSON.stringify(updatedUser));
              setUser(updatedUser);
            }
            
            const dbItineraries = await getUserItineraries(userData.id);
            if (dbItineraries && dbItineraries.length > 0) {
              const formattedItineraries = dbItineraries.map(it => ({
                id: it.id,
                title: it.title,
                cities: it.cities,
                duration: it.duration,
                createdAt: it.created_at,
                pace: it.pace,
                itineraryData: it.itinerary_data,
                selectedPlaces: it.selected_places
              }));
              setItineraries(formattedItineraries);
              setIsLoading(false);
              return;
            }
          } catch (error) {
            console.log('Error loading from Supabase:', error);
          }
        }

        const storedItineraries = localStorage.getItem('itineraries');
        if (storedItineraries) {
          setItineraries(JSON.parse(storedItineraries));
        }
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    try {
      if (supabase) {
        await signOut();
      }
    } catch (error) {
      console.log('Signout error:', error);
    }
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    window.location.href = '/';
  };

  const handleDeleteItinerary = async (id) => {
    try {
      if (supabase && user?.id) {
        await deleteItineraryFromDb(id, user.id);
      }
      const updated = itineraries.filter(i => i.id !== id);
      setItineraries(updated);
      localStorage.setItem('itineraries', JSON.stringify(updated));
      setDeleteConfirm(null);
      toast.success('Itinerary deleted');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete itinerary');
    }
  };

  const handleViewItinerary = (itinerary) => {
    // Navigate to the permanent itinerary URL
    router.push(`/itinerary/${itinerary.id}`);
  };

  const handleFeatureAccess = (feature) => {
    if (!hasAccess(feature, user?.plan)) {
      setUpgradeFeature(feature);
      setShowUpgradeModal(true);
      return false;
    }
    return true;
  };

  const handleDownloadPDF = (itinerary) => {
    if (!handleFeatureAccess(FEATURES.OFFLINE_PDF)) return;
    toast.success('Downloading PDF...');
  };

  const handleAIAssistant = () => {
    if (!handleFeatureAccess(FEATURES.AI_BOT)) return;
    toast.success('Opening AI Assistant...');
  };

  const getAttractionsFromItinerary = (itinerary) => {
    const attractions = [];

    if (itinerary?.selectedPlaces && typeof itinerary.selectedPlaces === 'object') {
      Object.entries(itinerary.selectedPlaces).forEach(([cityId, placeIndices]) => {
        const cityData = CITY_DATA[cityId];
        if (cityData && cityData.highlights && Array.isArray(placeIndices)) {
          placeIndices.forEach(index => {
            const place = cityData.highlights[index];
            if (place && !attractions.find(a => a.name === place.name)) {
              attractions.push({
                name: place.name,
                nameChinese: place.nameChinese || '',
                city: cityData.name || cityId
              });
            }
          });
        }
      });
    }

    if (attractions.length === 0) {
      let itineraryDays = [];

      if (itinerary?.itineraryData) {
        if (Array.isArray(itinerary.itineraryData)) {
          itineraryDays = itinerary.itineraryData;
        } else if (itinerary.itineraryData.itinerary && Array.isArray(itinerary.itineraryData.itinerary)) {
          itineraryDays = itinerary.itineraryData.itinerary;
        }
      }

      itineraryDays.forEach(day => {
        if (day.activities && Array.isArray(day.activities)) {
          day.activities.forEach(activity => {
            if (activity.name && !attractions.find(a => a.name === activity.name)) {
              attractions.push({
                name: activity.name,
                nameChinese: activity.nameChinese || '',
                city: day.city || ''
              });
            }
          });
        }
        if (day.schedule && Array.isArray(day.schedule)) {
          day.schedule.forEach(item => {
            if (item.activity && !attractions.find(a => a.name === item.activity)) {
              attractions.push({
                name: item.activity,
                nameChinese: item.activityChinese || '',
                city: day.city || ''
              });
            }
          });
        }
      });
    }

    return attractions;
  };

  const handleOpenReviewModal = (itinerary) => {
    setReviewItinerary(itinerary);
    const attractions = getAttractionsFromItinerary(itinerary);
    const initialRatings = {};
    attractions.forEach(a => {
      initialRatings[a.name] = 5;
    });
    setReview({ rating: 5, text: '', attractionRatings: initialRatings });
    setShowReviewModal(true);
  };

  const handleSubmitReview = async () => {
    if (review.text.trim().length < 10) {
      toast.error('Please write at least 10 characters');
      return;
    }

    try {
      const attractionRatingsArray = Object.entries(review.attractionRatings).map(([name, rating]) => ({
        name,
        rating
      }));

      if (supabase && user?.id) {
        await submitReviewToDb(user.id, {
          itineraryId: reviewItinerary?.id,
          rating: review.rating,
          text: review.text,
          trip: reviewItinerary?.title || 'China Trip',
          attractionRatings: attractionRatingsArray
        });
      }

      const existingReviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
      const newReview = {
        id: Date.now(),
        name: user?.name || 'Anonymous',
        country: 'Member',
        rating: review.rating,
        date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        trip: reviewItinerary?.title || 'China Trip',
        text: review.text,
        attractionRatings: attractionRatingsArray,
        verified: true,
      };
      existingReviews.push(newReview);
      localStorage.setItem('userReviews', JSON.stringify(existingReviews));

      toast.success('Thank you for your review!');
      setShowReviewModal(false);
      setReviewItinerary(null);
      setReview({ rating: 5, text: '', attractionRatings: {} });
    } catch (error) {
      console.error('Review error:', error);
      toast.error('Failed to submit review. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#E60012] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-slate-200">
          <Crown className="w-12 h-12 text-[#E60012] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Please Sign In</h2>
          <p className="text-slate-600 mb-6">Access your saved itineraries and member benefits</p>
          <div className="flex gap-3 justify-center">
            <Link href="/signup">
              <Button className="bg-[#E60012] hover:bg-[#cc0010] text-white">
                Sign In / Sign Up
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Head>
        <title>Dashboard | ChinaTourPlan</title>
        <meta name="description" content="Manage your China travel itineraries and account" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="text-slate-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Home
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#E60012] to-red-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {user.name?.charAt(0) || 'U'}
              </div>
              <span className="font-medium text-slate-900 hidden sm:inline">{user.name}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Welcome back, {user.name?.split(' ')[0] || 'Traveler'}!
          </h1>
          <p className="text-slate-600">Manage your itineraries and member benefits</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {isFreeUser(user?.plan) ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white"
            >
              <Zap className="w-8 h-8 mb-4" />
              <h3 className="text-lg font-semibold mb-1">Free Plan</h3>
              <p className="text-white/80 text-sm mb-3">{getRemainingItineraries()} itineraries left this month</p>
              <Button
                size="sm"
                className="bg-white text-amber-600 hover:bg-amber-50"
                onClick={() => setShowUpgradeModal(true)}
              >
                <Crown className="w-3 h-3 mr-1" />
                Upgrade to Pro
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-[#E60012] to-red-500 rounded-2xl p-6 text-white"
            >
              <Crown className="w-8 h-8 mb-4" />
              <h3 className="text-lg font-semibold mb-1">
                {getPlanDisplayName(user?.plan)} Member
              </h3>
              <p className="text-white/80 text-sm">
                {user?.plan === 'elite' ? 'All premium features + VIP benefits' : 'All premium features unlocked'}
              </p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 border border-slate-200"
          >
            <MapPin className="w-8 h-8 text-[#E60012] mb-4" />
            <h3 className="text-2xl font-bold text-slate-900">{itineraries.length}</h3>
            <p className="text-slate-600 text-sm">Saved Itineraries</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 border border-slate-200"
          >
            {isPaidUser(user?.plan) ? (
              <>
                <MessageCircle className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">24/7 Support</h3>
                <p className="text-slate-600 text-sm">WeChat: Shahkarhassan</p>
              </>
            ) : (
              <>
                <Lock className="w-8 h-8 text-slate-400 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">Live Support</h3>
                <p className="text-slate-600 text-sm">Upgrade for 24/7 access</p>
              </>
            )}
          </motion.div>
        </div>

        {/* Itineraries Section - Now Above Plans */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Your Itineraries</h2>
          <Link href="/">
            <Button className="bg-[#E60012] hover:bg-[#cc0010] text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Itinerary
            </Button>
          </Link>
        </div>

        {itineraries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-2xl border border-slate-200"
          >
            <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No itineraries yet</h3>
            <p className="text-slate-600 mb-6">Start planning your China adventure!</p>
            <Link href="/">
              <Button className="bg-[#E60012] hover:bg-[#cc0010] text-white">
                <Sparkles className="w-4 h-4 mr-2" />
                Create Your First Itinerary
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {itineraries.map((itinerary, index) => (
              <motion.div
                key={itinerary.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{itinerary.title}</h3>
                    <p className="text-sm text-slate-500">{itinerary.cities?.join(' → ')}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                      onClick={() => handleViewItinerary(itinerary)}
                      title="View Itinerary"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => setDeleteConfirm(itinerary)}
                      title="Delete Itinerary"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {itinerary.duration} days
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {itinerary.cities?.length} cities
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Created {new Date(itinerary.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                      onClick={() => handleOpenReviewModal(itinerary)}
                    >
                      <Star className="w-4 h-4 mr-1" />
                      Review
                    </Button>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full capitalize">
                      {itinerary.pace}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Membership Plans Section - Now Below Itineraries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Membership Plans</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan) => {
              const isCurrentPlan = user?.plan === plan.id;
              const currentPlanTier = PLANS.findIndex(p => p.id === user?.plan);
              const thisPlanTier = PLANS.findIndex(p => p.id === plan.id);
              const isLowerTier = thisPlanTier < currentPlanTier;

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`relative bg-white rounded-2xl p-6 border-2 transition-all flex flex-col h-full ${isCurrentPlan
                    ? 'border-green-500 bg-green-50/30 shadow-lg'
                    : isLowerTier
                      ? 'border-slate-200 bg-slate-50 opacity-50'
                      : plan.popular
                        ? 'border-[#E60012] shadow-lg shadow-red-500/10'
                        : 'border-slate-200 hover:border-slate-300 hover:shadow-lg'
                    }`}
                >
                  {isCurrentPlan && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Current Plan
                      </span>
                    </div>
                  )}
                  {plan.popular && !isCurrentPlan && !isLowerTier && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-[#E60012] text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isCurrentPlan
                    ? 'bg-green-100 text-green-600'
                    : isLowerTier
                      ? 'bg-slate-200 text-slate-400'
                      : plan.popular
                        ? 'bg-[#E60012]/10 text-[#E60012]'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                    <Crown className="w-6 h-6" />
                  </div>

                  <h3 className={`text-xl font-bold mb-2 ${isLowerTier ? 'text-slate-400' : 'text-slate-900'}`}>{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className={`text-4xl font-bold ${isLowerTier ? 'text-slate-400' : 'text-slate-900'}`}>${plan.price}</span>
                    <span className={isLowerTier ? 'text-slate-400' : 'text-slate-500'}>/{plan.period}</span>
                  </div>
                  <p className={`text-sm mb-6 ${isLowerTier ? 'text-slate-400' : 'text-slate-600'}`}>{plan.description}</p>

                  <ul className="space-y-3 mb-6 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                        <Star className={`w-4 h-4 flex-shrink-0 ${isCurrentPlan ? 'text-green-500 fill-green-500' : 'text-amber-500 fill-amber-500'
                          }`} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {isCurrentPlan ? (
                    <Button
                      disabled
                      className="w-full bg-green-100 text-green-700 cursor-not-allowed"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Active Plan
                    </Button>
                  ) : isLowerTier ? (
                    <Button
                      disabled
                      className="w-full bg-slate-200 text-slate-400 cursor-not-allowed"
                    >
                      Lower Tier
                    </Button>
                  ) : plan.lemonSqueezyUrl ? (
                    <a
                      href={plan.lemonSqueezyUrl + `&checkout[custom][plan]=${plan.id}`}
                      className={`lemonsqueezy-button flex items-center justify-center w-full py-3 rounded-lg font-semibold text-white transition-colors ${plan.popular
                        ? 'bg-[#E60012] hover:bg-[#cc0010]'
                        : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700'
                        }`}
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade to {plan.name}
                    </a>
                  ) : (
                    <Button disabled className="w-full" variant="outline">
                      Not Available
                    </Button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {showReviewModal && reviewItinerary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl"
          >
            <div className="sticky top-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">Review Your Trip</h3>
                  <p className="text-white/80 text-sm">{reviewItinerary.title}</p>
                </div>
                <button
                  onClick={() => { setShowReviewModal(false); setReviewItinerary(null); }}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Overall Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setReview({ ...review, rating: star })}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {Object.keys(review.attractionRatings).length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-3">Rate Attractions You Visited</label>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {Object.entries(review.attractionRatings).map(([attraction, rating]) => (
                      <div key={attraction} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-sm text-slate-700 flex-1 mr-3">{attraction}</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setReview({
                                ...review,
                                attractionRatings: { ...review.attractionRatings, [attraction]: star }
                              })}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`w-5 h-5 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Your Experience</label>
                <textarea
                  value={review.text}
                  onChange={(e) => setReview({ ...review, text: e.target.value })}
                  className="w-full p-4 border border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-[#E60012] focus:border-transparent"
                  rows={4}
                  placeholder="Tell us about your experience visiting these attractions..."
                />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => { setShowReviewModal(false); setReviewItinerary(null); }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-[#E60012] hover:bg-[#cc0010] text-white"
                  onClick={handleSubmitReview}
                >
                  <Star className="w-4 h-4 mr-2" />
                  Submit Review
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Delete Itinerary?</h3>
                  <p className="text-slate-600 text-sm">This action cannot be undone</p>
                </div>
              </div>

              <div className="mb-6 p-4 bg-slate-50 rounded-xl">
                <p className="font-medium text-slate-900">{deleteConfirm.title}</p>
                <p className="text-sm text-slate-500">{deleteConfirm.cities?.join(' → ')}</p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setDeleteConfirm(null)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => handleDeleteItinerary(deleteConfirm.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {viewItinerary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setViewItinerary(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-gradient-to-r from-[#E60012] to-red-500 text-white p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{viewItinerary.title}</h3>
                    <p className="text-white/80">{viewItinerary.cities?.join(' → ')}</p>
                  </div>
                  <button
                    onClick={() => setViewItinerary(null)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-slate-600 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Duration</span>
                    </div>
                    <p className="font-bold text-slate-900">{viewItinerary.duration} Days</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-slate-600 mb-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">Cities</span>
                    </div>
                    <p className="font-bold text-slate-900">{viewItinerary.cities?.length} Cities</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 mb-3">Trip Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-600">Travel Pace</span>
                      <span className="font-medium text-slate-900 capitalize">{viewItinerary.pace}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-600">Created</span>
                      <span className="font-medium text-slate-900">{new Date(viewItinerary.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 mb-3">Cities to Visit</h4>
                  <div className="flex flex-wrap gap-2">
                    {viewItinerary.cities?.map((city, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-[#E60012]/10 to-red-100 text-[#E60012] rounded-full text-sm font-medium"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setViewItinerary(null)}
                  >
                    Close
                  </Button>
                  <Link href="/" className="flex-1">
                    <Button className="w-full bg-[#E60012] hover:bg-[#cc0010] text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Similar
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showUpgradeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setShowUpgradeModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">Upgrade to Premium</h3>
                    <p className="text-white/80">Unlock all features and get unlimited access</p>
                  </div>
                  <button
                    onClick={() => setShowUpgradeModal(false)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {PLANS.map((plan) => {
                    const isCurrentPlan = user?.plan === plan.id;

                    return (
                      <button
                        key={plan.id}
                        onClick={() => {
                          if (!isCurrentPlan && plan.id !== 'free') {
                            setSelectedPlan(plan.id);
                          }
                        }}
                        disabled={isCurrentPlan}
                        className={`relative p-5 rounded-2xl border-2 transition-all text-left ${isCurrentPlan
                          ? 'border-green-500 bg-green-50/50 shadow-lg opacity-75 cursor-not-allowed'
                          : selectedPlan === plan.id
                            ? 'border-[#E60012] bg-red-50/50 shadow-lg cursor-pointer'
                            : 'border-slate-200 hover:border-slate-300 cursor-pointer'
                          }`}
                      >
                        {isCurrentPlan && (
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full">
                            Current Plan
                          </span>
                        )}
                        {plan.popular && !isCurrentPlan && (
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#E60012] text-white text-xs font-medium rounded-full">
                            Most Popular
                          </span>
                        )}
                        <div className="flex items-center gap-2 mb-3">
                          <Crown className={`w-7 h-7 ${isCurrentPlan ? 'text-green-600' :
                            selectedPlan === plan.id ? 'text-[#E60012]' : 'text-slate-400'
                            }`} />
                          <div>
                            <h4 className="text-lg font-bold text-slate-900">{plan.name}</h4>
                            <p className="text-xs text-slate-500">{plan.description}</p>
                          </div>
                        </div>
                        <div className="mb-3">
                          <span className="text-2xl font-bold text-[#E60012]">${plan.price}</span>
                          <span className="text-slate-500 ml-1 text-xs">{plan.period}</span>
                        </div>
                        <ul className="space-y-1">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                              <Star className="w-3 h-3 text-amber-500 fill-amber-500 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowUpgradeModal(false)}
                  >
                    Maybe Later
                  </Button>
                  {selectedPlan !== 'free' && selectedPlan !== user?.plan ? (
                    <a
                      href={PLANS.find(p => p.id === selectedPlan)?.lemonSqueezyUrl + `&checkout[custom][plan]=${selectedPlan}`}
                      className={`lemonsqueezy-button flex items-center justify-center flex-1 py-3 text-lg font-semibold rounded-lg cursor-pointer transition-colors ${selectedPlan === 'elite'
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white'
                        : 'bg-[#E60012] hover:bg-[#cc0010] text-white'
                        }`}
                    >
                      <Crown className="w-5 h-5 mr-2" />
                      Upgrade to {selectedPlan === 'elite' ? 'Elite' : 'Pro'} - ${PLANS.find(p => p.id === selectedPlan)?.price}
                    </a>
                  ) : (
                    <Button
                      disabled
                      className="flex-1 bg-slate-300 text-slate-500 cursor-not-allowed"
                    >
                      {selectedPlan === user?.plan ? 'Current Plan' : 'Select a paid plan'}
                    </Button>
                  )}
                </div>

                <p className="text-center text-sm text-slate-500 mt-4">
                  Secure payment processed by LemonSqueezy • 30-day money-back guarantee
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
