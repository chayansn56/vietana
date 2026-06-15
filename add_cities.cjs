const fs = require('fs');
const path = require('path');

const destinationsPath = path.join(__dirname, 'src/data/destinations.ts');
let content = fs.readFileSync(destinationsPath, 'utf8');

const newCities = `
  {
    id: "phongnha",
    name: "Phong Nha",
    coverImage: "https://images.unsplash.com/photo-1596704179377-622f6760b73d?w=1600&q=80",
    shortDesc: "World-class caves and jungle adventures.",
    fullDesc: "Home to the oldest karst mountains in Asia, Phong Nha is an adventurer's paradise offering massive, otherworldly cave systems surrounded by pristine jungles.",
    sights: [
      { id: "phongnha1", name: "Son Doong Cave", image: "https://images.unsplash.com/photo-1583002272899-7ab0e9a18d1f?w=1280&q=80", description: "The largest natural cave in the world, requiring an expedition to explore." },
      { id: "phongnha2", name: "Paradise Cave", image: "https://images.unsplash.com/photo-1596704179377-622f6760b73d?w=1280&q=80", description: "A brilliantly illuminated, accessible cave featuring spectacular stalactites." },
      { id: "phongnha3", name: "Dark Cave", image: "https://images.unsplash.com/photo-1579704256434-62725fa825b4?w=1280&q=80", description: "Zipline into the entrance and navigate through the mud baths." },
      { id: "phongnha4", name: "Phong Nha Cave", image: "https://images.unsplash.com/photo-1627918458925-502a5f57fc1c?w=1280&q=80", description: "A beautiful river cave explored by traditional wooden dragon boats." },
      { id: "phongnha5", name: "Botanic Garden", image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1280&q=80", description: "A lovely jungle trek featuring the Thac Gio waterfall and local wildlife." },
      { id: "phongnha6", name: "Mooc Spring", image: "https://images.unsplash.com/photo-1688647038166-de0b28ec49ba?w=1280&q=80", description: "A vibrant emerald eco-trail perfect for kayaking and swimming." },
    ]
  },
  {
    id: "muine",
    name: "Mui Ne",
    coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&q=80",
    shortDesc: "Desert sands and kitesurfing breezes.",
    fullDesc: "Famous for its sweeping red and white sand dunes, Mui Ne is Vietnam's premier destination for windsurfing, kitesurfing, and desert-like landscapes.",
    sights: [
      { id: "muine1", name: "White Sand Dunes", image: "https://images.unsplash.com/photo-1591539268804-09852f8295ee?w=1280&q=80", description: "Vast, Sahara-like dunes best explored by ATV at sunrise." },
      { id: "muine2", name: "Red Sand Dunes", image: "https://images.unsplash.com/photo-1616866162383-e18e11a3d922?w=1280&q=80", description: "Striking rust-colored dunes right by the coast, perfect for sand-sledding." },
      { id: "muine3", name: "Fairy Stream", image: "https://images.unsplash.com/photo-1579704256434-62725fa825b4?w=1280&q=80", description: "Wade barefoot through a shallow stream bordered by dramatic limestone formations." },
      { id: "muine4", name: "Mui Ne Fishing Village", image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1280&q=80", description: "A harbor packed with hundreds of colorful traditional round basket boats." },
      { id: "muine5", name: "Po Shanu Cham Towers", image: "https://images.unsplash.com/photo-1583002272899-7ab0e9a18d1f?w=1280&q=80", description: "Ancient Hindu temples dating back to the 8th-century Champa Kingdom." },
      { id: "muine6", name: "Ke Ga Lighthouse", image: "https://images.unsplash.com/photo-1688647038166-de0b28ec49ba?w=1280&q=80", description: "The oldest and tallest lighthouse in Vietnam, situated on a rocky islet." },
    ]
  },
  {
    id: "cantho",
    name: "Can Tho",
    coverImage: "https://images.unsplash.com/photo-1596704179377-622f6760b73d?w=1600&q=80",
    shortDesc: "The beating heart of the Mekong Delta.",
    fullDesc: "The largest city in the Mekong Delta, famous for its floating markets, crisscrossing canals, and rich agricultural landscapes.",
    sights: [
      { id: "cantho1", name: "Cai Rang Floating Market", image: "https://images.unsplash.com/photo-1579704256434-62725fa825b4?w=1280&q=80", description: "The largest floating market in the delta, best visited at the crack of dawn." },
      { id: "cantho2", name: "Binh Thuy Ancient House", image: "https://images.unsplash.com/photo-1591539268804-09852f8295ee?w=1280&q=80", description: "A beautiful fusion of French and Vietnamese architecture from 1870." },
      { id: "cantho3", name: "Ninh Kieu Wharf", image: "https://images.unsplash.com/photo-1583002272899-7ab0e9a18d1f?w=1280&q=80", description: "A vibrant riverside promenade filled with night markets and restaurants." },
      { id: "cantho4", name: "Con Son Islet", image: "https://images.unsplash.com/photo-1627918458925-502a5f57fc1c?w=1280&q=80", description: "A tranquil island community offering community-based tourism and fruit orchards." },
      { id: "cantho5", name: "Ong Temple", image: "https://images.unsplash.com/photo-1688647038166-de0b28ec49ba?w=1280&q=80", description: "A highly ornate Chinese temple located right in the center of the city." },
      { id: "cantho6", name: "Ba Bo Flower Village", image: "https://images.unsplash.com/photo-1616866162383-e18e11a3d922?w=1280&q=80", description: "Acres of vivid flowers grown traditionally for the Lunar New Year." },
    ]
  },
  {
    id: "hagiang",
    name: "Ha Giang",
    coverImage: "https://images.unsplash.com/photo-1688647038166-de0b28ec49ba?w=1600&q=80",
    shortDesc: "Spectacular loops and mountain passes.",
    fullDesc: "Vietnam's final frontier. A dramatic, jagged landscape of towering limestone peaks and deep valleys, home to the famous Ha Giang Loop.",
    sights: [
      { id: "hagiang1", name: "Ma Pi Leng Pass", image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1280&q=80", description: "One of the most awe-inspiring mountain passes in Southeast Asia." },
      { id: "hagiang2", name: "Dong Van Karst Plateau", image: "https://images.unsplash.com/photo-1596704179377-622f6760b73d?w=1280&q=80", description: "A UNESCO Global Geopark featuring profound geological heritage." },
      { id: "hagiang3", name: "Lung Cu Flag Tower", image: "https://images.unsplash.com/photo-1616866162383-e18e11a3d922?w=1280&q=80", description: "The northernmost point of Vietnam, marking the border with China." },
      { id: "hagiang4", name: "Nho Que River", image: "https://images.unsplash.com/photo-1583002272899-7ab0e9a18d1f?w=1280&q=80", description: "A stunning turquoise river weaving through the deep Tu San Canyon." },
      { id: "hagiang5", name: "Hmong King's Palace", image: "https://images.unsplash.com/photo-1591539268804-09852f8295ee?w=1280&q=80", description: "A unique, century-old timber palace belonging to the former Hmong royalty." },
      { id: "hagiang6", name: "Quan Ba Heaven Gate", image: "https://images.unsplash.com/photo-1579704256434-62725fa825b4?w=1280&q=80", description: "A sweeping viewpoint overlooking the famous 'Fairy Bosom' twin mountains." },
    ]
  },
  {
    id: "vungtau",
    name: "Vung Tau",
    coverImage: "https://images.unsplash.com/photo-1627918458925-502a5f57fc1c?w=1600&q=80",
    shortDesc: "A breezy coastal retreat.",
    fullDesc: "A popular weekend getaway from Ho Chi Minh City, offering expansive beaches, fresh seafood, and scenic oceanfront promenades.",
    sights: [
      { id: "vungtau1", name: "Christ of Vung Tau", image: "https://images.unsplash.com/photo-1591539268804-09852f8295ee?w=1280&q=80", description: "A massive statue of Jesus atop Mount Nho, rivaling Rio's Christ the Redeemer." },
      { id: "vungtau2", name: "Vung Tau Lighthouse", image: "https://images.unsplash.com/photo-1688647038166-de0b28ec49ba?w=1280&q=80", description: "A French-built lighthouse offering panoramic 360-degree views of the city." },
      { id: "vungtau3", name: "Back Beach (Bai Sau)", image: "https://images.unsplash.com/photo-1579704256434-62725fa825b4?w=1280&q=80", description: "The longest and most popular beach in the city for swimming and surfing." },
      { id: "vungtau4", name: "Ho May Park", image: "https://images.unsplash.com/photo-1583002272899-7ab0e9a18d1f?w=1280&q=80", description: "An ecological amusement park accessible by cable car on the Large Mountain." },
      { id: "vungtau5", name: "White Palace (Bach Dinh)", image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1280&q=80", description: "The elegant former summer residence of French Governor General Paul Doumer." },
      { id: "vungtau6", name: "Niet Ban Tinh Xa", image: "https://images.unsplash.com/photo-1616866162383-e18e11a3d922?w=1280&q=80", description: "One of the most beautiful Buddhist temples featuring a massive reclining Buddha." },
    ]
  }
`;

// Insert before the last closing bracket `];` of `CITIES` array
const closingBracketIndex = content.lastIndexOf('];');
if (closingBracketIndex !== -1) {
  content = content.slice(0, closingBracketIndex) + newCities + content.slice(closingBracketIndex);
  fs.writeFileSync(destinationsPath, content, 'utf8');
  console.log('Added new cities to destinations.ts');
}
