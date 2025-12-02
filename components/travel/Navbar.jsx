import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Crown, User, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <Link href="/" className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-[#E60012] to-[#CC0010] rounded-2xl flex items-center justify-center shadow-xl shadow-red-500/30 border border-red-400/20">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2L19 8H13L16 2Z" fill="#FFD700"/>
                <path d="M16 6L18 10H14L16 6Z" fill="#FFA500"/>
                <path d="M5 12H27L24 28H8L5 12Z" fill="white"/>
                <path d="M8 14H24V26H8V14Z" fill="#FFD700" fillOpacity="0.2"/>
                <path d="M12 16H20V28H12V16Z" fill="white"/>
                <path d="M14 18H18V28H14V18Z" fill="#FFD700" fillOpacity="0.3"/>
                <path d="M15 20H17V28H15V20Z" fill="#E60012" fillOpacity="0.2"/>
                <path d="M8 12V10C8 10 11 7 16 7C21 7 24 10 24 10V12" stroke="white" strokeWidth="2"/>
                <circle cx="10" cy="22" r="1" fill="#E60012" fillOpacity="0.5"/>
                <circle cx="22" cy="22" r="1" fill="#E60012" fillOpacity="0.5"/>
              </svg>
            </div>
            <span className={`font-bold text-2xl tracking-tight ${scrolled ? 'text-slate-900' : 'text-slate-900'}`}>
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
            {user ? (
              <Link href="/dashboard">
                <Button 
                  variant="outline" 
                  className="border-[#E60012] text-[#E60012] hover:bg-[#E60012] hover:text-white"
                >
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/signup">
                  <Button variant="ghost" className="text-slate-700">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-[#E60012] hover:bg-[#cc0010] text-white">
                    <Crown className="w-4 h-4 mr-2" />
                    Join Pro
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
              <a href="#features" className="text-slate-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#gallery" className="text-slate-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Gallery</a>
              <a href="#reviews" className="text-slate-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Reviews</a>
              <a href="#pricing" className="text-slate-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
              <div className="border-t border-slate-200 pt-4 flex flex-col gap-3">
                {user ? (
                  <Link href="/dashboard">
                    <Button className="w-full bg-[#E60012] hover:bg-[#cc0010] text-white">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/signup">
                      <Button variant="outline" className="w-full">Sign In</Button>
                    </Link>
                    <Link href="/signup">
                      <Button className="w-full bg-[#E60012] hover:bg-[#cc0010] text-white">
                        <Crown className="w-4 h-4 mr-2" />
                        Join Pro
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
