import React from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap, Calendar, Building2, Award, Plus } from 'lucide-react';

interface EducationProps {
  onOpenAdminTab?: (tab: string) => void;
}

export const Education: React.FC<EducationProps> = ({ onOpenAdminTab }) => {
  const { education, isAdminLoggedIn } = useApp();

  return (
    <section id="education" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Credentials & Qualification
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Faculty & Academic Education
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl">
              Backed by authentic university degrees and industry certifications, ensuring learners receive verified, standard-compliant technical instruction.
            </p>
          </div>

          {isAdminLoggedIn && onOpenAdminTab && (
            <button
              onClick={() => onOpenAdminTab('education')}
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Manage Education in Admin
            </button>
          )}
        </div>

        {/* Education Timeline / Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="flex items-center gap-1.5 font-medium text-slate-600">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    {item.year}
                  </span>
                  {item.gradeOrScore && (
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] border border-emerald-200">
                      {item.gradeOrScore}
                    </span>
                  )}
                </div>

                {/* Qualification Title */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-start gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                  <span>{item.qualification}</span>
                </h3>

                {/* Institution */}
                <p className="mt-1.5 text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  {item.institution}
                </p>

                {/* Description */}
                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Key Competencies (clean unboxed inline layout) */}
              {item.keySkills && item.keySkills.length > 0 && (
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Key Competencies
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-xs text-slate-600">
                    {item.keySkills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
