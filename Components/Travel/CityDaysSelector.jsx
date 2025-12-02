import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { CITY_DATA } from './cityData';

export default function CityDaysSelector({ selectedCities, cityDays, setCityDays, totalDays }) {
  const allocatedDays = Object.values(cityDays).reduce((sum, d) => sum + d, 0);
  const remainingDays = totalDays - allocatedDays;

  const adjustDays = (cityId, delta) => {
    const currentDays = cityDays[cityId] || CITY_DATA[cityId]?.recommendedDays || 2;
    const newDays = Math.max(1, Math.min(currentDays + delta, totalDays));
    
    // Check if we have enough days
    const otherDays = Object.entries(cityDays)
      .filter(([id]) => id !== cityId)
      .reduce((sum, [, d]) => sum + d, 0);
    
    if (newDays + otherDays <= totalDays) {
      setCityDays({ ...cityDays, [cityId]: newDays });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-slate-600">Total trip: {totalDays} days</span>
        <span className={`text-sm font-medium ${remainingDays < 0 ? 'text-red-600' : remainingDays > 0 ? 'text-amber-600' : 'text-green-600'}`}>
          {remainingDays === 0 ? '✓ Perfectly allocated' : remainingDays > 0 ? `${remainingDays} days unallocated` : `${Math.abs(remainingDays)} days over`}
        </span>
      </div>

      {selectedCities.map((cityId) => {
        const city = CITY_DATA[cityId];
        if (!city) return null;
        
        const days = cityDays[cityId] || city.recommendedDays || 2;
        
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
                  <span>Recommended: {city.recommendedDays} days</span>
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
                disabled={remainingDays <= 0}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        );
      })}

      {remainingDays > 0 && (
        <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
          💡 Tip: You have {remainingDays} unallocated day{remainingDays > 1 ? 's' : ''}. Add more days to your cities or we'll distribute them evenly.
        </p>
      )}
    </div>
  );
}