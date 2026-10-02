import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Briefcase,
  Building,
  MapPin,
  GraduationCap,
  Calendar,
  Send,
  CheckCircle2,
  Clock,
  Phone
} from 'lucide-react';

export const JobModal: React.FC = () => {
  const { selectedJob, setSelectedJob, submitEnquiry, settings } = useApp();
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [candidate, setCandidate] = useState({
    name: '',
    mobile: '',
    email: '',
    experience: '',
    message: ''
  });
  const [applied, setApplied] = useState(false);

  if (!selectedJob) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidate.name.trim() || !candidate.mobile.trim()) return;

    submitEnquiry({
      name: candidate.name,
      mobile: candidate.mobile,
      email: candidate.email || 'N/A',
      subject: `Job Application: ${selectedJob.title} (${selectedJob.company})`,
      message: `Applicant Experience: ${candidate.experience || 'Fresher'}. Message: ${candidate.message || 'Applying for placement through Mayank Computer.'}`
    });

    setApplied(true);
  };

  const handleWhatsAppContact = () => {
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Hello Mayank Placement Cell! I would like to apply for the opening: "${selectedJob.title}" at "${selectedJob.company}". Please guide me on interview schedule.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-slate-100 relative bg-slate-50/50">
          <button
            onClick={() => {
              setSelectedJob(null);
              setShowApplyForm(false);
              setApplied(false);
            }}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
            {selectedJob.jobType}
          </span>

          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
            {selectedJob.title}
          </h3>

          <div className="flex flex-wrap items-center gap-4 mt-2 text-xs sm:text-sm text-slate-600 font-medium">
            <span className="flex items-center gap-1.5 font-bold text-slate-800">
              <Building className="w-4 h-4 text-blue-600" />
              {selectedJob.company}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400" />
              {selectedJob.location}
            </span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs border border-emerald-200">
              {selectedJob.salary}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[65vh] overflow-y-auto space-y-6">
          {applied ? (
            <div className="py-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 p-6 animate-in zoom-in-95">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-slate-900">
                Application Submitted!
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Your application for <strong>{selectedJob.title}</strong> has been registered with Mayank Computer Placement Cell. Our coordinator will contact you regarding document verification and interview interview slot.
              </p>
              <button
                onClick={() => setSelectedJob(null)}
                className="mt-6 px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800 transition-colors"
              >
                Done
              </button>
            </div>
          ) : showApplyForm ? (
            <form onSubmit={handleApply} className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h4 className="text-sm font-bold text-slate-900">
                  Candidate Application Form
                </h4>
                <p className="text-xs text-slate-500">
                  Applying for {selectedJob.title} at {selectedJob.company}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={candidate.name}
                  onChange={(e) => setCandidate({ ...candidate, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Phone <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit number"
                    value={candidate.mobile}
                    onChange={(e) => setCandidate({ ...candidate, mobile: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Prior Experience
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Fresher / 1 Year"
                    value={candidate.experience}
                    onChange={(e) => setCandidate({ ...candidate, experience: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={candidate.email}
                  onChange={(e) => setCandidate({ ...candidate, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Brief Note / Skills Profile
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention courses completed at Mayank Computer or typing speed / software skills..."
                  value={candidate.message}
                  onChange={(e) => setCandidate({ ...candidate, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowApplyForm(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Back to Details
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                >
                  Submit Application
                </button>
              </div>
            </form>
          ) : (
            <>
              {/* Job Specs */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Qualification</span>
                  <span className="font-bold text-slate-800 mt-0.5 block">
                    {selectedJob.qualification}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Experience Required</span>
                  <span className="font-bold text-slate-800 mt-0.5 block">
                    {selectedJob.experience}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Application Deadline</span>
                  <span className="font-bold text-slate-800 mt-0.5 block">
                    {selectedJob.lastDate}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Placement Coordinator</span>
                  <span className="font-bold text-blue-700 mt-0.5 block">
                    {selectedJob.applicationContact}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Job Responsibilities
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedJob.description}
                </p>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Desired Skills & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skillsRequired.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        {!applied && !showApplyForm && (
          <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              onClick={() => setSelectedJob(null)}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
            >
              Close
            </button>

            <button
              onClick={handleWhatsAppContact}
              className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contact via WhatsApp</span>
            </button>

            <button
              onClick={() => setShowApplyForm(true)}
              className="w-full sm:w-auto px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Apply Online</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
