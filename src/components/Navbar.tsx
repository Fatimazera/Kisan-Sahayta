"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Sprout, Menu, X, Globe, User, ChevronDown, LogOut, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useLanguage, LanguageCode } from "@/context/LanguageContext";
import { useUser, useAuth } from "@/firebase";

const languages: { code: LanguageCode; name: string; native: string }[] = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "ur", name: "Urdu", native: "اردو" },
  { code: "mr", name: "Marathi", native: "मराठी" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી" },
  { code: "bn", name: "Bengali", native: "বাংলা" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user } = useUser();
  const auth = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    auth.signOut();
  };

  const currentLangName = languages.find(l => l.code === language)?.name || "English";

  return (
    <nav className={cn(
      "fixed top-0 z-50 w-full transition-all duration-500 h-20 flex items-center",
      scrolled ? "bg-black/80 backdrop-blur-lg border-b border-white/10" : "bg-transparent border-none"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/20 p-2 rounded-xl transition-transform group-hover:rotate-12">
            <Sprout className="w-6 h-6 text-primary" strokeWidth={2.5} />
          </div>
          <span className="font-headline text-2xl font-bold tracking-tighter uppercase text-white">
            KISAN <span className="text-primary italic">SAHAYATA</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-[10px] font-black tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors">{t('nav.home')}</Link>
          <Link href="/subsidies" className="text-[10px] font-black tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors">{t('nav.about')}</Link>
          <Link href="/ecommerce" className="text-[10px] font-black tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors flex items-center gap-1">
            <ShoppingCart className="w-3 h-3 text-primary" /> {t('nav.ecommerce')}
          </Link>
          <Link href="/eligibility" className="text-[10px] font-black tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors">{t('nav.agriAi')}</Link>
          <Link href="/dashboard" className="text-[10px] font-black tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors">{t('nav.portal')}</Link>
          
          <div className="flex items-center gap-6 border-l border-white/10 pl-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full text-white/80 hover:text-white hover:bg-white/10 flex items-center gap-2 px-4">
                  <Globe className="w-4 h-4" />
                  <span className="text-[10px] font-black tracking-widest uppercase">{currentLangName}</span>
                  <ChevronDown className="w-3 h-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {languages.map((lang) => (
                  <DropdownMenuItem 
                    key={lang.code} 
                    onClick={() => setLanguage(lang.code)}
                    className="flex justify-between items-center cursor-pointer"
                  >
                    <span>{lang.name}</span>
                    <span className="text-[10px] text-muted-foreground opacity-70">{lang.native}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full text-white hover:bg-white/10 flex items-center gap-2 px-4 border border-white/20">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-black tracking-widest uppercase truncate max-w-[100px]">{user.displayName || 'Farmer'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <User className="w-4 h-4" /> Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive flex items-center gap-2">
                    <LogOut className="w-4 h-4" /> {t('nav.signOut')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            <Button asChild className="rounded-full px-8 bg-primary text-primary-foreground font-black uppercase tracking-tighter hover:scale-105 transition-transform shadow-xl shadow-primary/20">
              <Link href="/apply">{t('nav.apply')}</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
           <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-white">
                  <Globe className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code)}>
                    {lang.name} ({lang.native})
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-black/95 backdrop-blur-2xl px-8 py-12 space-y-8 animate-in slide-in-from-top duration-500 z-50">
          <Link href="/" className="block text-4xl font-black text-white uppercase tracking-tighter" onClick={() => setIsOpen(false)}>{t('nav.home')}</Link>
          <Link href="/subsidies" className="block text-4xl font-black text-white uppercase tracking-tighter" onClick={() => setIsOpen(false)}>{t('nav.about')}</Link>
          <Link href="/ecommerce" className="block text-4xl font-black text-white uppercase tracking-tighter" onClick={() => setIsOpen(false)}>{t('nav.ecommerce')}</Link>
          <Link href="/eligibility" className="block text-4xl font-black text-white uppercase tracking-tighter" onClick={() => setIsOpen(false)}>{t('nav.agriAi')}</Link>
          <Link href="/dashboard" className="block text-4xl font-black text-white uppercase tracking-tighter" onClick={() => setIsOpen(false)}>{t('nav.portal')}</Link>
          
          <div className="pt-8 flex flex-col gap-6 border-t border-white/10">
            <div className="space-y-4">
               <p className="text-[10px] font-black tracking-[0.3em] uppercase text-white/30">Select Language</p>
               <div className="grid grid-cols-2 gap-3">
                  {languages.map((lang) => (
                    <button 
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "text-left p-3 rounded-xl border transition-all",
                        language === lang.code 
                          ? "bg-primary border-primary text-primary-foreground font-bold" 
                          : "bg-white/5 border-white/10 text-white/60"
                      )}
                    >
                      <p className="text-sm">{lang.name}</p>
                      <p className="text-[10px] opacity-60">{lang.native}</p>
                    </button>
                  ))}
               </div>
            </div>

            <div className="flex flex-col gap-4">
              {user && (
                <Button onClick={handleSignOut} variant="outline" className="w-full h-16 text-xl rounded-full font-black uppercase tracking-tighter border-white/20 text-white">
                  {t('nav.signOut')}
                </Button>
              )}
              <Button asChild className="w-full h-16 text-xl rounded-full font-black uppercase tracking-tighter" onClick={() => setIsOpen(false)}>
                <Link href="/apply">{t('nav.apply')} Now</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}