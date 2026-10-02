import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Award,
  BookOpen,
  CheckCircle,
  Briefcase,
  Users,
  Target,
  ShieldCheck,
  GraduationCap,
  Mail,
  Phone,
  Edit3
} from 'lucide-react';

interface AboutProps {
  onOpenAdminTab?: (tab: string) => void;
}

export const About: React.FC<AboutProps> = ({ onOpenAdminTab }) => {
  const { profile, isAdminLoggedIn } = useApp();

  return (
    <section id="about" className="py-10 sm:py-14 bg-white border-b border-slate-200 scroll-mt-24">
      {/* Anchor for backward compatibility with #profile links */}
      <div id="profile" className="scroll-mt-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
            About Mayank Computer & Leadership
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Pioneering Practical IT Skills & Community Digital Solutions
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            Established in 2012, Mayank Computer is dedicated to job-ready computer literacy, individual hands-on practice, and verified citizen digital documentation services.
          </p>
        </div>

        {/* 2-Column Compact Layout: Left is Institute Story, Right is Director Profile */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Institute Philosophy & Practical Approach */}
          <div className="lg:col-span-7 space-y-4 text-slate-700 leading-relaxed text-sm">
            <p>
              At <strong className="text-slate-900 font-semibold">Mayank Computer</strong>, 
              we believe that computer skills cannot be learned merely through blackboard lectures. 
              Whether you are an aspiring accountant mastering GST vouchers on Tally Prime, 
              a government job aspirant clocking 45 WPM in Hindi Kruti Dev typing, or a student learning MS Office, 
              every learner receives dedicated 1:1 machine practice.
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Our Institutional Guarantees
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>1 Student : 1 PC Guarantee:</strong> Full hands-on machine practice every single day.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Small Batch Mentorship:</strong> Only 10-12 students per batch for direct doubt clearing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Bilingual Teaching:</strong> Easy-to-understand coaching in Hindi & English with live assignments.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Unified Director & Lead Mentor Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-600/30 text-blue-400 border border-blue-500/30 flex items-center justify-center text-lg font-black">
                  {profile.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-white text-base leading-tight">
                    {profile.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    {profile.role || 'Director & Lead Instructor'}
                  </p>
                </div>
              </div>

              {isAdminLoggedIn && onOpenAdminTab && (
                <button
                  onClick={() => onOpenAdminTab('profile')}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 cursor-pointer"
                  title="Edit Director Profile in Admin"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-2 my-3 text-center">
              <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                <div className="text-base font-extrabold text-blue-400">{profile.experienceYears}+ Years</div>
                <div className="text-[10px] text-slate-400">Teaching Experience</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                <div className="text-base font-extrabold text-emerald-400">Govt. Certified</div>
                <div className="text-[10px] text-slate-400">Verified Instructor</div>
              </div>
            </div>

            {/* Bio & Qualifications */}
            <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
              {profile.bio}
            </p>

            {profile.qualifications && profile.qualifications.length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap gap-1">
                {profile.qualifications.slice(0, 3).map((q, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-[11px] bg-slate-800 text-slate-200 px-2 py-0.5 rounded border border-slate-700 font-medium"
                  >
                    <GraduationCap className="w-3 h-3 text-blue-400" />
                    {q}
                  </span>
                ))}
              </div>
            )}

            {/* Contact Pills */}
            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              {profile.privacySettings?.showPhone && (
                <span className="flex items-center gap-1.5 text-slate-300 text-[11px]">
                  <Phone className="w-3 h-3 text-emerald-400" />
                  {profile.contactPhone}
                </span>
              )}
              {profile.privacySettings?.showEmail && (
                <span className="flex items-center gap-1.5 text-slate-300 text-[11px] truncate max-w-[180px]">
                  <Mail className="w-3 h-3 text-blue-400" />
                  {profile.contactEmail}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
