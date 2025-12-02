import React, { useState, useEffect } from 'react';
import HeroSection from '@/components/travel/HeroSection';
import InputWizard from '@/components/travel/InputWizard';
import ItineraryResult from '@/components/travel/ItineraryResult';
import ReviewsSection from '@/components/travel/ReviewsSection';
import Navbar from '@/components/travel/Navbar';
import FeaturesSection from '@/components/travel/FeaturesSection';
import Footer from '@/components/travel/Footer';

export default function Home() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [itineraryData, setItineraryData] = useState(null);
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    const storedReviews = localStorage.getItem('userReviews');
    if (storedReviews) {
      setUserReviews(JSON.parse(storedReviews));
    }
  }, []);

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

  return (
    <>
      <Navbar />
      <HeroSection onStartPlanning={() => setIsWizardOpen(true)} />
      <FeaturesSection />
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