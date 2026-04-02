
"use client";

import { useUser, useFirestore, useDoc, useCollection, useMemoFirebase } from "@/firebase";
import { doc, collection } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ClipboardList, 
  Clock, 
  CheckCircle2, 
  Upload, 
  Bell, 
  FileText,
  TrendingUp,
  MapPin,
  BrainCircuit,
  Sprout,
  Loader2
} from "lucide-react";
import Link from "next/link";

export default function FarmerDashboard() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  // Memoize document reference for the farmer profile
  const profileRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, "users", user.uid, "farmerProfile", "main");
  }, [firestore, user]);

  // Memoize collection reference for applications
  const appsRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, "users", user.uid, "applications");
  }, [firestore, user]);

  const { data: profile, isLoading: isProfileLoading } = useDoc(profileRef);
  const { data: applications, isLoading: isAppsLoading } = useCollection(appsRef);

  if (isUserLoading || isProfileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h2 className="text-3xl font-bold mb-4">Access Denied</h2>
        <p className="text-muted-foreground mb-8">Please sign in to view your dashboard.</p>
        <Button asChild className="rounded-full px-8">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  const farmerName = profile ? `${profile.firstName} ${profile.lastName}` : "Farmer";
  const kisanId = profile?.uniqueFarmerIdentifier || "N/A";

  const stats = [
    {
      label: "Total Applications",
      value: applications?.length || 0,
      icon: ClipboardList,
      color: "bg-primary/10 text-primary"
    },
    {
      label: "Approved",
      value: applications?.filter(a => a.status === 'Approved').length || 0,
      icon: CheckCircle2,
      color: "bg-green-100 text-green-600"
    },
    {
      label: "Pending",
      value: applications?.filter(a => ['Draft', 'Pending Review', 'In Review'].includes(a.status)).length || 0,
      icon: Clock,
      color: "bg-blue-100 text-blue-600"
    },
    {
      label: "Subsidy Savings",
      value: "$1,420",
      icon: TrendingUp,
      color: "bg-accent/10 text-accent"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {farmerName}</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4" /> {profile?.city || 'Regional District'} • Kisan ID: {kisanId}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full">
            <Bell className="w-4 h-4 mr-2" /> Notifications
          </Button>
          <Button className="rounded-full">
            <Upload className="w-4 h-4 mr-2" /> Upload Documents
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <Card key={i} className="shadow-sm border-none bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 shadow-sm border-none bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Track the live status of your requests</CardDescription>
            </div>
            <Button variant="ghost" className="text-primary">View All</Button>
          </CardHeader>
          <CardContent>
            {isAppsLoading ? (
              <div className="flex justify-center p-8">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : applications && applications.length > 0 ? (
              <div className="space-y-4">
                {applications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-bold">{app.category || 'Subsidy Application'}</p>
                        <p className="text-xs text-muted-foreground">{app.id} • {new Date(app.applicationDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="px-3 py-1 rounded-full capitalize">
                      {app.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed rounded-3xl opacity-50">
                <ClipboardList className="w-12 h-12 mx-auto mb-4" />
                <p className="font-medium">No applications found</p>
                <p className="text-sm">Start your first subsidy application today.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="shadow-sm border-none bg-white">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Button variant="outline" className="justify-start h-12 w-full rounded-xl" asChild>
                <Link href="/apply">
                  <Sprout className="w-4 h-4 mr-3 text-primary" /> New Application
                </Link>
              </Button>
              <Button variant="outline" className="justify-start h-12 w-full rounded-xl" asChild>
                <Link href="/eligibility">
                  <BrainCircuit className="w-4 h-4 mr-3 text-primary" /> Check Eligibility AI
                </Link>
              </Button>
              <Button variant="outline" className="justify-start h-12 w-full rounded-xl">
                <TrendingUp className="w-4 h-4 mr-3 text-primary" /> Yield Analysis
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg">Need Assistance?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">Speak with a local agricultural officer in your regional language.</p>
              <Button className="w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
                Contact District Officer
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
