import React from 'react';
import { buildWhatsAppLink, WHATSAPP_NUMBERS } from '../../utils/whatsapp';

const FloatingWhatsApp: React.FC = () => {
  const handleWhatsApp = () => {
    window.open(buildWhatsAppLink(WHATSAPP_NUMBERS.DEFAULT, "Hi Vietana! I'm interested in planning a journey to Vietnam."), '_blank');
  };

  const handleZalo = () => {
    window.open(`https://zalo.me/${WHATSAPP_NUMBERS.VIETNAM}`, '_blank');
  };

  return (
    <div className="fixed bottom-8 right-8 z-[310] flex flex-col gap-4">
      {/* Zalo Button */}
      <div 
        className="cursor-pointer flex items-center justify-center w-14 h-14 bg-[#0068FF] text-white rounded-full shadow-[0_4px_20px_rgba(0,104,255,0.4)] hover:-translate-y-1 transition-transform duration-300 group relative"
        onClick={handleZalo}
        title="Chat on Zalo"
      >
        <span className="font-bold text-xl tracking-tighter">Zalo</span>
      </div>

      {/* WhatsApp Button */}
      <div 
        className="cursor-pointer flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:-translate-y-1 transition-transform duration-300 group relative"
        onClick={handleWhatsApp}
        title="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
          <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.061-.3-.15-1.265-.462-2.406-1.479-.889-.788-1.487-1.761-1.663-2.061-.175-.3-.019-.461.132-.611.134-.133.3-.35.45-.524.148-.174.198-.298.298-.497.099-.198.05-.371-.025-.521-.075-.148-.673-1.611-.922-2.206-.24-.579-.481-.501-.672-.51l-.573-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.767-.722 2.016-1.422.249-.701.249-1.301.173-1.422-.074-.122-.274-.196-.575-.346zm-5.454 5.928c-1.353 0-2.678-.363-3.834-1.049l-.275-.164-2.85.746.761-2.779-.18-.286c-.751-1.196-1.147-2.585-1.147-4.024 0-4.14 3.37-7.51 7.51-7.51 2.007 0 3.896.782 5.315 2.203 1.419 1.42 2.2 3.311 2.2 5.318 0 4.14-3.371 7.51-7.51 7.51zm0-16.713C7.307 3.597 3.4 7.502 3.4 12.235c0 1.517.397 2.998 1.15 4.305L3 21l4.606-1.206c1.268.686 2.688 1.049 4.14 1.049h.004c4.735 0 8.591-3.86 8.594-8.595 0-2.296-.893-4.455-2.516-6.079-1.624-1.624-3.784-2.518-6.082-2.518z"/>
        </svg>
      </div>
    </div>
  );
};

export default FloatingWhatsApp;
