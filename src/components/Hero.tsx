import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowRight,
  Monitor,
  CheckCircle2,
  Users,
  Award,
  Zap,
  PhoneCall,
  GraduationCap
} from 'lucide-react';

interface HeroProps {
  onOpenAdmissionModal: () => void;
  onOpenVerify: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAdmissionModal, onOpenVerify }) => {
  const { openEnquiryModal, settings } = useApp();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative overflow-hidden bg-slate-950 text-white pt-10 pb-14 sm:pt-14 sm:pb-18 scroll-mt-24">
      {/* High-visibility Computer Institute Training Lab Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2000&q=80')`
        }}
      >
        {/* Semi-transparent dark overlay so the background image is clearly visible throughout */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/55 to-slate-950/65" />
        <div className="absolute inset-0 bg-slate-950/20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3 bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 rounded-md backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Trusted Computer Training & Digital Center Since 2012
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12] drop-shadow-lg">
              Welcome to <br />
              <span className="text-white">
                Mayank Computer
              </span>
            </h1>

            <p className="mt-3 text-base sm:text-lg text-slate-100 font-medium leading-relaxed max-w-2xl drop-shadow-md">
              Computer Education, Digital Services & Career Guidance
            </p>

            <p className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl drop-shadow-md">
              Empowering students, job seekers, and local citizens with job-ready practical computer courses (MS Office, Excel, Tally, Typing) and express digital documentation services.
            </p>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => scrollTo('courses')}
                className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 hover:translate-y-[-1px] cursor-pointer"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="w-full sm:w-auto px-5 py-3 bg-slate-800/90 hover:bg-slate-700 text-slate-100 font-semibold text-xs sm:text-sm rounded-xl border border-slate-700 backdrop-blur-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Contact Us</span>
              </button>

              <button
                onClick={onOpenAdmissionModal}
                className="w-full sm:w-auto px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm rounded-xl border border-emerald-500/50 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-white" />
                <span>Online Admission</span>
              </button>
            </div>

            {/* Feature Highlights Row */}
            <div className="mt-6 pt-5 border-t border-slate-800/80 w-full grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1 Student : 1 PC Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hindi & English Typing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Govt Recognized Certificate</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Compact Summary Card (No duplicated bullets) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl bg-slate-900/90 border border-slate-700/80 p-5 sm:p-6 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center border border-slate-700">
                    <Monitor className="w-5 h-5 text-slate-200" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-base tracking-tight">
                      Mayank Computer Institute
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      Nagpura, Durg (C.G.)
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 rounded-full border border-emerald-800">
                  Open Mon - Sat
                </span>
              </div>

              {/* Lab Schedule & Key Info */}
              <div className="my-4 p-3 rounded-xl bg-slate-800/50 border border-slate-700/40 text-xs text-slate-300 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Morning Batches:</span>
                  <span className="font-bold text-white">08:00 AM – 12:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Evening Batches:</span>
                  <span className="font-bold text-white">03:00 PM – 07:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Lab Atmosphere:</span>
                  <span className="font-bold text-emerald-400">AC Lab + Power Backup</span>
                </div>
              </div>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-3 gap-2.5 text-center border-t border-slate-800 pt-4">
                <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <div className="text-lg sm:text-xl font-black text-white">12+</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Years Exp.</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <div className="text-lg sm:text-xl font-black text-white">5,000+</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Students</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <div className="text-lg sm:text-xl font-black text-emerald-400">100%</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Practical</div>
                </div>
              </div>

              {/* Quick Action Strip */}
              <div className="mt-4 pt-3 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800">
                <span className="flex items-center gap-1.5 text-slate-300 text-[11px]">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  New Batches Starting
                </span>
                <button
                  onClick={() => openEnquiryModal('Fast Track Admissions')}
                  className="font-bold text-emerald-400 hover:text-emerald-300 underline cursor-pointer text-xs"
                >
                  Book Seat Now →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
