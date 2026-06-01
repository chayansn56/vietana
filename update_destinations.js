const fs = require('fs');

const path = './src/data/destinations.ts';
let content = fs.readFileSync(path, 'utf8');

// We will use 5 distinct, high-quality images for each destination type
const mountainImages = [
  "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800&q=80",
  "https://images.unsplash.com/photo-1600989045811-9a7428f5ea0b?w=800&q=80",
  "https://images.unsplash.com/photo-1579958013233-0c4f8ab4671c?w=800&q=80",
  "https://images.unsplash.com/photo-1599557438491-b924734563a6?w=800&q=80",
  "https://images.unsplash.com/photo-1601639088613-2d2c77d4c227?w=800&q=80"
];

const cityImages = [
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
  "https://images.unsplash.com/photo-1509339022327-1e1e25360a41?w=800&q=80",
  "https://images.unsplash.com/photo-1602717805177-3e19808bd4a5?w=800&q=80",
  "https://images.unsplash.com/photo-1601131750616-0e3fdfb008d3?w=800&q=80"
];

const coastalImages = [
  "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80",
  "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=800&q=80",
  "https://images.unsplash.com/photo-1548023487-1cbb394f28ba?w=800&q=80"
];

const heritageImages = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  "https://images.unsplash.com/photo-1548023487-1cbb394f28ba?w=800&q=80",
  "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80",
  "https://images.unsplash.com/photo-1560962386-3f11d13db1dc?w=800&q=80",
  "https://images.unsplash.com/photo-1596489370908-01d00c3b24f5?w=800&q=80"
];

function getImagesForCity(name) {
  const nameL = name.toLowerCase();
  if (nameL.includes('sapa') || nameL.includes('da lat') || nameL.includes('phong nha')) return mountainImages;
  if (nameL.includes('hanoi') || nameL.includes('ho chi minh')) return cityImages;
  if (nameL.includes('ha long') || nameL.includes('da nang') || nameL.includes('nha trang') || nameL.includes('phu quoc') || nameL.includes('mui ne')) return coastalImages;
  return heritageImages;
}

// Regex to match each object in MAP_DESTINATIONS
const regex = /\{name:'([^']+)', time:'([^']+)', desc:'([^']+)', lat:([\d.]+), lng:([\d.]+), img:'([^']+)'\}/g;

const newContent = content.replace(regex, (match, name, time, desc, lat, lng, img) => {
    const images = getImagesForCity(name);
    // ensure the primary img is the first in the array for variety
    const imagesStr = JSON.stringify([img, ...images.slice(0, 4)]);
    return `{name:'${name}', time:'${time}', desc:'${desc}', lat:${lat}, lng:${lng}, img:'${img}', images: ${imagesStr}}`;
});

fs.writeFileSync(path, newContent, 'utf8');
console.log('Updated destinations.ts with 5 images per city.');
