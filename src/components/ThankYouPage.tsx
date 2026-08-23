import React, { useEffect, useState } from 'react';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import Button from './ui/Button';
import Icon from './ui/Icon';
import { buildWhatsAppLink } from '../utils/whatsapp';

export default function ThankYouPage() {
  const [leadName, setLeadName] = useState('Traveler');
  const [whatsappMessage, setWhatsappMessage] = useState<string | null>(null);

  useEffect(() => {
    // Read lead name from session storage
    const name = sessionStorage.getItem('vietana_lead_name');
    if (name) {
      setLeadName(name);
    }

    // Check if we need to redirect to WhatsApp (for quick leads)
    const waUrl = sessionStorage.getItem('vietana_redirect_whatsapp');
    if (waUrl) {
      try {
        const url = new URL(waUrl);
        const text = url.searchParams.get('text');
        if (text) {
          setWhatsappMessage(text);
        }
      } catch (e) {
        console.error('Failed to parse WhatsApp redirect URL', e);
      }
    }
  }, []);

  const handleBackHome = () => {
    sessionStorage.removeItem('vietana_redirect_whatsapp');
    window.location.hash = '';
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-brand-green-extra-dark text-white flex items-center justify-center relative py-16 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-green/20 rounded-full blur-[120px] pointer-events-none" />
      
      <Container size="sm" className="relative z-10 text-center">
        <div className="bg-brand-green-dark/40 border border-brand-gold/20 rounded-[32px] p-8 md:p-16 shadow-2xl backdrop-blur-md max-w-2xl mx-auto">
          
          {/* Animated Success Check Circle */}
          <div className="w-20 h-20 bg-brand-gold/10 border border-brand-gold/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(201,168,76,0.15)] animate-pulse">
            <Icon name="Check" className="text-brand-gold" size={40} />
          </div>

          <Text size="xs" className="text-brand-gold font-mono tracking-widest uppercase mb-3 font-semibold">
            Xin Chào! Submission Confirmed
          </Text>
          
          <Heading as="h1" size="2xl" font="serif" variant="white" className="mb-6 leading-tight">
            Thank You, <span className="text-brand-gold-light italic">{leadName}</span>!
          </Heading>

          {whatsappMessage ? (
            <div className="mb-8">
              <Text size="md" className="text-white/90 leading-relaxed max-w-lg mx-auto mb-6">
                Please select which office you'd like to connect with on WhatsApp to receive your customized Vietnam travel plan.
              </Text>
              <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-lg mx-auto">
                <button
                  onClick={() => {
                    const link = buildWhatsAppLink("919990977002", whatsappMessage);
                    window.open(link, '_blank');
                    sessionStorage.removeItem('vietana_redirect_whatsapp');
                  }}
                  className="w-full py-4 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition duration-200 border-none cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  <Icon name="MessageCircle" size={16} /> 🇮🇳 Connect India (+91)
                </button>
                <button
                  onClick={() => {
                    const link = buildWhatsAppLink("84902434006", whatsappMessage);
                    window.open(link, '_blank');
                    sessionStorage.removeItem('vietana_redirect_whatsapp');
                  }}
                  className="w-full py-4 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition duration-200 border-none cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  <Icon name="MessageCircle" size={16} /> 🇻🇳 Connect Vietnam (+84)
                </button>
              </div>
            </div>
          ) : (
            <Text size="md" className="text-white/80 mb-8 leading-relaxed max-w-lg mx-auto">
              Our travel specialist will contact you <strong className="text-brand-gold-light">within 30 minutes</strong> on WhatsApp or email to share your customized itinerary.
            </Text>
          )}

          {/* Quick Expectations/Workflow info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-white/10 py-6 mb-8 text-left max-w-md mx-auto">
            <div className="flex gap-3 items-start">
              <span className="text-brand-gold text-lg">1</span>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Review</h4>
                <p className="text-xxs text-white/50 leading-normal">Specialist reads your plans.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start border-y sm:border-y-0 sm:border-x border-white/10 py-3 sm:py-0 sm:px-4">
              <span className="text-brand-gold text-lg">2</span>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Design</h4>
                <p className="text-xxs text-white/50 leading-normal">Bespoke route created.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start sm:pl-2">
              <span className="text-brand-gold text-lg">3</span>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Connect</h4>
                <p className="text-xxs text-white/50 leading-normal">WhatsApp itinerary link.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant={whatsappMessage ? 'outline' : 'primary'} size="lg" onClick={handleBackHome} className={whatsappMessage ? 'border-white/20 text-white hover:bg-white/5' : 'shadow-gold'}>
              Return to Homepage
            </Button>
          </div>

        </div>
      </Container>
    </div>
  );
}
