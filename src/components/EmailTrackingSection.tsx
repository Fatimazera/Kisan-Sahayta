"use client";

import { useState } from "react";
import { Mail, Loader2, CheckCircle2, AlertCircle, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useFirestore } from "@/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { emailSubsidyReport } from "@/ai/flows/email-subsidy-report";
import { useLanguage } from "@/context/LanguageContext";

export function EmailTrackingSection() {
  const [email, setEmail] = useState("");
  const [farmerId, setFarmerId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ status: 'success' | 'fail' | 'error' } | null>(null);
  const db = useFirestore();
  const { language, t } = useLanguage();

  const handleSendEmail = async () => {
    if (!email || !farmerId) return;
    setLoading(true);
    setResult(null);

    try {
      // 1. Verify Farmer ID exists in Firestore
      const q = query(
        collection(db, "farmerProfiles"), 
        where("uniqueFarmerIdentifier", "==", farmerId),
        limit(1)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        setResult({ status: 'fail' });
        setLoading(false);
        return;
      }

      const farmerData = querySnapshot.docs[0].data();

      // 2. Trigger Genkit Flow to draft/send email
      await emailSubsidyReport({
        email,
        farmerId,
        language: language === 'en' ? 'English' : language, // Pass full name if needed
        farmerData,
      });

      setResult({ status: 'success' });
    } catch (error) {
      console.error("Email report failed:", error);
      setResult({ status: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl border-none rounded-[2.5rem] overflow-hidden bg-white">
            <div className="grid md:grid-cols-2">
              <div className="p-10 space-y-6 bg-accent text-accent-foreground">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">{t('email.title')}</h2>
                <p className="opacity-80 leading-relaxed">
                  {t('email.desc')}
                </p>
                <div className="pt-4 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-widest opacity-60">GDPR Compliant Delivery</span>
                </div>
              </div>

              <div className="p-10 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reportEmail">{t('email.emailLabel')}</Label>
                    <Input 
                      id="reportEmail" 
                      type="email"
                      placeholder="farmer@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-xl h-12 border-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reportFarmerId">{t('email.idLabel')}</Label>
                    <Input 
                      id="reportFarmerId" 
                      placeholder="KISAN-12345" 
                      value={farmerId}
                      onChange={(e) => setFarmerId(e.target.value)}
                      className="rounded-xl h-12 border-muted"
                    />
                  </div>
                  <Button 
                    onClick={handleSendEmail} 
                    disabled={loading || !email || !farmerId}
                    className="w-full h-12 rounded-full font-bold shadow-lg flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    {loading ? t('email.sending') : t('email.btn')}
                  </Button>
                </div>

                {result && (
                  <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                    {result.status === 'success' && (
                      <Alert className="bg-green-50 border-green-200 text-green-800 rounded-2xl">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <AlertTitle className="font-bold">{t('email.success')}</AlertTitle>
                        <AlertDescription className="text-sm">
                          {t('email.successDesc')}
                        </AlertDescription>
                      </Alert>
                    )}
                    {result.status === 'fail' && (
                      <Alert variant="destructive" className="rounded-2xl">
                        <AlertCircle className="h-5 w-5" />
                        <AlertTitle className="font-bold">{t('email.fail')}</AlertTitle>
                        <AlertDescription className="text-sm">
                          {t('email.failDesc')}
                        </AlertDescription>
                      </Alert>
                    )}
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
