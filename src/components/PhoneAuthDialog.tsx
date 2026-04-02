
"use client";

import { useState } from "react";
import { signInAnonymously } from "firebase/auth";
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
import { Loader2, ShieldCheck, User as UserIcon, Fingerprint } from "lucide-react";

export function PhoneAuthDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [kisanId, setKisanId] = useState("");
  const [loading, setLoading] = useState(false);
  
  const auth = useAuth();
  const db = useFirestore();
  const { t } = useLanguage();
  const { toast } = useToast();
  const router = useRouter();

  const handleSignIn = async () => {
    if (!firstName || !lastName || !kisanId || !auth) {
      toast({ variant: "destructive", title: "Missing Information", description: "Please fill all fields." });
      return;
    }
    setLoading(true);
    try {
      const result = await signInAnonymously(auth);
      const user = result.user;

      // Create/Update profile in Firestore
      const profileRef = doc(db, "users", user.uid, "farmerProfile", "main");
      await setDoc(profileRef, {
        id: user.uid,
        firstName,
        lastName,
        uniqueFarmerIdentifier: kisanId,
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
            Enter your agricultural identity details to access your portal.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
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

            <Button 
              onClick={handleSignIn} 
              className="w-full rounded-xl h-12 font-bold mt-4" 
              disabled={loading || !firstName || !lastName || !kisanId}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {loading ? "Authenticating..." : t('nav.signIn')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
