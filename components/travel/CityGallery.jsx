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
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516496636080-14fb876e029d?w=800&q=80&auto=format&fit=crop',
    ]
  },
  shanghai: {
    name: 'Shanghai',
    nameChinese: '上海',
    description: 'A dazzling metropolis where East meets West. The Bund showcases colonial architecture while Pudong gleams with futuristic towers.',
    specialties: ['The Bund', 'Yu Garden', 'Xiaolongbao', 'French Concession', 'Nanjing Road'],
    images: [
      'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548919973-5cef591cdbc9?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=800&q=80&auto=format&fit=crop',
    ]
  },
  chengdu: {
    name: 'Chengdu',
    nameChinese: '成都',
    description: 'Home to giant pandas and the spiciest cuisine in China. A laid-back city famous for tea houses and mahjong culture.',
    specialties: ['Giant Pandas', 'Sichuan Hot Pot', 'Jinli Street', 'Tea Houses', 'Mapo Tofu'],
    images: [
      'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?w=800&q=80&auto=format&fit=crop',
    ]
  },
  xian: {
    name: "Xi'an",
    nameChinese: '西安',
    description: 'Ancient Silk Road starting point with the world-famous Terracotta Warriors. The ancient city wall is one of the best preserved in China.',
    specialties: ['Terracotta Warriors', 'City Wall Cycling', 'Muslim Quarter', 'Biangbiang Noodles', 'Roujiamo'],
    images: [
      'https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1569839333583-7375336cde4b?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603202662747-00e33e7d1468?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80&auto=format&fit=crop',
    ]
  },
  guilin: {
    name: 'Guilin & Yangshuo',
    nameChinese: '桂林阳朔',
    description: 'Stunning karst landscapes that inspired countless Chinese paintings. The Li River cruise offers some of China\'s most iconic scenery.',
    specialties: ['Li River Cruise', 'Karst Mountains', 'Longji Rice Terraces', 'Bamboo Rafting', 'Moon Hill'],
    images: [
      'https://images.unsplash.com/photo-1537531383496-f4749b8032cf?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513415564515-763d91423bdd?w=800&q=80&auto=format&fit=crop',
    ]
  },
  hangzhou: {
    name: 'Hangzhou',
    nameChinese: '杭州',
    description: 'Paradise on Earth with the legendary West Lake. Famous for Longjing tea, silk, and the stunning Lingyin Temple.',
    specialties: ['West Lake Boat Ride', 'Longjing Tea Plantation', 'Lingyin Temple', 'Hefang Street', 'Leifeng Pagoda'],
    images: [
      'https://images.unsplash.com/photo-1598887142487-3c854d51eabb?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1470004914212-05527e49370b?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584466977773-e625c37cdd50?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517309230475-6736d926b979?w=800&q=80&auto=format&fit=crop',
    ]
  },
  zhangjiajie: {
    name: 'Zhangjiajie',
    nameChinese: '张家界',
    description: "The inspiration for Avatar's floating mountains. Home to the world's highest glass bridge and breathtaking pillar formations.",
    specialties: ['Avatar Mountains', 'Glass Skywalk Bridge', 'Tianmen Mountain', 'Baofeng Lake', 'Golden Whip Stream'],
    images: [
      'https://images.unsplash.com/photo-1513415564515-763d91423bdd?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564221710304-0b37c8b9d729?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560813962-ff3d8fcf59ba?w=800&q=80&auto=format&fit=crop',
    ]
  },
  hongkong: {
    name: 'Hong Kong',
    nameChinese: '香港',
    description: 'Where traditional temples meet towering skyscrapers. A culinary paradise with world-class dim sum and street food.',
    specialties: ['Victoria Peak', 'Dim Sum', 'Star Ferry', 'Temple Street Night Market', 'Big Buddha'],
    images: [
      'https://images.unsplash.com/photo-1506970845246-18f21d533b20?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576788369575-4ab045b9287e?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518599807935-37015b9cefcb?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80&auto=format&fit=crop',
    ]
  },
};

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80&auto=format&fit=crop';

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
                className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image container */}
                <div className="relative aspect-[4/3] md:aspect-video rounded-xl md:rounded-2xl overflow-hidden">
                  <ImageWithFallback
                    src={CITY_GALLERY_DATA[selectedCity].images[currentImageIndex]}
                    alt={CITY_GALLERY_DATA[selectedCity].name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation buttons - smaller on mobile */}
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-black/50 hover:bg-black/70 active:bg-black/80 rounded-full text-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                  
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-black/50 hover:bg-black/70 active:bg-black/80 rounded-full text-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </div>

                {/* City info - below image on mobile for better touch */}
                <div className="mt-3 md:mt-0 md:absolute md:bottom-4 md:left-4 md:right-4">
                  <div className="bg-black/80 md:bg-black/60 backdrop-blur-sm rounded-xl p-3 md:p-4 text-white">
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
