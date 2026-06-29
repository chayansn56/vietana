import React from 'react';
import { PackageProduct } from '../../data/packagesData';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
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
    <Card className="w-[85vw] sm:w-[420px] h-[540px] editorial-card !p-0 flex flex-col justify-between shrink-0 snap-start relative group overflow-hidden">
      {/* Photo area */}
      <div className="h-[220px] relative w-full overflow-hidden shrink-0 border-b border-border-divider">
        <img
          src={pkg.img}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-[1200ms]"
        />

        {/* Top tags */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
          <Badge variant="green-filled" className="!px-2.5 !py-1 !text-tiny shadow-sm normal-case tracking-widest">
            {pkg.badge}
          </Badge>
          {pkg.price ? (
            <Badge variant="gold-filled" className="!px-2.5 !py-1 !text-tiny shadow-sm border-white/20 font-mono">
              {pkg.price} PP
            </Badge>
          ) : (
            <Badge variant="outline" className="!px-2.5 !py-1 !text-tiny font-mono text-brand-green border-border-divider bg-white">
              {pkg.duration}
            </Badge>
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
              <span className="text-xs text-brand-gold-muted font-bold border border-brand-gold-muted/20 bg-surface-linen px-2 py-0.5 rounded font-mono shrink-0">
                {pkg.duration}
              </span>
            )}
          </div>

          <div className="editorial-meta-tag pb-1 border-b border-border-divider">
            ROUTE // {pkg.destinations.join(' ➔ ')}
          </div>

          <p className="text-text-subtle text-xs font-light leading-relaxed line-clamp-3">
            {pkg.desc}
          </p>
        </div>

        <div className="py-2.5 border-t border-border-divider flex items-center justify-between gap-4 mt-2">
          <div>
            <span className="text-tiny uppercase tracking-widest text-brand-gold-muted font-bold block mb-0.5">Stay Curation</span>
            <span className="text-tiny text-brand-green truncate block font-medium">🏨 {pkg.hotels[0]}</span>
          </div>

          {pkg.isJainVegFriendly && (
            <span className="text-tiny bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-200 uppercase font-mono">
              Veg Friendly
            </span>
          )}
        </div>
      </div>

      {/* Vogue Editorial Action Footer */}
      <div className="bg-surface-linen border-t border-border-divider p-4 flex gap-3 shrink-0">
        <Button
          variant="outline" size="sm"
          onClick={() => onSetCustomizerPkg(pkg)}
          className="flex-1 !text-tiny uppercase tracking-widest px-2"
          icon={<Icon name="FileText" size={11} className="text-brand-gold-muted" />}
        >
          PDF Info
        </Button>
        <Button
          variant="primary" size="sm"
          className="flex-1 editorial-btn !text-tiny uppercase tracking-widest px-2 shadow-sm"
          onClick={() => onOpenPlanner(pkg)}
          icon={<Icon name="Sparkles" size={10} />}
        >
          AI Customization
        </Button>
        <Button
          variant="outline" size="sm"
          className="!text-tiny uppercase tracking-widest px-4"
          onClick={() => onSetSelectedPackage(pkg)}
        >
          Details
        </Button>
      </div>
    </Card>
  );
};

export default PackageCard;
