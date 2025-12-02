import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, Calendar, MapPin, Gauge, 
  Utensils, Sparkles, Check, Search, Camera, Bed
} from 'lucide-react';

import CityDaysSelector from './CityDaysSelector';
import PlaceSelector from './PlaceSelector';
import AccommodationSelector from './AccommodationSelector';
import { CITY_DATA } from './cityData';

const STEPS = [
  { id: 'pace', title: 'Travel Pace', icon: Gauge, description: 'How do you like to travel? This helps us recommend days per city' },
  { id: 'cities', title: 'Destinations', icon: MapPin, description: 'Select your dream destinations (pick multiple!)' },
  { id: 'cityDays', title: 'Days per City', icon: Calendar, description: 'See our recommendations and customize your stay' },
  { id: 'places', title: 'Places to Visit', icon: Camera, description: 'Select attractions you want to see' },
  { id: 'accommodation', title: 'Accommodation', icon: Bed, description: 'Where would you like to stay?' },
  { id: 'food', title: 'Food Preferences', icon: Utensils, description: 'Any dietary preferences?' },
];

const CITIES = [
  // Tier 1 - Must Visit
  { id: 'beijing', name: 'Beijing', tag: 'History & Imperial Heritage', emoji: '🏯', region: 'North' },
  { id: 'shanghai', name: 'Shanghai', tag: 'Modern Skyline & Culture', emoji: '🌃', region: 'East' },
  { id: 'xian', name: "Xi'an", tag: 'Terracotta Warriors', emoji: '⚔️', region: 'Central' },
  { id: 'guilin', name: 'Guilin & Yangshuo', tag: 'Karst Mountains & Rivers', emoji: '🏞️', region: 'South' },
  
  // Tier 2 - Popular
  { id: 'chengdu', name: 'Chengdu', tag: 'Giant Pandas & Spicy Food', emoji: '🐼', region: 'Southwest' },
  { id: 'hangzhou', name: 'Hangzhou', tag: 'West Lake Paradise', emoji: '🌸', region: 'East' },
  { id: 'suzhou', name: 'Suzhou', tag: 'Classical Gardens', emoji: '🏡', region: 'East' },
  { id: 'huangshan', name: 'Huangshan', tag: 'Yellow Mountains', emoji: '⛰️', region: 'East' },
  
  // Tier 3 - Adventure & Nature
  { id: 'zhangjiajie', name: 'Zhangjiajie', tag: 'Avatar Mountains', emoji: '🗻', region: 'Central' },
  { id: 'jiuzhaigou', name: 'Jiuzhaigou', tag: 'Colorful Lakes & Waterfalls', emoji: '💧', region: 'Southwest' },
  { id: 'lijiang', name: 'Lijiang', tag: 'Ancient Town & Snow Mountain', emoji: '🏔️', region: 'Southwest' },
  { id: 'yunnan', name: 'Dali & Yunnan', tag: 'Ethnic Culture & Nature', emoji: '🌺', region: 'Southwest' },
  
  // Tier 4 - Cultural & Unique
  { id: 'hongkong', name: 'Hong Kong', tag: 'East Meets West', emoji: '🎆', region: 'South' },
  { id: 'macau', name: 'Macau', tag: 'Casinos & Portuguese Heritage', emoji: '🎰', region: 'South' },
  { id: 'tibet', name: 'Lhasa & Tibet', tag: 'Roof of the World', emoji: '🙏', region: 'West' },
  { id: 'harbin', name: 'Harbin', tag: 'Ice City & Russian Influence', emoji: '❄️', region: 'Northeast' },
  
  // Tier 5 - Hidden Gems
  { id: 'pingyao', name: 'Pingyao', tag: 'Ancient Walled City', emoji: '🏰', region: 'North' },
  { id: 'fenghuang', name: 'Fenghuang', tag: 'Phoenix Ancient Town', emoji: '🦅', region: 'Central' },
  { id: 'xiamen', name: 'Xiamen & Gulangyu', tag: 'Coastal Beauty', emoji: '🏖️', region: 'Southeast' },
  { id: 'chongqing', name: 'Chongqing', tag: 'Mountain City & Hotpot', emoji: '🌶️', region: 'Southwest' },
];

const REGIONS = ['All', 'North', 'East', 'South', 'Central', 'Southwest', 'Southeast', 'West', 'Northeast'];

const PACES = [
  { id: 'relaxed', name: 'Relaxed', description: '1-2 activities per day, plenty of rest' },
  { id: 'moderate', name: 'Moderate', description: '2-3 activities, balanced schedule' },
  { id: 'intense', name: 'Intense', description: 'Pack it in! Maximum exploration' },
];

const FOOD_PREFS = [
  { id: 'anything', name: 'Anything Goes', emoji: '🍜' },
  { id: 'spicy', name: 'Bring the Spice', emoji: '🌶️' },
  { id: 'halal', name: 'Halal', emoji: '🥘' },
  { id: 'vegetarian', name: 'Vegetarian', emoji: '🥗' },
];

export default function InputWizard({ isOpen, onClose, onSubmit }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [activePlacesCity, setActivePlacesCity] = useState(null);
  const [activeAccommodationCity, setActiveAccommodationCity] = useState(null);
  const [formData, setFormData] = useState({
    cities: [],
    cityDays: {},
    selectedPlaces: {},
    pace: 'moderate',
    accommodation: {},
    food: 'anything',
  });
  
  // Calculate total duration from city days
  const totalDuration = Object.values(formData.cityDays).reduce((sum, d) => sum + d, 0);

  // Initialize city days when cities change
  React.useEffect(() => {
    const newCityDays = { ...formData.cityDays };
    formData.cities.forEach(cityId => {
      if (!newCityDays[cityId]) {
        newCityDays[cityId] = CITY_DATA[cityId]?.recommendedDays || 2;
      }
    });
    // Remove days for deselected cities
    Object.keys(newCityDays).forEach(cityId => {
      if (!formData.cities.includes(cityId)) {
        delete newCityDays[cityId];
      }
    });
    if (JSON.stringify(newCityDays) !== JSON.stringify(formData.cityDays)) {
      setFormData(prev => ({ ...prev, cityDays: newCityDays }));
    }
  }, [formData.cities]);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Include calculated duration when submitting
      onSubmit({ ...formData, duration: totalDuration });
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleCity = (cityId) => {
    setFormData(prev => ({
      ...prev,
      cities: prev.cities.includes(cityId)
        ? prev.cities.filter(c => c !== cityId)
        : [...prev.cities, cityId]
    }));
  };

  const canProceed = () => {
    // Step 0: Pace - always can proceed
    // Step 1: Cities - need at least one city selected
    if (currentStep === 1 && formData.cities.length === 0) return false;
    // Step 2: City Days - need at least some days allocated
    if (currentStep === 2) {
      const allocatedDays = Object.values(formData.cityDays).reduce((sum, d) => sum + d, 0);
      if (allocatedDays === 0) return false;
    }
    // Step 3: Places - need at least one place selected
    if (currentStep === 3) {
      const hasPlaces = formData.cities.some(cityId => 
        formData.selectedPlaces[cityId]?.length > 0
      );
      if (!hasPlaces) return false;
    }
    return true;
  };
  
  React.useEffect(() => {
    // Places step is now step 3
    if (currentStep === 3 && formData.cities.length > 0 && !activePlacesCity) {
      setActivePlacesCity(formData.cities[0]);
    }
    // Accommodation step is now step 4
    if (currentStep === 4 && formData.cities.length > 0 && !activeAccommodationCity) {
      setActiveAccommodationCity(formData.cities[0]);
    }
  }, [currentStep, formData.cities]);

  const filteredCities = CITIES.filter(city => {
    const matchesSearch = city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         city.tag.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'All' || city.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Pace (moved to first step)
        return (
          <RadioGroup
            value={formData.pace}
            onValueChange={(value) => setFormData({ ...formData, pace: value })}
            className="space-y-4"
          >
            {PACES.map((pace) => (
              <label
                key={pace.id}
                className={`flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                  formData.pace === pace.id
                    ? 'border-[#E60012] bg-red-50/50'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <RadioGroupItem value={pace.id} className="sr-only" />
                <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                  formData.pace === pace.id ? 'border-[#E60012]' : 'border-slate-300'
                }`}>
                  {formData.pace === pace.id && (
                    <div className="w-3 h-3 rounded-full bg-[#E60012]" />
                  )}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{pace.name}</div>
                  <div className="text-sm text-slate-500">{pace.description}</div>
                </div>
              </label>
            ))}
          </RadioGroup>
        );

      case 1: // Cities
        return (
          <div className="space-y-4">
            {/* Search and Filter */}
            <div className="sticky top-0 bg-slate-50 pb-4 z-10">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Region Filter */}
              <div className="flex flex-wrap gap-2">
                {REGIONS.map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                      selectedRegion === region
                        ? 'bg-[#E60012] text-white'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
              
              {/* Selection count */}
              <div className="mt-3 text-sm text-slate-500">
                {formData.cities.length} destination{formData.cities.length !== 1 ? 's' : ''} selected
              </div>
            </div>

            {/* Cities Grid */}
            <div className="grid grid-cols-2 gap-3 max-h-[320px] overflow-y-auto pr-1">
              {filteredCities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => toggleCity(city.id)}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    formData.cities.includes(city.id)
                      ? 'border-[#E60012] bg-red-50/50'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  {formData.cities.includes(city.id) && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-[#E60012] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div className="text-2xl mb-2">{city.emoji}</div>
                  <div className="font-semibold text-slate-900 text-sm">{city.name}</div>
                  <div className="text-xs text-slate-500 line-clamp-1">{city.tag}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2: // City Days
        return (
          <CityDaysSelector
            selectedCities={formData.cities}
            cityDays={formData.cityDays}
            setCityDays={(newCityDays) => setFormData({ ...formData, cityDays: newCityDays })}
            pace={formData.pace}
          />
        );

      case 3: // Places
        return (
          <div className="space-y-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {formData.cities.map((cityId) => {
                const city = CITY_DATA[cityId];
                const placesCount = formData.selectedPlaces[cityId]?.length || 0;
                return (
                  <button
                    key={cityId}
                    onClick={() => setActivePlacesCity(cityId)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                      activePlacesCity === cityId
                        ? 'bg-[#E60012] text-white'
                        : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="font-medium">{city?.name || cityId}</span>
                    {placesCount > 0 && (
                      <span className={`w-5 h-5 rounded-full text-xs flex items-center justify-center ${
                        activePlacesCity === cityId ? 'bg-white text-[#E60012]' : 'bg-[#E60012] text-white'
                      }`}>
                        {placesCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            
            {activePlacesCity && (
              <PlaceSelector
                cityId={activePlacesCity}
                cityDays={formData.cityDays[activePlacesCity]}
                selectedPlaces={formData.selectedPlaces}
                onPlacesChange={(newPlaces) => setFormData({ ...formData, selectedPlaces: newPlaces })}
                pace={formData.pace}
              />
            )}
          </div>
        );

      case 4: // Accommodation
        return (
          <div className="space-y-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {formData.cities.map((cityId) => {
                const city = CITY_DATA[cityId];
                const hasAccommodation = formData.accommodation[cityId];
                return (
                  <button
                    key={cityId}
                    onClick={() => setActiveAccommodationCity(cityId)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                      activeAccommodationCity === cityId
                        ? 'bg-[#E60012] text-white'
                        : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="font-medium">{city?.name || cityId}</span>
                    {hasAccommodation && (
                      <Check className={`w-4 h-4 ${
                        activeAccommodationCity === cityId ? 'text-white' : 'text-green-600'
                      }`} />
                    )}
                  </button>
                );
              })}
            </div>
            
            {activeAccommodationCity && (
              <AccommodationSelector
                cityId={activeAccommodationCity}
                selectedAccommodation={formData.accommodation}
                onAccommodationChange={(newAccommodation) => setFormData({ ...formData, accommodation: newAccommodation })}
              />
            )}
          </div>
        );

      case 5: // Food
        return (
          <div className="grid grid-cols-2 gap-4">
            {FOOD_PREFS.map((pref) => (
              <button
                key={pref.id}
                onClick={() => setFormData({ ...formData, food: pref.id })}
                className={`p-5 rounded-2xl border-2 transition-all duration-300 text-center ${
                  formData.food === pref.id
                    ? 'border-[#E60012] bg-red-50/50'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="text-4xl mb-3">{pref.emoji}</div>
                <div className="font-semibold text-slate-900">{pref.name}</div>
              </button>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl p-0 gap-0 overflow-hidden bg-slate-50 max-h-[90vh]">
        {/* Progress Bar */}
        <div className="h-1 bg-slate-200">
          <div 
            className="h-full bg-[#E60012] transition-all duration-500"
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Step Indicator */}
        <div className="px-8 pt-6 pb-2">
          <div className="flex items-center gap-3 text-sm text-slate-500 mb-2">
            {React.createElement(STEPS[currentStep].icon, { className: "w-4 h-4" })}
            <span>Step {currentStep + 1} of {STEPS.length}</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">{STEPS[currentStep].title}</h2>
          <p className="text-slate-500 mt-1">{STEPS[currentStep].description}</p>
        </div>

        {/* Step Content */}
        <div className="px-8 py-4 min-h-[320px] overflow-y-auto">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="px-8 py-4 bg-white border-t border-slate-200 flex justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="text-slate-600"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-[#E60012] hover:bg-[#cc0010] text-white px-8"
          >
            {currentStep === STEPS.length - 1 ? (
              <>
                Generate Itinerary
                <Sparkles className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}