import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ConciergeCategory, RestaurantDetails, DishDetails } from '../../data/foodConcierge';
import { Heading, Text } from '../ui/Typography';
import { useSpeechSynthesis } from '../../hooks/useSpeechSynthesis';
import Icon from '../ui/Icon';
import Badge from '../ui/Badge';
import BrandName from '../ui/BrandName';

interface FoodSideSheetProps {
  isOpen: boolean;
  onClose: () => void;
  category: ConciergeCategory | null;
}

export const FoodSideSheet: React.FC<FoodSideSheetProps> = ({ isOpen, onClose, category }) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const { speak, speakingId: isSpeakingId } = useSpeechSynthesis('en-US');

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openGoogleMaps = (name: string, city: string) => {
    const query = encodeURIComponent(`${name}, ${city}, Vietnam`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const speakText = (id: string, text: string) => {
    speak(id, text);
  };

  return (
    <AnimatePresence>
      {isOpen && category && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          {/* Side Sheet Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-50 w-full md:w-[75%] bg-surface-cream rounded-l-3xl shadow-2xl overflow-y-auto overscroll-contain flex flex-col"
          >
            {/* Header / Hero Image */}
            <div className="relative h-64 md:h-80 w-full shrink-0">
              <img 
                src={category.heroImage} 
                alt={category.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <button 
                onClick={onClose}
                className="absolute top-6 left-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
              >
                <Icon name="ArrowLeft" size={20} />
              </button>

              <div className="absolute bottom-8 left-8 pr-8">
                <Heading as="h2" size="4xl" font="serif" className="text-white m-0 leading-tight">
                  {category.title}
                </Heading>
                <Text size="lg" className="text-white/80 mt-2 font-light">
                  {category.subtitle}
                </Text>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8 md:p-12 flex-1">
              
              {category.collections.map((collection) => (
                <div key={collection.id} className="mb-16">
                  <Heading as="h3" size="2xl" font="serif" className="text-text-dark mb-8 border-b border-black/10 pb-4">
                    {collection.title}
                  </Heading>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {collection.items.map((item) => {
                      const isRestaurant = 'priceRange' in item;
                      
                      return (
                        <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden group hover:shadow-md transition-all">
                          <div className="relative h-48 overflow-hidden">
                            <img 
                              src={item.heroImage} 
                              alt={item.name} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {isRestaurant && (item as RestaurantDetails).isOwnedAndLoved && (
                              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                                <Icon name="Heart" size={14} className="text-rose-500 fill-rose-500" />
                                <Text size="xs" weight="bold" className="text-text-dark uppercase tracking-wider text-[10px]">
                                  Owned & Loved by <BrandName />
                                </Text>
                              </div>
                            )}
                          </div>
                          
                          <div className="p-6">
                            <div className="flex items-start justify-between mb-2">
                              <Heading as="h4" size="lg" font="serif" className="text-text-dark m-0">
                                {item.name}
                              </Heading>
                              {isRestaurant && (
                                <Text size="sm" weight="semibold" className="text-brand-green">
                                  {(item as RestaurantDetails).priceRange}
                                </Text>
                              )}
                            </div>
                            
                            {isRestaurant ? (
                              <Text size="sm" variant="subtle" className="mb-4 line-clamp-2">
                                {(item as RestaurantDetails).shortDesc}
                              </Text>
                            ) : (
                              <Text size="sm" variant="subtle" className="mb-4 line-clamp-2">
                                {(item as DishDetails).subtitle}
                              </Text>
                            )}

                            {/* Tags */}
                            {isRestaurant && (item as RestaurantDetails).tags?.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-6">
                                {(item as RestaurantDetails).tags.map((tag) => (
                                  <Badge key={tag} variant="neutral" className="!bg-surface-cream !text-text-subtle !border-transparent text-xs py-1">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}

                            {/* VIETANA Notes */}
                            <div className="bg-surface-cream p-4 rounded-xl border border-black/5 flex items-start gap-3 relative group/note w-full">
                              <div className="text-brand-gold mt-0.5">
                                <Icon name="Quote" size={18} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-4 mb-2">
                                  <Text size="xs" weight="bold" className="uppercase tracking-widest text-text-dark m-0">
                                    VIETANA Notes
                                  </Text>
                                  <button
                                    onClick={() => speakText(item.id, item.vietanaNotes)}
                                    className={`text-[#555555] hover:text-brand-gold cursor-pointer transition-colors p-1.5 rounded-lg hover:bg-black/5 flex items-center gap-1.5 shrink-0 ${
                                      isSpeakingId === item.id ? 'text-brand-gold animate-pulse bg-brand-gold/10' : ''
                                    }`}
                                    title={isSpeakingId === item.id ? "Stop audio guide" : "Listen to audio guide"}
                                  >
                                    <Icon name={isSpeakingId === item.id ? "VolumeX" : "Volume2"} size={13} />
                                    <span className="text-[10px] uppercase font-extrabold tracking-widest font-mono">Audio Guide</span>
                                  </button>
                                </div>
                                <Text size="sm" className="text-text-dark/80 leading-relaxed italic m-0">
                                  {item.vietanaNotes}
                                </Text>
                              </div>
                            </div>
                            
                            {/* Action Row */}
                            <div className="mt-6 flex items-center justify-between pt-4 border-t border-black/5 flex-wrap gap-2">
                               {isRestaurant ? (
                                 <>
                                   <button 
                                     onClick={() => handleCopy(item.id, `${item.name}, ${(item as RestaurantDetails).city}, Vietnam`)}
                                     className="flex items-center gap-1.5 text-text-subtle hover:text-brand-gold transition-colors font-medium text-sm cursor-pointer"
                                     title="Click to copy address"
                                   >
                                     <Icon name="MapPin" size={14} />
                                     <span>{copiedId === item.id ? 'Address Copied!' : (item as RestaurantDetails).city}</span>
                                   </button>
                                   <button 
                                     onClick={() => openGoogleMaps(item.name, (item as RestaurantDetails).city)}
                                     className="flex items-center gap-1.5 text-brand-blue hover:text-brand-blue-dark transition-colors font-medium text-sm cursor-pointer"
                                   >
                                     Open Maps <Icon name="ArrowRight" size={14} />
                                  </button>
                                 </>
                               ) : (
                                 <>
                                   <div className="flex items-center gap-1.5 text-text-subtle">
                                     <Icon name="Map" size={14} />
                                     <Text size="sm">{(item as DishDetails).recommendedCities.join(', ')}</Text>
                                   </div>
                                   <button 
                                     onClick={() => openGoogleMaps(item.name, (item as DishDetails).recommendedCities[0])}
                                     className="flex items-center gap-1.5 text-brand-green hover:text-brand-green-dark transition-colors font-medium text-sm cursor-pointer"
                                   >
                                     Where to Try <Icon name="ArrowRight" size={14} />
                                   </button>
                                 </>
                               )}
                             </div>
                            
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              
              {category.collections.length === 0 && (
                <div className="text-center py-20">
                  <Text size="lg" variant="subtle">More curations coming soon...</Text>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FoodSideSheet;
