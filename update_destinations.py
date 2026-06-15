import re

content = """export interface Sightseeing {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface CityDestination {
  id: string;
  name: string;
  coverImage: string;
  shortDesc: string;
  fullDesc: string;
  sights: Sightseeing[];
}

export const CITIES: CityDestination[] = [
  {
    id: "hcmc",
    name: "Ho Chi Minh City",
    coverImage: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1600&q=80",
    shortDesc: "The vibrant heart of the south.",
    fullDesc: "A high-octane city of commerce and culture that drives the country forward. Sleek skyscrapers stand shoulder-to-shoulder with ornate temples and colonial relics.",
    sights: [
      { id: "hc1", name: "Ben Thanh Market", image: "https://images.unsplash.com/photo-1509030450973-1f19c9e54a9d?w=800&q=80", description: "The bustling central market perfect for souvenirs and street food." },
      { id: "hc2", name: "War Remnants Museum", image: "https://images.unsplash.com/photo-1581452243763-8dc9a7a9fc77?w=800&q=80", description: "A powerful, sobering look at the Vietnam War from the local perspective." },
      { id: "hc3", name: "Notre Dame Cathedral", image: "https://images.unsplash.com/photo-1579606032856-11f84501255e?w=800&q=80", description: "A striking 19th-century basilica built entirely with materials from France." },
      { id: "hc4", name: "Cu Chi Tunnels", image: "https://images.unsplash.com/photo-1536697475147-3801f654b0c0?w=800&q=80", description: "Crawl through the immense network of connecting underground tunnels." }
    ]
  },
  {
    id: "hanoi",
    name: "Hanoi",
    coverImage: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1600&q=80",
    shortDesc: "The 1000-year-old capital of culture.",
    fullDesc: "Hanoi blends Parisian grace with Asian pace. A city where ancient temples sit beside bustling street food stalls, and serene lakes offer refuge from the vibrant motorbike-filled streets.",
    sights: [
      { id: "h1", name: "Hoan Kiem Lake", image: "https://images.unsplash.com/photo-1581026046187-5775cb56b3e7?w=800&q=80", description: "The historical heart of Hanoi, featuring the iconic red Huc Bridge." },
      { id: "h2", name: "Old Quarter", image: "https://images.unsplash.com/photo-1509030450973-1f19c9e54a9d?w=800&q=80", description: "36 historic streets, each historically dedicated to a specific trade." },
      { id: "h3", name: "Temple of Literature", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80", description: "Vietnam's first national university, dedicated to Confucius." },
      { id: "h4", name: "Train Street", image: "https://images.unsplash.com/photo-1581452243763-8dc9a7a9fc77?w=800&q=80", description: "A narrow residential street where a massive train passes inches from homes." },
      { id: "h5", name: "Ho Chi Minh Mausoleum", image: "https://images.unsplash.com/photo-1579606032856-11f84501255e?w=800&q=80", description: "The monumental marble resting place of the revolutionary leader." }
    ]
  },
  {
    id: "sapa",
    name: "Sapa",
    coverImage: "https://images.unsplash.com/photo-1590054703816-1f33f07a270f?w=1600&q=80",
    shortDesc: "Misty mountains and terraced rice fields.",
    fullDesc: "Perched high in the Hoang Lien Son Mountains, Sapa is famous for its dramatic terraced rice fields, misty peaks, and the rich cultural tapestry of local hill tribes.",
    sights: [
      { id: "s1", name: "Fansipan Peak", image: "https://images.unsplash.com/photo-1628185532502-39c0953a7b68?w=800&q=80", description: "The 'Roof of Indochina', accessible via a breathtaking cable car ride." },
      { id: "s2", name: "Muong Hoa Valley", image: "https://images.unsplash.com/photo-1536697475147-3801f654b0c0?w=800&q=80", description: "Home to the most spectacular rice terraces in all of Vietnam." },
      { id: "s3", name: "Cat Cat Village", image: "https://images.unsplash.com/photo-1555921015-5532091f6026?w=800&q=80", description: "A traditional H'mong village featuring waterfalls and traditional crafts." },
      { id: "s4", name: "Silver Waterfall", image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80", description: "A stunning 200m cascading waterfall surrounded by lush pine forests." }
    ]
  },
  {
    id: "halong",
    name: "Ha Long Bay",
    coverImage: "https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&q=80",
    shortDesc: "Emerald waters and limestone islands.",
    fullDesc: "A UNESCO World Heritage site featuring thousands of towering limestone karsts emerging gracefully from emerald-green waters. Best experienced on an overnight luxury junk boat.",
    sights: [
      { id: "hl1", name: "Sung Sot Cave", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80", description: "The 'Surprise Cave', the largest and most magnificent grotto in the bay." },
      { id: "hl2", name: "Titov Island", image: "https://images.unsplash.com/photo-1557053910-d7d8e6eb8b1e?w=800&q=80", description: "Climb to the top for a panoramic 360-degree view of the entire bay." },
      { id: "hl3", name: "Lan Ha Bay", image: "https://images.unsplash.com/photo-1563810168340-0254ec32c024?w=800&q=80", description: "A quieter, equally stunning alternative to the main Ha Long area." },
      { id: "hl4", name: "Luon Cave", image: "https://images.unsplash.com/photo-1536697475147-3801f654b0c0?w=800&q=80", description: "A tranquil flooded cave accessible only by small bamboo boats or kayaks." }
    ]
  },
  {
    id: "ninhbinh",
    name: "Ninh Binh",
    coverImage: "https://images.unsplash.com/photo-1536697475147-3801f654b0c0?w=1600&q=80",
    shortDesc: "Ha Long Bay on land.",
    fullDesc: "A surreal landscape of river-carved limestone mountains rising from vibrant green rice paddies. A peaceful retreat into Vietnam's most cinematic natural scenery.",
    sights: [
      { id: "nb1", name: "Trang An Complex", image: "https://images.unsplash.com/photo-1563810168340-0254ec32c024?w=800&q=80", description: "A spectacular waterway network through caves and sheer cliffs." },
      { id: "nb2", name: "Mua Cave Viewpoint", image: "https://images.unsplash.com/photo-1628185532502-39c0953a7b68?w=800&q=80", description: "Climb 500 stone steps for the famous dragon statue and valley view." },
      { id: "nb3", name: "Tam Coc", image: "https://images.unsplash.com/photo-1590054703816-1f33f07a270f?w=800&q=80", description: "Drift down the Ngo Dong river through three magnificent caves." },
      { id: "nb4", name: "Bai Dinh Pagoda", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80", description: "The largest complex of Buddhist temples in Vietnam." }
    ]
  },
  {
    id: "hue",
    name: "Hue",
    coverImage: "https://images.unsplash.com/photo-1579606032856-11f84501255e?w=1600&q=80",
    shortDesc: "The ancient imperial capital.",
    fullDesc: "Step back in time in Hue, the former seat of the Nguyen Dynasty. Famous for its sprawling Imperial Citadel, majestic royal tombs, and the poetic Perfume River.",
    sights: [
      { id: "hu1", name: "Imperial Citadel", image: "https://images.unsplash.com/photo-1509030450973-1f19c9e54a9d?w=800&q=80", description: "The vast 19th-century fortress and palace complex of the emperors." },
      { id: "hu2", name: "Tomb of Khai Dinh", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80", description: "A dramatic fusion of traditional Vietnamese and European architecture." },
      { id: "hu3", name: "Thien Mu Pagoda", image: "https://images.unsplash.com/photo-1555921015-5532091f6026?w=800&q=80", description: "An iconic seven-story pagoda sitting gracefully on the riverbank." },
      { id: "hu4", name: "Perfume River", image: "https://images.unsplash.com/photo-1581452243763-8dc9a7a9fc77?w=800&q=80", description: "Take a dragon boat ride at sunset for a truly romantic experience." }
    ]
  },
  {
    id: "danang",
    name: "Da Nang",
    coverImage: "https://images.unsplash.com/photo-1581026046187-5775cb56b3e7?w=1600&q=80",
    shortDesc: "Where the city meets the sea.",
    fullDesc: "A modern, vibrant coastal city known for its sandy beaches, iconic bridges, and the majestic Marble Mountains. The perfect blend of urban energy and coastal relaxation.",
    sights: [
      { id: "dn1", name: "Ba Na Hills & Golden Bridge", image: "https://images.unsplash.com/photo-1628185532502-39c0953a7b68?w=800&q=80", description: "The famous bridge held by giant stone hands above the clouds." },
      { id: "dn2", name: "Marble Mountains", image: "https://images.unsplash.com/photo-1536697475147-3801f654b0c0?w=800&q=80", description: "Five marble and limestone hills filled with caves and Buddhist sanctuaries." },
      { id: "dn3", name: "Dragon Bridge", image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80", description: "A spectacular bridge that literally breathes fire and water on weekends." },
      { id: "dn4", name: "My Khe Beach", image: "https://images.unsplash.com/photo-1557053910-d7d8e6eb8b1e?w=800&q=80", description: "Miles of pristine white sand, perfect for surfing and sunbathing." }
    ]
  },
  {
    id: "hoian",
    name: "Hoi An",
    coverImage: "https://images.unsplash.com/photo-1555921015-5532091f6026?w=1600&q=80",
    shortDesc: "Lantern-lit ancient streets.",
    fullDesc: "The most charming town in Vietnam. A remarkably preserved trading port where yellow heritage buildings, silk lanterns, and world-class tailors create a magical atmosphere.",
    sights: [
      { id: "ha1", name: "Japanese Covered Bridge", image: "https://images.unsplash.com/photo-1579606032856-11f84501255e?w=800&q=80", description: "A beautifully ornate 18th-century bridge and temple." },
      { id: "ha2", name: "Old Town Night Market", image: "https://images.unsplash.com/photo-1509030450973-1f19c9e54a9d?w=800&q=80", description: "Wander through streets illuminated by thousands of colorful silk lanterns." },
      { id: "ha3", name: "An Bang Beach", image: "https://images.unsplash.com/photo-1557053910-d7d8e6eb8b1e?w=800&q=80", description: "A laid-back beach just a quick bicycle ride from the ancient town." },
      { id: "ha4", name: "Thu Bon River", image: "https://images.unsplash.com/photo-1581452243763-8dc9a7a9fc77?w=800&q=80", description: "Take a wooden rowboat at sunset and release a paper lantern for good luck." }
    ]
  },
  {
    id: "dalat",
    name: "Da Lat",
    coverImage: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1600&q=80",
    shortDesc: "The city of eternal spring.",
    fullDesc: "Nestled in the Central Highlands, Da Lat offers a cool climate, French colonial architecture, pine forests, and sprawling flower gardens. A romantic mountain escape.",
    sights: [
      { id: "dl1", name: "Crazy House", image: "https://images.unsplash.com/photo-1581026046187-5775cb56b3e7?w=800&q=80", description: "A wildly surreal architectural masterpiece resembling a giant tree." },
      { id: "dl2", name: "Xuan Huong Lake", image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80", description: "The crescent-moon shaped lake at the very center of the city." },
      { id: "dl3", name: "Datanla Waterfall", image: "https://images.unsplash.com/photo-1590054703816-1f33f07a270f?w=800&q=80", description: "Ride an alpine coaster through the pine forest down to the falls." },
      { id: "dl4", name: "Linh Phuoc Pagoda", image: "https://images.unsplash.com/photo-1509030450973-1f19c9e54a9d?w=800&q=80", description: "An incredible temple intricately decorated with millions of broken glass pieces." }
    ]
  },
  {
    id: "phuquoc",
    name: "Phu Quoc",
    coverImage: "https://images.unsplash.com/photo-1557053910-d7d8e6eb8b1e?w=1600&q=80",
    shortDesc: "White sands and pristine sunsets.",
    fullDesc: "Vietnam's premier island getaway. Framed by white-sand beaches and dense tropical jungle, it is the ultimate destination for luxury resorts and spectacular seafood.",
    sights: [
      { id: "pq1", name: "Sao Beach", image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80", description: "Powder-white sand and crystalline waters on the island's southeast coast." },
      { id: "pq2", name: "Hon Thom Cable Car", image: "https://images.unsplash.com/photo-1581026046187-5775cb56b3e7?w=800&q=80", description: "The world's longest over-sea cable car offering breathtaking aerial views." },
      { id: "pq3", name: "Phu Quoc Night Market", image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80", description: "A paradise for seafood lovers with endless fresh catches grilled to order." },
      { id: "pq4", name: "VinWonders", image: "https://images.unsplash.com/photo-1628185532502-39c0953a7b68?w=800&q=80", description: "Vietnam's largest theme park featuring thrilling rides and a massive aquarium." }
    ]
  }
];
"""
with open('src/data/destinations.ts', 'w') as f:
    f.write(content)
