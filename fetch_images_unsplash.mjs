import https from 'https';
import fs from 'fs';

const cities = [
  "Sapa", "Hanoi", "Ha Long Bay", "Ninh Binh", "Phong Nha", 
  "Hue", "Da Nang", "Hoi An", "Mui Ne", "Ho Chi Minh City", 
  "Mekong Delta", "Phu Quoc", "Da Lat", "Nha Trang"
];

const results = {};

function fetchCityUnsplash(city) {
  return new Promise((resolve) => {
    const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(city + ' Vietnam')}&per_page=5&orientation=landscape`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const urls = json.results.map(r => r.urls.regular);
          results[city] = urls;
          resolve();
        } catch (e) {
          console.error("Failed for", city);
          resolve();
        }
      });
    }).on('error', () => resolve());
  });
}

async function run() {
  for (const city of cities) {
    await fetchCityUnsplash(city);
  }
  fs.writeFileSync('./real_images.json', JSON.stringify(results, null, 2));
  console.log('Done writing real_images.json');
}

run();
