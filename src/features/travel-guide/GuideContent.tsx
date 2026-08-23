import React from 'react';
import { Article } from './data';

interface GuideContentProps {
  article: Article;
  onNavigate: (id: string) => void;
}

const GuideContent: React.FC<GuideContentProps> = ({ article, onNavigate }) => {
  // A clean inline parser to convert marked bold links [Title](/travel-guide/link_id) into clickable anchors
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');

    return lines.map((line, idx) => {
      let trimmed = line.trim();

      // Headings
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-xl font-serif font-bold text-[#12302B] mt-6 mb-3">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-sm font-bold text-gray-800 mt-4 mb-2">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }

      // Bullet points
      if (trimmed.startsWith('- ')) {
        return (
          <li key={idx} className="text-xs text-gray-600 list-disc ml-4 my-1.5 leading-relaxed">
            {parseInternalLinks(trimmed.replace('- ', ''))}
          </li>
        );
      }

      // Standard paragraphs
      if (trimmed.length > 0) {
        return (
          <p key={idx} className="text-xs text-gray-600 leading-relaxed my-2">
            {parseInternalLinks(trimmed)}
          </p>
        );
      }

      return null;
    });
  };

  // Parses markdown links like **[Budget Planner](/travel-guide/budget)** into React elements
  const parseInternalLinks = (str: string) => {
    // Regex matches **[Label](/travel-guide/id)**
    const regex = /\*\*\[(.*?)\]\(\/travel-guide\/(.*?)\)\*\*/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(str)) !== null) {
      // Add plain text before match
      if (match.index > lastIndex) {
        parts.push(str.substring(lastIndex, match.index));
      }

      const label = match[1];
      const targetId = match[2];

      parts.push(
        <button
          key={match.index}
          onClick={() => onNavigate(targetId)}
          className="text-[#1E4D45] hover:text-[#D4AF37] font-bold underline bg-transparent border-none cursor-pointer p-0 inline"
        >
          {label}
        </button>
      );

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < str.length) {
      parts.push(str.substring(lastIndex));
    }

    return parts.length > 0 ? parts : str;
  };

  return (
    <article className="flex-1 bg-white border border-[#E6D9BF] rounded-2xl p-6 shadow-xs select-text">
      <h1 className="text-2xl font-serif font-extrabold text-[#12302B] border-b pb-3 border-[#E6D9BF] mb-4">
        {article.title}
      </h1>
      <div className="flex flex-col">
        {renderFormattedText(article.content)}
      </div>
    </article>
  );
};

export default GuideContent;
export { GuideContent };
