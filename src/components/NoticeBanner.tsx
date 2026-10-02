import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, X, ArrowRight } from 'lucide-react';

export const NoticeBanner: React.FC = () => {
  const { settings, openEnquiryModal } = useApp();
  const [dismissed, setDismissed] = useState(false);

  if (!settings.noticeBanner?.enabled || dismissed) return null;

  return (
    <aside aria-label="Announcement banner" className="bg-slate-900 text-white text-xs sm:text-sm py-2 px-4 border-b border-slate-800 relative z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden truncate">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
          <span className="font-medium text-slate-200 truncate">
            {settings.noticeBanner.text}
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => openEnquiryModal('New Batch Admission Offer')}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors cursor-pointer"
          >
            {settings.noticeBanner.linkText || 'Enquire Now'}
            <ArrowRight className="w-3 h-3" />
          </button>

          <button
            onClick={() => setDismissed(true)}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors"
            title="Dismiss notice"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
