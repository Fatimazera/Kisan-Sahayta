
"use client";

import { useParams } from "next/navigation";
import { CheckCircle2, ShieldCheck, Calendar, User, FileText, MapPin, ArrowLeft, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function VerificationPage() {
  const params = useParams();
  const id = params.id as string;

  // Mock data for the verification result
  const subsidyData = {
    id: id || "SUB-99283-X",
    status: "Verified Authentic",
    name: "PM-Kisan Fertilizer Subsidy",
    category: "Fertilizer & Soil Health",
    farmerName: "Ramesh Kumar",
    district: "Nashik, Maharashtra",
    issueDate: "Jan 15, 2024",
    expiryDate: "Dec 31, 2024",
    authenticityHash: "6f9a2b8e...c4d2"
  };

  return (
    <div className="min-h-screen bg-muted/20 py-20 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <Card className="shadow-2xl border-none rounded-[2.5rem] overflow-hidden bg-white">
          <div className="bg-primary p-8 text-primary-foreground flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <ShieldCheck className="w-6 h-6" />
                <span className="text-xs font-black uppercase tracking-widest opacity-80">KISAN SAHAYATA Official Verification</span>
              </div>
              <h1 className="text-3xl font-bold">Subsidy Authenticity Report</h1>
            </div>
            <Badge className="bg-white text-primary rounded-full px-6 py-2 text-sm font-bold shadow-lg">
              <CheckCircle2 className="w-4 h-4 mr-2" /> {subsidyData.status}
            </Badge>
          </div>

          <CardContent className="p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="space-y-2">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Subsidy Name</p>
                  <p className="text-xl font-bold">{subsidyData.name}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Category</p>
                  <p className="text-lg font-medium">{subsidyData.category}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Issue Date</p>
                    <div className="flex items-center gap-2 font-medium">
                      <Calendar className="w-4 h-4 text-primary" /> {subsidyData.issueDate}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Expiry Date</p>
                    <div className="flex items-center gap-2 font-medium text-destructive">
                      <Calendar className="w-4 h-4" /> {subsidyData.expiryDate}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8 p-8 bg-muted/30 rounded-3xl border border-muted-foreground/10">
                <div className="space-y-2">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Beneficiary Details</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
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
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Verification ID</p>
                  <code className="text-xs block p-3 bg-white rounded-lg border border-dashed font-mono">
                    {subsidyData.id}
                  </code>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Security Hash</p>
                  <code className="text-[10px] block p-2 text-muted-foreground break-all font-mono">
                    {subsidyData.authenticityHash}
                  </code>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="px-12 pb-12 pt-0 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-xs text-muted-foreground italic">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Verified via Government Distributed Ledger (GDL)
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="rounded-full" onClick={() => window.print()}>
                <Printer className="w-4 h-4 mr-2" /> Print Certificate
              </Button>
              <Button className="rounded-full px-8 bg-accent text-accent-foreground hover:bg-accent/90">
                Report Discrepancy
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
