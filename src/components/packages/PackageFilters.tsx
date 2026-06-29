import React from 'react';
import { CategoryData } from '../../data/packagesData';
import Button from '../ui/Button';

interface PackageFiltersProps {
  activeTab: 'theme' | 'region';
  onTabChange: (tab: 'theme' | 'region') => void;
  jainVegOnly: boolean;
  onToggleJainVeg: (value: boolean) => void;
  categories: CategoryData[];
  activeCategoryName: string;
  onCategoryChange: (categoryName: string) => void;
}

const PackageFilters: React.FC<PackageFiltersProps> = ({
  activeTab,
  onTabChange,
  jainVegOnly,
  onToggleJainVeg,
  categories,
  activeCategoryName,
  onCategoryChange,
}) => {
  return (
    <div className="mb-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        {/* Interest vs Region Selector */}
        <div className="flex bg-surface-linen dark:bg-black/20 border border-border-divider dark:border-white/5 p-1.5 rounded-lg gap-2 w-full sm:w-auto">
          <Button
            variant={activeTab === 'theme' ? 'secondary' : 'ghost'}
            className="flex-1 sm:flex-none text-tiny font-bold tracking-widest uppercase !py-2"
            onClick={() => onTabChange('theme')}
          >
            By Theme
          </Button>
          <Button
            variant={activeTab === 'region' ? 'secondary' : 'ghost'}
            className="flex-1 sm:flex-none text-tiny font-bold tracking-widest uppercase !py-2"
            onClick={() => onTabChange('region')}
          >
            By Region
          </Button>
        </div>

        {/* Premium Jain Veg Toggle */}
        <div className="flex items-center gap-3 px-2 shrink-0">
          <span className="text-tiny font-bold uppercase tracking-widest text-text-subtle dark:text-white/60">
            🟢 Jain & Veg Only
          </span>
          <button
            onClick={() => onToggleJainVeg(!jainVegOnly)}
            className={`relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors duration-300 focus:outline-none cursor-pointer ${
              jainVegOnly ? 'bg-brand-green dark:bg-brand-sage' : 'bg-border-divider dark:bg-white/20'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow-sm ${
                jainVegOnly ? 'translate-x-[22px]' : 'translate-x-[3px]'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Category Tabs list horizontal */}
      <div className="flex gap-2 overflow-x-auto pb-4 border-b border-border-divider dark:border-white/10 scrollbar-none">
        {categories.map((cat) => (
          <Button
            key={cat.name}
            variant={activeCategoryName === cat.name ? 'secondary' : 'outline'}
            className="text-tiny font-bold tracking-widest uppercase shrink-0 rounded-full !px-5"
            onClick={() => onCategoryChange(cat.name)}
          >
            {cat.name} <span className="opacity-60 ml-1">({cat.packages.length})</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PackageFilters;
