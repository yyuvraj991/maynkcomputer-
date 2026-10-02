import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Course,
  DigitalService,
  JobOpening,
  EducationRecord,
  GalleryItem,
  ProfileData,
  WebsiteSettings,
  Enquiry,
  StudentCertificate
} from '../types';
import {
  initialCourses,
  initialServices,
  initialJobs,
  initialEducation,
  initialGallery,
  initialProfile,
  initialSettings,
  initialEnquiries,
  initialCertificates
} from '../data/initialData';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface AppContextType {
  // Data
  courses: Course[];
  services: DigitalService[];
  jobs: JobOpening[];
  education: EducationRecord[];
  gallery: GalleryItem[];
  profile: ProfileData;
  settings: WebsiteSettings;
  enquiries: Enquiry[];
  certificates: StudentCertificate[];

  // Admin Auth
  isAdminLoggedIn: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;

  // Actions - Courses
  addCourse: (course: Omit<Course, 'id' | 'createdAt'>) => void;
  updateCourse: (id: string, course: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  toggleCourseStatus: (id: string) => void;

  // Actions - Services
  addService: (service: Omit<DigitalService, 'id'>) => void;
  updateService: (id: string, service: Partial<DigitalService>) => void;
  deleteService: (id: string) => void;

  // Actions - Jobs
  addJob: (job: Omit<JobOpening, 'id'>) => void;
  updateJob: (id: string, job: Partial<JobOpening>) => void;
  deleteJob: (id: string) => void;
  toggleJobStatus: (id: string) => void;

  // Actions - Education
  addEducation: (edu: Omit<EducationRecord, 'id'>) => void;
  updateEducation: (id: string, edu: Partial<EducationRecord>) => void;
  deleteEducation: (id: string) => void;

  // Actions - Gallery
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;

  // Actions - Profile & Settings
  updateProfile: (profile: Partial<ProfileData>) => void;
  updateSettings: (settings: Partial<WebsiteSettings>) => void;

  // Actions - Enquiries
  submitEnquiry: (enquiry: { name: string; mobile: string; email: string; subject: string; message: string }) => void;
  updateEnquiryStatus: (id: string, status: Enquiry['status'], notes?: string) => void;
  deleteEnquiry: (id: string) => void;

  // Modal & Selection States
  selectedCourse: Course | null;
  setSelectedCourse: (course: Course | null) => void;
  selectedService: DigitalService | null;
  setSelectedService: (service: DigitalService | null) => void;
  selectedJob: JobOpening | null;
  setSelectedJob: (job: JobOpening | null) => void;
  lightboxIndex: number | null;
  setLightboxIndex: (index: number | null) => void;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  isEnquiryModalOpen: boolean;
  enquiryPrefillSubject: string;
  openEnquiryModal: (subject?: string) => void;
  closeEnquiryModal: () => void;
  isVerifyModalOpen: boolean;
  setIsVerifyModalOpen: (open: boolean) => void;
  isStudentRegModalOpen: boolean;
  setIsStudentRegModalOpen: (open: boolean) => void;

  // Page Routing (Main vs Dedicated Pages)
  currentPage: 'main' | 'pc-build' | 'lok-seva';
  setCurrentPage: (page: 'main' | 'pc-build' | 'lok-seva') => void;

  // Toast
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Reset to default data
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  COURSES: 'mayank_courses_v1',
  SERVICES: 'mayank_services_v1',
  JOBS: 'mayank_jobs_v1',
  EDUCATION: 'mayank_education_v1',
  GALLERY: 'mayank_gallery_v1',
  PROFILE: 'mayank_profile_v1',
  SETTINGS: 'mayank_settings_v1',
  ENQUIRIES: 'mayank_enquiries_v1',
  CERTIFICATES: 'mayank_certificates_v1',
  AUTH: 'mayank_admin_auth_v1'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial from localStorage or fallback
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.COURSES);
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [services, setServices] = useState<DigitalService[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.SERVICES);
    return saved ? JSON.parse(saved) : initialServices;
  });

  const [jobs, setJobs] = useState<JobOpening[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.JOBS);
    return saved ? JSON.parse(saved) : initialJobs;
  });

  const [education, setEducation] = useState<EducationRecord[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.EDUCATION);
    return saved ? JSON.parse(saved) : initialEducation;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.GALLERY);
    return saved ? JSON.parse(saved) : initialGallery;
  });

  const [profile, setProfile] = useState<ProfileData>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PROFILE);
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [settings, setSettings] = useState<WebsiteSettings>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.SETTINGS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.openingHours && !parsed.openingHours.toLowerCase().includes('closed')) {
          parsed.openingHours = 'Mon - Sat: 8:00 AM - 8:00 PM | Sunday: Closed';
        }
        if (!parsed.whatsappNumber || parsed.whatsappNumber.includes('98765')) {
          parsed.whatsappNumber = '+91 98277 83218';
        }
        if (!parsed.primaryPhone || parsed.primaryPhone.includes('98765')) {
          parsed.primaryPhone = '+91 98277 83218';
        }
        return { ...initialSettings, ...parsed };
      } catch {
        return initialSettings;
      }
    }
    return initialSettings;
  });

  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ENQUIRIES);
    return saved ? JSON.parse(saved) : initialEnquiries;
  });

  const [certificates, setCertificates] = useState<StudentCertificate[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CERTIFICATES);
    return saved ? JSON.parse(saved) : initialCertificates;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH) === 'true';
  });

  // Modal states
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedService, setSelectedService] = useState<DigitalService | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState<boolean>(false);
  const [enquiryPrefillSubject, setEnquiryPrefillSubject] = useState<string>('');
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState<boolean>(false);
  const [isStudentRegModalOpen, setIsStudentRegModalOpen] = useState<boolean>(false);

  // Dedicated Page Routing
  const [currentPage, setCurrentPageState] = useState<'main' | 'pc-build' | 'lok-seva'>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#lok-seva') return 'lok-seva';
      if (window.location.hash === '#pc-build') return 'pc-build';
    }
    return 'main';
  });

  const setCurrentPage = (page: 'main' | 'pc-build' | 'lok-seva') => {
    setCurrentPageState(page);
    if (typeof window !== 'undefined') {
      if (page === 'pc-build') {
        window.location.hash = 'pc-build';
      } else if (page === 'lok-seva') {
        window.location.hash = 'lok-seva';
      } else {
        if (window.location.hash === '#pc-build' || window.location.hash === '#lok-seva') {
          history.pushState(null, '', window.location.pathname);
        }
      }
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#lok-seva') {
        setCurrentPageState('lok-seva');
      } else if (window.location.hash === '#pc-build') {
        setCurrentPageState('pc-build');
      } else if (currentPage !== 'main') {
        setCurrentPageState('main');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [currentPage]);

  // Toast notification
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.COURSES, JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.JOBS, JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.EDUCATION, JSON.stringify(education));
  }, [education]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CERTIFICATES, JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH, isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  // Admin Auth Logic
  const loginAdmin = (password: string) => {
    // Default admin password for prototype administration
    if (password === 'admin123' || password === 'mayank2026') {
      setIsAdminLoggedIn(true);
      addToast('Welcome back, Admin! Management mode enabled.', 'success');
      return true;
    }
    addToast('Incorrect password. Use: admin123', 'error');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    addToast('Admin logged out successfully.', 'info');
  };

  // Course actions
  const addCourse = (data: Omit<Course, 'id' | 'createdAt'>) => {
    const newCourse: Course = {
      ...data,
      id: `course-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCourses(prev => [newCourse, ...prev]);
    addToast(`Course "${newCourse.title}" added successfully!`);
  };

  const updateCourse = (id: string, updated: Partial<Course>) => {
    setCourses(prev => prev.map(c => (c.id === id ? { ...c, ...updated } : c)));
    addToast('Course details updated successfully!');
  };

  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    addToast('Course removed.', 'info');
  };

  const toggleCourseStatus = (id: string) => {
    setCourses(prev =>
      prev.map(c =>
        c.id === id
          ? { ...c, status: c.status === 'published' ? 'draft' : 'published' }
          : c
      )
    );
    addToast('Course status toggled.');
  };

  // Service actions
  const addService = (data: Omit<DigitalService, 'id'>) => {
    const newService: DigitalService = {
      ...data,
      id: `serv-${Date.now()}`
    };
    setServices(prev => [newService, ...prev]);
    addToast(`Service "${newService.title}" created successfully!`);
  };

  const updateService = (id: string, updated: Partial<DigitalService>) => {
    setServices(prev => prev.map(s => (s.id === id ? { ...s, ...updated } : s)));
    addToast('Service updated successfully!');
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    addToast('Service removed.', 'info');
  };

  // Job actions
  const addJob = (data: Omit<JobOpening, 'id'>) => {
    const newJob: JobOpening = {
      ...data,
      id: `job-${Date.now()}`
    };
    setJobs(prev => [newJob, ...prev]);
    addToast(`Job opening "${newJob.title}" posted successfully!`);
  };

  const updateJob = (id: string, updated: Partial<JobOpening>) => {
    setJobs(prev => prev.map(j => (j.id === id ? { ...j, ...updated } : j)));
    addToast('Job posting updated!');
  };

  const deleteJob = (id: string) => {
    setJobs(prev => prev.filter(j => j.id !== id));
    addToast('Job opening removed.', 'info');
  };

  const toggleJobStatus = (id: string) => {
    setJobs(prev =>
      prev.map(j =>
        j.id === id
          ? { ...j, status: j.status === 'active' ? 'expired' : 'active' }
          : j
      )
    );
    addToast('Job status updated.');
  };

  // Education actions
  const addEducation = (data: Omit<EducationRecord, 'id'>) => {
    const newEdu: EducationRecord = {
      ...data,
      id: `edu-${Date.now()}`
    };
    setEducation(prev => [newEdu, ...prev]);
    addToast('Education qualification added!');
  };

  const updateEducation = (id: string, updated: Partial<EducationRecord>) => {
    setEducation(prev => prev.map(e => (e.id === id ? { ...e, ...updated } : e)));
    addToast('Education record updated!');
  };

  const deleteEducation = (id: string) => {
    setEducation(prev => prev.filter(e => e.id !== id));
    addToast('Education record removed.', 'info');
  };

  // Gallery actions
  const addGalleryItem = (data: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...data,
      id: `gal-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setGallery(prev => [newItem, ...prev]);
    addToast('Photo added to gallery!');
  };

  const deleteGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
    addToast('Photo removed from gallery.', 'info');
  };

  // Profile & Settings
  const updateProfile = (updated: Partial<ProfileData>) => {
    setProfile(prev => ({ ...prev, ...updated }));
    addToast('Profile information saved!');
  };

  const updateSettings = (updated: Partial<WebsiteSettings>) => {
    setSettings(prev => ({ ...prev, ...updated }));
    addToast('Website settings updated!');
  };

  // Enquiries
  const submitEnquiry = (enquiryData: { name: string; mobile: string; email: string; subject: string; message: string }) => {
    const newEnq: Enquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toLocaleString()
    };
    setEnquiries(prev => [newEnq, ...prev]);
    addToast('Thank you! Your enquiry has been received. Our team will contact you shortly.', 'success');
  };

  const updateEnquiryStatus = (id: string, status: Enquiry['status'], notes?: string) => {
    setEnquiries(prev =>
      prev.map(e => (e.id === id ? { ...e, status, notes: notes !== undefined ? notes : e.notes } : e))
    );
    addToast(`Enquiry marked as ${status}.`);
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries(prev => prev.filter(e => e.id !== id));
    addToast('Enquiry removed.', 'info');
  };

  const openEnquiryModal = (subject: string = '') => {
    setEnquiryPrefillSubject(subject);
    setIsEnquiryModalOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsEnquiryModalOpen(false);
    setEnquiryPrefillSubject('');
  };

  const resetAllData = () => {
    setCourses(initialCourses);
    setServices(initialServices);
    setJobs(initialJobs);
    setEducation(initialEducation);
    setGallery(initialGallery);
    setProfile(initialProfile);
    setSettings(initialSettings);
    setEnquiries(initialEnquiries);
    setCertificates(initialCertificates);
    localStorage.clear();
    addToast('All data has been reset to default institute records.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        courses,
        services,
        jobs,
        education,
        gallery,
        profile,
        settings,
        enquiries,
        certificates,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
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
        submitEnquiry,
        updateEnquiryStatus,
        deleteEnquiry,
        selectedCourse,
        setSelectedCourse,
        selectedService,
        setSelectedService,
        selectedJob,
        setSelectedJob,
        lightboxIndex,
        setLightboxIndex,
        isAdminModalOpen,
        setIsAdminModalOpen,
        isEnquiryModalOpen,
        enquiryPrefillSubject,
        openEnquiryModal,
        closeEnquiryModal,
        isVerifyModalOpen,
        setIsVerifyModalOpen,
        isStudentRegModalOpen,
        setIsStudentRegModalOpen,
        currentPage,
        setCurrentPage,
        toasts,
        addToast,
        removeToast,
        resetAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
