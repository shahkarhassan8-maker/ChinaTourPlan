import React from 'react';
import { motion } from 'framer-motion';
import { 
  Train, Utensils, MapPin, DollarSign, Lightbulb, 
  Hotel, Camera, Coffee, Clock
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export default function DayCard({ day, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: day.dayNumber * 0.1 }}
      className="relative pl-8 md:pl-12"
    >
      {/* Timeline connector */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200">
        {!isLast && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-200 rounded-full" />}
      </div>
      
      {/* Day marker */}
      <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 bg-[#E60012] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-red-500/30">
        {day.dayNumber}
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden mb-8">
        {/* Header */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={day.image} 
            alt={day.city}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
              <MapPin className="w-4 h-4" />
              <span>{day.city}</span>
            </div>
            <h3 className="text-xl font-bold text-white">{day.title}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Activities */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#E60012]" />
              Today's Highlights
            </h4>
            <div className="space-y-2">
              {day.activities.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E60012] mt-2 flex-shrink-0" />
                  <span className="text-slate-700">{activity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Transport */}
          {day.transport && (
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Train className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">{day.transport.type}</div>
                <div className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {day.transport.duration}
                </div>
              </div>
            </div>
          )}

          {/* Food Recommendation */}
          <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Utensils className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">Try: {day.food.name}</div>
              <div className="text-xs text-slate-500">{day.food.description}</div>
            </div>
          </div>

          {/* Hotel */}
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Hotel className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">{day.hotel.name}</div>
              <div className="text-xs text-slate-500">{day.hotel.type}</div>
            </div>
          </div>

          {/* Local Tip */}
          {day.tip && (
            <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-[#FFD700]/10 to-amber-100/50 rounded-xl border border-[#FFD700]/30">
              <div className="w-8 h-8 bg-[#FFD700] rounded-lg flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-4 h-4 text-amber-900" />
              </div>
              <div>
                <div className="text-xs font-bold text-amber-800 uppercase tracking-wide mb-1">Local Tip</div>
                <div className="text-sm text-amber-900">{day.tip}</div>
              </div>
            </div>
          )}

          {/* Cost */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <DollarSign className="w-4 h-4" />
              <span>Estimated Daily Cost</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-slate-900">¥{day.cost.rmb}</div>
              <div className="text-sm text-slate-500">≈ ${day.cost.usd}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}