
"use client";
import { getAuth  } from "firebase/auth";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { app } from "../firebase/config";


import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sprout, Droplets, FlaskConical, ArrowRight, BrainCircuit, ShieldCheck } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { QRVerificationSection } from "@/components/QRVerificationSection";
import { EmailTrackingSection } from "@/components/EmailTrackingSection";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  
  const { t } = useLanguage();
  const auth = getAuth(app);

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  
  
  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      alert("Verification email sent 📩");
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await user.reload();
  
      if (!user.emailVerified) {
        alert("Please verify your email first ❌");
        return;
      }
  
      alert("Login successful ✅");
    } catch (error: any) {
      console.error(error.message);
    }
  };
 
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] flex items-center overflow-hidden -mt-20 pt-32">
        <div className="absolute inset-0 z-0">
          <AnimatedBackground />
          {/* Cinematic readability overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 z-10" />
          <div className="absolute inset-0 bg-black/30 z-10" />
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-6xl space-y-12">
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <h1 className="text-6xl md:text-[9rem] font-bold leading-[0.85] text-white tracking-tighter font-louize">
                {t('hero.welcome')} <br />
                <span className="text-primary italic">{t('hero.kisanSahayata')}</span>
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
              {t('hero.subtitle')}
            </p>

            {/* Sign Up Block Moved Below Heading */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl max-w-md animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-400">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full mb-3 p-2 rounded text-black"
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Enter password"
                className="w-full mb-3 p-2 rounded text-black"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                onClick={handleSignup}
                className="w-full bg-green-500 text-white p-2 rounded font-bold hover:bg-green-600 transition-colors"
              >
                Sign Up
              </button>
            </div>

            <div className="flex items-center gap-10 pt-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
              <Link href="/" className="text-white/80 hover:text-primary text-xl font-bold tracking-widest uppercase transition-colors border-b-2 border-transparent hover:border-primary pb-1">
                {t('nav.home')}
              </Link>
              <Link href="/subsidies" className="text-white/80 hover:text-primary text-xl font-bold tracking-widest uppercase transition-colors border-b-2 border-transparent hover:border-primary pb-1">
                {t('nav.about')}
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce opacity-30">
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-white to-transparent" />
        </div>
      </section>

      {/* Subsidy Categories */}
      <section className="py-32 container mx-auto px-4 bg-background">
        <div className="text-center space-y-6 mb-24 max-w-3xl mx-auto">
          <Badge variant="outline" className="rounded-full px-5 py-1 text-primary border-primary font-bold tracking-widest uppercase text-[10px]">{t('categories.pillar')}</Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{t('categories.title')}</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t('categories.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Fertilizer Support",
              description: "Direct discounts on NPK, Urea, and organic fertilizers based on soil health reports.",
              icon: FlaskConical,
              img: 'fertilizer-cat',
              color: "bg-blue-50 text-blue-600"
            },
            {
              title: "Seed Programs",
              description: "Access high-yield variety (HYV) and climate-resilient seeds at competitive prices.",
              icon: Sprout,
              img: 'seeds-cat',
              color: "bg-green-50 text-green-600"
            },
            {
              title: "Irrigation Assistance",
              description: "Support for drip irrigation, sprinklers, and solar pump installations.",
              icon: Droplets,
              img: 'irrigation-cat',
              color: "bg-cyan-50 text-cyan-600"
            }
          ].map((cat, idx) => (
            <Card key={idx} className="group overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] bg-muted/20">
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src={PlaceHolderImages.find(i => i.id === cat.img)?.imageUrl || ""} 
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <CardHeader className="pt-8 px-8">
                <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center mb-6 shadow-sm`}>
                  <cat.icon className="w-7 h-7" />
                </div>
                <CardTitle className="text-2xl font-bold">{cat.title}</CardTitle>
                <CardDescription className="text-base mt-2">{cat.description}</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <Button variant="link" className="p-0 text-primary font-bold group h-auto" asChild>
                  <Link href="/subsidies" className="flex items-center gap-2">
                    {t('categories.learnMore')} <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Email Tracking Section */}
      <EmailTrackingSection />

      {/* QR Verification Section */}
      <QRVerificationSection />

      {/* AI Tool CTA */}
      <section className="py-32 bg-accent text-accent-foreground relative overflow-hidden">
        <div className="absolute right-[-10%] top-[-10%] opacity-10 pointer-events-none rotate-12">
          <BrainCircuit size={600} className="text-primary" />
        </div>
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-5 py-2 rounded-full font-bold text-xs tracking-widest uppercase">
              <BrainCircuit className="w-5 h-5" />
              {t('ai.badge')}
            </div>
            <h2 className="text-5xl md:text-6xl font-bold leading-tight tracking-tighter">{t('ai.title')}</h2>
            <p className="text-xl text-accent-foreground/80 leading-relaxed max-w-xl">
              {t('ai.subtitle')}
            </p>
            <Button size="lg" variant="secondary" className="rounded-full px-10 h-14 font-bold text-lg hover:scale-105 transition-transform" asChild>
              <Link href="/eligibility">{t('ai.btn')}</Link>
            </Button>
          </div>
          <div className="relative glass-morphism p-10 rounded-[3rem] border-primary/20 shadow-2xl bg-white/5 backdrop-blur-xl">
            <div className="space-y-8">
              <div className="flex items-center gap-6 border-b border-primary/10 pb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <ShieldCheck className="text-primary w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-2xl text-white tracking-tight">{t('ai.verified')}</h4>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest opacity-60">{t('ai.gov')}</p>
                </div>
              </div>
              <div className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10 relative overflow-hidden">
                <div className="absolute left-0 top-0 w-1 h-full bg-primary" />
                <p className="italic text-lg text-white/90 leading-relaxed">"The AI guide helped me find assistance I didn't even know existed for my grove. A real game changer."</p>
                <p className="mt-4 font-bold text-primary text-xl">— Ramesh K., Nashik District</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
