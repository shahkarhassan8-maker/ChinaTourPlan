import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    nav: {
      features: 'Features',
      reviews: 'Reviews',
      pricing: 'Pricing',
      signIn: 'Sign In',
      joinPro: 'Join Pro',
      dashboard: 'Dashboard',
    },
    hero: {
      badge: 'Explore the Middle Kingdom',
      title: 'China Travel,',
      titleHighlight: 'Demystified',
      subtitle: 'Get a custom itinerary, cost breakdown, and 24/7 live translation support in seconds.',
      cta: 'Start Planning',
      feature1: 'AI-Powered Itineraries',
      feature2: 'Trusted Local Tips',
      feature3: '24/7 Live Support',
    },
    features: {
      badge: 'Why Choose Us',
      title: 'Everything You Need for China',
      subtitle: 'Travel confidently with comprehensive tools and support designed specifically for exploring China',
      items: {
        aiItineraries: { title: 'AI-Powered Itineraries', desc: 'Get personalized day-by-day plans tailored to your interests, pace, and budget.' },
        chineseAddresses: { title: 'Chinese Addresses', desc: 'Every location includes addresses in Chinese characters for easy taxi rides and navigation.' },
        phrases: { title: 'Essential Phrases', desc: 'Key phrases in Chinese with pinyin pronunciation to help you communicate.' },
        support: { title: '24/7 Live Support', desc: 'Real-time assistance via WeChat and WhatsApp when you need help in China.' },
        offline: { title: 'Offline Access', desc: 'Download your complete itinerary as PDF for offline use without internet.' },
        localTips: { title: 'Local Tips', desc: 'Insider knowledge from locals - hidden gems, best times to visit, and scam avoidance.' },
        budget: { title: 'Budget Breakdown', desc: 'Detailed cost estimates in both USD and RMB for transparent trip planning.' },
        emergency: { title: 'Emergency Info', desc: 'Hospital locations, emergency numbers, and embassy contacts for peace of mind.' },
      },
    },
    reviews: {
      badge: 'Trusted by 5,000+ Travelers',
      title: 'What Our Travelers Say',
      subtitle: 'Real experiences from travelers who explored China with our detailed itineraries',
      verified: 'Verified',
      stats: {
        travelers: 'Happy Travelers',
        countries: 'Countries Served',
        rating: 'Average Rating',
        guarantee: 'Money Back Guarantee',
      },
    },
    footer: {
      description: 'Making China travel accessible and stress-free for travelers worldwide. Your complete guide to exploring the Middle Kingdom.',
      quickLinks: 'Quick Links',
      destinations: 'Popular Destinations',
      madeWith: 'Made with',
      forTravelers: 'for travelers',
    },
    itinerary: {
      ready: 'Your Detailed Itinerary is Ready!',
      daysInChina: 'Days in China',
      days: 'Days',
      cities: 'Cities',
      estTotal: 'Est. Total',
      startOver: 'Start Over',
      share: 'Share',
      save: 'Save Trip',
      saved: 'Saved!',
      email: 'Email Me',
      exportPdf: 'Export PDF',
      unlockTitle: 'Unlock Your Complete Travel Guide',
      unlockDesc: 'Get detailed addresses, Chinese phrases, maps & live support',
      getPremium: 'Get Premium',
      exactLocations: 'Exact Locations',
      chinesePhrases: 'Chinese Phrases',
      liveSupport: 'Live Support',
      offlineAccess: 'Offline Access',
    },
    share: {
      title: 'Share Your Trip',
      subtitle: 'Share your China adventure with friends and family',
      copyLink: 'Copy Link',
      copied: 'Copied!',
      twitter: 'Twitter',
      facebook: 'Facebook',
      whatsapp: 'WhatsApp',
      email: 'Email',
    },
    email: {
      title: 'Email My Itinerary',
      subtitle: 'Get your complete trip plan delivered to your inbox',
      emailLabel: 'Email Address',
      emailPlaceholder: 'Enter your email',
      send: 'Send Itinerary',
      sending: 'Sending...',
      success: 'Itinerary sent to your email!',
    },
    signup: {
      title: 'Join China Travel Pro',
      subtitle: 'Get unlimited access to detailed itineraries, live support, and exclusive travel perks.',
      loginTitle: 'Welcome Back!',
      loginSubtitle: 'Sign in to access your saved itineraries and premium features.',
      choosePlan: 'Choose Your Plan',
      pro: 'Pro',
      elite: 'Elite',
      oneTimePayment: 'One-time payment',
      perMonth: '/month',
      perYear: '/year',
      oneTime: 'one-time',
      save60: 'Save $60',
      popular: 'Popular',
      fullName: 'Full Name',
      email: 'Email Address',
      password: 'Password',
      startMembership: 'Start Membership',
      signIn: 'Sign In',
      alreadyHaveAccount: 'Already have an account?',
      noAccount: "Don't have an account?",
      benefits: {
        itineraries: { title: 'Unlimited Itineraries', desc: 'Create and save unlimited trip plans' },
        details: { title: 'Premium Details', desc: 'Chinese addresses, phrases & offline access' },
        support: { title: '24/7 Live Support', desc: 'WhatsApp & WeChat travel assistance' },
        deals: { title: 'Exclusive Deals', desc: 'Special hotel & tour discounts' },
      },
      guarantee: '30-Day Money Back Guarantee',
      guaranteeDesc: 'Not satisfied? Get a full refund, no questions asked.',
      securePayment: 'Secure Payment',
      instantAccess: 'Instant Access',
    },
    wizard: {
      duration: { title: 'Trip Duration', desc: 'How many days will you explore?' },
      cities: { title: 'Destinations', desc: 'Select your dream destinations (pick multiple!)' },
      cityDays: { title: 'Days per City', desc: 'Customize how long you stay in each city' },
      pace: { title: 'Travel Pace', desc: 'How do you like to travel?' },
      budget: { title: 'Budget Level', desc: "What's your comfort level?" },
      food: { title: 'Food Preferences', desc: 'Any dietary preferences?' },
      daysOfAdventure: 'days of adventure',
      destinationsSelected: 'destination(s) selected',
      searchDestinations: 'Search destinations...',
      continue: 'Continue',
      back: 'Back',
      generateItinerary: 'Generate Itinerary',
    },
  },
  zh: {
    nav: {
      features: '功能特色',
      reviews: '用户评价',
      pricing: '价格方案',
      signIn: '登录',
      joinPro: '加入会员',
      dashboard: '控制台',
    },
    hero: {
      badge: '探索中华大地',
      title: '中国旅行，',
      titleHighlight: '轻松规划',
      subtitle: '几秒钟内获取定制行程、费用明细和24/7实时翻译支持。',
      cta: '开始规划',
      feature1: 'AI智能行程',
      feature2: '本地专家建议',
      feature3: '24/7在线支持',
    },
    features: {
      badge: '为什么选择我们',
      title: '您的中国旅行必备',
      subtitle: '为您的中国之旅提供全方位的工具和支持',
      items: {
        aiItineraries: { title: 'AI智能行程', desc: '根据您的兴趣、节奏和预算量身定制每日计划。' },
        chineseAddresses: { title: '中文地址', desc: '每个地点都包含中文地址，方便打车和导航。' },
        phrases: { title: '常用短语', desc: '提供中文常用语和拼音发音，帮助您交流。' },
        support: { title: '24/7在线支持', desc: '通过微信和WhatsApp随时获取帮助。' },
        offline: { title: '离线访问', desc: '下载完整行程PDF，无需网络即可查看。' },
        localTips: { title: '本地攻略', desc: '本地人的私藏景点、最佳游览时间和防骗指南。' },
        budget: { title: '预算明细', desc: '提供美元和人民币双币种费用估算。' },
        emergency: { title: '紧急信息', desc: '医院位置、急救电话和大使馆联系方式。' },
      },
    },
    reviews: {
      badge: '5,000+位旅行者的信赖之选',
      title: '用户真实评价',
      subtitle: '来自使用我们详细行程探索中国的旅行者的真实体验',
      verified: '已验证',
      stats: {
        travelers: '满意旅行者',
        countries: '服务国家',
        rating: '平均评分',
        guarantee: '满意保证',
      },
    },
    footer: {
      description: '让中国旅行变得轻松无忧。您探索中华大地的完整指南。',
      quickLinks: '快速链接',
      destinations: '热门目的地',
      madeWith: '用心',
      forTravelers: '为旅行者打造',
    },
    itinerary: {
      ready: '您的详细行程已准备就绪！',
      daysInChina: '天中国之旅',
      days: '天数',
      cities: '城市',
      estTotal: '预估总费用',
      startOver: '重新开始',
      share: '分享',
      save: '保存行程',
      saved: '已保存！',
      email: '发送到邮箱',
      exportPdf: '导出PDF',
      unlockTitle: '解锁完整旅行指南',
      unlockDesc: '获取详细地址、中文短语、地图和在线支持',
      getPremium: '升级高级版',
      exactLocations: '精确位置',
      chinesePhrases: '中文短语',
      liveSupport: '在线支持',
      offlineAccess: '离线访问',
    },
    share: {
      title: '分享您的旅程',
      subtitle: '与亲朋好友分享您的中国冒险之旅',
      copyLink: '复制链接',
      copied: '已复制！',
      twitter: 'Twitter',
      facebook: 'Facebook',
      whatsapp: 'WhatsApp',
      email: '邮件',
    },
    email: {
      title: '发送行程到邮箱',
      subtitle: '将完整行程发送到您的收件箱',
      emailLabel: '邮箱地址',
      emailPlaceholder: '请输入邮箱',
      send: '发送行程',
      sending: '发送中...',
      success: '行程已发送到您的邮箱！',
    },
    signup: {
      title: '加入中国旅行Pro',
      subtitle: '获取无限行程定制、在线支持和专属旅行优惠。',
      loginTitle: '欢迎回来！',
      loginSubtitle: '登录以访问您保存的行程和会员功能。',
      choosePlan: '选择您的方案',
      pro: '专业版',
      elite: '精英版',
      oneTimePayment: '一次性付款',
      perMonth: '/月',
      perYear: '/年',
      oneTime: '一次性',
      save60: '节省$60',
      popular: '热门',
      fullName: '姓名',
      email: '邮箱地址',
      password: '密码',
      startMembership: '开始会员',
      signIn: '登录',
      alreadyHaveAccount: '已有账户？',
      noAccount: '没有账户？',
      benefits: {
        itineraries: { title: '无限行程', desc: '创建和保存无限旅行计划' },
        details: { title: '高级详情', desc: '中文地址、短语和离线访问' },
        support: { title: '24/7支持', desc: 'WhatsApp和微信旅行助手' },
        deals: { title: '专属优惠', desc: '特价酒店和旅游折扣' },
      },
      guarantee: '30天退款保证',
      guaranteeDesc: '不满意？全额退款，无需理由。',
      securePayment: '安全支付',
      instantAccess: '即时访问',
    },
    wizard: {
      duration: { title: '行程天数', desc: '您计划游玩多少天？' },
      cities: { title: '目的地', desc: '选择您的梦想目的地（可多选！）' },
      cityDays: { title: '每个城市的天数', desc: '自定义在每个城市的停留时间' },
      pace: { title: '旅行节奏', desc: '您喜欢什么样的旅行节奏？' },
      budget: { title: '预算水平', desc: '您的舒适度如何？' },
      food: { title: '饮食偏好', desc: '有什么饮食要求吗？' },
      daysOfAdventure: '天冒险之旅',
      destinationsSelected: '个目的地已选择',
      searchDestinations: '搜索目的地...',
      continue: '继续',
      back: '返回',
      generateItinerary: '生成行程',
    },
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang && (savedLang === 'en' || savedLang === 'zh')) {
      setLanguage(savedLang);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'zh' : 'en';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
