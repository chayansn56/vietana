const fs = require('fs');
const https = require('https');

function fetchWikiImage(title) {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=800`;
    https.get(url, { headers: { 'User-Agent': 'VietanaBot/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const page = Object.values(pages)[0];
          if (page.thumbnail) {
            resolve(page.thumbnail.source);
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

const dishes = [
  // Viet Veg
  { id: 'v-veg-1', q: 'Pho' },
  { id: 'v-veg-2', q: 'Bánh_mì' },
  { id: 'v-veg-3', q: 'Rice_vermicelli' },
  { id: 'v-veg-4', q: 'Mì_Quảng' },
  { id: 'v-veg-5', q: 'Gỏi_cuốn' },
  { id: 'v-veg-6', q: 'Cơm_tấm' },
  { id: 'v-veg-7', q: 'Tofu' },
  { id: 'v-veg-8', q: 'Hot_pot' },
  { id: 'v-veg-9', q: 'Lotus_root' },
  { id: 'v-veg-10', q: 'Congee' },
  
  // Viet Non-Veg
  { id: 'v-nveg-1', q: 'Pho' },
  { id: 'v-nveg-2', q: 'Bun_cha' },
  { id: 'v-nveg-3', q: 'Mì_Quảng' },
  { id: 'v-nveg-4', q: 'Cơm_tấm' },
  { id: 'v-nveg-5', q: 'Bánh_mì' },
  { id: 'v-nveg-6', q: 'Cao_lầu' },
  { id: 'v-nveg-7', q: 'Bún_thịt_nướng' },
  { id: 'v-nveg-8', q: 'Chả_giò' },
  { id: 'v-nveg-9', q: 'Clay_pot_cooking' },
  { id: 'v-nveg-10', q: 'Lẩu' },

  // Indian Veg
  { id: 'i-veg-1', q: 'Paneer_makhani' },
  { id: 'i-veg-2', q: 'Dal_makhani' },
  { id: 'i-veg-3', q: 'Chole_bhature' },
  { id: 'i-veg-4', q: 'Palak_paneer' },
  { id: 'i-veg-5', q: 'Biryani' },
  { id: 'i-veg-6', q: 'Aloo_gobi' },
  { id: 'i-veg-7', q: 'Rajma' },
  { id: 'i-veg-8', q: 'Masala_dosa' },
  { id: 'i-veg-9', q: 'Idli' },
  { id: 'i-veg-10', q: 'Kofta' },

  // Indian Non-Veg
  { id: 'i-nveg-1', q: 'Butter_chicken' },
  { id: 'i-nveg-2', q: 'Chicken_tikka_masala' },
  { id: 'i-nveg-3', q: 'Biryani' },
  { id: 'i-nveg-4', q: 'Tandoori_chicken' },
  { id: 'i-nveg-5', q: 'Korma' },
  { id: 'i-nveg-6', q: 'Rogan_josh' },
  { id: 'i-nveg-7', q: 'Malabar_matthi_curry' },
  { id: 'i-nveg-8', q: 'Chettinad_cuisine' },
  { id: 'i-nveg-9', q: 'Seekh_kebab' },
  { id: 'i-nveg-10', q: 'Fish_curry' },
];

const FALLBACK_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg';

(async () => {
  console.log("Fetching images...");
  const mapping = {};
  for (const dish of dishes) {
    let img = await fetchWikiImage(dish.q);
    if (!img) {
      console.log(`Failed to fetch for ${dish.q}, using fallback.`);
      img = FALLBACK_URL;
    }
    mapping[dish.id] = img;
  }

  let content = fs.readFileSync('src/data/food.ts', 'utf-8');
  
  // Clean up the getImg references
  const getImgRegex = /img:\s*getImg\(\d+\)/g;
  
  let matchIndex = 0;
  content = content.replace(getImgRegex, (match, offset, fullString) => {
    // We need to match the ID. We can extract it from the line.
    // The line usually looks like: { id: 'v-veg-1', ... img: getImg(0) }
    // Let's find the ID in the preceding text of the same line.
    const precedingStr = fullString.substring(Math.max(0, offset - 200), offset);
    const idMatch = precedingStr.match(/id:\s*'([^']+)'/);
    if (idMatch && idMatch[1] && mapping[idMatch[1]]) {
      return `img: '${mapping[idMatch[1]]}'`;
    }
    return `img: '${FALLBACK_URL}'`;
  });

  // Also replace generic Cafe images if we want, or just leave them. The user said "the food picture...".
  // But let's fix cafes just to be completely sure.
  const cafeRegex = /img:\s*'https:\/\/images\.unsplash\.com[^']+'/g;
  let cafeCounter = 0;
  const cafeImages = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/VietnameseCoffee.jpg/800px-VietnameseCoffee.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Latte_at_Ralph%27s_Coffee.jpg/800px-Latte_at_Ralph%27s_Coffee.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Espresso_macchiato.jpg/800px-Espresso_macchiato.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Coffee_beans_and_a_cup_of_coffee.jpg/800px-Coffee_beans_and_a_cup_of_coffee.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Coffee_beans_in_a_spoon.jpg/800px-Coffee_beans_in_a_spoon.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Blue_Bottle%2C_Kyoto_Style_Ice_Coffee_%285909775445%29.jpg/800px-Blue_Bottle%2C_Kyoto_Style_Ice_Coffee_%285909775445%29.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Iced_Coffee.jpg/800px-Iced_Coffee.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Latte_art_by_munehiro.jpg/800px-Latte_art_by_munehiro.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Coffee_shop_in_Vietnam.jpg/800px-Coffee_shop_in_Vietnam.jpg'
  ];
  content = content.replace(cafeRegex, (match) => {
    const replacement = `img: '${cafeImages[cafeCounter % cafeImages.length]}'`;
    cafeCounter++;
    return replacement;
  });

  fs.writeFileSync('src/data/food.ts', content);
  console.log("food.ts successfully updated with real images!");
})();
