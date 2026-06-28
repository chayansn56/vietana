import { FoodItem } from '../types';

const IMAGES = [
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
  'https://images.unsplash.com/photo-1555921015-5532091f6026?w=800&q=80',
  'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80',
  'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80',
  'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80',
  'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
  'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80',
  'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80',
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80'
];

const getImg = (i: number) => IMAGES[i % IMAGES.length];

export const VIETNAMESE_VEG_ITEMS: FoodItem[] = [
  { id: 'v-veg-1', name: 'Phở Chay', desc: 'Vegetarian version of the iconic Vietnamese noodle soup, made with a rich mushroom and vegetable broth, served with fresh herbs.', tags: ['Vietnamese', 'Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  { id: 'v-veg-2', name: 'Bánh Mì Chay', desc: 'Crispy Vietnamese baguette filled with tofu, vegetarian pate, pickled carrots, daikon, cucumber, and fresh cilantro.', tags: ['Vietnamese', 'Vegetarian'], img: '/food/image_2.jpg' },
  { id: 'v-veg-3', name: 'Bún Chay', desc: 'Rice vermicelli noodle bowl topped with fried tofu, vegetarian spring rolls, fresh greens, and a soy-based dressing.', tags: ['Vietnamese', 'Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  { id: 'v-veg-4', name: 'Mì Quảng Chay', desc: 'Central Vietnamese turmeric noodles served with a small amount of rich vegetable broth, topped with rice crackers and peanuts.', tags: ['Vietnamese', 'Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  { id: 'v-veg-5', name: 'Gỏi Cuốn Chay', desc: 'Fresh vegetarian spring rolls wrapped in rice paper with tofu, vermicelli, and herbs, served with peanut sauce.', tags: ['Vietnamese', 'Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  { id: 'v-veg-6', name: 'Cơm Chay', desc: 'A Vietnamese vegetarian mixed rice plate, featuring assorted vegetable stir-fries and tofu dishes.', tags: ['Vietnamese', 'Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  { id: 'v-veg-7', name: 'Đậu Hũ Sốt Cà', desc: 'Fried tofu simmered in a savory and slightly sweet fresh tomato sauce.', tags: ['Vietnamese', 'Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  { id: 'v-veg-8', name: 'Vegetarian Hotpot', desc: 'A communal dining experience featuring a bubbling pot of savory mushroom broth and an array of fresh vegetables and tofu to cook.', tags: ['Vietnamese', 'Vegetarian'], img: '/food/image_5.jpg' },
  { id: 'v-veg-9', name: 'Lotus Root Salad', desc: 'Crispy, sweet, and tangy salad made with pickled lotus roots, carrots, and herbs, topped with crushed peanuts.', tags: ['Vietnamese', 'Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  { id: 'v-veg-10', name: 'Mushroom Noodle Soup', desc: 'A comforting clear soup with mixed Asian mushrooms, glass noodles, and fresh coriander.', tags: ['Vietnamese', 'Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
];

export const VIETNAMESE_NON_VEG_ITEMS: FoodItem[] = [
  { id: 'v-nveg-1', name: 'Chicken Phở', desc: 'The classic Vietnamese noodle soup made with a fragrant chicken broth, flat rice noodles, and tender poached chicken.', tags: ['Vietnamese', 'Non-Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  { id: 'v-nveg-2', name: 'Bún Chả', desc: 'Grilled pork patties and slices of pork belly served in a light dipping sauce with rice vermicelli and fresh herbs. A Hanoi specialty.', tags: ['Vietnamese', 'Non-Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  { id: 'v-nveg-3', name: 'Mì Quảng Gà', desc: 'Turmeric-infused noodles from Central Vietnam, served with braised chicken, fresh herbs, peanuts, and toasted sesame rice crackers.', tags: ['Vietnamese', 'Non-Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  { id: 'v-nveg-4', name: 'Cơm Gà Hội An', desc: 'Hoi An style chicken rice, cooked in chicken broth and turmeric, served with shredded chicken and a tangy papaya salad.', tags: ['Vietnamese', 'Non-Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  { id: 'v-nveg-5', name: 'Bánh Mì Gà', desc: 'A crusty Vietnamese baguette filled with savory shredded chicken, pâté, mayonnaise, and crisp pickled vegetables.', tags: ['Vietnamese', 'Non-Vegetarian'], img: '/food/image_2.jpg' },
  { id: 'v-nveg-6', name: 'Cao Lầu', desc: 'A regional noodle dish from Hoi An featuring thick rice noodles, sliced roast pork, fresh greens, and crispy croutons.', tags: ['Vietnamese', 'Non-Vegetarian'], img: '/food/image_7.jpg' },
  { id: 'v-nveg-7', name: 'Grilled Pork Vermicelli', desc: 'Bún thịt nướng: Cold rice vermicelli noodles topped with lemongrass-marinated grilled pork, fresh herbs, and a nuoc cham dressing.', tags: ['Vietnamese', 'Non-Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  { id: 'v-nveg-8', name: 'Pork Spring Rolls', desc: 'Crispy fried spring rolls filled with minced pork, glass noodles, and wood ear mushrooms.', tags: ['Vietnamese', 'Non-Vegetarian'], img: '/food/image_1.jpg' },
  { id: 'v-nveg-9', name: 'Chicken Clay Pot', desc: 'Chicken pieces caramelized in a traditional clay pot with ginger, garlic, and savory fish sauce.', tags: ['Vietnamese', 'Non-Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  { id: 'v-nveg-10', name: 'Seafood Hotpot', desc: 'Lẩu hải sản: A vibrant, sour, and spicy hotpot filled with fresh local seafood, tomatoes, and pineapple.', tags: ['Vietnamese', 'Non-Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
];

export const INDIAN_VEG_ITEMS: FoodItem[] = [
  { id: 'i-veg-1', name: 'Paneer Butter Masala', desc: 'Cottage cheese cubes cooked in a rich, creamy, and mildly sweet tomato gravy.', tags: ['Indian', 'Vegetarian'], img: '/food/image_3.jpg' },
  { id: 'i-veg-2', name: 'Dal Tadka', desc: 'Yellow lentils cooked and tempered with ghee, cumin seeds, garlic, and whole red chilies.', tags: ['Indian', 'Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  { id: 'i-veg-3', name: 'Chole Bhature', desc: 'A classic North Indian dish featuring spicy chickpea curry served with fluffy, deep-fried leavened bread.', tags: ['Indian', 'Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  { id: 'i-veg-4', name: 'Palak Paneer', desc: 'Soft paneer cubes simmered in a smooth, vibrant green spinach puree spiced with garam masala.', tags: ['Indian', 'Vegetarian'], img: '/food/image_6.jpg' },
  { id: 'i-veg-5', name: 'Veg Biryani', desc: 'Fragrant basmati rice layered and slow-cooked with mixed vegetables, saffron, and aromatic biryani spices.', tags: ['Indian', 'Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  { id: 'i-veg-6', name: 'Aloo Gobi', desc: 'A comforting, dry curry made with potatoes (aloo), cauliflower (gobi), and Indian spices.', tags: ['Indian', 'Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  { id: 'i-veg-7', name: 'Rajma Chawal', desc: 'A wholesome meal of red kidney beans cooked in a thick, spicy onion-tomato gravy, served over steamed rice.', tags: ['Indian', 'Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  { id: 'i-veg-8', name: 'Masala Dosa', desc: 'A thin, crispy South Indian crepe made from fermented rice and lentil batter, filled with a spiced potato mixture.', tags: ['Indian', 'Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  { id: 'i-veg-9', name: 'Idli Sambar', desc: 'Steamed, savory rice cakes served with a deeply flavorful and tangy lentil and vegetable stew.', tags: ['Indian', 'Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  { id: 'i-veg-10', name: 'Malai Kofta', desc: 'Deep-fried potato and paneer dumplings served in a luxurious, creamy cashew and tomato gravy.', tags: ['Indian', 'Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
];

export const INDIAN_NON_VEG_ITEMS: FoodItem[] = [
  { id: 'i-nveg-1', name: 'Butter Chicken', desc: 'Tender chicken pieces cooked in a smooth, buttery, and creamy tomato-based gravy. A global favorite.', tags: ['Indian', 'Non-Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  { id: 'i-nveg-2', name: 'Chicken Tikka Masala', desc: 'Roasted marinated chicken chunks (tikka) served in a spiced, deeply flavorful curry sauce.', tags: ['Indian', 'Non-Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  { id: 'i-nveg-3', name: 'Chicken Biryani', desc: 'A world-renowned Indian dish of long-grained basmati rice flavored with fragrant spices and layered with marinated chicken.', tags: ['Indian', 'Non-Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  { id: 'i-nveg-4', name: 'Tandoori Chicken', desc: 'Chicken marinated in yogurt and spices, traditionally roasted in a cylindrical clay oven (tandoor).', tags: ['Indian', 'Non-Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  { id: 'i-nveg-5', name: 'Chicken Korma', desc: 'Chicken cooked in a mild, creamy sauce made with yogurt, cream, and nut pastes. Rich and aromatic.', tags: ['Indian', 'Non-Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  { id: 'i-nveg-6', name: 'Rogan Josh', desc: 'An aromatic lamb dish of Persian origin, which is one of the signature recipes of Kashmiri cuisine.', tags: ['Indian', 'Non-Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  { id: 'i-nveg-7', name: 'Fish Curry', desc: 'A homestyle Indian curry featuring tender fish simmered in a spiced tomato and onion gravy.', tags: ['Indian', 'Non-Vegetarian'], img: '/food/image_4.jpg' },
  { id: 'i-nveg-8', name: 'Chicken Chettinad', desc: 'A classic South Indian recipe from Tamil Nadu, known for its highly spicy and aromatic flavor profile.', tags: ['Indian', 'Non-Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  { id: 'i-nveg-9', name: 'Chicken Seekh Kebab', desc: 'Minced chicken mixed with aromatic spices, molded onto skewers, and grilled to perfection.', tags: ['Indian', 'Non-Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  { id: 'i-nveg-10', name: 'Goan Fish Curry', desc: 'A spicy and tangy coastal fish curry made with a rich coconut base, tamarind, and Goan spices.', tags: ['Indian', 'Non-Vegetarian'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
];

export const CAFES = [
  { name: 'Cong Caphe', desc: 'Famous for its signature coconut coffee and nostalgic, vintage Vietnamese military decor.', img: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=800&q=80', mapQuery: 'Cong Caphe Vietnam' },
  { name: 'Highlands Coffee', desc: 'The largest coffee chain in Vietnam, offering strong traditional phin filter coffee and comfortable seating.', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', mapQuery: 'Highlands Coffee Vietnam' },
  { name: 'Trung Nguyen Legend', desc: 'A premium Vietnamese coffee brand known for its specialized blends and deep, roasted flavors.', img: 'https://images.unsplash.com/photo-1555921015-5532091f6026?auto=format&fit=crop&w=800&q=80', mapQuery: 'Trung Nguyen Legend Vietnam' },
  { name: 'The Workshop', desc: 'Vietnam’s first specialty coffee roaster, located in a beautiful industrial-chic loft space in Ho Chi Minh City.', img: 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?auto=format&fit=crop&w=800&q=80', mapQuery: 'The Workshop Coffee Ho Chi Minh' },
  { name: 'Okkio Café', desc: 'A beautifully designed, modern specialty coffee shop known for its architectural aesthetics and great pour-overs.', img: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80', mapQuery: 'Okkio Caffe Ho Chi Minh' },
  { name: 'Bosgaurus Coffee', desc: 'A bright, minimalist riverside cafe focusing on high-end Arabica beans and scientific brewing methods.', img: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80', mapQuery: 'Bosgaurus Coffee Ho Chi Minh' },
  { name: 'La Viet Coffee', desc: 'Originating from Da Lat, this cafe focuses on locally grown Vietnamese Arabica with a farm-to-cup philosophy.', img: 'https://images.unsplash.com/photo-1555921015-5532091f6026?auto=format&fit=crop&w=800&q=80', mapQuery: 'La Viet Coffee Vietnam' },
  { name: 'Every Half Coffee Roasters', desc: 'A trendy spot in Ho Chi Minh City offering excellent roasted beans and experimental coffee beverages.', img: 'https://images.unsplash.com/photo-1498603536246-15572faa67a6?auto=format&fit=crop&w=800&q=80', mapQuery: 'Every Half Coffee Roasters Ho Chi Minh' },
  { name: '43 Factory Coffee Roaster', desc: 'An ultra-modern, high-end specialty coffee roaster in Da Nang with a stunning glass exterior and koi pond.', img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80', mapQuery: '43 Factory Coffee Roaster' },
  { name: 'L’Usine', desc: 'A lifestyle cafe and boutique blending French colonial architecture with contemporary Vietnamese energy.', img: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=800&q=80', mapQuery: 'L\'Usine Cafe Vietnam' },
  { name: 'Mì Quảng Cô Viên', desc: 'A famous Central Vietnamese food spot known for its incredibly authentic Mì Quảng.', img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80', mapQuery: 'Mì Quảng Cô Viên' }
];
