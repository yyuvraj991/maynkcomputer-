import React from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  GraduationCap,
  Award,
  Clock,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Edit3
} from 'lucide-react';

interface ProfileProps {
  onOpenAdminTab?: (tab: string) => void;
}

export const Profile: React.FC<ProfileProps> = ({ onOpenAdminTab }) => {
  const { profile, isAdminLoggedIn } = useApp();

  return (
    <section id="profile" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Leadership & Mentorship
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Director Profile & Technical Expertise
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl">
              Meet the educator and technical director behind Mayank Computer. Direct mentorship from verified industry specialists.
            </p>
          </div>

          {isAdminLoggedIn && onOpenAdminTab && (
            <button
              onClick={() => onOpenAdminTab('profile')}
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
              Edit Profile & Privacy
            </button>
          )}
        </div>

        {/* Profile Card Container */}
        <div className="mt-12 bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Avatar & Overview */}
              <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 mb-5 text-4xl font-extrabold">
                  {profile.name.split(' ').map((n) => n[0]).join('')}
                </div>

                <h3 className="text-2xl font-extrabold text-slate-900">
                  {profile.name}
                </h3>
                <p className="text-sm font-semibold text-blue-700 mt-1">
                  {profile.role}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>{profile.experienceYears}+ Years Practical Teaching Experience</span>
                </div>

                {/* Privacy-controlled contact info */}
                <div className="mt-6 w-full space-y-3 pt-6 border-t border-slate-100 text-xs text-slate-600">
                  {profile.privacySettings.showEmail && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                      <a href={`mailto:${profile.contactEmail}`} className="hover:text-blue-700 truncate">
                        {profile.contactEmail}
                      </a>
                    </div>
                  )}

                  {profile.privacySettings.showPhone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                      <a href={`tel:${profile.contactPhone.replace(/\s+/g, '')}`} className="hover:text-blue-700">
                        {profile.contactPhone}
                      </a>
                    </div>
                  )}

                  {profile.privacySettings.showAddress && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{profile.address}</span>
                    </div>
                  )}

                  {!profile.privacySettings.showPhone && !profile.privacySettings.showEmail && (
                    <div className="text-[11px] text-slate-400 italic">
                      Direct contact details kept private by owner settings.
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Bio, Qualifications & Computer Skills */}
              <div className="lg:col-span-8 space-y-8">
                {/* Personal Bio */}
                {profile.privacySettings.showPersonalBio && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      About the Director
                    </h4>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                      {profile.bio}
                    </p>
                  </div>
                )}

                {/* Academic & Professional Credentials */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-blue-700" />
                    <span>Academic Degrees & Certifications</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                    {profile.qualifications.map((qual, idx) => (
                      <li key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-medium">{qual}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Computer Skills Matrix */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-blue-700" />
                    <span>Technical & Computer Skills Specialization</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {profile.skills.map((skillGroup, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white">
                        <h5 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-1.5 mb-2 text-blue-800">
                          {skillGroup.category}
                        </h5>
                        <div className="flex flex-wrap gap-1.5">
                          {skillGroup.items.map((item, iIdx) => (
                            <span
                              key={iIdx}
                              className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
