import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Info, Lightbulb } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { CITY_DATA } from './cityData';

const getPaceRecommendation = (pace, baseRecommended) => {
  switch (pace) {
    case 'relaxed':
      return Math.ceil(baseRecommended * 1.5);
    case 'intense':
      return Math.max(1, Math.floor(baseRecommended * 0.7));
    default:
      return baseRecommended;
  }
};

const getPaceDescription = (pace) => {
  switch (pace) {
    case 'relaxed':
      return 'More days recommended for a relaxed experience';
    case 'intense':
      return 'Fewer days needed with an action-packed schedule';
    default:
      return 'Balanced time for each destination';
  }
};

export default function CityDaysSelector({ selectedCities, cityDays, setCityDays, pace }) {
  const totalDays = Object.values(cityDays).reduce((sum, d) => sum + d, 0);

  const adjustDays = (cityId, delta) => {
    const currentDays = cityDays[cityId] || CITY_DATA[cityId]?.recommendedDays || 2;
    const newDays = Math.max(1, Math.min(currentDays + delta, 14));
    setCityDays({ ...cityDays, [cityId]: newDays });
  };

  return (
    <div className="space-y-4">
      <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
        <div className="flex items-start gap-2">
          <Lightbulb className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-amber-800">
              {pace.charAt(0).toUpperCase() + pace.slice(1)} Pace Selected
            </p>
            <p className="text-xs text-amber-600 mt-0.5">
              {getPaceDescription(pace)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-slate-600">Your trip duration</span>
        <span className="text-sm font-semibold text-[#E60012]">
          {totalDays} day{totalDays !== 1 ? 's' : ''} total
        </span>
      </div>

      {selectedCities.map((cityId) => {
        const city = CITY_DATA[cityId];
        if (!city) return null;
        
        const baseRecommended = city.recommendedDays || 2;
        const paceAdjustedRecommended = getPaceRecommendation(pace, baseRecommended);
        const days = cityDays[cityId] || paceAdjustedRecommended;
        
        return (
          <motion.div
            key={cityId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200"
          >
            <div className="flex items-center gap-3">
              <img 
                src={city.image} 
                alt={city.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h4 className="font-medium text-slate-900">{city.name}</h4>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Info className="w-3 h-3" />
                  <span>
                    Recommended: {paceAdjustedRecommended} day{paceAdjustedRecommended !== 1 ? 's' : ''}
                    {pace !== 'moderate' && (
                      <span className="text-amber-600 ml-1">
                        ({pace === 'relaxed' ? '+' : ''}{paceAdjustedRecommended - baseRecommended > 0 ? '+' : ''}{paceAdjustedRecommended - baseRecommended} from base)
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 rounded-full"
                onClick={() => adjustDays(cityId, -1)}
                disabled={days <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-8 text-center font-bold text-lg">{days}</span>
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 rounded-full"
                onClick={() => adjustDays(cityId, 1)}
                disabled={days >= 14}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        );
      })}

      <p className="text-xs text-slate-500 text-center mt-4">
        💡 Adjust days based on your interests. Prices may vary slightly based on duration.
      </p>
    </div>
  );
}