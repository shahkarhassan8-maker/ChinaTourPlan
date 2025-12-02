import React from 'react';
import { MapPin, Mail, MessageCircle, Heart } from 'lucide-react';
import Link from 'next/link';

const CONTACT_INFO = {
  wechat: 'Shahkarhassan',
  whatsapp: 'Coming Soon',
  email: 'contact@tourtochina.com',
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#E60012] rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">TourToChina</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-sm">
              Making China travel accessible and stress-free for travelers worldwide. 
              Your complete guide to exploring the Middle Kingdom.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 bg-green-500/20 px-3 py-2 rounded-lg">
                <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c4.8 0 8.691-3.288 8.691-7.343 0-4.053-3.891-7.34-8.691-7.34"/>
                </svg>
                <div>
                  <p className="text-xs text-green-400">WeChat</p>
                  <p className="font-medium text-white text-sm">{CONTACT_INFO.wechat}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-slate-400">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Reviews</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><Link href="/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Popular Destinations</h4>
            <ul className="space-y-3 text-slate-400">
              <li><span className="hover:text-white transition-colors cursor-pointer">Beijing</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Shanghai</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Chengdu</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Guilin</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} TourToChina. All rights reserved.
          </p>
          <p className="text-slate-400 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-[#E60012] fill-[#E60012]" /> for travelers
          </p>
        </div>
      </div>
    </footer>
  );
}
