import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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

    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          if (userData.id) {
            setUser(userData);
          } else {
            setUser(null);
          }
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkUser();

    const handleStorageChange = (e) => {
      if (e.key === 'user') {
        checkUser();
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('storage', handleStorageChange);
    
    const intervalId = setInterval(checkUser, 1000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || mobileMenuOpen
          ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-200'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="relative flex-shrink-0">
              <Image
                src="/logo.jpg"
                alt="ChinaTourPlan Logo"
                width={160}
                height={60}
                priority
                className="object-contain"
                style={{ width: 'auto', height: '55px' }}
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className={`text-sm font-medium transition-colors ${scrolled ? 'text-slate-600 hover:text-slate-900' : 'text-slate-700 hover:text-slate-900'
                }`}
            >
              Features
            </a>
            <a
              href="#gallery"
              className={`text-sm font-medium transition-colors ${scrolled ? 'text-slate-600 hover:text-slate-900' : 'text-slate-700 hover:text-slate-900'
                }`}
            >
              Gallery
            </a>
            <a
              href="#reviews"
              className={`text-sm font-medium transition-colors ${scrolled ? 'text-slate-600 hover:text-slate-900' : 'text-slate-700 hover:text-slate-900'
                }`}
            >
              Reviews
            </a>
            {!user && (
              <a
                href="#pricing"
                className={`text-sm font-medium transition-colors ${scrolled ? 'text-slate-600 hover:text-slate-900' : 'text-slate-700 hover:text-slate-900'
                  }`}
              >
                Pricing
              </a>
            )}
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
            className="md:hidden mt-4 pb-4 border-t border-slate-200 pt-4 bg-white rounded-b-xl"
          >
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-slate-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#gallery" className="text-slate-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Gallery</a>
              <a href="#reviews" className="text-slate-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Reviews</a>
              {!user && <a href="#pricing" className="text-slate-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Pricing</a>}
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
