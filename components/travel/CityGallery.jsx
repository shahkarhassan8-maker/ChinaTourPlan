import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { Button } from "@/components/ui/button";

const CITY_GALLERY_DATA = {
  beijing: {
    name: 'Beijing',
    nameChinese: '北京',
    description: 'The ancient capital where imperial palaces meet modern skyscrapers',
    specialties: ['Peking Duck', 'Great Wall', 'Forbidden City', 'Temple of Heaven'],
    images: [
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1529921879218-f99546d03a96?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584114614576-49f6f4813ed7?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1537531383496-f4749b8032cf?w=800&q=80&auto=format&fit=crop',
    ]
  },
  shanghai: {
    name: 'Shanghai',
    nameChinese: '上海',
    description: 'A dazzling metropolis where East meets West in spectacular fashion',
    specialties: ['The Bund', 'Yu Garden', 'Xiaolongbao', 'French Concession'],
    images: [
      'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548919973-5cef591cdbc9?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517309246141-d22814846ee0?w=800&q=80&auto=format&fit=crop',
    ]
  },
  chengdu: {
    name: 'Chengdu',
    nameChinese: '成都',
    description: 'Home to giant pandas and the spiciest cuisine in China',
    specialties: ['Giant Pandas', 'Hot Pot', 'Jinli Street', 'Tea Houses'],
    images: [
      'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587381420270-0e20f2e31dd1?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&q=80&auto=format&fit=crop',
    ]
  },
  xian: {
    name: "Xi'an",
    nameChinese: '西安',
    description: 'Ancient Silk Road starting point with the famous Terracotta Warriors',
    specialties: ['Terracotta Warriors', 'City Wall', 'Muslim Quarter', 'Biangbiang Noodles'],
    images: [
      'https://images.unsplash.com/photo-1591104451049-5c4ddb3fb13c?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568791772916-c97e3dd88ac2?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80&auto=format&fit=crop',
    ]
  },
  guilin: {
    name: 'Guilin & Yangshuo',
    nameChinese: '桂林阳朔',
    description: 'Stunning karst landscapes that inspired countless Chinese paintings',
    specialties: ['Li River Cruise', 'Karst Mountains', 'Rice Terraces', 'Bamboo Rafting'],
    images: [
      'https://images.unsplash.com/photo-1533552337737-c97e3dec3f73?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1537531383496-f4749b8032cf?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580650051573-a7e70b0a3508?w=800&q=80&auto=format&fit=crop',
    ]
  },
  hangzhou: {
    name: 'Hangzhou',
    nameChinese: '杭州',
    description: 'Paradise on Earth with the legendary West Lake',
    specialties: ['West Lake', 'Longjing Tea', 'Lingyin Temple', 'Silk Market'],
    images: [
      'https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576016770956-debb63d92058?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598887142623-38433d3ed3e4?w=800&q=80&auto=format&fit=crop',
    ]
  },
  zhangjiajie: {
    name: 'Zhangjiajie',
    nameChinese: '张家界',
    description: "The inspiration for Avatar's floating mountains",
    specialties: ['Avatar Mountains', 'Glass Bridge', 'Tianmen Mountain', 'Baofeng Lake'],
    images: [
      'https://images.unsplash.com/photo-1513415564515-763d91423bdd?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564221710304-0b37c8b9d729?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80&auto=format&fit=crop',
    ]
  },
  hongkong: {
    name: 'Hong Kong',
    nameChinese: '香港',
    description: 'Where traditional temples meet towering skyscrapers',
    specialties: ['Victoria Peak', 'Dim Sum', 'Star Ferry', 'Temple Street'],
    images: [
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1536599018102-9f803c979b5d?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518599807935-37015b9cefcb?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1532364158125-02d75a0f7fb0?w=800&q=80&auto=format&fit=crop',
    ]
  },
};

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80&auto=format&fit=crop';

function ImageWithFallback({ src, alt, className, ...props }) {
  const [imgSrc, setImgSrc] = useState(src);
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
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={closeGallery}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeGallery}
                  className="absolute -top-12 right-0 p-2 text-white hover:text-white/80"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="relative aspect-video rounded-2xl overflow-hidden">
                  <ImageWithFallback
                    src={CITY_GALLERY_DATA[selectedCity].images[currentImageIndex]}
                    alt={CITY_GALLERY_DATA[selectedCity].name}
                    className="w-full h-full object-cover"
                  />
                  
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-[#E60012]" />
                        <h3 className="font-bold text-xl">{CITY_GALLERY_DATA[selectedCity].name}</h3>
                        <span className="text-[#FFD700]">{CITY_GALLERY_DATA[selectedCity].nameChinese}</span>
                      </div>
                      <p className="text-white/80 text-sm mb-3">
                        {CITY_GALLERY_DATA[selectedCity].description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {CITY_GALLERY_DATA[selectedCity].specialties.map((specialty, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-white/20 rounded-full text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-2 mt-4">
                  {CITY_GALLERY_DATA[selectedCity].images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`w-2 h-2 rounded-full transition-colors ${
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
