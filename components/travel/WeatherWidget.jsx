import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, RefreshCw } from 'lucide-react';

// Weather data for major Chinese cities (seasonal averages)
const CITY_WEATHER = {
    beijing: {
        name: 'Beijing',
        nameChinese: '北京',
        seasons: {
            spring: { temp: 15, condition: 'Partly Cloudy', humidity: 45, wind: 12, icon: 'cloud-sun' },
            summer: { temp: 30, condition: 'Hot & Humid', humidity: 75, wind: 8, icon: 'sun' },
            autumn: { temp: 18, condition: 'Clear & Cool', humidity: 50, wind: 10, icon: 'sun' },
            winter: { temp: -2, condition: 'Cold & Dry', humidity: 35, wind: 15, icon: 'cloud' },
        },
    },
    shanghai: {
        name: 'Shanghai',
        nameChinese: '上海',
        seasons: {
            spring: { temp: 18, condition: 'Mild & Rainy', humidity: 70, wind: 10, icon: 'cloud-rain' },
            summer: { temp: 32, condition: 'Hot & Humid', humidity: 85, wind: 8, icon: 'sun' },
            autumn: { temp: 22, condition: 'Pleasant', humidity: 65, wind: 10, icon: 'cloud-sun' },
            winter: { temp: 6, condition: 'Cold & Damp', humidity: 70, wind: 12, icon: 'cloud' },
        },
    },
    xian: {
        name: "Xi'an",
        nameChinese: '西安',
        seasons: {
            spring: { temp: 16, condition: 'Warm & Dusty', humidity: 50, wind: 15, icon: 'wind' },
            summer: { temp: 28, condition: 'Hot', humidity: 65, wind: 8, icon: 'sun' },
            autumn: { temp: 15, condition: 'Cool & Clear', humidity: 55, wind: 10, icon: 'cloud-sun' },
            winter: { temp: 2, condition: 'Cold', humidity: 60, wind: 10, icon: 'cloud' },
        },
    },
    chengdu: {
        name: 'Chengdu',
        nameChinese: '成都',
        seasons: {
            spring: { temp: 18, condition: 'Overcast', humidity: 75, wind: 6, icon: 'cloud' },
            summer: { temp: 26, condition: 'Humid & Cloudy', humidity: 85, wind: 5, icon: 'cloud-rain' },
            autumn: { temp: 18, condition: 'Foggy', humidity: 80, wind: 5, icon: 'cloud' },
            winter: { temp: 8, condition: 'Misty', humidity: 80, wind: 5, icon: 'cloud' },
        },
    },
    guilin: {
        name: 'Guilin',
        nameChinese: '桂林',
        seasons: {
            spring: { temp: 20, condition: 'Rainy Season', humidity: 80, wind: 8, icon: 'cloud-rain' },
            summer: { temp: 30, condition: 'Hot & Wet', humidity: 85, wind: 6, icon: 'cloud-rain' },
            autumn: { temp: 22, condition: 'Pleasant', humidity: 70, wind: 8, icon: 'cloud-sun' },
            winter: { temp: 10, condition: 'Cool', humidity: 75, wind: 10, icon: 'cloud' },
        },
    },
    hangzhou: {
        name: 'Hangzhou',
        nameChinese: '杭州',
        seasons: {
            spring: { temp: 17, condition: 'Mild & Green', humidity: 70, wind: 10, icon: 'cloud-sun' },
            summer: { temp: 32, condition: 'Hot & Humid', humidity: 80, wind: 8, icon: 'sun' },
            autumn: { temp: 20, condition: 'Pleasant', humidity: 65, wind: 8, icon: 'sun' },
            winter: { temp: 5, condition: 'Cold & Damp', humidity: 75, wind: 12, icon: 'cloud' },
        },
    },
    zhangjiajie: {
        name: 'Zhangjiajie',
        nameChinese: '张家界',
        seasons: {
            spring: { temp: 16, condition: 'Misty', humidity: 80, wind: 8, icon: 'cloud' },
            summer: { temp: 28, condition: 'Warm & Wet', humidity: 85, wind: 6, icon: 'cloud-rain' },
            autumn: { temp: 18, condition: 'Best Views', humidity: 70, wind: 8, icon: 'cloud-sun' },
            winter: { temp: 5, condition: 'Cold & Foggy', humidity: 80, wind: 10, icon: 'cloud' },
        },
    },
};

const getWeatherIcon = (iconType) => {
    switch (iconType) {
        case 'sun': return <Sun className="w-8 h-8 text-amber-400" />;
        case 'cloud': return <Cloud className="w-8 h-8 text-slate-400" />;
        case 'cloud-rain': return <CloudRain className="w-8 h-8 text-blue-400" />;
        case 'cloud-sun': return <Sun className="w-8 h-8 text-amber-300" />;
        case 'wind': return <Wind className="w-8 h-8 text-slate-400" />;
        default: return <Cloud className="w-8 h-8 text-slate-400" />;
    }
};

const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
};

export default function WeatherWidget({ cities = ['beijing'] }) {
    const [currentSeason, setCurrentSeason] = useState(getCurrentSeason());
    const [isLoading, setIsLoading] = useState(false);

    const refreshWeather = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 500);
    };

    const filteredCities = cities
        .map(city => city.toLowerCase().replace(/[^a-z]/g, ''))
        .filter(city => CITY_WEATHER[city])
        .slice(0, 4);

    if (filteredCities.length === 0) {
        filteredCities.push('beijing');
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-6 text-white"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <Thermometer className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Weather Forecast</h3>
                        <p className="text-white/70 text-sm capitalize">{currentSeason} in China</p>
                    </div>
                </div>
                <button
                    onClick={refreshWeather}
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                    <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {/* Season Selector */}
            <div className="flex gap-2 mb-4 bg-white/10 rounded-xl p-1">
                {['spring', 'summer', 'autumn', 'winter'].map(season => (
                    <button
                        key={season}
                        onClick={() => setCurrentSeason(season)}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors capitalize ${currentSeason === season
                                ? 'bg-white text-blue-600'
                                : 'text-white/80 hover:bg-white/20'
                            }`}
                    >
                        {season}
                    </button>
                ))}
            </div>

            {/* City Weather Cards */}
            <div className="grid grid-cols-2 gap-3">
                {filteredCities.map((cityId, index) => {
                    const city = CITY_WEATHER[cityId];
                    const weather = city?.seasons[currentSeason];
                    if (!city || !weather) return null;

                    return (
                        <motion.div
                            key={cityId}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/10 rounded-xl p-4"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <p className="font-semibold">{city.name}</p>
                                    <p className="text-white/60 text-xs">{city.nameChinese}</p>
                                </div>
                                {getWeatherIcon(weather.icon)}
                            </div>
                            <div className="text-3xl font-bold mb-1">{weather.temp}°C</div>
                            <p className="text-white/80 text-sm mb-2">{weather.condition}</p>
                            <div className="flex items-center gap-4 text-xs text-white/60">
                                <span className="flex items-center gap-1">
                                    <Droplets className="w-3 h-3" />
                                    {weather.humidity}%
                                </span>
                                <span className="flex items-center gap-1">
                                    <Wind className="w-3 h-3" />
                                    {weather.wind} km/h
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <p className="text-white/50 text-xs mt-4 text-center">
                * Seasonal averages. Check forecast before travel.
            </p>
        </motion.div>
    );
}
