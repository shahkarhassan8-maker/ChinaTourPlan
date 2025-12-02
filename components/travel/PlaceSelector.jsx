import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, MapPin, Check, AlertTriangle, ChevronDown, ChevronUp,
  Camera, Star, Info, Filter, Search
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CITY_DATA } from './cityData';

const PLACE_CATEGORIES = [
  { id: 'all', name: 'All Places', icon: '🗺️' },
  { id: 'history', name: 'History & Culture', icon: '🏛️' },
  { id: 'nature', name: 'Nature & Parks', icon: '🌿' },
  { id: 'landmark', name: 'Landmarks', icon: '🏯' },
  { id: 'temple', name: 'Temples', icon: '🙏' },
  { id: 'modern', name: 'Modern', icon: '🌃' },
  { id: 'shopping', name: 'Shopping & Markets', icon: '🛍️' },
];

function categorizePlace(place) {
  const name = place.name.toLowerCase();
  const desc = (place.description || '').toLowerCase();
  
  if (name.includes('temple') || name.includes('pagoda') || desc.includes('temple') || desc.includes('buddhist')) {
    return 'temple';
  }
  if (name.includes('wall') || name.includes('palace') || name.includes('city') || name.includes('forbidden') || 
      name.includes('terracotta') || desc.includes('dynasty') || desc.includes('imperial') || desc.includes('ancient')) {
    return 'history';
  }
  if (name.includes('garden') || name.includes('park') || name.includes('mountain') || name.includes('lake') ||
      name.includes('river') || desc.includes('nature') || desc.includes('scenic')) {
    return 'nature';
  }
  if (name.includes('tower') || name.includes('bund') || name.includes('skyline') || desc.includes('modern')) {
    return 'modern';
  }
  if (name.includes('street') || name.includes('market') || name.includes('bazaar') || name.includes('hutong') ||
      desc.includes('shopping') || desc.includes('boutique')) {
    return 'shopping';
  }
  return 'landmark';
}

function parseDuration(durationStr) {
  if (!durationStr) return 2;
  const match = durationStr.match(/(\d+)/);
  if (match) {
    const hours = parseInt(match[1]);
    if (durationStr.toLowerCase().includes('half day')) return 4;
    if (durationStr.toLowerCase().includes('full day')) return 8;
    return hours;
  }
  return 2;
}

export default function PlaceSelector({ 
  cityId, 
  cityDays, 
  selectedPlaces, 
  onPlacesChange,
  pace 
}) {
  const [expandedCity, setExpandedCity] = useState(cityId);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const cityData = CITY_DATA[cityId];
  if (!cityData) return null;
  
  const daysForCity = cityDays || cityData.recommendedDays || 2;
  const places = cityData.highlights || [];
  
  const hoursPerDay = pace === 'relaxed' ? 4 : pace === 'moderate' ? 7 : 10;
  const totalAvailableHours = daysForCity * hoursPerDay;
  
  const selectedPlacesForCity = selectedPlaces[cityId] || [];
  
  const totalSelectedHours = useMemo(() => {
    return selectedPlacesForCity.reduce((sum, placeIndex) => {
      const place = places[placeIndex];
      return sum + parseDuration(place?.duration);
    }, 0);
  }, [selectedPlacesForCity, places]);
  
  const remainingHours = totalAvailableHours - totalSelectedHours;
  const isOverTime = remainingHours < 0;
  
  const filteredPlaces = useMemo(() => {
    return places.filter((place, index) => {
      const category = categorizePlace(place);
      const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
      const matchesSearch = !searchQuery || 
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (place.description || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).map((place, idx) => ({
      ...place,
      originalIndex: places.indexOf(place),
      category: categorizePlace(place)
    }));
  }, [places, selectedCategory, searchQuery]);
  
  const togglePlace = (originalIndex) => {
    const currentSelected = selectedPlacesForCity;
    const newSelected = currentSelected.includes(originalIndex)
      ? currentSelected.filter(i => i !== originalIndex)
      : [...currentSelected, originalIndex];
    
    onPlacesChange({
      ...selectedPlaces,
      [cityId]: newSelected
    });
  };
  
  const selectAll = () => {
    onPlacesChange({
      ...selectedPlaces,
      [cityId]: places.map((_, i) => i)
    });
  };
  
  const clearAll = () => {
    onPlacesChange({
      ...selectedPlaces,
      [cityId]: []
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={cityData.image} 
            alt={cityData.name}
            className="w-12 h-12 rounded-xl object-cover"
          />
          <div>
            <h3 className="font-bold text-slate-900">{cityData.name}</h3>
            <p className="text-sm text-slate-500">{daysForCity} days allocated</p>
          </div>
        </div>
        
        <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${
          isOverTime 
            ? 'bg-red-100 text-red-700' 
            : remainingHours < hoursPerDay 
            ? 'bg-amber-100 text-amber-700' 
            : 'bg-green-100 text-green-700'
        }`}>
          {isOverTime ? (
            <span className="flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              {Math.abs(remainingHours)}h over
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {remainingHours}h remaining
            </span>
          )}
        </div>
      </div>
      
      {isOverTime && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Too many places selected!</p>
              <p className="text-red-600">Either remove some places or add more days to {cityData.name}.</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search places..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={selectAll}
          className="text-xs"
        >
          Select All
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={clearAll}
          className="text-xs"
        >
          Clear
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {PLACE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#E60012] text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>
      
      <div className="text-xs text-slate-500 px-1">
        {selectedPlacesForCity.length} of {places.length} places selected • 
        {' '}{totalSelectedHours}h planned of {totalAvailableHours}h available
      </div>
      
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        {filteredPlaces.map((place) => {
          const isSelected = selectedPlacesForCity.includes(place.originalIndex);
          const duration = parseDuration(place.duration);
          
          return (
            <motion.button
              key={place.originalIndex}
              onClick={() => togglePlace(place.originalIndex)}
              className={`w-full text-left p-3 rounded-xl border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-[#E60012] bg-red-50/50'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex gap-3">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                  {place.coordinates && (
                    <img
                      src={`https://maps.googleapis.com/maps/api/staticmap?center=${place.coordinates.lat},${place.coordinates.lng}&zoom=15&size=100x100&maptype=roadmap&key=AIzaSyDummy`}
                      alt={place.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                    <span className="text-2xl">
                      {PLACE_CATEGORIES.find(c => c.id === place.category)?.icon || '📍'}
                    </span>
                  </div>
                  
                  {isSelected && (
                    <div className="absolute top-1 right-1 w-5 h-5 bg-[#E60012] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm leading-tight">
                        {place.name}
                      </h4>
                      {place.nameChinese && (
                        <p className="text-xs text-slate-500">{place.nameChinese}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500 flex-shrink-0">
                      <Clock className="w-3 h-3" />
                      <span>{duration}h</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {place.description}
                  </p>
                  
                  <div className="flex items-center gap-3 mt-2">
                    {place.ticketPrice && (
                      <span className="text-xs text-slate-500">
                        ¥{place.ticketPrice.rmb}
                      </span>
                    )}
                    {place.openingHours && (
                      <span className="text-xs text-slate-400 truncate">
                        {place.openingHours.split('(')[0]}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
        
        {filteredPlaces.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            <p>No places match your search</p>
          </div>
        )}
      </div>
    </div>
  );
}