import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Course, DigitalService, JobOpening, EducationRecord, GalleryItem } from '../../types';
import {
  X,
  Lock,
  LogOut,
  LayoutDashboard,
  BookOpen,
  Cpu,
  GraduationCap,
  Briefcase,
  Image as ImageIcon,
  User,
  Settings as SettingsIcon,
  Inbox,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Phone,
  MessageCircle,
  Eye,
  EyeOff,
  RotateCcw
} from 'lucide-react';

interface AdminModalProps {
  initialTab?: string;
}

export const AdminModal: React.FC<AdminModalProps> = ({ initialTab = 'dashboard' }) => {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    courses,
    services,
    jobs,
    education,
    gallery,
    profile,
    settings,
    enquiries,
    addCourse,
    updateCourse,
    deleteCourse,
    toggleCourseStatus,
    addService,
    updateService,
    deleteService,
    addJob,
    updateJob,
    deleteJob,
    toggleJobStatus,
    addEducation,
    updateEducation,
    deleteEducation,
    addGalleryItem,
    deleteGalleryItem,
    updateProfile,
    updateSettings,
    updateEnquiryStatus,
    deleteEnquiry,
    resetAllData
  } = useApp();

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Editing state trackers
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [courseFormData, setCourseFormData] = useState({
    title: '',
    category: 'fundamentals' as Course['category'],
    shortDescription: '',
    fullDescription: '',
    duration: '2 Months',
    eligibility: '10th Pass or Any',
    topicsText: 'Module 1\nModule 2\nModule 3',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    fee: '₹1,500',
    certificateProvided: true,
    status: 'published' as 'published' | 'draft'
  });

  // Services form state
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceFormData, setServiceFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    icon: 'Monitor',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    estimatedTime: '15-20 Mins',
    priceEstimate: '₹50',
    featuresText: 'Feature 1\nFeature 2\nFeature 3',
    status: 'published' as 'published' | 'draft'
  });

  // Jobs form state
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [jobFormData, setJobFormData] = useState({
    title: '',
    company: '',
    location: 'City Center',
    qualification: '12th Pass',
    experience: '0 - 1 Year',
    salary: '₹12,000 - ₹15,000',
    description: '',
    skillsText: 'MS Office, Typing, Communication',
    jobType: 'Full-time' as JobOpening['jobType'],
    lastDate: '2026-11-30',
    applicationContact: '+91 98765 43210',
    status: 'active' as JobOpening['status']
  });

  // Education form state
  const [editingEduId, setEditingEduId] = useState<string | null>(null);
  const [eduFormData, setEduFormData] = useState({
    qualification: '',
    institution: '',
    year: '2020 - 2023',
    gradeOrScore: 'First Class',
    description: '',
    skillsText: 'Advanced Computing, Practical Labs'
  });

  // Gallery form state
  const [newGalleryPhoto, setNewGalleryPhoto] = useState({
    title: '',
    category: 'lab' as GalleryItem['category'],
    image: '',
    description: ''
  });

  if (!isAdminModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(passwordInput);
    if (!success) {
      setLoginError(true);
    } else {
      setLoginError(false);
      setPasswordInput('');
    }
  };

  // Course save handler
  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const topics = courseFormData.topicsText
      .split('\n')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      slug: courseFormData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: courseFormData.title,
      category: courseFormData.category,
      shortDescription: courseFormData.shortDescription,
      fullDescription: courseFormData.fullDescription,
      duration: courseFormData.duration,
      eligibility: courseFormData.eligibility,
      topics,
      image: courseFormData.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      fee: courseFormData.fee,
      certificateProvided: courseFormData.certificateProvided,
      status: courseFormData.status
    };

    if (editingCourseId) {
      updateCourse(editingCourseId, payload);
    } else {
      addCourse(payload);
    }

    setEditingCourseId(null);
    setCourseFormData({
      title: '',
      category: 'fundamentals',
      shortDescription: '',
      fullDescription: '',
      duration: '2 Months',
      eligibility: '10th Pass or Any',
      topicsText: 'Module 1\nModule 2\nModule 3',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      fee: '₹1,500',
      certificateProvided: true,
      status: 'published'
    });
  };

  const handleStartEditCourse = (course: Course) => {
    setEditingCourseId(course.id);
    setCourseFormData({
      title: course.title,
      category: course.category,
      shortDescription: course.shortDescription,
      fullDescription: course.fullDescription,
      duration: course.duration,
      eligibility: course.eligibility,
      topicsText: course.topics.join('\n'),
      image: course.image,
      fee: course.fee || '',
      certificateProvided: course.certificateProvided,
      status: course.status
    });
  };

  // Service save handler
  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    const features = serviceFormData.featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const payload = {
      slug: serviceFormData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: serviceFormData.title,
      shortDescription: serviceFormData.shortDescription,
      fullDescription: serviceFormData.fullDescription,
      icon: serviceFormData.icon,
      image: serviceFormData.image,
      estimatedTime: serviceFormData.estimatedTime,
      priceEstimate: serviceFormData.priceEstimate,
      features,
      status: serviceFormData.status
    };

    if (editingServiceId) {
      updateService(editingServiceId, payload);
    } else {
      addService(payload);
    }

    setEditingServiceId(null);
    setServiceFormData({
      title: '',
      shortDescription: '',
      fullDescription: '',
      icon: 'Monitor',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
      estimatedTime: '15-20 Mins',
      priceEstimate: '₹50',
      featuresText: 'Feature 1\nFeature 2\nFeature 3',
      status: 'published'
    });
  };

  const handleStartEditService = (service: DigitalService) => {
    setEditingServiceId(service.id);
    setServiceFormData({
      title: service.title,
      shortDescription: service.shortDescription,
      fullDescription: service.fullDescription,
      icon: service.icon,
      image: service.image,
      estimatedTime: service.estimatedTime,
      priceEstimate: service.priceEstimate || '',
      featuresText: service.features.join('\n'),
      status: service.status
    });
  };

  // Job save handler
  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    const skillsRequired = jobFormData.skillsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title: jobFormData.title,
      company: jobFormData.company,
      location: jobFormData.location,
      qualification: jobFormData.qualification,
      experience: jobFormData.experience,
      salary: jobFormData.salary,
      description: jobFormData.description,
      skillsRequired,
      jobType: jobFormData.jobType,
      lastDate: jobFormData.lastDate,
      applicationContact: jobFormData.applicationContact,
      status: jobFormData.status
    };

    if (editingJobId) {
      updateJob(editingJobId, payload);
    } else {
      addJob(payload);
    }

    setEditingJobId(null);
    setJobFormData({
      title: '',
      company: '',
      location: 'City Center',
      qualification: '12th Pass',
      experience: '0 - 1 Year',
      salary: '₹12,000 - ₹15,000',
      description: '',
      skillsText: 'MS Office, Typing, Communication',
      jobType: 'Full-time',
      lastDate: '2026-11-30',
      applicationContact: '+91 98765 43210',
      status: 'active'
    });
  };

  const handleStartEditJob = (job: JobOpening) => {
    setEditingJobId(job.id);
    setJobFormData({
      title: job.title,
      company: job.company,
      location: job.location,
      qualification: job.qualification,
      experience: job.experience,
      salary: job.salary,
      description: job.description,
      skillsText: job.skillsRequired.join(', '),
      jobType: job.jobType,
      lastDate: job.lastDate,
      applicationContact: job.applicationContact,
      status: job.status
    });
  };

  // Education save handler
  const handleSaveEducation = (e: React.FormEvent) => {
    e.preventDefault();
    const keySkills = eduFormData.skillsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      qualification: eduFormData.qualification,
      institution: eduFormData.institution,
      year: eduFormData.year,
      gradeOrScore: eduFormData.gradeOrScore,
      description: eduFormData.description,
      keySkills
    };

    if (editingEduId) {
      updateEducation(editingEduId, payload);
    } else {
      addEducation(payload);
    }

    setEditingEduId(null);
    setEduFormData({
      qualification: '',
      institution: '',
      year: '2020 - 2023',
      gradeOrScore: 'First Class',
      description: '',
      skillsText: 'Advanced Computing, Practical Labs'
    });
  };

  const handleStartEditEducation = (edu: EducationRecord) => {
    setEditingEduId(edu.id);
    setEduFormData({
      qualification: edu.qualification,
      institution: edu.institution,
      year: edu.year,
      gradeOrScore: edu.gradeOrScore || '',
      description: edu.description,
      skillsText: edu.keySkills.join(', ')
    });
  };

  // Gallery add handler
  const handleAddGalleryPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryPhoto.title || !newGalleryPhoto.image) return;

    addGalleryItem({
      title: newGalleryPhoto.title,
      category: newGalleryPhoto.category,
      image: newGalleryPhoto.image,
      description: newGalleryPhoto.description || 'Institute training activity.'
    });

    setNewGalleryPhoto({
      title: '',
      category: 'lab',
      image: '',
      description: ''
    });
  };

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'new').length;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in"
      onClick={() => setIsAdminModalOpen(false)}
    >
      <div
        className="bg-white rounded-3xl max-w-5xl w-full h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-sm">
              MC
            </div>
            <div>
              <h2 className="text-base font-extrabold tracking-tight">
                Mayank Computer — Admin Center
              </h2>
              <p className="text-[11px] text-slate-400">
                Course, Service, Job, Gallery & Enquiries Administration
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <button
                onClick={logoutAdmin}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            )}

            <button
              onClick={() => setIsAdminModalOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Not Logged In View */}
        {!isAdminLoggedIn ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200 shadow-md">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-center text-slate-900">
                Admin Authentication
              </h3>
              <p className="text-xs text-slate-500 text-center mt-1">
                Enter your password to manage institute content, courses, job postings, and incoming enquiries.
              </p>

              <form onSubmit={handleLogin} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Admin Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter admin password (hint: admin123)"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setLoginError(false);
                    }}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600"
                  />
                  {loginError && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Invalid password. Default demo password is <strong>admin123</strong>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Log In to Admin
                </button>

                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-[11px] text-blue-800">
                  💡 <strong>Demo Access:</strong> Use password <code className="font-mono bg-blue-100 px-1 py-0.5 rounded">admin123</code> to access and test all management controls.
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Logged In View with Tabs */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-60 bg-slate-50 border-r border-slate-200 p-3 shrink-0 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { id: 'enquiries', label: `Enquiries (${newEnquiriesCount})`, icon: Inbox },
                { id: 'courses', label: `Courses (${courses.length})`, icon: BookOpen },
                { id: 'services', label: `Services (${services.length})`, icon: Cpu },
                { id: 'jobs', label: `Jobs (${jobs.length})`, icon: Briefcase },
                { id: 'education', label: `Education (${education.length})`, icon: GraduationCap },
                { id: 'gallery', label: `Gallery (${gallery.length})`, icon: ImageIcon },
                { id: 'profile', label: 'Director Profile', icon: User },
                { id: 'settings', label: 'Website Settings', icon: SettingsIcon },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-left transition-colors whitespace-nowrap cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-blue-700 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}

              <div className="mt-auto pt-4 border-t border-slate-200 hidden md:block">
                <button
                  onClick={resetAllData}
                  className="w-full px-3 py-2 text-[11px] font-semibold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                  title="Restore demo content"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Data</span>
                </button>
              </div>
            </div>

            {/* Main Tab Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white">
              {/* TAB: DASHBOARD */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Institute Overview Dashboard
                    </h3>
                    <p className="text-xs text-slate-500">
                      Real-time metrics and quick management controls.
                    </p>
                  </div>

                  {/* Metrics Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                      <span className="text-xs font-semibold text-blue-700">Total Courses</span>
                      <div className="text-2xl font-black text-blue-950 mt-1">{courses.length}</div>
                      <span className="text-[11px] text-blue-600">Active programs</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100">
                      <span className="text-xs font-semibold text-sky-700">Digital Services</span>
                      <div className="text-2xl font-black text-sky-950 mt-1">{services.length}</div>
                      <span className="text-[11px] text-sky-600">Printing, forms, etc.</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                      <span className="text-xs font-semibold text-emerald-700">Placement Jobs</span>
                      <div className="text-2xl font-black text-emerald-950 mt-1">{jobs.length}</div>
                      <span className="text-[11px] text-emerald-600">Open positions</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
                      <span className="text-xs font-semibold text-amber-700">New Enquiries</span>
                      <div className="text-2xl font-black text-amber-950 mt-1">{newEnquiriesCount}</div>
                      <span className="text-[11px] text-amber-600">Awaiting callback</span>
                    </div>
                  </div>

                  {/* Recent Enquiries Preview */}
                  <div className="p-5 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-bold text-slate-900">
                        Latest Incoming Student Enquiries
                      </h4>
                      <button
                        onClick={() => setActiveTab('enquiries')}
                        className="text-xs font-bold text-blue-700 hover:underline"
                      >
                        View All Enquiries →
                      </button>
                    </div>

                    {enquiries.length === 0 ? (
                      <p className="text-xs text-slate-400">No enquiries received yet.</p>
                    ) : (
                      <div className="space-y-3">
                        {enquiries.slice(0, 3).map((enq) => (
                          <div
                            key={enq.id}
                            className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900">{enq.name}</span>
                                <span className="text-slate-500">({enq.mobile})</span>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                  enq.status === 'new'
                                    ? 'bg-rose-100 text-rose-800'
                                    : enq.status === 'contacted'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}>
                                  {enq.status}
                                </span>
                              </div>
                              <p className="text-slate-600 text-[11px] mt-0.5">
                                Interested in: <strong>{enq.subject}</strong>
                              </p>
                            </div>

                            <button
                              onClick={() => {
                                const cleanPhone = enq.mobile.replace(/[^0-9]/g, '');
                                window.open(`https://wa.me/91${cleanPhone}?text=Hello ${enq.name}, regards from Mayank Computer! Regarding your enquiry for ${enq.subject}:`, '_blank');
                              }}
                              className="px-3 py-1 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-1"
                            >
                              <MessageCircle className="w-3 h-3" />
                              <span>WhatsApp Reply</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB: ENQUIRIES */}
              {activeTab === 'enquiries' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        Enquiry Management Queue
                      </h3>
                      <p className="text-xs text-slate-500">
                        Track students who registered interest in courses, job applications, or digital services.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {enquiries.map((enq) => (
                      <div
                        key={enq.id}
                        className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-900">{enq.name}</span>
                              <span className="text-xs font-mono text-blue-700 font-semibold">{enq.mobile}</span>
                              {enq.email && <span className="text-xs text-slate-400">· {enq.email}</span>}
                            </div>
                            <div className="text-xs font-semibold text-slate-700 mt-0.5">
                              Subject: <span className="text-blue-700">{enq.subject}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={enq.status}
                              onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as any)}
                              className="text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-300 bg-white"
                            >
                              <option value="new">🔴 New</option>
                              <option value="contacted">🟡 Contacted</option>
                              <option value="pending">🟠 Pending</option>
                              <option value="closed">🟢 Closed</option>
                            </select>

                            <button
                              onClick={() => deleteEnquiry(enq.id)}
                              className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                              title="Delete record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                          "{enq.message}"
                        </p>

                        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 pt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {enq.createdAt}
                          </span>

                          <div className="flex items-center gap-2">
                            <a
                              href={`tel:${enq.mobile.replace(/\s+/g, '')}`}
                              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg flex items-center gap-1"
                            >
                              <Phone className="w-3 h-3 text-blue-600" />
                              <span>Call</span>
                            </a>

                            <button
                              onClick={() => {
                                const cleanPhone = enq.mobile.replace(/[^0-9]/g, '');
                                window.open(`https://wa.me/91${cleanPhone}?text=Hello ${enq.name}, thank you for contacting Mayank Computer regarding ${enq.subject}. How may we assist you today?`, '_blank');
                              }}
                              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg flex items-center gap-1 cursor-pointer"
                            >
                              <MessageCircle className="w-3 h-3" />
                              <span>WhatsApp</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: COURSES */}
              {activeTab === 'courses' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        Course Management
                      </h3>
                      <p className="text-xs text-slate-500">
                        Add new certification programs, modify topics, duration, and fees.
                      </p>
                    </div>
                  </div>

                  {/* Add / Edit Form */}
                  <form onSubmit={handleSaveCourse} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-700" />
                      {editingCourseId ? 'Edit Course' : 'Add New Course'}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Course Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={courseFormData.title}
                          onChange={(e) => setCourseFormData({ ...courseFormData, title: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                          placeholder="e.g. Advanced Excel & MIS"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Category
                        </label>
                        <select
                          value={courseFormData.category}
                          onChange={(e) => setCourseFormData({ ...courseFormData, category: e.target.value as any })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                        >
                          <option value="fundamentals">Fundamentals</option>
                          <option value="office">MS Office Suite</option>
                          <option value="advanced">Advanced & Accounting</option>
                          <option value="typing">Typing</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Duration
                        </label>
                        <input
                          type="text"
                          value={courseFormData.duration}
                          onChange={(e) => setCourseFormData({ ...courseFormData, duration: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                          placeholder="e.g. 3 Months (90 Hours)"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Fee (e.g. ₹2,499)
                        </label>
                        <input
                          type="text"
                          value={courseFormData.fee}
                          onChange={(e) => setCourseFormData({ ...courseFormData, fee: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Eligibility
                        </label>
                        <input
                          type="text"
                          value={courseFormData.eligibility}
                          onChange={(e) => setCourseFormData({ ...courseFormData, eligibility: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                          placeholder="10th / 12th Pass or Any"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Short Description
                      </label>
                      <input
                        type="text"
                        value={courseFormData.shortDescription}
                        onChange={(e) => setCourseFormData({ ...courseFormData, shortDescription: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                        placeholder="Brief 1-2 sentence overview for cards"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Description & Objectives
                      </label>
                      <textarea
                        rows={2}
                        value={courseFormData.fullDescription}
                        onChange={(e) => setCourseFormData({ ...courseFormData, fullDescription: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Syllabus Topics (One per line)
                      </label>
                      <textarea
                        rows={3}
                        value={courseFormData.topicsText}
                        onChange={(e) => setCourseFormData({ ...courseFormData, topicsText: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      {editingCourseId && (
                        <button
                          type="button"
                          onClick={() => setEditingCourseId(null)}
                          className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-lg shadow-xs"
                      >
                        {editingCourseId ? 'Update Course' : 'Create Course'}
                      </button>
                    </div>
                  </form>

                  {/* Existing courses list */}
                  <div className="space-y-3">
                    {courses.map((course) => (
                      <div
                        key={course.id}
                        className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{course.title}</span>
                            <span className="text-[11px] text-slate-500 font-medium">({course.duration})</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              course.status === 'published' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {course.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                            {course.shortDescription}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => toggleCourseStatus(course.id)}
                            className="p-1.5 text-slate-500 hover:text-blue-700"
                            title={course.status === 'published' ? 'Unpublish' : 'Publish'}
                          >
                            {course.status === 'published' ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => handleStartEditCourse(course)}
                            className="p-1.5 text-slate-500 hover:text-blue-700"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteCourse(course.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: SERVICES */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        Digital Services Management
                      </h3>
                      <p className="text-xs text-slate-500">
                        Manage documentation, printing, scanning, and hardware services.
                      </p>
                    </div>
                  </div>

                  {/* Add / Edit Service Form */}
                  <form onSubmit={handleSaveService} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-blue-700" />
                      {editingServiceId ? 'Edit Service' : 'Add New Service'}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Service Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={serviceFormData.title}
                          onChange={(e) => setServiceFormData({ ...serviceFormData, title: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Icon
                        </label>
                        <select
                          value={serviceFormData.icon}
                          onChange={(e) => setServiceFormData({ ...serviceFormData, icon: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                        >
                          <option value="Monitor">Monitor (Training)</option>
                          <option value="Keyboard">Keyboard (Typing)</option>
                          <option value="Printer">Printer (Printing)</option>
                          <option value="Scan">Scan (Scanning)</option>
                          <option value="Copy">Copy (Photocopy)</option>
                          <option value="FileText">FileText (Online Forms)</option>
                          <option value="FileCheck">FileCheck (Resume/Doc)</option>
                          <option value="Download">Download (Software)</option>
                          <option value="Cpu">Cpu (Setup/Hardware)</option>
                          <option value="Globe">Globe (Digital/Aadhaar)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Estimated Time
                        </label>
                        <input
                          type="text"
                          value={serviceFormData.estimatedTime}
                          onChange={(e) => setServiceFormData({ ...serviceFormData, estimatedTime: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                          placeholder="e.g. 15-20 Mins"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Price / Rate Estimate
                        </label>
                        <input
                          type="text"
                          value={serviceFormData.priceEstimate}
                          onChange={(e) => setServiceFormData({ ...serviceFormData, priceEstimate: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                          placeholder="e.g. ₹20 per page"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Short Description
                        </label>
                        <input
                          type="text"
                          value={serviceFormData.shortDescription}
                          onChange={(e) => setServiceFormData({ ...serviceFormData, shortDescription: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Features / Details (One per line)
                      </label>
                      <textarea
                        rows={3}
                        value={serviceFormData.featuresText}
                        onChange={(e) => setServiceFormData({ ...serviceFormData, featuresText: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      {editingServiceId && (
                        <button
                          type="button"
                          onClick={() => setEditingServiceId(null)}
                          className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-lg shadow-xs"
                      >
                        {editingServiceId ? 'Update Service' : 'Add Service'}
                      </button>
                    </div>
                  </form>

                  {/* List */}
                  <div className="space-y-3">
                    {services.map((serv) => (
                      <div
                        key={serv.id}
                        className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{serv.title}</span>
                            <span className="text-xs text-emerald-700 font-semibold">{serv.priceEstimate}</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                            {serv.shortDescription}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleStartEditService(serv)}
                            className="p-1.5 text-slate-500 hover:text-blue-700"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteService(serv.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: JOBS */}
              {activeTab === 'jobs' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Placement & Job Openings Management
                    </h3>
                    <p className="text-xs text-slate-500">
                      Post local corporate and shop job openings for students.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSaveJob} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-blue-700" />
                      {editingJobId ? 'Edit Job Opening' : 'Post New Job'}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Job Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={jobFormData.title}
                          onChange={(e) => setJobFormData({ ...jobFormData, title: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                          placeholder="e.g. Data Entry Operator"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Hiring Company / Shop *
                        </label>
                        <input
                          type="text"
                          required
                          value={jobFormData.company}
                          onChange={(e) => setJobFormData({ ...jobFormData, company: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Salary
                        </label>
                        <input
                          type="text"
                          value={jobFormData.salary}
                          onChange={(e) => setJobFormData({ ...jobFormData, salary: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                          placeholder="₹12,000 - ₹16,000"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={jobFormData.location}
                          onChange={(e) => setJobFormData({ ...jobFormData, location: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Qualification
                        </label>
                        <input
                          type="text"
                          value={jobFormData.qualification}
                          onChange={(e) => setJobFormData({ ...jobFormData, qualification: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Job Type
                        </label>
                        <select
                          value={jobFormData.jobType}
                          onChange={(e) => setJobFormData({ ...jobFormData, jobType: e.target.value as any })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                        >
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                          <option value="Trainee">Trainee</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Skills Required (Comma separated)
                      </label>
                      <input
                        type="text"
                        value={jobFormData.skillsText}
                        onChange={(e) => setJobFormData({ ...jobFormData, skillsText: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                        placeholder="Basic Computer, MS Excel, Typing"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Job Description
                      </label>
                      <textarea
                        rows={2}
                        value={jobFormData.description}
                        onChange={(e) => setJobFormData({ ...jobFormData, description: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      {editingJobId && (
                        <button
                          type="button"
                          onClick={() => setEditingJobId(null)}
                          className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-lg shadow-xs"
                      >
                        {editingJobId ? 'Update Job' : 'Post Job'}
                      </button>
                    </div>
                  </form>

                  {/* Jobs List */}
                  <div className="space-y-3">
                    {jobs.map((job) => (
                      <div
                        key={job.id}
                        className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{job.title}</span>
                            <span className="text-xs text-slate-500 font-medium">({job.company})</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              job.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                            }`}>
                              {job.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {job.location} · {job.salary} · {job.qualification}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => toggleJobStatus(job.id)}
                            className="text-xs font-semibold px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                          >
                            {job.status === 'active' ? 'Expire' : 'Activate'}
                          </button>
                          <button
                            onClick={() => handleStartEditJob(job)}
                            className="p-1.5 text-slate-500 hover:text-blue-700"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteJob(job.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: EDUCATION */}
              {activeTab === 'education' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Education & Qualification Records
                    </h3>
                    <p className="text-xs text-slate-500">
                      Manage academic degrees, faculty certifications, and qualifications.
                    </p>
                  </div>

                  <form onSubmit={handleSaveEducation} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-blue-700" />
                      {editingEduId ? 'Edit Record' : 'Add Academic Qualification'}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Degree / Qualification *
                        </label>
                        <input
                          type="text"
                          required
                          value={eduFormData.qualification}
                          onChange={(e) => setEduFormData({ ...eduFormData, qualification: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                          placeholder="e.g. Master of Computer Applications"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Institution *
                        </label>
                        <input
                          type="text"
                          required
                          value={eduFormData.institution}
                          onChange={(e) => setEduFormData({ ...eduFormData, institution: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Year
                        </label>
                        <input
                          type="text"
                          value={eduFormData.year}
                          onChange={(e) => setEduFormData({ ...eduFormData, year: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                          placeholder="2016 - 2019"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Key Competencies / Skills (Comma separated)
                      </label>
                      <input
                        type="text"
                        value={eduFormData.skillsText}
                        onChange={(e) => setEduFormData({ ...eduFormData, skillsText: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={eduFormData.description}
                        onChange={(e) => setEduFormData({ ...eduFormData, description: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      {editingEduId && (
                        <button
                          type="button"
                          onClick={() => setEditingEduId(null)}
                          className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-lg shadow-xs"
                      >
                        {editingEduId ? 'Update Record' : 'Add Record'}
                      </button>
                    </div>
                  </form>

                  {/* List */}
                  <div className="space-y-3">
                    {education.map((edu) => (
                      <div
                        key={edu.id}
                        className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{edu.qualification}</span>
                            <span className="text-xs text-slate-500 font-medium">({edu.year})</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5">{edu.institution}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleStartEditEducation(edu)}
                            className="p-1.5 text-slate-500 hover:text-blue-700"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteEducation(edu.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: GALLERY */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Gallery Management
                    </h3>
                    <p className="text-xs text-slate-500">
                      Add and manage photos of the computer lab, student ceremonies, and events.
                    </p>
                  </div>

                  <form onSubmit={handleAddGalleryPhoto} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-blue-700" />
                      Add Photo to Gallery
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Photo Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={newGalleryPhoto.title}
                          onChange={(e) => setNewGalleryPhoto({ ...newGalleryPhoto, title: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                          placeholder="e.g. Computer Lab Batch 2026"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Category
                        </label>
                        <select
                          value={newGalleryPhoto.category}
                          onChange={(e) => setNewGalleryPhoto({ ...newGalleryPhoto, category: e.target.value as any })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                        >
                          <option value="lab">Computer Lab</option>
                          <option value="students">Students</option>
                          <option value="training">Training Sessions</option>
                          <option value="certificates">Certificates</option>
                          <option value="events">Events</option>
                          <option value="office">Office</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Image URL *
                        </label>
                        <input
                          type="url"
                          required
                          value={newGalleryPhoto.image}
                          onChange={(e) => setNewGalleryPhoto({ ...newGalleryPhoto, image: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Caption / Description
                      </label>
                      <input
                        type="text"
                        value={newGalleryPhoto.description}
                        onChange={(e) => setNewGalleryPhoto({ ...newGalleryPhoto, description: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-lg shadow-xs"
                      >
                        Upload to Gallery
                      </button>
                    </div>
                  </form>

                  {/* Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {gallery.map((photo) => (
                      <div
                        key={photo.id}
                        className="relative rounded-xl overflow-hidden aspect-video bg-slate-100 border border-slate-200 group"
                      >
                        <img src={photo.image} alt={photo.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between text-white">
                          <span className="text-[10px] uppercase font-bold text-sky-300">{photo.category}</span>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold truncate max-w-[120px]">{photo.title}</span>
                            <button
                              onClick={() => deleteGalleryItem(photo.id)}
                              className="p-1 rounded bg-rose-600 hover:bg-rose-700 text-white"
                              title="Delete Photo"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: PROFILE & PRIVACY */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Director Profile & Privacy Configuration
                    </h3>
                    <p className="text-xs text-slate-500">
                      PRD Requirement: Only personal info selected by owner is public.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <h4 className="text-sm font-bold text-slate-900">
                      Privacy Visibility Controls
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <label className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profile.privacySettings.showPhone}
                          onChange={(e) =>
                            updateProfile({
                              privacySettings: {
                                ...profile.privacySettings,
                                showPhone: e.target.checked
                              }
                            })
                          }
                          className="w-4 h-4 rounded text-blue-600"
                        />
                        <span className="font-semibold text-slate-800">Show Phone Number on Profile</span>
                      </label>

                      <label className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profile.privacySettings.showEmail}
                          onChange={(e) =>
                            updateProfile({
                              privacySettings: {
                                ...profile.privacySettings,
                                showEmail: e.target.checked
                              }
                            })
                          }
                          className="w-4 h-4 rounded text-blue-600"
                        />
                        <span className="font-semibold text-slate-800">Show Email Address on Profile</span>
                      </label>

                      <label className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profile.privacySettings.showAddress}
                          onChange={(e) =>
                            updateProfile({
                              privacySettings: {
                                ...profile.privacySettings,
                                showAddress: e.target.checked
                              }
                            })
                          }
                          className="w-4 h-4 rounded text-blue-600"
                        />
                        <span className="font-semibold text-slate-800">Show Physical Address on Profile</span>
                      </label>

                      <label className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profile.privacySettings.showPersonalBio}
                          onChange={(e) =>
                            updateProfile({
                              privacySettings: {
                                ...profile.privacySettings,
                                showPersonalBio: e.target.checked
                              }
                            })
                          }
                          className="w-4 h-4 rounded text-blue-600"
                        />
                        <span className="font-semibold text-slate-800">Show Extended Personal Biography</span>
                      </label>
                    </div>
                  </div>

                  {/* Profile Edit fields */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4">
                    <h4 className="text-sm font-bold text-slate-900">
                      Director Credentials
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) => updateProfile({ name: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Designation / Role
                        </label>
                        <input
                          type="text"
                          value={profile.role}
                          onChange={(e) => updateProfile({ role: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Biography
                      </label>
                      <textarea
                        rows={3}
                        value={profile.bio}
                        onChange={(e) => updateProfile({ bio: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: SETTINGS */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Website Configuration & Contact Details
                    </h3>
                    <p className="text-xs text-slate-500">
                      Configure institute branding, notice strip, and contact numbers.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <h4 className="text-sm font-bold text-slate-900">
                      Notice Bar Announcement
                    </h4>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Announcement Text
                      </label>
                      <input
                        type="text"
                        value={settings.noticeBanner?.text || ''}
                        onChange={(e) =>
                          updateSettings({
                            noticeBanner: {
                              enabled: true,
                              text: e.target.value,
                              linkText: 'Enquire Now'
                            }
                          })
                        }
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4">
                    <h4 className="text-sm font-bold text-slate-900">
                      Institute Details
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Institute Name
                        </label>
                        <input
                          type="text"
                          value={settings.instituteName}
                          onChange={(e) => updateSettings({ instituteName: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Tagline
                        </label>
                        <input
                          type="text"
                          value={settings.tagline}
                          onChange={(e) => updateSettings({ tagline: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Primary Phone
                        </label>
                        <input
                          type="text"
                          value={settings.primaryPhone}
                          onChange={(e) => updateSettings({ primaryPhone: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          WhatsApp Number
                        </label>
                        <input
                          type="text"
                          value={settings.whatsappNumber}
                          onChange={(e) => updateSettings({ whatsappNumber: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Physical Address
                        </label>
                        <input
                          type="text"
                          value={settings.address}
                          onChange={(e) => updateSettings({ address: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Opening Hours
                        </label>
                        <input
                          type="text"
                          value={settings.openingHours}
                          onChange={(e) => updateSettings({ openingHours: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
