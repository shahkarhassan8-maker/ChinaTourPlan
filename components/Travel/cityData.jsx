// Complete city data with detailed location info, addresses, and Chinese phrases

export const CITY_DATA = {
  beijing: {
    name: 'Beijing',
    nameChinese: '北京',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80',
    recommendedDays: 3,
    highlights: [
      { 
        name: 'Forbidden City', 
        nameChinese: '故宫',
        description: 'Explore 9,999 rooms of imperial history', 
        duration: '4 hours',
        address: '4 Jingshan Front St, Dongcheng District',
        addressChinese: '东城区景山前街4号',
        coordinates: { lat: 39.9163, lng: 116.3972 },
        openingHours: '8:30 AM - 5:00 PM (Apr-Oct), 8:30 AM - 4:30 PM (Nov-Mar)',
        ticketPrice: { rmb: 60, usd: 8 },
        tips: 'Book tickets online at least 1 day in advance on official website',
        metro: { line: 'Line 1', station: 'Tiananmen East Station (天安门东站)', exit: 'Exit A' },
        phrases: [
          { english: 'I want to go to the Forbidden City', chinese: '我想去故宫', pinyin: 'Wǒ xiǎng qù Gùgōng' },
          { english: 'Where is the entrance?', chinese: '入口在哪里？', pinyin: 'Rùkǒu zài nǎlǐ?' },
        ]
      },
      { 
        name: 'Great Wall at Mutianyu', 
        nameChinese: '慕田峪长城',
        description: 'Less crowded section with cable car access', 
        duration: 'Full day',
        address: 'Mutianyu Village, Huairou District',
        addressChinese: '怀柔区慕田峪村',
        coordinates: { lat: 40.4319, lng: 116.5704 },
        openingHours: '7:30 AM - 6:00 PM (Apr-Oct), 8:00 AM - 5:00 PM (Nov-Mar)',
        ticketPrice: { rmb: 45, usd: 6 },
        tips: 'Take cable car up, toboggan down for fun experience',
        metro: { line: 'Line 2/13', station: 'Dongzhimen Station (东直门站)', exit: 'Exit C - Take Bus 916 Express' },
        phrases: [
          { english: 'Take me to Mutianyu Great Wall', chinese: '带我去慕田峪长城', pinyin: 'Dài wǒ qù Mùtiányù Chángchéng' },
          { english: 'How much for round trip cable car?', chinese: '缆车往返多少钱？', pinyin: 'Lǎnchē wǎngfǎn duōshao qián?' },
        ]
      },
      { 
        name: 'Temple of Heaven', 
        nameChinese: '天坛',
        description: 'Ming Dynasty sacrificial architecture', 
        duration: '2 hours',
        address: '1 Tiantan East Road, Dongcheng District',
        addressChinese: '东城区天坛东路1号',
        coordinates: { lat: 39.8822, lng: 116.4066 },
        openingHours: '6:00 AM - 9:00 PM (Park), 8:00 AM - 5:30 PM (Buildings)',
        ticketPrice: { rmb: 35, usd: 5 },
        tips: 'Visit early morning to see locals doing tai chi',
        metro: { line: 'Line 5', station: 'Tiantandongmen Station (天坛东门站)', exit: 'Exit A' },
        phrases: [
          { english: 'I want to go to Temple of Heaven', chinese: '我想去天坛', pinyin: 'Wǒ xiǎng qù Tiāntán' },
        ]
      },
      { 
        name: 'Summer Palace', 
        nameChinese: '颐和园',
        description: 'Imperial gardens and Kunming Lake', 
        duration: '3-4 hours',
        address: '19 Xinjiangongmen Road, Haidian District',
        addressChinese: '海淀区新建宫门路19号',
        coordinates: { lat: 39.9999, lng: 116.2755 },
        openingHours: '6:30 AM - 6:00 PM (Apr-Oct)',
        ticketPrice: { rmb: 30, usd: 4 },
        tips: 'Take a boat ride on Kunming Lake',
        metro: { line: 'Line 4', station: 'Beigongmen Station (北宫门站)', exit: 'Exit D' },
        phrases: [
          { english: 'Take me to Summer Palace', chinese: '带我去颐和园', pinyin: 'Dài wǒ qù Yíhéyuán' },
        ]
      },
      { 
        name: 'Hutong Tour - Nanluoguxiang', 
        nameChinese: '南锣鼓巷胡同游',
        description: 'Ancient alleyways with shops and cafes', 
        duration: '2-3 hours',
        address: 'Nanluoguxiang, Dongcheng District',
        addressChinese: '东城区南锣鼓巷',
        coordinates: { lat: 39.9379, lng: 116.4034 },
        openingHours: 'Open 24 hours (shops 10 AM - 10 PM)',
        ticketPrice: { rmb: 0, usd: 0 },
        tips: 'Explore side alleys for authentic experience',
        metro: { line: 'Line 6/8', station: 'Nanluoguxiang Station (南锣鼓巷站)', exit: 'Exit E' },
        phrases: [
          { english: 'How much for a rickshaw tour?', chinese: '人力车游览多少钱？', pinyin: 'Rénlìchē yóulǎn duōshao qián?' },
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
        description: 'Venice of Shanghai - ancient canal town', 
        duration: 'Half day',
        address: 'Zhujiajiao Town, Qingpu District',
        addressChinese: '青浦区朱家角镇',
        coordinates: { lat: 31.1097, lng: 121.0564 },
        openingHours: '8:30 AM - 4:30 PM',
        ticketPrice: { rmb: 60, usd: 8 },
        tips: 'Take boat ride through canals',
        metro: { line: 'Line 17', station: 'Zhujiajiao Station (朱家角站)', exit: 'Exit 1' },
        phrases: [
          { english: 'How much for boat ride?', chinese: '坐船多少钱？', pinyin: 'Zuò chuán duōshao qián?' },
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
        description: 'Food streets and Great Mosque', 
        duration: '3-4 hours',
        address: 'Beiyuanmen, Lianhu District',
        addressChinese: '莲湖区北院门',
        coordinates: { lat: 34.2628, lng: 108.9437 },
        openingHours: '24 hours',
        ticketPrice: { rmb: 0, usd: 0 },
        tips: 'Best for halal food options',
        metro: { line: 'Line 2', station: 'Bell Tower Station (钟楼站)', exit: 'Exit A - Walk 10 minutes' },
        phrases: [
          { english: 'Where is Muslim Quarter?', chinese: '回民街在哪里？', pinyin: 'Huímín Jiē zài nǎlǐ?' },
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