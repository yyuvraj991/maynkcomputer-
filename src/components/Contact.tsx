import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Navigation,
  Send,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { settings, courses, services, submitEnquiry } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    subject: 'Basic Computer Course',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.mobile.trim()) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      submitEnquiry({
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        subject: formData.subject,
        message: formData.message || 'Interested in details, next batch schedule, and fees.'
      });
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        mobile: '',
        email: '',
        subject: 'Basic Computer Course',
        message: ''
      });
    }, 400);
  };

  const handleWhatsAppDirect = () => {
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Hello Mayank Computer! I have a general enquiry regarding your courses and digital services. Please share more details.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-10 sm:py-14 bg-slate-50 border-b border-slate-200 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
            Get in Touch
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact Mayank Computer
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Have questions about new admissions, batch timings, fees, or urgent digital print/scan services? Reach out directly or drop us a message.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards & Map View */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <h3 className="text-xl font-bold text-slate-900">
                Mayank Computer Center
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Authorized Computer Training & Citizen Digital Service Center
              </p>

              {/* Info Items List */}
              <div className="mt-6 space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Institute Address
                    </div>
                    <p className="font-semibold text-slate-800 mt-0.5 leading-snug">
                      {settings.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Phone Number
                    </div>
                    <a
                      href={`tel:${settings.primaryPhone.replace(/\s+/g, '')}`}
                      className="font-semibold text-blue-700 hover:underline mt-0.5 block"
                    >
                      {settings.primaryPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      WhatsApp Support
                    </div>
                    <span className="font-semibold text-slate-800 mt-0.5 block">
                      {settings.whatsappNumber}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Email Address
                    </div>
                    <a
                      href={`mailto:${settings.email}`}
                      className="font-semibold text-slate-800 hover:text-blue-700 mt-0.5 block"
                    >
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Opening Hours
                    </div>
                    <p className="font-semibold text-slate-800 mt-0.5 leading-snug">
                      Mon - Sat: 8:00 AM - 8:00 PM | <span className="text-rose-600 font-bold">Sunday: Closed</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href={`tel:${settings.primaryPhone.replace(/\s+/g, '')}`}
                  className="py-2.5 px-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs rounded-xl text-center shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>

                <button
                  onClick={handleWhatsAppDirect}
                  className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl text-center shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>

                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-blue-700" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Embedded Visual Map Preview */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs">
              <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-blue-700" />
                  Location Map — Nagpura, Durg, Chhattisgarh 491001
                </span>
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  Open in Google Maps ↗
                </a>
              </div>
              <div className="relative aspect-[16/9] w-full bg-slate-200 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1000&q=80"
                  alt="City Map Location"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-blue-950/20 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl animate-bounce mb-2">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="bg-white/95 px-4 py-2 rounded-xl shadow-lg border border-slate-200 text-xs">
                    <p className="font-extrabold text-slate-900">MAYANK COMPUTER</p>
                    <p className="text-slate-600 text-[11px]">Nagpura, Durg, Chhattisgarh - 491001</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Enquiry Form */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-blue-700" />
                <h3 className="text-xl font-bold text-slate-900">
                  Send Admission or Service Enquiry
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Fill the details below and we will get back to you within 2 hours with all information.
              </p>

              {submitted ? (
                <div className="mt-8 p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-in zoom-in-95">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-slate-900">
                    Enquiry Submitted Successfully!
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                    Thank you. We have saved your enquiry in our student administration queue. Our director or team will call you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-5 px-4 py-2 bg-white text-emerald-700 border border-emerald-300 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Mobile Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Select Course or Service of Interest
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-blue-600"
                    >
                      <optgroup label="Computer Courses">
                        {courses.map((c) => (
                          <option key={c.id} value={`Course: ${c.title}`}>
                            Course: {c.title} ({c.duration})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Digital Services">
                        {services.map((s) => (
                          <option key={s.id} value={`Service: ${s.title}`}>
                            Service: {s.title}
                          </option>
                        ))}
                      </optgroup>
                      <option value="Placement & Job Assistance">Placement & Job Assistance</option>
                      <option value="General Question / Other">General Question / Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Message or Timing Preferences
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Mention your preferred batch timing (Morning/Evening) or specific work requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Submit Enquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-400 text-center">
                    🔒 Your mobile and personal details are strictly confidential.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
