import React from 'react';
import { ARTICLES, Article } from './data';

interface GuideSidebarProps {
  activeArticleId: string;
  onSelectArticle: (id: string) => void;
  filteredArticles: Article[];
}

const GuideSidebar: React.FC<GuideSidebarProps> = ({ activeArticleId, onSelectArticle, filteredArticles }) => {
  // Group articles by categories
  const categories = [
    { key: 'planning', label: 'Planning' },
    { key: 'in-vietnam', label: 'In Vietnam' },
    { key: 'help', label: 'Help & Safety' }
  ];

  return (
    <aside className="w-full lg:w-64 bg-white border border-[#E6D9BF] rounded-2xl p-4 flex flex-col gap-4 select-none shrink-0">
      {categories.map(cat => {
        const catArticles = filteredArticles.filter(art => art.category === cat.key);
        if (catArticles.length === 0) return null;

        return (
          <div key={cat.key} className="flex flex-col gap-1.5">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider border-b pb-1 mb-1">
              {cat.label}
            </span>
            <ul className="flex flex-col gap-1 list-none p-0 m-0">
              {catArticles.map(art => (
                <li key={art.id}>
                  <button
                    onClick={() => onSelectArticle(art.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors
                      ${activeArticleId === art.id ? 'bg-[#12302B] text-white' : 'text-gray-600 hover:bg-[#12302B]/5'}`}
                  >
                    {art.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </aside>
  );
};

export default GuideSidebar;
export { GuideSidebar };
