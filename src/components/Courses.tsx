import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Course } from '../types';
import {
  Clock,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  Plus
} from 'lucide-react';

interface CoursesProps {
  onOpenAdminTab?: (tab: string) => void;
}

export const Courses: React.FC<CoursesProps> = ({ onOpenAdminTab }) => {
  const { courses, setSelectedCourse, settings, isAdminLoggedIn } = useApp();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showAllMobile, setShowAllMobile] = useState<boolean>(false);

  const publishedCourses = courses.filter(
    (c) => c.status === 'published' || isAdminLoggedIn
  );

  const filteredCourses = filterCategory === 'all'
    ? publishedCourses
    : publishedCourses.filter((c) => c.category === filterCategory);

  const handleWhatsAppEnquiry = (course: Course, e: React.MouseEvent) => {
    e.stopPropagation();
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Hello Mayank Computer! I am interested in joining the "${course.title}" course (${course.duration}). Please share admission details, syllabus, and next batch timings.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <section id="courses" className="py-8 sm:py-14 bg-white border-b border-slate-200 scroll-mt-24">
      {/* Anchor for backward compatibility with #education links */}
      <div id="education" className="scroll-mt-24" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Job-Oriented Training
            </p>
            <h2 className="mt-1 sm:mt-2 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Computer Courses & Certifications
            </h2>
            <p className="mt-2 text-xs sm:text-base text-slate-600">
              100% practical lab training diplomas, typing certifications, and corporate accounting skills.
            </p>
          </div>

          {isAdminLoggedIn && onOpenAdminTab && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onOpenAdminTab('courses')}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Manage Courses
              </button>
            </div>
          )}
        </div>

        {/* Category Filter Bar */}
        <div className="mt-6 flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl max-w-fit">
          {[
            { id: 'all', label: 'All Courses' },
            { id: 'fundamentals', label: 'Fundamentals' },
            { id: 'office', label: 'MS Office' },
            { id: 'advanced', label: 'Accounting & Tally' },
            { id: 'typing', label: 'Typing' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setFilterCategory(cat.id);
                setShowAllMobile(false);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                filterCategory === cat.id
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Courses Cards Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredCourses.map((course, index) => {
            const isHiddenOnMobile = !showAllMobile && index >= 3;

            return (
              <div
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                className={`group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-blue-400 hover:shadow-lg transition-all duration-200 flex-col cursor-pointer ${
                  isHiddenOnMobile ? 'hidden md:flex' : 'flex'
                }`}
              >
                {/* Course Thumbnail Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                    <span className="bg-slate-900/80 backdrop-blur-sm text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      {course.category}
                    </span>
                    {course.certificateProvided && (
                      <span className="bg-emerald-600 text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded shadow-xs">
                        Govt. Certificate
                      </span>
                    )}
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        {course.duration}
                      </span>
                      <span>•</span>
                      <span className="truncate">{course.eligibility}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                      {course.title}
                    </h3>

                    <p className="mt-1.5 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {course.shortDescription}
                    </p>

                    {/* Highlights Topics Teaser */}
                    <div className="mt-3 space-y-1">
                      {course.topics.slice(0, 2).map((topic, tIdx) => (
                        <div key={tIdx} className="flex items-start gap-1.5 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-800 transition-colors"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={(e) => handleWhatsAppEnquiry(course, e)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors"
                      title="Enquire on WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View All / Show Less Toggle Button */}
        {filteredCourses.length > 3 && (
          <div className="mt-5 text-center md:hidden">
            {!showAllMobile ? (
              <button
                onClick={() => setShowAllMobile(true)}
                className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl border border-blue-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View All Courses ({filteredCourses.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => setShowAllMobile(false)}
                className="py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
              >
                Show Less
              </button>
            )}
          </div>
        )}

        {filteredCourses.length === 0 && (
          <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs sm:text-sm">
            No courses found in this category.
          </div>
        )}
      </div>
    </section>
  );
};
