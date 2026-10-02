import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, GraduationCap, CheckCircle2, Send, Clock, BookOpen } from 'lucide-react';

export const StudentAdmissionModal: React.FC = () => {
  const { isStudentRegModalOpen, setIsStudentRegModalOpen, submitEnquiry, courses } = useApp();

  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    mobile: '',
    email: '',
    courseId: courses[0]?.id || '',
    batchTiming: 'Morning (8:00 AM - 10:00 AM)',
    educationLevel: '12th Pass',
    address: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isStudentRegModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName.trim() || !formData.mobile.trim()) return;

    const courseObj = courses.find((c) => c.id === formData.courseId);
    const courseTitle = courseObj ? courseObj.title : 'General Admission';

    submitEnquiry({
      name: formData.studentName,
      mobile: formData.mobile,
      email: formData.email,
      subject: `Online Admission: ${courseTitle}`,
      message: `Father: ${formData.fatherName}, Batch Timing: ${formData.batchTiming}, Qualification: ${formData.educationLevel}, Address: ${formData.address}`
    });

    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in"
      onClick={() => {
        setIsStudentRegModalOpen(false);
        setSubmitted(false);
      }}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Admissions 2026
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                Online Student Admission Form
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              setIsStudentRegModalOpen(false);
              setSubmitted(false);
            }}
            className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center bg-white space-y-4">
            <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
            <h4 className="text-xl font-bold text-slate-900">
              Admission Registration Received!
            </h4>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Your provisional admission form has been registered with Mayank Computer. Our admission desk will call you to confirm your batch slot, lab seat, and issue your student roll number.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setIsStudentRegModalOpen(false);
                  setSubmitted(false);
                }}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Close & Continue
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 max-h-[75vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Student Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Student name"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Father's Name
                </label>
                <input
                  type="text"
                  placeholder="Father's name"
                  value={formData.fatherName}
                  onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number (WhatsApp) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit number"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="student@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Select Course For Admission
              </label>
              <select
                value={formData.courseId}
                onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} — {c.duration} {c.fee ? `(${c.fee})` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred Batch Timing
                </label>
                <select
                  value={formData.batchTiming}
                  onChange={(e) => setFormData({ ...formData, batchTiming: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600"
                >
                  <option value="Morning (8:00 AM - 10:00 AM)">Morning (8:00 AM - 10:00 AM)</option>
                  <option value="Midday (10:00 AM - 12:00 PM)">Midday (10:00 AM - 12:00 PM)</option>
                  <option value="Afternoon (1:00 PM - 3:00 PM)">Afternoon (1:00 PM - 3:00 PM)</option>
                  <option value="Evening (4:00 PM - 6:00 PM)">Evening (4:00 PM - 6:00 PM)</option>
                  <option value="Late Evening (6:00 PM - 8:00 PM)">Late Evening (6:00 PM - 8:00 PM)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Current Qualification
                </label>
                <select
                  value={formData.educationLevel}
                  onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600"
                >
                  <option value="10th Pass / High School">10th Pass / High School</option>
                  <option value="12th Pass (Any Stream)">12th Pass (Any Stream)</option>
                  <option value="Graduate (BA/B.Sc/B.Com)">Graduate (BA/B.Sc/B.Com)</option>
                  <option value="Post Graduate">Post Graduate</option>
                  <option value="Other / School Student">Other / School Student</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Residential Address / Locality
              </label>
              <textarea
                rows={2}
                placeholder="Village / Mohalla / City area..."
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600 resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsStudentRegModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Admission Form</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
