import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X } from 'lucide-react';

const WhatsAppIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M16 2C8.28 2 2 8.28 2 16c0 2.72.78 5.27 2.13 7.43L2.2 30l6.76-1.87A13.9 13.9 0 0 0 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.54c-2.3 0-4.47-.64-6.33-1.75l-.45-.27-4.32 1.19 1.15-4.2-.29-.46A11.55 11.55 0 0 1 4.46 16C4.46 9.64 9.64 4.46 16 4.46S27.54 9.64 27.54 16 22.36 27.54 16 27.54zm7.25-9.28c-.4-.2-2.36-1.16-2.72-1.29-.36-.13-.62-.2-.88.2s-1.02 1.29-1.25 1.55-.46.29-.86.1a10.87 10.87 0 0 1-5.32-4.66c-.4-.7.4-.65 1.15-2.14.13-.26.07-.49-.03-.69-.1-.2-.88-2.12-1.21-2.9-.32-.76-.65-.66-.89-.67h-.76c-.26 0-.69.1-1.05.49a4.87 4.87 0 0 0-1.52 3.62c0 2.17 1.58 4.27 1.8 4.56s3.11 4.75 7.54 6.66c1.05.45 1.87.72 2.51.93 1.06.34 2.02.29 2.78.18.85-.13 2.36-.96 2.69-1.89.33-.93.33-1.72.23-1.89-.1-.17-.36-.27-.76-.47z" />
  </svg>
);

export const FloatingWhatsApp: React.FC = () => {
  const { currentPage } = useApp();
  const [showTooltip, setShowTooltip] = useState(true);

  // Dynamic WhatsApp routing per page:
  // 1. Home / Main: 9827783218
  // 2. Lok Seva Kendra: 7879318811
  // 3. PC Build & Repair: 9098551281
  const getWhatsAppDetails = () => {
    if (currentPage === 'lok-seva') {
      return {
        number: '917879318811',
        label: 'लोक सेवा व बैंक CSP',
        tooltip: 'लोक सेवा व बैंक CSP सहायता? WhatsApp करें (7879318811)',
        message: 'नमस्ते! मैं मयंक लोक सेवा केंद्र (नगपुरा) की बैंकिंग सेवाओं (BOB / BOM / CRGB नकद लेन-देन) एवं ई-डिस्ट्रिक्ट (आय, जाति, निवास, खसरा B-1) के बारे में जानकारी चाहता हूँ।'
      };
    }
    if (currentPage === 'pc-build') {
      return {
        number: '919098551281',
        label: 'PC Build & Repair',
        tooltip: 'PC Build & Repair Expert? Chat on WhatsApp (9098551281)',
        message: 'Hello Mayank Computer! I have an enquiry regarding Custom PC Building, Laptop Repair, or Parts upgrade.'
      };
    }
    return {
      number: '919827783218',
      label: 'Mayank Computer',
      tooltip: 'Need help? Chat with Mayank Computer (9827783218)',
      message: 'Hello Mayank Computer! I visited your website and would like to ask some questions regarding computer courses and admissions.'
    };
  };

  const currentDetails = getWhatsAppDetails();

  const handleOpenWhatsApp = () => {
    window.open(`https://wa.me/${currentDetails.number}?text=${encodeURIComponent(currentDetails.message)}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 animate-wa-float">
      {/* Interactive Tooltip Card */}
      {showTooltip && (
        <div 
          onClick={handleOpenWhatsApp}
          className="hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md text-slate-800 py-2.5 px-4 rounded-2xl shadow-2xl border border-slate-200/90 hover:border-emerald-400 transition-all cursor-pointer group"
        >
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                Online • तुरंत उत्तर
              </span>
            </div>
            <span className="text-xs font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
              {currentDetails.label}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer ml-1"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main WhatsApp Button with Dual Wave Sonar Ripple */}
      <div className="relative flex items-center justify-center">
        {/* Outer Sonar Ring 1 */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-wa-sonar pointer-events-none" />

        {/* Outer Sonar Ring 2 */}
        <span className="absolute inset-0 rounded-full bg-emerald-400/30 animate-wa-sonar-second pointer-events-none" />

        {/* WhatsApp Floating Action Button */}
        <button
          onClick={handleOpenWhatsApp}
          className="relative w-15 h-15 rounded-full bg-gradient-to-tr from-[#20ba59] to-[#25D366] hover:from-[#1daa50] hover:to-[#22bf5b] text-white flex items-center justify-center shadow-xl shadow-emerald-600/45 hover:shadow-2xl hover:shadow-emerald-500/60 hover:scale-108 active:scale-95 transition-all duration-300 cursor-pointer group border-2 border-white/40"
          title={`WhatsApp: ${currentDetails.label}`}
          aria-label={`WhatsApp: ${currentDetails.label}`}
        >
          {/* Animated WhatsApp Icon with Eye-Catching Phone Vibration / Wiggle */}
          <div className="animate-wa-wiggle transition-transform duration-300">
            <WhatsAppIcon className="w-8 h-8 text-white drop-shadow-sm" />
          </div>

          {/* Green Online Notification Dot */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full shadow-xs" />
        </button>
      </div>
    </div>
  );
};

