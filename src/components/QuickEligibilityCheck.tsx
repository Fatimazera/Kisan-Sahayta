
"use client";

import { useState } from "react";
import { Search, Loader2, CheckCircle2, XCircle, Info, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useFirestore } from "@/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { useLanguage } from "@/context/LanguageContext";

export function QuickEligibilityCheck() {
  const [farmerId, setFarmerId] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ status: 'found' | 'not-found' | 'error', data?: any } | null>(null);
  const db = useFirestore();
  const { t } = useLanguage();

  const handleCheck = async () => {
    if (!farmerId || !phone) return;
    setLoading(true);
    setResult(null);

    try {
      // Query the farmerProfiles collection for a match
      const q = query(
        collection(db, "farmerProfiles"), 
        where("uniqueFarmerIdentifier", "==", farmerId),
        where("phoneNumber", "==", phone),
        limit(1)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        setResult({ status: 'found', data: querySnapshot.docs[0].data() });
      } else {
        setResult({ status: 'not-found' });
      }
    } catch (error) {
      console.error("Eligibility check failed:", error);
      setResult({ status: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl border-none rounded-[2.5rem] overflow-hidden bg-white">
            <div className="grid md:grid-cols-2">
              <div className="p-10 space-y-6 bg-primary text-primary-foreground">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">{t('eligibility.title')}</h2>
                <p className="opacity-80 leading-relaxed">
                  {t('eligibility.desc')}
                </p>
                <div className="pt-4 flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-full">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest">Encrypted Lookup</span>
                </div>
              </div>

              <div className="p-10 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="farmerId">{t('eligibility.idLabel')}</Label>
                    <Input 
                      id="farmerId" 
                      placeholder="e.g. KISAN-12345" 
                      value={farmerId}
                      onChange={(e) => setFarmerId(e.target.value)}
                      className="rounded-xl h-12 border-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t('eligibility.phoneLabel')}</Label>
                    <Input 
                      id="phone" 
                      type="tel"
                      placeholder="+91 XXXXX XXXXX" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="rounded-xl h-12 border-muted"
                    />
                  </div>
                  <Button 
                    onClick={handleCheck} 
                    disabled={loading || !farmerId || !phone}
                    className="w-full h-12 rounded-full font-bold shadow-lg"
                  >
                    {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Search className="w-4 h-4 mr-2" />}
                    {loading ? t('eligibility.checking') : t('eligibility.btn')}
                  </Button>
                </div>

                {result && (
                  <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                    {result.status === 'found' && (
                      <Alert className="bg-green-50 border-green-200 text-green-800 rounded-2xl">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <AlertTitle className="font-bold">{t('eligibility.success')}</AlertTitle>
                        <AlertDescription className="text-sm">
                          {t('eligibility.successDesc')}
                        </AlertDescription>
                      </Alert>
                    )}
                    {result.status === 'not-found' && (
                      <Alert variant="destructive" className="rounded-2xl">
                        <XCircle className="h-5 w-5" />
                        <AlertTitle className="font-bold">{t('eligibility.fail')}</AlertTitle>
                        <AlertDescription className="text-sm">
                          {t('eligibility.failDesc')}
                        </AlertDescription>
                      </Alert>
                    )}
                    {result.status === 'error' && (
                      <Alert className="bg-orange-50 border-orange-200 text-orange-800 rounded-2xl">
                        <Info className="h-5 w-5 text-orange-600" />
                        <AlertTitle className="font-bold">{t('eligibility.error')}</AlertTitle>
                        <AlertDescription className="text-sm">
                          {t('eligibility.errorDesc')}
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
