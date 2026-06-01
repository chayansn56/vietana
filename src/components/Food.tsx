import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { FoodItem } from '../types';
import { VIETNAMESE_VEG_ITEMS, VIETNAMESE_NON_VEG_ITEMS, INDIAN_VEG_ITEMS, INDIAN_NON_VEG_ITEMS, CAFES } from '../data/food';
import { MessagingService } from '../services/messagingService';
import SectionHeader from './ui/SectionHeader';
import Button from './ui/Button';
import Modal from './ui/Modal';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import Card from './ui/Card';
import { Heading, Text } from './ui/Typography';
import Badge from './ui/Badge';
import Icon from './ui/Icon';
import BrandName from './ui/BrandName';

// Accordion Component for Food Categories
const FoodAccordion: React.FC<{
  title: string;
  icon: string;
  items: FoodItem[];
  colorTheme?: 'green' | 'blue' | 'gold' | 'rose';
  onSelectFood: (item: FoodItem) => void;
  setHoveredImage: (img: string | null) => void;
}> = ({ title, icon, items, colorTheme = 'green', onSelectFood, setHoveredImage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const themeConfig = {
    green: { bg: 'bg-brand-green/10', text: 'text-brand-green', border: 'border-brand-green/20', hoverFrom: 'hover:from-brand-green/5', activeBg: 'bg-brand-green' },
    blue: { bg: 'bg-brand-blue/10', text: 'text-brand-blue', border: 'border-brand-blue/20', hoverFrom: 'hover:from-brand-blue/5', activeBg: 'bg-brand-blue' },
    gold: { bg: 'bg-brand-gold/10', text: 'text-brand-gold', border: 'border-brand-gold/20', hoverFrom: 'hover:from-brand-gold/5', activeBg: 'bg-brand-gold' },
    rose: { bg: 'bg-rose-500/10', text: 'text-rose-500', border: 'border-rose-500/20', hoverFrom: 'hover:from-rose-500/5', activeBg: 'bg-rose-500' },
  }[colorTheme];

  return (
    <div className={`mb-3 bg-white/60  rounded-2xl border ${themeConfig.border} shadow-sm overflow-hidden transition-all duration-500`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-4 lg:p-5 bg-gradient-to-r ${themeConfig.hoverFrom} hover:to-transparent transition-colors group`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${themeConfig.bg} flex items-center justify-center ${themeConfig.text} group-hover:scale-110 group-hover:${themeConfig.activeBg} group-hover:text-white transition-all duration-300`}>
            <Icon name={icon as any} size={20} />
          </div>
          <Heading as="h4" size="sm" className="font-serif text-brand-green-dark m-0 text-left font-medium">
            {title}
          </Heading>
        </div>
        <div className={`w-8 h-8 rounded-full border ${themeConfig.border} flex items-center justify-center ${themeConfig.text} transition-all duration-500 ${isOpen ? `rotate-180 ${themeConfig.activeBg} text-white` : ''}`}>
          <Icon name="ChevronDown" size={16} />
        </div>
      </button>

      <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          {items.map((item, idx) => (
            <div 
              key={idx}
              className={`flex items-center justify-between p-3 lg:p-4 hover:bg-black/5 border-t border-black/5 cursor-pointer group transition-colors relative`}
              onClick={() => onSelectFood(item)}
              onMouseEnter={() => setHoveredImage(item.img)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <div className="flex-1 pr-6">
                <div className="flex items-center gap-2 mb-1">
                  <Text size="xs" variant="muted" weight="semibold" className={`w-5 ${themeConfig.text} text-[10px]`}>{idx + 1}.</Text>
                  <Heading as="h6" size="xs" className={`font-serif text-brand-green-dark group-hover:${themeConfig.text} transition-colors m-0 relative`}>
                    {item.name}
                    
                    {/* Hover Image Reveal */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-[110%] w-[100px] h-[100px] pointer-events-none z-50 hidden sm:block opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 shadow-xl rounded-full border-4 border-white overflow-hidden">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                  </Heading>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-brand-blue/60 group-hover:text-brand-blue transition-colors">
                <Text size="xs" variant="accent" weight="semibold" className="uppercase tracking-widest text-[10px]">
                  View
                </Text>
                <Icon name="ArrowRight" size={12} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


const Food: React.FC = () => {
  const { t } = useTranslation();
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [selectedCafe, setSelectedCafe] = useState<typeof CAFES[0] | null>(null);
  const [foodPref, setFoodPref] = useState('');
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const INDIAN_WHATSAPP = '+919953294543';

  const sendPreferences = () => {
    const text = encodeURIComponent(`Hi VIETANA! Here are my food preferences for my upcoming trip:\n\n${foodPref}`);
    window.open(`https://wa.me/${INDIAN_WHATSAPP}?text=${text}`, '_blank');
  };

  return (
    <Section id="food" className="bg-surface-cream relative overflow-hidden py-24">
      {/* Colorful Background Blobs */}
      <div className="hidden absolute top-0 left-0 w-[500px] h-[500px] bg-brand-gold/10 rounded-full  -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="hidden absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-green/10 rounded-full  translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div className="hidden absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-brand-blue/5 rounded-full  -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* Decorative Food Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1e3b29 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <Container className="relative z-10">
        <div className="text-center mb-16 reveal flex flex-col items-center">
          <Heading as="h2" size="3xl" font="serif" className="text-brand-green-dark mb-2">
            🍛 Food
          </Heading>
          <Text size="md" variant="accent" weight="medium" className="uppercase tracking-[0.2em] text-brand-gold mb-6">
            Indian & Vietnamese
          </Text>
          <Text size="lg" variant="muted" className="max-w-2xl text-text-dark/80 font-light">
            Explore Vietnam through food — from Indian comfort dishes to authentic Vietnamese flavours.
          </Text>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">
          
          {/* LEFT SIDE: Food Guide & Cafes */}
          <div className="flex-1 min-w-0 w-full reveal">
            
            {/* Food Accordions */}
            <div className="mb-16 relative">
              {/* Indian Food Section */}
              <div className="mb-8">
                <Heading as="h3" size="sm" className="font-serif mb-4 border-b border-black/5 pb-2 uppercase tracking-wide bg-gradient-to-r from-brand-gold to-brand-green text-transparent bg-clip-text">
                  INDIAN FOOD
                </Heading>
                <FoodAccordion 
                  title="Indian Vegetarian" 
                  icon="LeafyGreen" 
                  items={INDIAN_VEG_ITEMS} 
                  colorTheme="green"
                  onSelectFood={setSelectedFood} 
                  setHoveredImage={setHoveredImage} 
                />
                <FoodAccordion 
                  title="Indian Non-Vegetarian (No Beef)" 
                  icon="UtensilsCrossed" 
                  items={INDIAN_NON_VEG_ITEMS} 
                  colorTheme="gold"
                  onSelectFood={setSelectedFood} 
                  setHoveredImage={setHoveredImage} 
                />
              </div>

              {/* Vietnamese Food Section */}
              <div>
                <Heading as="h3" size="sm" className="font-serif mb-4 border-b border-black/5 pb-2 uppercase tracking-wide bg-gradient-to-r from-brand-blue to-brand-green text-transparent bg-clip-text">
                  VIETNAMESE FOOD
                </Heading>
                <FoodAccordion 
                  title="Vietnamese Vegetarian" 
                  icon="Leaf" 
                  items={VIETNAMESE_VEG_ITEMS} 
                  colorTheme="green"
                  onSelectFood={setSelectedFood} 
                  setHoveredImage={setHoveredImage} 
                />
                <FoodAccordion 
                  title="Vietnamese Non-Vegetarian (No Beef)" 
                  icon="Drumstick" 
                  items={VIETNAMESE_NON_VEG_ITEMS} 
                  colorTheme="blue"
                  onSelectFood={setSelectedFood} 
                  setHoveredImage={setHoveredImage} 
                />
              </div>
            </div>

            {/* Famous Cafes */}
            <div className="bg-gradient-to-br from-brand-gold/20 via-rose-400/10 to-brand-blue/20 p-6 rounded-3xl border border-white/50 shadow-sm reveal">
              <div className="flex items-center justify-between mb-4 border-b border-black/5 pb-3">
                <Heading as="h3" size="md" className="font-serif text-brand-green-dark m-0">
                  FAMOUS CAFÉS
                </Heading>
                <Text size="xs" variant="accent" className="text-brand-green/60 uppercase tracking-widest hidden sm:block">Scroll &rarr;</Text>
              </div>
              
              <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-2 px-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style>{`
                  div::-webkit-scrollbar { display: none; }
                `}</style>
                {CAFES.map((cafe, i) => (
                  <button 
                    key={i} 
                    onClick={() => setSelectedCafe(cafe)}
                    className="group relative h-28 w-48 shrink-0 snap-center rounded-2xl overflow-hidden border-2 border-white/60 hover:border-white transition-all shadow-sm hover:shadow-lg hover:-translate-y-1 bg-brand-green-dark"
                  >
                    <img src={cafe.img} alt={cafe.name} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 text-left pointer-events-none">
                      <Text variant="white" size="xs" weight="bold" className="leading-tight text-white drop-shadow-md">
                        {cafe.name}
                      </Text>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: Brands & Preferences */}
          <div className="w-full lg:w-[320px] xl:w-[380px] shrink-0 space-y-6">
            
            {/* Restaurant Cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* The Spicy Spoon Card */}
              <Card variant="white" padding="md" className="flex flex-col items-center justify-center text-center shadow-medium border-brand-gold/10 relative overflow-hidden group h-[160px]">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <img src="/spicy_spoon_new.png" alt="The Spicy Spoon" className="mix-blend-multiply transition-transform duration-500 group-hover:scale-105 h-[60px] object-contain mb-3" />
                <Text size="xs" variant="accent" className="uppercase tracking-widest text-brand-gold font-semibold relative z-10 text-[9px]">
                  coming soon
                </Text>
              </Card>

              {/* Mi Quang Co Vien Card */}
              <Card variant="white" padding="md" className="flex flex-col items-center justify-center text-center shadow-medium border-brand-green/10 relative overflow-hidden group h-[160px] cursor-pointer" onClick={() => window.open("https://www.google.com/maps/search/Mì+Quảng+Cô+Viên", "_blank")}>
                <div className="absolute inset-0 bg-gradient-to-br from-brand-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <img src="/mi_quang_new.png" alt="Mì Quảng Cô Viên" className="mb-3 mix-blend-multiply transition-transform duration-500 group-hover:scale-105 h-[60px] object-contain" />
                <Text size="xs" variant="accent" className="uppercase tracking-widest text-brand-green-dark font-semibold relative z-10 text-[9px]">
                  VIEW ON MAPS
                </Text>
              </Card>
            </div>

            {/* Food Preferences */}
            <Card variant="white" padding="md" className="shadow-medium border-brand-blue/10 bg-white/60 ">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="MessageSquare" size={16} className="text-brand-blue" />
                <Heading as="h4" size="sm" className="font-serif text-brand-green-dark m-0">
                  Share Your Food Preferences
                </Heading>
              </div>
              
              <textarea 
                value={foodPref} 
                onChange={(e) => setFoodPref(e.target.value)}
                placeholder="Vegetarian?&#10;Jain?&#10;Halal?&#10;Food allergies?&#10;Need Indian food daily?&#10;Want local food recommendations?&#10;&#10;Tell us anything." 
                className="w-full h-48 p-4 border border-black/10 rounded-xl mb-6 font-inherit text-sm resize-none bg-white/50 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all placeholder:text-black/30 shadow-inner"
              />
              
              <Button 
                className="w-full bg-brand-whatsapp text-white hover:bg-brand-whatsapp/90 border-none shadow-whatsapp hover:shadow-whatsapp-hover"
                onClick={sendPreferences}
                icon={<Icon name="MessageCircle" size={18} />}
              >
                Send to WhatsApp India
              </Button>
            </Card>

          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-24 text-center border-t border-black/5 pt-16 max-w-3xl mx-auto reveal">
          <Heading as="h3" size="lg" weight="medium" className="text-brand-green-dark leading-relaxed mb-4">
            We own, partner and work closely with restaurants across Vietnam — so you'll never have to worry about where to eat.
          </Heading>
          <Text variant="subtle" size="sm" weight="bold" className="uppercase tracking-widest text-brand-gold">
            Travel Gets Better with <BrandName />
          </Text>
        </div>
      </Container>

      {/* DISH MODAL */}
      <Modal 
        isOpen={!!selectedFood} 
        onClose={() => setSelectedFood(null)}
        maxWidth="max-w-xl"
        className="overflow-hidden"
        variant="light"
      >
        {selectedFood && (
          <div className="flex flex-col bg-white">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <img 
                src={selectedFood.img} 
                alt={selectedFood.name} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-6 left-8 right-8">
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedFood.tags?.map((tag: string, i: number) => (
                    <Badge key={i} variant="gold" className="!bg-white/20  !border-white/30 !text-white text-[10px] py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Heading as="h3" size="xl" font="serif" variant="white" className="drop-shadow-md m-0 leading-tight">
                  {selectedFood.name}
                </Heading>
              </div>
            </div>
            <div className="p-8 sm:p-10">
              <div className="mb-8">
                <Text size="xs" variant="accent" weight="bold" className="uppercase tracking-widest text-brand-blue mb-2">
                  Ingredients / Description
                </Text>
                <Text variant="primary" size="lg" className="leading-relaxed text-text-dark/90 font-light">
                  {selectedFood.desc}
                </Text>
              </div>
              
              <div className="bg-brand-green/5 border border-brand-green/10 rounded-xl p-4 mb-8 flex items-start gap-4">
                <div className="text-brand-green mt-1">
                  <Icon name="MapPin" size={20} />
                </div>
                <div>
                  <Text size="sm" weight="bold" className="text-brand-green-dark mb-1">Where to try it in Vietnam</Text>
                  <Text size="sm" variant="subtle">Available at our trusted partner restaurants and exclusive <BrandName /> curated food tours across the country.</Text>
                </div>
              </div>

              <Button 
                className="w-full"
                onClick={() => window.open(MessagingService.generateFoodInterestWhatsApp(selectedFood.name), '_blank')}
              >
                Plan a Trip with this Dish
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* CAFE MODAL */}
      <Modal 
        isOpen={!!selectedCafe} 
        onClose={() => setSelectedCafe(null)}
        maxWidth="max-w-sm"
        className="overflow-hidden rounded-3xl"
        variant="light"
      >
        {selectedCafe && (
          <div className="flex flex-col bg-white">
            <div className="relative h-48 w-full overflow-hidden">
              <img 
                src={selectedCafe.img} 
                alt={selectedCafe.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="p-8 text-center">
              <Heading as="h3" size="xl" font="serif" className="text-brand-green-dark mb-4">
                {selectedCafe.name}
              </Heading>
              <Text variant="subtle" size="sm" className="mb-8">
                {selectedCafe.desc}
              </Text>
              
              <Button 
                variant="outline" 
                className="w-full sm:w-auto px-8 mx-auto shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 border-brand-blue/30 text-brand-blue hover:bg-brand-blue/5"
                onClick={() => {
                  window.open(`https://www.google.com/maps/search/${encodeURIComponent(selectedCafe.mapQuery)}`, '_blank');
                }}
              >
                View on Google Maps
                <Icon name="MapPin" size={18} />
              </Button>
            </div>
          </div>
        )}
      </Modal>

    </Section>
  );
};

export default Food;
