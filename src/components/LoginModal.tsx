import React, { useState } from 'react';
import Icon from './ui/Icon';
import { Heading, Text } from './ui/Typography';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: 'traveler' | 'agent' | 'admin' | 'partner') => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const mEmail = email.toLowerCase().trim();
    if (mEmail === 'customer@email.com') {
      onLoginSuccess('traveler');
    } else if (mEmail === 'agent@vietana.com') {
      onLoginSuccess('agent');
    } else if (mEmail === 'manager@vietana.com') {
      onLoginSuccess('admin');
    } else if (mEmail === 'agency@example.com') {
      onLoginSuccess('partner');
    } else {
      setErrorMsg('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[800] flex justify-center items-center p-4">
      <div className="bg-[#FAF8F3] border border-[#E6D9BF] rounded-2xl p-6 w-full max-w-sm relative shadow-2xl animate-msg-fade-in flex flex-col gap-4 text-[#12302B]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <Icon name="X" size={16} />
        </button>

        {/* Brand Header */}
        <div className="flex flex-col items-center gap-1.5 mt-2">
          <div className="flex items-center gap-2 text-[#12302B] font-serif font-extrabold text-2xl tracking-wider select-none">
            <Icon name="Compass" className="text-[#D4AF37]" size={24} />
            <span>VIETANA</span>
          </div>
        </div>

        <div className="text-center flex flex-col gap-1 select-none">
          <Heading as="h3" className="text-base font-serif font-bold text-[#12302B]">
            Sign in to VIETANA
          </Heading>
          <Text className="text-xs text-gray-500">Access traveler folders, agent pipelines, and admin settings.</Text>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5 text-left">
            <label htmlFor="login-email" className="text-[10px] uppercase font-bold text-gray-400">Email Address</label>
            <input 
              id="login-email"
              type="email" 
              placeholder="e.g. customer@email.com" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-white border border-[#E6D9BF] rounded-xl px-3 py-2 text-xs outline-none text-gray-800"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <label htmlFor="login-pass" className="text-[10px] uppercase font-bold text-gray-400">Password</label>
            <input 
              id="login-pass"
              type="password" 
              placeholder="Enter password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-white border border-[#E6D9BF] rounded-xl px-3 py-2 text-xs outline-none text-gray-800"
              required
            />
          </div>

          {errorMsg && (
            <p className="text-[10px] text-red-700 font-semibold leading-relaxed text-center">{errorMsg}</p>
          )}

          <button 
            type="submit" 
            className="w-full bg-[#12302B] hover:bg-[#1E4D45] text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer mt-2"
          >
            Authenticate Account
          </button>
        </form>

      </div>
    </div>
  );
};

export default LoginModal;
export { LoginModal };
