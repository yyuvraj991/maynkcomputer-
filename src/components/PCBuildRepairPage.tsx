import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Cpu,
  Wrench,
  Monitor,
  HardDrive,
  Zap,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowLeft,
  MessageCircle,
  Phone,
  HelpCircle,
  Sparkles,
  Sliders,
  DollarSign,
  AlertTriangle,
  RefreshCw,
  Send,
  Layers,
  Award
} from 'lucide-react';

export const PCBuildRepairPage: React.FC = () => {
  const { settings, setCurrentPage, addToast } = useApp();
  const PC_BUILD_WHATSAPP = '9098551281';
  const cleanPcBuildPhone = '919098551281';
  const [activeTab, setActiveTab] = useState<'builds' | 'estimator' | 'repair' | 'guide'>('builds');

  // Custom PC Builder State
  const [useCase, setUseCase] = useState<'office' | 'student' | 'editing' | 'gaming'>('office');
  const [cpuType, setCpuType] = useState<'i3' | 'i5' | 'i7' | 'ryzen5'>('i3');
  const [ramOption, setRamOption] = useState<'8gb' | '16gb' | '32gb'>('8gb');
  const [storageOption, setStorageOption] = useState<'ssd256' | 'ssd512' | 'ssd1tb_hdd'>('ssd256');
  const [gpuOption, setGpuOption] = useState<'integrated' | 'gtx1650' | 'rtx3050' | 'rtx4060'>('integrated');
  const [monitorOption, setMonitorOption] = useState<'none' | 'mon20' | 'mon22' | 'mon24'>('mon22');
  const [includeUps, setIncludeUps] = useState<boolean>(true);

  // Repair Booking Form State
  const [repairName, setRepairName] = useState('');
  const [repairPhone, setRepairPhone] = useState('');
  const [deviceType, setDeviceType] = useState('Desktop PC');
  const [issueType, setIssueType] = useState('Slow Computer / Needs SSD Upgrade');
  const [issueDesc, setIssueDesc] = useState('');
  const [isSubmittingRepair, setIsSubmittingRepair] = useState(false);

  // Price Calculation Logic for Custom Builder
  const calculateEstimatedPrice = () => {
    let base = 7500; // Base: Cabinet, Motherboard entry, 450W SMPS, assembling charges

    // CPU
    if (cpuType === 'i3') base += 6500;
    if (cpuType === 'i5') base += 11500;
    if (cpuType === 'i7') base += 23000;
    if (cpuType === 'ryzen5') base += 12000;

    // RAM
    if (ramOption === '8gb') base += 1800;
    if (ramOption === '16gb') base += 3400;
    if (ramOption === '32gb') base += 6800;

    // Storage
    if (storageOption === 'ssd256') base += 1600;
    if (storageOption === 'ssd512') base += 2900;
    if (storageOption === 'ssd1tb_hdd') base += 5800;

    // GPU
    if (gpuOption === 'integrated') base += 0;
    if (gpuOption === 'gtx1650') base += 12000;
    if (gpuOption === 'rtx3050') base += 18500;
    if (gpuOption === 'rtx4060') base += 28500;

    // Monitor
    if (monitorOption === 'none') base += 0;
    if (monitorOption === 'mon20') base += 4200;
    if (monitorOption === 'mon22') base += 5800;
    if (monitorOption === 'mon24') base += 7900;

    // UPS
    if (includeUps) base += 2100;

    return base;
  };

  const estimatedTotal = calculateEstimatedPrice();

  // Dynamic visual preview of the assembled CPU tower based on use case / tier
  const getCpuVisualPreview = () => {
    if (useCase === 'gaming') {
      return {
        title: 'ARGB Gaming Rig Cabinet (ग्लास पैनल व 4x ARGB फैन्स)',
        desc: 'हेवी गेमिंग व 3D रेंडरिंग हेतु 4x ARGB फैन्स, टेम्पर्ड ग्लास साइड और फ्रंट मेश एयरफ्लो।',
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80',
        badge: 'Gaming ARGB Tower',
        tags: ['Addressable RGB', 'RTX GPU Ready', 'Tempered Glass', 'High Airflow']
      };
    }
    if (useCase === 'editing') {
      return {
        title: 'Pro Studio Tempered Glass Workstation Tower',
        desc: 'Photoshop, Premiere Pro व 4K एडिटिंग हेतु लिक्विड कूलर कम्पैटिबल सायलेंट कैबिनेट।',
        image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
        badge: 'Studio Workstation',
        tags: ['Heavy Cooling', 'Clean Cable Route', 'Dual NVMe Bay', 'Silent Fans']
      };
    }
    if (useCase === 'student') {
      return {
        title: 'Smart Study & Compact Typing Desktop Tower',
        desc: 'छात्रों के लिए कॉम्पैक्ट, मजबूत और कम बिजली खपत वाला मॉडर्न डेस्कटॉप कैबिनेट।',
        image: 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&w=800&q=80',
        badge: 'Study & Typing Case',
        tags: ['Compact Desktop', 'Front USB 3.0', 'Low Energy SMPS', 'Dust Resistant']
      };
    }
    return {
      title: 'Commercial Office & Tally Durable Tower',
      desc: 'दुकान, शोरूम व फर्म में लगातार 12 घंटे चलने योग्य डस्ट-प्रूफ व मजबूत मेटल कैबिनेट।',
      image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=800&q=80',
      badge: 'Office / Tally Case',
      tags: ['Mesh Front Airflow', 'Fast Dual-Drive Bay', 'Commercial SMPS', 'Multi-Display']
    };
  };

  const currentCpuPreview = getCpuVisualPreview();

  const handleSendBuilderWhatsApp = () => {
    const message = `Hello Mayank Computer! I configured a Custom PC Build on your website:
• Purpose: ${useCase.toUpperCase()}
• Processor: ${cpuType.toUpperCase()}
• RAM: ${ramOption.toUpperCase()}
• Storage: ${storageOption.toUpperCase()}
• Graphics: ${gpuOption.toUpperCase()}
• Monitor: ${monitorOption.toUpperCase()}
• UPS Included: ${includeUps ? 'Yes' : 'No'}
• Approx Estimate: ₹${estimatedTotal.toLocaleString('en-IN')}

Please provide your best price, brand availability (Intel/Asus/Gigabyte), and assembly time in Nagpura/Durg.`;

    window.open(`https://wa.me/${cleanPcBuildPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleRepairSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repairName.trim() || !repairPhone.trim()) {
      addToast('Please enter your name and phone number.', 'error');
      return;
    }

    setIsSubmittingRepair(true);
    setTimeout(() => {
      setIsSubmittingRepair(false);
      addToast('Repair request received! Our technician will call you shortly.', 'success');
      
      // WhatsApp notification fallback
      const text = encodeURIComponent(
        `Hello Mayank Computer! I submitted a Computer Repair Request:\n• Name: ${repairName}\n• Mobile: ${repairPhone}\n• Device: ${deviceType}\n• Issue: ${issueType}\n• Details: ${issueDesc || 'Immediate diagnosis needed'}\n\nPlease inspect my device.`
      );
      window.open(`https://wa.me/${cleanPcBuildPhone}?text=${text}`, '_blank');

      setRepairName('');
      setRepairPhone('');
      setIssueDesc('');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Top Breadcrumb Header Bar */}
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
            <span>Mayank Computer Hardware & Repair Center • Nagpura (Durg)</span>
          </div>
        </div>
      </div>

      {/* Hero Showcase Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-12 sm:py-16">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=2000&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/70" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3 bg-emerald-950/80 border border-emerald-800/80 px-3 py-1 rounded-md">
              <Wrench className="w-3.5 h-3.5" />
              Complete PC Build, Upgrades & Repair Station
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Custom PC Building & <br />
              <span className="text-emerald-400">Expert Computer Repair</span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              Whether you need a budget-friendly Office & Tally PC, an ultra-fast Video Editing & Gaming workstation, or instant 30-minute laptop/desktop repair with genuine parts — Mayank Computer delivers verified solutions with full warranty.
            </p>

            {/* Quick Feature Badges */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-200">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Genuine Parts</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Free Pre-Inspection</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>30-Min Fast Repairs</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1-3 Year Warranties</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white p-2 rounded-2xl shadow-lg border border-slate-200 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('builds')}
            className={`flex-1 min-w-[160px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'builds'
                ? 'bg-blue-700 text-white shadow-md shadow-blue-700/20'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Ready PC Packages</span>
          </button>

          <button
            onClick={() => setActiveTab('estimator')}
            className={`flex-1 min-w-[160px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'estimator'
                ? 'bg-blue-700 text-white shadow-md shadow-blue-700/20'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Custom PC Builder</span>
          </button>

          <button
            onClick={() => setActiveTab('repair')}
            className={`flex-1 min-w-[160px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'repair'
                ? 'bg-blue-700 text-white shadow-md shadow-blue-700/20'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Repair & Maintenance</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex-1 min-w-[160px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-blue-700 text-white shadow-md shadow-blue-700/20'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>PC Build Hardware Guide</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* TAB 1: READY PC PACKAGES */}
        {activeTab === 'builds' && (
          <div className="space-y-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-black text-slate-900">
                Pre-Tested Ready PC Packages
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Hand-picked balanced configurations assembled with genuine branded components, optimal thermal paste, and pre-installed Windows + MS Office.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Package 1 */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-900 group">
                    <img 
                      src="https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&w=800&q=80" 
                      alt="Smart Study & Typing PC"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-slate-900/90 text-white text-[10px] font-bold">
                      कॉम्पैक्ट स्टडी टावर
                    </span>
                    <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded bg-slate-900/80 text-emerald-400 font-bold text-[11px] uppercase border border-slate-700">
                      Student & Home
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      Smart Study & Typing PC
                    </h3>
                    <div className="mt-2 text-2xl font-extrabold text-blue-700">
                      ₹18,999
                      <span className="text-xs text-slate-400 font-normal ml-1">approx</span>
                    </div>

                    <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                      Perfect for Hindi/English typing practice, online classes, basic MS Office, and YouTube learning.
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>Intel Core i3 / AMD Athlon</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>8GB DDR4 RAM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>256GB High-Speed SSD</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Monitor className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>Micro-ATX Cabinet + 450W PSU</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-0">
                  <button
                    onClick={() => {
                      window.open(`https://wa.me/${cleanPcBuildPhone}?text=${encodeURIComponent('Hello Mayank Computer! I want to enquire about the "Smart Study & Typing PC (₹18,999)". Please share stock & delivery details.')}`, '_blank');
                    }}
                    className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-blue-600" />
                    <span>Enquire on WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Package 2 */}
              <div className="bg-white rounded-2xl border-2 border-blue-600 overflow-hidden shadow-md flex flex-col justify-between relative">
                <span className="absolute top-2.5 left-2.5 z-10 bg-blue-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-md">
                  Most Popular
                </span>
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-900 group">
                    <img 
                      src="https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=800&q=80" 
                      alt="Business & Tally Workstation"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-blue-900/90 text-white text-[10px] font-bold">
                      हाई एयर-फ्लो टावर
                    </span>
                    <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded bg-slate-900/80 text-blue-400 font-bold text-[11px] uppercase border border-slate-700">
                      Commercial & Shop
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      Business & Tally Workstation
                    </h3>
                    <div className="mt-2 text-2xl font-extrabold text-blue-700">
                      ₹28,500
                      <span className="text-xs text-slate-400 font-normal ml-1">approx</span>
                    </div>

                    <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                      Designed for heavy Tally Prime, busy accounting, GST portal filing, multiple Chrome tabs, and daily retail billing.
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>Intel Core i5 (12th Gen)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>16GB DDR4 High-Speed RAM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>512GB NVMe M.2 SSD</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Monitor className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>Dual Monitor Ready + Wi-Fi</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-0">
                  <button
                    onClick={() => {
                      window.open(`https://wa.me/${cleanPcBuildPhone}?text=${encodeURIComponent('Hello Mayank Computer! I am interested in the "Business & Tally Workstation (₹28,500)". Please confirm availability.')}`, '_blank');
                    }}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4 text-white" />
                    <span>Get Best Quote</span>
                  </button>
                </div>
              </div>

              {/* Package 3 */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-900 group">
                    <img 
                      src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80" 
                      alt="Graphic & Video Editing Beast"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-amber-950/90 text-amber-300 text-[10px] font-bold">
                      टेम्पर्ड ग्लास वर्कस्टेशन
                    </span>
                    <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded bg-slate-900/80 text-amber-400 font-bold text-[11px] uppercase border border-slate-700">
                      Creator & Studio
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      Graphic & Video Editing Beast
                    </h3>
                    <div className="mt-2 text-2xl font-extrabold text-blue-700">
                      ₹49,999
                      <span className="text-xs text-slate-400 font-normal ml-1">approx</span>
                    </div>

                    <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                      Optimized for Photoshop, Premiere Pro, CorelDraw, 4K rendering, and multi-track audio production.
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>Intel i5 / AMD Ryzen 5 5600</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>16GB 3200MHz Gaming RAM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>512GB NVMe SSD + 1TB HDD</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Monitor className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>NVIDIA GTX 1650 / RTX 3050</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-0">
                  <button
                    onClick={() => {
                      window.open(`https://wa.me/${cleanPcBuildPhone}?text=${encodeURIComponent('Hello Mayank Computer! I want details on the "Graphic & Video Editing Beast PC (₹49,999)".')}`, '_blank');
                    }}
                    className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-blue-600" />
                    <span>Enquire on WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Package 4 */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-900 group">
                    <img 
                      src="https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80" 
                      alt="Ultimate Esports & 3D Rig"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-purple-950/90 text-purple-300 text-[10px] font-bold">
                      ARGB गेमिंग बीस्ट
                    </span>
                    <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded bg-slate-900/80 text-purple-400 font-bold text-[11px] uppercase border border-slate-700">
                      Gaming & 3D
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      Ultimate Esports & 3D Rig
                    </h3>
                    <div className="mt-2 text-2xl font-extrabold text-blue-700">
                      ₹68,500+
                      <span className="text-xs text-slate-400 font-normal ml-1">approx</span>
                    </div>

                    <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                      High FPS 1080p/1440p gaming, Blender 3D modeling, streaming, and heavy programming.
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>Intel Core i7 / Ryzen 7</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>32GB DDR4/DDR5 Dual Channel</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>1TB Gen4 Ultra NVMe SSD</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Monitor className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>NVIDIA RTX 4060 8GB + ARGB Case</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-0">
                  <button
                    onClick={() => {
                      window.open(`https://wa.me/${cleanPcBuildPhone}?text=${encodeURIComponent('Hello Mayank Computer! I want custom gaming rig configuration consultation and quotation.')}`, '_blank');
                    }}
                    className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-blue-600" />
                    <span>Customize Build</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE CUSTOM PC BUILDER */}
        {activeTab === 'estimator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Configuration Panel */}
            <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Build Your Dream Computer
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Choose your required components below. Our live estimator computes realistic market prices with genuine brand parts and assembly.
                </p>
              </div>

              {/* Purpose Selector */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                  1. Primary Purpose of PC
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'office', label: 'Office & Tally' },
                    { id: 'student', label: 'Student Study' },
                    { id: 'editing', label: 'Graphic / Video' },
                    { id: 'gaming', label: 'Esports Gaming' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setUseCase(p.id as any)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                        useCase === p.id
                          ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-600/20'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Processor (CPU) */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                  2. Processor (CPU)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'i3', name: 'Core i3', desc: 'Everyday Work' },
                    { id: 'i5', name: 'Core i5', desc: 'Heavy Multitasking' },
                    { id: 'ryzen5', name: 'Ryzen 5', desc: 'Gaming & Editing' },
                    { id: 'i7', name: 'Core i7', desc: 'Extreme Performance' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setCpuType(c.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        cpuType === c.id
                          ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-600/20'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-bold text-xs">{c.name}</div>
                      <div className="text-[10px] text-slate-500">{c.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* RAM */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                  3. RAM (Memory)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: '8gb', name: '8GB DDR4', desc: 'Standard usage' },
                    { id: '16gb', name: '16GB DDR4', desc: 'Recommended smooth' },
                    { id: '32gb', name: '32GB DDR4/5', desc: 'Pro rendering' },
                  ].map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setRamOption(r.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        ramOption === r.id
                          ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-600/20'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-bold text-xs">{r.name}</div>
                      <div className="text-[10px] text-slate-500">{r.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Storage */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                  4. Storage (Fast SSD / HDD)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'ssd256', name: '256GB SSD', desc: 'Fast boot & files' },
                    { id: 'ssd512', name: '512GB NVMe', desc: 'Most popular space' },
                    { id: 'ssd1tb_hdd', name: '512GB SSD + 1TB HDD', desc: 'Speed + Bulk storage' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setStorageOption(s.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        storageOption === s.id
                          ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-600/20'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-bold text-xs">{s.name}</div>
                      <div className="text-[10px] text-slate-500">{s.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Graphics Card */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                  5. Dedicated Graphics Card (GPU)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'integrated', name: 'Integrated UHD/Vega', desc: 'Free with CPU' },
                    { id: 'gtx1650', name: 'GTX 1650 4GB', desc: '1080p Entry GPU' },
                    { id: 'rtx3050', name: 'RTX 3050 6GB', desc: 'Ray Tracing & Video' },
                    { id: 'rtx4060', name: 'RTX 4060 8GB', desc: 'Top tier gaming' },
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setGpuOption(g.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        gpuOption === g.id
                          ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-600/20'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-bold text-xs">{g.name}</div>
                      <div className="text-[10px] text-slate-500">{g.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Monitor & Peripherals */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                  6. Monitor (Display Screen)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'none', name: 'No Monitor', desc: 'Only CPU Cabinet' },
                    { id: 'mon20', name: '20" LED HD', desc: 'Budget Display' },
                    { id: 'mon22', name: '22" Full HD IPS', desc: 'Crystal Clear' },
                    { id: 'mon24', name: '24" IPS 75Hz+', desc: 'Large Screen' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMonitorOption(m.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        monitorOption === m.id
                          ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-600/20'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-bold text-xs">{m.name}</div>
                      <div className="text-[10px] text-slate-500">{m.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* UPS Checkbox */}
              <div className="pt-2 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="includeUps"
                  checked={includeUps}
                  onChange={(e) => setIncludeUps(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                />
                <label htmlFor="includeUps" className="text-xs sm:text-sm text-slate-700 font-medium cursor-pointer">
                  Include 600VA Power Backup UPS (Recommended for Nagpura/rural power cuts) (+₹2,100)
                </label>
              </div>
            </div>

            {/* Right Summary & WhatsApp Quote Card */}
            <div className="lg:col-span-4 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl sticky top-36">
              {/* Dynamic Assembled CPU Visual Preview */}
              <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-950 mb-5 shadow-md">
                <div className="relative h-48 sm:h-52 overflow-hidden group">
                  <img 
                    src={currentCpuPreview.image} 
                    alt={currentCpuPreview.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-sm">
                    {currentCpuPreview.badge}
                  </span>
                  <div className="absolute bottom-2.5 left-3 right-3">
                    <div className="text-[11px] font-bold text-emerald-400">
                      ✓ तैयार होने के बाद CPU ऐसा दिखेगा:
                    </div>
                    <div className="text-sm font-black text-white leading-tight">
                      {currentCpuPreview.title}
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-slate-800/90 text-[11px] text-slate-300 border-t border-slate-700/80 space-y-1.5">
                  <p className="text-[11px] text-slate-300 leading-snug">
                    {currentCpuPreview.desc}
                  </p>
                  <div className="pt-1 flex flex-wrap gap-1">
                    {currentCpuPreview.tags.map((tag, idx) => (
                      <span key={idx} className="bg-slate-900 px-2 py-0.5 rounded text-[10px] text-slate-200 border border-slate-700">
                        • {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-base text-white">
                  Build Estimate Summary
                </h3>
                <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Nagpura Best Price
                </span>
              </div>

              <div className="my-4 space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Target Purpose:</span>
                  <span className="font-bold text-white capitalize">{useCase}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Processor:</span>
                  <span className="font-bold text-white uppercase">{cpuType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">RAM:</span>
                  <span className="font-bold text-white uppercase">{ramOption}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Storage:</span>
                  <span className="font-bold text-white uppercase">{storageOption}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Graphics:</span>
                  <span className="font-bold text-white uppercase">{gpuOption}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Monitor:</span>
                  <span className="font-bold text-white uppercase">{monitorOption}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">UPS Included:</span>
                  <span className="font-bold text-emerald-400">{includeUps ? 'Yes' : 'No'}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-center my-4">
                <div className="text-xs text-slate-400">Estimated Total Cost</div>
                <div className="text-3xl font-black text-emerald-400 mt-1">
                  ₹{estimatedTotal.toLocaleString('en-IN')}*
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Includes assembly, testing, Windows 11 setup & 1-Year Support
                </div>
              </div>

              <button
                onClick={handleSendBuilderWhatsApp}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Send Configuration to WhatsApp</span>
              </button>

              <p className="text-[10px] text-slate-400 text-center mt-3">
                *Prices may vary slightly based on live component brand (Asus, Gigabyte, Kingston, Crucial, WD).
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: COMPUTER & LAPTOP REPAIR SERVICES */}
        {activeTab === 'repair' && (
          <div className="space-y-10">
            {/* Intro */}
            <div className="max-w-3xl">
              <h2 className="text-2xl font-black text-slate-900">
                Laptop & Desktop Repair Solutions
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Facing blue screens, slow boot times, broken screens, or dead power? Our certified technicians fix chip-level and software issues with quick turnaround and original parts.
              </p>
            </div>

            {/* Repair Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Express SSD Upgrade (Fix Slow PC)',
                  desc: 'Is your computer taking 5 to 10 minutes to turn on? We replace your old mechanical HDD with high-speed SSD in 30 minutes! 10X speed boost guaranteed without losing any files.',
                  price: '₹1,299+ (with SSD)',
                  time: '30-45 Mins',
                  icon: Zap,
                  tag: 'Most Popular',
                  image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80'
                },
                {
                  title: 'Windows 10/11 Format & Installation',
                  desc: 'Corrupted OS, virus infection, or boot loop? Fresh genuine Windows installation with official drivers, MS Office setup, typing fonts, chrome, and PDF reader.',
                  price: '₹350 – ₹500',
                  time: '45 Mins',
                  icon: RefreshCw,
                  tag: 'Fast Service',
                  image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80'
                },
                {
                  title: 'Laptop Screen & Display Replacement',
                  desc: 'Cracked, black, flickering, or line screen? High-DPI original LED/IPS display panel replacement with 1-Year manufacturer warranty for HP, Dell, Lenovo, Acer, Asus.',
                  price: 'Call for Model Price',
                  time: 'Same Day',
                  icon: Monitor,
                  tag: '1-Yr Warranty',
                  image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
                },
                {
                  title: 'Motherboard Chip-Level Repair',
                  desc: 'Computer not powering on? Short circuits, charging port failure, burnt ICs, and capacitor replacements using professional soldering and diagnostic stations.',
                  price: 'Free Inspection',
                  time: '1-2 Days',
                  icon: Cpu,
                  tag: 'Chip Level',
                  image: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=800&q=80'
                },
                {
                  title: 'Laptop Heating & Fan Cleaning',
                  desc: 'Fan making loud noise or laptop shutting down while working? Deep internal dust cleaning and premium Arctic/Cooler Master thermal paste replacement.',
                  price: '₹300 – ₹500',
                  time: '40 Mins',
                  icon: AlertTriangle,
                  tag: 'Prevent Damage',
                  image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80'
                },
                {
                  title: 'Keyboard, Hinges & Body Repair',
                  desc: 'Broken laptop screen hinges, missing keys, water spill damage, or cracked cabinet body plastic fabrication and replacement.',
                  price: 'From ₹450',
                  time: 'Same Day',
                  icon: Wrench,
                  tag: 'Original Spares',
                  image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80'
                },
                {
                  title: 'Data Recovery from Damaged Hard Disks',
                  desc: 'Formatted pen drives, corrupted partitions, clicking hard drives, or deleted official files recovered safely with confidential data protection.',
                  price: 'Starts ₹500',
                  time: '1-3 Days',
                  icon: HardDrive,
                  tag: 'Confidential',
                  image: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&w=800&q=80'
                },
                {
                  title: 'Laser & InkTank Printer Repairing',
                  desc: 'Paper jam, light print, blank page printing, roller replacement, and toner/cartridge refilling for HP LaserJet, Canon, and Epson EcoTank.',
                  price: 'Refill @ ₹150+',
                  time: 'Same Day',
                  icon: Layers,
                  tag: 'Cartridge & Spares',
                  image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80'
                },
                {
                  title: 'Virus Removal & Antivirus Setup',
                  desc: 'Removal of stubborn malware, shortcut virus, auto-opening ad popups, and installation of licensed antivirus with 1-3 year cloud protection.',
                  price: '₹250 – ₹450',
                  time: '30 Mins',
                  icon: ShieldCheck,
                  tag: 'Full Security',
                  image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Real Repair Task Image Banner */}
                      <div className="relative h-44 overflow-hidden bg-slate-900">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        <span className="absolute top-2.5 right-2.5 text-[11px] font-bold text-emerald-950 bg-emerald-400 px-2.5 py-0.5 rounded shadow-sm">
                          {item.tag}
                        </span>
                        <div className="absolute bottom-2.5 left-3 flex items-center gap-2 text-white">
                          <div className="w-7 h-7 rounded-lg bg-emerald-500/90 text-slate-950 flex items-center justify-center font-bold">
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-xs font-bold drop-shadow-sm">अधिकृत रिपेयर कार्य</span>
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="text-base font-bold text-slate-900 leading-snug">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-0">
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <div>
                          <div className="text-[10px] text-slate-400">Estimated Cost</div>
                          <div className="font-bold text-slate-900">{item.price}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-slate-400">Turnaround</div>
                          <div className="font-semibold text-emerald-700 flex items-center gap-1 justify-end">
                            <Clock className="w-3 h-3" />
                            <span>{item.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Repair Booking Form */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-10 border border-slate-800 shadow-xl">
              <div className="max-w-xl">
                <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                  Fast Diagnostic Booking
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  Book A Computer Repair / Diagnostic Inspection
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2">
                  Bring your computer to our Nagpura institute or drop a message. Free diagnosis with zero advance inspection charge!
                </p>
              </div>

              <form onSubmit={handleRepairSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={repairName}
                    onChange={(e) => setRepairName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={repairPhone}
                    onChange={(e) => setRepairPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Device Type
                  </label>
                  <select
                    value={deviceType}
                    onChange={(e) => setDeviceType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Desktop PC Cabinet">Desktop PC Cabinet</option>
                    <option value="Laptop (HP/Dell/Lenovo/Acer)">Laptop (HP/Dell/Lenovo/Acer)</option>
                    <option value="Printer (Laser/InkTank)">Printer (Laser/InkTank)</option>
                    <option value="Old PC Upgrade (SSD/RAM)">Old PC Upgrade (SSD/RAM)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Primary Problem
                  </label>
                  <select
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Slow Computer / Needs SSD Upgrade">Slow Computer / Needs SSD Upgrade</option>
                    <option value="Computer Not Turning On (Dead)">Computer Not Turning On (Dead)</option>
                    <option value="Windows Corrupted / Blue Screen">Windows Corrupted / Blue Screen</option>
                    <option value="Display / Screen Broken">Display / Screen Broken</option>
                    <option value="Fan Noise & Overheating">Fan Noise & Overheating</option>
                    <option value="Virus / Data Lost">Virus / Data Lost</option>
                    <option value="Other Hardware Problem">Other Hardware Problem</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Additional Details / Brand Model (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Dell Inspiron laptop shuts down after 10 mins"
                    value={issueDesc}
                    onChange={(e) => setIssueDesc(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmittingRepair}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmittingRepair ? 'Sending...' : 'Request Free Diagnostic / Service'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 4: COMPLETE HARDWARE GUIDE */}
        {activeTab === 'guide' && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-black text-slate-900">
                Complete PC Build Hardware Guide
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                A complete breakdown of what components are required to assemble a reliable desktop computer and what to look for when choosing each part.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: '1. Processor (CPU) — The Brain',
                  role: 'Executes instructions, calculations, and runs your operating system.',
                  details: 'For Office & Tally, an Intel Core i3 or Ryzen 3 is very fast. For video editing, Photoshop, and gaming, Core i5/i7 or AMD Ryzen 5/7 with 6 to 12 cores is recommended.',
                  icon: Cpu,
                  tip: 'Always ensure your CPU socket matches your motherboard socket (e.g. LGA1700 or AM4).'
                },
                {
                  title: '2. Motherboard (Mainboard) — The Backbone',
                  role: 'Connects all components (RAM, CPU, Storage, GPU, USB ports).',
                  details: 'Look for reliable VRM cooling, M.2 NVMe slots for ultra-fast SSDs, dual RAM slots, and front USB 3.0 headers from brands like Asus, Gigabyte, or MSI.',
                  icon: Layers,
                  tip: 'H610 / B660 / B760 chipsets for Intel, and A520 / B550 chipsets for AMD Ryzen.'
                },
                {
                  title: '3. RAM (Memory) — Multitasking Speed',
                  role: 'Temporarily holds running programs so your PC doesn’t freeze.',
                  details: 'Minimum 8GB DDR4 for basic office work and typing. 16GB dual channel (2x8GB) is the sweet spot for modern Windows 11, heavy browsing, and editing.',
                  icon: Zap,
                  tip: 'Dual channel (two sticks of RAM) gives up to 20% higher real-world performance than a single stick.'
                },
                {
                  title: '4. Storage (NVMe M.2 SSD vs HDD)',
                  role: 'Permanently stores your Windows OS, software, and files.',
                  details: 'Never install Windows on a mechanical hard drive anymore! An NVMe SSD boots Windows in 5 seconds. Use SSD for Windows and optional 1TB HDD for bulk files.',
                  icon: HardDrive,
                  tip: 'A 512GB NVMe M.2 SSD costs only slightly more than 256GB and offers double the lifespan.'
                },
                {
                  title: '5. Power Supply (SMPS) — Clean Electricity',
                  role: 'Supplies stable DC voltage to all sensitive chipsets.',
                  details: 'Never use cheap unbranded SMPS that can fry your motherboard during power surges. Choose 450W to 650W 80-Plus certified units (Corsair, Antec, Zebronics).',
                  icon: Zap,
                  tip: 'A quality power supply protects your computer from village/rural voltage fluctuations.'
                },
                {
                  title: '6. Cabinet (Case) & Airflow Cooling',
                  role: 'Protects components and channels cool air over heat-generating parts.',
                  details: 'A good case features mesh front ventilation, dust filters, pre-installed intake fans, and clean cable management space.',
                  icon: Monitor,
                  tip: 'Good airflow keeps components 15°C cooler, extending hardware life by several years.'
                },
                {
                  title: '7. Graphics Card (GPU) — Visual Processing',
                  role: 'Renders 3D graphics, 4K video editing previews, and high-FPS gaming.',
                  details: 'For MS Office and Tally, integrated Intel UHD or AMD Radeon graphics is 100% sufficient (no extra GPU needed). Dedicated NVIDIA GTX/RTX is needed for Premiere Pro, 3D, and gaming.',
                  icon: Monitor,
                  tip: 'Dedicated GPUs consume extra power — verify your SMPS wattage before choosing a GPU.'
                },
                {
                  title: '8. Monitor, Keyboard, Mouse & UPS',
                  role: 'Human interface and power-cut protection.',
                  details: 'Choose a 22" or 24" Full HD IPS monitor with anti-glare coating to protect student eyes. A 600VA UPS provides 15-20 minutes of battery backup during electricity cutoffs.',
                  icon: Monitor,
                  tip: 'IPS panels provide wide 178° viewing angles and rich color accuracy compared to TN panels.'
                }
              ].map((guide, idx) => {
                const Icon = guide.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-blue-400 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900">
                        {guide.title}
                      </h3>
                    </div>

                    <p className="text-xs font-semibold text-blue-700 mb-2">
                      Role: {guide.role}
                    </p>

                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      {guide.details}
                    </p>

                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-700 flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span><strong>Mayank Tech Tip:</strong> {guide.tip}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Visual Showcase: Finished PC Builds & Live Workshop Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded">
                लाइव वर्कशॉप व तैयार कंप्यूटर
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                हमारे द्वारा असेंबल किए गए PC व लाइव रिपेयर कार्य
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                नगपुरा (दुर्ग) के छात्रों, व्यापारियों व गेमर्स के लिए तैयार किए गए असली कंप्यूटर्स, चिप-लेवल रिपेयरिंग और अपग्रेड की झलक।
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Genuine Branded Hardware Guaranteed</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'ARGB Gaming Workstation Assembled',
                category: 'कस्टम गेमिंग पीसी',
                image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80',
                desc: 'RTX ग्राफ़िक्स कार्ड, लिक्विड कूलर और ARGB फैन्स के साथ तैयार कस्टम गेमिंग बीस्ट।'
              },
              {
                title: 'Express SSD Installation & Cable Routing',
                category: '30-मिनट फास्ट अपग्रेड',
                image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80',
                desc: 'पुराने स्लो डेस्कटॉप में 512GB NVMe SSD इंस्टॉलेशन जिससे सिस्टम 10 गुना तेज हुआ।'
              },
              {
                title: 'Motherboard IC Diagnostics & Soldering',
                category: 'चिप-लेवल मदरबोर्ड रिपेयर',
                image: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=800&q=80',
                desc: 'शॉर्ट-सर्किट व डेड मदरबोर्ड की माइक्रो-सोल्डरिंग और कम्पोनेंट टेस्टिंग।'
              },
              {
                title: 'Studio Video Editing & 3D Render Rig',
                category: 'स्टूडियो वर्कस्टेशन',
                image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
                desc: 'Photoshop, Premiere Pro व 4K रेंडरिंग के लिए टेम्पर्ड ग्लास वर्कस्टेशन।'
              },
              {
                title: 'Dual-Monitor Business & Tally Billing PC',
                category: 'कमर्शियल सेटअप',
                image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=800&q=80',
                desc: 'दुकान, शोरूम व फर्म के लिए लगातार 12 घंटे चलने योग्य डुअल स्क्रीन अकाउंटिंग PC।'
              },
              {
                title: 'Laptop Screen & Hinges Replacement Lab',
                category: 'लैपटॉप हार्डवेयर रिपेयर',
                image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
                desc: 'टूटी हुई स्क्रीन, हिन्जेस फैब्रिकेशन और कीबोर्ड रिप्लेसमेंट सर्विस।'
              },
            ].map((build, idx) => (
              <div 
                key={idx}
                className="group rounded-2xl overflow-hidden border border-slate-200 bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img 
                      src={build.image} 
                      alt={build.title} 
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    <span className="absolute top-3 left-3 bg-slate-900/90 text-emerald-400 font-bold text-[10px] uppercase px-2.5 py-1 rounded border border-slate-700/80">
                      {build.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <h4 className="text-base font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
                      {build.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {build.desc}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-0">
                  <button
                    onClick={() => {
                      window.open(`https://wa.me/${cleanPcBuildPhone}?text=${encodeURIComponent(`Hello Mayank Computer! I saw "${build.title}" on your website and want similar PC setup / repair.`)}`, '_blank');
                    }}
                    className="w-full py-2 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 border border-slate-200 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>इसके बारे में पूछें</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Contact / Direct Support Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Need Direct Advice on What PC to Buy or Repair?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Visit Mayank Computer at Nagpura (Durg) or talk directly with our hardware engineer.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                window.open(`https://wa.me/${cleanPcBuildPhone}?text=${encodeURIComponent('Hello Mayank Computer! I need advice regarding PC building / laptop repair.')}`, '_blank');
              }}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </button>

            <button
              onClick={() => setCurrentPage('main')}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl border border-slate-200 cursor-pointer"
            >
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
