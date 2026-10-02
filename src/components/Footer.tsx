import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Monitor,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  ArrowUp
} from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenVerify: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenVerify }) => {
  const { settings, courses, currentPage, setCurrentPage } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    if (id === 'lok-seva') {
      setCurrentPage('lok-seva');
      return;
    }
    if (id === 'pc-build') {
      setCurrentPage('pc-build');
      return;
    }
    const scrollToTarget = () => {
      const el = document.getElementById(id);
      if (el) {
        const headerOffset = 90;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      }
    };

    if (currentPage !== 'main') {
      setCurrentPage('main');
      setTimeout(scrollToTarget, 120);
      return;
    }
    scrollToTarget();
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs sm:text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black shadow-md">
                <Monitor className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-extrabold text-white tracking-tight">
                  MAYANK COMPUTER
                </span>
                <p className="text-xs text-slate-400 font-medium">
                  Computer Education & Digital Services
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-400 leading-relaxed max-w-sm">
              Dedicated to building job-ready computer professionals and providing trusted, 
              hassle-free digital services for citizens and local businesses since 2012.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={onOpenVerify}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Verify Student Certificate</span>
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { name: 'Home', id: 'home' },
                { name: 'About', id: 'about' },
                { name: 'Courses & Education', id: 'courses' },
                { name: 'Lok Seva Kendra', id: 'lok-seva' },
                { name: 'PC Build & Repair', id: 'pc-build' },
                { name: 'Services', id: 'services' },
                { name: 'Placement', id: 'placement' },
                { name: 'Gallery', id: 'gallery' },
                { name: 'Contact', id: 'contact' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Popular Courses */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Top Programs
            </h4>
            <ul className="space-y-2.5 text-xs">
              {courses.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => scrollTo('courses')}
                    className="hover:text-white transition-colors cursor-pointer truncate max-w-xs text-left block"
                  >
                    {c.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Institute Contact
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{settings.address}</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`tel:${settings.primaryPhone.replace(/\s+/g, '')}`} className="hover:text-white">
                  {settings.primaryPhone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white truncate">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-slate-400 text-[11px]">
                <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>{settings.openingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Mayank Computer. All Rights Reserved.</p>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>

            <span className="text-slate-800">|</span>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              title="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
