import React, { useState, useEffect, useRef } from 'react';
import './AIPlanner.css';

interface AIPlannerProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestination?: string;
}

const AIPlanner: React.FC<AIPlannerProps> = ({ isOpen, onClose, initialDestination }) => {
  const [messages, setMessages] = useState<{ text: string; type: 'bot' | 'user' }[]>([]);
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'model'; parts: { text: string }[] }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const pcMsgsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialDestination) {
        const welcomeText = `I see you are interested in exploring ${initialDestination}. Let's build your trip around this beautiful destination!`;
        setMessages([{ text: welcomeText, type: 'bot' }]);
        setChatHistory([{ role: 'model', parts: [{ text: welcomeText }] }]);
      } else {
        const defaultText = "Hello, how can I help you plan your trip?";
        setMessages([{ text: defaultText, type: 'bot' }]);
        setChatHistory([{ role: 'model', parts: [{ text: defaultText }] }]);
      }
    }
  }, [isOpen, initialDestination]);

  useEffect(() => {
    if (pcMsgsRef.current) {
      pcMsgsRef.current.scrollTop = pcMsgsRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { text, type: 'user' }]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: text, 
          history: chatHistory 
        })
      });
      
      if (!response.ok) throw new Error('API request failed');
      
      const data = await response.json();
      
      setMessages(prev => [...prev, { text: data.text, type: 'bot' }]);
      setChatHistory(prev => [
        ...prev, 
        { role: 'user', parts: [{ text }] },
        { role: 'model', parts: [{ text: data.text }] }
      ]);
      
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { 
        text: "I'm having a little trouble connecting right now, but I'm still here! Let's talk about your Vietnam dreams.", 
        type: 'bot' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`ai-modal-overlay ${isOpen ? 'open' : ''}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="ai-modal-container">
        <div className="ai-close" onClick={onClose}>×</div>
        <div className="planner-left">
          <div className="ai-modal-header">
            <h3>🌿 <img src='/vietana_logo.png' className='inline-logo' alt='' />VIETANA Smart Concierge</h3>
            <p>Travel Gets Better with <img src='/vietana_logo.png' className='inline-logo' alt='' />VIETANA</p>
          </div>
          <div className="planner-chat" id="pcMsgs" ref={pcMsgsRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`msg msg-${msg.type}`}>
                {msg.type === 'bot' && <div className="msg-avatar"></div>}
                <div className="msg-bubble">
                  <p dangerouslySetInnerHTML={{ __html: msg.text }}></p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="pc-typing">
                <span></span><span></span><span></span>
              </div>
            )}
          </div>
          <div className="pc-input-area">
            {messages.length === 1 && !inputValue && (
              <div className="pc-greeting-area">
                <div className="pc-greeting">Hello, how can I help you plan your trip?</div>
                <div className="pc-examples">For example: <span>"Suggest a 5-day itinerary in Hanoi"</span></div>
              </div>
            )}
            <div className="pc-input-wrap">
              <div className="pc-input-inner">
                <button className="pc-mic">🎤</button>
                <input 
                  type="text" 
                  className="pc-input" 
                  placeholder="Where would you like to go?" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button className="pc-send" onClick={() => handleSend()}>
                  <svg viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="planner-right">
          <div className="live-dream-panel">
             <h4>Live Itinerary</h4>
             <div className="ldp-items">
               <div className="ldp-item">
                 <div className="ldp-lbl">Status</div>
                 <div className="ldp-val highlight">Connected to Gemini 1.5</div>
               </div>
             </div>
             <div className="ldp-actions show">
                <a href="mailto:info@vietana.com" className="ldp-btn email">✉ Email <img src='/vietana_logo.png' className='inline-logo' alt='' />VIETANA™</a>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPlanner;
