import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heading, Text } from './ui/Typography';
import Icon from './ui/Icon';
import { Article } from '../data/notesMagazine';

interface NotesSideSheetProps {
  isOpen: boolean;
  onClose: () => void;
  article: Article | null;
}

const NotesSideSheet: React.FC<NotesSideSheetProps> = ({ isOpen, onClose, article }) => {
  const [saved, setSaved] = useState(false);

  // Lock body scroll when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Estimate reading time
  const getReadingTime = (art: Article) => {
    if (art.isComingSoon) return 'Coming Soon';
    let textLength = art.intro.length;
    art.sections?.forEach(s => {
      textLength += (s.heading || '').length;
      s.paragraphs?.forEach(p => {
        textLength += p.length;
      });
      s.list?.forEach(l => {
        textLength += l.length;
      });
    });
    const words = textLength / 5;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min read`;
  };

  const handleSaveToPlan = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Please allow popups to download your customized PDF!");
      return;
    }

    const title = article.title;
    const intro = article.intro;
    const author = article.author || 'Vietana Editorial';
    const readingTime = getReadingTime(article);

    let sectionsHtml = '';
    if (article.sections && article.sections.length > 0) {
      article.sections.forEach(sec => {
        sectionsHtml += '<div class="section">';
        if (sec.heading) {
          sectionsHtml += '<h2 class="section-title">' + sec.heading + '</h2>';
        }
        if (sec.paragraphs) {
          sec.paragraphs.forEach(p => {
            sectionsHtml += '<p class="paragraph">' + p + '</p>';
          });
        }
        if (sec.list && sec.list.length > 0) {
          sectionsHtml += '<ul class="list">';
          sec.list.forEach(li => {
            sectionsHtml += '<li class="list-item">' + li + '</li>';
          });
          sectionsHtml += '</ul>';
        }
        sectionsHtml += '</div>';
      });
    } else {
      sectionsHtml = '<div class="section"><p class="paragraph">' + intro + '</p></div>';
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>VIETANA Journal - \${title}</title>
          <meta charset="utf-8" />
          <style>
            @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
            
            @page {
              size: A4;
              margin: 20mm 15mm 20mm 15mm;
            }
            
            body {
              font-family: 'DM Sans', sans-serif;
              color: #2b2b2b;
              background-color: #FAF8F3;
              margin: 0;
              padding: 0;
              line-height: 1.6;
              font-size: 11pt;
            }
            
            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 2px solid #D4AF37;
              padding-bottom: 15px;
              margin-bottom: 30px;
            }
            
            .brand-logo {
              font-family: 'Playfair Display', serif;
              font-size: 18pt;
              font-weight: bold;
              letter-spacing: 0.2em;
              color: #1E4D45;
              text-transform: uppercase;
            }
            
            .contact-info {
              text-align: right;
              font-size: 8pt;
              color: #666;
              line-height: 1.4;
            }
            
            .cover-banner {
              background-color: #1E4D45;
              color: white;
              padding: 35px;
              border-radius: 12px;
              margin-bottom: 35px;
            }
            
            .cover-banner h1 {
              font-family: 'Playfair Display', serif;
              font-size: 22pt;
              margin: 0 0 12px 0;
              color: #FAF8F3;
              line-height: 1.3;
            }
            
            .meta-info {
              font-size: 9pt;
              color: rgba(250,248,243,0.8);
              border-top: 1px solid rgba(255,255,255,0.15);
              padding-top: 12px;
              margin-top: 15px;
              display: flex;
              gap: 20px;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              font-weight: bold;
            }
            
            .section {
              margin-bottom: 30px;
              page-break-inside: avoid;
            }
            
            .section-title {
              font-family: 'Playfair Display', serif;
              font-size: 14pt;
              color: #1E4D45;
              border-bottom: 1px solid rgba(30, 77, 69, 0.1);
              padding-bottom: 6px;
              margin-top: 0;
              margin-bottom: 15px;
            }
            
            .paragraph {
              margin: 0 0 15px 0;
              text-align: justify;
              color: #333333;
            }
            
            .list {
              margin: 0 0 20px 0;
              padding-left: 20px;
            }
            
            .list-item {
              margin-bottom: 8px;
              color: #333333;
            }
            
            .footer {
              position: fixed;
              bottom: 0;
              left: 0;
              right: 0;
              display: flex;
              justify-content: space-between;
              font-size: 7.5pt;
              color: #888;
              border-top: 1px solid #E8E4D9;
              padding-top: 10px;
            }
            
            .footer-brand {
              font-family: 'Playfair Display', serif;
              letter-spacing: 0.15em;
              font-weight: bold;
              text-transform: uppercase;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="brand-logo">VIETANA</div>
            <div class="contact-info">
              <div>PREMIUM TRAVEL CONCIERGE</div>
              <div>WWW.VIETANA.COM</div>
            </div>
          </div>
          
          <div class="cover-banner">
            <h1>\${title}</h1>
            <div class="meta-info">
              <span>By \${author}</span>
              <span>•</span>
              <span>\${readingTime}</span>
            </div>
          </div>
          
          <div class="content">
            \${sectionsHtml}
          </div>
          
          <div class="footer">
            <div class="footer-brand">VIETANA JOURNAL</div>
            <div>© \${new Date().getFullYear()} Vietana. All Rights Reserved.</div>
          </div>

          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 500);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  if (!article) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[1900] bg-black/40 backdrop-blur-sm"
          />

          {/* Side Sheet */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 z-[2000] h-full w-[100%] md:w-[80%] max-w-4xl bg-surface-cream shadow-2xl overflow-y-auto overscroll-contain md:rounded-l-[32px]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/50 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center transition-colors shadow-sm"
            >
              <Icon name="X" size={24} className="text-text-charcoal" />
            </button>

            {/* Hero Image */}
            <div className="relative h-[40vh] md:h-[50vh] w-full">
              <img
                src={article.image}
                alt={`Featured image for story: ${article.title}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white w-full">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="bg-brand-gold/90 text-brand-green-extra-dark font-bold text-caption tracking-widest uppercase px-2.5 py-1 rounded-full">
                    {getReadingTime(article)}
                  </span>
                  {article.author && (
                    <span className="bg-white/20 backdrop-blur-md border border-white/10 text-white font-bold text-caption tracking-widest uppercase px-3 py-1 rounded-full flex items-center gap-1.5">
                      <Icon name="User" size={10} />
                      By {article.author}
                    </span>
                  )}
                  <button 
                    onClick={handleSaveToPlan}
                    className="bg-white/20 backdrop-blur-md border border-white/10 hover:bg-white/30 text-white font-bold text-caption tracking-widest uppercase px-3 py-1 rounded-full flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Icon name={saved ? 'Check' : 'Bookmark'} size={10} />
                    {saved ? 'Saved!' : 'Save to Plan'}
                  </button>
                  <button 
                    onClick={handleDownloadPDF}
                    className="bg-white/20 backdrop-blur-md border border-white/10 hover:bg-white/30 text-white font-bold text-caption tracking-widest uppercase px-3 py-1 rounded-full flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Icon name="Download" size={10} />
                    Download PDF
                  </button>
                </div>
                <Heading as="h1" size="4xl" font="serif" className="mb-4">
                  {article.title}
                </Heading>
                <Text size="xl" className="font-light opacity-90 max-w-2xl">
                  {article.intro}
                </Text>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8 md:p-12 max-w-3xl">
              {article.isComingSoon ? (
                <div className="bg-white dark:bg-surface-dark rounded-[24px] p-10 text-center shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-text-charcoal/5">
                  <span className="text-4xl block mb-4">✍️</span>
                  <Heading as="h3" size="2xl" font="serif" className="mb-4 text-text-charcoal">
                    Currently Crafting
                  </Heading>
                  <Text className="text-text-charcoal/60">
                    Our team is currently on the ground gathering the best insights, photos, and recommendations for this guide. It will be available soon.
                  </Text>
                </div>
              ) : article.sections && article.sections.length > 0 ? (
                <div className="space-y-12">
                  {article.sections.map((section, idx) => (
                    <div key={idx} className="space-y-4">
                      {section.heading && (
                        <Heading as="h2" size="2xl" font="serif" className="text-text-charcoal border-b border-text-charcoal/10 pb-4 mb-6">
                          {section.heading}
                        </Heading>
                      )}
                      {section.paragraphs?.map((p, pIdx) => (
                        <Text key={pIdx} size="lg" className="text-text-charcoal/80 leading-relaxed">
                          {p}
                        </Text>
                      ))}
                      {section.list && section.list.length > 0 && (
                        <ul className="list-disc pl-6 space-y-3 mt-4 text-lg text-text-charcoal/80 leading-relaxed marker:text-brand-gold">
                          {section.list.map((item, lIdx) => (
                            <li key={lIdx}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                  
                  {/* Footer Logo */}
                  <div className="pt-16 pb-8 flex flex-col items-center justify-center opacity-40">
                    <div className="w-12 h-12 mb-4 text-text-charcoal">
                      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 22h20L12 2zm0 3.8l7.2 14.4H4.8L12 5.8z"/>
                      </svg>
                    </div>
                    <Heading as="h4" size="lg" font="serif" className="text-text-charcoal tracking-[0.3em] uppercase mb-1">
                      VIETANA
                    </Heading>
                    <Text size="xs" className="tracking-[0.3em] uppercase text-text-charcoal/70 font-mono">
                      JOURNAL
                    </Text>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* External Source Card */}
                  <div className="bg-white dark:bg-surface-dark rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-text-charcoal/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                      <Text size="sm" weight="semibold" className="uppercase tracking-widest text-text-charcoal/50 mb-2">
                        Curated Guide
                      </Text>
                      <Heading as="h4" size="xl" font="serif" className="text-text-charcoal mb-2">
                        Read on {article.sourceName || 'External Source'}
                      </Heading>
                      <Text className="text-text-charcoal/60">
                        We've selected this as one of the best resources available on the web for this topic.
                      </Text>
                    </div>
                    
                    {article.sourceUrl && (
                      <a
                        href={article.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 bg-text-charcoal text-surface-ivory dark:text-text-charcoal px-8 py-4 rounded-full font-medium hover:opacity-90 transition-colors flex items-center gap-2"
                      >
                        Read Full Guide <span className="ml-1">→</span>
                      </a>
                    )}
                  </div>

                  <div className="pt-8 border-t border-text-charcoal/10">
                    <Text className="text-text-charcoal/40 italic text-center">
                      VIETANA™ is building the ultimate digital travel magazine. Right now, we curate the best external resources. Soon, this will be replaced with our own exclusive, on-the-ground guides.
                    </Text>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotesSideSheet;
