import fs from 'fs';
import https from 'https';

const categories = [
  { city: "Ha Long Bay", cat: "Hạ_Long_Bay" },
  { city: "Ninh Binh", cat: "Ninh_Bình_Province" },
  { city: "Phong Nha", cat: "Phong_Nha-Kẻ_Bàng_National_Park" },
  { city: "Hoi An", cat: "Hội_An" },
  { city: "Mui Ne", cat: "Mũi_Né" },
  { city: "Phu Quoc", cat: "Phú_Quốc" },
  { city: "Mekong Delta", cat: "Mekong_Delta" }
];

const results = {};

function fetchImages(city, cat) {
  return new Promise((resolve, reject) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=categorymembers&gcmtitle=Category:${encodeURIComponent(cat)}&gcmtype=file&gcmlimit=50&prop=imageinfo&iiprop=url&format=json`;
    const options = { headers: { 'User-Agent': 'VietanaApp/1.0 (contact@vietana.com)' } };
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
              if (u.match(/\.(jpg|jpeg|png)$/i) && !u.toLowerCase().includes('logo') && !u.toLowerCase().includes('map') && !u.toLowerCase().includes('flag') && !u.toLowerCase().includes('symbol')) {
                urls.push(u);
              }
            }
          }
          results[city] = urls.slice(0, 5);
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
  for (let item of categories) {
    await fetchImages(item.city, item.cat);
  }
  fs.writeFileSync('./commons_images.json', JSON.stringify(results, null, 2));
  console.log('Done writing commons_images.json');
}

run();
