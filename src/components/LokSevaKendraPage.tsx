import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  CreditCard,
  FileText,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowLeft,
  MessageCircle,
  Phone,
  Search,
  HelpCircle,
  Sparkles,
  MapPin,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Send,
  Zap,
  Users,
  Coins
} from 'lucide-react';

export const LokSevaKendraPage: React.FC = () => {
  const { settings, setCurrentPage, addToast } = useApp();
  const LOK_SEVA_WHATSAPP = '7879318811';
  const cleanLokSevaPhone = '917879318811';
  const [activeCategory, setActiveCategory] = useState<'banking' | 'edistrict' | 'bhuiyan' | 'idcards' | 'schemes'>('banking');
  const [selectedDocGuide, setSelectedDocGuide] = useState<string>('bank_account');
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquiryService, setEnquiryService] = useState('Bank of Baroda Cash / Account');
  const [enquiryNote, setEnquiryNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Document Requirements Checklist Database
  const documentGuides: Record<string, { title: string; desc: string; docs: string[]; timeline: string; fee: string }> = {
    bank_account: {
      title: 'नया बैंक खाता खोलने हेतु (Bank Account Opening)',
      desc: 'Bank of Baroda, Bank of Maharashtra एवं Chhattisgarh Rajya Gramin Bank में नया जीरो बैलेंस/बचत खाता।',
      docs: [
        'आधार कार्ड (Aadhaar Card) की मूल प्रति व फोटोकॉपी',
        'पैन कार्ड (PAN Card) या Form 60',
        '2 पासपोर्ट साइज नवीनतम रंगीन फोटो',
        'आधार से लिंक चालू मोबाइल नंबर (OTP सत्यापन हेतु)',
        'नामिनी (वारिसदार) का नाम व आधार विवरण'
      ],
      timeline: '15-30 मिनट में खाता नंबर जारी',
      fee: 'खाता प्रकार अनुसार न्यूनतम/जीरो'
    },
    aeps_cash: {
      title: 'आधार से नकद निकासी (AEPS Cash Withdrawal)',
      desc: 'किसी भी बैंक खाते से केवल अंगूठे के निशान (Fingerprint) द्वारा तुरंत नकद निकासी व बैलेंस जांच।',
      docs: [
        'खाताधारक का आधार नंबर (या बैंक का नाम व खाता नंबर)',
        'खाताधारक का बैंक खाते से आधार लिंक (DBT/Aadhaar Seeding) होना आवश्यक',
        'खाताधारक की स्वयं की उपस्थिति (बायोमेट्रिक फिंगरप्रिंट हेतु)'
      ],
      timeline: 'तुरंत 2 मिनट में नकद भुगतान + रसीद',
      fee: 'नि:शुल्क / बैंक नियमानुसार'
    },
    income_cert: {
      title: 'आय प्रमाण पत्र (Income Certificate)',
      desc: 'छात्रवृत्ति, कॉलेज प्रवेश, सरकारी योजनाओं एवं बैंक लोन हेतु अधिकृत डिजिटल आय प्रमाण पत्र।',
      docs: [
        'आवेदक / पालक का आधार कार्ड',
        'राशन कार्ड या बी-1 खसरा पर्ची',
        'पटवारी / पार्षद / सरपंच का आय प्रतिवेदन या सैलरी स्लिप',
        'पासपोर्ट साइज फोटो',
        'स्व-घोषणा शपथ पत्र (केंद्र पर उपलब्ध)'
      ],
      timeline: '3 से 7 कार्य दिवस (ई-डिस्ट्रिक्ट CG)',
      fee: 'शासकीय शुल्क + ऑनलाइन पोर्टल चार्ज'
    },
    caste_cert: {
      title: 'जाति प्रमाण पत्र (Caste Certificate - SC/ST/OBC)',
      desc: 'छत्तीसगढ़ शासन द्वारा मान्य डिजिटल हस्ताक्षरयुक्त स्थाई जाति प्रमाण पत्र।',
      docs: [
        'आवेदक का आधार कार्ड व अंकसूची',
        'पिता / दादा का 1984 (OBC) या 1950 (SC/ST) से पूर्व का मिशल/दाखिल खारिज/खसरा रिकॉर्ड',
        'पटवारी जांच प्रतिवेदन व वंशावली (Family Tree)',
        'राशन कार्ड व निवास प्रमाण',
        'ग्राम सभा / नगर पालिका का अनुमोदन प्रस्ताव'
      ],
      timeline: '15 से 30 कार्य दिवस',
      fee: 'पोर्टल नियमानुसार'
    },
    residence_cert: {
      title: 'निवास प्रमाण पत्र (Domicile / Resident Certificate)',
      desc: 'सरकारी नौकरी, व्यापम, सीजीपीएससी एवं शिक्षण संस्थानों में दाखिले हेतु अधिकृत मूल निवास।',
      docs: [
        'आवेदक का आधार कार्ड',
        'गत 5-10 वर्षों का निवास प्रमाण (बिजली बिल / राशन कार्ड / वोटर आईडी)',
        'प्राथमिक/माध्यमिक शिक्षा की अंकसूचियां (CG में अध्ययन का प्रमाण)',
        'पटवारी प्रतिवेदन व फोटो'
      ],
      timeline: '5 से 10 कार्य दिवस',
      fee: 'शासकीय शुल्क + पोर्टल चार्ज'
    },
    bhuiyan_b1: {
      title: 'खसरा B-1 एवं P-II डिजिटल नकल (Land Records)',
      desc: 'धान पंजीयन, केसीसी लोन, रजिस्ट्री एवं सीमांकन हेतु बारकोड व डिजिटल सिग्नेचर वाली अधिकृत नकल।',
      docs: [
        'ग्राम का नाम व हल्का नंबर',
        'खसरा नंबर या खातेदार (किसान) का पूरा नाम',
        'ऋण पुस्तिका (यदि उपलब्ध हो)'
      ],
      timeline: 'तुरंत 5 मिनट में प्रिंट व डिजिटल मुहर',
      fee: 'सस्ती शासकीय दर पर प्रति पृष्ठ'
    },
    pan_card: {
      title: 'नया पैन कार्ड / सुधार (Instant PAN Card)',
      desc: 'NSDL एवं UTI पोर्टल से नया पैन कार्ड (2 घंटे में e-PAN और 7 दिन में प्लास्टिक कार्ड घर पर)।',
      docs: [
        'आधार कार्ड (नाम व जन्मतिथि सही होनी चाहिए)',
        'आधार से लिंक मोबाइल नंबर (OTP हेतु) या बायोमेट्रिक फिंगरप्रिंट',
        '2 रंगीन पासपोर्ट साइज फोटो'
      ],
      timeline: 'e-PAN: 2 घंटे | Physical Card: 7-10 दिन',
      fee: 'शासकीय NSDL फीस लागू'
    },
    ayushman_card: {
      title: 'आयुष्मान कार्ड (Ayushman Bharat 5 Lakh Free Treatment)',
      desc: 'सालाना 5 लाख रुपये तक का मुफ्त इलाज कार्ड (राशन कार्ड या सूची में नाम अनुसार)।',
      docs: [
        'डिजिटल राशन कार्ड (खाद्य विभाग CG)',
        'परिवार के सभी सदस्यों का आधार कार्ड',
        'आधार से लिंक मोबाइल नंबर या लाइव फिंगरप्रिंट / फेस स्कैन'
      ],
      timeline: 'तुरंत 10 मिनट में PVC प्लास्टिक प्रिंट',
      fee: 'मात्र लैमिनेटेड कार्ड प्रिंटिंग शुल्क'
    }
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryName.trim() || !enquiryPhone.trim()) {
      addToast('कृपया अपना नाम और मोबाइल नंबर दर्ज करें।', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      addToast('सेवा अनुरोध प्राप्त हुआ! हम आपसे तुरंत संपर्क करेंगे।', 'success');

      const text = encodeURIComponent(
        `नमस्कार मयंक कंप्यूटर (लोक सेवा केंद्र नगपुरा)!\nमैं इस सेवा की जानकारी / काम करवाना चाहता हूँ:\n• नाम: ${enquiryName}\n• मोबाइल: ${enquiryPhone}\n• सेवा: ${enquiryService}\n• विवरण: ${enquiryNote || 'कृपया ज़रूरी दस्तावेज़ एवं समय बताएं।'}\n\nधन्यवाद!`
      );
      window.open(`https://wa.me/${cleanLokSevaPhone}?text=${text}`, '_blank');

      setEnquiryName('');
      setEnquiryPhone('');
      setEnquiryNote('');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Top Header Navigation Bar */}
      <div className="bg-slate-900 text-white border-b border-slate-800 sticky top-20 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => setCurrentPage('main')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 px-3.5 py-1.5 rounded-lg border border-slate-700 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            <span>Back to Main Institute</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>लोक सेवा केंद्र एवं बैंक BC पॉइंट • नगपुरा, दुर्ग (छ.ग.)</span>
          </div>
        </div>
      </div>

      {/* Hero Banner Section with Authentic Banking & Citizen Services Atmosphere */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-12 sm:py-16">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=2000&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/75" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3 bg-emerald-950/80 border border-emerald-800/80 px-3 py-1 rounded-md">
                <Landmark className="w-3.5 h-3.5" />
                शासकीय लोक सेवा केंद्र एवं अधिकृत ग्राहक सेवा केंद्र (CSP Point)
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                लोक सेवा केंद्र एवं <br />
                <span className="text-emerald-400">बैंक ग्राहक सेवा केंद्र (BC Point)</span>
              </h1>

              <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                नगपुरा एवं आसपास के सभी नागरिकों के लिए एक ही छत के नीचे अधिकृत <strong>Bank of Baroda</strong>, <strong>Bank of Maharashtra</strong> एवं <strong>Chhattisgarh Rajya Gramin Bank</strong> के नकद लेन-देन (निकासी/जमा), आधार एटीएम तथा ई-डिस्ट्रिक्ट आय, जाति, निवास व खसरा B-1 नकल की त्वरित सेवाएं।
              </p>

              {/* 3 Bank Badges Spotlight */}
              <div className="mt-6 pt-5 border-t border-slate-800/80">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  अधिकृत बैंकिंग सेवाएं (Authorized Banking CSP Partners):
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-orange-500/40 flex items-center gap-3 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center font-black text-sm">
                      BOB
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-white">Bank of Baroda</div>
                      <div className="text-[11px] text-orange-300">निकासी • जमा • ट्रांसफर</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/90 border border-blue-500/40 flex items-center gap-3 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-black text-sm">
                      BOM
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-white">Bank of Maharashtra</div>
                      <div className="text-[11px] text-blue-300">खाता खोलना • AEPS Cash</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/90 border border-emerald-500/40 flex items-center gap-3 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black text-sm">
                      CRGB
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-white">छत्तीसगढ़ ग्रामीण बैंक</div>
                      <div className="text-[11px] text-emerald-300">किसान सब्सिडी • पेंशन</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Quick Action Card */}
            <div className="lg:col-span-4 bg-slate-900/95 border border-slate-700/80 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-bold text-white">सेवा केंद्र समय (Timings)</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  सोम - शनि खुला
                </span>
              </div>

              <div className="my-4 space-y-2 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">सुबह का समय:</span>
                  <span className="font-bold text-white">08:00 AM – 01:30 PM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">दोपहर / शाम:</span>
                  <span className="font-bold text-white">03:30 PM – 07:30 PM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">आधार एटीएम सीमा:</span>
                  <span className="font-bold text-emerald-400">₹10,000 – ₹25,000 / दिन</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">रसीद एवं पावती:</span>
                  <span className="font-bold text-white">प्रत्येक लेन-देन की पक्की रसीद</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    window.open(
                      `https://wa.me/${cleanLokSevaPhone}?text=${encodeURIComponent('नमस्ते मयंक कंप्यूटर! मुझे लोक सेवा केंद्र / बैंक ग्राहक सेवा केंद्र (नगपुरा) की सेवा हेतु जानकारी चाहिए।')}`,
                      '_blank'
                    );
                  }}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>WhatsApp पर तुरंत पूछताछ करें</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white p-2 rounded-2xl shadow-lg border border-slate-200 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveCategory('banking')}
            className={`flex-1 min-w-[170px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeCategory === 'banking'
                ? 'bg-blue-700 text-white shadow-md shadow-blue-700/20'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Coins className="w-4 h-4" />
            <span>बैंकिंग व लेन-देन (BOB/BOM/CRGB)</span>
          </button>

          <button
            onClick={() => setActiveCategory('edistrict')}
            className={`flex-1 min-w-[170px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeCategory === 'edistrict'
                ? 'bg-blue-700 text-white shadow-md shadow-blue-700/20'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>ई-डिस्ट्रिक्ट (आय/जाति/निवास)</span>
          </button>

          <button
            onClick={() => setActiveCategory('bhuiyan')}
            className={`flex-1 min-w-[170px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeCategory === 'bhuiyan'
                ? 'bg-blue-700 text-white shadow-md shadow-blue-700/20'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>भुइयां खसरा B-1 व नक्शा</span>
          </button>

          <button
            onClick={() => setActiveCategory('idcards')}
            className={`flex-1 min-w-[170px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeCategory === 'idcards'
                ? 'bg-blue-700 text-white shadow-md shadow-blue-700/20'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>आधार, पैन, आयुष्मान व राशन</span>
          </button>

          <button
            onClick={() => setActiveCategory('schemes')}
            className={`flex-1 min-w-[170px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeCategory === 'schemes'
                ? 'bg-blue-700 text-white shadow-md shadow-blue-700/20'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>शासकीय योजनाएं व बिल</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* TAB 1: BANKING & CASH TRANSACTIONS */}
        {activeCategory === 'banking' && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-black text-slate-900">
                ग्राहक सेवा केंद्र बैंकिंग एवं नकद लेन-देन (CSP Point)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                बैंक जाए बिना तुरंत अंगूठा लगाकर पैसा निकालें, किसी भी खाते में पैसा जमा करें और नया बचत खाता खुलवाएं।
              </p>
            </div>

            {/* 3 Featured Bank Cards with Online Visuals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Bank of Baroda */}
              <div className="bg-white rounded-2xl border-2 border-orange-500/60 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 border border-orange-200 flex items-center justify-center font-black text-xl mb-4">
                    BOB
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    Bank of Baroda (बैंक ऑफ बड़ौदा)
                  </h3>
                  <p className="text-xs text-orange-700 font-semibold mt-1">
                    अधिकृत बैंक मित्र / बीसी पॉइंट
                  </p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    BOB खाताधारकों के लिए संपूर्ण बैंकिंग सुविधा। बैंक लाइन में लगे बिना तुरंत नकद निकासी, जमा एवं आधार लिंकिंग।
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>आधार से नकद निकासी (AEPS Cash)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>BOB खाते में नकद राशि जमा (Cash Deposit)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>बैलेंस जांच एवं मिनी स्टेटमेंट पर्ची</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>सरकारी सब्सिडी (DBT) भुगतान</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => {
                      window.open(
                        `https://wa.me/${cleanLokSevaPhone}?text=${encodeURIComponent('नमस्ते! मुझे Bank of Baroda नकद निकासी / लेन-देन के बारे में जानना है।')}`,
                        '_blank'
                      );
                    }}
                    className="w-full py-2.5 bg-orange-50 hover:bg-orange-100 text-orange-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-orange-600" />
                    <span>BOB सेवा हेतु संपर्क करें</span>
                  </button>
                </div>
              </div>

              {/* Bank of Maharashtra */}
              <div className="bg-white rounded-2xl border-2 border-blue-500/60 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center font-black text-xl mb-4">
                    BOM
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    Bank of Maharashtra (बैंक ऑफ महाराष्ट्र)
                  </h3>
                  <p className="text-xs text-blue-700 font-semibold mt-1">
                    अधिकृत ग्राहक सेवा केंद्र (CSP)
                  </p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    नया जीरो बैलेंस खाता खोलना, बायोमेट्रिक ई-केवाईसी, नकद लेन-देन और सरकारी योजनाओं का भुगतान।
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>नया बचत खाता तुरंत खोलना (Account Opening)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>अंगूठे से पैसा निकालना व जमा करना</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>पासबुक एंट्री एवं बैंक स्टेटमेंट सहायता</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>ATM कार्ड एवं चेकबुक आवेदन सहयोग</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => {
                      window.open(
                        `https://wa.me/${cleanLokSevaPhone}?text=${encodeURIComponent('नमस्ते! मुझे Bank of Maharashtra में खाता खोलना / पैसे का लेन-देन करना है।')}`,
                        '_blank'
                      );
                    }}
                    className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-blue-600" />
                    <span>BOM सेवा हेतु संपर्क करें</span>
                  </button>
                </div>
              </div>

              {/* Chhattisgarh Rajya Gramin Bank (CRGB) */}
              <div className="bg-white rounded-2xl border-2 border-emerald-500/60 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-black text-xl mb-4">
                    CRGB
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    छत्तीसगढ़ राज्य ग्रामीण बैंक (CRGB)
                  </h3>
                  <p className="text-xs text-emerald-700 font-semibold mt-1">
                    ग्रामीण एवं कृषक बैंकिंग सेवा
                  </p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    नगपुरा क्षेत्र के किसानों एवं ग्रामीणों के लिए समर्पित। महतारी वंदन, धान बोनस, किसान सम्मान निधि एवं वृद्धा पेंशन की सीधी निकासी।
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>महतारी वंदन योजना की राशि तुरंत निकालें</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>पीएम किसान सम्मान निधि निकासी</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>वृद्धा, विधवा एवं दिव्यांग पेंशन भुगतान</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>KCC एवं ग्रामीण बचत खाता लेन-देन</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => {
                      window.open(
                        `https://wa.me/${cleanLokSevaPhone}?text=${encodeURIComponent('नमस्ते! मुझे छत्तीसगढ़ राज्य ग्रामीण बैंक (CRGB) खाते से पैसा निकालना / चेक करना है।')}`,
                        '_blank'
                      );
                    }}
                    className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>CRGB सेवा हेतु संपर्क करें</span>
                  </button>
                </div>
              </div>
            </div>

            {/* General All-Bank AEPS & Money Transfer Bar */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                <div className="lg:col-span-2">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                    <Zap className="w-4 h-4" />
                    अखिल भारतीय बैंक सेवाएं (All Banks Supported)
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    SBI, PNB, Central Bank सहित भारत के किसी भी बैंक से नकद निकासी
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    यदि आपका खाता किसी भी बैंक में है और आधार से लिंक है, तो आप अपने बायोमेट्रिक अंगूठे से प्रतिदिन ₹10,000 से ₹25,000 तक नकद निकाल सकते हैं। साथ ही देश के किसी भी बैंक खाते में तुरंत पैसे भेज सकते हैं (IMPS/DMT)।
                  </p>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-center">
                  <div className="text-xs text-slate-400">दुकान पर उपलब्ध सुविधा</div>
                  <div className="text-lg font-black text-emerald-400 mt-1">Micro ATM & Biometric</div>
                  <div className="text-[11px] text-slate-300 mt-1">
                    Debit / ATM कार्ड स्वाइप करके भी नकद निकाल सकते हैं।
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: E-DISTRICT CERTIFICATES */}
        {activeCategory === 'edistrict' && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-black text-slate-900">
                ई-डिस्ट्रिक्ट छत्तीसगढ़ शासकीय प्रमाण पत्र सेवाएं
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                तहसील कार्यालय जाए बिना अपने गांव नगपुरा में ही अधिकृत डिजिटल हस्ताक्षर वाले प्रमाण पत्र बनवाएं।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'आय प्रमाण पत्र (Income Certificate)',
                  desc: 'छात्रवृत्ति, कॉलेज दाखिला, महतारी वंदन, राशन कार्ड और बैंक लोन हेतु मान्य डिजिटल आय प्रमाण पत्र।',
                  time: '3 से 7 दिन',
                  tag: 'अति आवश्यक'
                },
                {
                  title: 'निवास प्रमाण पत्र (Domicile Certificate)',
                  desc: 'छत्तीसगढ़ राज्य में स्थायी निवासी होने का अधिकृत प्रमाण पत्र। व्यापम एवं शासकीय नौकरी हेतु अनिवार्य।',
                  time: '5 से 10 दिन',
                  tag: 'डिजिटल हस्ताक्षर'
                },
                {
                  title: 'जाति प्रमाण पत्र (Caste SC/ST/OBC)',
                  desc: 'अन्य पिछड़ा वर्ग (OBC), अनुसूचित जाति (SC) एवं जनजाति (ST) का ऑनलाइन आवेदन एवं स्थाई प्रमाण पत्र।',
                  time: '15 से 30 दिन',
                  tag: 'स्थाई रिकॉर्ड'
                },
                {
                  title: 'जन्म प्रमाण पत्र (Birth Certificate)',
                  desc: 'नवजात शिशु एवं बच्चों का अधिकृत डिजिटल जन्म प्रमाण पत्र पंजीयन एवं डाउनलोड।',
                  time: '7 से 15 दिन',
                  tag: 'नागरिक सेवा'
                },
                {
                  title: 'मृत्यु प्रमाण पत्र (Death Certificate)',
                  desc: 'मृत्यु उपरांत वारिसनामा, बीमा दावा, बैंक खाता बंद व फौती नामांतरण हेतु आवश्यक प्रमाण पत्र।',
                  time: '7 से 15 दिन',
                  tag: 'वैधानिक'
                },
                {
                  title: 'विवाह पंजीयन (Marriage Registration)',
                  desc: 'विवाह प्रमाण पत्र का ऑनलाइन आवेदन, शपथ पत्र एवं सरकारी पंजीयन प्रपत्र तैयार करना।',
                  time: '15 दिन',
                  tag: 'पंजीयन'
                }
              ].map((cert, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {cert.tag}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        {cert.time}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {cert.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      {cert.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => {
                        window.open(
                          `https://wa.me/${cleanLokSevaPhone}?text=${encodeURIComponent(`नमस्ते! मुझे "${cert.title}" बनवाना है। कृपया आवश्यक दस्तावेज़ बताएं।`)}`,
                          '_blank'
                        );
                      }}
                      className="w-full py-2 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      आवेदन जानकारी प्राप्त करें →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: BHUIYAN & LAND RECORDS */}
        {activeCategory === 'bhuiyan' && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-black text-slate-900">
                राजस्व एवं भुइयां भूमि अभिलेख सेवाएं (CG Bhuiyan Land Records)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                किसानों एवं जमीन मालिकों के लिए तुरंत 5 मिनट में डिजिटल सिग्नेचर वाली खसरा बी-1 नकल और भू-नक्शा प्रिंट।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'डिजिटल खसरा बी-1 नकल (B-1 Record)',
                  desc: 'तहसीलदार/पटवारी के डिजिटल हस्ताक्षर व क्यूआर कोड वाली अधिकृत खसरा खतौनी नकल। धान खरीदी टोकन व बैंक लोन हेतु मान्य।',
                  action: 'तुरंत 2 मिनट में प्रिंट'
                },
                {
                  title: 'डिजिटल पी-II (P-II) खसरा पांचसाला',
                  desc: 'फसल विवरण, सिंचित/असिंचित रकबा, एवं काबिज कृषक का पांचसाला रिकॉर्ड प्रिंट।',
                  action: 'तुरंत प्रिंट'
                },
                {
                  title: 'भू-नक्शा (Land Map Print)',
                  desc: 'खसरा नंबर अनुसार ज़मीन का आधिकारिक भू-नक्शा पैमाना प्रिंट। चौहद्दी एवं रास्ता जांचने हेतु उपयोगी।',
                  action: 'हाई-क्वालिटी प्रिंट'
                },
                {
                  title: 'नामांतरण एवं फौती आवेदन',
                  desc: 'रजिस्ट्री उपरांत नया नाम चढ़ाने (नामांतरण) अथवा पूर्वज की मृत्यु उपरांत वारिसों के नाम फौती दर्ज कराने का ऑनलाइन फॉर्म।',
                  action: 'ऑनलाइन आवेदन'
                },
                {
                  title: 'सीमांकन एवं ऋण पुस्तिका नकल',
                  desc: 'पटवारी व राजस्व निरीक्षक (RI) द्वारा जमीन नाप-जोख (सीमांकन) का ऑनलाइन चालान व आवेदन।',
                  action: 'पोर्टल चालान'
                },
                {
                  title: 'धान उपार्जन किसान पंजीयन',
                  desc: 'खरीफ विपणन वर्ष में समर्थन मूल्य पर धान बेचने हेतु किसान कोड नवीनीकरण, रकबा संशोधन एवं नॉमिनी सत्यापन।',
                  action: 'धान खरीदी विशेष'
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mb-2 inline-block">
                      CG Bhuiyan Portal
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-700">{item.action}</span>
                    <button
                      onClick={() => {
                        window.open(
                          `https://wa.me/${cleanLokSevaPhone}?text=${encodeURIComponent(`नमस्ते! मुझे "${item.title}" निकलवाना है।`)}`,
                          '_blank'
                        );
                      }}
                      className="text-blue-700 font-bold hover:underline cursor-pointer"
                    >
                      प्रिंट करवाएं →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ID CARDS & CITIZEN IDENTITY */}
        {activeCategory === 'idcards' && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-black text-slate-900">
                पहचान पत्र, स्मार्ट प्लास्टिक कार्ड एवं राशन सेवाएं
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                ओरिजिनल वाटरप्रूफ PVC स्मार्ट कार्ड प्रिंटिंग, पैन कार्ड नया व सुधार, और आयुष्मान गोल्डन कार्ड।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'नया पैन कार्ड (PAN Card)',
                  desc: 'NSDL व UTI द्वारा 2 घंटे में e-PAN और घर पर प्लास्टिक कार्ड। बायोमेट्रिक अंगूठे से बिना दस्तावेज भेजे।',
                  badge: '2 घंटे में e-PAN'
                },
                {
                  title: 'आयुष्मान गोल्डन कार्ड',
                  desc: 'सालाना 5 लाख मुफ्त इलाज हेतु प्लास्टिक स्मार्ट कार्ड। राशन कार्ड से तुरंत डाउनलोड व प्रिंट।',
                  badge: '5 लाख मुफ्त इलाज'
                },
                {
                  title: 'आधार कार्ड PVC प्रिंट',
                  desc: 'ओरिजिनल प्लास्टिक कार्ड प्रिंट। पानी और टूटने से सुरक्षित, क्यूआर कोड स्कैनर सहित।',
                  badge: 'Waterproof PVC'
                },
                {
                  title: 'राशन कार्ड सुधार व e-KYC',
                  desc: 'नए सदस्य का नाम जोड़ना, नाम काटना, मुखिया परिवर्तन एवं परिवार का राशन ई-केवाईसी सत्यापन।',
                  badge: 'CG Khadya'
                },
                {
                  title: 'वोटर आईडी कार्ड (EPIC)',
                  desc: 'नया मतदाता सूची फॉर्म 6, नाम सुधार फॉर्म 8, एवं कलर प्लास्टिक वोटर कार्ड डाउनलोड।',
                  badge: 'ECI Portal'
                },
                {
                  title: 'ई-श्रम कार्ड (e-Shram)',
                  desc: 'असंगठित कर्मकार मजदूरों के लिए 2 लाख दुर्घटना बीमा वाला ई-श्रम कार्ड पंजीयन व अपडेट।',
                  badge: 'श्रमिक कार्ड'
                },
                {
                  title: 'ड्राइविंग लाइसेंस (Sarathi)',
                  desc: 'लर्निंग लाइसेंस, पक्का ड्राइविंग लाइसेंस आवेदन एवं वाहन आरसी ट्रांसफर फीस भुगतान।',
                  badge: 'Parivahan'
                },
                {
                  title: 'बिजली बिल एवं रसीद',
                  desc: 'CSPDCL छत्तीसगढ़ बिजली बिल तुरंत भुगतान और सरकारी पक्की रसीद प्राप्त करें।',
                  badge: 'CSPDCL Bill'
                }
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 mb-2 inline-block">
                      {card.badge}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => {
                        window.open(
                          `https://wa.me/${cleanLokSevaPhone}?text=${encodeURIComponent(`नमस्ते! मुझे "${card.title}" की सेवा चाहिए।`)}`,
                          '_blank'
                        );
                      }}
                      className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      सेवा बुक करें →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SCHEMES & WELFARE */}
        {activeCategory === 'schemes' && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-black text-slate-900">
                छत्तीसगढ़ सरकारी योजनाएं एवं ऑनलाइन फॉर्म
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                महतारी वंदन, पीएम किसान सम्मान निधि, सुकन्या समृद्धि एवं श्रम विभाग की समस्त योजनाओं के फॉर्म व स्टेटस जांच।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'महतारी वंदन योजना (Mahtari Vandan)',
                  desc: 'प्रतिमाह ₹1,000 की सरकारी सहायता राशि का स्टेटस, आधार सीडिंग व बैंक खाते में राशि जांच एवं नकद निकासी।',
                  status: 'चालू योजना'
                },
                {
                  title: 'पीएम किसान सम्मान निधि (PM Kisan)',
                  desc: 'सालाना ₹6,000 की किश्त हेतु बायोमेट्रिक ई-केवाईसी (e-KYC), नया किसान पंजीयन व लैंड सीडिंग सुधार।',
                  status: 'e-KYC अनिवार्य'
                },
                {
                  title: 'भवन एवं संनिर्माण कर्मकार श्रम कार्ड',
                  desc: 'श्रमिक पंजीयन, छात्रवृत्ति योजना, सायकल योजना, एवं औजार सहायता अनुदान फॉर्म ऑनलाइन जमा।',
                  status: 'श्रम विभाग CG'
                },
                {
                  title: 'पेंशन योजनाएं (वृद्धा / विधवा / दिव्यांग)',
                  desc: 'समाज कल्याण विभाग पेंशन आवेदन, जीवन प्रमाण पत्र (Jeevan Pramaan) बायोमेट्रिक सत्यापन।',
                  status: 'पेंशन सत्यापन'
                },
                {
                  title: 'सुकन्या समृद्धि योजना सहयोग',
                  desc: 'बालिकाओं के भविष्य हेतु डाकघर/बैंक बचत खाता विवरण एवं वार्षिक किश्त जमा सहयोग।',
                  status: 'बालिका बचत'
                },
                {
                  title: 'वाहन बीमा (Vehicle Insurance)',
                  desc: 'बाइक, कार, ट्रैक्टर एवं कमर्शियल वाहन का तुरंत 5 मिनट में फर्स्ट पार्टी व थर्ड पार्टी इंश्योरेंस।',
                  status: 'तुरंत पॉलिसी'
                }
              ].map((scheme, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mb-2 inline-block">
                      {scheme.status}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      {scheme.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      {scheme.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => {
                        window.open(
                          `https://wa.me/${cleanLokSevaPhone}?text=${encodeURIComponent(`नमस्ते! मुझे "${scheme.title}" के फॉर्म / स्टेटस की जानकारी चाहिए।`)}`,
                          '_blank'
                        );
                      }}
                      className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      योजना जानकारी लें →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INTERACTIVE DOCUMENT CHECKLIST SECTION (दस्तावेज़ क्या-क्या लगेंगे) */}
        <div className="mt-14 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              जरूरी कागजात सूची (Required Documents Guide)
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              दुकान आने से पहले चेक करें: कौन से दस्तावेज़ साथ लाने हैं?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              नीचे दी गई सेवा पर क्लिक करें और देखें कि आवेदन हेतु आपको क्या-क्या ओरिजिनल या फोटोकॉपी साथ लानी होगी।
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Button Selector */}
            <div className="lg:col-span-5 space-y-2">
              {[
                { id: 'bank_account', label: '1. नया बैंक खाता (BOB / BOM / CRGB)' },
                { id: 'aeps_cash', label: '2. आधार से पैसा निकालना (AEPS Cash)' },
                { id: 'income_cert', label: '3. आय प्रमाण पत्र (Income Certificate)' },
                { id: 'caste_cert', label: '4. जाति प्रमाण पत्र (Caste Certificate)' },
                { id: 'residence_cert', label: '5. निवास प्रमाण पत्र (Resident/Domicile)' },
                { id: 'bhuiyan_b1', label: '6. खसरा B-1 व P-II ज़मीन नकल' },
                { id: 'pan_card', label: '7. नया पैन कार्ड (Instant PAN)' },
                { id: 'ayushman_card', label: '8. आयुष्मान कार्ड (Ayushman Card)' },
              ].map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDocGuide(doc.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-between cursor-pointer ${
                    selectedDocGuide === doc.id
                      ? 'bg-blue-700 text-white shadow-md'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  <span>{doc.label}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ))}
            </div>

            {/* Right Display Box */}
            <div className="lg:col-span-7 bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-7">
              {documentGuides[selectedDocGuide] && (
                <div>
                  <h4 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-700" />
                    <span>{documentGuides[selectedDocGuide].title}</span>
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    {documentGuides[selectedDocGuide].desc}
                  </p>

                  <div className="my-5 space-y-2.5">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      आवश्यक दस्तावेज़ों की सूची (Checklist):
                    </div>
                    {documentGuides[selectedDocGuide].docs.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-800 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500">अनुमानित समय:</span>
                      <div className="font-bold text-slate-900 mt-0.5">
                        {documentGuides[selectedDocGuide].timeline}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-500">शासकीय शुल्क:</span>
                      <div className="font-bold text-emerald-700 mt-0.5">
                        {documentGuides[selectedDocGuide].fee}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ONLINE SERVICE ENQUIRY & TOKEN FORM */}
        <div className="mt-14 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-10 border border-slate-800 shadow-xl">
          <div className="max-w-xl">
            <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
              ऑनलाइन सेवा अनुरोध
            </span>
            <h3 className="text-2xl font-black text-white mt-1">
              लोक सेवा अथवा बैंकिंग कार्य हेतु पूर्व सूचना / टोकन बुक करें
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              अपना नाम, नंबर और सेवा चुनें। दुकान पर आते ही आपका काम बिना कतार के प्राथमिकता से किया जाएगा।
            </p>
          </div>

          <form onSubmit={handleEnquirySubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                आपका पूरा नाम *
              </label>
              <input
                type="text"
                required
                placeholder="उदा. रामेश्वर साहू"
                value={enquiryName}
                onChange={(e) => setEnquiryName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                मोबाइल नंबर (WhatsApp) *
              </label>
              <input
                type="tel"
                required
                placeholder="10 अंकों का मोबाइल नंबर"
                value={enquiryPhone}
                onChange={(e) => setEnquiryPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                आपको कौन सी सेवा चाहिए?
              </label>
              <select
                value={enquiryService}
                onChange={(e) => setEnquiryService(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
              >
                <option value="Bank of Baroda Cash / Account">Bank of Baroda (नकद लेन-देन / खाता)</option>
                <option value="Bank of Maharashtra Account / Cash">Bank of Maharashtra (खाता खोलना / लेन-देन)</option>
                <option value="Chhattisgarh Rajya Gramin Bank">छत्तीसगढ़ राज्य ग्रामीण बैंक (CRGB नकद)</option>
                <option value="Aadhaar ATM Any Bank Cash">किसी भी बैंक का आधार एटीएम से पैसा निकालना</option>
                <option value="Income Certificate">आय प्रमाण पत्र (Income Certificate)</option>
                <option value="Caste / Domicile Certificate">जाति / निवास प्रमाण पत्र</option>
                <option value="Bhuiyan Khasra B1 / Naksha">खसरा बी-1 नकल / भू-नक्शा</option>
                <option value="PAN Card / Ayushman Card">पैन कार्ड / आयुष्मान कार्ड प्रिंट</option>
                <option value="Mahtari Vandan / PM Kisan">महतारी वंदन / पीएम किसान सहायता</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                अतिरिक्त जानकारी / सवाल (वैकल्पिक)
              </label>
              <input
                type="text"
                placeholder="उदा. मुझे आज ही खसरा B1 निकलवाना है"
                value={enquiryNote}
                onChange={(e) => setEnquiryNote(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'भेज रहे हैं...' : 'सेवा अनुरोध भेजें (Request Service)'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Address and Direct Contact Card */}
        <div className="mt-14 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
              <MapPin className="w-4 h-4" />
              मयंक कंप्यूटर एवं लोक सेवा केंद्र
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              मुख्य मार्ग, नगपुरा, जिला - दुर्ग (छत्तीसगढ़) 491001
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              संपर्क सूत्र: {settings.primaryPhone} | WhatsApp: +91 7879318811
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                window.open(`https://wa.me/${cleanLokSevaPhone}?text=${encodeURIComponent('नमस्ते मयंक कंप्यूटर! मैं नगपुरा लोक सेवा केंद्र आना चाहता हूँ।')}`, '_blank');
              }}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp चैट</span>
            </button>

            <button
              onClick={() => setCurrentPage('main')}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl border border-slate-200 cursor-pointer"
            >
              <span>मुख्य वेबसाइट पर लौटें</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
