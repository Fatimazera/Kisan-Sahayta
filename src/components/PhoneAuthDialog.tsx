
"use client";

import { useState, useEffect } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import { useAuth, useFirestore } from "@/firebase";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Phone, ShieldCheck, User as UserIcon, Fingerprint } from "lucide-react";

export function PhoneAuthDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [kisanId, setKisanId] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<'info' | 'otp'>('info');
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  
  const auth = useAuth();
  const db = useFirestore();
  const { t } = useLanguage();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (open && typeof window !== "undefined" && !window.recaptchaVerifier && auth) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });
    }
  }, [open, auth]);

  const handleSendCode = async () => {
    if (!phone || !firstName || !lastName || !kisanId || !auth) {
      toast({ variant: "destructive", title: "Missing Information", description: "Please fill all fields." });
      return;
    }
    setLoading(true);
    try {
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      setStep('otp');
      toast({ title: t('auth.success'), description: "Code sent to your phone." });
    } catch (error: any) {
      console.error(error);
      toast({ variant: "destructive", title: t('auth.error'), description: error.message });
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        delete window.recaptchaVerifier;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!otp || !confirmationResult) return;
    setLoading(true);
    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      // Create/Update profile in Firestore
      const profileRef = doc(db, "users", user.uid, "farmerProfile", "main");
      await setDoc(profileRef, {
        id: user.uid,
        firstName,
        lastName,
        uniqueFarmerIdentifier: kisanId,
        phoneNumber: phone,
        isRegistered: true,
        registrationDate: new Date().toISOString(),
        updatedAt: serverTimestamp(),
      }, { merge: true });

      // Create global lookup profile
      const globalRef = doc(db, "farmerProfiles", user.uid);
      await setDoc(globalRef, {
        id: user.uid,
        firstName,
        lastName,
        uniqueFarmerIdentifier: kisanId,
        phoneNumber: phone,
        isRegistered: true,
        registrationDate: new Date().toISOString(),
      }, { merge: true });

      setOpen(false);
      toast({ title: t('auth.success') });
      router.push("/dashboard");
    } catch (error: any) {
      console.error(error);
      toast({ variant: "destructive", title: t('auth.error'), description: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-[2rem]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <ShieldCheck className="text-primary w-6 h-6" /> {t('auth.title')}
          </DialogTitle>
          <DialogDescription>
            {step === 'info' ? "Enter your agricultural identity details." : t('auth.description')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {step === 'info' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fname">First Name</Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      id="fname"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="pl-10 rounded-xl"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lname">Last Name</Label>
                  <Input 
                    id="lname"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="kisan-id">Kisan ID / Farmer ID</Label>
                <div className="relative">
                  <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="kisan-id"
                    placeholder="KISAN-123456"
                    value={kisanId}
                    onChange={(e) => setKisanId(e.target.value)}
                    className="pl-10 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone-input">{t('auth.phoneLabel')}</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="phone-input"
                    placeholder={t('auth.placeholder')}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10 rounded-xl"
                  />
                </div>
              </div>

              <Button 
                onClick={handleSendCode} 
                className="w-full rounded-xl h-12 font-bold" 
                disabled={loading || !phone || !firstName || !kisanId}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {loading ? t('auth.sending') : t('auth.sendCode')}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp-input">{t('auth.otpLabel')}</Label>
                <Input 
                  id="otp-input"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="rounded-xl tracking-[0.5em] text-center text-xl font-bold h-12"
                  maxLength={6}
                />
              </div>
              <Button 
                onClick={handleVerifyCode} 
                className="w-full rounded-xl h-12 font-bold" 
                disabled={loading || !otp}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {loading ? t('auth.verifying') : t('auth.verifyCode')}
              </Button>
              <Button variant="ghost" className="w-full text-xs" onClick={() => setStep('info')}>
                Change details
              </Button>
            </div>
          )}
        </div>
        <div id="recaptcha-container"></div>
      </DialogContent>
    </Dialog>
  );
}

declare global {
  interface window {
    recaptchaVerifier: any;
  }
}
