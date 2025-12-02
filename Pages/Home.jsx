import React, { useState } from 'react';
import HeroSection from '@/components/travel/HeroSection';
import InputWizard from '@/components/travel/InputWizard';
import ItineraryResult from '@/components/travel/ItineraryResult';
import LiveAssistanceModal from '@/components/travel/LiveAssistanceModal';
import FloatingAssistButton from '@/components/travel/FloatingAssistButton';

export default function Home() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isAssistanceOpen, setIsAssistanceOpen] = useState(false);
  const [itineraryData, setItineraryData] = useState(null);

  const handleWizardSubmit = (formData) => {
    setItineraryData(formData);
  };

  const handleBack = () => {
    setItineraryData(null);
  };

  // If we have itinerary data, show the results
  if (itineraryData) {
    return (
      <>
        <ItineraryResult 
          formData={itineraryData} 
          onBack={handleBack}
        />
        <FloatingAssistButton 
          onClick={() => setIsAssistanceOpen(true)} 
        />
        <LiveAssistanceModal 
          isOpen={isAssistanceOpen} 
          onClose={() => setIsAssistanceOpen(false)} 
        />
      </>
    );
  }

  // Otherwise show the landing page
  return (
    <>
      <HeroSection onStartPlanning={() => setIsWizardOpen(true)} />
      
      <InputWizard 
        isOpen={isWizardOpen} 
        onClose={() => setIsWizardOpen(false)}
        onSubmit={handleWizardSubmit}
      />
      
      <FloatingAssistButton 
        onClick={() => setIsAssistanceOpen(true)}
        showLabel={false}
      />
      
      <LiveAssistanceModal 
        isOpen={isAssistanceOpen} 
        onClose={() => setIsAssistanceOpen(false)} 
      />
    </>
  );
}