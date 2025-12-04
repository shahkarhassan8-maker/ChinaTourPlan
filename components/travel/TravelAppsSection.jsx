import React from 'react';
import { motion } from 'framer-motion';
import LockedContentWrapper from './LockedContentWrapper';
import {
  Smartphone, MessageCircle, MapPin, CreditCard,
  Train, Languages, Shield, Wifi, ShoppingBag, Camera
} from 'lucide-react';

const ESSENTIAL_APPS = [
  {
    category: 'Communication',
    icon: MessageCircle,
    color: 'green',
    apps: [
      {
        name: 'WeChat',
        nameChinese: '微信',
        description: 'Essential for payments, messaging, and social life in China. Most locals use this daily.',
        mustHave: true,
      },
      {
        name: 'VPN App',
        nameChinese: 'VPN',
        description: 'Access Google, WhatsApp, Facebook, Instagram. Download before arriving in China.',
        mustHave: true,
        note: 'Download before entering China'
      },
    ]
  },
  {
    category: 'Navigation & Maps',
    icon: MapPin,
    color: 'blue',
    apps: [
      {
        name: 'Amap (Gaode)',
        nameChinese: '高德地图',
        description: 'Best navigation app in China. More accurate than Google Maps for local streets.',
        mustHave: true,
      },
      {
        name: 'Baidu Maps',
        nameChinese: '百度地图',
        description: 'Alternative to Amap with good public transit directions.',
        mustHave: false,
      },
    ]
  },
  {
    category: 'Payments',
    icon: CreditCard,
    color: 'amber',
    apps: [
      {
        name: 'Alipay',
        nameChinese: '支付宝',
        description: 'Mobile payment accepted everywhere. Link your international card for payments.',
        mustHave: true,
      },
      {
        name: 'WeChat Pay',
        nameChinese: '微信支付',
        description: 'Built into WeChat. Another universal payment method in China.',
        mustHave: true,
      },
    ]
  },
  {
    category: 'Transportation',
    icon: Train,
    color: 'purple',
    apps: [
      {
        name: 'Trip.com (Ctrip)',
        nameChinese: '携程',
        description: 'Book trains, flights, and hotels. English interface available.',
        mustHave: true,
      },
      {
        name: 'Didi',
        nameChinese: '滴滴出行',
        description: 'China\'s Uber. Essential for getting taxis, especially in smaller cities.',
        mustHave: true,
      },
      {
        name: '12306',
        nameChinese: '铁路12306',
        description: 'Official train booking app. Requires Chinese phone number.',
        mustHave: false,
        note: 'Trip.com is easier for foreigners'
      },
    ]
  },
  {
    category: 'Translation',
    icon: Languages,
    color: 'red',
    apps: [
      {
        name: 'Google Translate',
        nameChinese: '谷歌翻译',
        description: 'Download Chinese offline pack. Camera translation is incredibly useful.',
        mustHave: true,
        note: 'Download offline pack before arrival'
      },
      {
        name: 'Pleco',
        nameChinese: 'Pleco',
        description: 'Best Chinese dictionary app with handwriting recognition.',
        mustHave: false,
      },
    ]
  },
  {
    category: 'Food & Shopping',
    icon: ShoppingBag,
    color: 'orange',
    apps: [
      {
        name: 'Meituan',
        nameChinese: '美团',
        description: 'Food delivery, restaurant bookings, attractions tickets, and more.',
        mustHave: false,
      },
      {
        name: 'Taobao',
        nameChinese: '淘宝',
        description: 'China\'s largest online shopping platform.',
        mustHave: false,
      },
    ]
  },
];

const AppCard = ({ app }) => (
  <div className={`p-4 bg-white rounded-xl border ${app.mustHave ? 'border-green-200 bg-green-50/30' : 'border-slate-200'}`}>
    <div className="flex items-start justify-between mb-2">
      <div>
        <h4 className="font-semibold text-slate-900">{app.name}</h4>
        <p className="text-sm text-[#E60012] font-medium">{app.nameChinese}</p>
      </div>
      {app.mustHave && (
        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
          Must Have
        </span>
      )}
    </div>
    <p className="text-sm text-slate-600 mb-2">{app.description}</p>
    {app.note && (
      <p className="text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded">
        💡 {app.note}
      </p>
    )}
  </div>
);

export default function TravelAppsSection({ onUpgrade }) {
  return (
    <section className="py-12 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            <Smartphone className="w-4 h-4" />
            Essential Apps for China
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Download Before You Go
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            These apps will make your China trip much smoother. Download them before arriving as some may not be available in China's app stores.
          </p>
        </motion.div>

        <LockedContentWrapper
          title="Essential Apps for China"
          description="Get the complete list of must-have apps with detailed setup instructions"
          onUpgrade={onUpgrade}
          showHeading={false}
        >
          <div className="space-y-8">
            {ESSENTIAL_APPS.map((category, catIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${category.color}-100`}>
                    <category.icon className={`w-5 h-5 text-${category.color}-600`} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{category.category}</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {category.apps.map((app, appIndex) => (
                    <AppCard key={appIndex} app={app} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 p-6 bg-gradient-to-r from-[#E60012]/10 to-amber-50 rounded-2xl border border-[#E60012]/20"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#E60012] rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-2">Pro Tip: Set Up Before You Leave</h4>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>• Download a reliable VPN and test it before traveling</li>
                  <li>• Set up WeChat and Alipay with your international bank card</li>
                  <li>• Download offline maps and translation packs</li>
                  <li>• Save important contacts and addresses in Chinese on your phone</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </LockedContentWrapper>
      </div>
    </section>
  );
}
