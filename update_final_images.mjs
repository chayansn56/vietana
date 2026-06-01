import fs from 'fs';

const MAP_DESTINATIONS = [
  {
    name: 'Sapa', time: 'Sep - Nov, Mar - May', desc: 'Misty mountains and terraced rice fields.', lat: 22.3364, lng: 103.8438,
    img: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Tay_sa_pa.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/7/7e/Tay_sa_pa.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/b/b6/An_ancient_engraved_rock_of_Sapa.JPG',
      'https://upload.wikimedia.org/wikipedia/commons/a/a0/B%C3%A1n_qu%E1%BA%A7n_%C3%A1o_t%E1%BA%A1i_Sa_Pa.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/6/66/B%C3%A3i_%C4%91%C3%A1_c%E1%BB%95.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/f/f1/Children_at_Sapa.jpg'
    ]
  },
  {
    name: 'Hanoi', time: 'Oct - Apr', desc: 'The cultural and historical heart of Vietnam.', lat: 21.0285, lng: 105.8542,
    img: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Hanoi_skyline_with_Ba_Vi_Mountain.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/8/8e/Hanoi_skyline_with_Ba_Vi_Mountain.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/a/ae/9343761968_c113c08f8d_o-768x575.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/f/f1/Bacbophu.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/c/cd/Bao_tang_my_thuat.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/6/6a/Vietnam_National_Museum_of_History%2C_Hanoi%2C_Vietnam.jpg'
    ]
  },
  {
    name: 'Ha Long Bay', time: 'Oct - Apr', desc: 'Thousands of limestone karsts in emerald waters.', lat: 20.9101, lng: 107.1839,
    img: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Ha_Long_Bay_in_2019.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/7/79/Ha_Long_Bay_in_2019.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/0/0f/Bai_Tu_Long_Bay_-_Quang_Ninh_-_Vietnam_%2835892945123%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/4/42/Ha_Long_2019_taken_by_DJI_FC220.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/f/fa/Lan_Ha_Bay.JPG',
      'https://upload.wikimedia.org/wikipedia/commons/2/22/Diamond_Princess_%28ship%2C_2004%29_-_cropped.jpg'
    ]
  },
  {
    name: 'Ninh Binh', time: 'Jan - Mar, May - Aug', desc: 'The Halong Bay on land with stunning rivers.', lat: 20.2539, lng: 105.9750,
    img: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Ninh_B%C3%ACnh.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/5/5e/Ninh_B%C3%ACnh.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/3/3c/Tam_Coc_by_Tuan_Mai_%22007%22_%288888350545%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/4/4f/Po_Klong_Garai.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/a/ae/Dau_Tieng_Lake_-_50766650163.png',
      'https://upload.wikimedia.org/wikipedia/commons/6/63/Ninh_Binh_Stadium_2024.jpg'
    ]
  },
  {
    name: 'Phong Nha', time: 'Feb - Aug', desc: 'World-class caves and jungle adventures.', lat: 17.5947, lng: 106.2842,
    img: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Phong_Nha_village.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/4/4d/Phong_Nha_village.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/2/2d/PhongNhaCave2.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/5/5a/Senator_Bob_Kerrey.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/e/e6/S%C3%B4ng_C%E1%BA%A5m_H%E1%BA%A3i_Ph%C3%B2ng_V%E1%BB%81_%C4%90%C3%AAm_n%C4%83m_2025.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/5/5c/Nha_Trang%2C_Kh%C3%A1nh_H%C3%B2a.png'
    ]
  },
  {
    name: 'Hue', time: 'Jan - Aug', desc: 'Ancient imperial city and royal tombs.', lat: 16.4637, lng: 107.5909,
    img: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Hu%E1%BA%BF_%282024%29_-_Meridian_Gate_-_Ng%E1%BB%8D_M%C3%B4n_%28Ho%C3%A0ng_th%C3%A0nh_Hu%E1%BA%BF%29_-_img_02.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/5/52/Hu%E1%BA%BF_%282024%29_-_Meridian_Gate_-_Ng%E1%BB%8D_M%C3%B4n_%28Ho%C3%A0ng_th%C3%A0nh_Hu%E1%BA%BF%29_-_img_02.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/4/40/Th%C3%A0nh_ph%E1%BB%91_Hu%E1%BA%BF_nh%C3%ACn_t%E1%BB%AB_tr%C3%AAn_cao_%282%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/0/04/B%C3%BAn_b%C3%B2_Hu%E1%BA%BF_-_Ch%E1%BB%A3_%C4%90%C3%B4ng_Ba_%282024%29_-_img_02.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/9/96/Marines_Fire_From_a_House_Window%2C_February_1968_%2816242259837%29_%28cropped%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/f/f1/HSV_cone.jpg'
    ]
  },
  {
    name: 'Da Nang', time: 'Feb - May', desc: 'Modern city with beautiful beaches and bridges.', lat: 16.0544, lng: 108.2022,
    img: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Dragon_Bridge%2C_Da_Nang_during_day_-_20230819_%28cropped%29.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/2/2a/Dragon_Bridge%2C_Da_Nang_during_day_-_20230819_%28cropped%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/3/31/Overlooking_Da_Nang_Port_fixed.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/4/4a/C%E1%BA%A7u_R%E1%BB%93ng.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/4/48/Da_Nang_International_Airport%2C_Vietnam.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/1/12/Da_Nang_Air_Base_during_the_Vietnam_War.jpg'
    ]
  },
  {
    name: 'Hoi An', time: 'Feb - Apr', desc: 'Charming lantern-lit ancient trading port.', lat: 15.8801, lng: 108.3380,
    img: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/2024_H%E1%BB%99i_An_-_Japanese_Covered_Bridge_%28Ch%C3%B9a_C%E1%BA%A7u%29_after_renovation_-_img_11.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/b/b8/2024_H%E1%BB%99i_An_-_Japanese_Covered_Bridge_%28Ch%C3%B9a_C%E1%BA%A7u%29_after_renovation_-_img_11.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/3/30/Ch%E1%BB%A3_H%E1%BB%99i_An_-_Hoi_An_Market_%282024%29_-_img_02.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/0/01/Hoi_An_%28I%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/2/27/10549-Hoi-An_%2837621348460%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/0/0a/Bia_hoi.jpg'
    ]
  },
  {
    name: 'Mui Ne', time: 'Nov - Apr', desc: 'Red and white sand dunes with kitesurfing.', lat: 10.9575, lng: 108.2753,
    img: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Dunas_de_Maspalomas.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/6/61/Dunas_de_Maspalomas.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/6/6f/Mui_Ne2.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/a/ac/Dinh_Th%E1%BA%A7y_Th%C3%ADm_%E1%BB%9F_La_Gi.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/1/10/Phanthiet.png',
      'https://upload.wikimedia.org/wikipedia/commons/b/b3/Halong_bay_vietnam.JPG'
    ]
  },
  {
    name: 'Ho Chi Minh City', time: 'Dec - Apr', desc: 'The vibrant, energetic southern metropolis.', lat: 10.8231, lng: 106.6297,
    img: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Ho_Chi_Minh_City_panorama_2019_%28cropped2%29.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/f/f4/Ho_Chi_Minh_City_panorama_2019_%28cropped2%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/3/3d/Ho_Chi_Minh_City%2C_City_Hall%2C_2020-01_CN-02.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/7/71/Ho_Chi_Minh_City_Television_Headquarters_2021.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/b/b9/%28VNM-Ho_Chi_Minh_City%29_HCMC_Metro_Line_1_Hitachi_Rolling_Stock_L1005_%40_Van_Thanh_Park_2025-10-06.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/f/f7/Ho_Chi_Minh_-_1946_Portrait_%28cropped%29.jpg'
    ]
  },
  {
    name: 'Mekong Delta', time: 'Sep - Nov', desc: 'Lush waterways and floating markets.', lat: 10.0452, lng: 105.7469,
    img: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/CanThoFloatingMarket.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/3/3b/CanThoFloatingMarket.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/f/ff/Cuu_Long.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/2/2e/CaiMonVillage.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/1/1d/2005-07-23_Mekong_-_Maisons.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/8/87/CaiMonVillage-autolevel.jpg'
    ]
  },
  {
    name: 'Phu Quoc', time: 'Nov - Apr', desc: 'Tropical island paradise with white sand beaches.', lat: 10.2289, lng: 103.9572,
    img: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Phu_Quoc_Beach.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/2/28/Phu_Quoc_Beach.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/e/e0/Phu_Quoc_island_coast.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/c/c5/Phu_Quoc_Sao_Beach.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/2/22/Sun_World_Hon_Thom_Phu_Quoc.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/a/af/Sunset_in_Phu_Quoc.jpg'
    ]
  },
  {
    name: 'Da Lat', time: 'Dec - Mar', desc: 'The city of eternal spring and romantic pine forests.', lat: 11.9404, lng: 108.4384,
    img: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Cathedral_of_Da_Lat.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/6/62/Cathedral_of_Da_Lat.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/a/a4/HangNgaCrazyHouse3.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/7/73/A_street_of_Da_Lat_ca._1925.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/f/f3/Bao_Dai%27s_Summer_Palace_02.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/8/86/Artichoketea.jpg'
    ]
  },
  {
    name: 'Nha Trang', time: 'Feb - May', desc: 'Coastal resort city with stunning bays and diving.', lat: 12.2429, lng: 109.1953,
    img: 'https://upload.wikimedia.org/wikipedia/commons/1/10/04052023_Ponagar_Hindu_temples_complex%2C_Nha_Trang_Vietnam_-_27.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/1/10/04052023_Ponagar_Hindu_temples_complex%2C_Nha_Trang_Vietnam_-_27.jpg',
      'https://upload.wikimedia.org/wikipedia/en/f/fe/Nha_Trang_Bay.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/c/c4/Banh-Canh-Noodle-Soup.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/7/75/Buddha_statue%2C_Nha_Trang.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/1/13/B%C3%ACnh_%C4%91%C3%A0i_%E1%BB%9F_th%C3%A1p_Ponagar%2C_Nha_Trang.JPG'
    ]
  }
];

let fileContent = `import { Destination } from '../types';\n\nexport const MAP_DESTINATIONS: Destination[] = ${JSON.stringify(MAP_DESTINATIONS, null, 2)};\n\nexport const MAP_DEFAULT_ROUTE: [number, number][] = [\n  [21.0285, 105.8542], // Hanoi\n  [16.0544, 108.2022], // Da Nang\n  [10.8231, 106.6297]  // Ho Chi Minh City\n];\n`;

fs.writeFileSync('./src/data/destinations.ts', fileContent);
console.log('Successfully updated destinations.ts');
