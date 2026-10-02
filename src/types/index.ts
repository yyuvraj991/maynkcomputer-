export interface Course {
  id: string;
  slug: string;
  title: string;
  category: 'fundamentals' | 'office' | 'advanced' | 'typing';
  shortDescription: string;
  fullDescription: string;
  duration: string; // e.g. "3 Months", "6 Months"
  eligibility: string; // e.g. "10th / 12th Pass or Any"
  topics: string[];
  image: string;
  certificateProvided: boolean;
  status: 'published' | 'draft';
  fee?: string;
  createdAt: string;
}

export interface DigitalService {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string; // lucide icon identifier
  image: string;
  estimatedTime: string; // e.g. "10-15 Minutes", "Same Day"
  priceEstimate?: string;
  features: string[];
  status: 'published' | 'draft';
}

export interface JobOpening {
  id: string;
  title: string;
  company: string;
  location: string;
  qualification: string;
  experience: string;
  salary: string;
  description: string;
  skillsRequired: string[];
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Trainee';
  lastDate: string;
  applicationContact: string;
  status: 'active' | 'expired' | 'draft';
}

export interface EducationRecord {
  id: string;
  qualification: string;
  institution: string;
  year: string;
  gradeOrScore?: string;
  description: string;
  keySkills: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'lab' | 'students' | 'training' | 'certificates' | 'events' | 'office';
  image: string;
  description: string;
  date?: string;
}

export interface ProfileData {
  name: string;
  role: string;
  bio: string;
  experienceYears: number;
  qualifications: string[];
  skills: {
    category: string;
    items: string[];
  }[];
  privacySettings: {
    showEmail: boolean;
    showPhone: boolean;
    showAddress: boolean;
    showPersonalBio: boolean;
  };
  contactEmail: string;
  contactPhone: string;
  address: string;
}

export interface Enquiry {
  id: string;
  name: string;
  mobile: string;
  email: string;
  subject: string; // Course or Service name or General
  message: string;
  status: 'new' | 'contacted' | 'pending' | 'closed';
  createdAt: string;
  notes?: string;
}

export interface WebsiteSettings {
  instituteName: string;
  tagline: string;
  primaryPhone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  openingHours: string;
  googleMapsUrl: string;
  noticeBanner?: {
    enabled: boolean;
    text: string;
    linkText?: string;
  };
}

export interface StudentCertificate {
  certificateId: string;
  studentName: string;
  fatherName: string;
  courseName: string;
  grade: string;
  issueDate: string;
  duration: string;
  status: 'verified' | 'revoked';
}
