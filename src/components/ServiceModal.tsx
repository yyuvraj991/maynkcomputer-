import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Clock,
  Tag,
  CheckCircle2,
  MessageCircle,
  Send,
  HelpCircle
} from 'lucide-react';

export const ServiceModal: React.FC = () => {
  const { selectedService, setSelectedService, openEnquiryModal, settings } = useApp();

  if (!selectedService) return null;

  const handleWhatsAppEnquiry = () => {
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Hello Mayank Computer! I need urgent assistance regarding "${selectedService.title}". Please guide me on timings, charges, and process.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  const handleOpenForm = () => {
    const subject = `Service: ${selectedService.title}`;
    setSelectedService(null);
    openEnquiryModal(subject);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div
        className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header image banner */}
        <div className="relative aspect-[21/9] w-full bg-slate-900">
          <img
            src={selectedService.image}
            alt={selectedService.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={() => setSelectedService(null)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-[10px] uppercase font-bold tracking-wider text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800">
              Digital Service
            </span>
            <h3 className="text-xl sm:text-2xl font-black mt-1 leading-snug">
              {selectedService.title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-6">
          {/* Metadata chips */}
          <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
            {selectedService.estimatedTime && (
              <div>
                <span className="text-slate-400 block font-medium">Turnaround Time</span>
                <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  {selectedService.estimatedTime}
                </span>
              </div>
            )}

            {selectedService.priceEstimate && (
              <div className="ml-auto sm:ml-6">
                <span className="text-slate-400 block font-medium">Charges / Estimate</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                  <Tag className="w-3.5 h-3.5 text-emerald-600" />
                  {selectedService.priceEstimate}
                </span>
              </div>
            )}
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Service Description
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {selectedService.fullDescription}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              What Is Included
            </h4>
            <div className="space-y-2">
              {selectedService.features.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            onClick={() => setSelectedService(null)}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={handleWhatsAppEnquiry}
            className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Request via WhatsApp</span>
          </button>

          <button
            onClick={handleOpenForm}
            className="w-full sm:w-auto px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Enquiry</span>
          </button>
        </div>
      </div>
    </div>
  );
};
