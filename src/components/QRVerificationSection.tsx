
"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCode, ShieldCheck, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function QRVerificationSection() {
  const [showQR, setShowQR] = useState(false);
  const [verifyUrl, setVerifyUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleGenerate = () => {
    setLoading(true);
    // Randomly determine authenticity for demonstration
    const isAuthentic = Math.random() > 0.5;
    
    setTimeout(() => {
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
      setVerifyUrl(`${baseUrl}/verify/SUB-${Math.floor(Math.random() * 90000) + 10000}-X?auth=${isAuthentic}`);
      setShowQR(true);
      setLoading(false);
    }, 800);
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden border-none shadow-2xl rounded-[2.5rem] bg-white">
            <div className="grid md:grid-cols-2">
              <div className="p-12 space-y-6">
                <Badge variant="outline" className="rounded-full px-4 py-1 text-primary border-primary uppercase font-bold text-[10px] tracking-widest">
                  Trust & Security
                </Badge>
                <h2 className="text-4xl font-bold tracking-tight">{t('qr.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('qr.description')}
                </p>
                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-primary mt-1" />
                    <p className="text-sm">Tamper-proof digital certificate</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-primary mt-1" />
                    <p className="text-sm">Real-time status updates from government records</p>
                  </div>
                </div>
                {!showQR ? (
                  <Button 
                    onClick={handleGenerate} 
                    disabled={loading}
                    className="rounded-full px-8 h-12 font-bold group"
                  >
                    {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <QrCode className="w-4 h-4 mr-2" />}
                    {t('qr.btn')}
                  </Button>
                ) : (
                  <Button variant="outline" onClick={() => setShowQR(false)} className="rounded-full">
                    {t('qr.reset')}
                  </Button>
                )}
              </div>

              <div className="bg-primary/5 flex flex-col items-center justify-center p-12 border-l border-primary/10">
                {showQR ? (
                  <div className="animate-in zoom-in duration-500 flex flex-col items-center space-y-6">
                    <div className="p-6 bg-white rounded-3xl shadow-xl border-4 border-primary/20">
                      <QRCodeSVG 
                        value={verifyUrl} 
                        size={200}
                        level="H"
                        includeMargin={false}
                        imageSettings={{
                          src: "https://uyjvjmfdungodykkmrph.supabase.co/storage/v1/object/public/tree-animation/frame_000_delay-0.041s.webp",
                          x: undefined,
                          y: undefined,
                          height: 40,
                          width: 40,
                          excavate: true,
                        }}
                      />
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-xs font-bold text-primary uppercase tracking-widest">{t('qr.scan')}</p>
                      <Link href={verifyUrl} className="text-sm font-medium hover:underline flex items-center gap-1 justify-center">
                        {t('qr.open')} <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4 opacity-40">
                    <div className="w-24 h-24 border-2 border-dashed border-primary rounded-3xl mx-auto flex items-center justify-center">
                      <QrCode className="w-10 h-10" />
                    </div>
                    <p className="text-sm font-medium">Click to generate secure code</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
