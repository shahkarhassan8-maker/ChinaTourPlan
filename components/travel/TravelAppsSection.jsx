import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';

// App data with icons/logos
const ESSENTIAL_APPS = [
  {
    category: 'Must Have Apps',
    color: 'from-green-500 to-emerald-600',
    apps: [
      {
        name: 'WeChat',
        nameChinese: '微信',
        icon: '💬',
        color: 'bg-green-500',
        description: 'Messaging, payments, mini-programs - the super app of China',
        mustHave: true,
        downloadUrl: 'https://www.wechat.com/',
      },
      {
        name: 'Alipay',
        nameChinese: '支付宝',
        icon: '💳',
        color: 'bg-blue-500',
        description: 'Mobile payments accepted everywhere. Link your international card.',
        mustHave: true,
        downloadUrl: 'https://www.alipay.com/',
      },
      {
        name: 'VPN App',
        nameChinese: 'VPN',
        icon: '🔐',
        color: 'bg-purple-500',
        description: 'Access Google, WhatsApp, Instagram. Download BEFORE entering China!',
        mustHave: true,
        note: '⚠️ Download before China',
      },
    ]
  },
  {
    category: 'Navigation & Maps',
    color: 'from-blue-500 to-blue-600',
    apps: [
      {
        name: 'Amap (Gaode)',
        nameChinese: '高德地图',
        icon: '🗺️',
        color: 'bg-blue-600',
        description: 'Best navigation in China. More accurate than Google Maps.',
        mustHave: true,
        downloadUrl: 'https://www.amap.com/',
      },
      {
        name: 'Baidu Maps',
        nameChinese: '百度地图',
        icon: '📍',
        color: 'bg-blue-500',
        description: 'Alternative with good public transit directions.',
        mustHave: false,
      },
    ]
  },
  {
    category: 'Transportation',
    color: 'from-purple-500 to-purple-600',
    apps: [
      {
        name: 'Didi',
        nameChinese: '滴滴出行',
        icon: '🚕',
        color: 'bg-orange-500',
        description: "China's Uber. English interface available.",
        mustHave: true,
        downloadUrl: 'https://www.didiglobal.com/',
      },
      {
        name: '12306',
        nameChinese: '铁路12306',
        icon: '🚄',
        color: 'bg-blue-600',
        description: 'Official train booking app. Best prices for high-speed rail.',
        mustHave: true,
      },
      {
        name: 'Ctrip/Trip.com',
        nameChinese: '携程',
        icon: '✈️',
        color: 'bg-blue-500',
        description: 'Book trains, flights, hotels with English support.',
        mustHave: true,
        downloadUrl: 'https://www.trip.com/',
      },
    ]
  },
  {
    category: 'Food & Hotels',
    color: 'from-orange-500 to-red-500',
    apps: [
      {
        name: 'Meituan',
        nameChinese: '美团',
        icon: '🍜',
        color: 'bg-yellow-500',
        description: 'Food delivery, hotel deals, restaurant reviews.',
        mustHave: true,
        downloadUrl: 'https://www.meituan.com/',
      },
      {
        name: 'Eleme',
        nameChinese: '饿了么',
        icon: '🥡',
        color: 'bg-blue-500',
        description: 'Food delivery alternative. Part of Alibaba.',
        mustHave: false,
      },
      {
        name: 'Dianping',
        nameChinese: '大众点评',
        icon: '⭐',
        color: 'bg-orange-500',
        description: "China's Yelp. Find best local restaurants.",
        mustHave: false,
      },
    ]
  },
  {
    category: 'Translation',
    color: 'from-teal-500 to-cyan-600',
    apps: [
      {
        name: 'Pleco',
        icon: '📖',
        color: 'bg-green-600',
        description: 'Best Chinese dictionary. Scan text with camera.',
        mustHave: true,
      },
      {
        name: 'Google Translate',
        icon: '🌐',
        color: 'bg-blue-500',
        description: 'Offline download Chinese. Camera translation.',
        mustHave: true,
        note: 'Download offline pack',
      },
    ]
  },
];

export default function TravelAppsSection({ isPremium = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
          <Smartphone className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Essential Apps for China</h2>
          <p className="text-slate-600">Download these before your trip</p>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-amber-800">Important: Download VPN before entering China</p>
          <p className="text-amber-700 text-sm">Google, WhatsApp, Instagram, and Facebook are blocked in China. Download a VPN app while you still have access.</p>
        </div>
      </div>

      {/* App Categories */}
      <div className="space-y-8">
        {ESSENTIAL_APPS.map((category, catIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: catIndex * 0.1 }}
          >
            <h3 className={`font-bold text-lg mb-4 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
              {category.category}
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {category.apps.map((app, appIndex) => (
                <motion.div
                  key={app.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: catIndex * 0.1 + appIndex * 0.05 }}
                  className={`bg-white rounded-xl p-4 border-2 transition-all hover:shadow-lg ${app.mustHave ? 'border-green-200 hover:border-green-400' : 'border-slate-200 hover:border-slate-300'
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 ${app.color} rounded-xl flex items-center justify-center text-2xl`}>
                      {app.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900">{app.name}</h4>
                        {app.mustHave && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      {app.nameChinese && (
                        <p className="text-slate-500 text-xs">{app.nameChinese}</p>
                      )}
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm mt-3">{app.description}</p>
                  {app.note && (
                    <p className="text-amber-600 text-xs mt-2 font-medium">{app.note}</p>
                  )}
                  {app.downloadUrl && (
                    <a
                      href={app.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-500 text-sm mt-2 hover:text-blue-600"
                    >
                      Download <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 bg-slate-50 rounded-xl p-4 text-center">
        <p className="text-slate-600 text-sm">
          💡 <strong>Pro Tip:</strong> Set up WeChat and Alipay with your international card before arriving in China
        </p>
      </div>
    </motion.div>
  );
}
