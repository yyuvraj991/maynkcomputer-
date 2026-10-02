import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Award,
  Search,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  Printer,
  ShieldCheck,
  Building
} from 'lucide-react';

export const CertificateVerificationModal: React.FC = () => {
  const { isVerifyModalOpen, setIsVerifyModalOpen, certificates } = useApp();
  const [certIdInput, setCertIdInput] = useState('');
  const [searchedId, setSearchedId] = useState<string | null>(null);

  if (!isVerifyModalOpen) return null;

  const foundCert = searchedId
    ? certificates.find((c) => c.certificateId.toLowerCase() === searchedId.toLowerCase().trim())
    : null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certIdInput.trim()) return;
    setSearchedId(certIdInput.trim());
  };

  const handleSampleClick = (id: string) => {
    setCertIdInput(id);
    setSearchedId(id);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in"
      onClick={() => setIsVerifyModalOpen(false)}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Official Verification Portal
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                Verify Student Certificate
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsVerifyModalOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar Form */}
        <div className="p-6 border-b border-slate-100">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Certificate No. (e.g. MC-2026-1042)"
                value={certIdInput}
                onChange={(e) => setCertIdInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600 font-mono uppercase"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer"
            >
              Verify
            </button>
          </form>

          {/* Sample quick clicks */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
            <span>Try sample certificate:</span>
            {certificates.slice(0, 3).map((cert) => (
              <button
                key={cert.certificateId}
                type="button"
                onClick={() => handleSampleClick(cert.certificateId)}
                className="font-mono text-[11px] font-semibold text-blue-700 hover:underline bg-blue-50 px-2 py-0.5 rounded cursor-pointer"
              >
                {cert.certificateId}
              </button>
            ))}
          </div>
        </div>

        {/* Verification Result Area */}
        <div className="p-6">
          {searchedId && !foundCert && (
            <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-center">
              <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-slate-900">
                No Certificate Record Found
              </h4>
              <p className="mt-1 text-xs text-slate-600 max-w-sm mx-auto">
                No verified record found for Certificate ID <strong>"{searchedId}"</strong>. Please verify the ID on your printed certificate or contact Mayank Computer office for manual verification.
              </p>
            </div>
          )}

          {foundCert && (
            <div className="border-2 border-amber-300 rounded-2xl p-6 bg-gradient-to-b from-amber-50/40 via-white to-slate-50 shadow-inner relative">
              {/* Authenticity Watermark */}
              <div className="flex items-center justify-between border-b border-amber-200/80 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                  <div>
                    <span className="text-[11px] font-extrabold text-emerald-700 uppercase tracking-wider block">
                      Authentic & Verified Record
                    </span>
                    <span className="text-xs text-slate-500">
                      Mayank Computer Central Student Registry
                    </span>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-slate-800 bg-white px-3 py-1 rounded-lg border border-amber-200 shadow-2xs">
                  {foundCert.certificateId}
                </span>
              </div>

              {/* Student details grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Student Name</span>
                  <span className="text-base font-bold text-slate-900 block mt-0.5">
                    {foundCert.studentName}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block font-medium">Father's Name</span>
                  <span className="text-sm font-bold text-slate-800 block mt-0.5">
                    {foundCert.fatherName}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block font-medium">Course Completed</span>
                  <span className="text-sm font-bold text-blue-900 block mt-0.5">
                    {foundCert.courseName}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block font-medium">Course Duration</span>
                  <span className="text-sm font-semibold text-slate-800 block mt-0.5">
                    {foundCert.duration}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block font-medium">Grade / Performance</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded inline-block mt-0.5">
                    {foundCert.grade}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block font-medium">Date of Issue</span>
                  <span className="text-xs font-semibold text-slate-800 block mt-0.5">
                    {foundCert.issueDate}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <span>Issued by: Director, Mayank Computer Center</span>
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:text-blue-900 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Verification</span>
                </button>
              </div>
            </div>
          )}

          {!searchedId && (
            <div className="text-center py-6 text-xs text-slate-500">
              <FileCheck2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              Enter the Certificate Roll / ID number printed on your Mayank Computer certificate to verify genuineness for government and corporate employer submissions.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
