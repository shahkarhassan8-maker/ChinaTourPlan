import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

function parseDuration(durationStr) {
  if (!durationStr) return 2;
  const match = durationStr.match(/(\d+)/);
  if (match) {
    const hours = parseInt(match[1]);
    if (durationStr.toLowerCase().includes('half day')) return 4;
    if (durationStr.toLowerCase().includes('full day')) return 8;
    return hours;
  }
  return 2;
}

function getHotelPriceRange(quality) {
  switch (quality) {
    case 'cheap':
      return { rmb: { min: 150, max: 350 }, usd: { min: 20, max: 50 } };
    case 'expensive':
      return { rmb: { min: 800, max: 2000 }, usd: { min: 120, max: 300 } };
    default: // moderate
      return { rmb: { min: 350, max: 800 }, usd: { min: 50, max: 120 } };
  }
}

function getHotelType(quality) {
  switch (quality) {
    case 'cheap':
      return 'budget hostel or 2-star hotel';
    case 'expensive':
      return '4-5 star luxury hotel';
    default:
      return '3-star comfortable hotel';
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      cities,
      cityDays,
      selectedPlaces,
      pace,
      food,
      hotelQuality,
      placesData
    } = req.body;

    const hotelPriceRange = getHotelPriceRange(hotelQuality);
    const hotelType = getHotelType(hotelQuality);

    const cityPlacesInfo = cities.map(cityId => {
      const places = selectedPlaces[cityId] || [];
      const cityPlaces = places.map(index => placesData[cityId]?.highlights?.[index]).filter(Boolean);
      const days = cityDays[cityId] || 2;

      return {
        cityId,
        cityName: placesData[cityId]?.name || cityId,
        cityNameChinese: placesData[cityId]?.nameChinese || '',
        days,
        places: cityPlaces.map(p => ({
          name: p.name,
          nameChinese: p.nameChinese,
          duration: p.duration,
          durationHours: parseDuration(p.duration),
          coordinates: p.coordinates,
          openingHours: p.openingHours,
          tips: p.tips,
          address: p.address,
          addressChinese: p.addressChinese,
          ticketPrice: p.ticketPrice,
        }))
      };
    });

    const hoursPerDay = pace === 'relaxed' ? 4 : pace === 'moderate' ? 7 : 10;

    const prompt = `You are a professional China travel planner. Create an EXACT day-by-day itinerary based on the SPECIFIC places the user selected.

ABSOLUTELY CRITICAL RULES - MUST FOLLOW:
1. ONLY include the EXACT cities and attractions listed below - DO NOT add ANY other cities not in this list but if needed to fill ${hoursPerDay} , you may add some attractions yourself , add
2. Every attraction listed below MUST appear in the itinerary exactly once - do not skip any
3. DO NOT invent or suggest additional attractions, neighborhoods, or sightseeing spots that are not explicitly listed
4. Include hotel check-out in the morning (around 08:00-08:30) and check-in in the evening (around 18:00-19:00) or night whatever is suitable for that city
5. Recommend a nearby ${hotelType} for each city based on central location to the selected attractions

TRAVEL DETAILS:
- Pace: ${pace} (${hoursPerDay} hours of activities per day)
- Food preference: ${food}
- Hotel Quality: ${hotelQuality} (${hotelType}, ¥${hotelPriceRange.rmb.min}-${hotelPriceRange.rmb.max}/night)

CITIES AND SELECTED PLACES (ONLY USE THESE - NO OTHER PLACES):
${cityPlacesInfo.map(city => `
${city.cityName} (${city.cityNameChinese}) - ${city.days} days:
  Selected attractions (MUST INCLUDE ALL):
${city.places.length > 0 ? city.places.map((p, i) => `    ${i + 1}. ${p.name} (${p.nameChinese || ''}) - Duration: ${p.durationHours}h
       Address: ${p.address || 'N/A'}
       Hours: ${p.openingHours || 'Check locally'}`).join('\n') : '    No specific attractions selected - recommend general sightseeing or add some good place to visit yourself.'}
`).join('\n')}

DAILY SCHEDULE FORMAT:
- 08:00-08:30: Check out from hotel (first day skip, last day of city include)
- Morning activities from selected places
- 12:00-13:00: Lunch break
- Afternoon activities from selected places
- 18:00-19:00: Check in to hotel (include hotel name and address)
- Evening: Dinner and rest
- Night: Night life activities like street walk or shopping

Return a JSON object with this EXACT structure (no markdown, no code blocks, just pure JSON):
{
  "itinerary": [
    {
      "day": 1,
      "city": "Beijing",
      "cityChinese": "北京",
      "theme": "Day theme",
      "hotel": {
        "name": "Recommended Hotel Name",
        "nameChinese": "酒店中文名",
        "address": "Hotel Address",
        "addressChinese": "酒店地址中文",
        "pricePerNight": { "rmb": 400, "usd": 55 },
        "type": "${hotelQuality}"
      },
      "schedule": [
        {
          "time": "08:30",
          "activity": "Leave hotel",
          "activityChinese": "离开酒店",
          "duration": "30 min",
          "type": "hotel_checkout",
          "notes": "Check out and store luggage if needed"
        },
        {
          "time": "09:00",
          "activity": "Forbidden City",
          "activityChinese": "故宫",
          "duration": "4 hours",
          "type": "attraction",
          "notes": "Enter via Meridian Gate, audio guide recommended",
          "travelToNext": "15 min walk"
        },
        {
          "time": "18:00",
          "activity": "Check in to hotel",
          "activityChinese": "入住酒店",
          "duration": "30 min",
          "type": "hotel_checkin",
          "notes": "Hotel Name - Address"
        }
      ],
      "meals": {
        "breakfast": { "suggestion": "Hotel breakfast", "time": "07:30" },
        "lunch": { "suggestion": "Local restaurant", "time": "12:30", "budget": "¥50-100" },
        "dinner": { "suggestion": "Peking Duck", "time": "19:00", "budget": "¥150-250" }
      },
      "tips": ["Tip 1", "Tip 2"],
      "estimatedCost": { "activities": 60, "meals": 200, "transport": 50, "hotel": 400 }
    }
  ],
  "summary": {
    "totalDays": 5,
    "totalCities": 2,
    "estimatedBudget": { "rmb": 5000, "usd": 700 },
    "highlights": ["Attraction 1", "Attraction 2"]
  }
}`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are a professional China travel planner. ABSOLUTE RULE: You must ONLY use the EXACT cities and attractions provided by the user. If only one attraction is selected, you must create an itinerary with ONLY that one attraction - do not add any other sightseeing, neighborhoods, or places. Never invent or add attractions not explicitly listed. Include hotel recommendations based on the specified quality (cheap/moderate/expensive). Always respond with valid JSON only, no markdown formatting or code blocks.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.2,
      max_tokens: 6000,
    });

    const responseText = completion.choices[0]?.message?.content || '';

    let itineraryData;
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        itineraryData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
      // Validate that all user-selected places appear in the itinerary
      const userSelectedPlaceNames = cityPlacesInfo.flatMap(city =>
        city.places.map(p => p.name)
      );
      const itineraryPlaceNames = itineraryData.itinerary.flatMap(day =>
        day.schedule
          .filter(s => s.type === 'attraction')
          .map(s => s.activity)
      );
      const missingPlaces = userSelectedPlaceNames.filter(
        name => !itineraryPlaceNames.includes(name)
      );
      if (missingPlaces.length > 0) {
        console.warn('AI missed user-selected places:', missingPlaces);
        // Fall back to our own generation
        itineraryData = generateFallbackItinerary(cityPlacesInfo, pace, food, hotelQuality, placesData);
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      console.error('Response was:', responseText);

      itineraryData = generateFallbackItinerary(cityPlacesInfo, pace, food, hotelQuality, placesData);
    }

    return res.status(200).json({
      success: true,
      itinerary: itineraryData,
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error generating itinerary:', error);
    return res.status(500).json({
      error: 'Failed to generate itinerary',
      message: error.message
    });
  }
}

function generateFallbackItinerary(cityPlacesInfo, pace, food, hotelQuality, placesData) {
  const hoursPerDay = pace === 'relaxed' ? 5 : pace === 'moderate' ? 7 : 10;
  const hotelPriceRange = getHotelPriceRange(hotelQuality);
  const itinerary = [];
  let dayNumber = 1;

  const hotelsByCity = {
    beijing: {
      cheap: { name: 'Beijing Downtown Backpackers', nameChinese: '北京市中心背包客', address: 'Nanluoguxiang, Dongcheng', addressChinese: '东城区南锣鼓巷' },
      moderate: { name: 'Holiday Inn Express Beijing', nameChinese: '北京智选假日酒店', address: 'Wangfujing, Dongcheng', addressChinese: '东城区王府井' },
      expensive: { name: 'The Peninsula Beijing', nameChinese: '北京王府半岛酒店', address: '8 Goldfish Lane, Wangfujing', addressChinese: '王府井金鱼胡同8号' }
    },
    shanghai: {
      cheap: { name: 'Shanghai Blue Mountain Youth Hostel', nameChinese: '上海蓝山青年旅舍', address: 'Near People\'s Square', addressChinese: '人民广场附近' },
      moderate: { name: 'Jinjiang Inn Shanghai', nameChinese: '上海锦江之星', address: 'Nanjing Road, Huangpu', addressChinese: '黄浦区南京路' },
      expensive: { name: 'The Bund Waldorf Astoria', nameChinese: '上海外滩华尔道夫酒店', address: '2 Zhongshan East Road', addressChinese: '中山东路2号' }
    },
    xian: {
      cheap: { name: 'Xi\'an Xiangzimen Youth Hostel', nameChinese: '西安湘子门青年旅舍', address: 'Near South Gate', addressChinese: '南门附近' },
      moderate: { name: 'Grand Noble Hotel Xi\'an', nameChinese: '西安君乐城堡酒店', address: 'Bell Tower Area', addressChinese: '钟楼区' },
      expensive: { name: 'Sofitel Legend Xi\'an', nameChinese: '西安索菲特传奇酒店', address: 'Inside City Wall', addressChinese: '城墙内' }
    },
    chengdu: {
      cheap: { name: 'Chengdu Dreams Travel Hostel', nameChinese: '成都梦之旅青年旅舍', address: 'Chunxi Road', addressChinese: '春熙路' },
      moderate: { name: 'Dorsett Chengdu', nameChinese: '成都帝盛酒店', address: 'Tianfu Square', addressChinese: '天府广场' },
      expensive: { name: 'The Temple House Chengdu', nameChinese: '成都博舍酒店', address: 'Taikoo Li', addressChinese: '太古里' }
    },
    guilin: {
      cheap: { name: 'Guilin Riverside Hostel', nameChinese: '桂林江畔青年旅舍', address: 'Two Rivers Area', addressChinese: '两江四湖区' },
      moderate: { name: 'Guilin Bravo Hotel', nameChinese: '桂林漓江大瀑布饭店', address: 'Central Guilin', addressChinese: '桂林市中心' },
      expensive: { name: 'Shangri-La Guilin', nameChinese: '桂林香格里拉大酒店', address: 'Chuanshan Road', addressChinese: '穿山路' }
    }
  };

  const defaultHotel = {
    cheap: { name: 'Local Budget Hostel', nameChinese: '当地经济型旅舍', address: 'City Center', addressChinese: '市中心' },
    moderate: { name: 'City Center Hotel', nameChinese: '市中心酒店', address: 'Downtown', addressChinese: '市区' },
    expensive: { name: 'Premium City Hotel', nameChinese: '高级城市酒店', address: 'Prime Location', addressChinese: '核心地段' }
  };

  cityPlacesInfo.forEach((city, cityIndex) => {
    const placesPerDay = [];
    let currentDayPlaces = [];
    let currentDayHours = 0;

    const sortedPlaces = [...city.places];

    sortedPlaces.forEach(place => {
      if (currentDayHours + place.durationHours <= hoursPerDay) {
        currentDayPlaces.push(place);
        currentDayHours += place.durationHours + 0.5;
      } else {
        if (currentDayPlaces.length > 0) {
          placesPerDay.push([...currentDayPlaces]);
        }
        currentDayPlaces = [place];
        currentDayHours = place.durationHours + 0.5;
      }
    });

    if (currentDayPlaces.length > 0) {
      placesPerDay.push(currentDayPlaces);
    }

    while (placesPerDay.length < city.days) {
      placesPerDay.push([]);
    }

    const cityHotels = hotelsByCity[city.cityId] || defaultHotel;
    const hotel = cityHotels[hotelQuality] || cityHotels.moderate || defaultHotel.moderate;
    const hotelPrice = hotelQuality === 'cheap' ? hotelPriceRange.rmb.min + 50
      : hotelQuality === 'expensive' ? hotelPriceRange.rmb.max - 200
        : Math.round((hotelPriceRange.rmb.min + hotelPriceRange.rmb.max) / 2);

    placesPerDay.slice(0, city.days).forEach((dayPlaces, idx) => {
      let currentTime = 9 * 60;
      const schedule = [];
      const isFirstDayInCity = idx === 0;
      const isLastDayInCity = idx === city.days - 1;

      if (!isFirstDayInCity) {
        schedule.push({
          time: '08:30',
          activity: 'Leave hotel',
          activityChinese: '离开酒店',
          duration: '30 min',
          type: 'hotel_checkout',
          notes: isLastDayInCity ? 'Check out, store luggage at hotel' : 'Start your day',
          travelToNext: '20-30 min to first attraction'
        });
      }

      dayPlaces.forEach((place, placeIdx) => {
        const hours = Math.floor(currentTime / 60);
        const mins = currentTime % 60;
        const timeStr = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;

        currentTime += place.durationHours * 60 + 30;

        schedule.push({
          time: timeStr,
          activity: place.name,
          activityChinese: place.nameChinese || '',
          duration: place.duration || `${place.durationHours} hours`,
          type: 'attraction',
          notes: place.tips || 'Enjoy your visit!',
          travelToNext: placeIdx < dayPlaces.length - 1 ? '30 min by taxi/metro' : ''
        });
      });

      schedule.push({
        time: '18:00',
        activity: 'Check in to hotel',
        activityChinese: '入住酒店',
        duration: '30 min',
        type: 'hotel_checkin',
        notes: `${hotel.name} - ${hotel.address}`
      });

      const cityData = placesData[city.cityId];
      const foods = cityData?.foods?.[food] || cityData?.foods?.anything || [];
      const foodRec = foods[idx % Math.max(1, foods.length)];

      itinerary.push({
        day: dayNumber,
        city: city.cityName,
        cityChinese: city.cityNameChinese || cityData?.nameChinese || '',
        theme: idx === 0 ? `Arrive in ${city.cityName}` : dayPlaces[0]?.name || `Explore ${city.cityName}`,
        hotel: {
          name: hotel.name,
          nameChinese: hotel.nameChinese,
          address: hotel.address,
          addressChinese: hotel.addressChinese,
          pricePerNight: { rmb: hotelPrice, usd: Math.round(hotelPrice / 7.2) },
          type: hotelQuality
        },
        schedule,
        meals: {
          breakfast: { suggestion: 'Hotel breakfast or local street food', time: '07:30' },
          lunch: { suggestion: 'Local restaurant near attractions', time: '12:30', budget: '¥50-100' },
          dinner: {
            suggestion: foodRec?.name || 'Local specialty restaurant',
            time: '19:00',
            budget: foodRec?.priceRange || '¥100-200'
          }
        },
        tips: [
          'Download WeChat for payments',
          'Keep hotel card with Chinese address',
          'Save offline maps for the area'
        ],
        estimatedCost: {
          activities: dayPlaces.reduce((sum, p) => sum + (p.ticketPrice?.rmb || 50), 0),
          meals: hotelQuality === 'expensive' ? 350 : hotelQuality === 'cheap' ? 100 : 200,
          transport: 60,
          hotel: hotelPrice
        }
      });

      dayNumber++;
    });
  });

  const totalBudget = itinerary.reduce((sum, day) =>
    sum + day.estimatedCost.activities + day.estimatedCost.meals + day.estimatedCost.transport + day.estimatedCost.hotel, 0);

  return {
    itinerary,
    summary: {
      totalDays: itinerary.length,
      totalCities: cityPlacesInfo.length,
      estimatedBudget: { rmb: totalBudget, usd: Math.round(totalBudget / 7.2) },
      highlights: cityPlacesInfo.flatMap(c => c.places.slice(0, 2).map(p => p.name))
    }
  };
}
