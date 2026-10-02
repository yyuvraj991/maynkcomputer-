/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { NoticeBanner } from './components/NoticeBanner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Courses } from './components/Courses';
import { Services } from './components/Services';
import { JobsPlacement } from './components/JobsPlacement';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { PCBuildRepairPage } from './components/PCBuildRepairPage';
import { LokSevaKendraPage } from './components/LokSevaKendraPage';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ToastContainer } from './components/ToastContainer';
import { CourseModal } from './components/CourseModal';
import { ServiceModal } from './components/ServiceModal';
import { JobModal } from './components/JobModal';
import { LightboxModal } from './components/LightboxModal';
import { EnquiryModal } from './components/EnquiryModal';
import { CertificateVerificationModal } from './components/CertificateVerificationModal';
import { StudentAdmissionModal } from './components/StudentAdmissionModal';
import { AdminModal } from './components/admin/AdminModal';

const MainLayout: React.FC = () => {
  const { setIsAdminModalOpen, setIsVerifyModalOpen, setIsStudentRegModalOpen, currentPage } = useApp();
  const [adminInitialTab, setAdminInitialTab] = useState<string>('dashboard');

  const handleOpenAdminTab = (tab: string) => {
    setAdminInitialTab(tab);
    setIsAdminModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-blue-600 selection:text-white">
      {/* Top Banner Notice */}
      <NoticeBanner />

      {/* Main Navigation Header */}
      <Header
        onOpenAdmin={() => handleOpenAdminTab('dashboard')}
        onOpenVerify={() => setIsVerifyModalOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'lok-seva' ? (
          <LokSevaKendraPage />
        ) : currentPage === 'pc-build' ? (
          <PCBuildRepairPage />
        ) : (
          <>
            <Hero
              onOpenAdmissionModal={() => setIsStudentRegModalOpen(true)}
              onOpenVerify={() => setIsVerifyModalOpen(true)}
            />
            <Courses onOpenAdminTab={handleOpenAdminTab} />
            <Services onOpenAdminTab={handleOpenAdminTab} />
            <JobsPlacement onOpenAdminTab={handleOpenAdminTab} />
            <Gallery onOpenAdminTab={handleOpenAdminTab} />
            <About onOpenAdminTab={handleOpenAdminTab} />
            <Contact />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => handleOpenAdminTab('dashboard')}
        onOpenVerify={() => setIsVerifyModalOpen(true)}
      />

      {/* Always-on Interactive Elements */}
      <FloatingWhatsApp />
      <ToastContainer />

      {/* Modals & Dialogs */}
      <CourseModal />
      <ServiceModal />
      <JobModal />
      <LightboxModal />
      <EnquiryModal />
      <CertificateVerificationModal />
      <StudentAdmissionModal />
      <AdminModal initialTab={adminInitialTab} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
