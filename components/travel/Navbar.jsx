import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { MapPin, Crown, User, Menu, X, Globe } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-200' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#E60012] rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className={`font-bold text-xl ${scrolled ? 'text-slate-900' : 'text-slate-900'}`}>
              TourToChina
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <a 
              href="#features" 
              className={`text-sm font-medium transition-colors ${
                scrolled ? 'text-slate-600 hover:text-slate-900' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Features
            </a>
            <a 
              href="#gallery" 
              className={`text-sm font-medium transition-colors ${
                scrolled ? 'text-slate-600 hover:text-slate-900' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Gallery
            </a>
            <a 
              href="#reviews" 
              className={`text-sm font-medium transition-colors ${
                scrolled ? 'text-slate-600 hover:text-slate-900' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Reviews
            </a>
            <a 
              href="#pricing" 
              className={`text-sm font-medium transition-colors ${
                scrolled ? 'text-slate-600 hover:text-slate-900' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Pricing
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? '中文' : 'EN'}</span>
            </button>
            {user ? (
              <Link href="/dashboard">
                <Button 
                  variant="outline" 
                  className="border-[#E60012] text-[#E60012] hover:bg-[#E60012] hover:text-white"
                >
                  <User className="w-4 h-4 mr-2" />
                  {t('nav.dashboard')}
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/signup">
                  <Button variant="ghost" className="text-slate-700">
                    {t('nav.signIn')}
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-[#E60012] hover:bg-[#cc0010] text-white">
                    <Crown className="w-4 h-4 mr-2" />
                    {t('nav.joinPro')}
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-900" />
            ) : (
              <Menu className="w-6 h-6 text-slate-900" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-slate-200 pt-4"
          >
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-slate-700 font-medium" onClick={() => setMobileMenuOpen(false)}>{t('nav.features')}</a>
              <a href="#gallery" className="text-slate-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Gallery</a>
              <a href="#reviews" className="text-slate-700 font-medium" onClick={() => setMobileMenuOpen(false)}>{t('nav.reviews')}</a>
              <a href="#pricing" className="text-slate-700 font-medium" onClick={() => setMobileMenuOpen(false)}>{t('nav.pricing')}</a>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-slate-700 font-medium"
              >
                <Globe className="w-4 h-4" />
                <span>{language === 'en' ? '切换到中文' : 'Switch to English'}</span>
              </button>
              <div className="border-t border-slate-200 pt-4 flex flex-col gap-3">
                {user ? (
                  <Link href="/dashboard">
                    <Button className="w-full bg-[#E60012] hover:bg-[#cc0010] text-white">
                      <User className="w-4 h-4 mr-2" />
                      {t('nav.dashboard')}
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/signup">
                      <Button variant="outline" className="w-full">{t('nav.signIn')}</Button>
                    </Link>
                    <Link href="/signup">
                      <Button className="w-full bg-[#E60012] hover:bg-[#cc0010] text-white">
                        <Crown className="w-4 h-4 mr-2" />
                        {t('nav.joinPro')}
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
