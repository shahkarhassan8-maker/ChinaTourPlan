import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, MapPin, MessageCircle, Clock, 
  FileText, Globe, Shield, Wallet 
} from 'lucide-react';

const FEATURES = [
  {
    icon: Sparkles,
    title: 'AI-Powered Itineraries',
    description: 'Get personalized day-by-day plans tailored to your interests, pace, and budget.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: MapPin,
    title: 'Chinese Addresses',
    description: 'Every location includes addresses in Chinese characters for easy taxi rides and navigation.',
    color: 'bg-red-100 text-red-600',
  },
  {
    icon: MessageCircle,
    title: 'Essential Phrases',
    description: 'Key phrases in Chinese with pinyin pronunciation to help you communicate.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Clock,
    title: '24/7 Live Support',
    description: 'Real-time assistance via WeChat and WhatsApp when you need help in China.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: FileText,
    title: 'Offline Access',
    description: 'Download your complete itinerary as PDF for offline use without internet.',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    icon: Globe,
    title: 'Local Tips',
    description: 'Insider knowledge from locals - hidden gems, best times to visit, and scam avoidance.',
    color: 'bg-teal-100 text-teal-600',
  },
  {
    icon: Wallet,
    title: 'Budget Breakdown',
    description: 'Detailed cost estimates in both USD and RMB for transparent trip planning.',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    icon: Shield,
    title: 'Emergency Info',
    description: 'Hospital locations, emergency numbers, and embassy contacts for peace of mind.',
    color: 'bg-pink-100 text-pink-600',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E60012]/10 text-[#E60012] rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Why Choose Us
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Everything You Need for China
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Travel confidently with comprehensive tools and support designed specifically for exploring China
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg hover:bg-white transition-all duration-300 border border-transparent hover:border-slate-200"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
