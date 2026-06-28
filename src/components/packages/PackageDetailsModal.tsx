import React from 'react';
import { PackageProduct } from '../../data/packagesData';
import { AnimatePresence } from 'motion/react';
import Modal from '../ui/Modal';
import Icon from '../ui/Icon';
import { Heading, Text } from '../ui/Typography';
import Button from '../ui/Button';
import { buildWhatsAppLink, WHATSAPP_NUMBERS } from '../../utils/whatsapp';

interface PackageDetailsModalProps {
  selectedPackage: PackageProduct | null;
  expandedDay: number | null;
  onSetExpandedDay: (day: number | null) => void;
  onClose: () => void;
  onSetCustomizerPkg: (pkg: PackageProduct) => void;
  onOpenPlanner: (pkg: PackageProduct) => void;
}

const PackageDetailsModal: React.FC<PackageDetailsModalProps> = ({
  selectedPackage,
  expandedDay,
  onSetExpandedDay,
  onClose,
  onSetCustomizerPkg,
  onOpenPlanner,
}) => {
  const getDownloadPaths = (pkg: PackageProduct) => {
    const category = pkg.category;
    const filename = pkg.title.toLowerCase().replace(/[^a-z0-9]+/g, '_') + '.pdf';
    return {
      pdf: `/itineraries/PDFs/${category}/${filename}`
    };
  };

  return (
    <AnimatePresence>
      {selectedPackage && (
        <Modal
          isOpen={!!selectedPackage}
          onClose={onClose}
          maxWidth="max-w-4xl"
          className="h-[80vh] flex flex-col p-0 overflow-hidden bg-white border border-[#E8E4D9] rounded-xl shadow-heavy"
        >
          {/* Header image details */}
          <div className="h-48 w-full overflow-hidden relative shrink-0">
            <img
              src={selectedPackage.img}
              alt={selectedPackage.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Vietana Brand Logo Label */}
            <div className="absolute top-5 left-6 text-white/85 text-xs tracking-widest font-mono font-bold uppercase flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
              <Icon name="Leaf" size={12} className="text-brand-gold-light" /> VIETANA CURATED
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end gap-4">
              <div>
                <Text variant="none" className="text-caption uppercase tracking-widest text-brand-gold font-mono font-bold mb-1.5 block">
                  {selectedPackage.duration} · {selectedPackage.badge}
                </Text>
                <Heading as="h3" variant="none" className="text-2xl font-serif text-white tracking-wide">
                  {selectedPackage.title}
                </Heading>
              </div>
              {selectedPackage.price && (
                <div className="bg-brand-gold-light text-brand-green-dark px-4 py-2 rounded shadow-md border border-white/20 text-center shrink-0">
                  <span className="text-[11px] uppercase tracking-widest font-bold block opacity-85 leading-none mb-1">Indian Price</span>
                  <span className="text-lg font-mono font-extrabold leading-none tabular-nums">{selectedPackage.price} PP</span>
                </div>
              )}
            </div>
          </div>

          {/* Scrollable details tab */}
          <div className="flex-1 overflow-y-auto p-8 md:p-10 scrollbar-thin">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-[#E8E4D9]">
              <div>
                <Heading as="h4" variant="none" className="text-xs text-brand-gold-muted uppercase tracking-widest font-mono font-semibold mb-3">
                  RECOMMENDED HOTELS
                </Heading>
                <div className="flex flex-col gap-2">
                  {selectedPackage.hotels.map((h, idx) => (
                    <Text key={idx} variant="none" className="text-text-subtle text-xs font-light">
                      🏨 {h}
                    </Text>
                  ))}
                </div>
              </div>

              <div>
                <Heading as="h4" variant="none" className="text-xs text-brand-gold-muted uppercase tracking-widest font-mono font-semibold mb-3">
                  KEY INCLUSIONS
                </Heading>
                <div className="flex flex-col gap-1.5">
                  {selectedPackage.inclusions.slice(0, 4).map((inc, idx) => (
                    <Text key={idx} variant="none" className="text-text-subtle text-xs font-light flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span> <span>{inc}</span>
                    </Text>
                  ))}
                  {selectedPackage.inclusions.length > 4 && (
                    <Text variant="none" className="text-text-subtle/60 text-caption italic pl-5">
                      + {selectedPackage.inclusions.length - 4} more inclusions
                    </Text>
                  )}
                </div>
              </div>
            </div>

            {/* Day-by-Day Accordion preview */}
            <div className="mb-6">
              <Heading as="h4" variant="none" className="text-xs text-brand-gold-muted uppercase tracking-widest font-mono font-semibold mb-6">
                DAY-BY-DAY ITINERARY PREVIEW
              </Heading>

              <div className="flex flex-col gap-3 pl-4 border-l border-dashed border-[#E8E4D9]">
                {selectedPackage.days.map((day) => {
                  const isExpanded = expandedDay === day.day;
                  return (
                    <div key={day.day} className="relative">
                      <div className={`absolute -left-[21px] top-3.5 w-2 h-2 rounded-full ${isExpanded ? 'bg-brand-green' : 'bg-[#E8E4D9]'}`} />

                      <div
                        className={`border rounded-xl p-4.5 cursor-pointer transition-all duration-300 ${isExpanded ? 'bg-[#FAF7F0] border-brand-green/30' : 'bg-white border-[#E8E4D9]/80 hover:bg-[#FAF7F0]'}`}
                        onClick={() => onSetExpandedDay(isExpanded ? null : day.day)}
                      >
                        <div className="flex justify-between items-center">
                          <Text variant="none" className="text-xs font-serif text-brand-green font-bold">
                            Day {day.day}: {day.title}
                          </Text>
                          <span className="text-text-subtle/65 text-xs">
                            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={14} />
                          </span>
                        </div>

                        {isExpanded && (
                          <div className="mt-3 text-xs flex flex-col gap-3 animate-msg-fade-in font-light leading-relaxed text-text-subtle">
                            <Text variant="none" className="italic text-text-subtle/85 mb-1">{day.description}</Text>
                            <div>
                              <span className="text-caption uppercase tracking-widest text-brand-gold-muted font-bold block mb-1">Activities:</span>
                              {day.activities.map((act, i) => (
                                <div key={i} className="pl-2 flex gap-2"><span>-</span> <span>{act}</span></div>
                              ))}
                            </div>
                            <div>
                              <span className="text-caption uppercase tracking-widest text-brand-gold-muted font-bold block mb-1">Gastronomy:</span>
                              {day.food.map((f, i) => (
                                <div key={i} className="pl-2 flex gap-2 italic text-text-subtle/80"><span>✦</span> <span>{f}</span></div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Premium Download Buttons */}
          <div className="px-6 py-4 bg-[#FAF7F0] border-t border-[#E8E4D9] shrink-0 flex flex-col gap-2">
            <span className="text-caption uppercase tracking-widest text-brand-gold-muted font-semibold text-center mb-1">
              Download Luxury Handbook
            </span>
            <div className="flex border border-[#E8E4D9] rounded overflow-hidden shadow-sm">
              <Button
                variant="secondary"
                onClick={() => {
                  onClose();
                  onSetCustomizerPkg(selectedPackage);
                }}
                className="w-full text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2"
                icon={<Icon name="FileText" size={14} className="text-brand-gold" />}
              >
                Customize & Download PDF
              </Button>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="p-6 bg-white border-t border-[#E8E4D9] shrink-0 flex flex-col sm:flex-row gap-3">
            <Button
              variant="glass"
              className="flex-1 py-4 text-xs font-bold uppercase tracking-wider text-brand-green bg-[#FAF7F0] border border-[#E8E4D9] hover:bg-brand-green/5"
              onClick={() => {
                const itemsList = selectedPackage.days.map(d => `Day ${d.day}: ${d.title}`).join('\n');
                const msg = `Hi Vietana! I'm interested in the "${selectedPackage.title}" package:\n\n${itemsList}`;
                window.open(buildWhatsAppLink(WHATSAPP_NUMBERS.DEFAULT, msg), '_blank');
              }}
            >
              <Icon name="MessageCircle" size={16} className="mr-2" /> Book via WhatsApp
            </Button>
            <Button
              className="flex-1 py-4 text-xs font-bold uppercase tracking-wider text-white bg-brand-green hover:bg-brand-green-dark flex items-center justify-center gap-1.5"
              onClick={() => {
                const pkg = selectedPackage;
                onClose();
                onOpenPlanner(pkg);
              }}
            >
              <Icon name="Mic" size={16} /> Customize with Voice
            </Button>
          </div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default PackageDetailsModal;
