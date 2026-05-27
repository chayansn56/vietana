import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { WHATSAPP_INDIA } from '../config';
import './Food.css';

const VEG_ITEMS = [
  'Phở Chay (Veg Pho)', 'Bánh Mì Chay', 'Gỏi Cuốn Chay', 'Cơm Tấm Chay', 'Bún Chay',
  'Đậu Hũ Sốt Cà Chua', 'Nộm Hoa Chuối', 'Chè & Xôi (Desserts)', 'Rau Muống Xào Tỏi', 'North & South Indian Veg'
];

const NON_VEG_ITEMS = [
  'Phở Gà (Chicken Pho)', 'Bún Chả (Grilled Pork)', 'Bánh Xèo (Crispy Pancake)', 'Cao Lầu (Hoi An Noodles)', 'Bún Gà (Chicken Noodle Soup)',
  'Cơm Tấm Sườn Nướng', 'Bánh Mì Thịt Nướng', 'Nem Rán (Spring Rolls)', 'Chả Cá Lã Vọng', 'Gà Nướng Mật Ong'
];

const CAFES = [
  '☕ The Note Coffee', '☕ Cộng Cà Phê', '☕ Cafe Giảng (Egg Coffee)', '☕ Ru Nam Bistro', '☕ L\'Usine'
];

const Food: React.FC = () => {
  const { t } = useTranslation();
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [foodPref, setFoodPref] = useState('');

  const openFoodModal = (name: string) => setSelectedFood(name);
  const closeFoodModal = () => setSelectedFood(null);

  const getFoodImg = (name: string) => {
      let keyword = name.split('(')[0].trim().replace(/\s+/g, ',');
      return `https://image.pollinations.ai/prompt/delicious%20authentic%20Vietnamese%20food%20${keyword}?width=600&height=400&nologo=true`;
  };

  return (
    <section id="food">
      <div className="food-content-wrapper">
        
        {/* LEFT SIDE: Food Lists */}
        <div className="food-lists">
          <span className="lbl">{t.food.title}</span>
          <h2 className="food-main-title">{t.food.heading}</h2>
          
          <div className="food-category">
            <h3>Vegetarian (Vietnamese & Indian)</h3>
            <ul>
              {VEG_ITEMS.map((item, i) => (
                <li key={i} onClick={() => openFoodModal(item)}><span>⭐</span> {item}</li>
              ))}
            </ul>
          </div>
          
          <div className="food-category">
            <h3>Non-Vegetarian Favorites</h3>
            <ul>
              {NON_VEG_ITEMS.map((item, i) => (
                <li key={i} onClick={() => openFoodModal(item)}><span>⭐</span> {item}</li>
              ))}
            </ul>
          </div>

          <div className="food-category cafes">
            <h3>Famous Cafes</h3>
            <div className="cafe-tags">
              {CAFES.map((cafe, i) => (
                <div key={i} className="cafe-tag">{cafe}</div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Brands */}
        <div className="food-brands-card">
          <div className="brands-inner">
            <div className="brand-item">
              <img src="/spicy_spoon_new.png" alt="The Spicy Spoon" className="brand-img" />
              <div className="coming-soon">Coming Soon</div>
            </div>
            <div className="brand-item">
              <a href="https://www.google.com/maps/search/Mì+Quảng+Cô+Viên" target="_blank" rel="noreferrer">
                <img src="/mi_quang_new.png" alt="Mì Quảng Cô Viên" className="brand-img" />
                <div className="map-btn">View on Map 📍</div>
              </a>
            </div>
          </div>
        </div>

      </div>

      <div className="food-footer">
        <div className="ff-left">
          We own, partner, and connect with restaurants across Vietnam.<br />
          So you never have to worry about where to eat.
        </div>
        <div className="ff-right">
          <div className="food-pref-box">
            <p>Share your food preferences</p>
            <textarea 
              value={foodPref} 
              onChange={(e) => setFoodPref(e.target.value)}
              placeholder="E.g., I need pure veg options, no garlic/onion..." 
            />
            <button 
              onClick={() => window.open(`${WHATSAPP_INDIA}&text=${encodeURIComponent(`Hi VIETANA, my food preferences: ${foodPref}`)}`, '_blank')}
            >
              💬 Send to WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* FOOD MODAL */}
      {selectedFood && (
        <div className="food-modal-overlay show" onClick={(e) => e.target === e.currentTarget && closeFoodModal()}>
          <div className="food-modal">
            <button className="food-modal-close" onClick={closeFoodModal}>×</button>
            <img src={getFoodImg(selectedFood)} alt={selectedFood} className="fm-img" />
            <h3>{selectedFood}</h3>
            <p>A classic Vietnamese delicacy you must try.</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Food;
