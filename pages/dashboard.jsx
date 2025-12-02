import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, Crown, MapPin, Calendar, Trash2, 
  Plus, Star, Settings, LogOut, Edit, Eye,
  MessageCircle, Sparkles, Clock, User
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const SAMPLE_ITINERARIES = [
  {
    id: 1,
    title: '14 Days in China',
    cities: ['Beijing', 'Shanghai', 'Chengdu'],
    duration: 14,
    createdAt: '2024-11-15',
    budget: 'comfort',
    pace: 'moderate',
  },
  {
    id: 2,
    title: '7 Days Adventure',
    cities: ['Zhangjiajie', 'Guilin'],
    duration: 7,
    createdAt: '2024-11-10',
    budget: 'budget',
    pace: 'intense',
  },
];

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [itineraries, setItineraries] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [review, setReview] = useState({ rating: 5, text: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    const storedItineraries = localStorage.getItem('itineraries');
    if (storedItineraries) {
      setItineraries(JSON.parse(storedItineraries));
    } else {
      setItineraries(SAMPLE_ITINERARIES);
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    window.location.href = '/';
  };

  const handleDeleteItinerary = (id) => {
    const updated = itineraries.filter(i => i.id !== id);
    setItineraries(updated);
    localStorage.setItem('itineraries', JSON.stringify(updated));
    toast.success('Itinerary deleted');
  };

  const handleSubmitReview = () => {
    if (review.text.trim().length < 10) {
      toast.error('Please write at least 10 characters');
      return;
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[#E60012] to-red-500 rounded-2xl p-6 text-white"
          >
            <Crown className="w-8 h-8 mb-4" />
            <h3 className="text-lg font-semibold mb-1">
              {user.plan?.charAt(0).toUpperCase() + user.plan?.slice(1) || 'Premium'} Member
            </h3>
            <p className="text-white/80 text-sm">All premium features unlocked</p>
          </motion.div>

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
            <MessageCircle className="w-8 h-8 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900">24/7 Support</h3>
            <p className="text-slate-600 text-sm">WeChat: Shahkarhassan</p>
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
                    <p className="text-sm text-slate-500">{itinerary.cities.join(' → ')}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-red-500 hover:text-red-600"
                      onClick={() => handleDeleteItinerary(itinerary.id)}
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
                    {itinerary.cities.length} cities
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Created {new Date(itinerary.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full capitalize">
                      {itinerary.budget}
                    </span>
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
    </div>
  );
}
