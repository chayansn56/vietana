import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import Modal from './ui/Modal';
import { Heading, Text } from './ui/Typography';
import Icon from './ui/Icon';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CONTACT_LOCATIONS = [
  {
    id: 'india',
    name: 'New Delhi, India',
    title: 'INDIA',
    subtitle: 'NEW DELHI OFFICE',
    person: 'Vikram Sonker',
    role: 'Senior Travel Concierge',
    phone: '+91 9953294543',
    waUrl: 'https://wa.me/919953294543',
    email: 'vikram@vietana.com',
    address: 'RZ 35/36, Indra Park Ext.\nUttam Nagar, East Delhi',
    image: '/concierge_delhi.png',
    accentColor: 'text-brand-gold-light',
    btnBg: 'bg-brand-gold/90 hover:bg-brand-gold',
    btnText: 'text-brand-green-extra-dark',
  },
  {
    id: 'vietnam',
    name: 'Ho Chi Minh City, Vietnam',
    title: 'VIETNAM',
    subtitle: 'HCMC HEADQUARTERS',
    person: 'Chayan Soni',
    role: 'Lead Experience Architect',
    phone: '+84 902434006',
    waUrl: 'https://wa.me/84902434006',
    email: 'chayan@vietana.com',
    address: '45 Nguyễn Quý Đức\nAn Phú, Ho Chi Minh City',
    image: '/concierge_hcmc.png',
    accentColor: 'text-brand-blue-light',
    btnBg: 'bg-brand-blue/90 hover:bg-brand-blue',
    btnText: 'text-white',
  }
];

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      maxWidth="max-w-6xl" 
      variant="dark"
      className="overflow-hidden p-0 bg-brand-green-dark border border-white/10 rounded-[24px] shadow-2xl"
    >
      <div className="flex flex-col md:flex-row h-[85vh] max-h-[800px]">
        
        {CONTACT_LOCATIONS.map((loc, index) => (
          <div key={loc.id} className="relative flex-1 flex flex-col justify-end group overflow-hidden border-b md:border-b-0 md:border-r border-white/10 last:border-0">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{ backgroundImage: `url('${loc.image}')` }}
            />
            
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent" />
            
            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 flex flex-col h-full justify-between">
              
              {/* Top Meta */}
              <div className="flex justify-between items-start">
                <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full inline-flex items-center gap-2 shadow-lg">
                  <Icon name="MapPin" size={14} className={loc.accentColor} />
                  <Text size="xs" weight="bold" className="tracking-widest uppercase text-white/90">
                    {loc.title}
                  </Text>
                </div>
              </div>

              {/* Bottom Details */}
              <div className="mt-auto transform transition-transform duration-500 md:translate-y-4 md:group-hover:translate-y-0">
                <Text size="sm" className="text-white/60 tracking-widest uppercase mb-2 font-medium">
                  {loc.subtitle}
                </Text>
                <Heading as="h2" variant="white" className="text-4xl md:text-5xl font-serif mb-1 leading-tight">
                  {loc.person}
                </Heading>
                <Text size="md" className="text-white/80 italic font-serif mb-8 text-xl">
                  {loc.role}
                </Text>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 text-white/90">
                    <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 backdrop-blur-sm">
                      <Icon name="Phone" size={16} className={loc.accentColor} />
                    </span>
                    <Text size="md" variant="none" className="font-light tracking-wide text-white">{loc.phone}</Text>
                  </div>
                  <div className="flex items-center gap-4 text-white/90">
                    <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 backdrop-blur-sm">
                      <Icon name="Mail" size={16} className={loc.accentColor} />
                    </span>
                    <Text size="md" variant="none" className="font-light tracking-wide text-white">{loc.email}</Text>
                  </div>
                  <div className="flex items-center gap-4 text-white/90">
                    <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 backdrop-blur-sm">
                      <Icon name="MapPin" size={16} className={loc.accentColor} />
                    </span>
                    <Text size="sm" variant="none" className="font-light tracking-wide whitespace-pre-line leading-relaxed text-white">{loc.address}</Text>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <a 
                    href={loc.waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl transition-all duration-300 font-semibold tracking-wide text-sm shadow-xl ${loc.btnBg} ${loc.btnText}`}
                  >
                    <Icon name="MessageCircle" size={18} />
                    WhatsApp
                  </a>
                  <a 
                    href={`mailto:${loc.email}`}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white transition-all duration-300 font-medium tracking-wide text-sm shadow-xl"
                  >
                    <Icon name="Mail" size={18} />
                    Email
                  </a>
                </div>
              </div>
            </div>
            
          </div>
        ))}

      </div>
    </Modal>
  );
};

export default ContactModal;
