
"use client";

import { useParams, useSearchParams } from "next/navigation";
import { CheckCircle2, ShieldCheck, Calendar, User, FileText, MapPin, ArrowLeft, Printer, AlertTriangle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Suspense } from "react";
import { useLanguage } from "@/context/LanguageContext";

function VerificationContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const id = params.id as string;
  const isAuthentic = searchParams.get('auth') !== 'false';

  // Mock data for the verification result
  const subsidyData = {
    id: id || "SUB-99283-X",
    name: "PM-Kisan Fertilizer Subsidy",
    category: "Fertilizer & Soil Health",
    farmerName: isAuthentic ? "Ramesh Kumar" : "Record Not Found",
    district: isAuthentic ? "Nashik, Maharashtra" : "Unknown",
    issueDate: isAuthentic ? "Jan 15, 2024" : "N/A",
    expiryDate: isAuthentic ? "Dec 31, 2024" : "N/A",
    authenticityHash: isAuthentic ? "6f9a2b8e...c4d2" : "INVALID_HASH_000"
  };

  return (
    <div className="min-h-screen bg-muted/20 py-20 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> {t('verify.backHome')}
        </Link>

        <Card className="shadow-2xl border-none rounded-[2.5rem] overflow-hidden bg-white">
          <div className={`${isAuthentic ? 'bg-primary' : 'bg-destructive'} p-8 text-primary-foreground flex flex-col md:flex-row justify-between items-center gap-6 transition-colors`}>
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                {isAuthentic ? <ShieldCheck className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                <span className="text-xs font-black uppercase tracking-widest opacity-80">{t('verify.officialNote')}</span>
              </div>
              <h1 className="text-3xl font-bold">{t('verify.reportTitle')}</h1>
            </div>
            <Badge className={`${isAuthentic ? 'bg-white text-primary' : 'bg-white text-destructive'} rounded-full px-6 py-2 text-sm font-bold shadow-lg border-none`}>
              {isAuthentic ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <XCircle className="w-4 h-4 mr-2" />} 
              {isAuthentic ? t('verify.statusAuthentic') : t('verify.statusInvalid')}
            </Badge>
          </div>

          <CardContent className="p-12">
            {!isAuthentic && (
              <div className="mb-10 p-6 bg-destructive/10 border border-destructive/20 rounded-3xl flex items-start gap-4 text-destructive">
                <AlertTriangle className="w-6 h-6 shrink-0 mt-1" />
                <div className="space-y-1">
                  <p className="font-bold">{t('verify.securityAlert')}</p>
                  <p className="text-sm opacity-80">{t('verify.securityAlertDesc')}</p>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="space-y-2">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Subsidy Name</p>
                  <p className="text-xl font-bold">{subsidyData.name}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t('verify.category')}</p>
                  <p className="text-lg font-medium">{subsidyData.category}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t('verify.issueDate')}</p>
                    <div className="flex items-center gap-2 font-medium">
                      <Calendar className="w-4 h-4 text-primary" /> {subsidyData.issueDate}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t('verify.expiryDate')}</p>
                    <div className={`flex items-center gap-2 font-medium ${isAuthentic ? 'text-destructive' : 'text-muted-foreground'}`}>
                      <Calendar className="w-4 h-4" /> {subsidyData.expiryDate}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`space-y-8 p-8 ${isAuthentic ? 'bg-muted/30' : 'bg-destructive/5'} rounded-3xl border border-muted-foreground/10`}>
                <div className="space-y-2">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t('verify.beneficiaryDetails')}</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${isAuthentic ? 'bg-primary/20 text-primary' : 'bg-destructive/20 text-destructive'} flex items-center justify-center`}>
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold">{subsidyData.farmerName}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {subsidyData.district}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t('verify.verificationId')}</p>
                  <code className="text-xs block p-3 bg-white rounded-lg border border-dashed font-mono">
                    {subsidyData.id}
                  </code>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t('verify.securityHash')}</p>
                  <code className="text-[10px] block p-2 text-muted-foreground break-all font-mono">
                    {subsidyData.authenticityHash}
                  </code>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="px-12 pb-12 pt-0 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-xs text-muted-foreground italic">
              <ShieldCheck className={`w-4 h-4 ${isAuthentic ? 'text-primary' : 'text-destructive'}`} />
              {t('verify.officialNote')}
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="rounded-full" onClick={() => window.print()}>
                <Printer className="w-4 h-4 mr-2" /> {t('verify.printCert')}
              </Button>
              <Button className={`rounded-full px-8 ${isAuthentic ? 'bg-accent text-accent-foreground hover:bg-accent/90' : 'bg-destructive text-destructive-foreground hover:bg-destructive/90'}`}>
                {t('verify.reportDiscrepancy')}
              </Button>
            </div>
          </CardFooter>
        </Card>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 KISAN SAHAYATA Authenticity Portal. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VerificationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-muted/20 flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>}>
      <VerificationContent />
    </Suspense>
  );
}
