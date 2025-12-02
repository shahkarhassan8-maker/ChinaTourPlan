import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, Crown, MapPin, Calendar, Trash2, 
  Plus, Star, Settings, LogOut, Edit, Eye,
  MessageCircle, Sparkles, Clock, User, AlertTriangle, X,
  Lock, Zap, Download, Bot
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
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
  submitReview as submitReviewToDb
} from '@/lib/supabase';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [itineraries, setItineraries] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [review, setReview] = useState({ rating: 5, text: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [viewItinerary, setViewItinerary] = useState(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeFeature, setUpgradeFeature] = useState(null);
  const [supabaseAvailable, setSupabaseAvailable] = useState(false);

  useEffect(() => {
    setSupabaseAvailable(!!supabase);
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      
      if (supabase && userData.id) {
        try {
          const dbItineraries = await getUserItineraries(userData.id);
          if (dbItineraries && dbItineraries.length > 0) {
            const formattedItineraries = dbItineraries.map(it => ({
              id: it.id,
              title: it.title,
              cities: it.cities,
              duration: it.duration,
              createdAt: it.created_at,
              pace: it.pace,
              itineraryData: it.itinerary_data
            }));
            setItineraries(formattedItineraries);
            setIsLoading(false);
            return;
          }
        } catch (error) {
          console.log('Supabase not configured, using local storage');
        }
      }
      
      const storedItineraries = localStorage.getItem('itineraries');
      if (storedItineraries) {
        setItineraries(JSON.parse(storedItineraries));
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
    setViewItinerary(itinerary);
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

  const handleSubmitReview = async () => {
    if (review.text.trim().length < 10) {
      toast.error('Please write at least 10 characters');
      return;
    }
    
    try {
      if (supabase && user?.id) {
        await submitReviewToDb(user.id, {
          rating: review.rating,
          text: review.text,
          trip: 'China Travel Pro Member'
        });
      }
      
      const existingReviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
      const newReview = {
        id: Date.now(),
        name: user?.name || 'Anonymous',
        country: 'Member',
        rating: review.rating,
        date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        trip: 'China Travel Pro Member',
        text: review.text,
        verified: true,
      };
      existingReviews.push(newReview);
      localStorage.setItem('userReviews', JSON.stringify(existingReviews));
      
      toast.success('Thank you for your review!');
      setShowReviewModal(false);
      setReview({ rating: 5, text: '' });
    } catch (error) {
      console.error('Review error:', error);
      toast.error('Failed to submit review');
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
              <Link href="/signup">
                <Button size="sm" className="bg-white text-amber-600 hover:bg-amber-50">
                  <Crown className="w-3 h-3 mr-1" />
                  Upgrade to Pro
                </Button>
              </Link>
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
              <p className="text-white/80 text-sm">All premium features unlocked</p>
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

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Your Itineraries</h2>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowReviewModal(true)}
            >
              <Star className="w-4 h-4 mr-2" />
              Write Review
            </Button>
            <Link href="/">
              <Button className="bg-[#E60012] hover:bg-[#cc0010] text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Itinerary
              </Button>
            </Link>
          </div>
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
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full capitalize">
                      {itinerary.pace}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-4">Write a Review</h3>
            <p className="text-slate-600 mb-6">Share your experience with China Travel Pro</p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">Rating</label>
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

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">Your Review</label>
              <textarea
                value={review.text}
                onChange={(e) => setReview({ ...review, text: e.target.value })}
                className="w-full p-4 border border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-[#E60012] focus:border-transparent"
                rows={4}
                placeholder="Tell us about your experience planning your China trip..."
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowReviewModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-[#E60012] hover:bg-[#cc0010] text-white"
                onClick={handleSubmitReview}
              >
                Submit Review
              </Button>
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
    </div>
  );
}
