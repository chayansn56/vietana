export type Language = 'EN' | 'HI' | 'VI';

export const TRANSLATIONS = {
  EN: {
    nav: {
      services: 'Services',
      packages: 'Packages',
      aiPlanner: 'AI Planner',
      food: 'Food',
      experiences: 'Experiences',
      about: 'About',
      contact: 'Contact',
      cta: 'Plan My Trip'
    },
    hero: {
      welcome: 'VIETANA EXCLUSIVE',
      tagline: 'Feel Vietnam, Your Way',
      sub: 'Premium bespoke travel for Indian travelers. From e-visas to hidden gems, we handle everything locally from Ho Chi Minh City.',
      support: 'Local support in Hindi & English available 24/7.',
      discover: 'Discover Vietnam',
      plan: 'Plan with AI'
    },
    services: {
      title: 'Our Services',
      subtitle: 'From Visa to Your Last Dinner',
      ghost: 'WE HANDLE IT',
      visa: { t: 'Visa Assistance', d: 'Fast Vietnam e-visa processing. Step-by-step guidance — zero confusion, zero stress.' },
      planning: { t: 'Custom Planning', d: 'Your itinerary, your pace. Fully personalized around your interests, style and budget.' },
      pickup: { t: 'Airport Pickup', d: 'Comfortable AC vehicle ready when you land. Start relaxed from minute one.' },
      hotel: { t: 'Hotel Booking', d: 'Budget gems to luxury stays — all vetted with Indian travelers in mind.' },
      sim: { t: 'SIM & Travel Essentials', d: 'Stay connected from arrival with eSIM, local SIM, Grab setup, and maps help.' },
      tickets: { t: 'Tickets & Guides', d: 'Book Ba Na Hills, Ha Long Cruise, VinWonders, and local guides before landing.' },
      food: { t: 'Food Support', d: 'Indian & Vietnamese dining recommendations. We know where comfort meets adventure.' },
      tailored: { t: 'Tailored Experiences', d: 'Honeymoon, nightlife, hidden gems, and family journeys built around you.' },
      support: { t: 'Local Support', d: 'Hindi & English support available anytime. Real people on the ground in India & Vietnam.' }
    },
    food: {
      title: 'Gastronomy',
      heading: 'Indian & Vietnamese Dining Explorer',
      sub: 'From authentic Indian curry to local Vietnamese street food, we ensure your plate is always full of what you love.',
      filters: { all: 'All', veg: 'Veg', nonVeg: 'Non-Veg' }
    },
    exp: {
      title: 'Off the Beaten Path',
      heading: 'Scattered Experiences',
      sub: 'Vietnam is full of secrets. We\'ve mapped the most authentic, hidden experiences for the curious traveler.',
      orb: 'EXPLORE SECRETS',
      reset: 'Reset Orb'
    },
    planner: {
      title: 'Smart Concierge',
      tagline: 'Travel Gets Better with VIETANA',
      greeting: 'Hello! I\'m your <strong>VIETANA Smart Concierge</strong>. Ready to plan your perfect Vietnam journey?',
      where: 'Where would you like to go?',
      live: 'LIVE ITINERARY',
      status: 'Connected to Gemini 1.5',
      labels: {
        vibe: 'Vibe',
        style: 'Style',
        food: 'Food',
        group: 'Group',
        nightlife: 'Nightlife',
        focus: 'Focus',
        extras: 'Extras'
      },
      email: 'Email VIETANA™'
    },
    contact: {
      title: 'Talk to Us',
      heading: 'Talk to Someone Who\nUnderstands Your Travel Style',
      sub: 'Message us on WhatsApp — we reply fast in Hindi & English.',
      cta: 'CONTACT US'
    }
  },
  HI: {
    nav: {
      services: 'सेवाएँ',
      packages: 'पैकेज',
      aiPlanner: 'एआई प्लानर',
      food: 'भोजन',
      experiences: 'अनुभव',
      about: 'हमारे बारे में',
      contact: 'संपर्क',
      cta: 'मेरी यात्रा की योजना बनाएं'
    },
    hero: {
      welcome: 'वियतनाम एक्सक्लूसिव',
      tagline: 'वियतनाम को, अपने तरीके से महसूस करें',
      sub: 'भारतीय यात्रियों के लिए प्रीमियम अनुकूलित यात्रा। ई-वीजा से लेकर छिपे हुए रत्नों तक, हम हो ची मिन्ह सिटी से सब कुछ स्थानीय स्तर पर संभालते हैं।',
      support: 'हिंदी और अंग्रेजी में स्थानीय सहायता 24/7 उपलब्ध है।',
      discover: 'वियतनाम की खोज करें',
      plan: 'एआई के साथ योजना बनाएं'
    },
    services: {
      title: 'हमारी सेवाएँ',
      subtitle: 'वीजा से लेकर आपके आखिरी डिनर तक',
      ghost: 'हम इसे संभालते हैं',
      visa: { t: 'वीजा सहायता', d: 'तेजी से वियतनाम ई-वीजा प्रोसेसिंग। चरण-दर-चरण मार्गदर्शन।' },
      planning: { t: 'कस्टम योजना', d: 'आपका यात्रा कार्यक्रम, आपकी गति। पूरी तरह से व्यक्तिगत।' },
      pickup: { t: 'एयरपोर्ट पिकअप', d: 'जब आप उतरें तो आरामदायक एसी वाहन तैयार है।' },
      hotel: { t: 'होटल बुकिंग', d: 'भारतीयों के लिए जांचे गए बजट रत्न से लेकर लक्जरी प्रवास तक।' },
      sim: { t: 'सिम और आवश्यक वस्तुएं', d: 'ईसिम, स्थानीय सिम, ग्रैब सेटअप और मैप्स सहायता।' },
      tickets: { t: 'टिकट और गाइड', d: 'उतरने से पहले बा ना हिल्स, हा लॉन्ग क्रूज बुक करें।' },
      food: { t: 'भोजन सहायता', d: 'भारतीय और वियतनामी भोजन की सिफारिशें।' },
      tailored: { t: 'अनुकूलित अनुभव', d: 'हनीमून, नाइटलाइफ़ और पारिवारिक यात्राएँ।' },
      support: { t: 'स्थानीय सहायता', d: 'किसी भी समय हिंदी और अंग्रेजी सहायता उपलब्ध है।' }
    },
    food: {
      title: 'भोजन कला',
      heading: 'भारतीय और वियतनामी भोजन एक्सप्लोरर',
      sub: 'प्रामाणिक भारतीय करी से लेकर स्थानीय वियतनामी स्ट्रीट फूड तक, हम सुनिश्चित करते हैं कि आपकी प्लेट हमेशा आपकी पसंद की चीजों से भरी रहे।',
      filters: { all: 'सब', veg: 'शाकाहारी', nonVeg: 'माँसाहारी' }
    },
    exp: {
      title: 'लीक से हटकर',
      heading: 'बिखरे हुए अनुभव',
      sub: 'वियतनाम रहस्यों से भरा है। हमने जिज्ञासु यात्रियों के लिए सबसे प्रामाणिक, छिपे हुए अनुभवों को मैप किया है।',
      orb: 'रहस्यों की खोज करें',
      reset: 'ऑर्ब रीसेट करें'
    },
    planner: {
      title: 'स्मार्ट दरबान',
      tagline: 'VIETANA के साथ यात्रा बेहतर हो जाती है',
      greeting: 'नमस्ते! मैं आपका <strong>VIETANA स्मार्ट दरबान</strong> हूँ। अपनी वियतनाम यात्रा की योजना बनाने के लिए तैयार हैं?',
      where: 'आप कहाँ जाना चाहेंगे?',
      live: 'लाइव यात्रा कार्यक्रम',
      status: 'Gemini 1.5 से जुड़ा है',
      labels: {
        vibe: 'वाइब',
        style: 'स्टाइल',
        food: 'भोजन',
        group: 'समूह',
        nightlife: 'नाइटलाइफ़',
        focus: 'फोकस',
        extras: 'अतिरिक्त'
      },
      email: 'ईमेल VIETANA™'
    },
    contact: {
      title: 'हमसे बात करें',
      heading: 'उस व्यक्ति से बात करें जो\nआपकी यात्रा शैली को समझता हो',
      sub: 'हमें व्हाट्सएप पर संदेश भेजें - हम हिंदी और अंग्रेजी में तेजी से जवाब देते हैं।',
      cta: 'संपर्क करें'
    }
  },
  VI: {
    nav: {
      services: 'Dịch vụ',
      packages: 'Gói tour',
      aiPlanner: 'AI Planner',
      food: 'Ẩm thực',
      experiences: 'Trải nghiệm',
      about: 'Về chúng tôi',
      contact: 'Liên hệ',
      cta: 'Lên kế hoạch'
    },
    hero: {
      welcome: 'VIETANA ĐỘC QUYỀN',
      tagline: 'Cảm nhận Việt Nam, theo cách của bạn',
      sub: 'Du lịch cao cấp dành riêng cho khách Ấn Độ. Từ e-visa đến những viên ngọc ẩn giấu, chúng tôi xử lý mọi thứ tại TP.HCM.',
      support: 'Hỗ trợ địa phương bằng tiếng Hindi và tiếng Anh 24/7.',
      discover: 'Khám phá Việt Nam',
      plan: 'Lên kế hoạch với AI'
    },
    services: {
      title: 'Dịch vụ của chúng tôi',
      subtitle: 'Từ Visa đến bữa tối cuối cùng',
      ghost: 'CHÚNG TÔI XỬ LÝ',
      visa: { t: 'Hỗ trợ Visa', d: 'Xử lý e-visa Việt Nam nhanh chóng. Hướng dẫn từng bước.' },
      planning: { t: 'Kế hoạch tùy chỉnh', d: 'Hành trình của bạn, tốc độ của bạn. Cá nhân hóa hoàn toàn.' },
      pickup: { t: 'Đưa đón sân bay', d: 'Xe AC thoải mái sẵn sàng khi bạn hạ cánh.' },
      hotel: { t: 'Đặt phòng khách sạn', d: 'Từ khách sạn bình dân đến cao cấp đã được kiểm duyệt cho người Ấn Độ.' },
      sim: { t: 'SIM & Thiết yếu', d: 'Hỗ trợ eSIM, SIM nội địa, cài đặt Grab và bản đồ.' },
      tickets: { t: 'Vé & Hướng dẫn viên', d: 'Đặt vé Bà Nà Hills, Du thuyền Hạ Long trước khi hạ cánh.' },
      food: { t: 'Hỗ trợ ăn uống', d: 'Gợi ý nhà hàng Ấn Độ & Việt Nam.' },
      tailored: { t: 'Trải nghiệm riêng biệt', d: 'Trăng mật, cuộc sống về đêm và chuyến đi gia đình.' },
      support: { t: 'Hỗ trợ địa phương', d: 'Hỗ trợ tiếng Hindi & tiếng Anh mọi lúc.' }
    },
    food: {
      title: 'Ẩm thực',
      heading: 'Khám phá ẩm thực Ấn Độ & Việt Nam',
      sub: 'Từ món cà ri Ấn Độ chính thống đến món ăn đường phố địa phương của Việt Nam, chúng tôi đảm bảo bữa ăn của bạn luôn đầy ắp những món bạn yêu thích.',
      filters: { all: 'Tất cả', veg: 'Chay', nonVeg: 'Mặn' }
    },
    exp: {
      title: 'Khám phá bí ẩn',
      heading: 'Trải nghiệm rải rác',
      sub: 'Việt Nam đầy rẫy những bí mật. Chúng tôi đã lập bản đồ những trải nghiệm chân thực và ẩn giấu nhất cho những du khách tò mò.',
      orb: 'KHÁM PHÁ BÍ MẬT',
      reset: 'Đặt lại'
    },
    planner: {
      title: 'Quản gia thông minh',
      tagline: 'Du lịch tốt hơn với VIETANA',
      greeting: 'Xin chào! Tôi là <strong>Quản gia thông minh VIETANA</strong>. Bạn đã sẵn sàng lên kế hoạch cho chuyến đi Việt Nam chưa?',
      where: 'Bạn muốn đi đâu?',
      live: 'LỊCH TRÌNH TRỰC TIẾP',
      status: 'Đã kết nối với Gemini 1.5',
      labels: {
        vibe: 'Cảm hứng',
        style: 'Phong cách',
        food: 'Ẩm thực',
        group: 'Nhóm',
        nightlife: 'Giải trí đêm',
        focus: 'Điểm đến',
        extras: 'Thêm'
      },
      email: 'Email VIETANA™'
    },
    contact: {
      title: 'Liên hệ',
      heading: 'Trò chuyện với người\nhiểu phong cách du lịch của bạn',
      sub: 'Nhắn tin cho chúng tôi qua WhatsApp — chúng tôi phản hồi nhanh bằng tiếng Hindi và tiếng Anh.',
      cta: 'LIÊN HỆ'
    }
  }
};
