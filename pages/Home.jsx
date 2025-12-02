import React, { useState } from 'react';
import HeroSection from '@/components/travel/HeroSection';
import InputWizard from '@/components/travel/InputWizard';
import ItineraryResult from '@/components/travel/ItineraryResult';

export default function Home() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [itineraryData, setItineraryData] = useState(null);

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
      <HeroSection onStartPlanning={() => setIsWizardOpen(true)} />
      
      <InputWizard 
        isOpen={isWizardOpen} 
        onClose={() => setIsWizardOpen(false)}
        onSubmit={handleWizardSubmit}
      />
    </>
  );
}