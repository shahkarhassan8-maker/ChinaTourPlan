import React from 'react';
import { motion } from 'framer-motion';
import { 
  Star, MapPin, Phone, ExternalLink, Wifi, Dumbbell, 
  UtensilsCrossed, Sparkles, Check
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { CITY_DATA } from './cityData';

const AMENITY_ICONS = {
  'Free WiFi': Wifi,
  'WiFi': Wifi,
  'Gym': Dumbbell,
  'Restaurant': UtensilsCrossed,
  'Spa': Sparkles,
};

export default function AccommodationSelector({ 
  cityId, 
  selectedAccommodation, 
  onAccommodationChange,
  budget 
}) {
  const cityData = CITY_DATA[cityId];
  if (!cityData || !cityData.hotels) return null;
  
  const accommodations = [
    { type: 'budget', label: 'Budget', ...cityData.hotels.budget },
    { type: 'comfort', label: 'Comfort', ...cityData.hotels.comfort },
    { type: 'luxury', label: 'Luxury', ...cityData.hotels.luxury },
  ].filter(a => a.name);
  
  const selectedType = selectedAccommodation[cityId] || budget;
  
  const handleSelect = (type) => {
    onAccommodationChange({
      ...selectedAccommodation,
      [cityId]: type
    });
  };
  
  const getGoogleMapsUrl = (hotel) => {
    if (hotel.coordinates) {
      return `https://www.google.com/maps?q=${hotel.coordinates.lat},${hotel.coordinates.lng}`;
    }
    if (hotel.addressChinese) {
      return `https://www.google.com/maps/search/${encodeURIComponent(hotel.addressChinese)}`;
    }
    return `https://www.google.com/maps/search/${encodeURIComponent(hotel.address)}`;
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <img 
          src={cityData.image} 
          alt={cityData.name}
          className="w-10 h-10 rounded-lg object-cover"
        />
        <div>
          <h3 className="font-bold text-slate-900">{cityData.name}</h3>
          <p className="text-xs text-slate-500">Select your accommodation</p>
        </div>
      </div>
      
      <div className="space-y-3">
        {accommodations.map((hotel) => {
          const isSelected = selectedType === hotel.type;
          const isRecommended = hotel.type === budget;
          
          return (
            <motion.button
              key={hotel.type}
              onClick={() => handleSelect(hotel.type)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-[#E60012] bg-red-50/50'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-slate-900">{hotel.name}</h4>
                    {isRecommended && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                        Recommended
                      </span>
                    )}
                  </div>
                  
                  {hotel.nameChinese && (
                    <p className="text-sm text-slate-500 mb-1">{hotel.nameChinese}</p>
                  )}
                  
                  <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
                    <span className={`px-1.5 py-0.5 rounded ${
                      hotel.type === 'luxury' 
                        ? 'bg-amber-100 text-amber-700' 
                        : hotel.type === 'comfort' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {hotel.type === 'luxury' ? '5-Star' : hotel.type === 'comfort' ? '3-4 Star' : 'Hostel'}
                    </span>
                  </div>
                  
                  {hotel.address && (
                    <div className="flex items-start gap-1.5 text-xs text-slate-600 mb-2">
                      <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-1">{hotel.address}</span>
                    </div>
                  )}
                  
                  {hotel.amenities && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {hotel.amenities.slice(0, 4).map((amenity, idx) => {
                        const Icon = AMENITY_ICONS[amenity] || Check;
                        return (
                          <span 
                            key={idx} 
                            className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded"
                          >
                            <Icon className="w-3 h-3" />
                            {amenity}
                          </span>
                        );
                      })}
                    </div>
                  )}
                  
                  {hotel.metro && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
                      <span className="w-4 h-4 bg-blue-600 text-white rounded text-[10px] flex items-center justify-center font-bold">
                        M
                      </span>
                      <span>{hotel.metro.station}</span>
                    </div>
                  )}
                </div>
                
                <div className="text-right flex-shrink-0">
                  <div className="text-lg font-bold text-slate-900">
                    ${hotel.pricePerNight?.usd || 0}
                  </div>
                  <div className="text-xs text-slate-500">
                    ¥{hotel.pricePerNight?.rmb || 0}/night
                  </div>
                  
                  {isSelected && (
                    <div className="mt-2 w-6 h-6 bg-[#E60012] rounded-full flex items-center justify-center ml-auto">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
              
              {isSelected && (
                <div className="mt-3 pt-3 border-t border-slate-200 flex gap-2">
                  <a
                    href={getGoogleMapsUrl(hotel)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs text-slate-700 transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    View on Map
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}