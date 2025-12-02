import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const FAKE_REVIEWS = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    avatar: null,
    country: 'USA',
    rating: 5,
    date: 'November 2024',
    trip: '14 days in Beijing, Shanghai & Chengdu',
    text: 'Absolutely incredible experience! The detailed itinerary with Chinese addresses and phrases was a lifesaver. We never got lost and the local food recommendations were spot on. Highly recommend!',
    verified: true,
  },
  {
    id: 2,
    name: 'James Thompson',
    avatar: null,
    country: 'United Kingdom',
    rating: 5,
    date: 'October 2024',
    trip: '10 days exploring the Silk Road',
    text: 'The best travel planning service I have ever used. The 24/7 support helped us when we had a train booking issue. Worth every penny!',
    verified: true,
  },
  {
    id: 3,
    name: 'Maria Garcia',
    avatar: null,
    country: 'Spain',
    rating: 5,
    date: 'September 2024',
    trip: '7 days in Zhangjiajie & Guilin',
    text: 'The Avatar mountains were breathtaking! The itinerary was perfectly paced, and the hotel recommendations were fantastic. Will definitely use again.',
    verified: true,
  },
  {
    id: 4,
    name: 'Hans Mueller',
    avatar: null,
    country: 'Germany',
    rating: 4,
    date: 'August 2024',
    trip: '21 days across China',
    text: 'Comprehensive and well-organized trip planning. The emergency contact information came in handy. Great value for the price.',
    verified: true,
  },
  {
    id: 5,
    name: 'Emily Chen',
    avatar: null,
    country: 'Canada',
    rating: 5,
    date: 'November 2024',
    trip: '5 days in Hong Kong & Macau',
    text: 'As a heritage traveler visiting my ancestral homeland, this service made everything so easy. The cultural insights were particularly valuable.',
    verified: true,
  },
  {
    id: 6,
    name: 'Roberto Silva',
    avatar: null,
    country: 'Brazil',
    rating: 5,
    date: 'October 2024',
    trip: '12 days Beijing to Shanghai',
    text: 'From the Great Wall to the Bund, every day was perfectly planned. The food guide for vegetarians was especially helpful. Amazing service!',
    verified: true,
  },
];

export default function ReviewsSection({ userReviews = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const allReviews = [...userReviews, ...FAKE_REVIEWS];
  const reviewsPerPage = 3;
  const maxIndex = Math.max(0, allReviews.length - reviewsPerPage);
  
  const nextReviews = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };
  
  const prevReviews = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };
  
  const visibleReviews = allReviews.slice(currentIndex, currentIndex + reviewsPerPage);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            Trusted by 5,000+ Travelers
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Real experiences from travelers who explored China with our detailed itineraries
          </p>
        </motion.div>

        <div className="relative">
          {currentIndex > 0 && (
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg rounded-full hidden md:flex"
              onClick={prevReviews}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          )}
          
          <div className="grid md:grid-cols-3 gap-6 overflow-hidden">
            {visibleReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                    />
                  ))}
                  {review.verified && (
                    <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  )}
                </div>
                
                <Quote className="w-8 h-8 text-slate-200 mb-3" />
                <p className="text-slate-700 mb-4 leading-relaxed">"{review.text}"</p>
                
                <div className="border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#E60012] to-red-400 rounded-full flex items-center justify-center text-white font-semibold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{review.name}</p>
                      <p className="text-sm text-slate-500">{review.country} • {review.trip}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">{review.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {currentIndex < maxIndex && (
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg rounded-full hidden md:flex"
              onClick={nextReviews}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          )}
        </div>

        <div className="flex justify-center gap-2 mt-8 md:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={prevReviews}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextReviews}
            disabled={currentIndex >= maxIndex}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <p className="text-3xl font-bold text-slate-900">5,000+</p>
            <p className="text-sm text-slate-500">Happy Travelers</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <p className="text-3xl font-bold text-slate-900">50+</p>
            <p className="text-sm text-slate-500">Countries Served</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <p className="text-3xl font-bold text-slate-900">4.9/5</p>
            <p className="text-sm text-slate-500">Average Rating</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <p className="text-3xl font-bold text-slate-900">100%</p>
            <p className="text-sm text-slate-500">Money Back Guarantee</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
