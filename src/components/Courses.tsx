import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Course } from '../types';
import {
  Clock,
  BookOpen,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  Plus,
  GraduationCap,
  Calendar,
  Building2
} from 'lucide-react';

interface CoursesProps {
  onOpenAdminTab?: (tab: string) => void;
}

export const Courses: React.FC<CoursesProps> = ({ onOpenAdminTab }) => {
  const { courses, education, setSelectedCourse, settings, isAdminLoggedIn } = useApp();
  const [activeTab, setActiveTab] = useState<'courses' | 'education'>('courses');
  const [filterCategory, setFilterCategory] = useState<string>('all');

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
    <section id="courses" className="py-10 sm:py-14 bg-white border-b border-slate-200 scroll-mt-24">
      {/* Anchor for backward compatibility with #education links */}
      <div id="education" className="scroll-mt-24" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Training & Academic Credentials
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Courses & Education
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Job-oriented computer training diplomas, practical skill programs, and faculty university qualifications — all in one place.
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
              <button
                onClick={() => onOpenAdminTab('education')}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Manage Education
              </button>
            </div>
          )}
        </div>

        {/* Primary Toggle: Courses vs Academic Education */}
        <div className="mt-8 flex items-center gap-2 border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveTab('courses')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'courses'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Computer Courses</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                activeTab === 'courses'
                  ? 'bg-blue-800 text-blue-100'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {publishedCourses.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('education')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'education'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Academic Education & Credentials</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                activeTab === 'education'
                  ? 'bg-blue-800 text-blue-100'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {education.length}
            </span>
          </button>
        </div>

        {/* TAB 1: COMPUTER COURSES */}
        {activeTab === 'courses' && (
          <div className="mt-6">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl max-w-fit mb-8">
              {[
                { id: 'all', label: 'All Courses' },
                { id: 'fundamentals', label: 'Fundamentals' },
                { id: 'office', label: 'MS Office Suite' },
                { id: 'advanced', label: 'Advanced & Accounting' },
                { id: 'typing', label: 'Typing' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilterCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => setSelectedCourse(course)}
                  className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-blue-400 hover:shadow-lg transition-all duration-200 flex flex-col cursor-pointer"
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
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                        {course.category}
                      </span>
                      {course.certificateProvided && (
                        <span className="bg-emerald-600 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-xs">
                          Govt. Certificate
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-blue-600" />
                          {course.duration}
                        </span>
                        <span>•</span>
                        <span className="truncate">{course.eligibility}</span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                        {course.title}
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {course.shortDescription}
                      </p>

                      {/* Highlights Topics Teaser */}
                      <div className="mt-4 space-y-1.5">
                        {course.topics.slice(0, 3).map((topic, tIdx) => (
                          <div key={tIdx} className="flex items-start gap-2 text-xs text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{topic}</span>
                          </div>
                        ))}
                        {course.topics.length > 3 && (
                          <p className="text-[11px] text-blue-600 font-medium pl-5">
                            +{course.topics.length - 3} more modules in syllabus
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setSelectedCourse(course)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800 transition-colors"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={(e) => handleWhatsAppEnquiry(course, e)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-lg border border-emerald-200 transition-colors"
                        title="Enquire on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 text-slate-500">
                No courses found in this category.
              </div>
            )}
          </div>
        )}

        {/* TAB 2: FACULTY & ACADEMIC EDUCATION */}
        {activeTab === 'education' && (
          <div className="mt-6">
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Faculty Qualifications & Academic Excellence
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Backed by authentic university degrees and industry certifications, ensuring learners receive verified, standard-compliant technical instruction.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((item) => (
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

                  {/* Key Competencies */}
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
        )}
      </div>
    </section>
  );
};
