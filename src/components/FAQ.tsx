import React, { useState } from 'react';
import './FAQ.css';

const FAQS = [
  { 
    q: 'Do Indian travelers need a visa for Vietnam?', 
    a: 'Yes. Most Indian travelers require a Vietnam visa. VIETANA helps simplify the process and provides fast support, often within 24 hours depending on requirements.' 
  },
  { 
    q: 'Can VIETANA customize my entire trip?', 
    a: 'Absolutely. We do not believe in rigid fixed tours. Every trip can be tailored around your budget, travel style, food preferences and interests.' 
  },
  { 
    q: 'Is Indian food available in Vietnam?', 
    a: 'Yes. From North Indian and South Indian meals to vegetarian, Jain and vegan options, we help travelers feel comfortable while still experiencing authentic Vietnam. Your food comfort matters to us.' 
  },
  { 
    q: 'Will someone help us while we are in Vietnam?', 
    a: 'Yes. Our support team is available in India and Vietnam. We provide local assistance and help when needed before and during your journey.' 
  },
  { 
    q: 'Do you only offer luxury travel?', 
    a: 'No. We create experiences ranging from budget-friendly adventures to premium luxury journeys.' 
  },
  { 
    q: 'Can you arrange airport pickup and local transport?', 
    a: 'Yes. Airport pickup, local transport, private cars and travel coordination can all be arranged for a smoother experience.' 
  },
  { 
    q: 'What if I want hidden places and not tourist spots?', 
    a: 'That is one of our strengths. We focus on experiences discovered through local knowledge — hidden cafés, food streets, lesser-known destinations and unique experiences.' 
  },
  { 
    q: 'Can I talk in Hindi or English?', 
    a: 'Yes. We support travelers in Hindi and English so communication always feels easy and familiar.' 
  }
];

const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq">
      <div className="sh r">
        <span className="lbl">Common Questions</span>
        <h2>Frequently Asked Questions</h2>
      </div>

      <div className="faq-wrap">
        {FAQS.map((faq, i) => (
          <div key={i} className={`faq-item ${openIdx === i ? 'o' : ''}`} onClick={() => setOpenIdx(openIdx === i ? null : i)}>
            <div className="faq-q">
              <h4>
                {faq.q.includes('VIETANA') ? (
                  <>
                    {faq.q.split('VIETANA')[0]}
                    <img src="/vietana_logo.png" className="inline-logo" alt="" style={{ height: '1.2em', verticalAlign: 'middle', margin: '0 4px' }} />
                    VIETANA
                    {faq.q.split('VIETANA')[1]}
                  </>
                ) : faq.q}
              </h4>
              <div className="faq-icon">{openIdx === i ? '−' : '+'}</div>
            </div>
            <div className="faq-a">
              <p>
                {faq.a.includes('VIETANA') ? (
                  <>
                    {faq.a.split('VIETANA')[0]}
                    <img src="/vietana_logo.png" className="inline-logo" alt="" style={{ height: '1.2em', verticalAlign: 'middle', margin: '0 4px' }} />
                    VIETANA
                    {faq.a.split('VIETANA')[1]}
                  </>
                ) : faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
