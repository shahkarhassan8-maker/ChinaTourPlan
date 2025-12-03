import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import {
  Calendar, MapPin, DollarSign, ArrowLeft, Share2,
  Mail, Clock, Sparkles, Loader2, AlertCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DetailedDayCard from '@/components/travel/DetailedDayCard';
import ShareModal from '@/components/travel/ShareModal';
import EmailModal from '@/components/travel/EmailModal';
import { getItineraryById, getCurrentUser } from '@/lib/supabase';
import { toast } from "sonner";
import { generateMetaTags, generateTripSchema } from '@/lib/seo';

export default function ItineraryViewPage() {
  const router = useRouter();
  const { id } = router.query;

  const [itineraryData, setItineraryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (id) {
      loadItinerary();
    }
  }, [id]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const userData = await getCurrentUser();
      setCurrentUser(userData);
    } catch (error) {
      console.error('Error checking auth:', error);
    }
  };

  const loadItinerary = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getItineraryById(id);
      if (!data) {
        setError('Itinerary not found');
      } else {
        setItineraryData(data);
      }
    } catch (err) {
      console.error('Error loading itinerary:', err);
      setError('Failed to load itinerary');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#E60012] animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading itinerary...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Itinerary Not Found</h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <Button
            onClick={() => router.push('/')}
            className="bg-[#E60012] hover:bg-[#cc0010] text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const itinerary = itineraryData?.itinerary_data || [];
  const cities = itineraryData?.cities || [];
  const duration = itineraryData?.duration || itinerary.length;
  const totalCostUSD = itinerary.reduce((sum, day) => sum + (day.cost?.usd || 0), 0);
  const totalCostRMB = itinerary.reduce((sum, day) => sum + (day.cost?.rmb || 0), 0);
  const cityNames = [...new Set(itinerary.map(d => d.city))];

  const formData = {
    duration,
    cities,
    pace: itineraryData?.pace || 'moderate',
    food: itineraryData?.food_preference || 'anything',
    accommodation: itineraryData?.accommodation || {}
  };

  const pageTitle = itineraryData?.title || `${duration}-Day China Travel Itinerary`;
  const pageDescription = `Explore ${cityNames.join(', ')} in ${duration} days. Detailed ${itineraryData?.pace || 'moderate'}-paced China travel itinerary with costs, activities, and travel tips.`;

  const seoData = generateMetaTags({
    title: pageTitle,
    description: pageDescription,
    url: `/itinerary/${id}`,
    type: 'article',
  });

  const tripSchema = generateTripSchema({
    title: pageTitle,
    description: pageDescription,
    cities: cityNames,
    duration,
  });

  return (
    <>
      <Head>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <link rel="canonical" href={seoData.canonical} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={seoData.openGraph.url} />
        <meta property="og:title" content={seoData.openGraph.title} />
        <meta property="og:description" content={seoData.openGraph.description} />
        <meta property="og:image" content={seoData.openGraph.image} />
        <meta property="og:site_name" content={seoData.openGraph.siteName} />

        {/* Twitter Card */}
        <meta name="twitter:card" content={seoData.twitter.card} />
        <meta name="twitter:title" content={seoData.twitter.title} />
        <meta name="twitter:description" content={seoData.twitter.description} />
        <meta name="twitter:image" content={seoData.twitter.image} />

        {/* Structured Data - TouristTrip */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchema) }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <Button variant="ghost" onClick={() => router.push('/')} className="text-slate-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Home
            </Button>
            <div className="flex items-center gap-2">
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Saved Itinerary
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {itineraryData?.title || `${duration} Days in China`}
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              {cityNames.join(' → ')}
            </p>

            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
              <div className="bg-white rounded-2xl p-4 border border-slate-200">
                <Calendar className="w-5 h-5 text-[#E60012] mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900">{duration}</div>
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

          <div className="flex justify-center gap-3 mb-8">
            {itineraryData?.pace && (
              <Badge className="px-4 py-2 text-sm bg-purple-100 text-purple-800">
                {itineraryData.pace.charAt(0).toUpperCase() + itineraryData.pace.slice(1)} Pace
              </Badge>
            )}
            {itineraryData?.food_preference && (
              <Badge className="px-4 py-2 text-sm bg-orange-100 text-orange-800">
                {itineraryData.food_preference.charAt(0).toUpperCase() + itineraryData.food_preference.slice(1)} Food
              </Badge>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-xl"
          >
            <p className="text-sm text-amber-800 text-center">
              This itinerary was created on {new Date(itineraryData?.created_at).toLocaleDateString()}. Prices may vary based on season and availability.
            </p>
          </motion.div>

          <div className="relative">
            {itinerary.map((day, index) => (
              <DetailedDayCard
                key={day.dayNumber || index}
                day={day}
                isLast={index === itinerary.length - 1}
                isPremium={true}
                onUpgrade={() => { }}
              />
            ))}
          </div>

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
              Includes accommodation, meals, transport, and activities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <Button
              onClick={() => router.push('/')}
              size="lg"
              className="bg-[#E60012] hover:bg-[#cc0010] text-white px-10 py-6 text-lg rounded-xl"
            >
              Plan Your Own Trip
            </Button>
          </motion.div>

          <div className="mt-8 text-center text-sm text-slate-500 pb-8">
            <p>Questions? Reach out anytime</p>
            <div className="flex items-center justify-center gap-6 mt-2 flex-wrap">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c4.8 0 8.691-3.288 8.691-7.343 0-4.053-3.891-7.34-8.691-7.34" />
                </svg>
                WeChat: <strong>Shahkarhassan</strong>
              </span>
              <a href="https://wa.me/message/L2U465RFNFKME1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <strong>WhatsApp</strong>
              </a>
            </div>
          </div>
        </div>

        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          itinerary={itinerary}
          formData={formData}
          savedItineraryId={id}
        />

        <EmailModal
          isOpen={showEmailModal}
          onClose={() => setShowEmailModal(false)}
          itinerary={itinerary}
          formData={formData}
          savedItineraryId={id}
        />
      </div>
    </>
  );
}
