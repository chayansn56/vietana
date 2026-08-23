import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import GuideSidebar from './GuideSidebar';
import GuideSearch from './GuideSearch';
import GuideContent from './GuideContent';
import { ARTICLES, Article } from './data';
import { Heading } from '../../components/ui/Typography';

const TravelGuidePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Parse sub-route from path: e.g. /travel-guide/visa
  const [activeArticleId, setActiveArticleId] = useState(() => {
    const parts = window.location.pathname.split('/');
    return parts[2] || 'visa';
  });

  // Keep path synced with active article selections
  const handleSelectArticle = (id: string) => {
    setActiveArticleId(id);
    window.history.pushState({}, '', `/travel-guide/${id}`);
  };

  useEffect(() => {
    const handlePopState = () => {
      const parts = window.location.pathname.split('/');
      setActiveArticleId(parts[2] || 'visa');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Filter articles by query match
  const filteredArticles = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return ARTICLES;

    return ARTICLES.filter(art => 
      art.title.toLowerCase().includes(q) || 
      art.keywords.some(k => k.includes(q)) ||
      art.content.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Selected active article object
  const activeArticle = useMemo(() => {
    return ARTICLES.find(art => art.id === activeArticleId) || ARTICLES[0];
  }, [activeArticleId]);

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#12302B] flex flex-col justify-between">
      
      {/* Header element overlay spacer */}
      <div className="bg-[#12302B] py-3 text-center text-xs text-white/60 font-semibold select-none shrink-0 border-b border-white/10">
        Vietnam Travel Guide • Knowledge Center Portal
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 w-full flex-grow flex flex-col gap-6">
        
        {/* Navigation & Header Titles */}
        <div className="flex flex-col gap-1.5 mt-4">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">Knowledge Center</span>
          <h1 className="text-3xl md:text-4xl font-serif font-extrabold text-[#12302B]">
            Vietnam Travel Guide
          </h1>
          <p className="text-xs text-gray-500 max-w-2xl leading-relaxed">
            Essential visa timelines, budget guidelines, regional weather cycles, and local veg/Jain food dining maps compiled by VIETANA travel designers.
          </p>
        </div>

        {/* Global Search Bar */}
        <GuideSearch value={searchQuery} onChange={setSearchQuery} />

        {/* Split Sidebar & Content grid */}
        <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
          <GuideSidebar 
            activeArticleId={activeArticleId} 
            onSelectArticle={handleSelectArticle} 
            filteredArticles={filteredArticles}
          />
          
          <GuideContent 
            article={activeArticle} 
            onNavigate={handleSelectArticle}
          />
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default TravelGuidePage;
export { TravelGuidePage };
