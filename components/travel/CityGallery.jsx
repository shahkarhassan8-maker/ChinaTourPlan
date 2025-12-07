import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { Button } from "@/components/ui/button";

const CITY_GALLERY_DATA = {
  beijing: {
    name: 'Beijing',
    nameChinese: '北京',
    description: 'The ancient capital where imperial palaces meet modern skyscrapers. Home to the majestic Forbidden City and the iconic Great Wall.',
    specialties: ['Peking Duck', 'Great Wall', 'Forbidden City', 'Temple of Heaven', 'Hutong Alleys'],
    images: [
      '/gallery/beijing_forbidden_ci_3d92628e.jpg',
      '/gallery/beijing_forbidden_ci_f8e6ac96.jpg',
      '/gallery/beijing_forbidden_ci_cefa3e84.jpg',
      '/gallery/beijing_forbidden_ci_b56fc88e.jpg',
    ]
  },
  shanghai: {
    name: 'Shanghai',
    nameChinese: '上海',
    description: 'A dazzling metropolis where East meets West. The Bund showcases colonial architecture while Pudong gleams with futuristic towers.',
    specialties: ['The Bund', 'Yu Garden', 'Xiaolongbao', 'French Concession', 'Nanjing Road'],
    images: [
      '/gallery/shanghai_bund_pudong_0abe3633.jpg',
      '/gallery/shanghai_bund_pudong_3c4a1aa2.jpg',
      '/gallery/shanghai_bund_pudong_335ad24e.jpg',
      '/gallery/shanghai_bund_pudong_5b2cbebd.jpg',
    ]
  },
  chengdu: {
    name: 'Chengdu',
    nameChinese: '成都',
    description: 'Home to giant pandas and the spiciest cuisine in China. A laid-back city famous for tea houses and mahjong culture.',
    specialties: ['Giant Pandas', 'Sichuan Hot Pot', 'Jinli Street', 'Tea Houses', 'Mapo Tofu'],
    images: [
      '/gallery/chengdu_giant_panda__67795690.jpg',
      '/gallery/chengdu_giant_panda__bb1aef8d.jpg',
      '/gallery/chengdu_giant_panda__9747f266.jpg',
      '/gallery/chengdu_giant_panda__e4dcd236.jpg',
    ]
  },
  xian: {
    name: "Xi'an",
    nameChinese: '西安',
    description: 'Ancient Silk Road starting point with the world-famous Terracotta Warriors. The ancient city wall is one of the best preserved in China.',
    specialties: ['Terracotta Warriors', 'City Wall Cycling', 'Muslim Quarter', 'Biangbiang Noodles', 'Roujiamo'],
    images: [
      '/gallery/xian_china_terracot_0abd0ed3.jpg',
      '/gallery/xian_china_terracot_0b6463f7.jpg',
      '/gallery/xian_china_terracot_c9c89f94.jpg',
      '/gallery/xian_china_terracot_8862ef4b.jpg',
    ]
  },
  guilin: {
    name: 'Guilin & Yangshuo',
    nameChinese: '桂林阳朔',
    description: 'Stunning karst landscapes that inspired countless Chinese paintings. The Li River cruise offers some of China\'s most iconic scenery.',
    specialties: ['Li River Cruise', 'Karst Mountains', 'Longji Rice Terraces', 'Bamboo Rafting', 'Moon Hill'],
    images: [
      '/gallery/guilin_li_river_kars_48468f4f.jpg',
      '/gallery/guilin_li_river_kars_023b6545.jpg',
      '/gallery/guilin_li_river_kars_1c204737.jpg',
      '/gallery/guilin_li_river_kars_a91db4a9.jpg',
    ]
  },
  hangzhou: {
    name: 'Hangzhou',
    nameChinese: '杭州',
    description: 'Paradise on Earth with the legendary West Lake. Famous for Longjing tea, silk, and the stunning Lingyin Temple.',
    specialties: ['West Lake Boat Ride', 'Longjing Tea Plantation', 'Lingyin Temple', 'Hefang Street', 'Leifeng Pagoda'],
    images: [
      '/gallery/hangzhou_west_lake_c_3192226a.jpg',
      '/gallery/hangzhou_west_lake_c_2016c468.jpg',
      '/gallery/hangzhou_west_lake_c_018296fc.jpg',
      '/gallery/hangzhou_west_lake_c_6056928c.jpg',
    ]
  },
  zhangjiajie: {
    name: 'Zhangjiajie',
    nameChinese: '张家界',
    description: "The inspiration for Avatar's floating mountains. Home to the world's highest glass bridge and breathtaking pillar formations.",
    specialties: ['Avatar Mountains', 'Glass Skywalk Bridge', 'Tianmen Mountain', 'Baofeng Lake', 'Golden Whip Stream'],
    images: [
      '/gallery/zhangjiajie_avatar_m_0f0d757d.jpg',
      '/gallery/zhangjiajie_avatar_m_64a4f436.jpg',
      '/gallery/zhangjiajie_avatar_m_5f9f77a5.jpg',
      '/gallery/zhangjiajie_avatar_m_b8f5b513.jpg',
    ]
  },
  hongkong: {
    name: 'Hong Kong',
    nameChinese: '香港',
    description: 'Where traditional temples meet towering skyscrapers. A culinary paradise with world-class dim sum and street food.',
    specialties: ['Victoria Peak', 'Dim Sum', 'Star Ferry', 'Temple Street Night Market', 'Big Buddha'],
    images: [
      '/gallery/hong_kong_victoria_p_6a606bb1.jpg',
      '/gallery/hong_kong_victoria_p_4e71e215.jpg',
      '/gallery/hong_kong_victoria_p_7c5ab565.jpg',
      '/gallery/hong_kong_victoria_p_b39ca656.jpg',
    ]
  },
};

const FALLBACK_IMAGE = '/gallery/beijing_forbidden_ci_3d92628e.jpg';

function ImageWithFallback({ src, alt, className, ...props }) {
  const optimizedSrc = src.includes('unsplash.com') 
    ? src.replace('w=800', 'w=400').replace('q=80', 'q=60')
    : src;
  
  const [imgSrc, setImgSrc] = useState(optimizedSrc);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse" />
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={className}
        loading="lazy"
        onError={() => setImgSrc(FALLBACK_IMAGE)}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
    </div>
  );
}

export default function CityGallery() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const cities = Object.entries(CITY_GALLERY_DATA);

  const openGallery = (cityId) => {
    setSelectedCity(cityId);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => {
    setSelectedCity(null);
  };

  const nextImage = () => {
    if (selectedCity) {
      const images = CITY_GALLERY_DATA[selectedCity].images;
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedCity) {
      const images = CITY_GALLERY_DATA[selectedCity].images;
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E60012]/10 text-[#E60012] rounded-full text-sm font-medium mb-4">
            <Camera className="w-4 h-4" />
            Explore Destinations
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Discover China's Wonders
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From ancient imperial cities to breathtaking natural landscapes
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cities.map(([cityId, city], index) => (
            <motion.div
              key={cityId}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group cursor-pointer"
              onClick={() => openGallery(cityId)}
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src={city.images[0]}
                  alt={city.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-bold text-lg">{city.name}</h3>
                  <p className="text-sm text-white/80">{city.nameChinese}</p>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-4 h-4 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedCity && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-2 md:p-4"
              onClick={closeGallery}
            >
              {/* Close button - always visible at top right */}
              <button
                onClick={closeGallery}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-5xl w-full flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image container - shows full image without cropping */}
                <div className="relative w-full flex items-center justify-center bg-black/50 rounded-xl md:rounded-2xl overflow-hidden min-h-[50vh] max-h-[70vh]">
                  <ImageWithFallback
                    src={CITY_GALLERY_DATA[selectedCity].images[currentImageIndex]}
                    alt={CITY_GALLERY_DATA[selectedCity].name}
                    className="max-w-full max-h-[70vh] w-auto h-auto object-contain"
                  />
                </div>
                
                {/* Navigation buttons - positioned outside image for better visibility */}
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-black/70 hover:bg-black/90 active:bg-black rounded-full text-white transition-colors z-20 shadow-lg"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                </button>
                
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-black/70 hover:bg-black/90 active:bg-black rounded-full text-white transition-colors z-20 shadow-lg"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                </button>

                {/* City info - below image */}
                <div className="w-full mt-4 px-2">
                  <div className="bg-black/80 backdrop-blur-sm rounded-xl p-3 md:p-4 text-white max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#E60012] flex-shrink-0" />
                      <h3 className="font-bold text-lg md:text-xl">{CITY_GALLERY_DATA[selectedCity].name}</h3>
                      <span className="text-[#FFD700] text-sm md:text-base">{CITY_GALLERY_DATA[selectedCity].nameChinese}</span>
                    </div>
                    <p className="text-white/80 text-xs md:text-sm mb-3 line-clamp-2 md:line-clamp-none">
                      {CITY_GALLERY_DATA[selectedCity].description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {CITY_GALLERY_DATA[selectedCity].specialties.slice(0, 4).map((specialty, i) => (
                        <span
                          key={i}
                          className="px-2 md:px-3 py-1 bg-white/20 rounded-full text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                      {CITY_GALLERY_DATA[selectedCity].specialties.length > 4 && (
                        <span className="px-2 py-1 text-white/60 text-xs">
                          +{CITY_GALLERY_DATA[selectedCity].specialties.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Image indicators */}
                <div className="flex justify-center gap-2 mt-4">
                  {CITY_GALLERY_DATA[selectedCity].images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }}
                      className={`w-2.5 h-2.5 md:w-2 md:h-2 rounded-full transition-colors ${
                        i === currentImageIndex ? 'bg-white' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
