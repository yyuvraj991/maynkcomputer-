import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Menu,
  X,
  Phone,
  Monitor,
  GraduationCap,
  ShieldCheck,
  Award
} from 'lucide-react';

interface HeaderProps {
  onOpenAdmin: () => void;
  onOpenVerify: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAdmin, onOpenVerify }) => {
  const { settings, openEnquiryModal, isAdminLoggedIn, currentPage, setCurrentPage } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; href: string; page: 'main' | 'pc-build' | 'lok-seva'; badge?: string }[] = [
    { label: 'Courses & Education', href: '#courses', page: 'main' },
    { label: 'Lok Seva Kendra', href: '#lok-seva', page: 'lok-seva', badge: 'BC Point' },
    { label: 'PC Build & Repair', href: '#pc-build', page: 'pc-build', badge: 'Hardware' },
    { label: 'Services', href: '#services', page: 'main' },
    { label: 'Placement', href: '#placement', page: 'main' },
    { label: 'Contact', href: '#contact', page: 'main' },
  ];

  const scrollToElement = (selector: string) => {
    const target = document.querySelector(selector);
    if (target) {
      const headerOffset = 90;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    }
  };

  const handleNavClick = (href: string, pageTarget?: 'main' | 'pc-build' | 'lok-seva') => {
    setMobileMenuOpen(false);
    if (pageTarget === 'lok-seva' || href === '#lok-seva') {
      setCurrentPage('lok-seva');
      return;
    }
    if (pageTarget === 'pc-build' || href === '#pc-build') {
      setCurrentPage('pc-build');
      return;
    }
    if (currentPage !== 'main') {
      setCurrentPage('main');
      setTimeout(() => {
        scrollToElement(href);
      }, 120);
      return;
    }
    scrollToElement(href);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200'
          : 'bg-white border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Tagline */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus-visible:outline-blue-600 rounded-lg"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-700 text-white flex items-center justify-center font-black shadow-md shadow-blue-500/20 group-hover:bg-blue-800 transition-colors">
              <Monitor className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                  MAYANK COMPUTER
                </span>
                {isAdminLoggedIn && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Admin Active
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Computer Education & Digital Services
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive =
                (item.page === 'lok-seva' && currentPage === 'lok-seva') ||
                (item.page === 'pc-build' && currentPage === 'pc-build');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href, item.page);
                  }}
                  className={`text-sm font-semibold transition-colors relative py-1 focus-visible:outline-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600 after:transition-transform flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'text-blue-700 font-bold after:scale-x-100'
                      : 'text-slate-600 hover:text-blue-700 after:scale-x-0 hover:after:scale-x-100'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 tracking-wider">
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenVerify}
              className="text-xs font-semibold text-slate-700 hover:text-blue-700 flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors"
              title="Verify Student Certificate"
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span>Verify Certificate</span>
            </button>

            <button
              onClick={() => openEnquiryModal('General Admission / Service Enquiry')}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm hover:shadow transition-all active:scale-[0.98] cursor-pointer"
            >
              Enquire Now
            </button>

            <button
              onClick={onOpenAdmin}
              className={`p-2 rounded-lg transition-colors border ${
                isAdminLoggedIn
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
              title="Admin Panel"
              aria-label="Admin Portal"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => openEnquiryModal()}
              className="px-3 py-1.5 text-xs font-bold text-white bg-blue-700 rounded-md"
            >
              Enquire
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg border border-slate-200 focus-visible:outline-blue-600"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 animate-in slide-in-from-top-4">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive =
                (item.page === 'lok-seva' && currentPage === 'lok-seva') ||
                (item.page === 'pc-build' && currentPage === 'pc-build');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href, item.page);
                  }}
                  className={`px-3 py-2 text-base font-semibold rounded-lg transition-colors flex items-center justify-between ${
                    isActive
                      ? 'text-blue-700 bg-blue-50 font-bold'
                      : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVerify();
              }}
              className="w-full py-2.5 px-4 text-sm font-semibold text-slate-700 border border-slate-200 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-50"
            >
              <Award className="w-4 h-4 text-amber-600" />
              Verify Certificate
            </button>

            <a
              href={`tel:${settings.primaryPhone.replace(/\s+/g, '')}`}
              className="w-full py-2.5 px-4 text-sm font-semibold text-slate-700 border border-slate-200 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-50"
            >
              <Phone className="w-4 h-4 text-blue-600" />
              Call: {settings.primaryPhone}
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2 px-4 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-200"
            >
              <ShieldCheck className="w-4 h-4" />
              {isAdminLoggedIn ? 'Open Admin Dashboard' : 'Admin Login'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
