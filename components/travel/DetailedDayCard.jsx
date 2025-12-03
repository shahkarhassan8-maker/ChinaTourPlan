import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Train, Utensils, MapPin, DollarSign, Lightbulb, 
  Hotel, Camera, Clock, ChevronDown, ChevronUp, 
  Copy, ExternalLink, Navigation, MessageCircle, 
  Lock, Phone, Globe, Star, Sparkles, Image
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PhraseCard = ({ phrase, locked }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  if (locked) {
    return (
      <div className="flex items-center justify-between p-3 bg-slate-100 rounded-lg opacity-60">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-slate-400" />
          <span className="text-slate-400 text-sm">Premium phrase</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-amber-50 rounded-lg border border-red-100">
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-900">{phrase.english}</p>
        <p className="text-lg font-bold text-[#E60012]">{phrase.chinese}</p>
        <p className="text-xs text-slate-500 italic">{phrase.pinyin}</p>
      </div>
      <button 
        onClick={() => copyToClipboard(phrase.chinese)}
        className="p-2 hover:bg-white rounded-lg transition-colors"
      >
        <Copy className="w-4 h-4 text-slate-600" />
      </button>
    </div>
  );
};

const LocationCard = ({ item, type, locked }) => {
  const openInMaps = (coords, name) => {
    if (locked || !coords) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}`;
    window.open(url, '_blank');
  };

  const copyAddress = (address) => {
    if (locked) return;
    navigator.clipboard.writeText(address);
    toast.success('Address copied! Show this to your taxi driver.');
  };

  if (locked) {
    return (
      <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 opacity-60">
        <div className="flex items-center gap-3">
          <Lock className="w-5 h-5 text-slate-400" />
          <div>
            <p className="font-medium text-slate-400">Premium Content</p>
            <p className="text-sm text-slate-400">Unlock to see detailed location info</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold text-slate-900">{item.name}</h4>
          <p className="text-lg text-[#E60012] font-medium">{item.nameChinese}</p>
        </div>
        {item.ticketPrice && (
          <Badge className="bg-green-100 text-green-800">
            ¥{item.ticketPrice.rmb}
          </Badge>
        )}
      </div>

      {item.description && (
        <p className="text-sm text-slate-600">{item.description}</p>
      )}

      {/* Address Section */}
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-slate-700">{item.address}</p>
            <p className="text-sm font-medium text-[#E60012]">{item.addressChinese}</p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 text-xs"
            onClick={() => copyAddress(item.addressChinese)}
          >
            <Copy className="w-3 h-3 mr-1" />
            Copy for Taxi
          </Button>
          {item.coordinates && (
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1 text-xs"
              onClick={() => openInMaps(item.coordinates, item.name)}
            >
              <Navigation className="w-3 h-3 mr-1" />
              Open Maps
            </Button>
          )}
        </div>
      </div>

      {/* Opening Hours */}
      {item.openingHours && (
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-slate-400" />
          <span className="text-slate-600">{item.openingHours}</span>
        </div>
      )}

      {/* Tips */}
      {item.tips && (
        <div className="flex items-start gap-2 p-2 bg-amber-50 rounded-lg">
          <Lightbulb className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-amber-800">{item.tips}</p>
        </div>
      )}

      {/* Metro Info */}
      {item.metro && (
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-start gap-2">
            <Train className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-900">{item.metro.line}</p>
              <p className="text-sm text-blue-700">{item.metro.station}</p>
              {item.metro.exit && <p className="text-xs text-blue-600">{item.metro.exit}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Local Secrets / Insider Tips */}
      {item.localSecrets?.length > 0 && (
        <div className="pt-2 border-t border-slate-100">
          <p className="text-xs font-semibold text-[#E60012] uppercase tracking-wide mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Local Secrets
          </p>
          <ul className="space-y-2">
            {item.localSecrets.map((secret, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                <Star className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                {secret}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Best Photo Spots */}
      {item.bestPhotoSpots?.length > 0 && (
        <div className="pt-2 border-t border-slate-100">
          <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-2 flex items-center gap-1">
            <Image className="w-3 h-3" />
            Best Photo Spots
          </p>
          <div className="flex flex-wrap gap-2">
            {item.bestPhotoSpots.map((spot, idx) => (
              <span key={idx} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                {spot}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Phrases for this location */}
      {item.phrases && item.phrases.length > 0 && (
        <div className="pt-2 border-t border-slate-100">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1">
            <MessageCircle className="w-3 h-3" />
            Useful Phrases
          </p>
          <div className="space-y-2">
            {item.phrases.map((phrase, idx) => (
              <PhraseCard key={idx} phrase={phrase} locked={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function DetailedDayCard({ day, isLast, isPremium, onUpgrade }) {
  const [expanded, setExpanded] = useState(false);
  
  // Free users see first activity only, premium see all
  const visibleActivities = isPremium ? day.activities : day.activities.slice(0, 1);
  const lockedActivities = isPremium ? [] : day.activities.slice(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: day.dayNumber * 0.05 }}
      className="relative pl-8 md:pl-12"
    >
      {/* Timeline connector */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200">
        {!isLast && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-200 rounded-full" />}
      </div>
      
      {/* Day marker */}
      <div className="absolute left-0 top-0 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-[#E60012] to-red-700 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-red-500/30">
        {day.dayNumber}
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden mb-8">
        {/* Header Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={day.image} 
            alt={day.city}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 text-white/90 text-sm mb-1">
              <MapPin className="w-4 h-4" />
              <span>{day.city}</span>
              <span className="text-white/60">•</span>
              <span className="text-[#FFD700]">{day.cityChinese}</span>
            </div>
            <h3 className="text-xl font-bold text-white">{day.title}</h3>
          </div>
          
          {/* Day Cost Badge */}
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
            <div className="text-[#FFD700] font-bold">¥{day.cost.rmb}</div>
            <div className="text-white/70 text-xs">≈${day.cost.usd}</div>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm text-slate-600">
                <Camera className="w-4 h-4" />
                <span>{day.activities.length} activities</span>
              </div>
              {day.transport && (
                <div className="flex items-center gap-1 text-sm text-blue-600">
                  <Train className="w-4 h-4" />
                  <span>{day.transport.duration}</span>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="text-[#E60012]"
            >
              {expanded ? 'Show Less' : 'View Details'}
              {expanded ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
            </Button>
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-5 space-y-6">
                {/* Transport Section */}
                {day.transport && (
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <Train className="w-5 h-5" />
                      Getting There
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-blue-700">{day.transport.method}</p>
                        <p className="text-xs text-blue-600">{day.transport.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-900">¥{day.transport.price?.rmb || '—'}</p>
                        <p className="text-xs text-blue-600">{day.transport.station}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* AI Schedule with Times (if available) - Shows hotel check-in/out and timed activities */}
                {day.aiSchedule && day.aiSchedule.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[#E60012]" />
                      Day {day.dayNumber} Schedule
                    </h4>
                    <div className="space-y-3">
                      {day.aiSchedule.map((item, idx) => {
                        const isHotelActivity = item.type === 'hotel_checkout' || item.type === 'hotel_checkin';
                        const isMeal = item.type === 'meal' || item.activity?.toLowerCase().includes('lunch') || item.activity?.toLowerCase().includes('dinner') || item.activity?.toLowerCase().includes('breakfast');
                        
                        return (
                          <div 
                            key={idx} 
                            className={`flex gap-4 p-3 rounded-xl border ${
                              isHotelActivity 
                                ? 'bg-purple-50 border-purple-200' 
                                : isMeal 
                                ? 'bg-amber-50 border-amber-200'
                                : 'bg-white border-slate-200'
                            }`}
                          >
                            <div className="flex-shrink-0 w-16 text-center">
                              <div className={`font-bold ${isHotelActivity ? 'text-purple-700' : 'text-[#E60012]'}`}>
                                {item.time}
                              </div>
                              <div className="text-xs text-slate-500">{item.duration}</div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                {isHotelActivity && <Hotel className="w-4 h-4 text-purple-600" />}
                                {isMeal && <Utensils className="w-4 h-4 text-amber-600" />}
                                {!isHotelActivity && !isMeal && <MapPin className="w-4 h-4 text-[#E60012]" />}
                                <span className="font-medium text-slate-900">{item.activity}</span>
                              </div>
                              {item.activityChinese && (
                                <p className="text-sm text-[#E60012] font-medium">{item.activityChinese}</p>
                              )}
                              {item.notes && (
                                <p className="text-sm text-slate-600 mt-1">{item.notes}</p>
                              )}
                              {item.travelToNext && (
                                <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
                                  <Navigation className="w-3 h-3" />
                                  {item.travelToNext}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Activities Section - Always shows with premium gating */}
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Camera className="w-5 h-5 text-[#E60012]" />
                    {day.aiSchedule && day.aiSchedule.length > 0 ? 'Attraction Details' : `Day ${day.dayNumber} Activities`}
                  </h4>
                  <div className="space-y-4">
                    {visibleActivities.map((activity, idx) => (
                      <LocationCard key={idx} item={activity} type="activity" locked={false} />
                    ))}
                    
                    {/* Locked Activities */}
                    {lockedActivities.length > 0 && (
                      <div className="space-y-4">
                        {lockedActivities.map((activity, idx) => (
                          <LocationCard key={idx} item={activity} type="activity" locked={true} />
                        ))}
                        
                        {/* Upgrade CTA */}
                        <div className="p-4 bg-gradient-to-r from-[#E60012]/10 to-amber-100/50 rounded-xl border border-[#E60012]/20 text-center">
                          <Lock className="w-8 h-8 text-[#E60012] mx-auto mb-2" />
                          <h5 className="font-bold text-slate-900">Unlock {lockedActivities.length} More Activities</h5>
                          <p className="text-sm text-slate-600 mb-3">Get detailed addresses, Chinese phrases, and maps</p>
                          <Button 
                            onClick={onUpgrade}
                            className="bg-[#E60012] hover:bg-[#cc0010] text-white"
                          >
                            Unlock for $5
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Food Section */}
                {day.food && (
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Utensils className="w-5 h-5 text-amber-600" />
                      Food Recommendation
                    </h4>
                    <LocationCard item={day.food} type="food" locked={!isPremium} />
                  </div>
                )}

                {/* Hotel Section */}
                {day.hotel && (
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Hotel className="w-5 h-5 text-purple-600" />
                      Accommodation
                    </h4>
                    <LocationCard item={day.hotel} type="hotel" locked={!isPremium} />
                  </div>
                )}

                {/* Local Tips */}
                {day.tips && day.tips.length > 0 && (
                  <div className="p-4 bg-gradient-to-r from-[#FFD700]/20 to-amber-100/50 rounded-xl border border-[#FFD700]/30">
                    <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" />
                      Insider Tips
                    </h4>
                    <ul className="space-y-2">
                      {(isPremium ? day.tips : day.tips.slice(0, 1)).map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-amber-800">
                          <Star className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                      {!isPremium && day.tips.length > 1 && (
                        <li className="flex items-center gap-2 text-sm text-amber-600">
                          <Lock className="w-4 h-4" />
                          +{day.tips.length - 1} more tips (Premium)
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {/* Emergency Info - Always Free */}
                {day.emergencyInfo && (
                  <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                    <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      Emergency Info
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-red-700">Police:</span> {day.emergencyInfo.police}
                      </div>
                      <div>
                        <span className="text-red-700">Ambulance:</span> {day.emergencyInfo.ambulance}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}