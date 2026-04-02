
"use client";

import { useState } from "react";
import { FileUp, ShieldCheck, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => setStep(s => Math.min(s + 1, totalSteps));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    toast({
      title: "Application Submitted Successfully",
      description: "Your application ID is APP-92837. You will receive email updates.",
    });
    router.push("/dashboard");
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-12 space-y-4 text-center">
        <h1 className="text-4xl font-bold">New Subsidy Application</h1>
        <p className="text-muted-foreground">Please provide accurate information to ensure fast processing.</p>
      </div>

      <div className="mb-8 space-y-2">
        <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
          <span>Step {step} of {totalSteps}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="shadow-2xl border-primary/10 overflow-hidden">
        <CardHeader className="bg-muted/30 pb-8">
          <CardTitle className="text-2xl">
            {step === 1 && "Personal Information"}
            {step === 2 && "Farm Details"}
            {step === 3 && "Subsidy Selection"}
            {step === 4 && "Document Verification"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Basic identity and contact details for verification."}
            {step === 2 && "Information about your land and location."}
            {step === 3 && "Select the categories you are applying for."}
            {step === 4 && "Upload supporting documents for your claim."}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-8 min-h-[400px]">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fname">First Name</Label>
                  <Input id="fname" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lname">Last Name</Label>
                  <Input id="lname" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="id">Kisan ID / National ID</Label>
                <Input id="id" placeholder="1234-5678-9012" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="space-y-2">
                <Label>District / Region</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your district" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="north">North Region</SelectItem>
                    <SelectItem value="south">South Region</SelectItem>
                    <SelectItem value="east">East Region</SelectItem>
                    <SelectItem value="west">West Region</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="land-size">Total Land Area (Acres)</Label>
                <Input id="land-size" type="number" placeholder="5.5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="survey">Survey / Plot Number</Label>
                <Input id="survey" placeholder="PLT-992/X" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'f', title: 'Fertilizer Subsidy', desc: 'NPK, Urea, Organic' },
                  { id: 's', title: 'Certified Seeds', desc: 'HYV Hybrid Cereals' },
                  { id: 'i', title: 'Irrigation Equipment', desc: 'Drip/Solar Pumps' }
                ].map(item => (
                  <div key={item.id} className="flex items-center p-4 border rounded-xl hover:bg-primary/5 transition-colors cursor-pointer border-2 has-[:checked]:border-primary">
                    <input type="checkbox" id={item.id} className="w-5 h-5 rounded border-primary text-primary" />
                    <label htmlFor={item.id} className="ml-4 flex-1 cursor-pointer">
                      <p className="font-bold">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="grid grid-cols-1 gap-6">
                {[
                  "Land Ownership Certificate",
                  "Identity Document (Copy)",
                  "Recent Electricity Bill (for Irrigation)",
                  "Farmer Association Certificate"
                ].map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-muted/50 border border-dashed rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg">
                        <FileUp className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <span className="text-sm font-medium">{doc}</span>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-full">Upload</Button>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-xl">
                <ShieldCheck className="w-6 h-6 text-green-600" />
                <p className="text-xs text-green-800">Your data is encrypted and processed via secure government channels.</p>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="bg-muted/30 flex justify-between py-6">
          <Button 
            variant="ghost" 
            onClick={handleBack} 
            disabled={step === 1 || loading}
            className="rounded-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          
          {step < totalSteps ? (
            <Button onClick={handleNext} className="rounded-full px-8">
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={loading} className="rounded-full px-12 bg-primary text-primary-foreground font-bold">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Finish Application"
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
