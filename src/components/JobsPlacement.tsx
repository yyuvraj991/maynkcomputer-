import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { JobOpening } from '../types';
import {
  Briefcase,
  MapPin,
  GraduationCap,
  Calendar,
  Search,
  Building,
  ArrowRight,
  Filter,
  Plus,
  Send
} from 'lucide-react';

interface JobsPlacementProps {
  onOpenAdminTab?: (tab: string) => void;
}

export const JobsPlacement: React.FC<JobsPlacementProps> = ({ onOpenAdminTab }) => {
  const { jobs, setSelectedJob, openEnquiryModal, isAdminLoggedIn } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

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
    <section id="placement" className="py-10 sm:py-14 bg-white border-b border-slate-200 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Career Assistance
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Placement & Job Opportunities
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              We connect our trained computer students and skilled local candidates directly with reputable companies, firms, courts, and retail establishments.
            </p>
          </div>

          {isAdminLoggedIn && onOpenAdminTab && (
            <button
              onClick={() => onOpenAdminTab('jobs')}
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Post New Job
            </button>
          )}
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by job title, company, or skills (e.g. Tally, Excel)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Location Selector */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-blue-500"
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
              className="px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Job Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Trainee">Trainee</option>
            </select>
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wide">
                      {job.jobType}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-600 font-medium">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.company}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs sm:text-sm font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      {job.salary}
                    </span>
                  </div>
                </div>

                {/* Job Metadata Bar */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{job.qualification}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-3 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                {/* Required Skills Badges */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {job.skillsRequired.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] rounded font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                <div className="text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Last date: {job.lastDate}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="font-bold text-blue-700 hover:text-blue-800 transition-colors"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => setSelectedJob(job)}
                    className="px-3.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1"
                  >
                    <span>Apply Now</span>
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="mt-8 text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 text-slate-500">
            No job openings match your criteria. Check back soon or contact us for direct employer matching.
          </div>
        )}
      </div>
    </section>
  );
};
