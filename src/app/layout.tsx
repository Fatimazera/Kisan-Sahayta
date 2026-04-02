
import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/context/LanguageContext';
import { FirebaseClientProvider } from '@/firebase';

export const metadata: Metadata = {
  title: 'KISAN SAHAYATA | Empowering Farmers',
  description: 'Empowering farmers with intelligent guidance and streamlined agricultural support.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:ital,wght@0,700;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <FirebaseClientProvider>
          <LanguageProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <Toaster />
          </LanguageProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
