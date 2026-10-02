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
  const { services, setSelectedService, settings, isAdminLoggedIn, setCurrentPage } = useApp();

  const getIcon = (iconName: string) => {
    switch (iconName) {
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
      case 'Monitor':
        return Monitor;
      case 'Keyboard':
        return Keyboard;
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
    <section id="services" className="py-8 sm:py-14 bg-slate-50 border-b border-slate-200 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
              One-Stop Solution
            </p>
            <h2 className="mt-1 sm:mt-2 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Digital Citizen & Documentation Services
            </h2>
            <p className="mt-2 text-xs sm:text-base text-slate-600">
              High-speed printing, online form submission, scanning, photocopy, and official documentation at our center.
            </p>
          </div>

          {isAdminLoggedIn && onOpenAdminTab && (
            <button
              onClick={() => onOpenAdminTab('services')}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Manage Services
            </button>
          )}
        </div>

        {/* Specialized Stations Promo Grid (2 Primary Service Hubs) */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {/* Hub 1: Lok Seva Kendra & Bank CSP */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-900 to-slate-900 text-white flex flex-col justify-between border border-blue-800 shadow-md">
            <div>
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center justify-center">
                  <Landmark className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Bank BC Point
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                लोक सेवा केंद्र एवं बैंक ग्राहक सेवा केंद्र (CSP)
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Bank of Baroda, Maharashtra एवं CG Gramin Bank नकद लेन-देन, नया खाता, आय/जाति/निवास व खसरा B-1।
              </p>
            </div>

            <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-blue-800/80">
              <button
                onClick={() => setCurrentPage('lok-seva')}
                className="w-full py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <span>लोक सेवा केंद्र पेज खोलें</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Hub 2: PC Build & Repair */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white flex flex-col justify-between border border-slate-800 shadow-md">
            <div>
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Hardware Hub
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                Custom PC Build & Laptop Repair Hub
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Gaming व Office PC असेंबली, लाइव क्वोटेशन बिल्डर, और 30-मिनट एक्सप्रेस SSD व रैम अपग्रेड।
              </p>
            </div>

            <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-800">
              <button
                onClick={() => setCurrentPage('pc-build')}
                className="w-full py-2 sm:py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <span>PC Build & Repair खोलें</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Counter Services Section Subtitle */}
        <div className="mt-8 mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Center Counter Services
          </h3>
        </div>

        {/* Services Grid (Compact 2-columns on mobile, 3-columns on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5">
          {publishedServices.map((service) => {
            const Icon = getIcon(service.icon);
            return (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="group bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-3 sm:p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>

                    {service.estimatedTime && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {service.estimatedTime}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-2.5 sm:mt-3 text-xs sm:text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1">
                    {service.title}
                  </h3>

                  <p className="mt-1 text-[11px] sm:text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Footer Actions */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-1.5">
                  <span className="text-[11px] font-bold text-blue-700 group-hover:underline">
                    Details →
                  </span>

                  <button
                    onClick={(e) => handleWhatsAppService(service, e)}
                    className="p-1 sm:px-2 sm:py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] sm:text-xs font-semibold border border-emerald-200 transition-colors flex items-center gap-1"
                    title="Enquire on WhatsApp"
                  >
                    <MessageCircle className="w-3 h-3 text-emerald-600" />
                    <span className="hidden sm:inline">WhatsApp</span>
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
