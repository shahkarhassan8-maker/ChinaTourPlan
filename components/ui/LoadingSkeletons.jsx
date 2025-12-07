import React from 'react';
import { motion } from 'framer-motion';

/**
 * Skeleton loading component for various UI elements
 */
export function Skeleton({ className = '', variant = 'text', width, height }) {
    const baseClasses = 'animate-pulse bg-slate-200 rounded';

    const variants = {
        text: 'h-4 w-full',
        title: 'h-8 w-3/4',
        avatar: 'h-12 w-12 rounded-full',
        button: 'h-10 w-24 rounded-lg',
        card: 'h-48 w-full rounded-xl',
        image: 'h-40 w-full rounded-xl',
    };

    const style = {
        ...(width && { width }),
        ...(height && { height }),
    };

    return (
        <div
            className={`${baseClasses} ${variants[variant] || ''} ${className}`}
            style={style}
        />
    );
}

/**
 * Skeleton for itinerary day card
 */
export function DayCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 animate-pulse">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-slate-200 rounded-xl" />
                <div className="flex-1">
                    <div className="h-6 bg-slate-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-slate-200 rounded w-1/2" />
                </div>
            </div>
            <div className="space-y-3">
                <div className="h-4 bg-slate-200 rounded w-full" />
                <div className="h-4 bg-slate-200 rounded w-5/6" />
                <div className="h-4 bg-slate-200 rounded w-4/6" />
            </div>
            <div className="flex gap-2 mt-4">
                <div className="h-8 bg-slate-200 rounded-full w-20" />
                <div className="h-8 bg-slate-200 rounded-full w-24" />
            </div>
        </div>
    );
}

/**
 * Skeleton for itinerary result loading
 */
export function ItineraryLoadingSkeleton() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            {/* Header Skeleton */}
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Skeleton variant="button" width="100px" />
                    <div className="flex gap-2">
                        <Skeleton variant="button" width="80px" />
                        <Skeleton variant="button" width="80px" />
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Generating Message */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#E60012]/10 text-[#E60012] rounded-full text-sm font-medium mb-4">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-[#E60012] border-t-transparent rounded-full"
                        />
                        Generating your personalized itinerary...
                    </div>
                    <p className="text-slate-500 text-sm">This may take a few moments</p>
                </motion.div>

                {/* Title Skeleton */}
                <div className="text-center mb-12 animate-pulse">
                    <div className="w-32 h-8 bg-slate-200 rounded-full mx-auto mb-6" />
                    <div className="h-12 bg-slate-200 rounded-xl w-2/3 mx-auto mb-4" />
                    <div className="h-6 bg-slate-200 rounded w-1/2 mx-auto" />

                    <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mt-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200">
                                <div className="w-8 h-8 bg-slate-200 rounded mx-auto mb-2" />
                                <div className="h-8 bg-slate-200 rounded w-16 mx-auto mb-2" />
                                <div className="h-4 bg-slate-200 rounded w-12 mx-auto" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Day Cards Skeleton */}
                <div className="space-y-6">
                    {[1, 2, 3].map(i => (
                        <DayCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}

/**
 * Skeleton for dashboard cards
 */
export function DashboardCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 animate-pulse">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <div className="h-6 bg-slate-200 rounded w-48 mb-2" />
                    <div className="h-4 bg-slate-200 rounded w-32" />
                </div>
                <div className="w-10 h-10 bg-slate-200 rounded-lg" />
            </div>
            <div className="flex gap-4 mb-4">
                <div className="h-6 bg-slate-200 rounded-full w-20" />
                <div className="h-6 bg-slate-200 rounded-full w-24" />
            </div>
            <div className="flex gap-2">
                <div className="h-10 bg-slate-200 rounded-lg flex-1" />
                <div className="h-10 bg-slate-200 rounded-lg w-20" />
            </div>
        </div>
    );
}

/**
 * Section loading skeleton
 */
export function SectionSkeleton({ rows = 3 }) {
    return (
        <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-1/3 mb-4" />
            <div className="space-y-3">
                {Array.from({ length: rows }).map((_, i) => (
                    <div key={i} className="h-4 bg-slate-200 rounded" style={{ width: `${100 - i * 10}%` }} />
                ))}
            </div>
        </div>
    );
}

/**
 * Animated loading dots
 */
export function LoadingDots({ color = '#E60012' }) {
    return (
        <div className="flex items-center gap-1">
            {[0, 1, 2].map(i => (
                <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: color }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.2,
                    }}
                />
            ))}
        </div>
    );
}

/**
 * Full page loading spinner with message
 */
export function PageLoading({ message = 'Loading...' }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
            >
                <div className="w-16 h-16 mx-auto mb-6 relative">
                    <motion.div
                        className="absolute inset-0 border-4 border-slate-200 rounded-full"
                    />
                    <motion.div
                        className="absolute inset-0 border-4 border-t-[#E60012] rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                </div>
                <p className="text-slate-600 text-lg">{message}</p>
            </motion.div>
        </div>
    );
}
