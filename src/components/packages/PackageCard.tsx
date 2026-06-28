import React from 'react';
import { PackageProduct } from '../../data/packagesData';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

interface PackageCardProps {
  pkg: PackageProduct;
  onSetCustomizerPkg: (pkg: PackageProduct) => void;
  onOpenPlanner: (pkg: PackageProduct) => void;
  onSetSelectedPackage: (pkg: PackageProduct) => void;
}

const PackageCard: React.FC<PackageCardProps> = ({
  pkg,
  onSetCustomizerPkg,
  onOpenPlanner,
  onSetSelectedPackage,
}) => {
  return (
    <div className="w-[85vw] sm:w-[420px] h-[540px] editorial-card rounded-xl flex flex-col justify-between shrink-0 snap-start relative group overflow-hidden border border-[#E8E4D9]">
      {/* Photo area */}
      <div className="h-[220px] relative w-full overflow-hidden shrink-0 border-b border-[#E8E4D9]">
        <img
          src={pkg.img}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-[1200ms]"
        />

        {/* Top tags */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
          <span className="bg-brand-green text-white font-semibold text-[11px] tracking-widest uppercase px-2.5 py-1 rounded shadow-sm">
            {pkg.badge}
          </span>
          {pkg.price ? (
            <span className="bg-brand-gold-light text-brand-green-dark px-2.5 py-1 rounded text-[11px] tracking-wider uppercase font-mono font-bold shadow-sm border border-white/20">
              {pkg.price} PP
            </span>
          ) : (
            <span className="bg-white text-brand-green border border-[#E8E4D9] px-2.5 py-1 rounded text-[11px] tracking-widest uppercase font-mono font-bold">
              {pkg.duration}
            </span>
          )}
        </div>
      </div>

      {/* Editorial Body / Content */}
      <div className="flex-1 px-6 py-5 flex flex-col justify-between relative bg-white">
        <div className="space-y-2">
          <div className="flex justify-between items-start gap-2">
            <h4 className="text-lg font-bold font-serif text-brand-green tracking-tight leading-tight flex-1">
              {pkg.title}
            </h4>
            {pkg.price && (
              <span className="text-xs text-brand-gold-muted font-bold border border-brand-gold-muted/20 bg-[#FAF7F0] px-2 py-0.5 rounded font-mono shrink-0">
                {pkg.duration}
              </span>
            )}
          </div>

          <div className="editorial-meta-tag pb-1 border-b border-[#E8E4D9]">
            ROUTE // {pkg.destinations.join(' ➔ ')}
          </div>

          <p className="text-text-subtle text-xs font-light leading-relaxed line-clamp-3">
            {pkg.desc}
          </p>
        </div>

        <div className="py-2.5 border-t border-[#E8E4D9] flex items-center justify-between gap-4 mt-2">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-brand-gold-muted font-bold block mb-0.5">Stay Curation</span>
            <span className="text-[11px] text-brand-green truncate block font-medium">🏨 {pkg.hotels[0]}</span>
          </div>

          {pkg.isJainVegFriendly && (
            <span className="text-[11px] bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-200 uppercase font-mono">
              Veg Friendly
            </span>
          )}
        </div>
      </div>

      {/* Vogue Editorial Action Footer */}
      <div className="bg-[#FAF7F0] border-t border-[#E8E4D9] p-4 flex gap-3 shrink-0">
        <Button
          variant="outline" size="sm"
          onClick={() => onSetCustomizerPkg(pkg)}
          className="flex-1 !text-[11px] uppercase tracking-widest px-2"
          icon={<Icon name="FileText" size={11} className="text-brand-gold-muted" />}
        >
          PDF Info
        </Button>
        <Button
          variant="primary" size="sm"
          className="flex-1 editorial-btn !text-[11px] uppercase tracking-widest px-2 shadow-sm"
          onClick={() => onOpenPlanner(pkg)}
          icon={<Icon name="Sparkles" size={10} />}
        >
          AI Customization
        </Button>
        <Button
          variant="outline" size="sm"
          className="!text-[11px] uppercase tracking-widest px-4"
          onClick={() => onSetSelectedPackage(pkg)}
        >
          Details
        </Button>
      </div>
    </div>
  );
};

export default PackageCard;
