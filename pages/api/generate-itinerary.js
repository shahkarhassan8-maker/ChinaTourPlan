import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

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
      accommodation,
      placesData 
    } = req.body;

    const cityPlacesInfo = cities.map(cityId => {
      const places = selectedPlaces[cityId] || [];
      const cityPlaces = places.map(index => placesData[cityId]?.highlights?.[index]).filter(Boolean);
      const days = cityDays[cityId] || 2;
      const selectedAccommodationType = accommodation?.[cityId] || 'comfort';
      const hotelInfo = placesData[cityId]?.hotels?.[selectedAccommodationType];
      
      return {
        cityId,
        cityName: placesData[cityId]?.name || cityId,
        days,
        accommodation: {
          type: selectedAccommodationType,
          name: hotelInfo?.name || 'Local hotel',
          pricePerNight: hotelInfo?.pricePerNight || { rmb: 300, usd: 42 }
        },
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
    
    const prompt = `You are a professional China travel planner. Create an optimized day-by-day itinerary based on the following travel plan.

TRAVEL DETAILS:
- Pace: ${pace} (${hoursPerDay} hours of activities per day)
- Food preference: ${food}

CITIES AND SELECTED PLACES:
${cityPlacesInfo.map(city => `
${city.cityName} (${city.days} days):
  Accommodation: ${city.accommodation.name} (${city.accommodation.type}) - ¥${city.accommodation.pricePerNight.rmb}/night
  Places to visit:
${city.places.map((p, i) => `    ${i + 1}. ${p.name} (${p.nameChinese || ''}) - ${p.durationHours}h
       Location: ${p.coordinates ? `${p.coordinates.lat}, ${p.coordinates.lng}` : 'N/A'}
       Hours: ${p.openingHours || 'Check locally'}`).join('\n')}
`).join('\n')}

REQUIREMENTS:
1. Group nearby places together on the same day to minimize travel time
2. Consider opening hours when scheduling
3. Include realistic travel time between places (estimate 30-60 min in cities)
4. Leave time for meals: breakfast (30min), lunch (1h), dinner (1.5h)
5. Don't exceed ${hoursPerDay} hours of activities per day
6. Order places efficiently within each day
7. Add brief local tips for each day

Return a JSON object with this EXACT structure (no markdown, no code blocks, just pure JSON):
{
  "itinerary": [
    {
      "day": 1,
      "city": "Beijing",
      "cityChinese": "北京",
      "theme": "Imperial Heritage Day",
      "schedule": [
        {
          "time": "09:00",
          "activity": "Forbidden City",
          "activityChinese": "故宫",
          "duration": "4 hours",
          "notes": "Enter via Meridian Gate, audio guide recommended",
          "travelToNext": "15 min walk"
        }
      ],
      "meals": {
        "breakfast": { "suggestion": "Hotel breakfast or local jianbing", "time": "07:30" },
        "lunch": { "suggestion": "Restaurant near Forbidden City", "time": "13:00", "budget": "¥50-100" },
        "dinner": { "suggestion": "Peking Duck at Quanjude", "time": "18:30", "budget": "¥200-300" }
      },
      "tips": ["Book tickets in advance", "Wear comfortable shoes"],
      "estimatedCost": { "activities": 60, "meals": 250, "transport": 30 }
    }
  ],
  "summary": {
    "totalDays": 5,
    "totalCities": 2,
    "estimatedBudget": { "rmb": 5000, "usd": 700 },
    "highlights": ["Great Wall at sunrise", "Forbidden City exploration"]
  }
}`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are a professional China travel planner. Always respond with valid JSON only, no markdown formatting or code blocks. Your itineraries are practical, efficient, and considerate of travelers\' energy levels.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 4000,
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
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      console.error('Response was:', responseText);
      
      itineraryData = generateFallbackItinerary(cityPlacesInfo, pace, food, placesData);
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

function generateFallbackItinerary(cityPlacesInfo, pace, food, placesData) {
  const hoursPerDay = pace === 'relaxed' ? 5 : pace === 'moderate' ? 7 : 10;
  const itinerary = [];
  let dayNumber = 1;

  cityPlacesInfo.forEach(city => {
    const placesPerDay = [];
    let currentDayPlaces = [];
    let currentDayHours = 0;

    const sortedPlaces = [...city.places].sort((a, b) => {
      if (!a.coordinates || !b.coordinates) return 0;
      return a.coordinates.lat - b.coordinates.lat;
    });

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

    placesPerDay.slice(0, city.days).forEach((dayPlaces, idx) => {
      let currentTime = 9 * 60;
      
      const schedule = dayPlaces.map((place, placeIdx) => {
        const hours = Math.floor(currentTime / 60);
        const mins = currentTime % 60;
        const timeStr = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
        
        currentTime += place.durationHours * 60 + 30;
        
        return {
          time: timeStr,
          activity: place.name,
          activityChinese: place.nameChinese || '',
          duration: place.duration || `${place.durationHours} hours`,
          notes: place.tips || 'Enjoy your visit!',
          travelToNext: placeIdx < dayPlaces.length - 1 ? '30 min by taxi/metro' : ''
        };
      });

      const cityData = placesData[city.cityId];
      const foods = cityData?.foods?.[food] || cityData?.foods?.anything || [];
      const foodRec = foods[idx % Math.max(1, foods.length)];

      itinerary.push({
        day: dayNumber,
        city: city.cityName,
        cityChinese: cityData?.nameChinese || '',
        theme: idx === 0 ? `Arrive in ${city.cityName}` : dayPlaces[0]?.name || `Explore ${city.cityName}`,
        schedule,
        meals: {
          breakfast: { suggestion: 'Hotel breakfast or local street food', time: '07:30' },
          lunch: { suggestion: 'Local restaurant near attractions', time: '12:30', budget: '¥50-100' },
          dinner: { 
            suggestion: foodRec?.name || 'Local specialty restaurant', 
            time: '18:30', 
            budget: foodRec?.priceRange || '¥100-200' 
          }
        },
        tips: [
          'Download WeChat for payments',
          'Keep hotel card with Chinese address',
          'Stay hydrated and pace yourself'
        ],
        estimatedCost: {
          activities: dayPlaces.reduce((sum, p) => sum + (p.ticketPrice?.rmb || 50), 0),
          meals: city.accommodation?.type === 'luxury' ? 400 : city.accommodation?.type === 'budget' ? 100 : 200,
          transport: 50
        }
      });

      dayNumber++;
    });
  });

  const totalBudget = itinerary.reduce((sum, day) => 
    sum + day.estimatedCost.activities + day.estimatedCost.meals + day.estimatedCost.transport, 0);

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