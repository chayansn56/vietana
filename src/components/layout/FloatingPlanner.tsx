import React, { useState, useEffect } from "react";
import Icon from "../ui/Icon";
import Modal from "../ui/Modal";
import { Heading, Text } from "../ui/Typography";
import { events } from "../../utils/events";

interface FloatingPlannerProps {
  onClick: () => void;
}

const FloatingPlanner: React.FC<FloatingPlannerProps> = ({ onClick }) => {
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [isEmergencyPulsing, setIsEmergencyPulsing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsEmergencyPulsing(false), 3000);

    const unsubscribe = events.subscribe('open-emergency', () => setEmergencyOpen(true));

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="fixed bottom-8 left-8 z-[310] flex flex-col items-start gap-3 pointer-events-none safe-bottom safe-left">
        <button
          onClick={() => setEmergencyOpen(true)}
          className={`pointer-events-auto focus-ring flex items-center gap-2 px-4 py-2.5 rounded-full border border-red-500 bg-red-500/10 backdrop-blur-md text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer shadow-[0_4px_15px_rgba(239,68,68,0.3)] hover:animate-none ${isEmergencyPulsing ? "animate-pulse" : ""}`}
        >
          <Icon name="AlertCircle" size={16} />
          <span className="text-xs font-bold tracking-widest uppercase">Emergency</span>
        </button>

        <button
          onClick={onClick}
          className="pointer-events-auto cursor-pointer flex items-center justify-center gap-3.5 px-5 h-14 bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-green-extra-dark rounded-full shadow-[0_8px_32px_rgba(201,168,76,0.3)] border border-brand-gold/40 hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 group relative"
          title="Open Smart Planner"
          aria-label="Open Smart Planner"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green-extra-dark opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-green-extra-dark"></span>
          </span>
          <Icon name="Sparkles" size={18} className="text-brand-green-extra-dark animate-pulse" />
          <span className="font-serif font-bold text-sm tracking-wide">Smart Planner</span>
        </button>
      </div>

      <Modal isOpen={emergencyOpen} onClose={() => setEmergencyOpen(false)} maxWidth="max-w-xl">
        <div className="p-6 sm:p-8 flex flex-col gap-6 relative">
          <button
            onClick={() => setEmergencyOpen(false)}
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            <Icon name="X" size={24} />
          </button>

          <div className="flex flex-col items-center text-center mb-2">
            <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mb-4 shrink-0">
              <Icon name="AlertTriangle" size={32} />
            </div>
            <Heading as="h3" size="2xl" font="serif" className="text-white">Emergency Support</Heading>
            <Text variant="none" className="text-white/70 mt-2 text-sm sm:text-base">Download essential guides and protocols for immediate assistance.</Text>
          </div>

          <div className="flex flex-col gap-4">
            <a
              href="/vietana_emergency_medical_card.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setEmergencyOpen(false)}
              className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-red-500/50 transition-all group no-underline"
            >
              <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                <Icon name="HeartPulse" size={24} />
              </div>
              <div className="flex-1">
                <Text variant="none" weight="bold" className="text-white text-left">Medical Assistance</Text>
                <Text variant="none" size="xs" className="text-white/50 text-left">Emergency Medical Card</Text>
              </div>
              <Icon name="Download" size={20} className="text-white/30 group-hover:text-red-400 transition-colors" />
            </a>

            <a
              href="/vietana_embassy_and_consular_assistance.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setEmergencyOpen(false)}
              className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-brand-gold/50 transition-all group no-underline"
            >
              <div className="w-12 h-12 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center shrink-0">
                <Icon name="Flag" size={24} />
              </div>
              <div className="flex-1">
                <Text variant="none" weight="bold" className="text-white text-left">Embassy & Consular Assistance</Text>
                <Text variant="none" size="xs" className="text-white/50 text-left">Missions & Crisis Numbers</Text>
              </div>
              <Icon name="Download" size={20} className="text-white/30 group-hover:text-brand-gold transition-colors" />
            </a>

            <a
              href="/vietana_travel_emergency_guide.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setEmergencyOpen(false)}
              className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/50 transition-all group no-underline"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <Icon name="ShieldAlert" size={24} />
              </div>
              <div className="flex-1">
                <Text variant="none" weight="bold" className="text-white text-left">Travel Emergencies & Essential Support</Text>
                <Text variant="none" size="xs" className="text-white/50 text-left">Baggage, Flights, Scams</Text>
              </div>
              <Icon name="Download" size={20} className="text-white/30 group-hover:text-blue-400 transition-colors" />
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FloatingPlanner;
