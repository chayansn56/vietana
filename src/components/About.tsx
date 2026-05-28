import React from 'react';
import SectionHeader from './ui/SectionHeader';

const GALLERY = [
  { img: 'https://images.unsplash.com/photo-1555921015-5532091f6026?w=800&q=80', t: 'Indian family in Hoi An' },
  { img: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80', t: 'Exploring Ha Long Bay' },
  { img: 'https://images.unsplash.com/photo-1504457047772-27faf1c005b7?w=800&q=80', t: 'Sunrise in Mu Cang Chai' },
  { img: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&q=80', t: 'Coffee culture in HCMC' },
  { img: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=800&q=80', t: 'Rice fields of Sapa' }
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-[var(--cr)] overflow-hidden">
      <div className="px-[6%]">
        <SectionHeader 
          label="The VIETANA Story"
          title="Created for Indian Travelers by Locals who Care"
        />
      </div>

      <div className="my-16 w-full relative r">
        <div className="flex gap-8 animate-[slide_40s_linear_infinite] w-fit">
          {[...GALLERY, ...GALLERY].map((item, i) => (
            <div key={i} className="group w-[280px] h-[380px] md:w-[350px] md:h-[450px] rounded-[var(--r)] overflow-hidden relative flex-shrink-0">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-[var(--e2)] group-hover:scale-110" 
                style={{ backgroundImage: `url(${item.img})` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                <span className="text-white font-medium text-[0.95rem]">{item.t}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-[6%] max-w-6xl mx-auto r">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div>
            <h3 className="text-2xl font-serif text-[var(--g)] mb-4">Our Mission</h3>
            <p className="text-[var(--ts)] leading-relaxed font-light">
              To make Vietnam the most accessible and loved destination for Indian travelers, bridge cultures, and create lifelong memories.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-serif text-[var(--g)] mb-4">Local Expertise</h3>
            <p className="text-[var(--ts)] leading-relaxed font-light">
              Based in Ho Chi Minh City, our team understands both Indian preferences and Vietnamese culture perfectly.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default About;
