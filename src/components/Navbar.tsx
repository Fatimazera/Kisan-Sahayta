
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Sprout, Menu, X, Globe, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <div className="hidden md:flex items-center gap-10">
          <Link href="/" className="text-sm font-bold tracking-widest uppercase text-white/70 hover:text-white transition-colors">Home</Link>
          <Link href="/subsidies" className="text-sm font-bold tracking-widest uppercase text-white/70 hover:text-white transition-colors">About</Link>
          <Link href="/eligibility" className="text-sm font-bold tracking-widest uppercase text-white/70 hover:text-white transition-colors">Agri-AI</Link>
          <Link href="/dashboard" className="text-sm font-bold tracking-widest uppercase text-white/70 hover:text-white transition-colors">Portal</Link>
          
          <div className="flex items-center gap-6 border-l border-white/10 pl-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/10">
                  <Globe className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Hindi (हिन्दी)</DropdownMenuItem>
                <DropdownMenuItem>Marathi (मराठी)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button asChild className="rounded-full px-8 bg-primary text-primary-foreground font-black uppercase tracking-tighter hover:scale-105 transition-transform shadow-xl shadow-primary/20">
              <Link href="/apply">Apply</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-black/95 backdrop-blur-2xl px-8 py-12 space-y-8 animate-in slide-in-from-top duration-500 z-50">
          <Link href="/" className="block text-4xl font-black text-white uppercase tracking-tighter" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/subsidies" className="block text-4xl font-black text-white uppercase tracking-tighter" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/eligibility" className="block text-4xl font-black text-white uppercase tracking-tighter" onClick={() => setIsOpen(false)}>Agri-AI</Link>
          <Link href="/dashboard" className="block text-4xl font-black text-white uppercase tracking-tighter" onClick={() => setIsOpen(false)}>Portal</Link>
          <div className="pt-8 flex flex-col gap-6 border-t border-white/10">
            <Button asChild className="w-full h-16 text-xl rounded-full font-black uppercase tracking-tighter" onClick={() => setIsOpen(false)}>
              <Link href="/apply">Apply Now</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
