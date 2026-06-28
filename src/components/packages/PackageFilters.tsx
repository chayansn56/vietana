import React from 'react';
import { CategoryData } from '../../data/packagesData';

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
        <div className="flex bg-[#FAF7F0] dark:bg-black/20 border border-[#E8E4D9] dark:border-white/5 p-1.5 rounded-lg gap-2 w-full sm:w-auto">
          <button
            className={`flex-1 sm:flex-none px-6 py-2 rounded-md text-[11px] font-bold tracking-widest uppercase transition-all duration-300 ${
              activeTab === 'theme'
                ? 'bg-brand-green dark:bg-brand-sage text-white dark:text-brand-green-dark shadow-sm'
                : 'text-brand-green/60 dark:text-brand-sage/60 hover:text-brand-green dark:hover:text-brand-sage'
            }`}
            onClick={() => onTabChange('theme')}
          >
            By Theme
          </button>
          <button
            className={`flex-1 sm:flex-none px-6 py-2 rounded-md text-[11px] font-bold tracking-widest uppercase transition-all duration-300 ${
              activeTab === 'region'
                ? 'bg-brand-green dark:bg-brand-sage text-white dark:text-brand-green-dark shadow-sm'
                : 'text-brand-green/60 dark:text-brand-sage/60 hover:text-brand-green dark:hover:text-brand-sage'
            }`}
            onClick={() => onTabChange('region')}
          >
            By Region
          </button>
        </div>

        {/* Premium Jain Veg Toggle */}
        <div className="flex items-center gap-3 px-2 shrink-0">
          <span className="text-[11px] font-bold uppercase tracking-widest text-text-subtle dark:text-white/60">
            🟢 Jain & Veg Only
          </span>
          <button
            onClick={() => onToggleJainVeg(!jainVegOnly)}
            className={`relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors duration-300 focus:outline-none cursor-pointer ${
              jainVegOnly ? 'bg-brand-green dark:bg-brand-sage' : 'bg-[#E8E4D9] dark:bg-white/20'
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
      <div className="flex gap-2 overflow-x-auto pb-4 border-b border-[#E8E4D9] dark:border-white/10 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.name}
            className={`px-5 py-2 border rounded-full text-[11px] font-bold tracking-widest uppercase transition shrink-0 duration-300 ${
              activeCategoryName === cat.name
                ? 'border-brand-green bg-brand-green/5 text-brand-green dark:border-brand-sage dark:bg-brand-sage/10 dark:text-brand-sage'
                : 'border-[#E8E4D9] dark:border-white/10 text-text-subtle dark:text-white/60 hover:border-brand-green/50 dark:hover:border-brand-sage/50'
            }`}
            onClick={() => onCategoryChange(cat.name)}
          >
            {cat.name} <span className="opacity-60 ml-1">({cat.packages.length})</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PackageFilters;
