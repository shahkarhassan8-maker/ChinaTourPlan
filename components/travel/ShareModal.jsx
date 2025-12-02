import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Link2, Check, Twitter, Facebook, MessageCircle, Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ShareModal({ isOpen, onClose, itinerary, formData }) {
  const [copied, setCopied] = useState(false);
  
  const cityNames = itinerary ? [...new Set(itinerary.map(d => d.city))].join(', ') : '';
  const duration = formData?.duration || 7;
  
  const shareText = `Check out my ${duration}-day China trip to ${cityNames}! Planning made easy with China Travel Pro.`;
  const shareUrl = typeof window !== 'undefined' ? window.location.origin : 'https://chinatourplan.com';
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };
  
  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=550,height=420');
  };
  
  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'width=550,height=420');
  };
  
  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;
    window.open(url, '_blank');
  };
  
  const handleEmailShare = () => {
    const subject = encodeURIComponent(`My ${duration}-day China Trip Itinerary`);
    const body = encodeURIComponent(`${shareText}\n\n${shareUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Share Your Trip</h3>
              <p className="text-sm text-slate-500">Share your China adventure with friends and family</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-slate-700">{shareText}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 py-6"
              onClick={handleTwitterShare}
            >
              <Twitter className="w-5 h-5 text-[#1DA1F2]" />
              <span>Twitter</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 py-6"
              onClick={handleFacebookShare}
            >
              <Facebook className="w-5 h-5 text-[#4267B2]" />
              <span>Facebook</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 py-6"
              onClick={handleWhatsAppShare}
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              <span>WhatsApp</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 py-6"
              onClick={handleEmailShare}
            >
              <Mail className="w-5 h-5 text-slate-600" />
              <span>Email</span>
            </Button>
          </div>

          <Button
            onClick={handleCopyLink}
            className={`w-full py-6 ${copied ? 'bg-green-500 hover:bg-green-600' : 'bg-[#E60012] hover:bg-[#cc0010]'} text-white`}
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Link2 className="w-5 h-5 mr-2" />
                Copy Link
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
