import React from 'react';
import { useApp } from '../context/AppContext';
import {
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
  const { profile, education, isAdminLoggedIn } = useApp();

  return (
    <section id="about" className="py-8 sm:py-14 bg-white border-b border-slate-200 scroll-mt-24">
      {/* Anchor for backward compatibility with #profile and #education links */}
      <div id="profile" className="scroll-mt-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
            About Institute & Mentorship
          </p>
          <h2 className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Practical IT Training & Certified Faculty
          </h2>
          <p className="mt-2 text-xs sm:text-base text-slate-600 leading-relaxed">
            Serving students, job seekers, and Nagpura residents since 2012 with 1:1 computer practice and trusted digital assistance.
          </p>
        </div>

        {/* 2-Column Compact Layout */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
          {/* Left Column: Institute Philosophy & Guarantees */}
          <div className="lg:col-span-7 space-y-3.5 text-slate-700 leading-relaxed text-xs sm:text-sm">
            <p>
              At <strong className="text-slate-900 font-semibold">Mayank Computer</strong>, 
              we believe practical skills happen on the machine, not on a blackboard. 
              Whether mastering Tally Prime with GST, Hindi typing for court exams, or MS Office for corporate work, 
              every student gets dedicated individual screen time.
            </p>

            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Our Institutional Guarantees
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>1 Student : 1 PC Guarantee:</strong> Dedicated system for your entire batch slot.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Small Batch Mentorship:</strong> 10-12 students per batch for direct doubt clearing.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Bilingual Teaching:</strong> Easy-to-understand coaching in Hindi & English.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Director & Verified Faculty Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-600/30 text-blue-400 border border-blue-500/30 flex items-center justify-center text-base sm:text-lg font-black">
                  {profile.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm sm:text-base leading-tight">
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
            <div className="grid grid-cols-2 gap-2 my-2.5 text-center">
              <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                <div className="text-sm sm:text-base font-extrabold text-blue-400">{profile.experienceYears}+ Years</div>
                <div className="text-[10px] text-slate-400">Teaching Experience</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                <div className="text-sm sm:text-base font-extrabold text-emerald-400">Govt. Certified</div>
                <div className="text-[10px] text-slate-400">Verified Instructor</div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
              {profile.bio}
            </p>

            {/* Faculty Qualifications / Education Badges */}
            <div className="mt-2.5 pt-2.5 border-t border-slate-800/80">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                Faculty Qualifications
              </div>
              <div className="flex flex-wrap gap-1">
                {education && education.length > 0 ? (
                  education.map((edu) => (
                    <span
                      key={edu.id}
                      className="inline-flex items-center gap-1 text-[11px] bg-slate-800 text-slate-200 px-2 py-0.5 rounded border border-slate-700 font-medium"
                    >
                      <GraduationCap className="w-3 h-3 text-blue-400" />
                      {edu.qualification} ({edu.year})
                    </span>
                  ))
                ) : (
                  profile.qualifications?.map((q, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[11px] bg-slate-800 text-slate-200 px-2 py-0.5 rounded border border-slate-700 font-medium"
                    >
                      <GraduationCap className="w-3 h-3 text-blue-400" />
                      {q}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Contact Details */}
            <div className="mt-2.5 pt-2.5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              {profile.privacySettings?.showPhone && (
                <span className="flex items-center gap-1.5 text-slate-300 text-[11px]">
                  <Phone className="w-3 h-3 text-emerald-400" />
                  {profile.contactPhone}
                </span>
              )}
              {profile.privacySettings?.showEmail && (
                <span className="flex items-center gap-1.5 text-slate-300 text-[11px] truncate max-w-[160px]">
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
