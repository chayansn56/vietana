import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { WHATSAPP_INDIA } from '../utils/whatsapp';
import { FoodItem } from '../types';
import { VEG_ITEMS, NON_VEG_ITEMS, CAFES } from '../data/food';
import { WhatsAppService } from '../services/whatsappService';
import SectionHeader from './ui/SectionHeader';
import Button from './ui/Button';
import Modal from './ui/Modal';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import Card from './ui/Card';
import { Heading, Text } from './ui/Typography';
import Badge from './ui/Badge';

const Food: React.FC = () => {
  const { t } = useTranslation();
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [foodPref, setFoodPref] = useState('');

  const openFoodModal = (item: FoodItem) => setSelectedFood(item);
  const closeFoodModal = () => setSelectedFood(null);

  const PREF_OPTIONS = [
    { label: '🥦 Pure Veg', value: 'I need pure veg options.' },
    { label: '🧄 No Garlic/Onion', value: 'No garlic or onion please.' },
    { label: '🌶️ Non-Spicy', value: 'I prefer non-spicy food.' },
    { label: '🍤 No Seafood', value: 'No seafood or fish sauce.' },
    { label: '🥩 Halal', value: 'I prefer Halal meat.' },
  ];

  const addPref = (val: string) => {
    setFoodPref(prev => prev.includes(val) ? prev : prev ? `${prev} ${val}` : val);
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
                      <span className="text-brand-gold text-lg">⭐</span> {item.name}
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
                      <span className="text-brand-gold text-lg">⭐</span> {item.name}
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
            <Card variant="white" padding="md" className="w-full max-w-md bg-white/90">
              <Text variant="primary" weight="bold" className="mb-4">
                Share your food preferences
              </Text>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {PREF_OPTIONS.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => addPref(opt.value)}
                    className="px-3 py-1.5 rounded-full border border-brand-green/10 bg-brand-green/5 text-brand-green text-xs font-medium hover:bg-brand-gold/10 hover:border-brand-gold hover:text-brand-gold-dark transition-all cursor-pointer"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <textarea 
                value={foodPref} 
                onChange={(e) => setFoodPref(e.target.value)}
                placeholder="E.g., I need pure veg options, no garlic/onion..." 
                className="w-full h-32 p-4 border border-gray-100 rounded-xl mb-6 font-inherit text-sm resize-none bg-gray-50 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
              />
              <Button 
                className="w-full bg-brand-whatsapp text-white hover:bg-brand-whatsapp/90 border-none shadow-whatsapp hover:shadow-whatsapp-hover"
                onClick={() => window.open(WhatsAppService.generateFoodPreferencesMessage(foodPref), '_blank')}
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
        maxWidth="max-w-xl"
        className="overflow-hidden"
        variant="light"
      >
        {selectedFood && (
          <div className="flex flex-col">
            <div className="relative h-80 w-full overflow-hidden">
              <img 
                src={selectedFood.img} 
                alt={selectedFood.name} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-8 right-8 text-white">
                <Heading as="h3" size="xl" font="serif" variant="none" className="mb-2 drop-shadow-md">
                  {selectedFood.name}
                </Heading>
                <div className="flex flex-wrap gap-2">
                  {selectedFood.tags?.map((tag: string, i: number) => (
                    <Badge key={i} variant="gold" className="!bg-brand-gold/20 !border-brand-gold/40 !text-white text-[10px] py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-10 bg-surface-cream/50">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-brand-green/5">
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-xl">
                  🥣
                </div>
                <div>
                  <Text size="xs" variant="muted" weight="bold" className="uppercase tracking-widest mb-1">
                    Authentic Recipe
                  </Text>
                  <Text size="sm" weight="medium" className="text-brand-green-dark">
                    Local Specialty
                  </Text>
                </div>
              </div>
              <Text variant="primary" size="lg" className="leading-relaxed text-text-dark/90">
                {selectedFood.desc}
              </Text>
              
              <div className="mt-10 flex gap-4">
                <Button 
                  className="flex-1"
                  onClick={() => window.open(WhatsAppService.generateFoodInterestMessage(selectedFood.name), '_blank')}
                >
                  Plan with this Dish
                </Button>
                <Button 
                  variant="outline"
                  onClick={closeFoodModal}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </Section>
  );
};

export default Food;

