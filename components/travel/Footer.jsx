import React from 'react';
import { MapPin, Mail, MessageCircle, Heart } from 'lucide-react';
import Link from 'next/link';

const CONTACT_INFO = {
  wechat: 'Shahkarhassan',
  whatsapp: 'https://wa.me/message/L2U465RFNFKME1',
  email: 'contact@chinatourplan.com',
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
              <span className="font-bold text-xl">ChinaTourPlan</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-sm">
              Making China travel accessible and stress-free for travelers worldwide. 
              Your complete guide to exploring the Middle Kingdom.
            </p>
            <div className="flex gap-4 flex-wrap">
              <div className="flex items-center gap-2 bg-green-500/20 px-3 py-2 rounded-lg">
                <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c4.8 0 8.691-3.288 8.691-7.343 0-4.053-3.891-7.34-8.691-7.34"/>
                </svg>
                <div>
                  <p className="text-xs text-green-400">WeChat</p>
                  <p className="font-medium text-white text-sm">{CONTACT_INFO.wechat}</p>
                </div>
              </div>
              <a href={CONTACT_INFO.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-500/20 px-3 py-2 rounded-lg hover:bg-green-500/30 transition-colors">
                <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <div>
                  <p className="text-xs text-green-400">WhatsApp</p>
                  <p className="font-medium text-white text-sm">Chat Now</p>
                </div>
              </a>
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
            © {new Date().getFullYear()} ChinaTourPlan. All rights reserved.
          </p>
          <p className="text-slate-400 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-[#E60012] fill-[#E60012]" /> for travelers
          </p>
        </div>
      </div>
    </footer>
  );
}
