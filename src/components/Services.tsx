import React from 'react';
import { useApp } from '../context/AppContext';
import { DigitalService } from '../types';
import {
  Monitor,
  Keyboard,
  Printer,
  Scan,
  Copy,
  FileText,
  FileCheck,
  Download,
  Cpu,
  Globe,
  ArrowRight,
  Clock,
  MessageCircle,
  Plus,
  Landmark
} from 'lucide-react';

interface ServicesProps {
  onOpenAdminTab?: (tab: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenAdminTab }) => {
  const { services, setSelectedService, openEnquiryModal, settings, isAdminLoggedIn, setCurrentPage } = useApp();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Monitor':
        return Monitor;
      case 'Keyboard':
        return Keyboard;
      case 'Printer':
        return Printer;
      case 'Scan':
        return Scan;
      case 'Copy':
        return Copy;
      case 'FileText':
        return FileText;
      case 'FileCheck':
        return FileCheck;
      case 'Download':
        return Download;
      case 'Cpu':
        return Cpu;
      case 'Globe':
      default:
        return Globe;
    }
  };

  const publishedServices = services.filter(
    (s) => s.status === 'published' || isAdminLoggedIn
  );

  const handleWhatsAppService = (service: DigitalService, e: React.MouseEvent) => {
    e.stopPropagation();
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Hello Mayank Computer! I need assistance with your service: "${service.title}". Please let me know the charges, documents required, and estimated time.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <section id="services" className="py-10 sm:py-14 bg-slate-50 border-b border-slate-200 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
              One-Stop Solution
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Computer & Digital Citizen Services
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Fast, reliable documentation, high-speed printing, online government form filling, hardware upgrades, and software setup.
            </p>
          </div>

          {isAdminLoggedIn && onOpenAdminTab && (
            <button
              onClick={() => onOpenAdminTab('services')}
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Manage Services
            </button>
          )}
        </div>

        {/* Specialized Stations Promo Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Lok Seva Kendra & Bank CSP */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-900 to-slate-900 text-white flex flex-col justify-between border border-blue-800 shadow-md">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center justify-center">
                  <Landmark className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Bank BC Point
                </span>
              </div>
              <h3 className="text-base font-bold text-white leading-snug">
                लोक सेवा केंद्र एवं बैंक ग्राहक सेवा केंद्र (CSP)
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Bank of Baroda, Bank of Maharashtra एवं Chhattisgarh Gramin Bank नकद निकासी, जमा, नया खाता, आय/जाति/निवास एवं खसरा B-1 नकल।
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-blue-800/80">
              <button
                onClick={() => setCurrentPage('lok-seva')}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>लोक सेवा केंद्र पेज खोलें</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: PC Build & Repair */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white flex flex-col justify-between border border-slate-800 shadow-md">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Hardware Station
                </span>
              </div>
              <h3 className="text-base font-bold text-white leading-snug">
                Custom PC Build & Laptop Repair Hub
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Pre-tested Office & Gaming PC packages, interactive live quotation builder, and 30-minute express SSD upgrades & repairs.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800">
              <button
                onClick={() => setCurrentPage('pc-build')}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>Open PC Build & Repair Center</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedServices.map((service) => {
            const Icon = getIcon(service.icon);
            return (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-blue-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                      <Icon className="w-6 h-6" />
                    </div>

                    {service.estimatedTime && (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {service.estimatedTime}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  {/* Highlights */}
                  {service.features && service.features.length > 0 && (
                    <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
                      {service.features.slice(0, 3).map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800 transition-colors"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={(e) => handleWhatsAppService(service, e)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-lg border border-emerald-200 transition-colors"
                    title="Enquire on WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
