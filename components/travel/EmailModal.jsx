import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Send, Check, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function EmailModal({ isOpen, onClose, itinerary, formData, savedItineraryId }) {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const cityNames = itinerary ? [...new Set(itinerary.map(d => d.city))].join(' → ') : '';
  const duration = formData?.duration || 7;
  const totalCost = itinerary?.reduce((sum, day) => sum + day.cost.usd, 0) || 0;

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://chinatourplan.com';
  const itineraryUrl = savedItineraryId ? `${baseUrl}/itinerary/${savedItineraryId}` : baseUrl;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setSending(true);

    try {
      const response = await fetch('/api/send-itinerary-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          duration,
          cities: cityNames,
          estimatedCost: totalCost,
          itineraryUrl,
          itinerary
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to send email');
      }

      setSent(true);
      toast.success('Itinerary sent to your email!');

      const emailHistory = JSON.parse(localStorage.getItem('emailHistory') || '[]');
      emailHistory.push({
        email,
        sentAt: new Date().toISOString(),
        tripDetails: {
          duration,
          cities: cityNames,
          estimatedCost: totalCost,
          itineraryUrl,
        },
      });
      localStorage.setItem('emailHistory', JSON.stringify(emailHistory));

      setTimeout(() => {
        onClose();
        setSent(false);
        setEmail('');
      }, 2000);
    } catch (error) {
      console.error('Email send error:', error);
      toast.error(error.message || 'Failed to send email. Please try again.');
    } finally {
      setSending(false);
    }
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
              <h3 className="text-xl font-bold text-slate-900">Email My Itinerary</h3>
              <p className="text-sm text-slate-500">Get your complete trip plan delivered to your inbox</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <div className="bg-gradient-to-r from-[#E60012]/10 to-amber-50 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#E60012] rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">{duration} Days in China</p>
                <p className="text-sm text-slate-600">{cityNames}</p>
                <p className="text-xs text-slate-500">Est. ${totalCost} USD</p>
              </div>
            </div>
          </div>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Email Sent!</h4>
              <p className="text-slate-600">Check your inbox for your complete itinerary.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-11"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={sending}
                className="w-full py-6 bg-[#E60012] hover:bg-[#cc0010] text-white"
              >
                {sending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Itinerary
                  </>
                )}
              </Button>

              <p className="text-xs text-slate-500 text-center mt-4">
                We'll send you a detailed PDF with your complete itinerary, maps, and travel tips.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
