import React from 'react';
import Modal from './ui/Modal';
import { Heading, Text } from './ui/Typography';
import { useTranslation } from '../contexts/LanguageContext';
import { travelpayoutsConfig } from '../config/travelpayouts';

interface FlightSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FlightSearchModal: React.FC<FlightSearchModalProps> = ({ isOpen, onClose }) => {
  const { language } = useTranslation();

  const locale = language.toLowerCase() === 'hi' ? 'hi' : language.toLowerCase() === 'vi' ? 'vi' : 'en';
  const marker = travelpayoutsConfig.marker;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-4xl"
      className="p-8 bg-[#111111] border border-white/10"
    >
      <div className="flex flex-col gap-6 text-left">
        <div>
          <Heading
            as="h2"
            size="2xl"
            font="serif"
            className="text-brand-gold tracking-wide mb-2"
          >
            {language === 'HI' ? 'उड़ान खोजें' : language === 'VI' ? 'Tìm chuyến bay' : 'Search Flights'}
          </Heading>
          <Text size="sm" className="text-white/60">
            {language === 'HI' 
              ? 'वियतनाम के लिए सर्वोत्तम उड़ान दरें खोजें और सीधे एयरलाइन के साथ बुक करें।' 
              : language === 'VI' 
              ? 'Tìm giá vé máy bay tốt nhất đến Việt Nam và đặt vé trực tiếp với hãng hàng không.' 
              : 'Find the best flight rates to Vietnam and book directly with the airline.'}
          </Text>
        </div>

        {/* Widget Container via static HTML page to solve hostname verification issues inside iframe */}
        <div className="w-full min-h-[350px] relative rounded-2xl overflow-hidden bg-black/40 border border-white/5">
          {isOpen && (
            <iframe
              title="Travelpayouts Flight Search"
              src={`/tp-widget.html?locale=${locale}&marker=${marker}`}
              className="w-full h-[350px] border-none bg-transparent"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            />
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-white/40 border-t border-white/5 pt-4">
          <span>
            {language === 'HI' ? 'सुरक्षित खोज' : language === 'VI' ? 'Tìm kiếm an toàn' : 'Secured Search'}
          </span>
          <span className="flex items-center gap-1">
            Powered by Travelpayouts
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default FlightSearchModal;
