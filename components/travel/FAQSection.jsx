import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, MessageCircle, Globe } from 'lucide-react';

const FAQ_DATA = [
  {
    category: 'Before You Go',
    questions: [
      {
        q: 'Do I need a visa to visit China?',
        a: 'Most foreign visitors need a visa. However, China offers 144-hour visa-free transit for citizens of 54 countries when entering through specific cities (Beijing, Shanghai, Guangzhou, etc.) and traveling to a third country. Check the latest requirements based on your nationality.'
      },
      {
        q: 'What\'s the best time to visit China?',
        a: 'Spring (April-May) and Autumn (September-October) offer the best weather for most destinations. Avoid the Golden Week holidays (early October, early May, Chinese New Year) due to extreme crowds and higher prices.'
      },
      {
        q: 'Do I need travel insurance?',
        a: 'Yes, we strongly recommend comprehensive travel insurance that covers medical emergencies, trip cancellation, and evacuation. Medical care in China can be expensive for foreigners, and hospitals often require upfront payment.'
      },
      {
        q: 'Should I get any vaccinations?',
        a: 'No mandatory vaccinations are required, but consult your doctor about recommended vaccines like Hepatitis A, Typhoid, and ensuring routine vaccinations are up to date. Bring a copy of your vaccination records.'
      },
    ]
  },
  {
    category: 'Money & Payments',
    questions: [
      {
        q: 'Can I use credit cards in China?',
        a: 'International credit cards have limited acceptance. Most local businesses only accept WeChat Pay or Alipay. Set up Alipay with your international card before arriving - it now supports foreign credit cards for tourists.'
      },
      {
        q: 'Should I bring cash?',
        a: 'Bring some US dollars to exchange for emergencies. Cash (RMB) is useful for small vendors and rural areas. ATMs are widely available in cities, but inform your bank before traveling to avoid card blocks.'
      },
      {
        q: 'What is the currency in China?',
        a: 'The currency is Chinese Yuan (CNY/RMB). Common denominations are ¥1, ¥5, ¥10, ¥20, ¥50, and ¥100 notes. Keep small bills handy for taxis and small purchases.'
      },
    ]
  },
  {
    category: 'Getting Around',
    questions: [
      {
        q: 'How do I get around in Chinese cities?',
        a: 'Metro systems in major cities are excellent, clean, and affordable. Download Didi (Chinese Uber) for taxis. For walking directions, use Amap or Baidu Maps instead of Google Maps. Buses are cheap but can be confusing for non-Chinese speakers.'
      },
      {
        q: 'How do I book trains in China?',
        a: 'Use Trip.com (Ctrip) with an English interface. Book high-speed trains (G-trains) in advance, especially during holidays. You\'ll need your passport to book and board. Show up at least 30 minutes early for security checks.'
      },
      {
        q: 'Is Uber available in China?',
        a: 'No, Uber doesn\'t operate in China. Use Didi instead - it works similarly and has an English version. You can pay through Alipay linked to your international card.'
      },
    ]
  },
  {
    category: 'Communication & Internet',
    questions: [
      {
        q: 'Can I use WhatsApp and Google in China?',
        a: 'No, WhatsApp, Google services, Facebook, Instagram, and many Western sites are blocked. You\'ll need a VPN - download and test it before arriving in China. WeChat is the main communication app locals use.'
      },
      {
        q: 'How do I get internet access?',
        a: 'Options include: 1) Rent a pocket WiFi device at the airport, 2) Buy a local SIM card (need passport), 3) Use your home carrier\'s international roaming (expensive), 4) Buy an eSIM before traveling. Hotel WiFi is usually available.'
      },
      {
        q: 'Do people speak English in China?',
        a: 'English is limited outside tourist areas and major hotels. Download Google Translate with the offline Chinese pack. Learn a few basic phrases like "Hello" (Nǐ hǎo 你好) and "Thank you" (Xièxiè 谢谢). Show written Chinese addresses to taxi drivers.'
      },
    ]
  },
  {
    category: 'Food & Health',
    questions: [
      {
        q: 'Is tap water safe to drink?',
        a: 'No, don\'t drink tap water. Buy bottled water (widely available and cheap) or boiled water. Restaurants typically serve boiled water or tea. Be careful with ice in drinks at smaller establishments.'
      },
      {
        q: 'What about food allergies and dietary restrictions?',
        a: 'Write your dietary restrictions in Chinese to show restaurant staff. Vegetarian/vegan options exist but may still contain meat-based seasonings. Peanuts and sesame are common in Chinese cuisine. For severe allergies, carry Chinese allergy cards.'
      },
      {
        q: 'Is street food safe to eat?',
        a: 'Generally yes, especially at busy stalls with high turnover. Watch the cooking process - freshly cooked food is safest. Start with milder options if you have a sensitive stomach. Popular tourist areas have safer options.'
      },
    ]
  },
  {
    category: 'Safety & Etiquette',
    questions: [
      {
        q: 'Is China safe for tourists?',
        a: 'China is very safe for tourists with low crime rates. Petty theft can occur in crowded areas, so keep valuables secure. The main concerns are traffic (always cross carefully) and pollution in winter (bring masks if needed).'
      },
      {
        q: 'What are important cultural customs to know?',
        a: 'Don\'t tip (not customary in China). Remove shoes when entering homes. Use both hands to give/receive business cards or gifts. Don\'t point with your finger - use an open hand. Avoid discussing sensitive political topics.'
      },
      {
        q: 'Can I take photos everywhere?',
        a: 'Most tourist sites allow photography, but flash may be prohibited in museums. Don\'t photograph military installations, police, or anything with "No Photography" signs. Ask permission before photographing people, especially in ethnic minority areas.'
      },
    ]
  },
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors rounded-lg px-2"
      >
        <span className="font-medium text-slate-900 pr-4">{question}</span>
        <ChevronDown 
          className={`w-5 h-5 text-slate-500 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-2 pb-4 text-slate-600 text-sm leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQSection() {
  const [expandedCategory, setExpandedCategory] = useState('Before You Go');

  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-full text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            Frequently Asked Questions
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Everything You Need to Know
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Get answers to common questions about traveling in China
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {FAQ_DATA.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setExpandedCategory(cat.category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                expandedCategory === cat.category
                  ? 'bg-[#E60012] text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {FAQ_DATA.map((cat) => (
          expandedCategory === cat.category && (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-4 pb-4 border-b border-slate-200">
                {cat.category}
              </h3>
              <div className="space-y-1">
                {cat.questions.map((item, index) => (
                  <FAQItem key={index} question={item.q} answer={item.a} />
                ))}
              </div>
            </motion.div>
          )
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 p-6 bg-gradient-to-r from-[#E60012]/10 to-amber-50 rounded-2xl text-center"
        >
          <MessageCircle className="w-10 h-10 text-[#E60012] mx-auto mb-3" />
          <h4 className="font-bold text-slate-900 mb-2">Still Have Questions?</h4>
          <p className="text-slate-600 text-sm mb-4">
            Our travel experts are here to help you plan the perfect trip
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <div className="flex items-center justify-center gap-2 px-4 py-2 bg-green-100 rounded-lg">
              <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c4.8 0 8.691-3.288 8.691-7.343 0-4.053-3.891-7.34-8.691-7.34"/>
              </svg>
              <span className="text-sm font-medium text-green-800">WeChat: Shahkarhassan</span>
            </div>
            <div className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 rounded-lg">
              <Globe className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">24/7 Support Available</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
