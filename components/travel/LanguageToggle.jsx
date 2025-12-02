import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/lib/LanguageContext';

export default function LanguageToggle({ variant = 'default' }) {
  const { language, toggleLanguage } = useLanguage();

  if (variant === 'compact') {
    return (
      <button
        onClick={toggleLanguage}
        className="flex items-center gap-1 px-2 py-1 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span>{language === 'en' ? '中文' : 'EN'}</span>
      </button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2"
    >
      <Globe className="w-4 h-4" />
      <span>{language === 'en' ? '中文' : 'English'}</span>
    </Button>
  );
}
