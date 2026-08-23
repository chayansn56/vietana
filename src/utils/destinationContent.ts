import { MAP_DESTINATIONS, MAP_SIGHTS, MapSight } from '../data/destinations';
import { EXPERIENCES_DATA, ExperienceProduct } from '../data/experiencesData';
import { ITINERARIES_DATABASE, PackageProduct } from '../data/packagesData';
import { magazineData, Article } from '../data/notesMagazine';

// Slug and alias normalization utility
export function normalizeCityName(name: string): string {
  if (!name) return '';
  const n = name.trim().toLowerCase()
    .replace(/đà nẵng/g, 'da nang')
    .replace(/hội an/g, 'hoi an')
    .replace(/hồ chí minh/g, 'ho chi minh')
    .replace(/quảng ninh/g, 'quang ninh')
    .replace(/quảng bình/g, 'quang binh')
    .replace(/quảng ngãi/g, 'quang ngai')
    .replace(/quảng nam/g, 'quang nam')
    .replace(/lào cai/g, 'lao cai')
    .replace(/bình thuận/g, 'binh thuan')
    .replace(/bà rịa-vũng tàu/g, 'ba ria vung tau')
    .replace(/bến tre/g, 'ben tre')
    .replace(/sóc trăng/g, 'soc trang')
    .replace(/phú thọ/g, 'phu tho')
    .replace(/yên bái/g, 'yen bai')
    .replace(/hải dương/g, 'hai duong')
    .replace(/bắc ninh/g, 'bac ninh')
    .replace(/hưng yên/g, 'hung yen')
    .replace(/ninh bình/g, 'ninh binh')
    .replace(/hà nam/g, 'ha nam')
    .replace(/hòa bình/g, 'hoa binh')
    .replace(/vĩnh phúc/g, 'vinh phuc')
    .replace(/bắc giang/g, 'bac giang')
    .replace(/thái bình/g, 'thai binh')
    .replace(/lâm đồng/g, 'lam dong')
    .replace(/bình phước/g, 'binh phuoc')
    .replace(/phú yên/g, 'phu yen')
    .replace(/bình định/g, 'binh dinh')
    .replace(/đồng nai/g, 'dong nai')
    .replace(/đồng tháp/g, 'dong thap')
    .replace(/long an/g, 'long an')
    .replace(/hải phòng/g, 'hai phong')
    .replace(/hậu giang/g, 'hau giang')
    .replace(/bạc liêu/g, 'bac lieu')
    .replace(/vĩnh long/g, 'vinh long')
    .replace(/tây ninh/g, 'tay ninh')
    .replace(/thái nguyên/g, 'thai nguyen')
    .replace(/lai châu/g, 'lai chau')
    .replace(/sơn la/g, 'son la')
    .replace(/hà giang/g, 'ha giang')
    .replace(/nam định/g, 'nam dinh')
    .replace(/hà tĩnh/g, 'ha tinh')
    .replace(/nghệ an/g, 'nghe an')
    .replace(/đắk lắk/g, 'dak lak')
    .replace(/ninh thuận/g, 'ninh thuan')
    .replace(/đắk nông/g, 'dak nong')
    .replace(/an giang/g, 'an giang')
    .replace(/cà mau/g, 'ca mau')
    .replace(/trà vinh/g, 'tra vinh')
    .replace(/cao bằng/g, 'cao bang')
    .replace(/kiên giang/g, 'kien giang')
    .replace(/lạng sơn/g, 'lang son')
    .replace(/thanh hóa/g, 'thanh hoa')
    .replace(/bắc kạn/g, 'bac kan')
    .replace(/tuyên quang/g, 'tuyen quang')
    .replace(/bình dương/g, 'binh duong')
    .replace(/cần thơ/g, 'can tho');

  if (n === 'hcmc' || n === 'saigon' || n === 'ho chi minh city' || n === 'ho chi minh') {
    return 'ho chi minh city';
  }
  if (n === 'ha long' || n === 'halong' || n === 'halong bay' || n === 'ha long bay') {
    return 'ha long bay';
  }
  if (n === 'sapa' || n === 'sa pa') {
    return 'sapa';
  }
  return n;
}

// 1. Get Things to Do (sights) by destination name
export function getThingsToDoByDestination(cityName: string): MapSight[] {
  const normName = normalizeCityName(cityName);
  return MAP_SIGHTS.filter(sight => normalizeCityName(sight.cityName) === normName);
}

// 2. Get Experiences by destination name
export function getExperiencesByDestination(cityName: string): ExperienceProduct[] {
  const normName = normalizeCityName(cityName);
  return EXPERIENCES_DATA.filter(exp => normalizeCityName(exp.destination) === normName);
}

// 3. Get Packages by destination name
export function getPackagesByDestination(cityName: string): PackageProduct[] {
  const normName = normalizeCityName(cityName);
  return ITINERARIES_DATABASE.filter(pkg => 
    pkg.destinations.some(d => normalizeCityName(d) === normName)
  );
}

// 4. Get Journal posts by destination name
export function getJournalPostsByDestination(cityName: string): Article[] {
  const normName = normalizeCityName(cityName);
  const posts: Article[] = [];

  // Check in featured
  magazineData.featured.forEach(art => {
    const titleMatch = art.title.toLowerCase().includes(normName);
    const introMatch = art.intro.toLowerCase().includes(normName);
    if ((titleMatch || introMatch) && !posts.some(p => p.id === art.id)) {
      posts.push(art);
    }
  });

  // Check in all collections
  magazineData.collections.forEach(col => {
    col.articles.forEach(art => {
      const titleMatch = art.title.toLowerCase().includes(normName);
      const introMatch = art.intro.toLowerCase().includes(normName);
      if ((titleMatch || introMatch) && !posts.some(p => p.id === art.id)) {
        posts.push(art);
      }
    });
  });

  return posts;
}

// 5. Get Aggregate Content Counts
export interface ContentCounts {
  thingsToDo: number;
  experiences: number;
  packages: number;
  journal: number;
}

export function getDestinationContentCounts(cityName: string): ContentCounts {
  return {
    thingsToDo: getThingsToDoByDestination(cityName).length,
    experiences: getExperiencesByDestination(cityName).length,
    packages: getPackagesByDestination(cityName).length,
    journal: getJournalPostsByDestination(cityName).length
  };
}

// 6. Get Minimum starting price derived from real packages and experiences pricing
export function getDestinationStartingPrice(cityName: string): { amount: number; display: string } | null {
  const pkgs = getPackagesByDestination(cityName);
  const exps = getExperiencesByDestination(cityName);

  let minPrice = Infinity;
  let priceType: 'package' | 'experience' = 'package';

  pkgs.forEach(p => {
    if (p.price) {
      const parsed = parseInt(p.price.replace(/[^\d]/g, ''), 10);
      if (!isNaN(parsed) && parsed < minPrice) {
        minPrice = parsed;
        priceType = 'package';
      }
    }
  });

  exps.forEach(e => {
    if (e.pricing && e.pricing.displayPrice) {
      const parsed = parseInt(e.pricing.displayPrice.replace(/[^\d]/g, ''), 10);
      if (!isNaN(parsed) && parsed < minPrice) {
        minPrice = parsed;
        priceType = 'experience';
      }
    }
  });

  if (minPrice === Infinity) {
    return null;
  }

  const formattedPrice = `₹${minPrice.toLocaleString('en-IN')}`;
  return {
    amount: minPrice,
    display: priceType === 'package' ? `Packages from ${formattedPrice}` : `Experiences from ${formattedPrice}`
  };
}

// 7. Marker tier classification based on data and counts
export function getMarkerTier(cityName: string): 'primary' | 'secondary' | 'discovery' {
  const norm = normalizeCityName(cityName);
  
  // Explicit Hubs
  const primaryHubs = [
    'hanoi', 'ha long bay', 'sapa', 'ha giang', 'ninh binh', 'hue', 
    'da nang', 'hoi an', 'nha trang', 'da lat', 'ho chi minh city', 
    'can tho', 'phu guoc', 'phu quoc'
  ];
  if (primaryHubs.includes(norm)) {
    return 'primary';
  }

  const secondaryCities = [
    'cao bang', 'mai chau', 'moc chau', 'cat ba', 'phong nha', 
    'quang binh', 'quy nhon', 'phu yen', 'mui ne', 'vung tau', 
    'ben tre', 'chau doc', 'con dao'
  ];
  if (secondaryCities.includes(norm)) {
    return 'secondary';
  }

  return 'discovery';
}

// 8. Centralized image fallback system
export function getDestinationImage(cityName: string, fallbackUrl?: string): string {
  const normName = normalizeCityName(cityName);
  
  // Find in MAP_DESTINATIONS first
  const dest = MAP_DESTINATIONS.find(d => normalizeCityName(d.name) === normName);
  if (dest && dest.img) return dest.img;

  // Fallback to experiences
  const exps = getExperiencesByDestination(cityName);
  if (exps.length > 0 && exps[0].images?.thumbnail) return exps[0].images.thumbnail;

  // Fallback to journal posts
  const posts = getJournalPostsByDestination(cityName);
  if (posts.length > 0 && posts[0].image) return posts[0].image;

  // Fallback to region defaults
  if (['hanoi', 'sapa', 'ha long bay', 'ninh binh', 'phong nha'].includes(normName)) {
    return 'https://images.unsplash.com/photo-1509060464153-44667396260f?w=800&q=80'; // North fallback
  }
  
  return fallbackUrl || 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80'; // Neutral fallback
}
