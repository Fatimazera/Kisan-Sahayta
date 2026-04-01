
import Link from "next/link";
import { Sprout, Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted mt-20 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Sprout className="w-6 h-6 text-primary" />
              <span className="font-headline text-xl font-bold tracking-tight uppercase">KISAN SAHAYATA</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Modernizing agricultural support through technology. Empowering farmers with transparent, efficient, and accessible management of resources.
            </p>
            <div className="flex gap-4">
              <Facebook className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-primary" />
              <Twitter className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-primary" />
              <Instagram className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-primary" />
            </div>
          </div>
          
          <div>
            <h4 className="font-headline font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/subsidies" className="hover:text-primary transition-colors">Programs</Link></li>
              <li><Link href="/eligibility" className="hover:text-primary transition-colors">Eligibility AI</Link></li>
              <li><Link href="/apply" className="hover:text-primary transition-colors">Online Application</Link></li>
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">Farmer Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Government Portal</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Regional Guides</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-semibold mb-4">Contact Support</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                support@kisansahayata.gov
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                1-800-KISAN-HELP
              </li>
              <li className="pt-4">
                <p className="text-xs text-muted-foreground">
                  Available in 12 regional languages. Toll-free assistance for registered farmers.
                </p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2024 KISAN SAHAYATA. A Government Tech Initiative.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:underline">Privacy Policy</Link>
            <Link href="#" className="hover:underline">Terms of Service</Link>
            <Link href="#" className="hover:underline">Accessibility Statement</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
