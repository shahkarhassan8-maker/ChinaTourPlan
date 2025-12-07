import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, MapPin, Calendar, Star, Lock } from 'lucide-react';
import { Button } from "@/components/ui/button";

const PREVIOUS_TRAVELERS = [
  {
    id: 1,
    name: 'Michael Chen',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    country: 'Canada',
    visitedCities: ['Beijing', 'Shanghai', 'Xi\'an'],
    tripDate: 'October 2024',
    rating: 5,
    bio: 'Solo traveler who spent 3 weeks exploring China. Happy to share tips about navigating the metro, best street food spots, and hidden gems!',
    whatsapp: '+1234567890',
    languages: ['English', 'Mandarin'],
  },
  {
    id: 2,
    name: 'Sarah Thompson',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    country: 'Australia',
    visitedCities: ['Chengdu', 'Zhangjiajie', 'Guilin'],
    tripDate: 'September 2024',
    rating: 5,
    bio: 'Family traveler with 2 kids. Can help with family-friendly activities, stroller accessibility, and kid-approved restaurants.',
    whatsapp: '+9876543210',
    languages: ['English'],
  },
  {
    id: 3,
    name: 'Ahmed Hassan',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    country: 'UAE',
    visitedCities: ['Beijing', 'Hangzhou', 'Hong Kong'],
    tripDate: 'November 2024',
    rating: 5,
    bio: 'Business traveler who knows the best halal restaurants and prayer facilities. Also explored many cultural sites on weekends.',
    whatsapp: '+971501234567',
    languages: ['English', 'Arabic'],
  },
  {
    id: 4,
    name: 'Emma Wilson',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    country: 'UK',
    visitedCities: ['Shanghai', 'Suzhou', 'Hangzhou'],
    tripDate: 'August 2024',
    rating: 5,
    bio: 'Photography enthusiast who discovered the best sunrise spots and scenic viewpoints. Can share my photography location guide!',
    whatsapp: '+447123456789',
    languages: ['English'],
  },
];

export default function PreviousTravelersSection({ isElite = false, onUpgrade }) {
  if (!isElite) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-amber-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Chat with Previous Travelers</h3>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            Connect with travelers who have visited your destinations. Get insider tips, recommendations, and real experiences directly from people who've been there!
          </p>
          <Button
            onClick={onUpgrade}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
          >
            <Star className="w-4 h-4 mr-2 fill-white" />
            Upgrade to Elite to Unlock
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Chat with Previous Travelers</h2>
          <p className="text-slate-500 text-sm">Connect with people who've visited these destinations</p>
        </div>
        <span className="ml-auto px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
          Elite Exclusive
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {PREVIOUS_TRAVELERS.map((traveler, index) => (
          <motion.div
            key={traveler.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-5 border border-slate-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex gap-4">
              <img
                src={traveler.photo}
                alt={traveler.name}
                className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(traveler.name)}&background=E60012&color=fff&size=150`;
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-slate-900">{traveler.name}</h3>
                    <p className="text-sm text-slate-500">{traveler.country}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(traveler.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {traveler.tripDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {traveler.visitedCities.length} cities
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <div className="flex flex-wrap gap-1 mb-2">
                {traveler.visitedCities.map((city) => (
                  <span
                    key={city}
                    className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full"
                  >
                    {city}
                  </span>
                ))}
              </div>
              <p className="text-sm text-slate-600 line-clamp-2">{traveler.bio}</p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex gap-1">
                {traveler.languages.map((lang) => (
                  <span key={lang} className="text-xs text-slate-400">
                    {lang}
                  </span>
                ))}
              </div>
              <a
                href={`https://wa.me/${traveler.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-xs text-slate-400 mt-6">
        All travelers have been verified and agreed to help fellow travelers. Please be respectful when reaching out.
      </p>
    </motion.div>
  );
}
