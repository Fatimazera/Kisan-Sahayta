
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type LanguageCode = 'en' | 'hi' | 'ur' | 'mr' | 'gu' | 'bn';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<LanguageCode, any> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      agriAi: "Agri-AI",
      portal: "Portal",
      apply: "Apply"
    },
    hero: {
      welcome: "WELCOME TO",
      kisanSahayata: "KISAN SAHAYATA",
      subtitle: "Modernizing agricultural progress through cinematic intelligence. A seamless gateway for India's farming community."
    },
    categories: {
      title: "Comprehensive Agriculture Solutions",
      subtitle: "Direct government support tailored to maximize your farm's productivity and sustainability.",
      pillar: "Pillars of Support",
      learnMore: "Learn More"
    },
    qr: {
      title: "Authenticity Verification",
      description: "Verify the legitimacy of your agricultural subsidies instantly. Generate a secure QR code to share or display for official inspections.",
      btn: "Generate Verification QR",
      reset: "Reset Generator",
      scan: "Scan to Verify",
      open: "Open Verification Page"
    },
    ai: {
      badge: "Agri-Intelligence Activated",
      title: "Find your eligibility in seconds",
      subtitle: "Our AI analyzes your farm profile against national schemes to find your best matches instantly.",
      btn: "Try Eligibility AI",
      verified: "Verified & Secure",
      gov: "Gov-Secure Interface"
    }
  },
  hi: {
    nav: {
      home: "होम",
      about: "बारे में",
      agriAi: "एग्री-एआई",
      portal: "पोर्टल",
      apply: "आवेदन करें"
    },
    hero: {
      welcome: "आपका स्वागत है",
      kisanSahayata: "किसान सहायता",
      subtitle: "सिनेमैटिक इंटेलिजेंस के माध्यम से कृषि प्रगति का आधुनिकीकरण। भारत के किसान समुदाय के लिए एक सहज प्रवेश द्वार।"
    },
    categories: {
      title: "व्यापक कृषि समाधान",
      subtitle: "आपके खेत की उत्पादकता और स्थिरता को अधिकतम करने के लिए तैयार प्रत्यक्ष सरकारी सहायता।",
      pillar: "सहायता के स्तंभ",
      learnMore: "अधिक जानें"
    },
    qr: {
      title: "प्रमाणिकता सत्यापन",
      description: "अपनी कृषि सब्सिडी की वैधता को तुरंत सत्यापित करें। आधिकारिक निरीक्षणों के लिए साझा करने या प्रदर्शित करने के लिए एक सुरक्षित क्यूआर कोड जेनरेट करें।",
      btn: "सत्यापन क्यूआर जेनरेट करें",
      reset: "रिसेट जेनरेटर",
      scan: "सत्यापित करने के लिए स्कैन करें",
      open: "सत्यापन पृष्ठ खोलें"
    },
    ai: {
      badge: "एग्री-इंटेलिजेंस सक्रिय",
      title: "सेकंडों में अपनी पात्रता पाएं",
      subtitle: "हमारा एआई आपके सर्वोत्तम मिलान तुरंत खोजने के लिए राष्ट्रीय योजनाओं के विरुद्ध आपके फार्म प्रोफाइल का विश्लेषण करता है।",
      btn: "एलिजिबिलिटी एआई आज़माएं",
      verified: "सत्यापित और सुरक्षित",
      gov: "सरकार-सुरक्षित इंटरफ़ेस"
    }
  },
  ur: {
    nav: {
      home: "ہوم",
      about: "کے بارے میں",
      agriAi: "ایگری-اے آئی",
      portal: "پورٹل",
      apply: "درخواست دیں"
    },
    hero: {
      welcome: "خوش آمدید",
      kisanSahayata: "کسان سہایتا",
      subtitle: "سنیماٹک انٹیلیجنس کے ذریعے زرعی ترقی کو جدید بنانا۔ ہندوستان کی کسان برادری کے لیے ایک ہموار گیٹ وے۔"
    },
    categories: {
      title: "جامع زرعی حل",
      subtitle: "براہ راست حکومتی مدد جو آپ کے فارم کی پیداواری صلاحیت اور پائیداری کو زیادہ سے زیادہ کرنے کے لیے تیار کی گئی ہے۔",
      pillar: "سہارے کے ستون",
      learnMore: "مزید جانیں"
    },
    qr: {
      title: "اصالت کی تصدیق",
      description: "اپنی زرعی سبسڈی کی قانونی حیثیت کی فوری تصدیق کریں۔ سرکاری معائنے کے لیے شیئر کرنے یا دکھانے کے لیے ایک محفوظ QR کوڈ تیار کریں۔",
      btn: "تصدیق کے لیے QR تیار کریں",
      reset: "ری سیٹ جنریٹر",
      scan: "تصدیق کے لیے اسکین کریں",
      open: "تصدیق کا صفحہ کھولیں"
    },
    ai: {
      badge: "ایگری انٹیلیجنس فعال",
      title: "سیکنڈوں میں اپنی اہلیت تلاش کریں",
      subtitle: "ہمارا AI آپ کے بہترین میچز کو فوری طور پر تلاش کرنے کے لیے قومی اسکیموں کے خلاف آپ کے فارم پروفائل کا تجزیہ کرتا ہے۔",
      btn: "اہلیت AI آزمائیں",
      verified: "تصدیق شدہ اور محفوظ",
      gov: "حکومتی محفوظ انٹرفیس"
    }
  },
  mr: {
    nav: {
      home: "होम",
      about: "बद्दल",
      agriAi: "एग्री-एआय",
      portal: "पोर्टल",
      apply: "अर्ज करा"
    },
    hero: {
      welcome: "स्वागत आहे",
      kisanSahayata: "किसान सहायता",
      subtitle: "सिनेमॅटिक इंटेलिजन्सद्वारे कृषी प्रगतीचे आधुनिकीकरण. भारताच्या शेतकरी समुदायासाठी एक अखंड प्रवेशद्वार."
    },
    categories: {
      title: "सर्वसमावेशक कृषी उपाय",
      subtitle: "तुमच्या शेतीची उत्पादकता आणि टिकाऊपणा वाढवण्यासाठी तयार केलेले थेट सरकारी सहाय्य.",
      pillar: "पाधाराचे स्तंभ",
      learnMore: "अधिक जाणून घ्या"
    },
    qr: {
      title: "प्रमाणिकता पडताळणी",
      description: "तुमच्या कृषी अनुदानाच्या वैधतेची त्वरित पडताळणी करा. अधिकृत तपासणीसाठी शेअर करण्यासाठी किंवा प्रदर्शित करण्यासाठी सुरक्षित क्यूआर कोड तयार करा.",
      btn: "पडताळणी क्यूआर तयार करा",
      reset: "रिसेट जनरेटर",
      scan: "पडताळणीसाठी स्कॅन करा",
      open: "पडताळणी पृष्ठ उघडा"
    },
    ai: {
      badge: "अ‍ॅग्री-इंटेलिजन्स सक्रिय",
      title: "सेकंदात तुमची पात्रता शोधा",
      subtitle: "आमचे एआय तुमचे सर्वोत्तम सामने त्वरित शोधण्यासाठी राष्ट्रीय योजनांविरुद्ध तुमच्या फार्म प्रोफाइलचे विश्लेषण करते.",
      btn: "पात्रता एआय वापरून पहा",
      verified: "पडताळणी केलेले आणि सुरक्षित",
      gov: "शासकीय-सुरक्षित इंटरफेस"
    }
  },
  gu: {
    nav: {
      home: "હોમ",
      about: "વિશે",
      agriAi: "એગ્રી-એઆઈ",
      portal: "પોર્ટલ",
      apply: "અરજી કરો"
    },
    hero: {
      welcome: "સ્વાગત છે",
      kisanSahayata: "કિસાન સહાયતા",
      subtitle: "સિનેમેટિક ઇન્ટેલિજન્સ દ્વારા કૃષિ પ્રગતિનું આધુનિકીકરણ. ભારતના ખેડૂત સમુદાય માટે સીમલેસ ગેટવે."
    },
    categories: {
      title: "વ્યાપક કૃષિ ઉકેલો",
      subtitle: "તમારા ફાર્મની ઉત્પાદકતા અને ટકાઉપણું વધારવા માટે તૈયાર કરેલ સીધી સરકારી સહાય.",
      pillar: "સહાયના સ્તંભો",
      learnMore: "વધુ જાણો"
    },
    qr: {
      title: "પ્રમાણિકતા ચકાસણી",
      description: "તમારી કૃષિ સબસિડીની કાયદેસરતાને તાત્કાલિક ચકાસો. સત્તાવાર નિરીક્ષણો માટે શેર કરવા અથવા પ્રદર્શિત કરવા માટે સુરક્ષિત QR કોડ બનાવો.",
      btn: "ચકાસણી QR બનાવો",
      reset: "રીસેટ જનરેટર",
      scan: "ચકાસણી માટે સ્કેન કરો",
      open: "ચકાસણી પૃષ્ઠ ખોલો"
    },
    ai: {
      badge: "એગ્રી-ઇન્ટેલિજન્સ સક્રિય",
      title: "સેકન્ડોમાં તમારી પાત્રતા શોધો",
      subtitle: "અમારું AI તમારા શ્રેષ્ઠ મેચોને તાત્કાલિક શોધવા માટે રાષ્ટ્રીય યોજનાઓ સામે તમારી ફાર્મ પ્રોફાઇલનું વિશ્લેષણ કરે છે.",
      btn: "પાત્રતા AI અજમાવી જુઓ",
      verified: "ચકાસાયેલ અને સુરક્ષિત",
      gov: "સરકારી સુરક્ષિત ઈન્ટરફેસ"
    }
  },
  bn: {
    nav: {
      home: "হোম",
      about: "সম্পর্কে",
      agriAi: "এগ্রি-এআই",
      portal: "পোর্টাল",
      apply: "আবেদন করুন"
    },
    hero: {
      welcome: "স্বাগতম",
      kisanSahayata: "কিষাণ সহায়তা",
      subtitle: "সিনেমাটিক ইন্টেলিজেন্সের মাধ্যমে কৃষি অগ্রগতির আধুনিকীকরণ। ভারতের কৃষক সম্প্রদায়ের জন্য একটি নিরবচ্ছিন্ন প্রবেশদ্বার।"
    },
    categories: {
      title: "ব্যাপক কৃষি সমাধান",
      subtitle: "আপনার খামারের উত্পাদনশীলতা এবং স্থায়িত্ব সর্বাধিক করার জন্য উপযুক্ত সরাসরি সরকারি সহায়তা।",
      pillar: "সহায়তার স্তম্ভ",
      learnMore: "আরও জানুন"
    },
    qr: {
      title: "নির্ভরযোগ্যতা যাচাইকরণ",
      description: "আপনার কৃষি ভর্তুকির বৈধতা অবিলম্বে যাচাই করুন। অফিসিয়াল পরিদর্শনের জন্য শেয়ার বা প্রদর্শনের জন্য একটি সুরক্ষিত QR কোড তৈরি করুন।",
      btn: "যাচাইকরণ QR তৈরি করুন",
      reset: "রিসেট জেনারেটর",
      scan: "যাচাই করতে স্ক্যান করুন",
      open: "যাচাইকরণ পৃষ্ঠা খুলুন"
    },
    ai: {
      badge: "এগ্রি-ইন্টেলিজেন্স সক্রিয়",
      title: "সেকেন্ডে আপনার যোগ্যতা খুঁজুন",
      subtitle: "আমাদের AI আপনার সেরা মিলগুলি তাৎক্ষণিকভাবে খুঁজে পেতে জাতীয় প্রকল্পগুলির বিপরীতে আপনার খামার প্রোফাইল বিশ্লেষণ করে।",
      btn: "যোগ্যতা AI ব্যবহার করুন",
      verified: "যাচাইকৃত এবং সুরক্ষিত",
      gov: "সরকারি-সুরক্ষিত ইন্টারফেস"
    }
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<LanguageCode>('en');

  const t = (key: string) => {
    const keys = key.split('.');
    let result = translations[language];
    for (const k of keys) {
      if (result[k] === undefined) return key;
      result = result[k];
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
