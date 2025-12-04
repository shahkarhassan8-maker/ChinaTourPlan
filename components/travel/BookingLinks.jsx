import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Plane, Hotel, Train, Search, Crown, MessageCircle } from 'lucide-react';

const BOOKING_LINKS = {
    flights: [
        {
            name: 'Trip.com',
            nameChinese: '携程',
            description: 'Best for international travelers',
            url: 'https://www.trip.com/flights/',
            logo: '✈️',
            color: 'from-blue-500 to-blue-600',
        },
        {
            name: 'Skyscanner',
            description: 'Compare all airlines',
            url: 'https://www.skyscanner.com/',
            logo: '🔍',
            color: 'from-cyan-500 to-cyan-600',
        },
        {
            name: 'Qunar',
            nameChinese: '去哪儿',
            description: 'Best prices for domestic China flights',
            url: 'https://www.qunar.com/',
            logo: '🛫',
            color: 'from-orange-500 to-red-500',
        },
    ],
    hotels: [
        {
            name: 'Meituan',
            nameChinese: '美团',
            description: 'Best local rates for China hotels',
            url: 'https://www.meituan.com/',
            logo: '🏨',
            color: 'from-yellow-500 to-orange-500',
            recommended: true,
        },
        {
            name: 'Trip.com Hotels',
            nameChinese: '携程酒店',
            description: 'English interface, good deals',
            url: 'https://www.trip.com/hotels/',
            logo: '🛏️',
            color: 'from-blue-500 to-blue-600',
        },
        {
            name: 'Booking.com',
            description: 'Free cancellation options',
            url: 'https://www.booking.com/',
            logo: '🏠',
            color: 'from-blue-600 to-blue-700',
        },
    ],
    trains: [
        {
            name: '12306',
            nameChinese: '铁路12306',
            description: 'Official China Railways app - Best prices',
            url: 'https://www.12306.cn/',
            logo: '🚄',
            color: 'from-blue-600 to-blue-700',
            recommended: true,
        },
        {
            name: 'Qunar Trains',
            nameChinese: '去哪儿火车票',
            description: 'Easy booking with English support',
            url: 'https://train.qunar.com/',
            logo: '🎫',
            color: 'from-orange-500 to-red-500',
        },
        {
            name: 'Trip.com Trains',
            nameChinese: '携程火车票',
            description: 'Book with passport, English UI',
            url: 'https://www.trip.com/trains/',
            logo: '🚂',
            color: 'from-emerald-500 to-emerald-600',
        },
    ],
};

export default function BookingLinks({ cities = [] }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Search className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Book Your Travel</h2>
                    <p className="text-slate-600">Essential apps for booking in China</p>
                </div>
            </div>

            {/* Elite VIP Booking Assistance */}
            {
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                            <Crown className="w-7 h-7" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                Elite VIP Booking Assistance
                                <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">Exclusive</span>
                            </h3>
                            <p className="text-white/80 text-sm">
                                We help you get the best rates on Meituan, 12306 trains, and flights!
                            </p>
                        </div>
                        <a
                            href="https://wa.me/message/L2U465RFNFKME1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-white text-amber-600 rounded-xl font-semibold hover:bg-amber-50 transition-colors flex items-center gap-2"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Contact Us
                        </a>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/20">
                        <div className="text-center">
                            <div className="text-2xl mb-1">🏨</div>
                            <p className="text-sm font-medium">Hotel Discounts</p>
                            <p className="text-xs text-white/60">Via Meituan</p>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl mb-1">🚄</div>
                            <p className="text-sm font-medium">Train Booking</p>
                            <p className="text-xs text-white/60">Via 12306</p>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl mb-1">✈️</div>
                            <p className="text-sm font-medium">Flight Deals</p>
                            <p className="text-xs text-white/60">Best Prices</p>
                        </div>
                    </div>
                </motion.div>
            }

            {/* Flights */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <Plane className="w-5 h-5 text-blue-500" />
                    <h3 className="font-semibold text-slate-900">Flights to China</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    {BOOKING_LINKS.flights.map((link, index) => (
                        <motion.a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`bg-gradient-to-r ${link.color} rounded-xl p-4 text-white hover:scale-105 transition-transform cursor-pointer group relative`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-2xl">{link.logo}</span>
                                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <h4 className="font-bold">{link.name}</h4>
                            {link.nameChinese && <p className="text-white/60 text-xs">{link.nameChinese}</p>}
                            <p className="text-white/80 text-sm mt-1">{link.description}</p>
                        </motion.a>
                    ))}
                </div>
            </div>

            {/* Hotels */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <Hotel className="w-5 h-5 text-orange-500" />
                    <h3 className="font-semibold text-slate-900">Hotels in China</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    {BOOKING_LINKS.hotels.map((link, index) => (
                        <motion.a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`bg-gradient-to-r ${link.color} rounded-xl p-4 text-white hover:scale-105 transition-transform cursor-pointer group relative`}
                        >
                            {link.recommended && (
                                <span className="absolute -top-2 -right-2 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                                    Best Rates
                                </span>
                            )}
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-2xl">{link.logo}</span>
                                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <h4 className="font-bold">{link.name}</h4>
                            {link.nameChinese && <p className="text-white/60 text-xs">{link.nameChinese}</p>}
                            <p className="text-white/80 text-sm mt-1">{link.description}</p>
                        </motion.a>
                    ))}
                </div>
            </div>

            {/* Trains */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <Train className="w-5 h-5 text-emerald-500" />
                    <h3 className="font-semibold text-slate-900">Train Tickets</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    {BOOKING_LINKS.trains.map((link, index) => (
                        <motion.a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`bg-gradient-to-r ${link.color} rounded-xl p-4 text-white hover:scale-105 transition-transform cursor-pointer group relative`}
                        >
                            {link.recommended && (
                                <span className="absolute -top-2 -right-2 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                                    Official
                                </span>
                            )}
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-2xl">{link.logo}</span>
                                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <h4 className="font-bold">{link.name}</h4>
                            {link.nameChinese && <p className="text-white/60 text-xs">{link.nameChinese}</p>}
                            <p className="text-white/80 text-sm mt-1">{link.description}</p>
                        </motion.a>
                    ))}
                </div>
            </div>

            <p className="text-center text-slate-500 text-sm mt-6">
                💡 Tip: Download apps before arriving in China for easier booking
            </p>
        </motion.div>
    );
}
