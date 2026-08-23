import React, { useState, useEffect } from 'react';
import Icon from './ui/Icon';
import { Heading, Text } from './ui/Typography';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (portal: 'agent' | 'admin' | 'traveler' | 'partner' | null) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onNavigate }) => {
  const [commandText, setCommandText] = useState('');
  const [showHealth, setShowHealth] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCommandText('');
      setShowHealth(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCommandRun = (cmd: string) => {
    const trimmed = cmd.toLowerCase().trim();
    if (trimmed === '/agent') {
      onNavigate('agent');
      onClose();
    } else if (trimmed === '/admin') {
      onNavigate('admin');
      onClose();
    } else if (trimmed === '/traveler') {
      onNavigate('traveler');
      onClose();
    } else if (trimmed === '/partner') {
      onNavigate('partner');
      onClose();
    } else if (trimmed === '/health') {
      setShowHealth(true);
    } else if (trimmed === '/close') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[900] flex justify-center items-start pt-[15vh] p-4">
      <div className="bg-[#FAF8F3] border-2 border-[#12302B] rounded-2xl w-full max-w-lg shadow-2xl p-5 flex flex-col gap-4 text-[#12302B] animate-msg-fade-in">
        
        <div className="flex items-center gap-2 border-b pb-3 border-[#E6D9BF]">
          <Icon name="Search" className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Type a command (e.g. /agent, /admin, /health, /close)..." 
            value={commandText}
            onChange={e => {
              setCommandText(e.target.value);
              handleCommandRun(e.target.value);
            }}
            className="flex-1 bg-transparent text-xs font-semibold outline-none border-none text-gray-800"
            autoFocus
          />
          <span className="text-[9px] bg-gray-200 font-bold px-2 py-0.5 rounded text-gray-500 font-mono">ESC</span>
        </div>

        {!showHealth ? (
          <div className="flex flex-col gap-2.5">
            <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Quick Command List</span>
            <div className="flex flex-col gap-1.5 text-xs">
              <button onClick={() => handleCommandRun('/agent')} className="flex justify-between items-center bg-white border border-[#E6D9BF] p-2.5 rounded-xl hover:bg-gray-50 cursor-pointer w-full text-left">
                <span>💼 Open Agent Portal</span>
                <span className="text-[9px] text-gray-400 font-mono">/agent</span>
              </button>
              <button onClick={() => handleCommandRun('/admin')} className="flex justify-between items-center bg-white border border-[#E6D9BF] p-2.5 rounded-xl hover:bg-gray-50 cursor-pointer w-full text-left">
                <span>⚙️ Open Control Center</span>
                <span className="text-[9px] text-gray-400 font-mono">/admin</span>
              </button>
              <button onClick={() => handleCommandRun('/health')} className="flex justify-between items-center bg-white border border-[#E6D9BF] p-2.5 rounded-xl hover:bg-gray-50 cursor-pointer w-full text-left">
                <span>💚 View System Health Center</span>
                <span className="text-[9px] text-gray-400 font-mono">/health</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 animate-msg-fade-in">
            <Heading as="h4" className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Icon name="Activity" className="text-[#1E4D45]" /> Global Health Center Dashboard
            </Heading>
            
            <div className="grid grid-cols-2 gap-3 text-[10px] text-gray-600 font-bold">
              <div className="bg-white border rounded-xl p-3 flex justify-between items-center">
                <span>🧠 AI Reasoning Model</span>
                <span className="text-emerald-700">● ONLINE</span>
              </div>
              <div className="bg-white border rounded-xl p-3 flex justify-between items-center">
                <span>✈ Flights API Gateway</span>
                <span className="text-emerald-700">● ONLINE</span>
              </div>
              <div className="bg-white border rounded-xl p-3 flex justify-between items-center">
                <span>🏨 Hotels API Gateway</span>
                <span className="text-emerald-700">● ONLINE</span>
              </div>
              <div className="bg-white border rounded-xl p-3 flex justify-between items-center">
                <span>💬 WhatsApp API Broker</span>
                <span className="text-emerald-700">● ONLINE</span>
              </div>
            </div>

            <button 
              onClick={() => setShowHealth(false)} 
              className="bg-[#12302B] text-white py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider mt-2 cursor-pointer"
            >
              Back to Command List
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default CommandPalette;
export { CommandPalette };
