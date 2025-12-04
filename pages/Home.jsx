import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import HeroSection from '@/components/travel/HeroSection';
import InputWizard from '@/components/travel/InputWizard';
import ItineraryResult from '@/components/travel/ItineraryResult';
import ReviewsSection from '@/components/travel/ReviewsSection';
import Navbar from '@/components/travel/Navbar';
import FeaturesSection from '@/components/travel/FeaturesSection';
import CityGallery from '@/components/travel/CityGallery';
import PricingSection from '@/components/travel/PricingSection';
import Footer from '@/components/travel/Footer';
import { generateMetaTags, generateOrganizationSchema } from '@/lib/seo';
import { getCurrentUser } from '@/lib/supabase';
import { toast } from 'sonner';

export default function Home() {
  const router = useRouter();
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [itineraryData, setItineraryData] = useState(null);
  const [userReviews, setUserReviews] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    checkAuth();
    const storedReviews = localStorage.getItem('userReviews');
    if (storedReviews) {
      setUserReviews(JSON.parse(storedReviews));
    }
  }, []);

  const checkAuth = async () => {
    try {
      const userData = await getCurrentUser();
      console.log('Auth check result:', userData);
      setCurrentUser(userData);
    } catch (error) {
      console.error('Error checking auth:', error);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const handleStartPlanning = () => {
    // getCurrentUser returns { user, profile } or null
    // We need to check if user object exists
    if (!currentUser || !currentUser.user) {
      toast.info('Please sign in to start planning your trip');
      router.push('/signup?redirect=/');
      return;
    }
    setIsWizardOpen(true);
  };

  const handleWizardSubmit = (formData) => {
    setItineraryData(formData);
  };

  const handleBack = () => {
    setItineraryData(null);
  };

  if (itineraryData) {
    return (
      <ItineraryResult
        formData={itineraryData}
        onBack={handleBack}
      />
    );
  }

  const seoData = generateMetaTags({
    title: 'ChinaTourPlan - AI-Powered China Travel Itinerary Planner',
    description: 'Plan your perfect China trip with AI-powered itineraries. Get detailed day-by-day plans, costs, and travel tips for Beijing, Shanghai, Xi\'an and more.',
    url: '/',
    type: 'website',
  });

  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <Head>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <link rel="canonical" href={seoData.canonical} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph */}
        <meta property="og:type" content={seoData.openGraph.type} />
        <meta property="og:url" content={seoData.openGraph.url} />
        <meta property="og:title" content={seoData.openGraph.title} />
        <meta property="og:description" content={seoData.openGraph.description} />
        <meta property="og:image" content={seoData.openGraph.image} />
        <meta property="og:site_name" content={seoData.openGraph.siteName} />
        <meta property="og:locale" content={seoData.openGraph.locale} />

        {/* Twitter Card */}
        <meta name="twitter:card" content={seoData.twitter.card} />
        <meta name="twitter:site" content={seoData.twitter.site} />
        <meta name="twitter:title" content={seoData.twitter.title} />
        <meta name="twitter:description" content={seoData.twitter.description} />
        <meta name="twitter:image" content={seoData.twitter.image} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </Head>

      <Navbar />
      <HeroSection onStartPlanning={handleStartPlanning} />
      <FeaturesSection />
      <CityGallery />
      <PricingSection />
      <ReviewsSection userReviews={userReviews} />
      <Footer />

      <InputWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onSubmit={handleWizardSubmit}
      />
    </>
  );
}