import fs from 'fs';
import https from 'https';

const cities = [
  "Sa Pa", "Hanoi", "Ha Long Bay", "Ninh Binh", "Phong Nha-Ke Bang National Park", 
  "Hue", "Da Nang", "Hoi An", "Mui Ne", "Ho Chi Minh City", 
  "Mekong Delta", "Phu Quoc", "Da Lat", "Nha Trang"
];

const cityMap = {
  "Sa Pa": "Sapa",
  "Phong Nha-Ke Bang National Park": "Phong Nha"
};

const results = {};

function fetchImages(city, index) {
  return new Promise((resolve, reject) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&generator=images&titles=${encodeURIComponent(city)}&gimlimit=30&prop=imageinfo&iiprop=url&format=json`;
    const options = {
        headers: {
            'User-Agent': 'VietanaApp/1.0 (contact@vietana.com)'
        }
    };
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query ? json.query.pages : {};
          const urls = [];
          for (const key in pages) {
            const ii = pages[key].imageinfo;
            if (ii && ii[0] && ii[0].url) {
              const u = ii[0].url;
              if (u.match(/\.(jpg|jpeg|png)$/i) && !u.toLowerCase().includes('logo') && !u.toLowerCase().includes('map') && !u.toLowerCase().includes('flag') && !u.toLowerCase().includes('symbol') && !u.toLowerCase().includes('icon')) {
                urls.push(u);
              }
            }
          }
          const finalCity = cityMap[city] || city;
          results[finalCity] = urls.slice(0, 5);
          resolve();
        } catch (e) {
          console.error("Error parsing " + city, e);
          resolve();
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  for (let i = 0; i < cities.length; i++) {
    await fetchImages(cities[i], i);
  }
  fs.writeFileSync('./wiki_images.json', JSON.stringify(results, null, 2));
  console.log('Done writing wiki_images.json');
}

run();
