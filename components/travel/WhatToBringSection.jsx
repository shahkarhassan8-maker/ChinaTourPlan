import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Luggage, Sun, Cloud, Snowflake, Leaf, 
  Shirt, Plug, Pill, FileText, CreditCard,
  Smartphone, Camera, Umbrella, ThermometerSun
} from 'lucide-react';

const SEASONS = {
  spring: {
    name: 'Spring (Mar-May)',
    icon: Leaf,
    color: 'green',
    weather: 'Mild temperatures (10-22°C / 50-72°F), occasional rain',
    tips: 'Weather can be unpredictable. Layers are essential.',
  },
  summer: {
    name: 'Summer (Jun-Aug)',
    icon: Sun,
    color: 'amber',
    weather: 'Hot and humid (25-35°C / 77-95°F), monsoon season',
    tips: 'Expect heat and humidity. Carry rain gear for sudden storms.',
  },
  autumn: {
    name: 'Autumn (Sep-Nov)',
    icon: Cloud,
    color: 'orange',
    weather: 'Pleasant temperatures (15-25°C / 59-77°F), less rain',
    tips: 'Best season to visit. Still pack light layers for evenings.',
  },
  winter: {
    name: 'Winter (Dec-Feb)',
    icon: Snowflake,
    color: 'blue',
    weather: 'Cold in north (−10-5°C / 14-41°F), mild in south (5-15°C / 41-59°F)',
    tips: 'Northern China is very cold. Southern regions are more temperate.',
  },
};

const PACKING_LIST = {
  clothing: {
    title: 'Clothing',
    icon: Shirt,
    items: {
      spring: [
        'Light jacket or cardigan',
        'Long pants and jeans',
        'T-shirts and long-sleeve shirts',
        'Light sweater for evenings',
        'Comfortable walking shoes',
        'Rain jacket or compact umbrella',
      ],
      summer: [
        'Light, breathable clothing',
        'Shorts and light pants',
        'Sun hat or cap',
        'Sunglasses',
        'Sandals and walking shoes',
        'Rain jacket (monsoon season)',
        'Light cardigan for AC',
      ],
      autumn: [
        'Layers (t-shirts + light sweaters)',
        'Light jacket',
        'Long pants',
        'Comfortable walking shoes',
        'Scarf for cooler evenings',
      ],
      winter: [
        'Heavy winter coat (north)',
        'Thermal underwear (north)',
        'Warm sweaters and fleece',
        'Warm hat, gloves, scarf',
        'Waterproof winter boots',
        'Light jacket (south only)',
      ],
    },
  },
  electronics: {
    title: 'Electronics & Gadgets',
    icon: Plug,
    items: {
      all: [
        'Universal power adapter (Type A, C, I)',
        'Portable phone charger (10,000+ mAh)',
        'Phone with essential apps installed',
        'Camera and memory cards',
        'Earbuds/headphones for trains',
        'Downloaded offline maps',
      ],
    },
  },
  documents: {
    title: 'Documents & Money',
    icon: FileText,
    items: {
      all: [
        'Valid passport (6+ months validity)',
        'Chinese visa (if required)',
        'Printed hotel confirmations',
        'Travel insurance documents',
        'Credit/debit cards',
        'Some US dollars or local currency',
        'Passport photos (for any registrations)',
        'Copies of important documents (digital + paper)',
      ],
    },
  },
  health: {
    title: 'Health & Toiletries',
    icon: Pill,
    items: {
      all: [
        'Prescription medications (with prescription)',
        'Basic first aid kit',
        'Hand sanitizer and wet wipes',
        'Sunscreen (especially summer)',
        'Insect repellent (summer)',
        'Motion sickness pills',
        'Stomach medicine (Pepto-Bismol)',
        'Personal toiletries',
        'Tissues (public restrooms may lack)',
      ],
    },
  },
};

export default function WhatToBringSection() {
  const [selectedSeason, setSelectedSeason] = useState('autumn');

  const getSeasonalItems = (category) => {
    if (category.items.all) {
      return category.items.all;
    }
    return category.items[selectedSeason] || [];
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
            <Luggage className="w-4 h-4" />
            Packing Guide
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            What to Bring to China
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Pack smart based on the season you're traveling. Select your travel season below for personalized recommendations.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {Object.entries(SEASONS).map(([key, season]) => (
            <button
              key={key}
              onClick={() => setSelectedSeason(key)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                selectedSeason === key
                  ? `border-${season.color}-500 bg-${season.color}-50`
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <season.icon className={`w-6 h-6 mb-2 ${
                selectedSeason === key ? `text-${season.color}-600` : 'text-slate-400'
              }`} />
              <h4 className={`font-semibold text-sm ${
                selectedSeason === key ? 'text-slate-900' : 'text-slate-600'
              }`}>
                {season.name}
              </h4>
            </button>
          ))}
        </div>

        <motion.div
          key={selectedSeason}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl mb-8"
        >
          <div className="flex items-start gap-4">
            <ThermometerSun className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-slate-900">{SEASONS[selectedSeason].name} Weather</h4>
              <p className="text-sm text-slate-700">{SEASONS[selectedSeason].weather}</p>
              <p className="text-sm text-blue-700 mt-1">💡 {SEASONS[selectedSeason].tips}</p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          {Object.entries(PACKING_LIST).map(([key, category], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-50 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <category.icon className="w-5 h-5 text-[#E60012]" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{category.title}</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-2">
                {getSeasonalItems(category).map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-white rounded-lg"
                  >
                    <div className="w-5 h-5 rounded border-2 border-slate-300 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-slate-400">✓</span>
                    </div>
                    <span className="text-sm text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 p-6 bg-amber-50 rounded-2xl border border-amber-200"
        >
          <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
            <Umbrella className="w-5 h-5" />
            China Travel Tips
          </h4>
          <ul className="space-y-2 text-sm text-amber-800">
            <li>• Many hotels provide toiletries, but not all - bring basics just in case</li>
            <li>• Download apps and maps before arriving - some aren't available in China</li>
            <li>• Pack light - you'll find great shopping opportunities for anything forgotten</li>
            <li>• Keep a small bag for day trips with essentials (phone charger, water, snacks)</li>
            <li>• Bring comfortable shoes - you'll walk a lot exploring cities and attractions</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
