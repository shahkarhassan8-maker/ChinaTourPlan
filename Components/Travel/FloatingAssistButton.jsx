import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function FloatingAssistButton({ onClick, showLabel = true }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Button
        onClick={onClick}
        className="group relative bg-gradient-to-r from-[#E60012] to-red-600 hover:from-[#cc0010] hover:to-red-700 text-white rounded-full shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all duration-300"
        style={{ padding: showLabel ? '16px 24px' : '16px' }}
      >
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-[#E60012] animate-ping opacity-25" />
        
        <MessageCircle className="w-5 h-5" />
        
        {showLabel && (
          <span className="ml-2 font-medium">Need Help?</span>
        )}
      </Button>
      
      {/* Tooltip on hover */}
      <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="bg-slate-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
          Get live translation support
          <div className="absolute top-full right-4 w-2 h-2 bg-slate-900 rotate-45 -mt-1" />
        </div>
      </div>
    </motion.div>
  );
}