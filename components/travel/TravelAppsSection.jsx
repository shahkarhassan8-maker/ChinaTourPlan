import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, AlertCircle, CheckCircle, ExternalLink, MessageCircle, CreditCard, Shield, Map, MapPin, Car, Train, Plane, UtensilsCrossed, Package, Star, BookOpen, Languages } from 'lucide-react';

const WeChatIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.045c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088v-.035h-.406zm-2.417 3.879c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
  </svg>
);

const AlipayIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M22.5 12c0 5.799-4.701 10.5-10.5 10.5S1.5 17.799 1.5 12 6.201 1.5 12 1.5 22.5 6.201 22.5 12zM6.81 8.381c-.088.088-.088.176 0 .264l1.142 1.141c.088.088.176.088.264 0l3.608-3.608c.088-.088.088-.176 0-.264l-1.141-1.141a.19.19 0 00-.265 0L6.81 8.381zm8.381 6.381a3.238 3.238 0 01-2.286-.947 3.238 3.238 0 01-.947-2.286c0-.917.335-1.7 1.006-2.346.67-.647 1.477-.97 2.421-.97.944 0 1.751.323 2.421.97.671.646 1.006 1.43 1.006 2.346 0 .882-.316 1.645-.947 2.286a3.238 3.238 0 01-2.286.947h-.388zm-1.482-3.233c0 .565.188 1.024.565 1.377.376.352.847.529 1.411.529s1.035-.177 1.412-.53c.376-.352.564-.81.564-1.376s-.188-1.024-.564-1.377c-.377-.352-.847-.529-1.412-.529-.564 0-1.035.177-1.411.53-.377.352-.565.81-.565 1.376z"/>
  </svg>
);

const ESSENTIAL_APPS = [
  {
    category: 'Must Have Apps',
    color: 'from-green-500 to-emerald-600',
    apps: [
      {
        name: 'WeChat',
        nameChinese: '微信',
        IconComponent: WeChatIcon,
        color: 'bg-green-500',
        textColor: 'text-white',
        description: 'Messaging, payments, mini-programs - the super app of China',
        mustHave: true,
        downloadUrl: 'https://www.wechat.com/',
      },
      {
        name: 'Alipay',
        nameChinese: '支付宝',
        IconComponent: CreditCard,
        color: 'bg-blue-500',
        textColor: 'text-white',
        description: 'Mobile payments accepted everywhere. Link your international card.',
        mustHave: true,
        downloadUrl: 'https://www.alipay.com/',
      },
      {
        name: 'VPN App',
        nameChinese: 'VPN',
        IconComponent: Shield,
        color: 'bg-purple-500',
        textColor: 'text-white',
        description: 'Access Google, WhatsApp, Instagram. Download BEFORE entering China!',
        mustHave: true,
        note: 'Download before China',
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
        IconComponent: Map,
        color: 'bg-blue-600',
        textColor: 'text-white',
        description: 'Best navigation in China. More accurate than Google Maps.',
        mustHave: true,
        downloadUrl: 'https://www.amap.com/',
      },
      {
        name: 'Baidu Maps',
        nameChinese: '百度地图',
        IconComponent: MapPin,
        color: 'bg-blue-500',
        textColor: 'text-white',
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
        IconComponent: Car,
        color: 'bg-orange-500',
        textColor: 'text-white',
        description: "China's Uber. English interface available.",
        mustHave: true,
        downloadUrl: 'https://www.didiglobal.com/',
      },
      {
        name: '12306',
        nameChinese: '铁路12306',
        IconComponent: Train,
        color: 'bg-blue-600',
        textColor: 'text-white',
        description: 'Official train booking app. Best prices for high-speed rail.',
        mustHave: true,
      },
      {
        name: 'Ctrip/Trip.com',
        nameChinese: '携程',
        IconComponent: Plane,
        color: 'bg-sky-500',
        textColor: 'text-white',
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
        IconComponent: UtensilsCrossed,
        color: 'bg-yellow-500',
        textColor: 'text-white',
        description: 'Food delivery, hotel deals, restaurant reviews.',
        mustHave: true,
        downloadUrl: 'https://www.meituan.com/',
      },
      {
        name: 'Eleme',
        nameChinese: '饿了么',
        IconComponent: Package,
        color: 'bg-blue-500',
        textColor: 'text-white',
        description: 'Food delivery alternative. Part of Alibaba.',
        mustHave: false,
      },
      {
        name: 'Dianping',
        nameChinese: '大众点评',
        IconComponent: Star,
        color: 'bg-orange-500',
        textColor: 'text-white',
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
        IconComponent: BookOpen,
        color: 'bg-green-600',
        textColor: 'text-white',
        description: 'Best Chinese dictionary. Scan text with camera.',
        mustHave: true,
      },
      {
        name: 'Google Translate',
        IconComponent: Languages,
        color: 'bg-blue-500',
        textColor: 'text-white',
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
                    <div className={`w-12 h-12 ${app.color} rounded-xl flex items-center justify-center ${app.textColor || 'text-white'}`}>
                      {app.IconComponent && <app.IconComponent className="w-6 h-6" />}
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
                    <div className="flex items-center gap-1 mt-2">
                      <AlertCircle className="w-3 h-3 text-amber-500" />
                      <p className="text-amber-600 text-xs font-medium">{app.note}</p>
                    </div>
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
