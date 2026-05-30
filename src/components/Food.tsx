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

// Accordion Component for Food Categories
const FoodAccordion = ({ 
  title, 
  icon, 
  items, 
  onSelectFood, 
  setHoveredImage 
}: { 
  title: string, 
  icon: string, 
  items: FoodItem[], 
  onSelectFood: (item: FoodItem) => void,
  setHoveredImage: (img: string | null) => void 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 bg-white/40 backdrop-blur-md border border-brand-blue/10 rounded-2xl overflow-hidden shadow-sm transition-all duration-300">
      <button 
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none hover:bg-white/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
            <Icon name={icon as any} size={20} />
          </div>
          <Heading as="h4" size="lg" weight="medium" className="font-serif text-brand-green-dark m-0 tracking-wide">{title}</Heading>
        </div>
        <div className={`text-brand-green transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <Icon name="ChevronDown" size={24} />
        </div>
      </button>
      
      {/* Accordion Content - Fine Dining Minimalist Style */}
      <div 
        className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-6 pb-6 pt-2 space-y-2">
          {items.map((item, idx) => (
            <div 
              key={idx}
              className="group flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b border-black/5 cursor-pointer hover:border-brand-blue/30 transition-colors last:border-0"
              onClick={() => onSelectFood(item)}
              onMouseEnter={() => setHoveredImage(item.img)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <div className="flex-1 pr-8">
                <div className="flex items-center gap-2 mb-1">
                  <Text size="xs" variant="muted" weight="semibold" className="w-6 text-brand-gold/60">{idx + 1}.</Text>
                  <Heading as="h6" size="sm" className="font-serif text-brand-green-dark group-hover:text-brand-blue transition-colors m-0 relative">
                    {item.name}
                    
                    {/* Hover Image Reveal */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-[110%] w-[120px] h-[120px] pointer-events-none z-50 hidden sm:block opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 shadow-xl rounded-full border-4 border-white overflow-hidden">
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
    <Section id="food" variant="white" spacing="lg" className="relative overflow-hidden">
      
      {/* Bright Theme Soft Accents */}
      <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-brand-green/5 rounded-full blur-[100px] pointer-events-none z-0" />
      
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
          <div className="flex-1 w-full reveal">
            
            {/* Food Accordions */}
            <div className="mb-16 relative">
              <FoodAccordion 
                title="Vietnamese Vegetarian" 
                icon="Leaf" 
                items={VIETNAMESE_VEG_ITEMS} 
                onSelectFood={setSelectedFood} 
                setHoveredImage={setHoveredImage} 
              />
              <FoodAccordion 
                title="Vietnamese Non-Vegetarian (No Beef)" 
                icon="Drumstick" 
                items={VIETNAMESE_NON_VEG_ITEMS} 
                onSelectFood={setSelectedFood} 
                setHoveredImage={setHoveredImage} 
              />
              <FoodAccordion 
                title="Indian Vegetarian" 
                icon="LeafyGreen" 
                items={INDIAN_VEG_ITEMS} 
                onSelectFood={setSelectedFood} 
                setHoveredImage={setHoveredImage} 
              />
              <FoodAccordion 
                title="Indian Non-Vegetarian (No Beef)" 
                icon="UtensilsCrossed" 
                items={INDIAN_NON_VEG_ITEMS} 
                onSelectFood={setSelectedFood} 
                setHoveredImage={setHoveredImage} 
              />

            </div>

            {/* Famous Cafes */}
            <div className="bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-brand-blue/10 shadow-sm reveal">
              <Heading as="h3" size="md" className="font-serif text-brand-green-dark mb-4 border-b border-black/5 pb-3">
                FAMOUS CAFÉS
              </Heading>
              <div className="flex flex-wrap gap-2">
                {CAFES.map((cafe, i) => (
                  <button 
                    key={i} 
                    onClick={() => setSelectedCafe(cafe)}
                    className="bg-white hover:bg-brand-blue/5 border border-brand-blue/10 px-4 py-2 rounded-full text-brand-green-dark text-xs font-medium transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  >
                    {cafe.name}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: Brands & Preferences */}
          <div className="w-full lg:w-[320px] xl:w-[380px] shrink-0 space-y-6 reveal delay-200">
            
            {/* The Spicy Spoon Card */}
            <Card variant="white" padding="md" className="flex flex-col items-center justify-center text-center shadow-medium border-brand-gold/10 relative overflow-hidden group min-h-[180px]">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <img src="/spicy_spoon_new.png" alt="The Spicy Spoon" className="mix-blend-multiply transition-transform duration-500 group-hover:scale-105 max-h-[140px] object-contain mb-3" />
              <Text size="xs" variant="accent" className="uppercase tracking-widest text-brand-gold font-semibold relative z-10">
                coming soon
              </Text>
            </Card>

            {/* Mi Quang Co Vien Card */}
            <Card variant="white" padding="md" className="flex flex-col items-center justify-center text-center shadow-medium border-brand-green/10 relative overflow-hidden group min-h-[180px]">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <img src="/mi_quang_new.png" alt="Mì Quảng Cô Viên" className="mb-4 mix-blend-multiply transition-transform duration-500 group-hover:scale-105 max-h-[100px] object-contain" />
              <Text size="xs" variant="accent" className="uppercase tracking-widest text-brand-green-dark font-semibold relative z-10 mb-4">
                CENTRAL VIETNAMESE FOOD
              </Text>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full flex items-center justify-center gap-2 border-brand-green/30 text-brand-green hover:bg-brand-green/5 text-xs py-1.5"
                onClick={() => window.open("https://www.google.com/maps/search/Mì+Quảng+Cô+Viên", "_blank")}
              >
                View on Maps <Icon name="MapPin" size={14} />
              </Button>
            </Card>

            {/* Food Preferences */}
            <Card variant="white" padding="md" className="shadow-medium border-brand-blue/10 bg-white/60 backdrop-blur-md">
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
            Travel Gets Better with VIETANA™
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
                    <Badge key={i} variant="gold" className="!bg-white/20 backdrop-blur-md !border-white/30 !text-white text-[10px] py-1">
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
                  <Text size="sm" variant="subtle">Available at our trusted partner restaurants and exclusive VIETANA curated food tours across the country.</Text>
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
                className="w-full flex items-center justify-center gap-2 border-brand-blue/30 text-brand-blue hover:bg-brand-blue/5"
                onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(selectedCafe.mapQuery || selectedCafe.name)}`, '_blank')}
              >
                View on Maps <Icon name="MapPin" size={16} />
              </Button>
            </div>
          </div>
        )}
      </Modal>

    </Section>
  );
};

export default Food;
