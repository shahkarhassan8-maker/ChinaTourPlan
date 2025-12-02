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
                <circle cx="16" cy="16" r="12" fill="#FFD700" fillOpacity="0.2"/>
                <path d="M16 4C16 4 8 8 8 16C8 24 16 28 16 28C16 28 24 24 24 16C24 8 16 4 16 4Z" fill="white" fillOpacity="0.9"/>
                <path d="M16 6L17.5 10H14.5L16 6Z" fill="#FFD700"/>
                <path d="M11 12H21L20 14H12L11 12Z" fill="#E60012"/>
                <path d="M12 15H20V23C20 23 18 25 16 25C14 25 12 23 12 23V15Z" fill="white"/>
                <path d="M14 17H18V21H14V17Z" fill="#E60012" fillOpacity="0.15"/>
                <path d="M15 18H17V20H15V18Z" fill="#FFD700" fillOpacity="0.5"/>
                <circle cx="10" cy="16" r="1.5" fill="#FFD700"/>
                <circle cx="22" cy="16" r="1.5" fill="#FFD700"/>
                <path d="M13 10C13 10 14.5 11 16 11C17.5 11 19 10 19 10" stroke="#E60012" strokeWidth="1" strokeLinecap="round"/>
              </svg>
            </div>
            <span className={`font-bold text-2xl tracking-tight ${scrolled ? 'text-slate-900' : 'text-slate-900'}`}>
              ChinaTourPlan
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
