const fs = require('fs');
const path = require('path');

const destinationsPath = path.join(__dirname, 'src/data/destinations.ts');
let content = fs.readFileSync(destinationsPath, 'utf8');

const unsplashIds = [
  '1528127269322-539801943592',
  '1583417319070-4a69db38a482',
  '1559592413-7cec4d0cae2b',
  '1557750255-c76072a7aad1',
  '1531737212413-667205e1cda7',
  '1550650954-c8c7040212d2',
  '1596704179377-622f6760b73d',
  '1579704256434-62725fa825b4',
  '1627918458925-502a5f57fc1c',
  '1542601906990-b4d3fb778b09',
  '1688647038166-de0b28ec49ba',
  '1591539268804-09852f8295ee',
  '1616866162383-e18e11a3d922',
  '1583002272899-7ab0e9a18d1f',
  '1600100414408-54e63fc6e4e5',
  '1563266938-166ee5978f87',
  '1615556272847-f274a4ffc04c',
  '1590202401662-79010abccb83',
  '1570783307584-c8ed518a4a2b',
  '1646274488344-0c58a69e3a35',
  '1601618600020-f565dbbf0e85'
];

let idIndex = 0;

// Replace all image: "..." and coverImage: "..." with Unsplash URLs
content = content.replace(/(image|coverImage):\s*"([^"]+)"/g, (match, p1, p2) => {
  if (p2.includes('/images/cities/') || p2.includes('/images/sights/')) {
    return match; // keep local
  }
  const id = unsplashIds[idIndex % unsplashIds.length];
  idIndex++;
  return `${p1}: "https://images.unsplash.com/photo-${id}?w=800&q=80"`;
});

// For MAP_DESTINATIONS, replace img and images array
content = content.replace(/img:\s*"([^"]+)"/g, () => {
  const id = unsplashIds[idIndex % unsplashIds.length];
  idIndex++;
  return `img: "https://images.unsplash.com/photo-${id}?w=800&q=80"`;
});

content = content.replace(/images:\s*\[([\s\S]*?)\]/g, (match, p1) => {
  const lines = p1.split(',').map(line => {
    if (line.trim().length === 0) return line;
    const id = unsplashIds[idIndex % unsplashIds.length];
    idIndex++;
    return `\n      "https://images.unsplash.com/photo-${id}?w=800&q=80"`;
  });
  return `images: [${lines.join(',')}\n    ]`;
});

fs.writeFileSync(destinationsPath, content, 'utf8');
console.log('Fixed all images to use stable Unsplash URLs directly.');
