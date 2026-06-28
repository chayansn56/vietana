import React, { useState } from 'react';
import { PackageProduct } from '../data/packagesData';
import Modal from './ui/Modal';
import Button from './ui/Button';
import { Heading, Text } from './ui/Typography';
import Icon from './ui/Icon';

interface PDFCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pkg: PackageProduct | null;
}

const PDFCustomizerModal: React.FC<PDFCustomizerModalProps> = ({ isOpen, onClose, pkg }) => {
  const [travelerName, setTravelerName] = useState('');
  const [travelDates, setTravelDates] = useState('');
  const [pdfTheme, setPdfTheme] = useState<'classic' | 'modern'>('classic');
  const [includeVegNotes, setIncludeVegNotes] = useState(true);

  if (!pkg) return null;

  const handleGeneratePDF = () => {
    // Generate beautiful, print-ready document in a new window
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Please allow popups to download your customized PDF!");
      return;
    }

    const primaryColor = pdfTheme === 'classic' ? '#1E4D45' : '#0A1C18';
    const accentColor = pdfTheme === 'classic' ? '#D4AF37' : '#2C6E63';
    const backgroundColor = pdfTheme === 'classic' ? '#FAF8F3' : '#FFFFFF';

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${pkg.title} - Custom Itinerary</title>
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
              background-color: ${backgroundColor};
              margin: 0;
              padding: 0;
              line-height: 1.6;
              font-size: 11pt;
            }
            
            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 2px solid ${accentColor};
              padding-bottom: 15px;
              margin-bottom: 30px;
            }
            
            .logo-area img {
              height: 50px;
            }
            
            .contact-info {
              text-align: right;
              font-size: 8pt;
              color: #666;
              line-height: 1.4;
            }
            
            .cover-banner {
              background-color: ${primaryColor};
              color: white;
              padding: 30px;
              border-radius: 12px;
              margin-bottom: 40px;
            }
            
            .cover-banner h1 {
              font-family: 'Playfair Display', serif;
              font-size: 24pt;
              margin: 0 0 10px 0;
              color: #FAF8F3;
              line-height: 1.2;
            }
            
            .meta-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
              margin-top: 20px;
              border-top: 1px solid rgba(255,255,255,0.15);
              padding-top: 15px;
              font-size: 10pt;
            }
            
            .meta-item strong {
              color: #FAF8F3;
              display: block;
              text-transform: uppercase;
              font-size: 7.5pt;
              letter-spacing: 0.15em;
              margin-bottom: 3px;
            }
            
            .section-title {
              font-family: 'Playfair Display', serif;
              font-size: 16pt;
              color: ${primaryColor};
              border-bottom: 1px solid #E8E4D9;
              padding-bottom: 8px;
              margin-top: 30px;
              margin-bottom: 15px;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }
            
            .day-card {
              margin-bottom: 25px;
              page-break-inside: avoid;
              border-left: 3px solid ${accentColor};
              padding-left: 15px;
            }
            
            .day-header {
              display: flex;
              justify-content: space-between;
              align-items: baseline;
              margin-bottom: 5px;
            }
            
            .day-title {
              font-family: 'Playfair Display', serif;
              font-size: 13pt;
              font-weight: bold;
              color: ${primaryColor};
              margin: 0;
            }
            
            .day-number {
              font-family: 'DM Sans', sans-serif;
              font-size: 9pt;
              font-weight: bold;
              color: ${accentColor};
              text-transform: uppercase;
              letter-spacing: 0.1em;
            }
            
            .day-desc {
              font-size: 10.5pt;
              color: #444;
              margin-bottom: 10px;
              font-weight: 300;
            }
            
            .list-label {
              font-size: 7.5pt;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              color: #888;
              margin: 8px 0 3px 0;
            }
            
            .bullets {
              margin: 0;
              padding-left: 15px;
              font-size: 10pt;
            }
            
            .bullets li {
              margin-bottom: 3px;
            }
            
            .footer-branding {
              margin-top: 60px;
              border-top: 1px solid #E8E4D9;
              padding-top: 15px;
              text-align: center;
              font-size: 8pt;
              color: #888;
              page-break-before: auto;
            }

            .veg-badge-note {
              background-color: #f4faf4;
              border: 1px solid #d2ecd2;
              color: #2e7d32;
              padding: 12px;
              border-radius: 8px;
              font-size: 9pt;
              margin-bottom: 25px;
            }
            
            @media print {
              .no-print {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo-area">
              <img src="https://vietana.com/vietana_logo.png" alt="VIETANA Logo" onerror="this.src='/vietana_logo.png'" />
            </div>
            <div class="contact-info">
              <strong>VIETANA Travel Co., Ltd</strong><br />
              Email: booking@vietana.com | VIETANA@vietana.com<br />
              Tel: +91 99532 94543 (India) | +84 90 243 4006 (Vietnam)
            </div>
          </div>
          
          <div class="cover-banner">
            <h1>${pkg.title}</h1>
            <p style="margin: 0; opacity: 0.9; font-weight: 300;">Bespoke curations for discerning travelers visiting Vietnam.</p>
            
            <div class="meta-grid">
              ${travelerName ? `
              <div class="meta-item">
                <strong>Prepared For</strong>
                ${travelerName}
              </div>` : ''}
              ${travelDates ? `
              <div class="meta-item">
                <strong>Travel Dates</strong>
                ${travelDates}
              </div>` : ''}
              <div class="meta-item">
                <strong>Duration</strong>
                ${pkg.duration}
              </div>
              <div class="meta-item">
                <strong>Route Focus</strong>
                ${pkg.destinations.join(' ➔ ')}
              </div>
            </div>
          </div>

          ${includeVegNotes && pkg.isJainVegFriendly ? `
          <div class="veg-badge-note">
            🌱 <strong>Veg-Friendly Experience:</strong> This itinerary is custom curated for travelers seeking certified vegetarian, vegan, or Jain cuisine. Handpicked kitchens, separate cooking utensils, and Indian gourmet chefs can be arranged at all destinations.
          </div>` : ''}
          
          <div class="section-title">The Journey Blueprint</div>
          
          ${pkg.itinerary.map(day => `
            <div class="day-card">
              <div class="day-header">
                <h3 class="day-title">${day.title}</h3>
                <span class="day-number">Day ${day.day}</span>
              </div>
              <div class="day-desc">${day.description}</div>
              
              ${day.activities && day.activities.length > 0 ? `
                <div class="list-label">Highlights & Sights</div>
                <ul class="bullets">
                  ${day.activities.map(act => `<li>${act}</li>`).join('')}
                </ul>
              ` : ''}
              
              ${day.food && day.food.length > 0 ? `
                <div class="list-label">Gastronomy Selections</div>
                <ul class="bullets" style="font-style: italic;">
                  ${day.food.map(f => `<li>${f}</li>`).join('')}
                </ul>
              ` : ''}
            </div>
          `).join('')}

          <div class="section-title">Luxury Accommodation</div>
          <p style="font-size: 10pt; line-height: 1.5; font-weight: 300; margin-bottom: 40px;">
            For this custom escape, our team recommends staying at <strong>${pkg.hotels.join(', ')}</strong>. These properties represent the finest hospitality standards in Vietnam, offering customized amenities, strategic locations, and outstanding service.
          </p>
          
          <div class="footer-branding">
            Thank you for planning your journey with VIETANA. We look forward to hosting you in Vietnam.<br />
            © 2026 VIETANA Co., Ltd. All Rights Reserved.
          </div>

          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
      <div className="p-6 sm:p-8 flex flex-col gap-5 text-left relative bg-white dark:bg-surface-dark text-charcoal">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-charcoal transition-colors cursor-pointer"
        >
          <Icon name="X" size={20} />
        </button>

        <div>
          <span className="text-[9px] font-bold tracking-[0.2em] text-brand-gold-muted dark:text-brand-gold uppercase block mb-1">Custom PDF Exporter</span>
          <Heading as="h3" size="xl" font="serif" className="text-brand-green dark:text-white leading-tight">Personalize Itinerary</Heading>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-brand-green dark:text-white/80">Traveler Names</label>
            <input 
              type="text" 
              placeholder="e.g. Chayan & Family" 
              value={travelerName}
              onChange={(e) => setTravelerName(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-black/10 text-sm outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-brand-green dark:text-white/80">Travel Dates</label>
            <input 
              type="text" 
              placeholder="e.g. July 15 - July 22, 2026" 
              value={travelDates}
              onChange={(e) => setTravelDates(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-black/10 text-sm outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-brand-green dark:text-white/80">Select Design Style</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPdfTheme('classic')}
                className={`py-2 px-3 text-xs font-semibold uppercase tracking-wider rounded-lg border transition ${
                  pdfTheme === 'classic'
                    ? 'bg-brand-green/5 border-brand-green text-brand-green dark:text-brand-gold'
                    : 'border-black/5 hover:border-black/10 dark:border-white/5 dark:text-white'
                }`}
              >
                Classic Gold
              </button>
              <button
                onClick={() => setPdfTheme('modern')}
                className={`py-2 px-3 text-xs font-semibold uppercase tracking-wider rounded-lg border transition ${
                  pdfTheme === 'modern'
                    ? 'bg-brand-green/5 border-brand-green text-brand-green dark:text-brand-gold'
                    : 'border-black/5 hover:border-black/10 dark:border-white/5 dark:text-white'
                }`}
              >
                Modern Emerald
              </button>
            </div>
          </div>

          {pkg.isJainVegFriendly && (
            <label className="flex items-center gap-2.5 py-1.5 cursor-pointer select-none">
              <input 
                type="checkbox"
                checked={includeVegNotes}
                onChange={() => setIncludeVegNotes(!includeVegNotes)}
                className="w-4 h-4 accent-brand-green cursor-pointer"
              />
              <span className="text-xs font-medium text-green-700 dark:text-green-400">Include vegetarian & Jain gourmet culinary note</span>
            </label>
          )}
        </div>

        <div className="flex gap-3 mt-4">
          <button 
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-black/10 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5 text-xs tracking-wider uppercase font-bold rounded-lg cursor-pointer transition text-charcoal dark:text-white"
          >
            Cancel
          </button>
          <button 
            onClick={handleGeneratePDF}
            className="flex-1 py-3 px-4 bg-brand-green hover:bg-brand-green-dark text-white text-xs tracking-wider uppercase font-bold rounded-lg cursor-pointer transition flex items-center justify-center gap-2 shadow"
          >
            <Icon name="Download" size={14} /> Download PDF
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PDFCustomizerModal;
