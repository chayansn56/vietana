import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExperienceProduct } from '../data/experiencesData';
import Icon from './ui/Icon';
import { Heading, Text } from './ui/Typography';

interface ExperienceDetailsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  experience: ExperienceProduct | null;
  onBuildTrip: (experience: ExperienceProduct) => void;
}

const ExperienceDetailsPopup: React.FC<ExperienceDetailsPopupProps> = ({
  isOpen,
  onClose,
  experience,
  onBuildTrip
}) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!experience) return null;

  const isFree = experience.pricing.displayPrice.toUpperCase().includes('FREE') || experience.isFree;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[9999] bg-[#FAF8F3]/98 backdrop-blur-md"
          />

          {/* Full Screen Article Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[99999] overflow-y-auto flex flex-col items-center"
          >
            {/* Top Minimal Action Header */}
            <div className="w-full max-w-4xl px-6 py-4 flex items-center justify-between z-20 sticky top-0 bg-[#FAF8F3]/90 backdrop-blur-md border-b border-[#E6D9BF]/10">
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#B8860B] uppercase font-mono">
                {experience.destination} // EXPLORE VIETNAM
              </span>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-[#12302B] hover:bg-[#1E4D45] text-white shadow-md flex items-center justify-center transition-all cursor-pointer border-none"
                title="Close Portal"
              >
                <Icon name="X" size={16} />
              </button>
            </div>

            {/* Immersive Article Content Container */}
            <div className="w-full max-w-4xl px-6 pb-32 flex flex-col gap-10 mt-4 text-left">
              {/* Wide Header Photo Cover */}
              <div className="relative h-[250px] md:h-[400px] rounded-3xl overflow-hidden shadow-sm">
                <img 
                  src={experience.images.hero} 
                  alt={experience.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col items-start gap-1">
                  <span className="bg-[#B8860B] text-white text-[8px] font-bold tracking-[0.25em] uppercase px-3 py-1 rounded shadow-sm inline-block">
                    {experience.category}
                  </span>
                  <Heading as="h1" size="3xl" font="serif" className="text-white leading-tight font-extrabold drop-shadow-md">
                    {experience.title}
                  </Heading>
                </div>
              </div>

              {/* Multi-Column Article Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                
                {/* Left Side: Article Details & Description */}
                <div className="lg:col-span-2 flex flex-col gap-8">
                  {/* Overview */}
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#12302B] mb-3">Attraction Overview</h3>
                    <Text size="sm" className="text-gray-600 leading-relaxed font-light text-justify">
                      {experience.longDesc}
                    </Text>
                  </div>

                  {/* Photo Gallery */}
                  {experience.images.gallery && experience.images.gallery.length > 0 && (
                    <div>
                      <h3 className="font-serif font-bold text-sm text-[#12302B] mb-3">Photo Gallery</h3>
                      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                        {experience.images.gallery.map((img, i) => (
                          <img 
                            key={i} 
                            src={img} 
                            alt={`${experience.title} ${i + 1}`} 
                            className="w-48 h-32 object-cover rounded-xl shrink-0 border border-gray-100 shadow-xs"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* What to Expect */}
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#12302B] mb-3">Why Visit {experience.title}?</h3>
                    <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                      {experience.whyVisit.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-600 font-light">
                          <Icon name="CheckCircle" size={13} className="text-green-700 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Highlights / Inclusions & Exclusions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border border-[#E6D9BF]/40 p-6 md:p-8 rounded-2xl shadow-xs">
                    <div>
                      <h4 className="font-bold text-xs tracking-wider uppercase text-[#12302B] mb-3 flex items-center gap-1.5 font-mono">
                        <Icon name="CheckCircle" size={13} className="text-green-700" /> Highlights Included
                      </h4>
                      <ul className="list-none p-0 m-0 flex flex-col gap-2 text-xs text-gray-500 font-light">
                        {experience.highlights.map((h, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-green-700" /> {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-xs tracking-wider uppercase text-[#12302B] mb-3 flex items-center gap-1.5 font-mono">
                        <Icon name="XCircle" size={13} className="text-red-700" /> Excluded Services
                      </h4>
                      <ul className="list-none p-0 m-0 flex flex-col gap-2 text-xs text-gray-500 font-light">
                        <li>Personal transport expenses</li>
                        <li>Gratuities & meals</li>
                        <li>Tour guide unless pre-booked</li>
                      </ul>
                    </div>
                  </div>

                  {/* Suitability Checks */}
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#12302B] mb-3">Suitability & Accessibility</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { label: 'Family Friendly', val: experience.ratings.familyScore > 85, icon: 'Users' },
                        { label: 'Senior Friendly', val: experience.seniorFriendly, icon: 'Sparkles' },
                        { label: 'Wheelchair Acc.', val: experience.wheelchairAccessible, icon: 'MapPin' },
                        { label: 'Stroller Friendly', val: experience.strollerFriendly, icon: 'CheckCircle' }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-white border border-gray-100 p-3 rounded-xl flex flex-col items-center text-center shadow-xs">
                          <Icon name={item.icon as any} className={`w-5 h-5 mb-1.5 ${item.val ? 'text-green-700' : 'text-gray-300'}`} />
                          <span className="text-[9px] font-bold tracking-wider text-gray-700 uppercase">{item.label}</span>
                          <span className="text-[8px] text-gray-400 mt-0.5">{item.val ? 'Verified Suitable' : 'Not Recommend'}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Nearby Attractions Neighborhood Guide */}
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#12302B] mb-3">Adjacent Neighborhood Guide</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FAF8F3] border border-[#E6D9BF]/25 p-5 rounded-2xl">
                      <div>
                        <span className="text-[9px] text-[#B8860B] font-bold uppercase tracking-widest font-mono block mb-2">🍽️ Dine & Café Spots</span>
                        <ul className="list-none p-0 m-0 flex flex-col gap-2 text-xs text-gray-500 font-light">
                          {experience.nearby.restaurants.map((r, i) => (
                            <li key={i} className="flex justify-between">
                              <span>{r.name}</span>
                              <span className="text-gray-400 text-[10px] font-mono">{r.distance} ({r.time})</span>
                            </li>
                          ))}
                          {experience.nearby.cafes.map((c, i) => (
                            <li key={i} className="flex justify-between">
                              <span>{c.name}</span>
                              <span className="text-gray-400 text-[10px] font-mono">{c.distance} ({c.time})</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-[9px] text-[#B8860B] font-bold uppercase tracking-widest font-mono block mb-2">🏨 Stays & Landmarks</span>
                        <ul className="list-none p-0 m-0 flex flex-col gap-2 text-xs text-gray-500 font-light">
                          {experience.nearby.hotels.map((h, i) => (
                            <li key={i} className="flex justify-between">
                              <span>{h.name}</span>
                              <span className="text-gray-400 text-[10px] font-mono">{h.distance} ({h.time})</span>
                            </li>
                          ))}
                          {experience.nearby.attractions.map((a, i) => (
                            <li key={i} className="flex justify-between">
                              <span>{a.name}</span>
                              <span className="text-gray-400 text-[10px] font-mono">{a.distance} ({a.time})</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Quick Fact Index Panel */}
                <div className="bg-white border border-[#E8E4D9] p-6 rounded-2xl shadow-sm flex flex-col gap-6 sticky top-20">
                  {/* Pricing Validity Block */}
                  <div className="bg-green-50/50 border border-green-100 p-4 rounded-xl">
                    <span className="text-[8px] font-bold tracking-widest text-green-700 uppercase font-mono block mb-1">Current Ticket Rate</span>
                    <h4 className="font-bold text-lg text-[#12302B] leading-none mb-1">
                      {isFree ? 'FREE TO VISIT' : experience.pricing.displayPrice}
                    </h4>
                    <span className="text-[8px] text-gray-400 font-light block">
                      Last Verified: July 2026. Rate is subject to date fluctuations.
                    </span>
                  </div>

                  {/* Fact Grid */}
                  <div>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest block mb-2.5 font-mono">Visitor Curation</span>
                    <div className="flex flex-col gap-2.5">
                      <div className="flex justify-between items-center text-xs border-b border-gray-100 pb-2">
                        <span className="text-gray-500 font-light">Hours</span>
                        <span className="font-semibold text-gray-800">{experience.visitorInfo.openingHours} - {experience.visitorInfo.closingHours}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs border-b border-gray-100 pb-2">
                        <span className="text-gray-500 font-light">Duration</span>
                        <span className="font-semibold text-gray-800">{experience.visitorInfo.recommendedDuration}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs border-b border-gray-100 pb-2">
                        <span className="text-gray-500 font-light">Best Month</span>
                        <span className="font-semibold text-gray-800">{experience.visitorInfo.bestMonth}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs border-b border-gray-100 pb-2">
                        <span className="text-gray-500 font-light">Difficulty</span>
                        <span className="font-semibold text-gray-800">{experience.difficulty}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs pb-1">
                        <span className="text-gray-500 font-light">Best Hours</span>
                        <span className="font-semibold text-gray-800">{experience.visitorInfo.bestTimeOfDay}</span>
                      </div>
                    </div>
                  </div>

                  {/* Transit Box */}
                  <div className="border-t border-gray-100 pt-4">
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest block mb-2 font-mono">Access & Address</span>
                    <p className="text-[10px] text-gray-500 leading-relaxed font-light mb-3">
                      📍 {experience.location.address}
                    </p>
                    <div className="bg-[#FAF8F3] p-3 rounded-lg border border-[#E6D9BF]/20">
                      <span className="text-[8px] font-bold uppercase tracking-widest text-[#B8860B] block mb-1">How to Reach</span>
                      <p className="text-[9px] text-gray-500 font-light leading-relaxed">
                        {experience.transport.howToReach}
                      </p>
                    </div>
                  </div>

                  {/* VIETANA Pro Tips */}
                  {experience.tips && experience.tips.length > 0 && (
                    <div className="border-t border-gray-100 pt-4">
                      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest block mb-2 font-mono">VIETANA Pro Tips</span>
                      <ul className="list-none p-0 m-0 flex flex-col gap-2">
                        {experience.tips.slice(0, 2).map((t, idx) => (
                          <li key={idx} className="text-[10px] text-gray-500 leading-relaxed flex items-start gap-1">
                            <span className="text-[#B8860B] font-bold">•</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Bottom Actions Sticky Panel */}
            <div className="w-full bg-[#FAF8F3] border-t border-[#E6D9BF]/40 py-4 px-6 flex justify-center sticky bottom-0 z-20">
              <div className="w-full max-w-4xl flex gap-4">
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('open_whatsapp', { detail: { message: `Hello VIETANA! I'm interested in the ${experience.title} experience. Can you tell me more?` } }))}
                  className="flex-1 py-3.5 px-6 bg-[#12302B] hover:bg-[#1E4D45] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition duration-300 flex items-center justify-center gap-2 cursor-pointer border-none shadow-md"
                >
                  <Icon name="MessageCircle" size={13} /> Ask VIETANA on WhatsApp
                </button>
                <button 
                  onClick={() => onBuildTrip(experience)}
                  className="flex-1 py-3.5 px-6 bg-white hover:bg-gray-50 text-[#12302B] border border-[#12302B] text-xs font-bold uppercase tracking-widest rounded-xl transition duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Icon name="Heart" size={13} className="text-[#12302B]" /> Add to My Trip
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExperienceDetailsPopup;
