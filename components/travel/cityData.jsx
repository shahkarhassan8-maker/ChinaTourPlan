// Complete city data with detailed location info, addresses, and Chinese phrases

export const CITY_DATA = {
  beijing: {
    name: 'Beijing',
    nameChinese: '北京',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80',
    recommendedDays: 3,
    localInsights: [
      "Best time to visit: April-May or September-October for mild weather and fewer crowds",
      "Download WeChat and Alipay before arrival - cash is rarely accepted",
      "Air quality varies - check AQI app and bring a mask for high pollution days",
      "The 996 work culture means attractions are packed on weekends - visit weekdays if possible",
      "Bargaining is expected at markets (start at 30% of asking price) but never in malls",
      "Taxi tip: Screenshot your destination in Chinese - drivers rarely speak English",
      "Beijing time zone: No daylight saving, so sunrise can be very early in summer",
    ],
    highlights: [
      { 
        name: 'Forbidden City', 
        nameChinese: '故宫',
        description: 'Explore 9,999 rooms of imperial history - the world\'s largest palace complex and a UNESCO World Heritage site', 
        duration: '4-5 hours',
        address: '4 Jingshan Front St, Dongcheng District',
        addressChinese: '东城区景山前街4号',
        coordinates: { lat: 39.9163, lng: 116.3972 },
        openingHours: '8:30 AM - 5:00 PM (Apr-Oct), 8:30 AM - 4:30 PM (Nov-Mar). Closed Mondays.',
        ticketPrice: { rmb: 60, usd: 8 },
        tips: 'Book tickets 7 days in advance on the official WeChat mini-program "故宫博物院". Walk the central axis for the main halls, then explore quieter western courtyards.',
        localSecrets: [
          "Enter via Meridian Gate, exit through Gate of Divine Prowess for the full experience",
          "The Clock Museum and Treasure Gallery cost extra but are worth it for fewer crowds",
          "Climb Jingshan Park (景山公园) across the street for the iconic aerial view of the entire palace",
          "Rent the audio guide app (20 RMB) - the English commentary is excellent",
          "Visit the Starbucks inside for a unique photo spot (yes, there's one inside!)",
        ],
        bestPhotoSpots: ['Gate of Supreme Harmony at sunrise', 'Corner towers from the moat', 'Jingshan Park overlook'],
        metro: { line: 'Line 1', station: 'Tiananmen East Station (天安门东站)', exit: 'Exit A' },
        phrases: [
          { english: 'I want to go to the Forbidden City', chinese: '我想去故宫', pinyin: 'Wǒ xiǎng qù Gùgōng' },
          { english: 'Where is the entrance?', chinese: '入口在哪里？', pinyin: 'Rùkǒu zài nǎlǐ?' },
          { english: 'Where is the audio guide?', chinese: '语音导览在哪里？', pinyin: 'Yǔyīn dǎolǎn zài nǎlǐ?' },
        ]
      },
      { 
        name: 'Great Wall at Mutianyu', 
        nameChinese: '慕田峪长城',
        description: 'The most scenic and well-preserved section, less crowded than Badaling with stunning watchtowers and cable car access', 
        duration: '5-6 hours',
        address: 'Mutianyu Village, Huairou District',
        addressChinese: '怀柔区慕田峪村',
        coordinates: { lat: 40.4319, lng: 116.5704 },
        openingHours: '7:30 AM - 6:00 PM (Apr-Oct), 8:00 AM - 5:00 PM (Nov-Mar)',
        ticketPrice: { rmb: 45, usd: 6 },
        tips: 'Take cable car up (100 RMB), toboggan slide down (100 RMB) for a unique exit. Arrive before 8 AM to beat tour groups.',
        localSecrets: [
          "Book a private car via DiDi (200-300 RMB round trip) - much better than crowded tour buses",
          "Walk LEFT at the top - most tour groups go right, so you'll have sections to yourself",
          "The stretch between towers 14-23 is the most photogenic with fewer crowds",
          "Bring your own lunch - food at the wall is overpriced (100+ RMB for basic meals)",
          "Spring (April) has cherry blossoms, autumn (October) has colorful foliage - both spectacular",
        ],
        bestPhotoSpots: ['Tower 14 looking east at sunrise', 'The zigzag section between towers 20-22', 'View from cable car'],
        metro: { line: 'Line 2/13', station: 'Dongzhimen Station (东直门站)', exit: 'Exit C - Take Bus 916 Express to Huairou, then Bus H23' },
        phrases: [
          { english: 'Take me to Mutianyu Great Wall', chinese: '带我去慕田峪长城', pinyin: 'Dài wǒ qù Mùtiányù Chángchéng' },
          { english: 'How much for round trip cable car?', chinese: '缆车往返多少钱？', pinyin: 'Lǎnchē wǎngfǎn duōshao qián?' },
          { english: 'I want to take the toboggan down', chinese: '我想坐滑道下山', pinyin: 'Wǒ xiǎng zuò huádào xiàshān' },
        ]
      },
      { 
        name: 'Temple of Heaven', 
        nameChinese: '天坛',
        description: 'A masterpiece of Ming Dynasty architecture where emperors performed sacred rituals - larger than the Forbidden City', 
        duration: '2-3 hours',
        address: '1 Tiantan East Road, Dongcheng District',
        addressChinese: '东城区天坛东路1号',
        coordinates: { lat: 39.8822, lng: 116.4066 },
        openingHours: '6:00 AM - 9:00 PM (Park), 8:00 AM - 5:30 PM (Buildings)',
        ticketPrice: { rmb: 35, usd: 5 },
        tips: 'Arrive at 6 AM to see hundreds of locals doing tai chi, dancing, and playing traditional instruments - truly magical',
        localSecrets: [
          "Stand at the center of the Echo Wall and whisper - your voice carries perfectly around the curved surface",
          "The park is huge - rent a bike or golf cart (20-50 RMB) to cover more ground",
          "Local performers gather near the Long Corridor after 7 AM - free traditional music and opera",
          "The Hall of Prayer for Good Harvests (祈年殿) is built entirely without nails - marvel at the engineering",
          "Visit on a clear day - the blue-roofed buildings against blue sky is iconic",
        ],
        bestPhotoSpots: ['Hall of Prayer from the south approach', 'Echo Wall from inside', 'Long Corridor with locals'],
        metro: { line: 'Line 5', station: 'Tiantandongmen Station (天坛东门站)', exit: 'Exit A' },
        phrases: [
          { english: 'I want to go to Temple of Heaven', chinese: '我想去天坛', pinyin: 'Wǒ xiǎng qù Tiāntán' },
          { english: 'Can I take a photo with you?', chinese: '我可以和您合影吗？', pinyin: 'Wǒ kěyǐ hé nín héyǐng ma?' },
        ]
      },
      { 
        name: 'Summer Palace', 
        nameChinese: '颐和园',
        description: 'The magnificent imperial garden retreat with Kunming Lake and Longevity Hill - a UNESCO World Heritage site spanning 700 acres', 
        duration: '4-5 hours',
        address: '19 Xinjiangongmen Road, Haidian District',
        addressChinese: '海淀区新建宫门路19号',
        coordinates: { lat: 39.9999, lng: 116.2755 },
        openingHours: '6:30 AM - 6:00 PM (Apr-Oct), 7:00 AM - 5:00 PM (Nov-Mar)',
        ticketPrice: { rmb: 30, usd: 4 },
        tips: 'Enter via the north gate (Beigongmen) and work your way to the main east gate - this route has fewer crowds',
        localSecrets: [
          "Take a dragon boat across Kunming Lake (70 RMB) - the views of the 17-Arch Bridge are spectacular",
          "Suzhou Street is a recreated shopping street with period costume rentals (100-200 RMB) for unique photos",
          "The Marble Boat is where Empress Dowager allegedly spent navy funds - great sunset photos",
          "Climb to the top of Tower of Buddhist Incense for panoramic views (worth the extra 10 RMB)",
          "In winter, Kunming Lake freezes and locals ice skate - rent skates for 30 RMB",
        ],
        bestPhotoSpots: ['17-Arch Bridge at sunset', 'Tower of Buddhist Incense reflection', 'Long Gallery paintings'],
        metro: { line: 'Line 4', station: 'Beigongmen Station (北宫门站)', exit: 'Exit D' },
        phrases: [
          { english: 'Take me to Summer Palace', chinese: '带我去颐和园', pinyin: 'Dài wǒ qù Yíhéyuán' },
          { english: 'How much for the boat ride?', chinese: '坐船多少钱？', pinyin: 'Zuò chuán duōshao qián?' },
        ]
      },
      { 
        name: 'Hutong Tour - Nanluoguxiang', 
        nameChinese: '南锣鼓巷胡同游',
        description: 'Ancient alleyways dating back 800 years, now filled with boutique shops, cafes, and authentic Beijing culture', 
        duration: '3-4 hours',
        address: 'Nanluoguxiang, Dongcheng District',
        addressChinese: '东城区南锣鼓巷',
        coordinates: { lat: 39.9379, lng: 116.4034 },
        openingHours: 'Open 24 hours (shops 10 AM - 10 PM)',
        ticketPrice: { rmb: 0, usd: 0 },
        tips: 'Skip the touristy main street - duck into the 8 parallel side hutongs (labeled 帽儿, 雨儿, etc.) for the real experience',
        localSecrets: [
          "Mao'er Hutong (帽儿胡同) has Wan Rong's former residence - Empress of China's last emperor",
          "Try the famous 文宇奶酪 (Wenyu Cheese) shop for traditional Beijing-style cheese (yogurt-like)",
          "For authentic rickshaw tours, negotiate 150-200 RMB for 1 hour instead of the 300+ RMB tourist prices",
          "The Drum & Bell Towers are a 10-minute walk north - climb for sunset views over the hutongs",
          "Evening is best when red lanterns light up and street performers appear",
        ],
        bestPhotoSpots: ['View from Drum Tower', 'Traditional doorways with red doors', 'Bell Tower Square at dusk'],
        metro: { line: 'Line 6/8', station: 'Nanluoguxiang Station (南锣鼓巷站)', exit: 'Exit E' },
        phrases: [
          { english: 'How much for a rickshaw tour?', chinese: '人力车游览多少钱？', pinyin: 'Rénlìchē yóulǎn duōshao qián?' },
          { english: 'Can you show me an old courtyard home?', chinese: '您能带我看看四合院吗？', pinyin: 'Nín néng dài wǒ kànkan sìhéyuàn ma?' },
        ]
      },
      { 
        name: 'Tiananmen Square', 
        nameChinese: '天安门广场',
        description: 'The world\'s largest public square, heart of modern China with the iconic Gate of Heavenly Peace and Mao\'s Mausoleum', 
        duration: '1-2 hours',
        address: 'Tiananmen Square, Dongcheng District',
        addressChinese: '东城区天安门广场',
        coordinates: { lat: 39.9087, lng: 116.3975 },
        openingHours: '5:00 AM - 10:00 PM (Flag ceremony at sunrise/sunset)',
        ticketPrice: { rmb: 0, usd: 0 },
        image: 'https://images.unsplash.com/photo-1591871937573-74dbba515c4c?w=800&q=80',
        tips: 'Arrive before sunrise for the flag-raising ceremony - arrive 30 minutes early for good spots. Bring passport for security check.',
        localSecrets: [
          "The flag ceremony times change daily based on sunrise/sunset - check exact time online",
          "Mao's Mausoleum is free but has strict rules - no bags, cameras, or talking allowed",
          "The underground passage from metro has less security queue than street entrances",
          "Best photo of Tiananmen Gate is from the south side of the square looking north",
          "Night illumination is spectacular - the gate lights up beautifully after dark",
        ],
        bestPhotoSpots: ['Tiananmen Gate from the square', 'Flag ceremony at sunrise', 'Night view of illuminated gate'],
        metro: { line: 'Line 1', station: 'Tiananmen East Station (天安门东站)', exit: 'Exit A' },
        phrases: [
          { english: 'What time is the flag ceremony?', chinese: '升旗仪式几点开始？', pinyin: 'Shēngqí yíshì jǐ diǎn kāishǐ?' },
          { english: 'Where is the entrance to the Mausoleum?', chinese: '毛主席纪念堂入口在哪里？', pinyin: 'Máo zhǔxí jìniàntáng rùkǒu zài nǎlǐ?' },
        ]
      },
      { 
        name: 'Lama Temple (Yonghe Temple)', 
        nameChinese: '雍和宫',
        description: 'The most renowned Tibetan Buddhist temple outside Tibet, featuring stunning architecture and a 26-meter Buddha carved from a single sandalwood tree', 
        duration: '2-3 hours',
        address: '12 Yonghegong Street, Dongcheng District',
        addressChinese: '东城区雍和宫大街12号',
        coordinates: { lat: 39.9474, lng: 116.4172 },
        openingHours: '9:00 AM - 4:30 PM (Nov-Mar), 9:00 AM - 5:00 PM (Apr-Oct)',
        ticketPrice: { rmb: 25, usd: 4 },
        image: 'https://images.unsplash.com/photo-1584952811565-c4c4031e1c8f?w=800&q=80',
        tips: 'Buy incense outside (much cheaper than inside). The giant Buddha in the last hall is truly breathtaking.',
        localSecrets: [
          "Free incense is given at the entrance - no need to buy extra unless you want larger bundles",
          "The Pavilion of Ten Thousand Happinesses houses the record-breaking 26m Buddha",
          "Active monks perform prayers at 9 AM - very authentic spiritual experience",
          "The Confucius Temple and Imperial Academy are a 5-minute walk south - combine visits",
          "Locals come on the 1st and 15th of each lunar month - more crowded but atmospheric",
        ],
        bestPhotoSpots: ['Main gate with red lanterns', 'Giant Buddha in Wanfu Pavilion', 'Prayer wheels corridor'],
        metro: { line: 'Line 2/5', station: 'Yonghegong Station (雍和宫站)', exit: 'Exit C' },
        phrases: [
          { english: 'I want to go to Lama Temple', chinese: '我想去雍和宫', pinyin: 'Wǒ xiǎng qù Yōnghégōng' },
          { english: 'Can I take photos inside?', chinese: '里面可以拍照吗？', pinyin: 'Lǐmiàn kěyǐ pāizhào ma?' },
        ]
      },
      { 
        name: '798 Art District', 
        nameChinese: '798艺术区',
        description: 'Beijing\'s creative hub in former military factory buildings - contemporary art galleries, studios, and trendy cafes', 
        duration: '3-4 hours',
        address: '4 Jiuxianqiao Road, Chaoyang District',
        addressChinese: '朝阳区酒仙桥路4号',
        coordinates: { lat: 39.9842, lng: 116.4953 },
        openingHours: '10:00 AM - 6:00 PM (galleries vary, many closed Mondays)',
        ticketPrice: { rmb: 0, usd: 0 },
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
        tips: 'Most galleries are free. The UCCA Center for Contemporary Art (50 RMB) hosts world-class exhibitions.',
        localSecrets: [
          "UCCA is the anchor gallery - check their current exhibition before visiting",
          "The area is huge - pick up a map at any gallery entrance",
          "Street art and murals are everywhere - walk the back alleys for hidden gems",
          "Weekdays are much quieter - weekends get packed with local art students",
          "Timezone 8 bookstore/cafe is a local favorite for coffee and art books",
        ],
        bestPhotoSpots: ['Soviet-era factory pipes and tanks', 'UCCA entrance', 'Graffiti walls in back alleys'],
        metro: { line: 'Line 14', station: 'Jiangtai Station (将台站)', exit: 'Exit B - then bus 403 or taxi' },
        phrases: [
          { english: 'Take me to 798 Art District', chinese: '带我去798艺术区', pinyin: 'Dài wǒ qù qībājiǔ yìshùqū' },
          { english: 'Is this gallery free?', chinese: '这个画廊免费吗？', pinyin: 'Zhège huàláng miǎnfèi ma?' },
        ]
      },
      { 
        name: 'Olympic Park & Bird\'s Nest', 
        nameChinese: '奥林匹克公园和鸟巢',
        description: 'The stunning 2008 Olympics legacy featuring the iconic Bird\'s Nest stadium and Water Cube - symbols of modern China', 
        duration: '2-3 hours',
        address: '1 National Stadium South Road, Chaoyang District',
        addressChinese: '朝阳区国家体育场南路1号',
        coordinates: { lat: 39.9929, lng: 116.3967 },
        openingHours: '9:00 AM - 9:00 PM (exterior always visible)',
        ticketPrice: { rmb: 50, usd: 7 },
        image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80',
        tips: 'The exterior is stunning - going inside is optional. Evening visits offer beautiful LED light shows on both structures.',
        localSecrets: [
          "Skip going inside the Bird's Nest - the view from outside is equally impressive and free",
          "The Water Cube is now Happy Magic Water Park - great for families in summer",
          "Olympic Tower observation deck (200 RMB) offers 360° views of Beijing",
          "Free light show every evening from 7-10 PM on both structures",
          "Rent a Segway (100 RMB/hour) to cover the massive park area easily",
        ],
        bestPhotoSpots: ['Bird\'s Nest reflection in the lake', 'Water Cube at night in blue', 'Olympic torch tower'],
        metro: { line: 'Line 8/15', station: 'Olympic Green Station (奥林匹克公园站)', exit: 'Exit E' },
        phrases: [
          { english: 'I want to see the Bird\'s Nest', chinese: '我想看鸟巢', pinyin: 'Wǒ xiǎng kàn Niǎocháo' },
          { english: 'What time does the light show start?', chinese: '灯光秀几点开始？', pinyin: 'Dēngguāng xiù jǐ diǎn kāishǐ?' },
        ]
      },
    ],
    foods: {
      anything: [
        { 
          name: 'Peking Duck at Quanjude', 
          nameChinese: '全聚德烤鸭',
          description: 'Famous roasted duck since 1864', 
          emoji: '🦆',
          address: '9 Shuaifuyuan Hutong, Wangfujing',
          addressChinese: '王府井帅府园胡同9号',
          coordinates: { lat: 39.9149, lng: 116.4103 },
          priceRange: '¥200-400 per person',
          metro: { line: 'Line 1', station: 'Wangfujing Station (王府井站)', exit: 'Exit A' },
          dietaryTags: ['poultry'],
          phrases: [
            { english: 'One whole duck please', chinese: '一只烤鸭，谢谢', pinyin: 'Yī zhī kǎoyā, xièxiè' },
          ]
        },
        { 
          name: 'Jianbing (Street Crepe)', 
          nameChinese: '煎饼果子',
          description: 'Savory breakfast crepe with egg', 
          emoji: '🥞',
          address: 'Street vendors throughout city',
          addressChinese: '街头摊位',
          priceRange: '¥8-15',
          dietaryTags: ['egg'],
          phrases: [
            { english: 'One jianbing please', chinese: '一个煎饼，谢谢', pinyin: 'Yī gè jiānbing, xièxiè' },
          ]
        },
      ],
      halal: [
        { 
          name: 'Niujie Halal Restaurant', 
          nameChinese: '牛街清真餐厅',
          description: 'Authentic Muslim Quarter halal food', 
          emoji: '🥘',
          address: 'Niujie (Ox Street), Xicheng District',
          addressChinese: '西城区牛街',
          coordinates: { lat: 39.8878, lng: 116.3589 },
          priceRange: '¥50-100 per person',
          metro: { line: 'Line 7', station: 'Caishikou Station (菜市口站)', exit: 'Exit D' },
          dietaryTags: ['halal', 'beef', 'lamb'],
          phrases: [
            { english: 'Is this halal?', chinese: '这个是清真的吗？', pinyin: 'Zhège shì qīngzhēn de ma?' },
            { english: 'No pork please', chinese: '不要猪肉', pinyin: 'Bù yào zhūròu' },
          ]
        },
        { 
          name: 'Xinjiang Lamb Skewers', 
          nameChinese: '新疆羊肉串',
          description: 'Spiced lamb skewers from Muslim vendors', 
          emoji: '🍢',
          address: 'Niujie Halal Street or Wangfujing Snack Street',
          addressChinese: '牛街或王府井小吃街',
          priceRange: '¥5-10 per skewer',
          dietaryTags: ['halal', 'lamb'],
          phrases: [
            { english: 'Five lamb skewers please', chinese: '五串羊肉串', pinyin: 'Wǔ chuàn yángròu chuàn' },
          ]
        },
        { 
          name: 'Halal Beef Noodles', 
          nameChinese: '清真牛肉面',
          description: 'Hand-pulled noodles in beef broth', 
          emoji: '🍜',
          address: 'Dongsi Halal Beef Noodle Shop',
          addressChinese: '东四清真牛肉面',
          priceRange: '¥25-40',
          metro: { line: 'Line 5/6', station: 'Dongsi Station (东四站)', exit: 'Exit C' },
          dietaryTags: ['halal', 'beef'],
          phrases: [
            { english: 'One bowl beef noodles', chinese: '一碗牛肉面', pinyin: 'Yī wǎn niúròu miàn' },
          ]
        },
      ],
      vegetarian: [
        { 
          name: 'Veggie Table', 
          nameChinese: '素食桌',
          description: 'Modern vegetarian restaurant near Forbidden City', 
          emoji: '🥗',
          address: '19 Wudaoying Hutong, Dongcheng',
          addressChinese: '东城区五道营胡同19号',
          priceRange: '¥80-150 per person',
          metro: { line: 'Line 2/5', station: 'Yonghegong Station (雍和宫站)', exit: 'Exit C' },
          dietaryTags: ['vegetarian', 'vegan-options'],
          phrases: [
            { english: 'I am vegetarian', chinese: '我吃素', pinyin: 'Wǒ chī sù' },
            { english: 'No meat please', chinese: '不要肉', pinyin: 'Bù yào ròu' },
          ]
        },
        { 
          name: 'Temple Kitchen Vegetarian', 
          nameChinese: '寺院素斋',
          description: 'Buddhist temple-style vegetarian cuisine', 
          emoji: '🥬',
          address: 'Various locations near temples',
          addressChinese: '寺庙附近',
          priceRange: '¥40-80 per person',
          dietaryTags: ['vegetarian', 'buddhist'],
          phrases: [
            { english: 'All vegetarian menu please', chinese: '全素菜单', pinyin: 'Quán sù càidān' },
          ]
        },
      ],
      spicy: [
        { 
          name: 'Sichuan Restaurant Huajia Yiyuan', 
          nameChinese: '花家怡园',
          description: 'Spicy Sichuan cuisine in Beijing', 
          emoji: '🌶️',
          address: '235 Dongzhimen Inner Street',
          addressChinese: '东直门内大街235号',
          priceRange: '¥100-200 per person',
          metro: { line: 'Line 2', station: 'Dongzhimen Station (东直门站)', exit: 'Exit B' },
          dietaryTags: ['spicy', 'pork', 'chicken'],
          phrases: [
            { english: 'Extra spicy please', chinese: '特辣', pinyin: 'Tè là' },
          ]
        },
      ],
    },
    hotels: {
      budget: { 
        name: 'Beijing Downtown Backpackers', 
        nameChinese: '北京市中心背包客旅舍',
        type: 'Hostel',
        address: '85 Nanluoguxiang, Dongcheng District',
        addressChinese: '东城区南锣鼓巷85号',
        coordinates: { lat: 39.9365, lng: 116.4031 },
        pricePerNight: { rmb: 120, usd: 17 },
        metro: { line: 'Line 6/8', station: 'Nanluoguxiang Station (南锣鼓巷站)', exit: 'Exit E' },
        amenities: ['Free WiFi', 'Shared Kitchen', 'Luggage Storage'],
        phrases: [
          { english: 'I have a reservation', chinese: '我有预订', pinyin: 'Wǒ yǒu yùdìng' },
        ]
      },
      comfort: { 
        name: 'Park Plaza Beijing Wangfujing', 
        nameChinese: '北京王府井丽亭酒店',
        type: '4-Star Hotel',
        address: '97 Jinbao Street, Dongcheng District',
        addressChinese: '东城区金宝街97号',
        coordinates: { lat: 39.9168, lng: 116.4186 },
        pricePerNight: { rmb: 650, usd: 90 },
        metro: { line: 'Line 1/5', station: 'Dengshikou Station (灯市口站)', exit: 'Exit B' },
        amenities: ['Free WiFi', 'Gym', 'Restaurant', 'Concierge'],
        phrases: [
          { english: 'Late checkout please', chinese: '请延迟退房', pinyin: 'Qǐng yánchí tuìfáng' },
        ]
      },
      luxury: { 
        name: 'The Peninsula Beijing', 
        nameChinese: '北京半岛酒店',
        type: '5-Star Luxury',
        address: '8 Goldfish Lane, Wangfujing',
        addressChinese: '王府井金鱼胡同8号',
        coordinates: { lat: 39.9147, lng: 116.4089 },
        pricePerNight: { rmb: 2800, usd: 390 },
        metro: { line: 'Line 1', station: 'Wangfujing Station (王府井站)', exit: 'Exit A' },
        amenities: ['Spa', 'Pool', 'Michelin Restaurant', 'Butler Service'],
        phrases: [
          { english: 'Airport transfer please', chinese: '请安排机场接送', pinyin: 'Qǐng ānpái jīchǎng jiēsòng' },
        ]
      },
    },
    transport: {
      fromShanghai: { method: 'High-Speed Train G2', duration: '4h 30min', price: { rmb: 553, usd: 77 }, station: 'Beijing South Railway Station (北京南站)' },
      fromXian: { method: 'High-Speed Train G652', duration: '4h 30min', price: { rmb: 515, usd: 72 }, station: 'Beijing West Railway Station (北京西站)' },
    },
    emergencyInfo: {
      police: '110',
      ambulance: '120',
      nearestHospital: 'Beijing United Family Hospital - 和睦家医院',
    },
  },

  shanghai: {
    name: 'Shanghai',
    nameChinese: '上海',
    image: 'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?w=800&q=80',
    recommendedDays: 3,
    highlights: [
      { 
        name: 'The Bund', 
        nameChinese: '外滩',
        description: 'Iconic waterfront with colonial architecture', 
        duration: '2 hours',
        address: 'Zhongshan East 1st Road, Huangpu District',
        addressChinese: '黄浦区中山东一路',
        coordinates: { lat: 31.2400, lng: 121.4900 },
        openingHours: 'Open 24 hours (light show 7-10 PM)',
        ticketPrice: { rmb: 0, usd: 0 },
        tips: 'Visit after 7 PM for spectacular light show',
        metro: { line: 'Line 2/10', station: 'Nanjing East Road Station (南京东路站)', exit: 'Exit 7' },
        phrases: [
          { english: 'Take me to The Bund', chinese: '带我去外滩', pinyin: 'Dài wǒ qù Wàitān' },
        ]
      },
      { 
        name: 'Yu Garden', 
        nameChinese: '豫园',
        description: '400-year-old classical Chinese garden', 
        duration: '2 hours',
        address: '137 Anren Street, Huangpu District',
        addressChinese: '黄浦区安仁街137号',
        coordinates: { lat: 31.2272, lng: 121.4924 },
        openingHours: '8:30 AM - 5:00 PM',
        ticketPrice: { rmb: 40, usd: 6 },
        tips: 'Explore the surrounding bazaar for souvenirs',
        metro: { line: 'Line 10', station: 'Yuyuan Garden Station (豫园站)', exit: 'Exit 1' },
        phrases: [
          { english: 'I want to go to Yu Garden', chinese: '我想去豫园', pinyin: 'Wǒ xiǎng qù Yùyuán' },
        ]
      },
      { 
        name: 'Shanghai Tower', 
        nameChinese: '上海中心大厦',
        description: "World's 2nd tallest building observation deck", 
        duration: '2 hours',
        address: '501 Yincheng Middle Road, Pudong',
        addressChinese: '浦东新区银城中路501号',
        coordinates: { lat: 31.2356, lng: 121.5016 },
        openingHours: '8:30 AM - 10:30 PM',
        ticketPrice: { rmb: 180, usd: 25 },
        tips: 'Book online for cheaper tickets, go at sunset',
        metro: { line: 'Line 2', station: 'Lujiazui Station (陆家嘴站)', exit: 'Exit 6' },
        phrases: [
          { english: 'One ticket to observation deck', chinese: '一张观景台门票', pinyin: 'Yī zhāng guānjǐng tái ménpiào' },
        ]
      },
      { 
        name: 'French Concession', 
        nameChinese: '法租界',
        description: 'Tree-lined streets with boutiques and cafes', 
        duration: '3-4 hours',
        address: 'Wukang Road & Huaihai Road area',
        addressChinese: '武康路和淮海路一带',
        coordinates: { lat: 31.2089, lng: 121.4436 },
        openingHours: 'Open 24 hours',
        ticketPrice: { rmb: 0, usd: 0 },
        tips: 'Rent a bike and explore the side streets',
        metro: { line: 'Line 1/7', station: 'Changshu Road Station (常熟路站)', exit: 'Exit 4' },
        phrases: [
          { english: 'Take me to Wukang Road', chinese: '带我去武康路', pinyin: 'Dài wǒ qù Wǔkāng Lù' },
        ]
      },
      { 
        name: 'Zhujiajiao Water Town', 
        nameChinese: '朱家角',
        description: 'Venice of Shanghai - ancient canal town with 36 ancient stone bridges dating back 1,700 years', 
        duration: 'Half day',
        address: 'Zhujiajiao Town, Qingpu District',
        addressChinese: '青浦区朱家角镇',
        coordinates: { lat: 31.1097, lng: 121.0564 },
        openingHours: '8:30 AM - 4:30 PM',
        ticketPrice: { rmb: 60, usd: 8 },
        image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800&q=80',
        tips: 'Take boat ride through canals. Visit early morning to avoid crowds.',
        localSecrets: [
          "The Fangsheng Bridge (放生桥) is the largest 5-arch stone bridge in Shanghai - built in 1571",
          "Try the local specialty zongzi (rice dumplings) wrapped in unique long leaves",
          "The City God Temple here is less touristy than Shanghai's Yu Garden version",
          "Take the 8:00 AM bus to arrive before tour groups flood in around 10 AM",
          "Boat rides are cheaper if you negotiate for a longer route (80-100 RMB for 30 min)",
        ],
        bestPhotoSpots: ['Fangsheng Bridge reflection', 'Canal boats under weeping willows', 'Traditional doorways'],
        metro: { line: 'Line 17', station: 'Zhujiajiao Station (朱家角站)', exit: 'Exit 1' },
        phrases: [
          { english: 'How much for boat ride?', chinese: '坐船多少钱？', pinyin: 'Zuò chuán duōshao qián?' },
        ]
      },
      { 
        name: 'Nanjing Road', 
        nameChinese: '南京路步行街',
        description: 'China\'s premier shopping street - 5.5km of neon lights, historic department stores, and modern malls', 
        duration: '2-3 hours',
        address: 'Nanjing Road Pedestrian Street, Huangpu District',
        addressChinese: '黄浦区南京路步行街',
        coordinates: { lat: 31.2354, lng: 121.4758 },
        openingHours: 'Open 24 hours (shops 10 AM - 10 PM)',
        ticketPrice: { rmb: 0, usd: 0 },
        image: 'https://images.unsplash.com/photo-1548919973-5cef591cdbc9?w=800&q=80',
        tips: 'Walk from People\'s Square to The Bund for the full experience. Evening neon lights are spectacular.',
        localSecrets: [
          "The little tourist train (5 RMB) saves tired feet on the 1.2km pedestrian section",
          "Shanghai No.1 Food Store (第一食品商店) has the best local snacks and souvenirs",
          "The rooftop bars at Peace Hotel and Fairmont offer amazing views of the street",
          "Side streets have better prices than the main pedestrian stretch",
          "The historic Wing On and Sincere department stores date from the 1920s",
        ],
        bestPhotoSpots: ['Neon signs at night', 'Peace Hotel art deco exterior', 'View toward The Bund'],
        metro: { line: 'Line 1/2/8', station: 'People\'s Square Station (人民广场站)', exit: 'Exit 19' },
        phrases: [
          { english: 'Take me to Nanjing Road', chinese: '带我去南京路', pinyin: 'Dài wǒ qù Nánjīng Lù' },
          { english: 'Where is the pedestrian street?', chinese: '步行街在哪里？', pinyin: 'Bùxíngjiē zài nǎlǐ?' },
        ]
      },
      { 
        name: 'Jing\'an Temple', 
        nameChinese: '静安寺',
        description: 'Ancient Buddhist temple surrounded by skyscrapers - a stunning contrast of old and new Shanghai', 
        duration: '1-2 hours',
        address: '1686 Nanjing West Road, Jing\'an District',
        addressChinese: '静安区南京西路1686号',
        coordinates: { lat: 31.2236, lng: 121.4478 },
        openingHours: '7:30 AM - 5:00 PM',
        ticketPrice: { rmb: 50, usd: 7 },
        image: 'https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=800&q=80',
        tips: 'The temple is beautifully lit at night - worth a second visit after dark (exterior only).',
        localSecrets: [
          "Free vegetarian lunch is served to visitors at 11 AM - line up early",
          "The jade Buddha on the 2nd floor is made from a single piece of Burmese jade",
          "Combine with Jing'an Park next door for a peaceful green space in central Shanghai",
          "The temple bell ceremony at 9 AM is open to visitors",
          "Underground is a huge shopping mall - good for escaping rain or heat",
        ],
        bestPhotoSpots: ['Temple against modern skyline', 'Golden Buddha inside', 'Nighttime illumination'],
        metro: { line: 'Line 2/7', station: 'Jing\'an Temple Station (静安寺站)', exit: 'Exit 1' },
        phrases: [
          { english: 'I want to visit the temple', chinese: '我想参观寺庙', pinyin: 'Wǒ xiǎng cānguān sìmiào' },
          { english: 'Can I light incense?', chinese: '可以上香吗？', pinyin: 'Kěyǐ shàng xiāng ma?' },
        ]
      },
      { 
        name: 'Tianzifang', 
        nameChinese: '田子坊',
        description: 'Labyrinthine arts and crafts enclave in renovated shikumen houses - boutiques, galleries, and cafes', 
        duration: '2-3 hours',
        address: '210 Taikang Road, Huangpu District',
        addressChinese: '黄浦区泰康路210弄',
        coordinates: { lat: 31.2105, lng: 121.4661 },
        openingHours: '10:00 AM - 10:00 PM (varies by shop)',
        ticketPrice: { rmb: 0, usd: 0 },
        image: 'https://images.unsplash.com/photo-1577587230708-187fdbef4d91?w=800&q=80',
        tips: 'Get lost in the alleyways - the best shops are hidden in the back lanes. Weekday mornings are less crowded.',
        localSecrets: [
          "Lane 210 is the main entrance but Lane 248 has better local artisan shops",
          "The Commune Social on Jianguo Road (5 min walk) is one of Asia's best cocktail bars",
          "Look for the surviving original residents - some still live in upper floors",
          "The back alleys (Lane 274) have authentic noodle shops vs touristy main lanes",
          "Shanghai Propaganda Poster Art Centre nearby has amazing vintage posters (25 RMB)",
        ],
        bestPhotoSpots: ['Colorful laundry hanging overhead', 'Narrow stone alleys', 'Art deco doorways'],
        metro: { line: 'Line 9', station: 'Dapuqiao Station (打浦桥站)', exit: 'Exit 1' },
        phrases: [
          { english: 'How much is this?', chinese: '这个多少钱？', pinyin: 'Zhège duōshao qián?' },
          { english: 'Can I take photos?', chinese: '可以拍照吗？', pinyin: 'Kěyǐ pāizhào ma?' },
        ]
      },
      { 
        name: 'Shanghai Museum', 
        nameChinese: '上海博物馆',
        description: 'World-class museum housing 120,000 ancient Chinese artifacts - bronze, ceramics, calligraphy, and jade', 
        duration: '3-4 hours',
        address: '201 People\'s Avenue, Huangpu District',
        addressChinese: '黄浦区人民大道201号',
        coordinates: { lat: 31.2298, lng: 121.4739 },
        openingHours: '9:00 AM - 5:00 PM (closed Mondays)',
        ticketPrice: { rmb: 0, usd: 0 },
        image: 'https://images.unsplash.com/photo-1584467541268-b040f83be3fd?w=800&q=80',
        tips: 'Free entry but get tickets online to skip the line. The bronze and ceramics galleries are must-sees.',
        localSecrets: [
          "The audio guide (40 RMB) is excellent - download the app beforehand to save time",
          "The Ancient Chinese Bronze Gallery on 1F is considered one of the best in the world",
          "Check for special exhibitions - they often host world-touring shows",
          "The museum shop has high-quality reproductions as gifts",
          "Weekday mornings have shortest queues - aim for 9 AM arrival",
        ],
        bestPhotoSpots: ['Building exterior shaped like a bronze ding vessel', 'Ancient bronze collection', 'Jade gallery'],
        metro: { line: 'Line 1/2/8', station: 'People\'s Square Station (人民广场站)', exit: 'Exit 1' },
        phrases: [
          { english: 'Where is the entrance?', chinese: '入口在哪里？', pinyin: 'Rùkǒu zài nǎlǐ?' },
          { english: 'Do you have an audio guide?', chinese: '有语音导览吗？', pinyin: 'Yǒu yǔyīn dǎolǎn ma?' },
        ]
      },
    ],
    foods: {
      anything: [
        { 
          name: 'Xiaolongbao at Din Tai Fung', 
          nameChinese: '鼎泰丰小笼包',
          description: 'World-famous soup dumplings', 
          emoji: '🥟',
          address: 'Shanghai Centre, 1376 Nanjing West Road',
          addressChinese: '南京西路1376号上海商城',
          coordinates: { lat: 31.2261, lng: 121.4489 },
          priceRange: '¥100-200 per person',
          metro: { line: 'Line 2/7', station: 'Jing\'an Temple Station (静安寺站)', exit: 'Exit 2' },
          dietaryTags: ['pork'],
          phrases: [
            { english: 'Xiaolongbao, 2 portions please', chinese: '小笼包两笼，谢谢', pinyin: 'Xiǎolóngbāo liǎng lóng, xièxiè' },
          ]
        },
        { 
          name: 'Shengjianbao at Yang\'s', 
          nameChinese: '小杨生煎',
          description: 'Pan-fried soup buns', 
          emoji: '🥟',
          address: '97 Huanghe Road',
          addressChinese: '黄河路97号',
          priceRange: '¥15-30 per person',
          metro: { line: 'Line 1/2/8', station: 'People\'s Square Station (人民广场站)', exit: 'Exit 11' },
          dietaryTags: ['pork'],
          phrases: [
            { english: 'One portion shengjianbao', chinese: '一份生煎包', pinyin: 'Yī fèn shēngjiān bāo' },
          ]
        },
      ],
      halal: [
        { 
          name: 'Xinjiang Haiwan Restaurant', 
          nameChinese: '新疆海湾餐厅',
          description: 'Authentic Uyghur halal cuisine', 
          emoji: '🍖',
          address: '58 Yili South Road, Changning District',
          addressChinese: '长宁区伊犁南路58号',
          priceRange: '¥80-150 per person',
          metro: { line: 'Line 10', station: 'Yili Road Station (伊犁路站)', exit: 'Exit 3' },
          dietaryTags: ['halal', 'lamb', 'beef'],
          phrases: [
            { english: 'Is this halal certified?', chinese: '这是清真认证的吗？', pinyin: 'Zhè shì qīngzhēn rènzhèng de ma?' },
            { english: 'Lamb pilaf please', chinese: '手抓饭', pinyin: 'Shǒuzhuā fàn' },
          ]
        },
        { 
          name: 'Lanzhou Halal Noodles', 
          nameChinese: '兰州清真拉面',
          description: 'Hand-pulled beef noodles', 
          emoji: '🍜',
          address: 'Multiple locations throughout Shanghai',
          addressChinese: '上海各地',
          priceRange: '¥20-35',
          dietaryTags: ['halal', 'beef'],
          phrases: [
            { english: 'One bowl beef noodle soup', chinese: '一碗牛肉面', pinyin: 'Yī wǎn niúròu miàn' },
          ]
        },
      ],
      vegetarian: [
        { 
          name: 'Wujie Vegetarian', 
          nameChinese: '无界素食',
          description: 'Upscale vegetarian restaurant', 
          emoji: '🥗',
          address: '33 Shaoxing Road',
          addressChinese: '绍兴路33号',
          priceRange: '¥150-300 per person',
          metro: { line: 'Line 9', station: 'Dapuqiao Station (打浦桥站)', exit: 'Exit 1' },
          dietaryTags: ['vegetarian', 'vegan-options'],
          phrases: [
            { english: 'Vegetarian menu please', chinese: '素食菜单', pinyin: 'Sùshí càidān' },
          ]
        },
      ],
      spicy: [
        { 
          name: 'Spicy Hot Pot at Haidilao', 
          nameChinese: '海底捞火锅',
          description: 'Famous hot pot chain with great service', 
          emoji: '🍲',
          address: 'Multiple locations',
          addressChinese: '多家分店',
          priceRange: '¥150-250 per person',
          dietaryTags: ['spicy', 'beef', 'lamb', 'seafood'],
          phrases: [
            { english: 'Spicy broth please', chinese: '麻辣锅底', pinyin: 'Málà guōdǐ' },
          ]
        },
      ],
    },
    hotels: {
      budget: { 
        name: 'Captain Hostel', 
        nameChinese: '船长青年酒店',
        type: 'Boutique Hostel',
        address: '37 Fuzhou Road, Huangpu District',
        addressChinese: '黄浦区福州路37号',
        pricePerNight: { rmb: 150, usd: 21 },
        metro: { line: 'Line 2/10', station: 'Nanjing East Road Station (南京东路站)', exit: 'Exit 4' },
        amenities: ['Rooftop Bar', 'Free WiFi', 'Bund Views'],
      },
      comfort: { 
        name: 'JW Marriott Shanghai', 
        nameChinese: '上海明天广场JW万豪酒店',
        type: '4-Star Hotel',
        address: '399 Nanjing West Road',
        addressChinese: '南京西路399号',
        pricePerNight: { rmb: 900, usd: 125 },
        metro: { line: 'Line 1/2/8', station: 'People\'s Square Station (人民广场站)', exit: 'Exit 7' },
        amenities: ['Pool', 'Spa', 'Gym', 'Executive Lounge'],
      },
      luxury: { 
        name: 'The Shanghai EDITION', 
        nameChinese: '上海艾迪逊酒店',
        type: '5-Star Luxury',
        address: '199 Nanjing East Road',
        addressChinese: '南京东路199号',
        pricePerNight: { rmb: 2500, usd: 350 },
        metro: { line: 'Line 2/10', station: 'Nanjing East Road Station (南京东路站)', exit: 'Exit 6' },
        amenities: ['Rooftop Bar', 'Spa', 'Bund Views', 'Butler Service'],
      },
    },
    transport: {
      fromBeijing: { method: 'High-Speed Train G1', duration: '4h 30min', price: { rmb: 553, usd: 77 }, station: 'Shanghai Hongqiao Station (上海虹桥站)' },
    },
    emergencyInfo: {
      police: '110',
      ambulance: '120',
      nearestHospital: 'Shanghai United Family Hospital',
    },
  },

  chengdu: {
    name: 'Chengdu',
    nameChinese: '成都',
    image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&q=80',
    recommendedDays: 3,
    highlights: [
      { 
        name: 'Giant Panda Base', 
        nameChinese: '成都大熊猫繁育研究基地',
        description: 'See pandas up close in natural habitat', 
        duration: '3-4 hours',
        address: '1375 Xiongmao Avenue, Chenghua District',
        addressChinese: '成华区熊猫大道1375号',
        coordinates: { lat: 30.7333, lng: 104.1456 },
        openingHours: '7:30 AM - 6:00 PM',
        ticketPrice: { rmb: 55, usd: 8 },
        tips: 'Arrive before 9 AM for feeding time',
        metro: { line: 'Line 3', station: 'Panda Avenue Station (熊猫大道站)', exit: 'Exit A - Then shuttle bus' },
        phrases: [
          { english: 'Take me to Panda Base', chinese: '带我去熊猫基地', pinyin: 'Dài wǒ qù Xióngmāo jīdì' },
        ]
      },
      { 
        name: 'Jinli Ancient Street', 
        nameChinese: '锦里古街',
        description: 'Traditional architecture and snacks', 
        duration: '2-3 hours',
        address: '231 Wuhouci Street, Wuhou District',
        addressChinese: '武侯区武侯祠大街231号',
        coordinates: { lat: 30.6459, lng: 104.0478 },
        openingHours: '24 hours (shops 9 AM - 10 PM)',
        ticketPrice: { rmb: 0, usd: 0 },
        tips: 'Best at night with lanterns lit',
        metro: { line: 'Line 3', station: 'Gaoshengqiao Station (高升桥站)', exit: 'Exit D' },
        phrases: [
          { english: 'I want to try local snacks', chinese: '我想尝尝当地小吃', pinyin: 'Wǒ xiǎng chángchang dāngdì xiǎochī' },
        ]
      },
      { 
        name: 'People\'s Park Tea House', 
        nameChinese: '人民公园茶馆',
        description: 'Experience authentic Chengdu tea culture', 
        duration: '2-3 hours',
        address: '12 Shaocheng Road, Qingyang District',
        addressChinese: '青羊区少城路12号',
        coordinates: { lat: 30.6628, lng: 104.0573 },
        openingHours: '6:00 AM - 10:00 PM',
        ticketPrice: { rmb: 0, usd: 0 },
        tips: 'Get ear cleaning service, play mahjong',
        metro: { line: 'Line 2', station: 'People\'s Park Station (人民公园站)', exit: 'Exit C' },
        phrases: [
          { english: 'One cup of tea please', chinese: '一杯茶，谢谢', pinyin: 'Yī bēi chá, xièxiè' },
        ]
      },
      { 
        name: 'Leshan Giant Buddha', 
        nameChinese: '乐山大佛',
        description: "World's largest stone Buddha statue", 
        duration: 'Full day trip',
        address: 'Leshan City, Sichuan Province',
        addressChinese: '四川省乐山市',
        coordinates: { lat: 29.5446, lng: 103.7735 },
        openingHours: '7:30 AM - 6:30 PM',
        ticketPrice: { rmb: 80, usd: 11 },
        tips: 'Take boat for best view',
        metro: { line: 'N/A', station: 'Take high-speed train from Chengdu East to Leshan (1 hour)', exit: '' },
        phrases: [
          { english: 'Train ticket to Leshan', chinese: '去乐山的火车票', pinyin: 'Qù Lèshān de huǒchē piào' },
        ]
      },
    ],
    foods: {
      anything: [
        { 
          name: 'Sichuan Hot Pot', 
          nameChinese: '四川火锅',
          description: 'Numbing spicy communal dining', 
          emoji: '🍲',
          address: 'Xiaolongkan Hotpot, Multiple locations',
          addressChinese: '小龙坎火锅（多家分店）',
          priceRange: '¥80-150 per person',
          dietaryTags: ['spicy', 'beef', 'pork', 'lamb'],
          phrases: [
            { english: 'Half spicy half plain', chinese: '鸳鸯锅', pinyin: 'Yuānyāng guō' },
          ]
        },
        { 
          name: 'Mapo Tofu at Chen Mapo', 
          nameChinese: '陈麻婆豆腐',
          description: 'Original birthplace since 1862', 
          emoji: '🥘',
          address: '197 Qinghua Road',
          addressChinese: '青华路197号',
          priceRange: '¥40-80 per person',
          metro: { line: 'Line 4', station: 'Kuanzhai Alley Station (宽窄巷子站)', exit: 'Exit B' },
          dietaryTags: ['spicy', 'vegetarian-friendly'],
          phrases: [
            { english: 'One mapo tofu please', chinese: '一份麻婆豆腐', pinyin: 'Yī fèn mápó dòufu' },
          ]
        },
      ],
      halal: [
        { 
          name: 'Huangcheng Halal Restaurant', 
          nameChinese: '皇城清真餐厅',
          description: 'Muslim-owned halal Sichuan food', 
          emoji: '🥘',
          address: 'Near Wuhou District mosque',
          addressChinese: '武侯区清真寺附近',
          priceRange: '¥60-120 per person',
          dietaryTags: ['halal', 'beef', 'lamb', 'chicken'],
          phrases: [
            { english: 'Halal beef dishes', chinese: '清真牛肉菜', pinyin: 'Qīngzhēn niúròu cài' },
            { english: 'No pork, I am Muslim', chinese: '不要猪肉，我是穆斯林', pinyin: 'Bù yào zhūròu, wǒ shì Mùsīlín' },
          ]
        },
        { 
          name: 'Halal Lamb Skewers', 
          nameChinese: '清真羊肉串',
          description: 'Spiced lamb from Muslim vendors', 
          emoji: '🍢',
          address: 'Street vendors near Jinli',
          addressChinese: '锦里附近街头摊位',
          priceRange: '¥5-10 per skewer',
          dietaryTags: ['halal', 'lamb'],
          phrases: [
            { english: 'Is this halal lamb?', chinese: '这是清真羊肉吗？', pinyin: 'Zhè shì qīngzhēn yángròu ma?' },
          ]
        },
      ],
      vegetarian: [
        { 
          name: 'Buddhist Vegetarian at Wenshu Temple', 
          nameChinese: '文殊院素斋',
          description: 'Temple vegetarian cuisine', 
          emoji: '🥬',
          address: 'Wenshu Temple, Qingyang District',
          addressChinese: '青羊区文殊院',
          priceRange: '¥30-60 per person',
          metro: { line: 'Line 1', station: 'Wenshu Temple Station (文殊院站)', exit: 'Exit K' },
          dietaryTags: ['vegetarian', 'buddhist', 'vegan-options'],
          phrases: [
            { english: 'Vegetarian set meal', chinese: '素食套餐', pinyin: 'Sùshí tàocān' },
          ]
        },
      ],
      spicy: [
        { 
          name: 'Sichuan Hot Pot - Extra Spicy', 
          nameChinese: '四川火锅（特辣）',
          description: 'The authentic numbing experience', 
          emoji: '🌶️',
          address: 'Shulao Hot Pot, Chunxi Road',
          addressChinese: '春熙路蜀老火锅',
          priceRange: '¥100-180 per person',
          metro: { line: 'Line 2/3', station: 'Chunxi Road Station (春熙路站)', exit: 'Exit A' },
          dietaryTags: ['spicy', 'extra-spicy'],
          phrases: [
            { english: 'Maximum spicy level', chinese: '最辣', pinyin: 'Zuì là' },
          ]
        },
      ],
    },
    hotels: {
      budget: { 
        name: 'Lazybones Hostel', 
        nameChinese: '懒骨头青年旅舍',
        type: 'Hostel',
        address: '18 Jinli West Road',
        addressChinese: '锦里西路18号',
        pricePerNight: { rmb: 80, usd: 11 },
        metro: { line: 'Line 3', station: 'Gaoshengqiao Station (高升桥站)', exit: 'Exit D' },
        amenities: ['Free WiFi', 'Rooftop', 'Bar'],
      },
      comfort: { 
        name: 'The Temple House', 
        nameChinese: '博舍酒店',
        type: 'Boutique Hotel',
        address: '81 Bitieshi Street',
        addressChinese: '笔帖式街81号',
        pricePerNight: { rmb: 1200, usd: 167 },
        metro: { line: 'Line 2/3', station: 'Chunxi Road Station (春熙路站)', exit: 'Exit B' },
        amenities: ['Pool', 'Spa', 'Courtyard', 'Bike Rental'],
      },
      luxury: { 
        name: 'The Ritz-Carlton Chengdu', 
        nameChinese: '成都丽思卡尔顿酒店',
        type: '5-Star Luxury',
        address: '269 Shuncheng Avenue',
        addressChinese: '顺城大街269号',
        pricePerNight: { rmb: 2200, usd: 306 },
        metro: { line: 'Line 1/2', station: 'Tianfu Square Station (天府广场站)', exit: 'Exit A' },
        amenities: ['Spa', 'Pool', 'Club Lounge'],
      },
    },
    transport: {
      fromShanghai: { method: 'Flight', duration: '2h 45min', price: { rmb: 800, usd: 111 }, station: 'Chengdu Shuangliu Airport (成都双流机场)' },
    },
    emergencyInfo: {
      police: '110',
      ambulance: '120',
      nearestHospital: 'West China Hospital',
    },
  },

  xian: {
    name: "Xi'an",
    nameChinese: '西安',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80',
    recommendedDays: 2,
    highlights: [
      { 
        name: 'Terracotta Warriors', 
        nameChinese: '兵马俑',
        description: '8,000 life-sized clay soldiers', 
        duration: 'Half day',
        address: 'Lintong District',
        addressChinese: '临潼区秦始皇兵马俑博物馆',
        coordinates: { lat: 34.3847, lng: 109.2785 },
        openingHours: '8:30 AM - 5:00 PM',
        ticketPrice: { rmb: 120, usd: 17 },
        tips: 'Hire English guide at entrance',
        metro: { line: 'N/A', station: 'Bus 306 from Xi\'an Railway Station (西安火车站)', exit: 'Takes 1.5 hours' },
        phrases: [
          { english: 'Take me to Terracotta Warriors', chinese: '带我去兵马俑', pinyin: 'Dài wǒ qù Bīngmǎyǒng' },
        ]
      },
      { 
        name: 'Ancient City Wall', 
        nameChinese: '西安城墙',
        description: 'Bike or walk the 14km fortification', 
        duration: '2-3 hours',
        address: 'South Gate (Yongningmen)',
        addressChinese: '永宁门（南门）',
        coordinates: { lat: 34.2525, lng: 108.9465 },
        openingHours: '8:00 AM - 10:00 PM',
        ticketPrice: { rmb: 54, usd: 8 },
        tips: 'Rent bike (¥45 for 2 hours)',
        metro: { line: 'Line 2', station: 'Yongningmen Station (永宁门站)', exit: 'Exit A' },
        phrases: [
          { english: 'I want to rent a bike', chinese: '我想租自行车', pinyin: 'Wǒ xiǎng zū zìxíngchē' },
        ]
      },
      { 
        name: 'Muslim Quarter', 
        nameChinese: '回民街',
        description: 'Vibrant 1,000-year-old food street in the heart of Xi\'an\'s Muslim community - home to the Great Mosque and endless halal delights', 
        duration: '3-4 hours',
        address: 'Beiyuanmen, Lianhu District',
        addressChinese: '莲湖区北院门',
        coordinates: { lat: 34.2628, lng: 108.9437 },
        openingHours: '24 hours',
        ticketPrice: { rmb: 0, usd: 0 },
        image: 'https://images.unsplash.com/photo-1591871937573-74dbba515c4c?w=800&q=80',
        tips: 'The best food stalls are in the side alleys, not the main drag. Come hungry!',
        localSecrets: [
          "The Great Mosque (25 RMB) is one of China's oldest and most beautiful - don't miss it",
          "Lao Tong Jia (老童家) has the best roujiamo - locals line up for hours",
          "Side streets like Dapiyuan (大皮院) have better prices than the main street",
          "Night market after 8 PM is the most atmospheric time to visit",
          "Try the pomegranate juice fresh-squeezed on the street (5 RMB)",
        ],
        bestPhotoSpots: ['Food vendors with steam rising', 'Great Mosque interior courtyard', 'Neon-lit food stalls at night'],
        metro: { line: 'Line 2', station: 'Bell Tower Station (钟楼站)', exit: 'Exit A - Walk 10 minutes' },
        phrases: [
          { english: 'Where is Muslim Quarter?', chinese: '回民街在哪里？', pinyin: 'Huímín Jiē zài nǎlǐ?' },
          { english: 'Is this halal?', chinese: '这是清真的吗？', pinyin: 'Zhè shì qīngzhēn de ma?' },
        ]
      },
      { 
        name: 'Big Wild Goose Pagoda', 
        nameChinese: '大雁塔',
        description: 'Iconic 7-story Tang Dynasty pagoda built in 652 AD to house Buddhist scriptures brought from India - Xi\'an\'s most recognizable landmark', 
        duration: '2-3 hours',
        address: 'Da Ci\'en Temple, Yanta District',
        addressChinese: '雁塔区大慈恩寺',
        coordinates: { lat: 34.2186, lng: 108.9644 },
        openingHours: '8:00 AM - 5:30 PM (Pagoda climb extra fee)',
        ticketPrice: { rmb: 50, usd: 7 },
        image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80',
        tips: 'Climb the pagoda for 30 RMB extra. The musical fountain show at night is spectacular (8:30 PM in summer).',
        localSecrets: [
          "The musical fountain show (free) is Asia's largest - arrive 30 min early for best viewing spots",
          "The temple complex is more interesting than the pagoda itself - explore thoroughly",
          "Sunset views from the top of the pagoda are incredible",
          "The North Square has great street performances in the evening",
          "Combine with Tang Paradise next door for a full day of Tang Dynasty immersion",
        ],
        bestPhotoSpots: ['Pagoda reflection in temple pond', 'Sunset from pagoda top floor', 'Fountain show with pagoda backdrop'],
        metro: { line: 'Line 3/4', station: 'Dayanta Station (大雁塔站)', exit: 'Exit B' },
        phrases: [
          { english: 'I want to climb the pagoda', chinese: '我想登塔', pinyin: 'Wǒ xiǎng dēng tǎ' },
          { english: 'What time is the fountain show?', chinese: '喷泉表演几点开始？', pinyin: 'Pēnquán biǎoyǎn jǐ diǎn kāishǐ?' },
        ]
      },
      { 
        name: 'Bell Tower & Drum Tower', 
        nameChinese: '钟楼和鼓楼',
        description: 'Twin Ming Dynasty landmarks in the heart of Xi\'an - the Bell Tower marks the city center, the Drum Tower guards the Muslim Quarter', 
        duration: '1-2 hours',
        address: 'Bell & Drum Tower Square, Lianhu District',
        addressChinese: '莲湖区钟鼓楼广场',
        coordinates: { lat: 34.2598, lng: 108.9426 },
        openingHours: '8:30 AM - 9:30 PM (Apr-Oct), 8:30 AM - 6:00 PM (Nov-Mar)',
        ticketPrice: { rmb: 50, usd: 7 },
        image: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=800&q=80',
        tips: 'Buy the combo ticket (50 RMB) for both towers. The Drum Tower has traditional performances at set times.',
        localSecrets: [
          "Bell ringing ceremony happens at 9 AM and 12 PM - the sound echoes across the city",
          "Drum performances at the Drum Tower are at 9:30, 10:30, 11:30 AM and 2:30, 3:30, 4:30 PM",
          "The underground passage between them has a small museum (free with ticket)",
          "Night illumination makes for spectacular photos - visit after 7 PM",
          "The rooftop café at the nearby Zhonggulou Hotel has the best aerial views",
        ],
        bestPhotoSpots: ['Bell Tower at night from the square', 'Drum Tower with Muslim Quarter behind', 'Both towers in one frame from the plaza'],
        metro: { line: 'Line 2', station: 'Bell Tower Station (钟楼站)', exit: 'Exit C' },
        phrases: [
          { english: 'Combo ticket for both towers please', chinese: '请给我两个塔的联票', pinyin: 'Qǐng gěi wǒ liǎng gè tǎ de liánpiào' },
          { english: 'What time is the drum performance?', chinese: '鼓乐表演几点？', pinyin: 'Gǔyuè biǎoyǎn jǐ diǎn?' },
        ]
      },
      { 
        name: 'Huaqing Palace & Hot Springs', 
        nameChinese: '华清宫',
        description: 'Imperial hot spring resort where Emperor Xuanzong romanced his beloved consort Yang Guifei - 3,000 years of royal bathing history', 
        duration: '3-4 hours',
        address: 'Huaqing Road, Lintong District',
        addressChinese: '临潼区华清路',
        coordinates: { lat: 34.3569, lng: 109.2139 },
        openingHours: '7:00 AM - 7:00 PM (Apr-Oct), 7:30 AM - 6:00 PM (Nov-Mar)',
        ticketPrice: { rmb: 120, usd: 17 },
        image: 'https://images.unsplash.com/photo-1548919973-5cef591cdbc9?w=800&q=80',
        tips: 'Combine with Terracotta Warriors on the same day trip. The evening "Song of Everlasting Sorrow" show is stunning.',
        localSecrets: [
          "The evening show (268-988 RMB) is a must-see - book tickets in advance online",
          "The Nine-Dragon Pool was the emperor's private bath - you can still see the hot springs bubbling",
          "Li Mountain behind has hiking trails with panoramic views",
          "Chiang Kai-shek was captured here in 1936 - the bullet holes are still visible in one building",
          "Combine with Terracotta Warriors - both are 45 min from city center in the same direction",
        ],
        bestPhotoSpots: ['Lotus Pool reflections', 'Hot springs steaming at sunrise', 'View from Li Mountain'],
        metro: { line: 'N/A', station: 'Bus 914/915 from Xi\'an Railway Station (西安火车站)', exit: 'Same bus continues to Terracotta Warriors' },
        phrases: [
          { english: 'Can I bathe in the hot springs?', chinese: '可以泡温泉吗？', pinyin: 'Kěyǐ pào wēnquán ma?' },
          { english: 'Evening show tickets please', chinese: '请给我晚场演出票', pinyin: 'Qǐng gěi wǒ wǎnchǎng yǎnchū piào' },
        ]
      },
      { 
        name: 'Shaanxi History Museum', 
        nameChinese: '陕西历史博物馆',
        description: 'China\'s premier history museum with 370,000 artifacts spanning 1 million years - Tang Dynasty gold and silver treasures are highlights', 
        duration: '3-4 hours',
        address: '91 Xiaozhai East Road, Yanta District',
        addressChinese: '雁塔区小寨东路91号',
        coordinates: { lat: 34.2269, lng: 108.9544 },
        openingHours: '9:00 AM - 5:30 PM (Closed Mondays)',
        ticketPrice: { rmb: 0, usd: 0 },
        image: 'https://images.unsplash.com/photo-1569503689530-9a1e07f10e11?w=800&q=80',
        tips: 'Free but requires reservation on their WeChat mini-program. Go early - only 6,000 tickets per day.',
        localSecrets: [
          "The Tang Dynasty Treasures Hall (30 RMB) is worth the extra fee - gold artifacts are stunning",
          "Book tickets 5 days in advance through the official WeChat - they run out quickly",
          "The basement has a hidden gem: the Bronze Age collection",
          "English audio guide (30 RMB) is essential - the labels are mostly in Chinese",
          "The gift shop has high-quality replica artifacts as souvenirs",
        ],
        bestPhotoSpots: ['Tang Dynasty dancing horse sculpture', 'Zhou Dynasty bronze vessels', 'Building exterior in traditional style'],
        metro: { line: 'Line 2/3', station: 'Xiaozhai Station (小寨站)', exit: 'Exit C' },
        phrases: [
          { english: 'I have a reservation', chinese: '我有预约', pinyin: 'Wǒ yǒu yùyuē' },
          { english: 'Where is the Tang treasures hall?', chinese: '唐代珍宝馆在哪里？', pinyin: 'Táng dài zhēnbǎo guǎn zài nǎlǐ?' },
        ]
      },
      { 
        name: 'Small Wild Goose Pagoda', 
        nameChinese: '小雁塔',
        description: 'Elegant Tang Dynasty pagoda that survived multiple earthquakes - now part of a serene temple complex with a fascinating Xi\'an Museum', 
        duration: '2-3 hours',
        address: 'Youyi West Road, Beilin District',
        addressChinese: '碑林区友谊西路',
        coordinates: { lat: 34.2411, lng: 108.9394 },
        openingHours: '9:00 AM - 5:00 PM (Closed Mondays)',
        ticketPrice: { rmb: 0, usd: 0 },
        image: 'https://images.unsplash.com/photo-1570197571499-166b36435e9f?w=800&q=80',
        tips: 'Free entry - much less crowded than Big Wild Goose Pagoda. The morning bell ceremony at 9 AM is magical.',
        localSecrets: [
          "The temple bells still ring every morning at 9 AM - locals believe it brings good luck",
          "The pagoda was cracked by earthquakes but magically 'healed' - you can still see the crack lines",
          "The attached Xi'an Museum (free) has excellent shadow puppet exhibits",
          "The ancient tree courtyard is one of the most peaceful spots in Xi'an",
          "Local elders practice tai chi here every morning - arrive before 8 AM to join",
        ],
        bestPhotoSpots: ['Pagoda through blooming magnolias (spring)', 'Bell tower at sunrise', 'Ancient trees in courtyard'],
        metro: { line: 'Line 2', station: 'Nanshaoemen Station (南稍门站)', exit: 'Exit A' },
        phrases: [
          { english: 'Is there a morning bell ceremony?', chinese: '有晨钟仪式吗？', pinyin: 'Yǒu chénzhōng yíshì ma?' },
          { english: 'Can I climb the pagoda?', chinese: '可以登塔吗？', pinyin: 'Kěyǐ dēng tǎ ma?' },
        ]
      },
    ],
    foods: {
      anything: [
        { 
          name: 'Roujiamo (Chinese Burger)', 
          nameChinese: '肉夹馍',
          description: 'Braised meat in crispy bread', 
          emoji: '🥙',
          address: 'Muslim Quarter',
          addressChinese: '回民街',
          priceRange: '¥15-25',
          dietaryTags: ['pork', 'beef-option'],
          phrases: [
            { english: 'One roujiamo please', chinese: '一个肉夹馍', pinyin: 'Yī gè ròujiāmó' },
          ]
        },
      ],
      halal: [
        { 
          name: 'Muslim Quarter Lamb', 
          nameChinese: '回民街羊肉',
          description: 'Authentic halal lamb dishes', 
          emoji: '🍖',
          address: 'Muslim Quarter main street',
          addressChinese: '回民街主街',
          priceRange: '¥30-80 per person',
          metro: { line: 'Line 2', station: 'Bell Tower Station (钟楼站)', exit: 'Exit A' },
          dietaryTags: ['halal', 'lamb'],
          phrases: [
            { english: 'Halal lamb skewers', chinese: '清真羊肉串', pinyin: 'Qīngzhēn yángròu chuàn' },
          ]
        },
        { 
          name: 'Yangrou Paomo', 
          nameChinese: '羊肉泡馍',
          description: 'Lamb soup with torn bread - halal specialty', 
          emoji: '🍲',
          address: 'Lao Sun Jia, Muslim Quarter',
          addressChinese: '老孙家饭庄',
          priceRange: '¥45-65',
          dietaryTags: ['halal', 'lamb'],
          phrases: [
            { english: 'One yangrou paomo', chinese: '一碗羊肉泡馍', pinyin: 'Yī wǎn yángròu pàomó' },
          ]
        },
        { 
          name: 'Halal Biangbiang Noodles', 
          nameChinese: '清真Biángbiáng面',
          description: 'Wide belt noodles with halal beef', 
          emoji: '🍜',
          address: 'Muslim Quarter halal restaurants',
          addressChinese: '回民街清真餐馆',
          priceRange: '¥20-35',
          dietaryTags: ['halal', 'beef'],
          phrases: [
            { english: 'Halal biangbiang noodles with beef', chinese: '清真牛肉biangbiang面', pinyin: 'Qīngzhēn niúròu biángbiáng miàn' },
          ]
        },
      ],
      vegetarian: [
        { 
          name: 'Vegetarian Noodles', 
          nameChinese: '素面',
          description: 'Plain noodles with vegetables', 
          emoji: '🍜',
          address: 'Various restaurants',
          priceRange: '¥15-30',
          dietaryTags: ['vegetarian'],
          phrases: [
            { english: 'Vegetarian noodles, no meat', chinese: '素面，不要肉', pinyin: 'Sù miàn, bù yào ròu' },
          ]
        },
      ],
      spicy: [
        { 
          name: 'Spicy Lamb Skewers', 
          nameChinese: '麻辣羊肉串',
          description: 'Cumin and chili spiced lamb', 
          emoji: '🌶️',
          address: 'Muslim Quarter vendors',
          priceRange: '¥5-10 per skewer',
          dietaryTags: ['spicy', 'halal', 'lamb'],
          phrases: [
            { english: 'Extra spicy please', chinese: '加辣', pinyin: 'Jiā là' },
          ]
        },
      ],
    },
    hotels: {
      budget: { 
        name: "Xi'an Travelling With Hostel", 
        nameChinese: '西安同行青年旅舍',
        type: 'Hostel',
        address: 'Near South Gate',
        addressChinese: '南门附近',
        pricePerNight: { rmb: 60, usd: 8 },
        metro: { line: 'Line 2', station: 'Yongningmen Station (永宁门站)', exit: 'Exit B' },
        amenities: ['Free WiFi', 'Tour Desk', 'Bike Rental'],
      },
      comfort: { 
        name: 'Sofitel Xi\'an', 
        nameChinese: '西安索菲特酒店',
        type: '4-Star Hotel',
        address: '319 Dongxin Street',
        addressChinese: '东新街319号',
        pricePerNight: { rmb: 700, usd: 97 },
        metro: { line: 'Line 1', station: 'Wulukou Station (五路口站)', exit: 'Exit C' },
        amenities: ['Pool', 'Spa', 'French Restaurant'],
      },
      luxury: { 
        name: 'The Westin Xi\'an', 
        nameChinese: '西安威斯汀酒店',
        type: '5-Star Luxury',
        address: '66 Ci\'en Road',
        addressChinese: '慈恩路66号',
        pricePerNight: { rmb: 1500, usd: 208 },
        metro: { line: 'Line 3/4', station: 'Dayanta Station (大雁塔站)', exit: 'Exit D' },
        amenities: ['Heavenly Spa', 'Pool', 'Executive Lounge'],
      },
    },
    transport: {
      fromBeijing: { method: 'High-Speed Train G87', duration: '4h 30min', price: { rmb: 515, usd: 72 }, station: 'Xi\'an North Station (西安北站)' },
    },
    emergencyInfo: {
      police: '110',
      ambulance: '120',
    },
  },

  guilin: {
    name: 'Guilin & Yangshuo',
    nameChinese: '桂林',
    image: 'https://images.unsplash.com/photo-1537531383496-f4749b8032cf?w=800&q=80',
    recommendedDays: 3,
    highlights: [
      { 
        name: 'Li River Cruise', 
        nameChinese: '漓江游船',
        description: 'Drift past karst mountains to Yangshuo', 
        duration: '4-5 hours',
        address: 'Zhujiang Pier, Guilin',
        addressChinese: '桂林市竹江码头',
        coordinates: { lat: 25.2868, lng: 110.2934 },
        openingHours: 'Boats depart 9:00-10:30 AM',
        ticketPrice: { rmb: 210, usd: 29 },
        tips: 'Book 4-star boat for better experience',
        metro: { line: 'N/A', station: 'Take taxi from Guilin city (45 min to pier)', exit: '' },
        phrases: [
          { english: 'Take me to Zhujiang Pier', chinese: '带我去竹江码头', pinyin: 'Dài wǒ qù Zhújiāng mǎtóu' },
        ]
      },
      { 
        name: 'Yangshuo Countryside Cycling', 
        nameChinese: '阳朔乡村骑行',
        description: 'Bike through rice paddies and villages', 
        duration: 'Half day',
        address: 'Yangshuo Town Center',
        addressChinese: '阳朔镇中心',
        openingHours: 'Bike rentals 8 AM - 6 PM',
        ticketPrice: { rmb: 50, usd: 7 },
        tips: 'Get e-bike, ride to Moon Hill',
        metro: { line: 'N/A', station: 'In Yangshuo - rent from West Street area', exit: '' },
        phrases: [
          { english: 'Rent an electric bike', chinese: '租一辆电动车', pinyin: 'Zū yī liàng diàndòngchē' },
        ]
      },
      { 
        name: 'Reed Flute Cave', 
        nameChinese: '芦笛岩',
        description: 'Illuminated limestone wonderland', 
        duration: '1.5 hours',
        address: '1 Ludi Road, Xiufeng District',
        addressChinese: '秀峰区芦笛路1号',
        openingHours: '7:30 AM - 6:00 PM',
        ticketPrice: { rmb: 110, usd: 15 },
        tips: 'Visit in afternoon to avoid crowds',
        metro: { line: 'N/A', station: 'Bus 3 or 58 from Guilin city center', exit: '' },
        phrases: [
          { english: 'Take me to Reed Flute Cave', chinese: '带我去芦笛岩', pinyin: 'Dài wǒ qù Lúdí Yán' },
        ]
      },
    ],
    foods: {
      anything: [
        { 
          name: 'Guilin Rice Noodles', 
          nameChinese: '桂林米粉',
          description: 'Famous breakfast staple', 
          emoji: '🍜',
          address: 'Chongshan Rice Noodles',
          addressChinese: '崇善米粉',
          priceRange: '¥10-20',
          dietaryTags: ['pork-option', 'beef-option'],
          phrases: [
            { english: 'One bowl rice noodles', chinese: '一碗米粉', pinyin: 'Yī wǎn mǐfěn' },
          ]
        },
        { 
          name: 'Beer Fish', 
          nameChinese: '啤酒鱼',
          description: 'Yangshuo signature dish', 
          emoji: '🐟',
          address: 'West Street, Yangshuo',
          addressChinese: '阳朔西街',
          priceRange: '¥80-120',
          dietaryTags: ['seafood'],
          phrases: [
            { english: 'One beer fish please', chinese: '一份啤酒鱼', pinyin: 'Yī fèn píjiǔ yú' },
          ]
        },
      ],
      halal: [
        { 
          name: 'Guilin Halal Restaurant', 
          nameChinese: '桂林清真餐厅',
          description: 'Muslim-owned halal food', 
          emoji: '🥘',
          address: 'Near Guilin Railway Station',
          addressChinese: '桂林火车站附近',
          priceRange: '¥40-80',
          dietaryTags: ['halal', 'beef', 'lamb', 'chicken'],
          phrases: [
            { english: 'Is there halal restaurant nearby?', chinese: '附近有清真餐厅吗？', pinyin: 'Fùjìn yǒu qīngzhēn cāntīng ma?' },
          ]
        },
        { 
          name: 'Halal Beef Noodles', 
          nameChinese: '清真牛肉面',
          description: 'Hand-pulled halal noodles', 
          emoji: '🍜',
          address: 'Various locations',
          priceRange: '¥20-35',
          dietaryTags: ['halal', 'beef'],
          phrases: [
            { english: 'Halal beef noodles', chinese: '清真牛肉面', pinyin: 'Qīngzhēn niúròu miàn' },
          ]
        },
      ],
      vegetarian: [
        { 
          name: 'Vegetarian Rice Noodles', 
          nameChinese: '素米粉',
          description: 'Rice noodles with vegetables only', 
          emoji: '🍜',
          address: 'Most rice noodle shops',
          priceRange: '¥8-15',
          dietaryTags: ['vegetarian'],
          phrases: [
            { english: 'Vegetarian rice noodles, no meat', chinese: '素米粉，不要肉', pinyin: 'Sù mǐfěn, bù yào ròu' },
          ]
        },
      ],
      spicy: [
        { 
          name: 'Spicy Beer Fish', 
          nameChinese: '麻辣啤酒鱼',
          description: 'Beer fish with extra chili', 
          emoji: '🌶️',
          address: 'West Street restaurants',
          priceRange: '¥90-130',
          dietaryTags: ['spicy', 'seafood'],
          phrases: [
            { english: 'Extra spicy beer fish', chinese: '加辣啤酒鱼', pinyin: 'Jiā là píjiǔ yú' },
          ]
        },
      ],
    },
    hotels: {
      budget: { 
        name: 'Yangshuo Village Inn', 
        nameChinese: '阳朔村居',
        type: 'Guesthouse',
        address: 'Moon Hill Village, Yangshuo',
        addressChinese: '阳朔月亮山村',
        pricePerNight: { rmb: 100, usd: 14 },
        metro: { line: 'N/A', station: 'In Yangshuo countryside', exit: '' },
        amenities: ['Mountain Views', 'Bike Rental'],
      },
      comfort: { 
        name: 'Yangshuo Mountain Retreat', 
        nameChinese: '阳朔胜地',
        type: 'Boutique Resort',
        address: 'Gaotian Town, Yangshuo',
        addressChinese: '阳朔县高田镇',
        pricePerNight: { rmb: 800, usd: 111 },
        amenities: ['Pool', 'Restaurant', 'Karst Views'],
      },
      luxury: { 
        name: 'Banyan Tree Yangshuo', 
        nameChinese: '阳朔悦榕庄',
        type: '5-Star Resort',
        address: 'Fuli Town, Yangshuo',
        addressChinese: '阳朔县福利镇',
        pricePerNight: { rmb: 3500, usd: 486 },
        amenities: ['Private Villas', 'Spa', 'River Views'],
      },
    },
    transport: {
      fromGuangzhou: { method: 'High-Speed Train D2835', duration: '2h 30min', price: { rmb: 144, usd: 20 }, station: 'Guilin North Station (桂林北站)' },
    },
    emergencyInfo: {
      police: '110',
      ambulance: '120',
    },
  },

  hangzhou: {
    name: 'Hangzhou',
    nameChinese: '杭州',
    image: 'https://images.unsplash.com/photo-1537531383496-f4749b4a4e99?w=800&q=80',
    recommendedDays: 2,
    highlights: [
      { 
        name: 'West Lake', 
        nameChinese: '西湖',
        description: 'UNESCO World Heritage scenic lake', 
        duration: '3-4 hours',
        address: 'Xihu District, Hangzhou',
        addressChinese: '杭州市西湖区',
        coordinates: { lat: 30.2587, lng: 120.1397 },
        openingHours: 'Open 24 hours',
        ticketPrice: { rmb: 0, usd: 0 },
        tips: 'Rent a bike to circle the lake, visit at sunset',
      },
      { 
        name: 'Lingyin Temple', 
        nameChinese: '灵隐寺',
        description: 'Ancient Buddhist temple in the hills', 
        duration: '2 hours',
        address: 'Lingyin Road, Xihu District',
        addressChinese: '西湖区灵隐路',
        coordinates: { lat: 30.2425, lng: 120.1011 },
        ticketPrice: { rmb: 75, usd: 10 },
      },
    ],
    foods: {
      anything: [
        { name: 'Dongpo Pork', nameChinese: '东坡肉', description: 'Braised pork belly', emoji: '🍖', priceRange: '¥50-80' },
      ],
      halal: [
        { name: 'Lanzhou Noodles', nameChinese: '兰州拉面', description: 'Hand-pulled beef noodles', emoji: '🍜', priceRange: '¥20-35' },
      ],
      vegetarian: [
        { name: 'Buddhist Temple Cuisine', nameChinese: '素斋', description: 'Vegetarian temple food', emoji: '🥬', priceRange: '¥40-80' },
      ],
      spicy: [
        { name: 'Sichuan Restaurant', nameChinese: '川菜馆', description: 'Spicy Sichuan dishes', emoji: '🌶️', priceRange: '¥60-100' },
      ],
    },
    hotels: {
      budget: { name: 'West Lake Youth Hostel', nameChinese: '西湖青年旅舍', type: 'Hostel', pricePerNight: { rmb: 100, usd: 14 }, amenities: ['Lake Views', 'Free WiFi'] },
      comfort: { name: 'Wyndham Grand Plaza Royale', nameChinese: '温德姆至尊豪廷大酒店', type: '4-Star', pricePerNight: { rmb: 600, usd: 83 }, amenities: ['Pool', 'Spa'] },
      luxury: { name: 'Amanfayun', nameChinese: '安缦法云', type: '5-Star Resort', pricePerNight: { rmb: 5000, usd: 694 }, amenities: ['Private Villas', 'Tea House'] },
    },
    emergencyInfo: { police: '110', ambulance: '120' },
  },

  suzhou: {
    name: 'Suzhou',
    nameChinese: '苏州',
    image: 'https://images.unsplash.com/photo-1567429379107-0f5cf8e8c7c8?w=800&q=80',
    recommendedDays: 2,
    highlights: [
      { 
        name: 'Humble Administrator\'s Garden', 
        nameChinese: '拙政园',
        description: 'China\'s finest classical garden', 
        duration: '2-3 hours',
        address: '178 Dongbei Street, Gusu District',
        addressChinese: '姑苏区东北街178号',
        coordinates: { lat: 31.3250, lng: 120.6294 },
        ticketPrice: { rmb: 80, usd: 11 },
      },
      { 
        name: 'Tiger Hill', 
        nameChinese: '虎丘',
        description: 'Historic hill with leaning pagoda', 
        duration: '2 hours',
        address: 'Huqiu District, Suzhou',
        addressChinese: '苏州市虎丘区',
        ticketPrice: { rmb: 80, usd: 11 },
      },
    ],
    foods: {
      anything: [{ name: 'Squirrel-Shaped Mandarin Fish', nameChinese: '松鼠桂鱼', description: 'Sweet and sour fish', emoji: '🐟', priceRange: '¥80-120' }],
      halal: [{ name: 'Halal Noodles', nameChinese: '清真拉面', emoji: '🍜', priceRange: '¥20-35' }],
      vegetarian: [{ name: 'Garden Vegetarian', nameChinese: '园林素食', emoji: '🥗', priceRange: '¥50-80' }],
      spicy: [{ name: 'Hunan Kitchen', nameChinese: '湘菜馆', emoji: '🌶️', priceRange: '¥60-100' }],
    },
    hotels: {
      budget: { name: 'Suzhou Youth Hostel', nameChinese: '苏州青年旅舍', type: 'Hostel', pricePerNight: { rmb: 80, usd: 11 }, amenities: ['Garden Views'] },
      comfort: { name: 'Pan Pacific Suzhou', nameChinese: '苏州泛太平洋酒店', type: '4-Star', pricePerNight: { rmb: 550, usd: 76 }, amenities: ['Pool', 'Gym'] },
      luxury: { name: 'Tonino Lamborghini Hotel', nameChinese: '苏州托尼洛·兰博基尼酒店', type: '5-Star', pricePerNight: { rmb: 1500, usd: 208 }, amenities: ['Luxury Suites'] },
    },
    emergencyInfo: { police: '110', ambulance: '120' },
  },

  huangshan: {
    name: 'Huangshan',
    nameChinese: '黄山',
    image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80',
    recommendedDays: 2,
    highlights: [
      { 
        name: 'Yellow Mountain Scenic Area', 
        nameChinese: '黄山风景区',
        description: 'Granite peaks, ancient pines, hot springs', 
        duration: 'Full day',
        address: 'Huangshan City, Anhui Province',
        addressChinese: '安徽省黄山市',
        coordinates: { lat: 30.1328, lng: 118.1657 },
        ticketPrice: { rmb: 190, usd: 26 },
        tips: 'Stay overnight on the mountain to see sunrise',
      },
    ],
    foods: {
      anything: [{ name: 'Stinky Tofu', nameChinese: '臭豆腐', description: 'Local fermented tofu', emoji: '🫘', priceRange: '¥10-20' }],
      halal: [{ name: 'Halal Restaurant', nameChinese: '清真餐厅', emoji: '🥘', priceRange: '¥40-60' }],
      vegetarian: [{ name: 'Mountain Vegetables', nameChinese: '山野菜', emoji: '🥬', priceRange: '¥30-50' }],
      spicy: [{ name: 'Anhui Cuisine', nameChinese: '徽菜', emoji: '🍲', priceRange: '¥50-80' }],
    },
    hotels: {
      budget: { name: 'Mountain Top Hostel', nameChinese: '山顶青旅', type: 'Hostel', pricePerNight: { rmb: 150, usd: 21 } },
      comfort: { name: 'Beihai Hotel', nameChinese: '北海宾馆', type: 'Mountain Hotel', pricePerNight: { rmb: 800, usd: 111 } },
      luxury: { name: 'Xihai Hotel', nameChinese: '西海饭店', type: '4-Star', pricePerNight: { rmb: 1200, usd: 167 } },
    },
    emergencyInfo: { police: '110', ambulance: '120' },
  },

  zhangjiajie: {
    name: 'Zhangjiajie',
    nameChinese: '张家界',
    image: 'https://images.unsplash.com/photo-1513415277900-a62401e19be4?w=800&q=80',
    recommendedDays: 3,
    highlights: [
      { 
        name: 'Zhangjiajie National Forest Park', 
        nameChinese: '张家界国家森林公园',
        description: 'Avatar mountains and glass bridge', 
        duration: 'Full day',
        address: 'Wulingyuan District, Zhangjiajie',
        addressChinese: '张家界市武陵源区',
        coordinates: { lat: 29.3252, lng: 110.4341 },
        ticketPrice: { rmb: 225, usd: 31 },
        tips: 'Buy 4-day pass for full exploration',
      },
      { 
        name: 'Tianmen Mountain', 
        nameChinese: '天门山',
        description: 'Glass walkway and cable car', 
        duration: 'Half day',
        ticketPrice: { rmb: 278, usd: 39 },
      },
    ],
    foods: {
      anything: [{ name: 'Tujia Cuisine', nameChinese: '土家菜', description: 'Local ethnic food', emoji: '🍖', priceRange: '¥40-80' }],
      halal: [{ name: 'Muslim Restaurant', nameChinese: '清真餐厅', emoji: '🥘', priceRange: '¥30-50' }],
      vegetarian: [{ name: 'Temple Vegetarian', nameChinese: '素食', emoji: '🥬', priceRange: '¥25-45' }],
      spicy: [{ name: 'Hunan Spicy Food', nameChinese: '湘菜', emoji: '🌶️', priceRange: '¥40-70' }],
    },
    hotels: {
      budget: { name: 'Zhangjiajie Hostel', nameChinese: '张家界青旅', type: 'Hostel', pricePerNight: { rmb: 80, usd: 11 } },
      comfort: { name: 'Pullman Zhangjiajie', nameChinese: '张家界铂尔曼', type: '4-Star', pricePerNight: { rmb: 600, usd: 83 } },
      luxury: { name: 'Zhangjiajie Grand Skylight', nameChinese: '张家界天恒大酒店', type: '5-Star', pricePerNight: { rmb: 1000, usd: 139 } },
    },
    emergencyInfo: { police: '110', ambulance: '120' },
  },

  jiuzhaigou: {
    name: 'Jiuzhaigou',
    nameChinese: '九寨沟',
    image: 'https://images.unsplash.com/photo-1586953423319-3e0f8c4e4c27?w=800&q=80',
    recommendedDays: 2,
    highlights: [
      { 
        name: 'Jiuzhaigou Valley', 
        nameChinese: '九寨沟景区',
        description: 'Colorful lakes and waterfalls', 
        duration: 'Full day',
        address: 'Jiuzhaigou County, Sichuan',
        addressChinese: '四川省九寨沟县',
        coordinates: { lat: 33.2600, lng: 103.9200 },
        ticketPrice: { rmb: 250, usd: 35 },
      },
    ],
    foods: {
      anything: [{ name: 'Tibetan Yak Meat', nameChinese: '牦牛肉', emoji: '🥩', priceRange: '¥60-100' }],
      halal: [{ name: 'Halal Options Available', nameChinese: '清真餐厅', emoji: '🥘', priceRange: '¥40-70' }],
      vegetarian: [{ name: 'Vegetable Dishes', nameChinese: '素菜', emoji: '🥬', priceRange: '¥30-50' }],
      spicy: [{ name: 'Sichuan Hotpot', nameChinese: '四川火锅', emoji: '🌶️', priceRange: '¥80-150' }],
    },
    hotels: {
      budget: { name: 'Jiuzhaigou Guesthouse', nameChinese: '九寨沟民宿', type: 'Guesthouse', pricePerNight: { rmb: 150, usd: 21 } },
      comfort: { name: 'Jiuzhaigou Sheraton', nameChinese: '九寨沟喜来登', type: '4-Star', pricePerNight: { rmb: 800, usd: 111 } },
      luxury: { name: 'Jiuzhai Paradise', nameChinese: '九寨天堂', type: '5-Star', pricePerNight: { rmb: 1500, usd: 208 } },
    },
    emergencyInfo: { police: '110', ambulance: '120' },
  },

  lijiang: {
    name: 'Lijiang',
    nameChinese: '丽江',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80',
    recommendedDays: 2,
    highlights: [
      { 
        name: 'Lijiang Old Town', 
        nameChinese: '丽江古城',
        description: 'UNESCO World Heritage Naxi town', 
        duration: '3-4 hours',
        address: 'Gucheng District, Lijiang',
        addressChinese: '丽江市古城区',
        coordinates: { lat: 26.8722, lng: 100.2333 },
        ticketPrice: { rmb: 50, usd: 7 },
      },
      { 
        name: 'Jade Dragon Snow Mountain', 
        nameChinese: '玉龙雪山',
        description: 'Glacier-capped mountain peaks', 
        duration: 'Half day',
        ticketPrice: { rmb: 180, usd: 25 },
      },
    ],
    foods: {
      anything: [{ name: 'Naxi Cuisine', nameChinese: '纳西菜', emoji: '🍲', priceRange: '¥40-80' }],
      halal: [{ name: 'Muslim Quarter Food', nameChinese: '清真美食', emoji: '🥘', priceRange: '¥30-60' }],
      vegetarian: [{ name: 'Buddhist Vegetarian', nameChinese: '素食', emoji: '🥬', priceRange: '¥30-50' }],
      spicy: [{ name: 'Yunnan Spicy', nameChinese: '云南辣味', emoji: '🌶️', priceRange: '¥40-70' }],
    },
    hotels: {
      budget: { name: 'Lijiang Old Town Hostel', nameChinese: '丽江古城青旅', type: 'Hostel', pricePerNight: { rmb: 80, usd: 11 } },
      comfort: { name: 'Lijiang Wangfu Hotel', nameChinese: '丽江王府酒店', type: '4-Star', pricePerNight: { rmb: 500, usd: 69 } },
      luxury: { name: 'Amandayan', nameChinese: '安缦达岩', type: '5-Star', pricePerNight: { rmb: 6000, usd: 833 } },
    },
    emergencyInfo: { police: '110', ambulance: '120' },
  },

  yunnan: {
    name: 'Dali',
    nameChinese: '大理',
    image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80',
    recommendedDays: 2,
    highlights: [
      { 
        name: 'Dali Ancient Town', 
        nameChinese: '大理古城',
        description: 'Bai ethnic culture and architecture', 
        duration: '3 hours',
        address: 'Dali City, Yunnan',
        addressChinese: '云南省大理市',
        ticketPrice: { rmb: 0, usd: 0 },
      },
      { 
        name: 'Erhai Lake', 
        nameChinese: '洱海',
        description: 'Beautiful highland lake', 
        duration: 'Half day',
        ticketPrice: { rmb: 0, usd: 0 },
        tips: 'Rent an e-bike to cycle around the lake',
      },
    ],
    foods: {
      anything: [{ name: 'Bai Cuisine', nameChinese: '白族菜', emoji: '🍲', priceRange: '¥30-60' }],
      halal: [{ name: 'Muslim Restaurants', nameChinese: '清真餐厅', emoji: '🥘', priceRange: '¥30-50' }],
      vegetarian: [{ name: 'Local Vegetables', nameChinese: '素菜', emoji: '🥬', priceRange: '¥20-40' }],
      spicy: [{ name: 'Yunnan Chili Dishes', nameChinese: '云南辣菜', emoji: '🌶️', priceRange: '¥30-60' }],
    },
    hotels: {
      budget: { name: 'Dali Backpacker', nameChinese: '大理背包客', type: 'Hostel', pricePerNight: { rmb: 60, usd: 8 } },
      comfort: { name: 'Landscape Hotel', nameChinese: '大理风景酒店', type: '4-Star', pricePerNight: { rmb: 400, usd: 56 } },
      luxury: { name: 'Regent Dali', nameChinese: '大理丽晶酒店', type: '5-Star', pricePerNight: { rmb: 2000, usd: 278 } },
    },
    emergencyInfo: { police: '110', ambulance: '120' },
  },

  hongkong: {
    name: 'Hong Kong',
    nameChinese: '香港',
    image: 'https://images.unsplash.com/photo-1536599018102-9f803c979dbd?w=800&q=80',
    recommendedDays: 3,
    highlights: [
      { 
        name: 'Victoria Peak', 
        nameChinese: '太平山顶',
        description: 'Iconic city skyline views', 
        duration: '2-3 hours',
        address: 'The Peak, Hong Kong Island',
        addressChinese: '香港岛山顶',
        ticketPrice: { rmb: 60, usd: 8 },
      },
      { 
        name: 'Temple Street Night Market', 
        nameChinese: '庙街夜市',
        description: 'Famous night market experience', 
        duration: '2-3 hours',
        ticketPrice: { rmb: 0, usd: 0 },
      },
    ],
    foods: {
      anything: [{ name: 'Dim Sum', nameChinese: '点心', emoji: '🥟', priceRange: 'HK$100-300' }],
      halal: [{ name: 'Halal Restaurants', nameChinese: '清真餐厅', emoji: '🥘', priceRange: 'HK$80-150' }],
      vegetarian: [{ name: 'Pure Veggie House', nameChinese: '素食馆', emoji: '🥬', priceRange: 'HK$100-200' }],
      spicy: [{ name: 'Sichuan Kitchen', nameChinese: '川菜馆', emoji: '🌶️', priceRange: 'HK$150-300' }],
    },
    hotels: {
      budget: { name: 'Mini Hotel Central', nameChinese: '迷你酒店中环', type: 'Budget Hotel', pricePerNight: { rmb: 500, usd: 69 } },
      comfort: { name: 'Hotel ICON', nameChinese: '唯港荟酒店', type: '4-Star', pricePerNight: { rmb: 1500, usd: 208 } },
      luxury: { name: 'The Peninsula', nameChinese: '半岛酒店', type: '5-Star', pricePerNight: { rmb: 4000, usd: 556 } },
    },
    emergencyInfo: { police: '999', ambulance: '999' },
  },

  macau: {
    name: 'Macau',
    nameChinese: '澳门',
    image: 'https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=800&q=80',
    recommendedDays: 2,
    highlights: [
      { 
        name: 'Ruins of St. Paul\'s', 
        nameChinese: '大三巴牌坊',
        description: 'Iconic Portuguese ruins', 
        duration: '1 hour',
        ticketPrice: { rmb: 0, usd: 0 },
      },
      { 
        name: 'The Venetian Macau', 
        nameChinese: '威尼斯人',
        description: 'World\'s largest casino resort', 
        duration: '3-4 hours',
        ticketPrice: { rmb: 0, usd: 0 },
      },
    ],
    foods: {
      anything: [{ name: 'Portuguese Egg Tart', nameChinese: '葡式蛋挞', emoji: '🥧', priceRange: 'MOP$10-20' }],
      halal: [{ name: 'Halal Options', nameChinese: '清真餐厅', emoji: '🥘', priceRange: 'MOP$80-150' }],
      vegetarian: [{ name: 'Vegetarian Restaurants', nameChinese: '素食', emoji: '🥬', priceRange: 'MOP$80-150' }],
      spicy: [{ name: 'Spicy Asian Fusion', nameChinese: '辣味美食', emoji: '🌶️', priceRange: 'MOP$100-200' }],
    },
    hotels: {
      budget: { name: 'Ole London Hotel', nameChinese: '澳莱英京酒店', type: 'Budget', pricePerNight: { rmb: 400, usd: 56 } },
      comfort: { name: 'Sofitel Macau', nameChinese: '澳门索菲特', type: '4-Star', pricePerNight: { rmb: 1200, usd: 167 } },
      luxury: { name: 'The Venetian Macao', nameChinese: '威尼斯人酒店', type: '5-Star', pricePerNight: { rmb: 2500, usd: 347 } },
    },
    emergencyInfo: { police: '999', ambulance: '999' },
  },

  tibet: {
    name: 'Lhasa',
    nameChinese: '拉萨',
    image: 'https://images.unsplash.com/photo-1517329782449-810562a4ec2f?w=800&q=80',
    recommendedDays: 4,
    highlights: [
      { 
        name: 'Potala Palace', 
        nameChinese: '布达拉宫',
        description: 'Former residence of Dalai Lama', 
        duration: '3-4 hours',
        address: '35 Beijing Middle Road, Lhasa',
        addressChinese: '拉萨市北京中路35号',
        ticketPrice: { rmb: 200, usd: 28 },
        tips: 'Acclimatize for 1-2 days before visiting',
      },
      { 
        name: 'Jokhang Temple', 
        nameChinese: '大昭寺',
        description: 'Most sacred temple in Tibet', 
        duration: '2 hours',
        ticketPrice: { rmb: 85, usd: 12 },
      },
    ],
    foods: {
      anything: [{ name: 'Tibetan Momos', nameChinese: '藏式饺子', emoji: '🥟', priceRange: '¥20-40' }],
      halal: [{ name: 'Muslim Restaurant', nameChinese: '清真餐厅', emoji: '🥘', priceRange: '¥30-60' }],
      vegetarian: [{ name: 'Tsampa', nameChinese: '糌粑', emoji: '🥣', priceRange: '¥15-30' }],
      spicy: [{ name: 'Sichuan Food', nameChinese: '川菜', emoji: '🌶️', priceRange: '¥40-80' }],
    },
    hotels: {
      budget: { name: 'Lhasa Backpacker', nameChinese: '拉萨背包客', type: 'Hostel', pricePerNight: { rmb: 100, usd: 14 } },
      comfort: { name: 'Shangri-La Lhasa', nameChinese: '拉萨香格里拉', type: '4-Star', pricePerNight: { rmb: 800, usd: 111 } },
      luxury: { name: 'St. Regis Lhasa', nameChinese: '拉萨瑞吉酒店', type: '5-Star', pricePerNight: { rmb: 2500, usd: 347 } },
    },
    emergencyInfo: { police: '110', ambulance: '120' },
  },

  harbin: {
    name: 'Harbin',
    nameChinese: '哈尔滨',
    image: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=800&q=80',
    recommendedDays: 2,
    highlights: [
      { 
        name: 'Ice and Snow World', 
        nameChinese: '冰雪大世界',
        description: 'World\'s largest ice festival', 
        duration: '3-4 hours',
        ticketPrice: { rmb: 330, usd: 46 },
        tips: 'Best in January-February',
      },
      { 
        name: 'Saint Sophia Cathedral', 
        nameChinese: '圣索菲亚教堂',
        description: 'Russian Orthodox cathedral', 
        duration: '1 hour',
        ticketPrice: { rmb: 20, usd: 3 },
      },
    ],
    foods: {
      anything: [{ name: 'Russian Bread', nameChinese: '大列巴', emoji: '🍞', priceRange: '¥20-40' }],
      halal: [{ name: 'Halal Lamb', nameChinese: '清真羊肉', emoji: '🥩', priceRange: '¥50-100' }],
      vegetarian: [{ name: 'Vegetarian Dumplings', nameChinese: '素饺子', emoji: '🥟', priceRange: '¥20-40' }],
      spicy: [{ name: 'Korean BBQ', nameChinese: '韩式烤肉', emoji: '🌶️', priceRange: '¥80-150' }],
    },
    hotels: {
      budget: { name: 'Harbin Hostel', nameChinese: '哈尔滨青旅', type: 'Hostel', pricePerNight: { rmb: 80, usd: 11 } },
      comfort: { name: 'Sofitel Harbin', nameChinese: '哈尔滨索菲特', type: '4-Star', pricePerNight: { rmb: 600, usd: 83 } },
      luxury: { name: 'Shangri-La Harbin', nameChinese: '哈尔滨香格里拉', type: '5-Star', pricePerNight: { rmb: 1200, usd: 167 } },
    },
    emergencyInfo: { police: '110', ambulance: '120' },
  },

  pingyao: {
    name: 'Pingyao',
    nameChinese: '平遥',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&q=80',
    recommendedDays: 2,
    highlights: [
      { 
        name: 'Pingyao Ancient City', 
        nameChinese: '平遥古城',
        description: 'Best preserved ancient walled city', 
        duration: 'Full day',
        ticketPrice: { rmb: 130, usd: 18 },
      },
    ],
    foods: {
      anything: [{ name: 'Pingyao Beef', nameChinese: '平遥牛肉', emoji: '🥩', priceRange: '¥40-80' }],
      halal: [{ name: 'Halal Noodles', nameChinese: '清真面', emoji: '🍜', priceRange: '¥15-30' }],
      vegetarian: [{ name: 'Local Vegetables', nameChinese: '素菜', emoji: '🥬', priceRange: '¥20-40' }],
      spicy: [{ name: 'Shanxi Noodles', nameChinese: '山西面食', emoji: '🍜', priceRange: '¥15-35' }],
    },
    hotels: {
      budget: { name: 'Pingyao Guesthouse', nameChinese: '平遥民宿', type: 'Guesthouse', pricePerNight: { rmb: 100, usd: 14 } },
      comfort: { name: 'Jing\'s Residence', nameChinese: '锦宅', type: 'Boutique', pricePerNight: { rmb: 500, usd: 69 } },
      luxury: { name: 'Pingyao Yunjincheng', nameChinese: '云锦成宾舍', type: '5-Star', pricePerNight: { rmb: 1200, usd: 167 } },
    },
    emergencyInfo: { police: '110', ambulance: '120' },
  },

  fenghuang: {
    name: 'Fenghuang',
    nameChinese: '凤凰',
    image: 'https://images.unsplash.com/photo-1573455494060-c5595004fb6c?w=800&q=80',
    recommendedDays: 2,
    highlights: [
      { 
        name: 'Fenghuang Ancient Town', 
        nameChinese: '凤凰古城',
        description: 'Phoenix Ancient Town on the river', 
        duration: 'Full day',
        ticketPrice: { rmb: 148, usd: 21 },
      },
    ],
    foods: {
      anything: [{ name: 'Blood Cake', nameChinese: '血粑鸭', emoji: '🦆', priceRange: '¥50-80' }],
      halal: [{ name: 'Halal Options', nameChinese: '清真餐厅', emoji: '🥘', priceRange: '¥30-50' }],
      vegetarian: [{ name: 'River Vegetables', nameChinese: '河鲜素菜', emoji: '🥬', priceRange: '¥25-45' }],
      spicy: [{ name: 'Hunan Cuisine', nameChinese: '湘菜', emoji: '🌶️', priceRange: '¥40-70' }],
    },
    hotels: {
      budget: { name: 'Riverside Hostel', nameChinese: '河畔青旅', type: 'Hostel', pricePerNight: { rmb: 80, usd: 11 } },
      comfort: { name: 'Phoenix Holiday Hotel', nameChinese: '凤凰假日酒店', type: '3-Star', pricePerNight: { rmb: 300, usd: 42 } },
      luxury: { name: 'Fenghuang Grand Hotel', nameChinese: '凤凰大酒店', type: '4-Star', pricePerNight: { rmb: 800, usd: 111 } },
    },
    emergencyInfo: { police: '110', ambulance: '120' },
  },

  xiamen: {
    name: 'Xiamen',
    nameChinese: '厦门',
    image: 'https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?w=800&q=80',
    recommendedDays: 2,
    highlights: [
      { 
        name: 'Gulangyu Island', 
        nameChinese: '鼓浪屿',
        description: 'Car-free island with colonial architecture', 
        duration: 'Full day',
        ticketPrice: { rmb: 35, usd: 5 },
      },
      { 
        name: 'Nanputuo Temple', 
        nameChinese: '南普陀寺',
        description: 'Buddhist temple near Xiamen University', 
        duration: '2 hours',
        ticketPrice: { rmb: 0, usd: 0 },
      },
    ],
    foods: {
      anything: [{ name: 'Seafood', nameChinese: '海鲜', emoji: '🦐', priceRange: '¥80-200' }],
      halal: [{ name: 'Muslim Restaurant', nameChinese: '清真餐厅', emoji: '🥘', priceRange: '¥40-80' }],
      vegetarian: [{ name: 'Temple Vegetarian', nameChinese: '寺院素食', emoji: '🥬', priceRange: '¥30-60' }],
      spicy: [{ name: 'Fujian Spicy', nameChinese: '闽南辣味', emoji: '🌶️', priceRange: '¥50-100' }],
    },
    hotels: {
      budget: { name: 'Xiamen Youth Hostel', nameChinese: '厦门青旅', type: 'Hostel', pricePerNight: { rmb: 100, usd: 14 } },
      comfort: { name: 'Millennium Harbourview', nameChinese: '海景千禧', type: '4-Star', pricePerNight: { rmb: 600, usd: 83 } },
      luxury: { name: 'Conrad Xiamen', nameChinese: '厦门康莱德', type: '5-Star', pricePerNight: { rmb: 1500, usd: 208 } },
    },
    emergencyInfo: { police: '110', ambulance: '120' },
  },

  chongqing: {
    name: 'Chongqing',
    nameChinese: '重庆',
    image: 'https://images.unsplash.com/photo-1602320233067-c7a4c3c19e0f?w=800&q=80',
    recommendedDays: 2,
    highlights: [
      { 
        name: 'Hongya Cave', 
        nameChinese: '洪崖洞',
        description: 'Spirited Away-inspired hillside complex', 
        duration: '2-3 hours',
        ticketPrice: { rmb: 0, usd: 0 },
      },
      { 
        name: 'Yangtze River Cable Car', 
        nameChinese: '长江索道',
        description: 'Cross the river by cable car', 
        duration: '30 min',
        ticketPrice: { rmb: 30, usd: 4 },
      },
    ],
    foods: {
      anything: [{ name: 'Chongqing Hotpot', nameChinese: '重庆火锅', emoji: '🍲', priceRange: '¥80-150' }],
      halal: [{ name: 'Halal Hotpot', nameChinese: '清真火锅', emoji: '🥘', priceRange: '¥60-120' }],
      vegetarian: [{ name: 'Veggie Hotpot', nameChinese: '素火锅', emoji: '🥬', priceRange: '¥50-100' }],
      spicy: [{ name: 'Mala Hotpot', nameChinese: '麻辣火锅', emoji: '🌶️', priceRange: '¥80-180' }],
    },
    hotels: {
      budget: { name: 'Chongqing Hostel', nameChinese: '重庆青旅', type: 'Hostel', pricePerNight: { rmb: 80, usd: 11 } },
      comfort: { name: 'JW Marriott Chongqing', nameChinese: '重庆JW万豪', type: '4-Star', pricePerNight: { rmb: 700, usd: 97 } },
      luxury: { name: 'Intercontinental Chongqing', nameChinese: '重庆洲际', type: '5-Star', pricePerNight: { rmb: 1200, usd: 167 } },
    },
    emergencyInfo: { police: '110', ambulance: '120' },
  },
};

// Helper functions
export const getCityData = (cityId) => CITY_DATA[cityId] || null;
export const getAllCities = () => Object.keys(CITY_DATA);
export const getRecommendedDays = (cityId) => CITY_DATA[cityId]?.recommendedDays || 2;

// Get foods based on dietary preference
export const getFoodsForPreference = (cityId, preference) => {
  const cityData = CITY_DATA[cityId];
  if (!cityData || !cityData.foods) return [];
  
  // Return foods matching the preference, fallback to 'anything' if preference not found
  return cityData.foods[preference] || cityData.foods.anything || [];
};