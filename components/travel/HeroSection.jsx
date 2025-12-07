import React from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, Sparkles, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection({ onStartPlanning }) {
  const features = [
    { icon: Sparkles, text: "AI-Powered Itineraries" },
    { icon: Shield, text: "Trusted Local Tips" },
    { icon: Clock, text: "24/7 Live Support" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-20">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        {/* Badge - No delay for faster LCP */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-200 mb-8">
          <MapPin className="w-4 h-4 text-[#E60012]" />
          <span className="text-sm font-medium text-slate-700">Explore the Middle Kingdom</span>
        </div>

        {/* Main Headline - No delay for faster LCP */}
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
          China Travel,{' '}
          <span className="relative">
            <span className="text-[#E60012]">Demystified</span>
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
              <path d="M2 8C50 2 150 2 198 8" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
        </h1>

        {/* Subheadline - No delay for faster LCP */}
        <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Get a custom itinerary, cost breakdown, and 24/7 live translation support in seconds.
        </p>

        {/* CTA Button - Minimal delay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Button
            onClick={onStartPlanning}
            className="bg-[#E60012] hover:bg-[#cc0010] text-white px-10 py-7 text-lg font-semibold rounded-full shadow-lg shadow-red-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/30 hover:scale-105"
          >
            Start Planning
            <Sparkles className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-5 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200/80 shadow-sm"
            >
              <feature.icon className="w-4 h-4 text-[#E60012]" />
              <span className="text-sm font-medium text-slate-700">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Hero Image - Optimized with Next.js Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 relative"
        >
          <div className="relative mx-auto max-w-4xl">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/10 border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=70&auto=format&fit=crop"
                alt="Great Wall of China"
                width={800}
                height={450}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -left-4 md:-left-12 top-1/4 bg-white rounded-xl shadow-lg p-4 border border-slate-100 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg">🏯</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Forbidden City</p>
                  <p className="text-xs text-slate-500">Beijing • Day 1</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -right-4 md:-right-12 bottom-1/4 bg-white rounded-xl shadow-lg p-4 border border-slate-100 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg">🐼</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Panda Base</p>
                  <p className="text-xs text-slate-500">Chengdu • Day 4</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}