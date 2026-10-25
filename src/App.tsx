import React, { useState, useEffect } from 'react';
import {
  Scale,
  Phone,
  MessageCircle,
  Shield,
  Award,
  BookOpen,
  Briefcase,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Menu,
  X,
  FileText,
  Calendar,
  Send,
  Navigation,
  Settings,
  Lock,
  RotateCcw,
  Check,
  Upload
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  title: string;
  experience: string;
  phone: string;
  image?: string;
  isFounder?: boolean;
  specialtyFocus?: string;
}

interface FirmConfig {
  firmName: string;
  tagline: string;
  founderName: string;
  founderTitle: string;
  founderImage?: string;
  primaryPhone: string;
  secondaryPhone: string;
  address: string;
  city: string;
  province: string;
  country: string;
  workingHours: string;
  emergencyNote: string;
  announcement: string;
  announcementActive: boolean;
}

const defaultFirmConfig: FirmConfig = {
  firmName: 'مؤسسة الجميل للخدمات والاستشارات القانونية',
  tagline: 'خبرة قانونية عريقة، وحماية متكاملة لحقوقك بكل نزاهة واحترافية.',
  founderName: 'المستشار هاني جميل',
  founderTitle: 'محامي بالنقض والإدارية العليا - خبرة 35 سنة',
  founderImage: '/assets/aistudio/b63fa8df-e4f9-47ac-aedb-da6488050471_167c51e9.jpg',
  primaryPhone: '01007665023',
  secondaryPhone: '01014382292',
  address: 'برج العيدروس - الدور السابع - المنتزة - الزقازيق',
  city: 'الزقازيق',
  province: 'الشرقية',
  country: 'جمهورية مصر العربية',
  workingHours: 'يومياً من الساعة ٥:٠٠ مساءً حتى ١٠:٠٠ مساءً (بميعاد مسبق)، مع تلقي الطوارئ الجنائية على مدار الساعة.',
  emergencyNote: 'تلقي الطوارئ الجنائية والنيابات على مدار 24 ساعة',
  announcement: 'المقر الرئيسي متاح لاستقبال الموكلين: برج العيدروس - الدور السابع - المنتزة - الزقازيق',
  announcementActive: true
};

const teamMembers: TeamMember[] = [
  {
    id: 'hany-gamil',
    name: 'المستشار هاني جميل',
    title: 'محامي بالنقض والإدارية العليا - صاحب المؤسسة',
    experience: 'خبرة 35 سنة',
    phone: '01007665023',
    image: '/assets/aistudio/b63fa8df-e4f9-47ac-aedb-da6488050471_167c51e9.jpg',
    isFounder: true,
    specialtyFocus: 'قضايا النقض، الجنايات الكبرى، الدستورية العليا والاستشارات العسكرية'
  },
  {
    id: 'amr-habib',
    name: 'المستشار عمرو حبيب',
    title: 'محامي بالاستئناف العالي ومجلس الدولة',
    experience: 'خبرة 20 سنة',
    phone: '01014382292',
    image: '/assets/aistudio/4411e083-0ce6-47d1-8454-eddddaa5c9a3_cad40455.jpg',
    specialtyFocus: 'الاستئناف العالي، قضايا الجنايات، والمنازعات الإدارية'
  },
  {
    id: 'hassan-el-nemr',
    name: 'الأستاذ حسن النمر',
    title: 'محامي بالاستئناف',
    experience: 'خبرة 20 سنة',
    phone: '01028677499',
    specialtyFocus: 'الدعاوى المدنية، الجنح، والنزاعات العقارية'
  },
  {
    id: 'mohamed-hany',
    name: 'الأستاذ محمد هاني',
    title: 'محامي حر واستشارات قانونية',
    experience: 'خبرة 8 سنوات',
    phone: '01094792557',
    image: '/assets/aistudio/9b3107b3-856c-4714-bf7a-7f7f353f3a48_ff0ca1bd.jpg',
    specialtyFocus: 'القضايا الجنائية، صياغة العقود، ومتابعة التحقيقات'
  },
  {
    id: 'karim-abdelrazek',
    name: 'الأستاذ كريم عبدالرازق',
    title: 'محامي واستشارات قانونية',
    experience: 'خبرة 7 سنوات',
    phone: '01143536894',
    image: '/assets/aistudio/e7315673-ba0c-4b35-8a2c-58c7fb4f2a7b_77b45f98.jpg',
    specialtyFocus: 'قضايا الجنح، النزاعات التجارية، والأحوال الشخصية'
  },
  {
    id: 'hagar-abdallah',
    name: 'الأستاذة هاجر عبدالله',
    title: 'محامية وباحثة قانونية',
    experience: 'خبرة 4 سنوات',
    phone: '01229844189',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-23_at_1.38.02_PM_487b72d9.jpeg',
    specialtyFocus: 'قضايا الأسرة، الأحوال الشخصية، والدعم القانوني للموكلين'
  }
];

const caseTypes = [
  'القضايا الجنائية',
  'قضايا الجنح',
  'القضايا العسكرية',
  'القضايا المدنية والتعويضات',
  'قضايا الأسرة والأحوال الشخصية',
  'الاستشارات التجارية وصياغة العقود',
  'استشارة قانونية عامة'
];

const STORAGE_KEY = 'el_gamil_firm_config_v1';
const PIN_KEY = 'el_gamil_admin_pin_v1';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [firmConfig, setFirmConfig] = useState<FirmConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultFirmConfig, ...JSON.parse(saved) };
      }
    } catch {
      // Ignore localStorage errors
    }
    return defaultFirmConfig;
  });

  // Admin Modal State
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editConfig, setEditConfig] = useState<FirmConfig>(firmConfig);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [pinChangeMsg, setPinChangeMsg] = useState(false);

  // Booking Form State - Initialized accurately to the first lawyer
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedCaseType, setSelectedCaseType] = useState('القضايا الجنائية');
  const [selectedLawyer, setSelectedLawyer] = useState(teamMembers[0].name);
  const [caseBrief, setCaseBrief] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Sync across tabs via storage event without background network polling
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setFirmConfig(parsed);
          setEditConfig(parsed);
        } catch {
          // Ignore
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const [hasSetPin, setHasSetPin] = useState<boolean>(() => {
    try {
      return !!localStorage.getItem(PIN_KEY);
    } catch {
      return false;
    }
  });

  // Check URL hash (#admin) to open settings securely
  useEffect(() => {
    const handleHashCheck = () => {
      if (window.location.hash === '#admin') {
        setAdminOpen(true);
      }
    };
    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  // Admin Authentication - No hardcoded default PIN
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPin = localStorage.getItem(PIN_KEY);
    if (!storedPin) {
      if (adminPinInput.trim().length >= 4) {
        localStorage.setItem(PIN_KEY, adminPinInput.trim());
        setHasSetPin(true);
        setIsAuthenticated(true);
        setEditConfig(firmConfig);
        setAdminPinInput('');
      } else {
        alert('يرجى إدخال رمز حماية سري من 4 أرقام أو حروف على الأقل لحفظه.');
      }
      return;
    }

    if (adminPinInput === storedPin) {
      setIsAuthenticated(true);
      setEditConfig(firmConfig);
      setAdminPinInput('');
    } else {
      alert('رمز الدخول غير صحيح، يرجى المحاولة مرة أخرى.');
    }
  };

  // Upload and compress founder image
  const handleFounderImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDim = 900;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
          setEditConfig((prev) => ({ ...prev, founderImage: dataUrl }));
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Save changes locally and cross-tab sync
  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(editConfig));
      setFirmConfig(editConfig);
      setSaveSuccessMsg(true);
      setTimeout(() => setSaveSuccessMsg(false), 3000);
    } catch {
      alert('تعذر حفظ البيانات في المتصفح.');
    }
  };

  // Reset to official defaults
  const handleResetToDefaults = () => {
    if (window.confirm('هل أنت متأكد من استعادة الإعدادات الرسمية المعتمدة للمؤسسة؟')) {
      localStorage.removeItem(STORAGE_KEY);
      setFirmConfig(defaultFirmConfig);
      setEditConfig(defaultFirmConfig);
      setSaveSuccessMsg(true);
      setTimeout(() => setSaveSuccessMsg(false), 3000);
    }
  };

  // Change Admin PIN
  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.trim().length >= 4) {
      localStorage.setItem(PIN_KEY, newPin.trim());
      setNewPin('');
      setPinChangeMsg(true);
      setTimeout(() => setPinChangeMsg(false), 3000);
    } else {
      alert('يجب أن يتكون رمز المرور من 4 أرقام على الأقل');
    }
  };

  // Fixed lawyer selection: directly sets exact name matching option value
  const handleSelectLawyerForBooking = (lawyerName: string) => {
    setSelectedLawyer(lawyerName);
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCaseTypeForBooking = (caseType: string) => {
    setSelectedCaseType(caseType);
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      alert('يرجى كتابة الاسم ورقم الهاتف للمتابعة');
      return;
    }

    const message = `السلام عليكم ورحمة الله وبركاته،
طلب حجز استشارة قانونية من موقع المؤسسة:
────────────────────
👤 الاسم: ${clientName.trim()}
📱 رقم الهاتف: ${clientPhone.trim()}
⚖️ نوع القضية: ${selectedCaseType}
👨‍⚖️ المحامي المطلوب: ${selectedLawyer}
📍 المقر المطلوب: ${firmConfig.address}
📝 ملخص الاستشارة / تفاصيل الطلب:
${caseBrief.trim() || 'لا توجد تفاصيل إضافية مكتوبة'}
────────────────────
مرسل عبر الموقع الإلكتروني الرسمي لـ ${firmConfig.firmName}`;

    const cleanPhone = firmConfig.primaryPhone.replace(/\D/g, '').replace(/^0/, '');
    const whatsappUrl = `https://wa.me/20${cleanPhone}?text=${encodeURIComponent(message)}`;

    setFormSubmitted(true);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setFormSubmitted(false);
    }, 400);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('برج العيدروس المنتزة الزقازيق')}`;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E293B] font-cairo flex flex-col selection:bg-[#C5A880]/20 selection:text-[#0B1325]">
      
      {/* ─────────────────────────────────────────────────────────────
          ANNOUNCEMENT BANNER (CLEAN & RESTFUL)
      ───────────────────────────────────────────────────────────── */}
      {firmConfig.announcementActive && firmConfig.announcement && (
        <div className="bg-[#0B1325] border-b border-[#C5A880]/20 text-[#FAF8F5] py-2 px-4 text-xs font-medium">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="w-2 h-2 rounded-full bg-[#C5A880] shrink-0" />
              <span className="text-[#C5A880] font-bold shrink-0">إعلان المقر:</span>
              <span className="truncate text-[#BAC7DC]">{firmConfig.announcement}</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#A6B2C8] shrink-0">
              <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>مواعيد الحجز: ٥:٠٠ م - ١٠:٠٠ م</span>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          1. HEADER & TOP BAR
      ───────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#0B1325]/95 backdrop-blur-md border-b border-[#22314E] text-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Brand Wordmark */}
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-lg bg-[#162544] border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880] transition-colors group-hover:border-[#C5A880]">
              <Scale className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-[#FAF8F5] font-amiri whitespace-nowrap">
                {firmConfig.firmName}
              </span>
              <span className="text-[11px] text-[#A6B2C8] tracking-wider -mt-1 hidden sm:inline whitespace-nowrap">
                الزقازيق — برج العيدروس - الدور السابع - المنتزة
              </span>
            </div>
          </a>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#D1D9E6]">
            <a href="#about" className="hover:text-[#C5A880] transition-colors whitespace-nowrap shrink-0">
              عن المؤسس
            </a>
            <a href="#practice-areas" className="hover:text-[#C5A880] transition-colors whitespace-nowrap shrink-0">
              التخصصات القانونية
            </a>
            <a href="#team" className="hover:text-[#C5A880] transition-colors whitespace-nowrap shrink-0">
              فريق العمل
            </a>
            <a href="#booking" className="hover:text-[#C5A880] transition-colors whitespace-nowrap shrink-0">
              حجز استشارة
            </a>
            <a href="#contact" className="hover:text-[#C5A880] transition-colors whitespace-nowrap shrink-0">
              مقر الزقازيق
            </a>
          </nav>

          {/* Action Zone */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#booking"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C5A880] text-[#0B1325] text-sm font-bold tracking-normal hover:bg-[#D4B991] transition-all shadow-sm whitespace-nowrap"
            >
              <Calendar className="w-4 h-4" />
              <span>حجز استشارة قانونية</span>
            </a>

            <a
              href={`tel:${firmConfig.primaryPhone}`}
              className="inline-flex items-center justify-center p-2.5 rounded-lg bg-[#162544] text-[#C5A880] hover:bg-[#1C2F57] border border-[#2B3E63] transition-colors lg:hidden"
              title="اتصال مباشر"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#D1D9E6] hover:bg-[#162544] transition-colors"
              aria-label="قائمة التنقل"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0F1C36] border-b border-[#22314E] px-4 py-4 space-y-3">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-[#D1D9E6] hover:text-[#C5A880] border-b border-[#1E2D4A]"
            >
              عن المؤسس
            </a>
            <a
              href="#practice-areas"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-[#D1D9E6] hover:text-[#C5A880] border-b border-[#1E2D4A]"
            >
              التخصصات القانونية
            </a>
            <a
              href="#team"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-[#D1D9E6] hover:text-[#C5A880] border-b border-[#1E2D4A]"
            >
              أعضاء المكتب
            </a>
            <a
              href="#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-[#D1D9E6] hover:text-[#C5A880] border-b border-[#1E2D4A]"
            >
              حجز استشارة قانونية
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-[#D1D9E6] hover:text-[#C5A880]"
            >
              مقر الزقازيق والاتصال
            </a>
            <div className="pt-2">
              <a
                href="#booking"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#C5A880] text-[#0B1325] text-sm font-bold"
              >
                <Calendar className="w-4 h-4" />
                حجز استشارة مباشرة
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. HERO SECTION
      ───────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0B1325] text-[#F8FAFC] py-16 sm:py-24 border-b border-[#1A2846] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Right Column */}
            <div className="lg:col-span-7 space-y-6 text-right">
              <div className="flex flex-wrap items-center gap-3 text-sm text-[#C5A880] font-medium tracking-wide">
                <span>تأسست برؤية قانونية راسخة</span>
                <span aria-hidden="true">·</span>
                <span>خبرة تتجاوز ٣٥ عاماً</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#F1ECE5] font-semibold">مقر الزقازيق (المنتزة)</span>
              </div>

              {/* H1 bound dynamically to tagline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold text-[#FAF8F5] font-amiri leading-[1.3] text-balance">
                {firmConfig.tagline}
              </h1>

              <p className="text-base sm:text-lg text-[#BAC7DC] leading-relaxed max-w-2xl text-pretty font-light">
                {firmConfig.firmName} تضع بين يديك عقوداً من الخبرة المتمرسة أمام محاكم النقض، والإدارية العليا، والقضاء العسكري والمدني، ملتزمين بالدفاع الحازم والسرية المطلقة لصون حقوقك ومصالحك.
              </p>

              {/* Exact Address Highlight */}
              <div className="p-4 rounded-xl bg-[#162544]/80 border border-[#C5A880]/30 flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold text-[#FAF8F5]">المقر الرئيسي:</div>
                  <div className="text-xs sm:text-sm text-[#BAC7DC] leading-relaxed">
                    {firmConfig.address}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="#booking"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#C5A880] text-[#0B1325] text-base font-bold hover:bg-[#D4B991] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
                >
                  <Calendar className="w-5 h-5" />
                  <span>حجز استشارة قانونية</span>
                </a>

                <a
                  href={`tel:${firmConfig.primaryPhone}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#162544] text-[#FAF8F5] text-base font-medium border border-[#2B3E63] hover:bg-[#1C2F57] hover:border-[#C5A880]/50 transition-all whitespace-nowrap"
                >
                  <Phone className="w-5 h-5 text-[#C5A880]" />
                  <span dir="ltr">{firmConfig.primaryPhone}</span>
                </a>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-transparent text-[#C5A880] text-sm font-semibold border border-[#C5A880]/40 hover:bg-[#162544] transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span>موقع المقر على الخريطة</span>
                </a>
              </div>

              {/* 3 Core Trust Pillars */}
              <div className="pt-8 border-t border-[#1C2C4C] grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <div className="text-2xl font-bold text-[#C5A880] font-amiri">٣٥ عاماً</div>
                  <div className="text-xs text-[#94A3B8] mt-1">ترافع وخبرة أمام محاكم النقض</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#C5A880] font-amiri">تخصص دقيق</div>
                  <div className="text-xs text-[#94A3B8] mt-1">الجنايات، الجنح، والقضايا العسكرية</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#C5A880] font-amiri">سرية تامة</div>
                  <div className="text-xs text-[#94A3B8] mt-1">نزاهة مطلقة وميثاق شرف مهني</div>
                </div>
              </div>
            </div>

            {/* Left Column: Founder Photo Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-[#0F1C36] rounded-2xl border border-[#25375A] overflow-hidden shadow-2xl relative flex flex-col">
                <div className="relative aspect-square w-full overflow-hidden bg-[#162544]">
                  <img
                    src={firmConfig.founderImage || "/assets/aistudio/b63fa8df-e4f9-47ac-aedb-da6488050471_167c51e9.jpg"}
                    alt="المستشار هاني جميل"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover object-center filter contrast-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="p-6 space-y-3 bg-[#0F1C36] border-t border-[#1E2D4A]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#C5A880] font-semibold tracking-wider">
                      صاحب ومؤسس المؤسسة
                    </span>
                    <span className="text-xs text-[#94A3B8]">
                      خبرة ٣٥ عاماً
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-[#FAF8F5] font-amiri">
                    {firmConfig.founderName}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#BAC7DC] leading-relaxed">
                    محامٍ مقيد بالنقض والإدارية العليا والدستورية. يقود المؤسسة بنهج قانوني رفيع يحمي حقوق الموكلين ويوفر أعلى درجات المشورة القانونية.
                  </p>

                  <div className="pt-3 border-t border-[#1E2D4A] flex items-center justify-between text-xs">
                    <span className="text-[#94A3B8]">للتواصل المباشر:</span>
                    <a
                      href={`tel:${firmConfig.primaryPhone}`}
                      className="text-[#C5A880] hover:underline font-bold text-sm tracking-wide"
                      dir="ltr"
                    >
                      {firmConfig.primaryPhone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. ABOUT THE FOUNDER SECTION
      ───────────────────────────────────────────────────────────── */}
      <section id="about" className="py-20 bg-[#FAF8F5] border-b border-[#E7DFD5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-14">
            <span className="text-xs text-[#8E6F3E] font-bold tracking-widest uppercase">
              الريادة والخبرة القضائية
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1325] font-amiri">
              عن صاحب المؤسسة
            </h2>
            <div className="w-16 h-0.5 bg-[#C5A880] mx-auto mt-2" />
          </div>

          <div className="bg-[#FFFFFF] rounded-2xl p-8 sm:p-12 border border-[#E7DFD5] shadow-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4 text-center md:text-right space-y-3">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl mx-auto md:mx-0 overflow-hidden border-2 border-[#C5A880] shadow-md bg-[#162544]">
                  <img
                    src={firmConfig.founderImage || "/assets/aistudio/b63fa8df-e4f9-47ac-aedb-da6488050471_167c51e9.jpg"}
                    alt={firmConfig.founderName}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center filter contrast-[1.02]"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0B1325] font-amiri">
                    {firmConfig.founderName}
                  </h3>
                  <p className="text-sm text-[#8E6F3E] font-medium mt-0.5">
                    {firmConfig.founderTitle}
                  </p>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    خبرة عملية مستمرة منذ 35 عاماً
                  </p>
                </div>
              </div>

              <div className="md:col-span-8 space-y-4 text-[#334155] leading-relaxed text-sm sm:text-base">
                <p>
                  يُعد <strong>{firmConfig.founderName}</strong> من القامات القانونية المشهود لها بالكفاءة والنزاهة في محراب القضاء المصري، حيث خاض على مدار أكثر من ثلاثة عقود ونصف المئات من كبرى القضايا الجنائية وقضايا الرأي العام وأمام محاكم النقض ومجلس الدولة.
                </p>
                <p>
                  تأسست <strong>{firmConfig.firmName}</strong> بالزقازيق لتقديم نموذج قانوني متكامل يجمع بين عمق التأصيل الفقهي والتحليل الجنائي الدقيق، وسرعة التحرك الفعال لحماية حريات الموكلين وحقوقهم المدنية والتجارية والشخصية، مع التزام مهني صارم بأعلى مستويات السرية والأمانة.
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => handleSelectLawyerForBooking('المستشار هاني جميل')}
                    className="px-5 py-2.5 rounded-lg bg-[#0B1325] text-[#FAF8F5] text-sm font-semibold hover:bg-[#162544] transition-colors cursor-pointer"
                  >
                    حجز استشارة خاصة مع المستشار هاني
                  </button>

                  <a
                    href={`tel:${firmConfig.primaryPhone}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#CBD5E1] text-[#0B1325] text-sm font-medium hover:border-[#C5A880] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#8E6F3E]" />
                    <span dir="ltr">{firmConfig.primaryPhone}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. PRACTICE AREAS
      ───────────────────────────────────────────────────────────── */}
      <section id="practice-areas" className="py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
            <span className="text-xs text-[#8E6F3E] font-bold tracking-widest uppercase">
              مجالات العمل القضائي
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1325] font-amiri">
              التخصصات القانونية الرئيسية
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              تغطية قانونية شاملة بقيادة متخصصة لكل فرع من فروع القانون المصري
            </p>
            <div className="w-16 h-0.5 bg-[#C5A880] mx-auto mt-2" />
          </div>

          {/* Primary */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8E6F3E]" />
              <h3 className="text-xl sm:text-2xl font-bold text-[#0B1325] font-amiri">
                التخصص الأساسي: القضايا الجنائية، الجنح، والقضاء العسكري
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#FFFFFF] rounded-xl p-7 border border-[#E7DFD5] hover:border-[#C5A880] transition-all hover:shadow-md flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-[#FAF8F5] border border-[#E7DFD5] flex items-center justify-center text-[#8E6F3E]">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-[#0B1325] font-amiri">
                    القضايا الجنائية الكبرى
                  </h4>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    الترافع وإعداد الدفوع الجوهرية في قضايا الجنايات، الأموال العامة، الرشوة، التزوير، القتل، والمخدرات، وإلغاء الأحكام أمام محكمة النقض.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#F1ECE5]">
                  <button
                    onClick={() => handleSelectCaseTypeForBooking('القضايا الجنائية')}
                    className="text-xs font-bold text-[#8E6F3E] hover:text-[#0B1325] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>طلب استشارة في القضايا الجنائية</span>
                    <span aria-hidden="true">←</span>
                  </button>
                </div>
              </div>

              <div className="bg-[#FFFFFF] rounded-xl p-7 border border-[#E7DFD5] hover:border-[#C5A880] transition-all hover:shadow-md flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-[#FAF8F5] border border-[#E7DFD5] flex items-center justify-center text-[#8E6F3E]">
                    <Scale className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-[#0B1325] font-amiri">
                    قضايا الجنح والاستئناف
                  </h4>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    تمثيل الموكلين في قضايا الشيكات، النصب، خيانة الأمانة، الإصابة الخطأ، وقضايا المرور، وحضور التحقيقات بالنيابة العامة وإجراءات المعارضة والاستئناف.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#F1ECE5]">
                  <button
                    onClick={() => handleSelectCaseTypeForBooking('قضايا الجنح')}
                    className="text-xs font-bold text-[#8E6F3E] hover:text-[#0B1325] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>طلب استشارة في قضايا الجنح</span>
                    <span aria-hidden="true">←</span>
                  </button>
                </div>
              </div>

              <div className="bg-[#FFFFFF] rounded-xl p-7 border border-[#E7DFD5] hover:border-[#C5A880] transition-all hover:shadow-md flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-[#FAF8F5] border border-[#E7DFD5] flex items-center justify-center text-[#8E6F3E]">
                    <Award className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-[#0B1325] font-amiri">
                    القضايا والقضاء العسكري
                  </h4>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    خبرة نوعية في الترافع أمام النيابات والمحاكم العسكرية، وإعداد الطعون ومذكرات الالتماس القانوني بالدقة والحسم المطلوبين.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#F1ECE5]">
                  <button
                    onClick={() => handleSelectCaseTypeForBooking('القضايا العسكرية')}
                    className="text-xs font-bold text-[#8E6F3E] hover:text-[#0B1325] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>طلب استشارة في القضايا العسكرية</span>
                    <span aria-hidden="true">←</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Complementary */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0B1325]" />
              <h3 className="text-xl sm:text-2xl font-bold text-[#0B1325] font-amiri">
                التخصصات التكميلية والاستشارات القانونية
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#FFFFFF] rounded-xl p-7 border border-[#E7DFD5] hover:border-[#C5A880] transition-all hover:shadow-md flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-[#FAF8F5] border border-[#E7DFD5] flex items-center justify-center text-[#0B1325]">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-[#0B1325] font-amiri">
                    القضايا المدنية والتعويضات
                  </h4>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    الدعاوى العقارية، فسخ العقود، التعويضات المادية والأدبية، دعاوى صحة ونفاذ البيع، ونزاعات الإيجارات والملكية والحيازة.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#F1ECE5]">
                  <button
                    onClick={() => handleSelectCaseTypeForBooking('القضايا المدنية والتعويضات')}
                    className="text-xs font-bold text-[#0B1325] hover:text-[#8E6F3E] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>طلب استشارة في القضايا المدنية</span>
                    <span aria-hidden="true">←</span>
                  </button>
                </div>
              </div>

              <div className="bg-[#FFFFFF] rounded-xl p-7 border border-[#E7DFD5] hover:border-[#C5A880] transition-all hover:shadow-md flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-[#FAF8F5] border border-[#E7DFD5] flex items-center justify-center text-[#0B1325]">
                    <Users className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-[#0B1325] font-amiri">
                    الأسرة والأحوال الشخصية
                  </h4>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    قضايا النفقات بأنواعها، الخلع، الطلاق، الحضانة والرؤية، إعلام الوراثة وتقسيم التركات وتصفية المنازعات الأسرية برقي وتحفظ.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#F1ECE5]">
                  <button
                    onClick={() => handleSelectCaseTypeForBooking('قضايا الأسرة والأحوال الشخصية')}
                    className="text-xs font-bold text-[#0B1325] hover:text-[#8E6F3E] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>طلب استشارة في قضايا الأسرة</span>
                    <span aria-hidden="true">←</span>
                  </button>
                </div>
              </div>

              <div className="bg-[#FFFFFF] rounded-xl p-7 border border-[#E7DFD5] hover:border-[#C5A880] transition-all hover:shadow-md flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-[#FAF8F5] border border-[#E7DFD5] flex items-center justify-center text-[#0B1325]">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-[#0B1325] font-amiri">
                    الاستشارات التجارية وصياغة العقود
                  </h4>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    تأسيس الشركات، إعداد وتدقيق العقود والاتفاقيات، الاستشارات القانونية الدورية للكيانات التجارية وتفادي النزاعات مستقبلاً.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#F1ECE5]">
                  <button
                    onClick={() => handleSelectCaseTypeForBooking('الاستشارات التجارية وصياغة العقود')}
                    className="text-xs font-bold text-[#0B1325] hover:text-[#8E6F3E] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>طلب استشارة تجارية وعقود</span>
                    <span aria-hidden="true">←</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. OFFICE LEGAL TEAM
      ───────────────────────────────────────────────────────────── */}
      <section id="team" className="py-20 bg-[#F4EFEA] border-y border-[#E2D9CD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
            <span className="text-xs text-[#8E6F3E] font-bold tracking-widest uppercase">
              الكوادر القانونية المتخصصة
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1325] font-amiri">
              أعضاء مكتب المؤسسة
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              فريق عمل متكامل من الأساتذة والمستشارين جاهزون للدفاع عن قضاياك والتواصل معك مباشرة
            </p>
            <div className="w-16 h-0.5 bg-[#C5A880] mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-[#FFFFFF] rounded-2xl border border-[#E5DDD2] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] bg-[#EAE4DC] overflow-hidden flex items-center justify-center">
                    {member.image || (member.isFounder && firmConfig.founderImage) ? (
                      <img
                        src={member.isFounder ? (firmConfig.founderImage || member.image) : member.image}
                        alt={member.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center hover:scale-[1.02] transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0F1C36] to-[#0B1325] text-[#FAF8F5] p-6 text-center">
                        <div className="w-16 h-16 rounded-full border border-[#C5A880]/50 flex items-center justify-center mb-3 text-[#C5A880] bg-[#162544]/60">
                          <Scale className="w-8 h-8" />
                        </div>
                        <span className="text-lg font-bold font-amiri text-[#FAF8F5]">
                          {member.name}
                        </span>
                        {/* Dynamic title & experience instead of hardcoded text */}
                        <span className="text-xs text-[#C5A880] mt-1">
                          {member.title} · {member.experience}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#8E6F3E] font-semibold">{member.experience}</span>
                      {member.isFounder && (
                        <span className="text-[#0B1325] bg-[#C5A880]/20 px-2 py-0.5 rounded text-[11px] font-bold">
                          صاحب المؤسسة
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-[#0B1325] font-amiri">
                      {member.name}
                    </h3>

                    <p className="text-xs text-[#64748B] font-medium">
                      {member.title}
                    </p>

                    {member.specialtyFocus && (
                      <p className="text-xs text-[#475569] leading-relaxed pt-1">
                        {member.specialtyFocus}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-2.5">
                  <div className="pt-4 border-t border-[#F1ECE5] flex items-center justify-between">
                    <span className="text-xs text-[#64748B]">رقم الهاتف:</span>
                    <a
                      href={`tel:${member.phone}`}
                      className="text-sm font-bold text-[#0B1325] hover:text-[#8E6F3E] transition-colors"
                      dir="ltr"
                    >
                      {member.phone}
                    </a>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`tel:${member.phone}`}
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#0B1325] text-[#FAF8F5] text-xs font-semibold hover:bg-[#162544] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>اتصال مباشر</span>
                    </a>

                    <button
                      onClick={() => handleSelectLawyerForBooking(member.name)}
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-[#CBD5E1] text-[#0B1325] text-xs font-semibold hover:border-[#C5A880] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#8E6F3E]" />
                      <span>طلب استشارة</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. CONSULTATION BOOKING SYSTEM
      ───────────────────────────────────────────────────────────── */}
      <section id="booking" className="py-20 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-14">
            <span className="text-xs text-[#8E6F3E] font-bold tracking-widest uppercase">
              تواصل مهني فوري
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1325] font-amiri">
              حجز استشارة قانونية
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              املأ البيانات وسيتم تحويلك مباشرة إلى محادثة واتساب لتأكيد موعدك بمقر الزقازيق أو هاتفياً
            </p>
            <div className="w-16 h-0.5 bg-[#C5A880] mx-auto mt-2" />
          </div>

          <div className="bg-[#FFFFFF] rounded-2xl border border-[#E7DFD5] shadow-sm p-6 sm:p-10">
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-[#F0FDF4] text-[#16A34A] rounded-full mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B1325] font-amiri">
                  جاري فتح محادثة واتساب...
                </h3>
                <p className="text-sm text-[#475569]">
                  شكراً لتواصلك مع {firmConfig.firmName}. تم تجهيز تفاصيل الاستشارة لتحويلها إلى هاتف المؤسسة.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="clientName" className="block text-sm font-semibold text-[#0B1325]">
                      اسم العميل الكريم <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="clientName"
                      type="text"
                      required
                      placeholder="أدخل اسمك بالكامل"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-[#D9D2C7] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] outline-none text-sm transition-colors bg-[#FAF8F5]/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="clientPhone" className="block text-sm font-semibold text-[#0B1325]">
                      رقم الهاتف / واتساب <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="clientPhone"
                      type="tel"
                      required
                      placeholder="مثال: 010XXXXXXXX"
                      dir="ltr"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-[#D9D2C7] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] outline-none text-sm transition-colors bg-[#FAF8F5]/50 text-right"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="caseType" className="block text-sm font-semibold text-[#0B1325]">
                    نوع القضية أو الاستشارة
                  </label>
                  <select
                    id="caseType"
                    value={selectedCaseType}
                    onChange={(e) => setSelectedCaseType(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-[#D9D2C7] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] outline-none text-sm transition-colors bg-[#FAF8F5]/50"
                  >
                    {caseTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Lawyer Select - Generated directly from teamMembers ensuring 100% value match */}
                <div className="space-y-2">
                  <label htmlFor="preferredLawyer" className="block text-sm font-semibold text-[#0B1325]">
                    المحامي المفضل للتواصل
                  </label>
                  <select
                    id="preferredLawyer"
                    value={selectedLawyer}
                    onChange={(e) => setSelectedLawyer(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-[#D9D2C7] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] outline-none text-sm transition-colors bg-[#FAF8F5]/50 font-medium text-[#0B1325]"
                  >
                    {teamMembers.map((m) => (
                      <option key={m.id} value={m.name}>
                        {m.name} ({m.title})
                      </option>
                    ))}
                    <option value="المستشار الأنسب بحسب طبيعة القضية">
                      أي مستشار متخصص ترشحه المؤسسة بحسب القضية
                    </option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="caseBrief" className="block text-sm font-semibold text-[#0B1325]">
                    ملخص الاستشارة أو القضية (اختياري)
                  </label>
                  <textarea
                    id="caseBrief"
                    rows={4}
                    placeholder="اكتب نبذة مختصرة عن الواقعة أو الاستفسار القانوني لتمكين المحامي من دراستها مسبقاً..."
                    value={caseBrief}
                    onChange={(e) => setCaseBrief(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-[#D9D2C7] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] outline-none text-sm transition-colors bg-[#FAF8F5]/50 resize-y"
                  />
                </div>

                <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#E7DFD5] text-xs text-[#64748B] flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-[#8E6F3E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#0B1325]">ملاحظة الخصوصية:</span> عند الضغط على الزر، سيتم فتح تطبيق واتساب مباشرة موجهاً إلى هاتف المستشار هاني جميل ({firmConfig.primaryPhone}) برسالة منسقة مع تحديد المحامي المطلوب ({selectedLawyer}) دون أي وسيط خارجي.
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-[#0B1325] text-[#FAF8F5] text-base font-bold hover:bg-[#162544] transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  <Send className="w-5 h-5 text-[#C5A880]" />
                  <span>إرسال وحجز الاستشارة عبر واتساب ({firmConfig.primaryPhone})</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. DIRECT CONTACT & LOCATION INFORMATION
      ───────────────────────────────────────────────────────────── */}
      <section id="contact" className="py-16 bg-[#F4EFEA] border-t border-[#E2D9CD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: الهواتف المباشرة */}
            <div className="bg-[#FFFFFF] p-6 rounded-xl border border-[#E7DFD5] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#E7DFD5] flex items-center justify-center text-[#8E6F3E]">
                <Phone className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-[#0B1325] font-amiri">الاتصال المباشر</h4>
              <p className="text-xs text-[#64748B]">
                المستشار هاني جميل: <a href={`tel:${firmConfig.primaryPhone}`} className="font-bold text-[#0B1325] hover:text-[#8E6F3E]" dir="ltr">{firmConfig.primaryPhone}</a>
              </p>
              <p className="text-xs text-[#64748B]">
                المستشار عمرو حبيب: <a href={`tel:${firmConfig.secondaryPhone}`} className="font-bold text-[#0B1325] hover:text-[#8E6F3E]" dir="ltr">{firmConfig.secondaryPhone}</a>
              </p>
            </div>

            {/* Card 2: المواعيد وساعات العمل */}
            <div className="bg-[#FFFFFF] p-6 rounded-xl border border-[#E7DFD5] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#E7DFD5] flex items-center justify-center text-[#8E6F3E]">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-[#0B1325] font-amiri">مواعيد المقابلات</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                {firmConfig.workingHours}
              </p>
              <p className="text-xs text-[#C5A880] font-semibold">
                {firmConfig.emergencyNote}
              </p>
            </div>

            {/* Card 3: المقر الرئيسي بالزقازيق */}
            <div className="bg-[#FFFFFF] p-6 rounded-xl border border-[#E7DFD5] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#E7DFD5] flex items-center justify-center text-[#8E6F3E]">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-[#0B1325] font-amiri">المقر الرئيسي</h4>
              <p className="text-xs text-[#334155] leading-relaxed font-semibold">
                {firmConfig.address}
              </p>
              <div className="pt-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8E6F3E] hover:underline"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>فتح في خرائط جوجل للوصول إلى البرج</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. FOOTER
      ───────────────────────────────────────────────────────────── */}
      <footer className="bg-[#0B1325] text-[#BAC7DC] py-14 border-t border-[#1C2C4C] text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#1A2846]">
            <div className="flex items-center gap-3 text-right">
              <div className="w-10 h-10 rounded-lg bg-[#162544] border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880]">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-bold text-[#FAF8F5] font-amiri">
                  {firmConfig.firmName}
                </div>
                <div className="text-xs text-[#7F93B5]">
                  المقر: {firmConfig.address}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#BAC7DC]">
              <a href="#about" className="hover:text-[#C5A880] transition-colors">عن المؤسس</a>
              <a href="#practice-areas" className="hover:text-[#C5A880] transition-colors">التخصصات</a>
              <a href="#team" className="hover:text-[#C5A880] transition-colors">أعضاء المكتب</a>
              <a href="#booking" className="hover:text-[#C5A880] transition-colors">حجز استشارة</a>
              <a href="#contact" className="hover:text-[#C5A880] transition-colors">مقر الزقازيق</a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
            <div>
              جميع الحقوق محفوظة © {new Date().getFullYear()} {firmConfig.firmName}.
            </div>
            <div className="flex items-center gap-4">
              <span>الالتزام الصارم بقانون المحاماة والسرية المهنية.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────
          9. FLOATING QUICK WHATSAPP BUTTON
      ───────────────────────────────────────────────────────────── */}
      <a
        href={`https://wa.me/20${firmConfig.primaryPhone.replace(/\D/g, '').replace(/^0/, '')}?text=${encodeURIComponent(`السلام عليكم، أرغب في حجز استشارة قانونية لدى ${firmConfig.firmName} بمقر الزقازيق`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#162544] text-[#FAF8F5] border border-[#C5A880]/50 shadow-lg hover:bg-[#1E335C] hover:scale-105 transition-all text-xs sm:text-sm font-semibold"
        title="تواصل مباشر عبر واتساب"
      >
        <MessageCircle className="w-5 h-5 text-[#25D366]" />
        <span className="hidden sm:inline">واتساب المؤسسة</span>
      </a>

      {/* ─────────────────────────────────────────────────────────────
          10. ADMIN & SETTINGS MODAL (SECURE & ACCESSIBLE VIA #admin)
      ───────────────────────────────────────────────────────────── */}
      {adminOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#FFFFFF] text-[#0B1325] rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#E7DFD5] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7DFD5] mb-6">
              <div className="flex items-center gap-2 text-lg font-bold font-amiri text-[#0B1325]">
                <Settings className="w-5 h-5 text-[#8E6F3E]" />
                <span>إعدادات وتخصيص بيانات الموقع</span>
              </div>
              <button
                onClick={() => {
                  setAdminOpen(false);
                  if (window.location.hash === '#admin') {
                    window.history.replaceState(null, '', window.location.pathname + window.location.search);
                  }
                }}
                className="p-1 rounded-lg text-[#64748B] hover:text-[#0B1325] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!isAuthenticated ? (
              /* Authentication Screen without password exposure */
              <form onSubmit={handleAdminLogin} className="space-y-4 py-4 text-center">
                <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#E7DFD5] flex items-center justify-center mx-auto text-[#8E6F3E]">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    {hasSetPin ? 'تسجيل دخول الإدارة' : 'تعيين رمز حماية خاص بك'}
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1">
                    {hasSetPin
                      ? 'أدخل رمز الدخول السري المخصص لإدارة بيانات الموقع'
                      : 'أدخل رمزاً سرياً جديداً لحماية لوحة التعديل (4 خانات على الأقل)'}
                  </p>
                </div>
                <div className="max-w-xs mx-auto">
                  <input
                    type="password"
                    placeholder={hasSetPin ? 'رمز الدخول السري' : 'اختر رمزاً سرياً خاصاً بك'}
                    value={adminPinInput}
                    onChange={(e) => setAdminPinInput(e.target.value)}
                    className="w-full px-4 py-2.5 text-center text-sm rounded-lg border border-[#D9D2C7] focus:border-[#C5A880] outline-none"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#0B1325] text-[#FAF8F5] text-sm font-semibold hover:bg-[#162544] transition-colors cursor-pointer"
                >
                  {hasSetPin ? 'دخول لوحة التحكم' : 'حفظ الرمز والدخول'}
                </button>
              </form>
            ) : (
              /* Edit Form */
              <div className="space-y-6 text-right">
                {saveSuccessMsg && (
                  <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-xs flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>تم حفظ التعديلات بنجاح!</span>
                  </div>
                )}

                <form onSubmit={handleSaveConfig} className="space-y-4">
                  {/* Founder Image Manager */}
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E7DFD5] space-y-3">
                    <label className="block text-xs font-bold text-[#0B1325]">
                      صورة المستشار هاني جميل (صاحب ومؤسس المؤسسة)
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-[#C5A880] shrink-0 bg-[#0F1C36] shadow-sm">
                        <img
                          src={editConfig.founderImage || firmConfig.founderImage || '/assets/aistudio/b63fa8df-e4f9-47ac-aedb-da6488050471_167c51e9.jpg'}
                          alt="معاينة صورة المستشار هاني جميل"
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div className="flex-1 space-y-2 text-right w-full">
                        <div className="flex flex-wrap items-center gap-2">
                          <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#0B1325] text-[#FAF8F5] text-xs font-bold hover:bg-[#162544] cursor-pointer transition-colors shadow-sm">
                            <Upload className="w-3.5 h-3.5 text-[#C5A880]" />
                            <span>رفع صورة جديدة من جهازك</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleFounderImageUpload}
                            />
                          </label>

                          <button
                            type="button"
                            onClick={() => setEditConfig({ ...editConfig, founderImage: '/assets/aistudio/b63fa8df-e4f9-47ac-aedb-da6488050471_167c51e9.jpg' })}
                            className="px-2.5 py-1.5 rounded-lg border border-[#D9D2C7] bg-[#FFFFFF] hover:bg-[#F3EFEA] text-[11px] font-semibold text-[#0B1325] transition-colors"
                          >
                            الصورة الرسمية (علم مصر)
                          </button>

                          <button
                            type="button"
                            onClick={() => setEditConfig({ ...editConfig, founderImage: '/assets/aistudio/9b3107b3-856c-4714-bf7a-7f7f353f3a48_ff0ca1bd.jpg' })}
                            className="px-2.5 py-1.5 rounded-lg border border-[#D9D2C7] bg-[#FFFFFF] hover:bg-[#F3EFEA] text-[11px] font-semibold text-[#0B1325] transition-colors"
                          >
                            صورة المكتب التنفيذي
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="أو اكتب مسار/رابط الصورة مباشرة"
                          value={editConfig.founderImage || ''}
                          onChange={(e) => setEditConfig({ ...editConfig, founderImage: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs rounded border border-[#D9D2C7] focus:border-[#C5A880] outline-none dir-ltr text-left font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Firm Name */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#0B1325]">اسم المؤسسة</label>
                    <input
                      type="text"
                      value={editConfig.firmName}
                      onChange={(e) => setEditConfig({ ...editConfig, firmName: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded border border-[#D9D2C7] focus:border-[#C5A880] outline-none"
                    />
                  </div>

                  {/* Tagline / H1 */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#0B1325]">العنوان الترويجي الرئيسي (H1 / Tagline)</label>
                    <input
                      type="text"
                      value={editConfig.tagline}
                      onChange={(e) => setEditConfig({ ...editConfig, tagline: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded border border-[#D9D2C7] focus:border-[#C5A880] outline-none"
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#0B1325]">العنوان والمقر الرئيسي</label>
                    <input
                      type="text"
                      value={editConfig.address}
                      onChange={(e) => setEditConfig({ ...editConfig, address: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded border border-[#D9D2C7] focus:border-[#C5A880] outline-none"
                    />
                  </div>

                  {/* Phones */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-[#0B1325]">هاتف المستشار هاني (واتساب)</label>
                      <input
                        type="text"
                        dir="ltr"
                        value={editConfig.primaryPhone}
                        onChange={(e) => setEditConfig({ ...editConfig, primaryPhone: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded border border-[#D9D2C7] focus:border-[#C5A880] outline-none text-right"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-[#0B1325]">هاتف المستشار عمرو</label>
                      <input
                        type="text"
                        dir="ltr"
                        value={editConfig.secondaryPhone}
                        onChange={(e) => setEditConfig({ ...editConfig, secondaryPhone: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded border border-[#D9D2C7] focus:border-[#C5A880] outline-none text-right"
                      />
                    </div>
                  </div>

                  {/* Announcement Banner */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-[#0B1325]">شريط الإعلانات العاجلة بالأعلى</label>
                      <label className="flex items-center gap-1.5 text-xs text-[#64748B] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editConfig.announcementActive}
                          onChange={(e) => setEditConfig({ ...editConfig, announcementActive: e.target.checked })}
                        />
                        <span>تفعيل الشريط</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      value={editConfig.announcement}
                      onChange={(e) => setEditConfig({ ...editConfig, announcement: e.target.value })}
                      placeholder="اكتب التنويه أو التحديث المباشر..."
                      className="w-full px-3 py-2 text-xs rounded border border-[#D9D2C7] focus:border-[#C5A880] outline-none"
                    />
                  </div>

                  {/* Working Hours */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#0B1325]">مواعيد العمل والمقابلات</label>
                    <input
                      type="text"
                      value={editConfig.workingHours}
                      onChange={(e) => setEditConfig({ ...editConfig, workingHours: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded border border-[#D9D2C7] focus:border-[#C5A880] outline-none"
                    />
                  </div>

                  {/* Submit buttons */}
                  <div className="pt-2 flex items-center justify-between border-t border-[#E7DFD5]">
                    <button
                      type="button"
                      onClick={handleResetToDefaults}
                      className="px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>استعادة الإعدادات الأصلية</span>
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-lg bg-[#0B1325] text-[#FAF8F5] text-xs font-bold hover:bg-[#162544] flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>حفظ التعديلات</span>
                    </button>
                  </div>
                </form>

                {/* Change PIN section */}
                <div className="pt-4 border-t border-[#E7DFD5]">
                  <form onSubmit={handleChangePin} className="space-y-2">
                    <label className="block text-xs font-bold text-[#0B1325]">تغيير رمز الدخول الخاص بك</label>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        placeholder="رمز جديد (4 أرقام على الأقل)"
                        value={newPin}
                        onChange={(e) => setNewPin(e.target.value)}
                        className="flex-1 px-3 py-2 text-xs rounded border border-[#D9D2C7] focus:border-[#C5A880] outline-none"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#FAF8F5] border border-[#D9D2C7] hover:border-[#0B1325] text-xs font-bold rounded cursor-pointer"
                      >
                        تحديث الرمز
                      </button>
                    </div>
                    {pinChangeMsg && (
                      <p className="text-[11px] text-green-600">تم تغيير رمز المرور بنجاح!</p>
                    )}
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
