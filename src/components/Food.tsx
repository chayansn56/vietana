import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { WHATSAPP_INDIA } from '../config';
import SectionHeader from './ui/SectionHeader';
import Button from './ui/Button';
import Modal from './ui/Modal';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import Card from './ui/Card';
import { Heading, Text } from './ui/Typography';
import Badge from './ui/Badge';

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
    <Section id="food" variant="warm" spacing="lg">
      <div className="absolute top-8 -right-4 font-serif text-[clamp(5rem,14vw,13rem)] font-light text-brand-green/5 tracking-wider pointer-events-none select-none z-0">
        {t.food.title}
      </div>
      
      <Container>
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          {/* LEFT SIDE: Food Lists */}
          <div className="flex-[1.2] min-w-[320px] w-full reveal">
            <SectionHeader 
              label={t.food.title}
              title={t.food.heading}
              centered={false}
              className="mb-14"
            />
            
            <div className="mb-14">
              <Heading as="h3" size="lg" variant="accent" className="mb-5 border-b border-brand-gold/20 pb-2.5">
                Vegetarian (Vietnamese & Indian)
              </Heading>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none">
                {VEG_ITEMS.map((item, i) => (
                  <li key={i} className="flex">
                    <Text 
                      as="span"
                      size="sm"
                      variant="muted"
                      weight="medium"
                      className="cursor-pointer transition-all duration-300 flex items-center gap-2 hover:text-brand-gold-muted hover:translate-x-1.5" 
                      onClick={() => openFoodModal(item)}
                    >
                      <span className="text-brand-gold text-lg">⭐</span> {item}
                    </Text>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-14">
              <Heading as="h3" size="lg" variant="accent" className="mb-5 border-b border-brand-gold/20 pb-2.5">
                Non-Vegetarian Favorites
              </Heading>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none">
                {NON_VEG_ITEMS.map((item, i) => (
                  <li key={i} className="flex">
                    <Text 
                      as="span"
                      size="sm"
                      variant="muted"
                      weight="medium"
                      className="cursor-pointer transition-all duration-300 flex items-center gap-2 hover:text-brand-gold-muted hover:translate-x-1.5" 
                      onClick={() => openFoodModal(item)}
                    >
                      <span className="text-brand-gold text-lg">⭐</span> {item}
                    </Text>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Heading as="h3" size="lg" variant="accent" className="mb-5 border-b border-brand-gold/20 pb-2.5">
                Famous Cafes
              </Heading>
              <div className="flex flex-wrap gap-3">
                {CAFES.map((cafe, i) => (
                  <div key={i} className="bg-brand-gold/8 px-5 py-2.5 rounded-full border border-brand-gold/15 flex items-center">
                    <Text size="sm" variant="muted" weight="semibold">
                      {cafe}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Brands */}
          <div className="flex-[0.8] min-w-[320px] w-full reveal delay-200">
            <Card variant="white" padding="lg" className="flex flex-col items-center justify-center gap-16">
              <div className="flex flex-col items-center text-center w-full">
                <img src="/spicy_spoon_new.png" alt="The Spicy Spoon" className="max-w-[220px] h-auto mb-6 mix-multiply" />
                <Badge variant="gold-filled">
                  Coming Soon
                </Badge>
              </div>
              <div className="flex flex-col items-center text-center w-full">
                <a href="https://www.google.com/maps/search/Mì+Quảng+Cô+Viên" target="_blank" rel="noreferrer" className="group no-underline flex flex-col items-center">
                  <img src="/mi_quang_new.png" alt="Mì Quảng Cô Viên" className="max-w-[220px] h-auto mb-6 mix-multiply" />
                  <Button variant="outline" size="sm" className="w-[160px] tracking-[0.1em]">
                    View on Map 📍
                  </Button>
                </a>
              </div>
            </Card>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-24 flex flex-col md:flex-row justify-between items-end gap-12 border-t border-black/5 pt-16 reveal">
          <Heading as="h3" size="lg" weight="semibold" className="flex-1 min-w-[300px] !text-brand-green leading-relaxed">
            We own, partner, and connect with restaurants across Vietnam.<br />
            So you never have to worry about where to eat.
          </Heading>
          
          <div className="flex-1 min-w-[300px] w-full flex justify-end">
            <Card variant="white" padding="md" className="w-full max-w-sm bg-white/90">
              <Text variant="primary" weight="bold" className="mb-4">
                Share your food preferences
              </Text>
              <textarea 
                value={foodPref} 
                onChange={(e) => setFoodPref(e.target.value)}
                placeholder="E.g., I need pure veg options, no garlic/onion..." 
                className="w-full h-24 p-4 border border-gray-100 rounded-xl mb-6 font-inherit text-sm resize-none bg-gray-50 focus:outline-none focus:border-brand-gold/30 transition-colors"
              />
              <Button 
                className="w-full bg-brand-whatsapp text-white hover:bg-brand-whatsapp/90 border-none shadow-whatsapp hover:shadow-whatsapp-hover"
                onClick={() => window.open(`${WHATSAPP_INDIA}&text=${encodeURIComponent(`Hi VIETANA, my food preferences: ${foodPref}`)}`, '_blank')}
                icon={<span>💬</span>}
              >
                Send to WhatsApp
              </Button>
            </Card>
          </div>
        </div>
      </Container>

      <Modal 
        isOpen={!!selectedFood} 
        onClose={closeFoodModal}
        maxWidth="max-w-md"
        className="p-10 text-center"
        variant="light"
      >
        {selectedFood && (
          <>
            <img src={getFoodImg(selectedFood)} alt={selectedFood} className="w-full h-72 object-cover rounded-2xl mb-8 shadow-medium" />
            <Heading as="h3" size="xl" font="serif" className="!text-brand-green mb-2.5">
              {selectedFood}
            </Heading>
            <Text variant="muted" size="md">
              A classic Vietnamese delicacy you must try.
            </Text>
          </>
        )}
      </Modal>
    </Section>
  );
};

export default Food;

