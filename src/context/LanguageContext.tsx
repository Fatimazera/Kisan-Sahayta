
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
      apply: "Apply",
      signIn: "Sign In",
      signOut: "Sign Out"
    },
    auth: {
      title: "Farmer Login",
      description: "Secure access using your mobile number.",
      phoneLabel: "Phone Number",
      otpLabel: "Enter OTP",
      sendCode: "Send OTP",
      verifyCode: "Verify & Sign In",
      placeholder: "+91 9876543210",
      sending: "Sending...",
      verifying: "Verifying...",
      success: "Logged in successfully!",
      error: "Authentication failed. Please try again."
    },
    hero: {
      welcome: "WELCOME TO",
      kisanSahayata: "KISAN SAHAYATA",
      subtitle: "Modernizing agricultural progress through cinematic intelligence. A seamless gateway for India's farming community."
    },
    eligibility: {
      title: "Quick Eligibility Status",
      desc: "Instantly check if you are registered for national subsidies.",
      idLabel: "Kisan ID / Farmer ID",
      phoneLabel: "Registered Phone Number",
      btn: "Check Status",
      checking: "Checking...",
      success: "Farmer Found",
      successDesc: "Your profile is active and eligible for subsidies.",
      fail: "No Record Found",
      failDesc: "We couldn't find a record with these details. Please verify your ID or register.",
      error: "System Busy",
      errorDesc: "Verification is temporarily unavailable. Please try again later."
    },
    email: {
      title: "Receive Status via Email",
      desc: "Enter your email to receive a detailed subsidy tracking report.",
      emailLabel: "Email Address",
      idLabel: "Farmer ID",
      btn: "Send My Report",
      sending: "Sending...",
      success: "Email Sent!",
      successDesc: "Check your inbox for your detailed subsidy status report.",
      fail: "Invalid ID",
      failDesc: "We could not verify this Farmer ID. Please check and try again."
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
    },
    verify: {
      reportTitle: "Subsidy Authenticity Report",
      statusAuthentic: "Verified Authentic",
      statusInvalid: "Invalid / Flagged",
      securityAlert: "Security Alert: Verification Failed",
      securityAlertDesc: "This subsidy record could not be found in our Distributed Ledger. Please report this discrepancy immediately.",
      beneficiaryDetails: "Beneficiary Details",
      verificationId: "Verification ID",
      securityHash: "Security Hash",
      printCert: "Print Certificate",
      reportDiscrepancy: "Report Discrepancy",
      officialNote: "Verified via Government Distributed Ledger (GDL)",
      backHome: "Back to Home",
      category: "Category",
      issueDate: "Issue Date",
      expiryDate: "Expiry Date"
    }
  },
  hi: {
    nav: {
      home: "होम",
      about: "बारे में",
      agriAi: "एग्री-एआई",
      portal: "पोर्टल",
      apply: "आवेदन करें",
      signIn: "लॉग इन करें",
      signOut: "लॉग आउट"
    },
    auth: {
      title: "किसान लॉगिन",
      description: "अपने मोबाइल नंबर का उपयोग करके सुरक्षित पहुंच।",
      phoneLabel: "फोन नंबर",
      otpLabel: "ओटीपी दर्ज करें",
      sendCode: "ओटीपी भेजें",
      verifyCode: "सत्यापित करें और लॉग इन करें",
      placeholder: "+91 9876543210",
      sending: "भेजा जा रहा है...",
      verifying: "सत्यापित किया जा रहा है...",
      success: "सफलतापूर्वक लॉग इन किया गया!",
      error: "प्रमाणीकरण विफल रहा। कृपया पुनः प्रयास करें।"
    },
    hero: {
      welcome: "आपका स्वागत है",
      kisanSahayata: "किसान सहायता",
      subtitle: "सिनेमैटिक इंटेलिजेंस के माध्यम से कृषि प्रगति का आधुनिकीकरण। भारत के किसान समुदाय के लिए एक सहज प्रवेश द्वार।"
    },
    eligibility: {
      title: "त्वरित पात्रता स्थिति",
      desc: "तुरंत जांचें कि क्या आप राष्ट्रीय सब्सिडी के लिए पंजीकृत हैं।",
      idLabel: "किसान आईडी / किसान आईडी",
      phoneLabel: "पंजीकृत फोन नंबर",
      btn: "स्थिति जांचें",
      checking: "जांच की जा रही है...",
      success: "किसान मिला",
      successDesc: "आपका प्रोफाइल सक्रिय है और आप सब्सिडी के लिए पात्र हैं।",
      fail: "कोई रिकॉर्ड नहीं मिला",
      failDesc: "हमें इन विवरणों के साथ कोई रिकॉर्ड नहीं मिला। कृपया अपनी आईडी सत्यापित करें या पंजीकरण करें।",
      error: "सिस्टम व्यस्त",
      errorDesc: "सत्यापन अस्थायी रूप से अनुपलब्ध है। कृपया बाद में पुनः प्रयास करें।"
    },
    email: {
      title: "ईमेल के माध्यम से स्थिति प्राप्त करें",
      desc: "विस्तृत सब्सिडी ट्रैकिंग रिपोर्ट प्राप्त करने के लिए अपना ईमेल दर्ज करें।",
      emailLabel: "ईमेल पता",
      idLabel: "किसान आईडी",
      btn: "मेरी रिपोर्ट भेजें",
      sending: "भेजा जा रहा है...",
      success: "ईमेल भेज दिया गया!",
      successDesc: "अपनी विस्तृत सब्सिडी स्थिति रिपोर्ट के लिए अपना इनबॉक्स देखें।",
      fail: "अमान्य आईडी",
      failDesc: "हम इस किसान आईडी को सत्यापित नहीं कर सके। कृपया जांचें और पुनः प्रयास करें।"
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
    },
    verify: {
      reportTitle: "सब्सिडी प्रामाणिकता रिपोर्ट",
      statusAuthentic: "सत्यापित प्रामाणिक",
      statusInvalid: "अमान्य / चिह्नित",
      securityAlert: "सुरक्षा चेतावनी: सत्यापन विफल",
      securityAlertDesc: "यह सब्सिडी रिकॉर्ड हमारे लेजर में नहीं मिला। कृपया तुरंत इस विसंगति की रिपोर्ट करें।",
      beneficiaryDetails: "लाभार्थी विवरण",
      verificationId: "सत्यापन आईडी",
      securityHash: "सुरक्षा हैश",
      printCert: "प्रमाण पत्र प्रिंट करें",
      reportDiscrepancy: "विसंगति की रिपोर्ट करें",
      officialNote: "सरकारी वितरित लेजर (GDL) के माध्यम से सत्यापित",
      backHome: "होम पर वापस जाएं",
      category: "श्रेणी",
      issueDate: "जारी करने की तिथि",
      expiryDate: "समाप्ति तिथि"
    }
  },
  ur: {
    nav: {
      home: "ہوم",
      about: "کے بارے में",
      agriAi: "ایگری-اے آئی",
      portal: "पोर्टल",
      apply: "درخواست دیں",
      signIn: "سائن ان",
      signOut: "سائن آؤٹ"
    },
    auth: {
      title: "کسان لاگ ان",
      description: "آپ کے موبائل نمبر کا استعمال کرتے ہوئے محفوظ رسائی۔",
      phoneLabel: "فون نمبر",
      otpLabel: "او ٹی پی درج کریں",
      sendCode: "او ٹی پی بھیجیں",
      verifyCode: "تصدیق کریں اور سائن ان کریں",
      placeholder: "+91 9876543210",
      sending: "بھیج رہا ہے...",
      verifying: "تصدیق ہو رہی ہے...",
      success: "کامیابی کے ساتھ لاگ ان ہو گیا!",
      error: "تصدیق ناکام ہو گئی۔ براہ کرم دوبارہ کوشش کریں۔"
    },
    hero: {
      welcome: "خوش آمدید",
      kisanSahayata: "کسان سہایتا",
      subtitle: "سنیماٹک انٹیلیجنس کے ذریعے زرعی ترقی کو جدید بنانا۔ ہندوستان کی کسان برادری کے لیے ایک ہموار گیٹ وے۔"
    },
    eligibility: {
      title: "اہلیت کی فوری حیثیت",
      desc: "فوری طور پر چیک کریں کہ آیا آپ قومی سبسڈی کے لیے رجسٹرڈ ہیں۔",
      idLabel: "کسان آئی ڈی / فارمر آئی ڈی",
      phoneLabel: "رجسٹرڈ فون نمبر",
      btn: "حیثیت چیک کریں",
      checking: "چیک کر رہا ہے...",
      success: "کسان مل گیا",
      successDesc: "آپ کا پروفائل فعال ہے اور آپ سبسڈی کے اہل ہیں۔",
      fail: "کوئی ریکارڈ نہیں ملا",
      failDesc: "ہمیں ان تفصیلات کے ساتھ کوئی ریکارڈ نہیں ملا۔ براہ کرم اپنی آئی ڈی کی تصدیق کریں یا رجسٹر کریں۔",
      error: "سسٹم مصروف ہے",
      errorDesc: "تصدیق عارضی طور پر دستیاب نہیں ہے۔ براہ کرم بعد میں دوبارہ کوشش کریں۔"
    },
    email: {
      title: "ای میل کے ذریعے حیثیت حاصل کریں",
      desc: "سبسڈی کی تفصیلی ٹریکنگ رپورٹ حاصل کرنے کے لیے اپنا ای میل درج کریں۔",
      emailLabel: "ای میل پتہ",
      idLabel: "فارمر آئی ڈی",
      btn: "मेरी रिपोर्ट भेजें",
      sending: "بھیج رہا ہے...",
      success: "ای میل بھیج دیا گیا!",
      successDesc: "اپنی تفصیلی سبسڈی اسٹیٹس رپورٹ کے لیے اپنا ان باکس چیک کریں۔",
      fail: "غلط آئی ڈی",
      failDesc: "ہم اس کسان آئی ڈی کی تصدیق نہیں کر سکے۔ براہ کرم چیک کریں اور دوبارہ کوشش کریں۔"
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
      subtitle: "ہمارا AI آپ کے بہترین میچز کو فوری طور پر تلاش کرنے کے لیے قومی اسکیموں کے خلاف آپ کے فارم پروفائل کا تحلیل کرتا ہے۔",
      btn: "اہلیت AI آزمائیں",
      verified: "تصدیق شدہ اور محفوظ",
      gov: "حکومتی محفوظ انٹرفیس"
    },
    verify: {
      reportTitle: "سبسڈی کی تصدیقی رپورٹ",
      statusAuthentic: "تصدیق شدہ اصلی",
      statusInvalid: "غیر قانونی / مشکوک",
      securityAlert: "سیکیورٹی الرٹ: تصدیق ناکام",
      securityAlertDesc: "یہ ریکارڈ ہمارے سرکاری کھاتے میں نہیں ملا۔ براہ کرم فوری اطلاع دیں۔",
      beneficiaryDetails: "فائدہ اٹھانے والے کی تفصیلات",
      verificationId: "تصدیقی آئی ڈی",
      securityHash: "سیکیورٹی ہیش",
      printCert: "سرٹیفکیٹ پرنٹ کریں",
      reportDiscrepancy: "اختلاف کی اطلاع دیں",
      officialNote: "سرکاری کھاتے (GDL) کے ذریعے تصدیق شدہ",
      backHome: "ہوم پر واپس جائیں",
      category: "زمرہ",
      issueDate: "تاریخ اجراء",
      expiryDate: "تاریخ خاتمہ"
    }
  },
  mr: {
    nav: {
      home: "होम",
      about: "बद्दल",
      agriAi: "एग्री-एआय",
      portal: "पोर्टल",
      apply: "अर्ज करा",
      signIn: "साइन इन करा",
      signOut: "साइन आउट"
    },
    auth: {
      title: "शेतकरी लॉगिन",
      description: "तुमचा मोबाईल नंबर वापरून सुरक्षित प्रवेश.",
      phoneLabel: "मोबाईल नंबर",
      otpLabel: "ओटीपी प्रविष्ट करा",
      sendCode: "ओटीपी पाठवा",
      verifyCode: "पडताळणी करा आणि साइन इन करा",
      placeholder: "+91 9876543210",
      sending: "पाठवत आहे...",
      verifying: "पडताळणी करत आहे...",
      success: "यशस्वीरित्या लॉगिन झाले!",
      error: "प्रमाणीकरण अयशस्वी. कृपया पुन्हा प्रयत्न करा."
    },
    hero: {
      welcome: "स्वागत आहे",
      kisanSahayata: "किसान सहायता",
      subtitle: "सिनेमॅटिक इंटेलिजन्सद्वारे कृषी प्रगतीचे आधुनिकीकरण. भारताच्या शेतकरी समुदायासाठी एक अखंड प्रवेशद्वार."
    },
    eligibility: {
      title: "त्वरित पात्रता स्थिती",
      desc: "तुम्ही राष्ट्रीय अनुदानासाठी नोंदणीकृत आहात की नाही ते त्वरित तपासा.",
      idLabel: "किसान आयडी / शेतकरी आयडी",
      phoneLabel: "नोंदणीकृत फोन नंबर",
      btn: "स्थिती तपासा",
      checking: "तपासत आहे...",
      success: "शेतकरी सापडला",
      successDesc: "तुमचे प्रोफाइल सक्रिय आहे आणि तुम्ही अनुदानासाठी पात्र आहात.",
      fail: "रेकॉर्ड सापडला नाही",
      failDesc: "आम्हाला या तपशिलांसह रेकॉर्ड सापडला नाही. कृपया तुमचा आयडी सत्यापित करा किंवा नोंदणी करा.",
      error: "सिस्टम व्यस्त",
      errorDesc: "पडताळणी तात्पुरती अनुपलब्ध आहे. कृपया नंतर पुन्हा प्रयत्न करा."
    },
    email: {
      title: "ईमेलद्वारे स्थिती प्राप्त करा",
      desc: "तपशीलवार अनुदान ट्रॅकिंग अहवाल प्राप्त करण्यासाठी तुमचा ईमेल प्रविष्ट करा.",
      emailLabel: "ईमेल पत्ता",
      idLabel: "शेतकरी आयडी",
      btn: "माझा अहवाल पाठवा",
      sending: "पाठवत आहे...",
      success: "ईमेल पाठवला!",
      successDesc: "तुमच्या तपशीलवार अनुदान स्थिती अहवालासाठी तुमचे इनबॉक्स तपासा.",
      fail: "अवैध आयडी",
      failDesc: "आम्ही या शेतकरी आयडीची पडताळणी करू शकलो नाही. कृपया तपासा आणि पुन्हा प्रयत्न करा."
    },
    categories: {
      title: "सर्वसमावेशक कृषी उपाय",
      subtitle: "तुमच्या शेतीची उत्पादकता आणि टिकाऊपणा वाढवण्यासाठी तयार केलेले थेट सरकारी सहाय्य.",
      pillar: "पाधाराचे स्तंभ",
      learnMore: "अधिक जाणून घ्या"
    },
    qr: {
      title: "प्रमाणिकता पडताळणी",
      description: "तुमच्या कृषी अनुदानाच्या वैधतेची त्वरित पडताळणी करा. अधिकधिक तपासणीसाठी शेअर करण्यासाठी किंवा प्रदर्शित करण्यासाठी सुरक्षित क्यूआर कोड तयार करा.",
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
    },
    verify: {
      reportTitle: "अनुदान प्रमाणिकता अहवाल",
      statusAuthentic: "सत्यापित अस्सल",
      statusInvalid: "अमान्य / चिन्हांकित",
      securityAlert: "सुरक्षा अलर्ट: पडताळणी अयशस्वी",
      securityAlertDesc: "हे रेकॉर्ड आमच्या लेजरमध्ये आढळले नाही. कृपया त्वरित कळवा.",
      beneficiaryDetails: "लाभार्थी तपशील",
      verificationId: "पडताळणी आयडी",
      securityHash: "सुरक्षा हॅश",
      printCert: "प्रमाणपत्र प्रिंट करा",
      reportDiscrepancy: "विसंगती कळवा",
      officialNote: "शासकीय वितरित लेजर (GDL) द्वारे सत्यापित",
      backHome: "होम वर परत जा",
      category: "श्रेणी",
      issueDate: "जारी केल्याची तारीख",
      expiryDate: "मुदत संपण्याची तारीख"
    }
  },
  gu: {
    nav: {
      home: "હોમ",
      about: "વિશે",
      agriAi: "એગ્રી-એઆઈ",
      portal: "પોર્ટલ",
      apply: "અરજી કરો",
      signIn: "સાઇન ઇન",
      signOut: "સાઇન આઉટ"
    },
    auth: {
      title: "ખેડૂત લોગિન",
      description: "તમારા મોબાઈલ નંબરનો ઉપયોગ કરીને સુરક્ષિત પ્રવેશ.",
      phoneLabel: "મોબાઈલ નંબર",
      otpLabel: "OTP દાખલ કરો",
      sendCode: "OTP મોકલો",
      verifyCode: "ચકાસો અને સાઇન ઇન કરો",
      placeholder: "+91 9876543210",
      sending: "મોકલી રહ્યું છે...",
      verifying: "ચકાસી રહ્યું છે...",
      success: "સફળતાપૂર્વક લોગ ઇન થયા!",
      error: "પ્રમાણીકરણ નિષ્ફળ થયું. કૃપા કરીને ફરી પ્રયાસ કરો."
    },
    hero: {
      welcome: "સ્વાગત છે",
      kisanSahayata: "કિસાન સહાયતા",
      subtitle: "સિનેમેટિક ઇન્ટેલિજન્સ દ્વારા કૃષિ પ્રગતિનું આધુનિકીકરણ. ભારતના ખેડૂત સમુદાય માટે સીમલેસ ગેટવે."
    },
    eligibility: {
      title: "ઝડપી પાત્રતા સ્થિતિ",
      desc: "તમે રાષ્ટ્રીય સબસિડી માટે નોંધાયેલા છો કે નહીં તે તરત જ તપાસો.",
      idLabel: "કિસાન આઈડી / ખેડૂત આઈડી",
      phoneLabel: "નોંધાયેલ ફોન નંબર",
      btn: "સ્થિતિ તપાસો",
      checking: "તપાસી રહ્યું છે...",
      success: "ખેડૂત મળી આવ્યો",
      successDesc: "તમારી પ્રોફાઇલ સક્રિય છે અને તમે સબસિડી માટે પાત્ર છો.",
      fail: "કોઈ રેકોર્ડ મળ્યો નથી",
      failDesc: "અમને આ વિગતો સાથે કોઈ રેકોર્ડ મળ્યો નથી. કૃપા કરીને તમારો આઈડી ચકાસો અથવા નોંધણી કરો.",
      error: "સિસ્ટમ વ્યસ્ત",
      errorDesc: "ચકાસણી કામચલાઉ રીતે અનુપલબ્ધ છે. કૃપા કરીને પછીથી ફરી પ્રયાસ કરો."
    },
    email: {
      title: "ઈમેલ દ્વારા સ્ટેટસ મેળવો",
      desc: "વિગતવાર સબસિડી ટ્રેકિંગ રિપોર્ટ મેળવવા માટે તમારો ઈમેલ દાખલ કરો.",
      emailLabel: "ઈમેલ સરનામું",
      idLabel: "ખેડૂત આઈડી",
      btn: "મારો રિપોર્ટ મોકલો",
      sending: "મોકલી રહ્યું છે...",
      success: "ઈમેલ મોકલાઈ ગયો!",
      successDesc: "તમારા વિગતવાર સબસિડી સ્ટેટસ રિપોર્ટ માટે તમારું ઇનબોક્સ તપાસો.",
      fail: "અમાન્ય આઈડી",
      failDesc: "અમે આ ખેડૂત આઈડી ચકાસી શક્યા નથી. કૃપા કરીને તપાસો અને ફરીથી પ્રયાસ કરો."
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
    },
    verify: {
      reportTitle: "સબસિડી પ્રમાણિકતા રિપોર્ટ",
      statusAuthentic: "ચકાસાયેલ અસલી",
      statusInvalid: "અમાન્ય / ફ્લેગ કરેલ",
      securityAlert: "સુરક્ષા ચેતવણી: ચકાસણી નિષ્ફળ",
      securityAlertDesc: "આ રેકોર્ડ અમારા લેજરમાં મળ્યો નથી. કૃપા કરીને તરત જ જાણ કરો.",
      beneficiaryDetails: "લાભાર્થીની વિગતો",
      verificationId: "ચકાસણી આઈડી",
      securityHash: "સુરક્ષા હેશ",
      printCert: "પ્રમાણપત્ર પ્રિન્ટ કરો",
      reportDiscrepancy: "વિસંગતતાની જાણ કરો",
      officialNote: "સરકારી વિતરિત લેજર (GDL) દ્વારા ચકાસાયેલ",
      backHome: "હોમ પર પાછા જાઓ",
      category: "કેટેગરી",
      issueDate: "ઇશ્યુ તારીખ",
      expiryDate: "સમાપ્તિ તારીખ"
    }
  },
  bn: {
    nav: {
      home: "হোম",
      about: "সম্পর্কে",
      agriAi: "এগ্রি-এআই",
      portal: "portal",
      apply: "আবেদন করুন",
      signIn: "সাইন ইন",
      signOut: "সাইন আউট"
    },
    auth: {
      title: "কৃষক লগইন",
      description: "আপনার মোবাইল নম্বর ব্যবহার করে সুরক্ষিত অ্যাক্সেস।",
      phoneLabel: "ফোন নম্বর",
      otpLabel: "OTP লিখুন",
      sendCode: "OTP পাঠান",
      verifyCode: "যাচাই করুন এবং সাইন ইন করুন",
      placeholder: "+91 9876543210",
      sending: "পাঠানো হচ্ছে...",
      verifying: "যাচাই করা হচ্ছে...",
      success: "সাফল্যের সাথে লগ ইন করা হয়েছে!",
      error: "প্রমাণীকরণ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"
    },
    hero: {
      welcome: "স্বাগতম",
      kisanSahayata: "কিষাণ সহায়তা",
      subtitle: "সিনেমাটিক ইন্টেলিজেন্সের মাধ্যমে কৃষি অগ্রগতির আধুনিকীকরণ। ভারতের কৃষক সম্প্রদায়ের জন্য একটি নিরবচ্ছিন্ন প্রবেশদ্বার।"
    },
    eligibility: {
      title: "দ্রুত যোগ্যতা স্থিতি",
      desc: "আপনি জাতীয় ভর্তুকির জন্য নিবন্ধিত কিনা তা তাৎক্ষণিকভাবে পরীক্ষা করুন।",
      idLabel: "কিষাণ আইডি / কৃষক আইডি",
      phoneLabel: "নিবন্ধিত ফোন নম্বর",
      btn: "স্থিতি পরীক্ষা করুন",
      checking: "পরীক্ষা করা হচ্ছে...",
      success: "কৃষক পাওয়া গেছে",
      successDesc: "আপনার প্রোফাইল সক্রিয় এবং আপনি ভর্তুকির জন্য যোগ্য।",
      fail: "কোন রেকর্ড পাওয়া যায়নি",
      failDesc: "আমরা এই বিবরণ সহ কোন রেকর্ড খুঁজে পাইনি। আপনার আইডি যাচাই করুন বা নিবন্ধন করুন।",
      error: "সিস্টেম ব্যস্ত",
      errorDesc: "যাচাইকরণ সাময়িকভাবে অনুপলব্ধ। অনুগ্রহ করে পরে আবার চেষ্টা করুন।"
    },
    email: {
      title: "ইমেলের মাধ্যমে স্থিতি পান",
      desc: "বিস্তারিত ভর্তুকি ট্র্যাকিং রিপোর্ট পেতে আপনার ইমেল লিখুন।",
      emailLabel: "ইমেল ঠিকানা",
      idLabel: "কৃষক আইডি",
      btn: "আমার রিপোর্ট পাঠান",
      sending: "পাঠানো হচ্ছে...",
      success: "ইমেল পাঠানো হয়েছে!",
      successDesc: "আপনার বিস্তারিত ভর্তুকি স্থিতির রিপোর্টের জন্য আপনার ইনবক্স পরীক্ষা করুন।",
      fail: "অবৈধ আইডি",
      failDesc: "আমরা এই কৃষক আইডি যাচাই করতে পারিনি। অনুগ্রহ করে পরীক্ষা করুন এবং আবার চেষ্টা করুন।"
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
      gov: "সরকারি-সুরक्षित ইন্টারফেস"
    },
    verify: {
      reportTitle: "ভর্তুকি নির্ভরযোগ্যতা রিপোর্ট",
      statusAuthentic: "যাচাইকৃত আসল",
      statusInvalid: "অবৈধ / চিহ্নিত",
      securityAlert: "সুরক্ষা সতর্কতা: যাচাইকরণ ব্যর্থ",
      securityAlertDesc: "এই রেকর্ডটি আমাদের লেজারে পাওয়া যায়নি। অনুগ্রহ করে অবিলম্বে রিপোর্ট করুন।",
      beneficiaryDetails: "উপভোক্তার বিবরণ",
      verificationId: "যাচাইকরণ আইডি",
      securityHash: "সুরক্ষা হ্যাশ",
      printCert: "শংসাপত্র প্রিন্ট করুন",
      reportDiscrepancy: "অসংগতি রিপোর্ট করুন",
      officialNote: "সরকারি বিতরণকৃত লেজার (GDL) দ্বারা যাচাইকৃত",
      backHome: "হোমে ফিরে যান",
      category: "বিভাগ",
      issueDate: "ইস্যু তারিখ",
      expiryDate: "মেয়াদ শেষ হওয়ার তারিখ"
    }
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<LanguageCode>('en');

  const t = (key: string) => {
    const keys = key.split('.');
    let result = translations[language];
    for (const k of keys) {
      if (!result || result[k] === undefined) return key;
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
