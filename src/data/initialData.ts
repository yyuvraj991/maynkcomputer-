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

export const initialSettings: WebsiteSettings = {
  instituteName: 'Mayank Computer',
  tagline: 'Computer Education, Digital Services & Career Guidance',
  primaryPhone: '+91 98277 83218',
  whatsappNumber: '+91 98277 83218',
  email: 'contact@mayankcomputer.com',
  address: 'Main Road, Nagpura, Durg, Chhattisgarh - 491001',
  openingHours: 'Mon - Sat: 8:00 AM - 8:00 PM | Sunday: Closed',
  googleMapsUrl: 'https://maps.google.com/?q=Nagpura+Durg+Chhattisgarh+491001',
  noticeBanner: {
    enabled: true,
    text: '🚀 Admissions Open for New Batches: Basic Computer, MS Office, Advanced Excel & Tally Prime! Flat 15% discount on early registration.',
    linkText: 'Enquire Now'
  }
};

export const initialCourses: Course[] = [
  {
    id: 'course-1',
    slug: 'basic-computer',
    title: 'Basic Computer Course',
    category: 'fundamentals',
    shortDescription: 'Computer Fundamentals, Windows 11 OS, Paint, Notepad, WordPad & basic file management.',
    fullDescription: 'Designed for beginners, school students, and seniors. Learn the essentials of operating a computer with full confidence, keyboard navigation, folder hierarchies, mouse precision, and essential Windows tools.',
    duration: '2 Months (60 Hours)',
    eligibility: 'No prior computer knowledge required (Open to all)',
    topics: [
      'Introduction to Computer Hardware & Software',
      'Windows 11 Navigation, Desktop & Taskbar Management',
      'File & Folder Organization, Storage Drives & USB devices',
      'MS Paint for mouse grip and graphics practice',
      'Notepad, WordPad & text formatting basics',
      'Basic settings, Control Panel & Printer configuration',
      'Computer safety, antivirus and maintenance'
    ],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    certificateProvided: true,
    fee: '₹1,499',
    status: 'published',
    createdAt: '2026-01-10'
  },
  {
    id: 'course-2',
    slug: 'ms-office',
    title: 'Complete MS Office Suite',
    category: 'office',
    shortDescription: 'Master Microsoft Word, Excel, PowerPoint & Outlook for professional office and corporate jobs.',
    fullDescription: 'Comprehensive training in Microsoft Office 365. Equip yourself with real-world skills to draft official letters, maintain ledgers, build persuasive presentations, and manage corporate emails.',
    duration: '3 Months (90 Hours)',
    eligibility: '10th / 12th Pass or Basic Computer Knowledge',
    topics: [
      'MS Word: Advanced formatting, tables, official letterheads & mail merge',
      'MS Excel: Cell references, formulas (SUM, AVERAGE, IF), formatting & charts',
      'MS PowerPoint: Professional slides, animations, themes & presentation delivery',
      'MS Outlook: Email etiquette, calendar scheduling & contact management',
      'Printing & PDF conversion best practices',
      'Office shortcuts, fast keyboard productivity and speed hacks'
    ],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    certificateProvided: true,
    fee: '₹2,499',
    status: 'published',
    createdAt: '2026-01-12'
  },
  {
    id: 'course-3',
    slug: 'ms-word',
    title: 'MS Word Specialization',
    category: 'office',
    shortDescription: 'Professional document typing, book indexing, legal documentation, tables & Mail Merge mastery.',
    fullDescription: 'Become an expert in Microsoft Word. Learn to build standard resumes, legal agreements, academic research papers, certificates, and mass-mailing automations.',
    duration: '1 Month (30 Hours)',
    eligibility: 'Basic Computer Awareness',
    topics: [
      'Font styling, paragraph alignment, line spacing & tab stops',
      'Page Setup: Margins, headers, footers, page numbering & watermarks',
      'SmartArt, shapes, icons, tables and spreadsheet embedding',
      'Mail Merge: Bulk letters, envelopes and label generation from Excel lists',
      'Document protection, track changes and proofing tools',
      'Exporting to print-ready PDF and Kindle formats'
    ],
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
    certificateProvided: true,
    fee: '₹999',
    status: 'published',
    createdAt: '2026-01-15'
  },
  {
    id: 'course-4',
    slug: 'ms-excel',
    title: 'MS Excel (Basic to Advanced)',
    category: 'office',
    shortDescription: 'From simple spreadsheets to VLOOKUP, XLOOKUP, Pivot Tables, conditional formatting & dashboard creation.',
    fullDescription: 'Excel is the #1 requirement for back-office, banking, retail, and corporate jobs. Master complex formulas, dynamic lookups, automated summaries, and interactive business dashboards.',
    duration: '2 Months (60 Hours)',
    eligibility: '10th / 12th Pass or Office beginners',
    topics: [
      'Data entry standards, custom cell formatting & data validation',
      'Essential Math & Logic: SUM, COUNTIF, SUMIFS, IF, AND, OR',
      'Lookup Functions: VLOOKUP, HLOOKUP, INDEX-MATCH and modern XLOOKUP',
      'Pivot Tables, Slicers, Timeline filters & Pivot Charts',
      'Financial functions, loan EMI calculators & interest sheets',
      'Data cleaning, text-to-columns, flash fill and removing duplicates',
      'Interactive executive dashboards and print-area configurations'
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    certificateProvided: true,
    fee: '₹1,999',
    status: 'published',
    createdAt: '2026-01-20'
  },
  {
    id: 'course-5',
    slug: 'powerpoint',
    title: 'PowerPoint Presentation Design',
    category: 'office',
    shortDescription: 'Create pitch decks, seminar slides, student projects, animations & video exports.',
    fullDescription: 'Design captivating presentations that engage your audience. Learn typography, color balance, visual storytelling, infographic charts, slide transitions, and rehearsed timing.',
    duration: '1 Month (25 Hours)',
    eligibility: 'Basic Computer Awareness',
    topics: [
      'Master slides, design themes and layout templates',
      'Graphic asset integration: icons, vector illustrations & charts',
      'Custom animations, motion paths and seamless morph transitions',
      'Audio & video embedding, narration recording and timings',
      'Presenter view, laser pointer tools and multi-monitor setup',
      'Exporting presentations to MP4 video and web slideshows'
    ],
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    certificateProvided: true,
    fee: '₹999',
    status: 'published',
    createdAt: '2026-01-22'
  },
  {
    id: 'course-6',
    slug: 'internet',
    title: 'Internet & Digital Services',
    category: 'fundamentals',
    shortDescription: 'Web browsing, secure online banking, government portals, cyber security & cloud tools.',
    fullDescription: 'Gain confidence on the internet. Learn to book railway/air tickets, submit government scholarship and exam forms, secure your email, use Google Drive / DigiLocker, and protect against online fraud.',
    duration: '1 Month (30 Hours)',
    eligibility: 'Open to everyone',
    topics: [
      'Modern web browsers, search techniques and bookmark sync',
      'Email creation (Gmail), attachments, spam filters and professional tone',
      'Online banking, UPI payments, QR codes and cyber fraud precautions',
      'Govt citizen services: Aadhaar, PAN card, DigiLocker, Voter ID & Passports',
      'Online shopping, train ticket booking (IRCTC) and utility bill payments',
      'Google Drive, cloud file backup and document sharing',
      'Cyber hygiene: strong passwords, two-factor authentication & privacy'
    ],
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    certificateProvided: true,
    fee: '₹899',
    status: 'published',
    createdAt: '2026-01-25'
  },
  {
    id: 'course-7',
    slug: 'typing',
    title: 'Typing Master (Hindi & English)',
    category: 'typing',
    shortDescription: 'Touch typing method with 35-50+ WPM speed. Kruti Dev 010, Mangal InScript & English.',
    fullDescription: 'Specially structured for government exam aspirants (SSC, High Court, Railway, State Police, Revenue) and private data entry jobs. Learn touch typing without looking at the keyboard with high accuracy.',
    duration: '2-3 Months (Daily 1 Hour Lab)',
    eligibility: 'Open to all students & job seekers',
    topics: [
      'Touch typing posture, home row, top row and bottom row mastery',
      'English Touch Typing with target speed of 40+ WPM and 95%+ accuracy',
      'Hindi Typing: Kruti Dev 010 font layout and key mappings',
      'Hindi Typing: Mangal font (InScript and Remington GAIL keyboards)',
      'Special symbols, alt-codes and numeric keypad speed drills',
      'Timed speed tests matching official government exam interfaces',
      'Speed error correction and rhythm training'
    ],
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    certificateProvided: true,
    fee: '₹1,200',
    status: 'published',
    createdAt: '2026-02-01'
  },
  {
    id: 'course-8',
    slug: 'ms-dos',
    title: 'MS-DOS & Operating System Fundamentals',
    category: 'advanced',
    shortDescription: 'Command prompt essentials, batch scripting, system troubleshooting, drive partitioning & disk repair.',
    fullDescription: 'Deep dive into computer internal commands and CLI (Command Line Interface). Essential for technical support staff, hardware engineers, and serious computer learners.',
    duration: '1 Month (25 Hours)',
    eligibility: 'Basic Computer Knowledge',
    topics: [
      'Introduction to Command Prompt (cmd) and Windows Terminal',
      'Internal DOS commands: DIR, CD, MD, RD, COPY, DEL, REN, CLS',
      'External DOS commands: CHKDSK, DISKCOPY, FORMAT, ATTRIB, XCOPY',
      'File attributes (hidden, system, read-only) and permission fixing',
      'Creating custom automated batch files (.bat) for task automation',
      'System troubleshooting via CLI, IPCONFIG, PING, NETSTAT',
      'Bootable drive creation and system recovery disk tools'
    ],
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80',
    certificateProvided: true,
    fee: '₹899',
    status: 'published',
    createdAt: '2026-02-05'
  },
  {
    id: 'course-9',
    slug: 'tally-prime-gst',
    title: 'Tally Prime with GST & Accounting',
    category: 'advanced',
    shortDescription: 'Complete business accounting, voucher entry, inventory management, e-Way bills & GST returns filing.',
    fullDescription: 'High-demand job course for commerce and non-commerce students. Learn accounting on the latest Tally Prime software with real invoices, GST calculation, TDS, and balance sheets.',
    duration: '3 Months (80 Hours)',
    eligibility: '12th Pass (Any Stream, Commerce preferred)',
    topics: [
      'Fundamentals of Accounting: Golden rules, debit/credit and ledgers',
      'Company creation, group setup and ledger configurations',
      'Voucher entries: Sales, Purchase, Payment, Receipt, Journal, Contra',
      'Inventory management: Stock items, units of measure and Godown transfers',
      'Goods & Services Tax (GST): CGST, SGST, IGST, tax invoices and e-Way bills',
      'Bank Reconciliation Statement (BRS) and cheque printing',
      'Trial Balance, Profit & Loss statement and Balance Sheet generation',
      'GST returns overview: GSTR-1, GSTR-3B matching and filing prep'
    ],
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
    certificateProvided: true,
    fee: '₹3,499',
    status: 'published',
    createdAt: '2026-02-10'
  }
];

export const initialServices: DigitalService[] = [
  {
    id: 'serv-1',
    slug: 'computer-training',
    title: 'Computer Training',
    shortDescription: 'Personalized 1-on-1 practical training on computers, typing and corporate software.',
    fullDescription: 'We provide specialized practical classes for school students, college learners, housewives, job aspirants, and working professionals. Flexible batch timings (Morning, Afternoon, Evening).',
    icon: 'Monitor',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    estimatedTime: 'Daily Batches (1-2 Hours)',
    priceEstimate: 'Starting ₹600/month',
    features: [
      '1 Student per PC guarantee',
      'High-speed internet in computer lab',
      'Printed study notes & shortcut cheat-sheets',
      'Weekend revision & doubts sessions',
      'Course completion certificates'
    ],
    status: 'published'
  },
  {
    id: 'serv-2',
    slug: 'typing-services',
    title: 'Typing (Hindi & English)',
    shortDescription: 'Fast & accurate typing of Hindi (Kruti Dev/Mangal) and English documents, projects and books.',
    fullDescription: 'Get your official documents, legal affidavits, school/college thesis, question papers, and books typed with flawless grammar and formatting. Fast turnaround with immediate printouts.',
    icon: 'Keyboard',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    estimatedTime: '15-30 Mins / Express Delivery',
    priceEstimate: '₹20 - ₹40 per page',
    features: [
      'Hindi Kruti Dev & Mangal font typing',
      'English corporate & legal formatting',
      'Mathematical formulas & equation typing',
      'Direct proofreading and spelling corrections',
      'Hard copy + Editable Word / PDF file handover'
    ],
    status: 'published'
  },
  {
    id: 'serv-3',
    slug: 'printing-services',
    title: 'High-Quality Printing',
    shortDescription: 'Laser black & white and vivid color printing on premium A4, Legal, Photo & Bond paper.',
    fullDescription: 'High-speed digital laser printing for office documents, college projects, brochures, flyers, photos, and identity cards. Both single-sided and duplex printing available.',
    icon: 'Printer',
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80',
    estimatedTime: 'Immediate / 5 Mins',
    priceEstimate: 'B/W from ₹2/page, Color from ₹5/page',
    features: [
      'Heavy-duty commercial laser printers',
      '75 GSM to 250 GSM photo paper options',
      'Vibrant color reproduction',
      'Bulk printing discounts for students and institutes',
      'Print directly from WhatsApp, Email, or USB drive'
    ],
    status: 'published'
  },
  {
    id: 'serv-4',
    slug: 'scanning-services',
    title: 'Document Scanning',
    shortDescription: 'High-resolution scanning of certificates, photos, marks-sheets, and signatures for official forms.',
    fullDescription: 'Clear, crisp 300 to 1200 DPI flatbed scanning. We convert your physical documents into compressed, portal-compliant JPG, PNG, and PDF files ready for online job applications and admissions.',
    icon: 'Scan',
    image: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=800&q=80',
    estimatedTime: 'Immediate / 5 Mins',
    priceEstimate: '₹10 per document',
    features: [
      'Exact file size compression (e.g. 50KB to 200KB) for govt portals',
      'Passport size photo cropping & background touch-up',
      'Multi-page single PDF creation',
      'Color and grayscale scanning',
      'Instant send to customer WhatsApp or email'
    ],
    status: 'published'
  },
  {
    id: 'serv-5',
    slug: 'photocopy-zerox',
    title: 'Photocopy / Xerox',
    shortDescription: 'Crystal clear photocopying for study notes, books, IDs, and office records with duplex options.',
    fullDescription: 'Fast photocopying with dark, sharp text. Bulk Xerox facility for teachers, coaching classes, advocates, and college students at the most affordable rates in town.',
    icon: 'Copy',
    image: 'https://images.unsplash.com/photo-1589330694653-dad6d3240a2b?auto=format&fit=crop&w=800&q=80',
    estimatedTime: 'Immediate',
    priceEstimate: '₹1.50 - ₹2 per copy',
    features: [
      'High-speed auto document feeder',
      'A4, Legal, and A3 paper support',
      'Automatic double-sided (duplex) copy',
      'ID Card 2-in-1 same-side Xerox',
      'Spiral binding and stapling services'
    ],
    status: 'published'
  },
  {
    id: 'serv-6',
    slug: 'online-form-filling',
    title: 'Online Form Submission',
    shortDescription: 'Error-free online filling for Govt jobs, college admissions, scholarship, PAN card & exams.',
    fullDescription: 'Never risk your job or exam application due to silly form errors. We handle the entire application process: registration, fee payment, photo/signature optimization, and print final confirmation.',
    icon: 'FileText',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    estimatedTime: '15-20 Mins',
    priceEstimate: '₹50 - ₹100 service charge',
    features: [
      'SSC, UPSC, State PSC, Police, Railway & Banking forms',
      'College admissions (UG / PG) and scholarship portals',
      'New PAN card application & correction',
      'Secure payment gateway with receipt printout',
      'SMS tracking and admit card reminder assistance'
    ],
    status: 'published'
  },
  {
    id: 'serv-7',
    slug: 'document-work',
    title: 'Document & Resume Work',
    shortDescription: 'Professional modern CV/Resume crafting, project spiral binding, lamination & legal formatting.',
    fullDescription: 'Make a great impression on recruiters. We design modern ATS-friendly resumes, bio-data for marriage/jobs, rent agreements, notary drafts, and provide sturdy hot lamination to preserve marks-sheets.',
    icon: 'FileCheck',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
    estimatedTime: '20-30 Mins',
    priceEstimate: '₹50 - ₹150',
    features: [
      'Modern ATS-compatible Resume / CV templates',
      'Hindi & English Bio-data design',
      'Thermal pouch lamination (Waterproof & Durable)',
      'Spiral binding with transparent protective covers',
      'Affidavits, declarations and certificates design'
    ],
    status: 'published'
  },
  {
    id: 'serv-8',
    slug: 'software-installation',
    title: 'Software Installation',
    shortDescription: 'Genuine Windows OS setup, MS Office, Antivirus, device drivers, and utility software installation.',
    fullDescription: 'Is your computer running slow or showing blue-screen errors? We install clean Windows 10/11 operating systems, update missing audio/graphics/network drivers, and setup licensed antivirus suites.',
    icon: 'Download',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    estimatedTime: '1-2 Hours / Same Day',
    priceEstimate: '₹200 - ₹500',
    features: [
      'Windows 10 / Windows 11 clean installation',
      'Microsoft Office 2021 / 365 configuration',
      'Quick Heal / K7 / Kaspersky Antivirus setup',
      'Printer and scanner driver installations',
      'Hindi font packages (Kruti Dev, Devlys, Mangal) setup'
    ],
    status: 'published'
  },
  {
    id: 'serv-9',
    slug: 'computer-setup-maintenance',
    title: 'Computer Setup & Maintenance',
    shortDescription: 'Desktop assembly, SSD upgrade, RAM enhancement, thermal paste application & hardware repair.',
    fullDescription: 'Boost your old desktop or laptop speed by 10x with our instant SSD upgrades. We provide complete hardware diagnostic checks, dust cleaning, cable management, and home/office PC assembly.',
    icon: 'Cpu',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80',
    estimatedTime: 'Same Day Service',
    priceEstimate: 'Diagnostics from ₹150',
    features: [
      'Old PC to Superfast SSD upgrade (128GB / 256GB / 512GB)',
      'DDR3 / DDR4 RAM upgrade for smooth multitasking',
      'Custom PC assembly for offices, gaming & video editing',
      'Deep motherboard dust cleaning & fan replacement',
      'Power supply (SMPS) and cabinet maintenance'
    ],
    status: 'published'
  },
  {
    id: 'serv-10',
    slug: 'digital-services',
    title: 'Digital & Citizen Services',
    shortDescription: 'Aadhaar PVC card ordering, electricity/water bill payments, money transfer & DigiLocker setup.',
    fullDescription: 'A one-stop digital hub for all your e-governance and banking needs. From downloading original Aadhaar cards to booking train tickets and paying electricity bills, we make digital life simple.',
    icon: 'Globe',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    estimatedTime: 'Immediate / 5-10 Mins',
    priceEstimate: '₹20 - ₹50 service fee',
    features: [
      'Official Aadhaar PVC Smart Card booking',
      'Instant Electricity, Water, Gas & Mobile recharge',
      'IRCTC Train & Bus ticket booking with instant PNR status',
      'Fast Domestic Money Remittance & AePS balance enquiry',
      'DigiLocker document retrieval and verification'
    ],
    status: 'published'
  }
];

export const initialJobs: JobOpening[] = [
  {
    id: 'job-1',
    title: 'Computer Operator / Office Assistant',
    company: 'Shree Balaji Traders & Logistics',
    location: 'City Center / Station Road',
    qualification: '12th Pass or Any Graduate',
    experience: '0 - 2 Years (Freshers Welcome)',
    salary: '₹12,000 - ₹16,000 / month',
    description: 'Looking for a dedicated Computer Operator to manage daily invoice typing, client email correspondence, maintaining Excel stock sheets, and basic office filing.',
    skillsRequired: ['Basic Computer', 'MS Excel', 'MS Word', 'English & Hindi Typing'],
    jobType: 'Full-time',
    lastDate: '2026-10-25',
    applicationContact: '+91 98765 43210 (Mayank Placement Cell)',
    status: 'active'
  },
  {
    id: 'job-2',
    title: 'Junior Tally Accountant',
    company: 'Apex Pharmaceuticals & Healthcare',
    location: 'Industrial Area, Phase 2',
    qualification: 'B.Com / 12th Commerce with Tally Diploma',
    experience: '6 Months - 1 Year (Mayank Computer students preferred)',
    salary: '₹15,000 - ₹20,000 / month',
    description: 'Responsible for recording sales and purchase vouchers in Tally Prime, issuing GST invoices, maintaining customer ledger accounts, and reconciling weekly bank statements.',
    skillsRequired: ['Tally Prime', 'GST Vouchers', 'MS Excel', 'Bank Reconciliation'],
    jobType: 'Full-time',
    lastDate: '2026-10-30',
    applicationContact: 'careers@mayankcomputer.com',
    status: 'active'
  },
  {
    id: 'job-3',
    title: 'Hindi & English Typist (Court & Legal Work)',
    company: 'Verma & Associates Legal Consultancy',
    location: 'District Court Complex',
    qualification: '10th / 12th Pass with Typing Certification',
    experience: '0 - 1 Year',
    salary: '₹10,000 - ₹14,000 / month + Incentives',
    description: 'Required typist proficient in Kruti Dev 010 and English typing to prepare legal deeds, client notices, affidavits, and case petitions accurately.',
    skillsRequired: ['Hindi Kruti Dev Typing (30+ WPM)', 'English Typing (35+ WPM)', 'MS Word Page Setup'],
    jobType: 'Full-time',
    lastDate: '2026-10-20',
    applicationContact: '+91 98765 43210',
    status: 'active'
  },
  {
    id: 'job-4',
    title: 'Data Entry Operator (Govt Project Support)',
    company: 'City E-Governance Service Center',
    location: 'Tehsil Complex / Civil Lines',
    qualification: '12th Pass (Any Stream)',
    experience: 'Fresher or Experienced',
    salary: '₹11,000 - ₹14,500 / month',
    description: 'Digitization of citizen application forms, land records verification entry, and uploading scanned documents into municipal database portals.',
    skillsRequired: ['Fast Data Entry', 'Numeric Keypad Speed', 'Scanning & PDF conversion'],
    jobType: 'Contract',
    lastDate: '2026-10-28',
    applicationContact: 'placement@mayankcomputer.com',
    status: 'active'
  },
  {
    id: 'job-5',
    title: 'Computer Hardware & Network Trainee',
    company: 'TechServe Solutions & Retail',
    location: 'Main Commercial Market',
    qualification: 'ITI / Diploma / 12th with Hardware Interest',
    experience: 'Fresher (Training provided)',
    salary: '₹9,000 - ₹12,000 / month (Stipend + Review)',
    description: 'Trainee engineer to assist senior technicians in desktop troubleshooting, Windows installation, printer servicing, and LAN cable crimping.',
    skillsRequired: ['Hardware Awareness', 'MS-DOS Commands', 'OS Installation', 'Problem Solving'],
    jobType: 'Trainee',
    lastDate: '2026-11-05',
    applicationContact: '+91 98765 43210',
    status: 'active'
  }
];

export const initialEducation: EducationRecord[] = [
  {
    id: 'edu-1',
    qualification: 'Master of Computer Applications (MCA)',
    institution: 'State Technical University',
    year: '2016 - 2019',
    gradeOrScore: 'First Class with Distinction',
    description: 'Advanced coursework in Software Systems, Database Management (RDBMS), Operating Systems Architecture, and Object-Oriented Technologies.',
    keySkills: ['Advanced Computing', 'Software Architecture', 'System Administration', 'Database Design']
  },
  {
    id: 'edu-2',
    qualification: 'Bachelor of Computer Applications (BCA)',
    institution: 'Government Excellence College',
    year: '2013 - 2016',
    gradeOrScore: 'Grade A',
    description: 'Foundation in computer science, data structures, office automation, web tools, computer architecture, and commercial application software.',
    keySkills: ['Computer Fundamentals', 'Office Automation', 'Programming Logic', 'Hardware Basics']
  },
  {
    id: 'edu-3',
    qualification: 'Post Graduate Diploma in Computer Applications (PGDCA)',
    institution: 'National University of Technical Training',
    year: '2015',
    gradeOrScore: 'Merit Holder',
    description: 'Hands-on diploma covering MS Office automation, advanced Excel, desktop publishing (DTP), and financial accounting software.',
    keySkills: ['MS Office Suite', 'Tally Accounting', 'Desktop Publishing', 'Typing Methodologies']
  },
  {
    id: 'edu-4',
    qualification: 'Microsoft Certified Professional & Tally Certified',
    institution: 'Authorized Certification Institute',
    year: '2018',
    gradeOrScore: 'Certified Specialist',
    description: 'Official corporate validation for advanced spreadsheet modeling, document workflow automations, and GST compliance reporting.',
    keySkills: ['Advanced Excel', 'GST Accounting', 'Voucher Auditing', 'Corporate IT Training']
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'High-Tech Computer Training Lab',
    category: 'lab',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    description: 'Modern air-conditioned computer lab equipped with high-speed Core i5/i7 workstations, dual monitors, and gigabit fiber internet.',
    date: '2026-02-15'
  },
  {
    id: 'gal-2',
    title: 'Hands-On Student Practical Session',
    category: 'students',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    description: 'Students working on real-world Excel data sheets and practical typing drills with direct faculty guidance.',
    date: '2026-02-20'
  },
  {
    id: 'gal-3',
    title: 'Annual Certificate Distribution Ceremony',
    category: 'certificates',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    description: 'Awarding government-recognized course completion certificates to our successful batch of MS Office & Tally students.',
    date: '2026-01-28'
  },
  {
    id: 'gal-4',
    title: 'Tally Prime & GST Special Workshop',
    category: 'training',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    description: 'Interactive weekend workshop on electronic invoicing, GST returns preparation, and real business ledger management.',
    date: '2026-02-10'
  },
  {
    id: 'gal-5',
    title: 'Digital Services & Citizen Help Desk',
    category: 'office',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
    description: 'Front office dedicated to fast citizen digital forms, color printing, Xerox, and document preparation.',
    date: '2026-03-01'
  },
  {
    id: 'gal-6',
    title: 'Typing Speed Championship & Awards',
    category: 'events',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    description: 'Celebrating high-speed typing champions achieving over 55+ Words Per Minute in Hindi and English touch typing.',
    date: '2026-02-05'
  },
  {
    id: 'gal-7',
    title: 'Hardware & OS Troubleshooting Lab',
    category: 'lab',
    image: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=1200&q=80',
    description: 'Dedicated workbench where students learn hands-on RAM upgrades, SSD installation, and BIOS settings.',
    date: '2026-01-18'
  },
  {
    id: 'gal-8',
    title: 'Campus Placement & Job Fair Day',
    category: 'events',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    description: 'Local business owners and corporate managers interviewing our certified computer students for direct placements.',
    date: '2026-03-12'
  }
];

export const initialProfile: ProfileData = {
  name: 'Mayank Kumar',
  role: 'Founder, Director & Lead Technical Trainer',
  bio: 'A passionate educator and technical specialist with over 10+ years of experience empowering rural and urban youth through practical digital literacy, corporate office skills, and government exam preparation. Founder of Mayank Computer, committed to making computer education affordable, practical, and job-oriented.',
  experienceYears: 12,
  qualifications: [
    'MCA (Master of Computer Applications)',
    'BCA (Bachelor of Computer Applications)',
    'Certified Microsoft Office Specialist (MOS)',
    'Authorized Tally Accounting Trainer',
    'Certified Hardware & System Network Engineer'
  ],
  skills: [
    {
      category: 'Software & Office Mastery',
      items: ['MS Word (Legal & Official)', 'MS Excel (VLOOKUP, Pivots, MIS)', 'MS PowerPoint', 'Outlook & Teams']
    },
    {
      category: 'Accounting & Commercial',
      items: ['Tally Prime', 'GST Returns & Invoicing', 'Voucher Auditing', 'Inventory Tracking']
    },
    {
      category: 'Operating Systems & CLI',
      items: ['Windows 11 / 10 Administration', 'MS-DOS Commands', 'Batch Scripting', 'System Recovery']
    },
    {
      category: 'Typing & Languages',
      items: ['Hindi Kruti Dev 010 (50+ WPM)', 'Hindi Mangal InScript', 'English Touch Typing (60+ WPM)']
    },
    {
      category: 'Hardware & Maintenance',
      items: ['PC Assembly', 'SSD / RAM Upgrades', 'Printer / Scanner Setup', 'LAN / Wi-Fi Networking']
    }
  ],
  privacySettings: {
    showEmail: true,
    showPhone: true,
    showAddress: true,
    showPersonalBio: true
  },
  contactEmail: 'mayank.director@mayankcomputer.com',
  contactPhone: '+91 98765 43210',
  address: 'Mayank Computer Institute, Main Road, Nagpura, Durg, Chhattisgarh - 491001'
};

export const initialEnquiries: Enquiry[] = [
  {
    id: 'enq-101',
    name: 'Rahul Sharma',
    mobile: '9823456781',
    email: 'rahul.sharma@example.com',
    subject: 'MS Excel (Basic to Advanced)',
    message: 'I am preparing for an accounts assistant interview next month. Do you offer evening weekend batches for Advanced Excel formulas?',
    status: 'new',
    createdAt: '2026-03-30 14:20'
  },
  {
    id: 'enq-102',
    name: 'Pooja Verma',
    mobile: '9712345678',
    email: 'pooja.verma@example.com',
    subject: 'Hindi Typing (Kruti Dev / Mangal)',
    message: 'Need speed test practice for the upcoming High Court Clerk exam. Can I join for 2 hours daily lab time?',
    status: 'contacted',
    createdAt: '2026-03-29 11:15',
    notes: 'Called and offered 3 PM to 5 PM slot. Student joining this Monday.'
  },
  {
    id: 'enq-103',
    name: 'Amit Patel',
    mobile: '9898765432',
    email: 'amit.patel@example.com',
    subject: 'Digital Services: Aadhaar PVC & Document Work',
    message: 'Need urgent color printing and spiral binding for 120 pages of thesis report along with PVC ID card printing.',
    status: 'closed',
    createdAt: '2026-03-28 16:45',
    notes: 'Completed and delivered on same day.'
  }
];

export const initialCertificates: StudentCertificate[] = [
  {
    certificateId: 'MC-2026-1042',
    studentName: 'Sanjay Rawat',
    fatherName: 'Ramkishan Rawat',
    courseName: 'Complete MS Office Suite & Typing',
    grade: 'A+ (Excellent)',
    issueDate: '2026-02-15',
    duration: '3 Months (90 Hours)',
    status: 'verified'
  },
  {
    certificateId: 'MC-2026-1088',
    studentName: 'Neha Rajput',
    fatherName: 'Vikram Singh Rajput',
    courseName: 'Tally Prime with GST & Financial Accounting',
    grade: 'A (Distinction)',
    issueDate: '2026-03-10',
    duration: '3 Months (80 Hours)',
    status: 'verified'
  },
  {
    certificateId: 'MC-2026-0914',
    studentName: 'Mohit Agrawal',
    fatherName: 'Dinesh Agrawal',
    courseName: 'Basic Computer Fundamentals & Internet',
    grade: 'A+ (Outstanding)',
    issueDate: '2026-01-20',
    duration: '2 Months (60 Hours)',
    status: 'verified'
  }
];
