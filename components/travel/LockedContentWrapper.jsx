import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Crown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isPaidUser } from '@/lib/accessControl';

export default function LockedContentWrapper({
    children,
    title,
    description = "Unlock this premium content",
    onUpgrade,
    showHeading = true
}) {
    const isPremium = isPaidUser();

    if (isPremium) {
        return <>{children}</>;
    }

    return (
        <div className="relative">
            {/* Blurred content */}
            <div className="pointer-events-none select-none filter blur-sm opacity-40">
                {children}
            </div>

            {/* Overlay with lock message */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-white/60 via-white/80 to-white/90 backdrop-blur-sm"
            >
                <div className="text-center px-6 py-8 max-w-md">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#E60012] to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Lock className="w-8 h-8 text-white" />
                    </div>

                    {showHeading && (
                        <>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">
                                {title || "Premium Content"}
                            </h3>
                            <p className="text-slate-600 mb-6">
                                {description}
                            </p>
                        </>
                    )}

                    <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-center gap-2 text-sm text-slate-700">
                            <Sparkles className="w-4 h-4 text-[#E60012]" />
                            <span>Detailed information & insider tips</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-sm text-slate-700">
                            <Crown className="w-4 h-4 text-[#E60012]" />
                            <span>Available in Pro & Elite plans</span>
                        </div>
                    </div>

                    <Button
                        onClick={onUpgrade}
                        className="bg-gradient-to-r from-[#E60012] to-red-600 hover:from-[#cc0010] hover:to-red-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-red-500/30"
                    >
                        <Crown className="w-5 h-5 mr-2" />
                        Unlock Pro Access
                    </Button>

                    <p className="text-xs text-slate-500 mt-4">
                        One-time payment • Instant access • 30-day guarantee
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
