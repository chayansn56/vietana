import React from 'react';
import Icon from '../../components/ui/Icon';

interface GuideSearchProps {
  value: string;
  onChange: (val: string) => void;
}

const GuideSearch: React.FC<GuideSearchProps> = ({ value, onChange }) => {
  return (
    <div className="w-full bg-white border border-[#E6D9BF] rounded-2xl px-4 py-3 flex items-center gap-2 shadow-xs">
      <Icon name="Search" className="text-gray-400" size={16} />
      <input 
        type="text" 
        placeholder="Search travel guides (e.g. visa, vegetarian food, best season)..." 
        value={value}
        onChange={e => onChange(e.target.value)}
        className="flex-1 bg-transparent text-xs font-semibold outline-none border-none text-gray-800"
      />
    </div>
  );
};

export default GuideSearch;
export { GuideSearch };
