import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Briefcase,
  MapPin,
  GraduationCap,
  Calendar,
  Search,
  Building,
  Plus,
  Send,
  ArrowRight
} from 'lucide-react';

interface JobsPlacementProps {
  onOpenAdminTab?: (tab: string) => void;
}

export const JobsPlacement: React.FC<JobsPlacementProps> = ({ onOpenAdminTab }) => {
  const { jobs, setSelectedJob, isAdminLoggedIn } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showAllMobile, setShowAllMobile] = useState(false);

  const activeJobs = jobs.filter((j) => j.status === 'active' || isAdminLoggedIn);

  // Extract unique locations
  const locations = Array.from(new Set(activeJobs.map((j) => j.location.split('/')[0].trim())));

  const filteredJobs = activeJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skillsRequired.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesLocation =
      selectedLocation === 'all' || job.location.toLowerCase().includes(selectedLocation.toLowerCase());

    const matchesType =
      selectedType === 'all' || job.jobType === selectedType;

    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <section id="placement" className="py-8 sm:py-14 bg-white border-b border-slate-200 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Career Assistance
            </p>
            <h2 className="mt-1 sm:mt-2 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Placement & Job Opportunities
            </h2>
            <p className="mt-2 text-xs sm:text-base text-slate-600">
              Direct recruitment assistance for students with local businesses, courts, firms, and digital centers.
            </p>
          </div>

          {isAdminLoggedIn && onOpenAdminTab && (
            <button
              onClick={() => onOpenAdminTab('jobs')}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Post New Job
            </button>
          )}
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-6 p-2.5 sm:p-4 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl flex flex-col md:flex-row gap-2 sm:gap-3 items-center">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search job title, skills (Tally, Excel)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg sm:rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            {/* Location Selector */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="flex-1 sm:flex-none px-2.5 py-2 bg-white border border-slate-200 rounded-lg sm:rounded-xl text-xs text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Locations</option>
              {locations.map((loc, idx) => (
                <option key={idx} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            {/* Job Type Selector */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="flex-1 sm:flex-none px-2.5 py-2 bg-white border border-slate-200 rounded-lg sm:rounded-xl text-xs text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Trainee">Trainee</option>
            </select>
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
          {filteredJobs.map((job, index) => {
            const isHiddenOnMobile = !showAllMobile && index >= 2;

            return (
              <div
                key={job.id}
                className={`bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex-col justify-between ${
                  isHiddenOnMobile ? 'hidden md:flex' : 'flex'
                }`}
              >
                <div>
                  {/* Header Row */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] sm:text-[11px] font-semibold text-blue-700 uppercase tracking-wide">
                        {job.jobType}
                      </span>
                      <h3 className="text-sm sm:text-lg font-bold text-slate-900 mt-0.5">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-600 font-medium">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        <span>{job.company}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs sm:text-sm font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {job.salary}
                      </span>
                    </div>
                  </div>

                  {/* Job Metadata Bar */}
                  <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] sm:text-xs text-slate-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{job.qualification}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Required Skills Badges */}
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {job.skillsRequired.slice(0, 3).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] sm:text-[11px] rounded font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                  <div className="text-slate-400 text-[10px] sm:text-xs flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Last date: {job.lastDate}</span>
                  </div>

                  <button
                    onClick={() => setSelectedJob(job)}
                    className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1 text-xs"
                  >
                    <span>Apply Now</span>
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View All Jobs Toggle */}
        {filteredJobs.length > 2 && (
          <div className="mt-4 text-center md:hidden">
            {!showAllMobile ? (
              <button
                onClick={() => setShowAllMobile(true)}
                className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl border border-blue-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View All Openings ({filteredJobs.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => setShowAllMobile(false)}
                className="py-1.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
              >
                Show Less
              </button>
            )}
          </div>
        )}

        {filteredJobs.length === 0 && (
          <div className="mt-6 text-center py-10 bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs sm:text-sm">
            No job openings match your criteria. Contact us for direct employer matching.
          </div>
        )}
      </div>
    </section>
  );
};
