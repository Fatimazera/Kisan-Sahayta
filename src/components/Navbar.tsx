
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
      "sticky top-0 z-50 w-full transition-all duration-500",
      scrolled ? "bg-black/60 backdrop-blur-md border-b border-white/10" : "bg-transparent border-none"
    )}>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary/20 p-1.5 rounded-lg">
            <Sprout className="w-6 h-6 text-primary" strokeWidth={2.5} />
          </div>
          <span className="font-headline text-xl font-bold tracking-tight uppercase text-white">
            KISAN <span className="text-primary">SAHAYATA</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/subsidies" className="text-sm font-medium text-white/80 hover:text-primary transition-colors">Support Programs</Link>
          <Link href="/eligibility" className="text-sm font-medium text-white/80 hover:text-primary transition-colors">Eligibility Checker</Link>
          <Link href="/dashboard" className="text-sm font-medium text-white/80 hover:text-primary transition-colors">Farmer Portal</Link>
          
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/10">
                  <Globe className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Hindi (हिन्दी)</DropdownMenuItem>
                <DropdownMenuItem>Marathi (मराठी)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button asChild variant="outline" className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10">
              <Link href="/dashboard" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Sign In
              </Link>
            </Button>
            
            <Button asChild className="rounded-full shadow-lg shadow-primary/20 bg-primary text-primary-foreground font-bold">
              <Link href="/apply">Apply Now</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/10 px-4 py-6 space-y-4 animate-in slide-in-from-top duration-300">
          <Link href="/subsidies" className="block text-lg font-medium text-white" onClick={() => setIsOpen(false)}>Support Programs</Link>
          <Link href="/eligibility" className="block text-lg font-medium text-white" onClick={() => setIsOpen(false)}>Eligibility Checker</Link>
          <Link href="/dashboard" className="block text-lg font-medium text-white" onClick={() => setIsOpen(false)}>Farmer Portal</Link>
          <div className="pt-4 flex flex-col gap-3 border-t border-white/10">
            <Button asChild className="w-full rounded-full" onClick={() => setIsOpen(false)}>
              <Link href="/apply">Apply Now</Link>
            </Button>
            <Button variant="outline" className="w-full rounded-full border-white/20 text-white" onClick={() => setIsOpen(false)}>
              Sign In
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
