
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ClipboardList, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Upload, 
  Bell, 
  User, 
  FileText,
  TrendingUp,
  MapPin
} from "lucide-react";

export default function FarmerDashboard() {
  const applications = [
    {
      id: "APP-4921",
      category: "Fertilizer Subsidy",
      date: "Oct 12, 2023",
      status: "Approved",
      statusColor: "text-green-600 bg-green-50 border-green-200"
    },
    {
      id: "APP-5832",
      category: "Seed Subsidy",
      date: "Nov 05, 2023",
      status: "In Review",
      statusColor: "text-blue-600 bg-blue-50 border-blue-200"
    },
    {
      id: "APP-6120",
      category: "Irrigation Support",
      date: "Feb 10, 2024",
      status: "Action Required",
      statusColor: "text-orange-600 bg-orange-50 border-orange-200"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, Farmer Ramesh</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Nashik Regional District • ID: F-102938
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
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <ClipboardList className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Total Applications</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl text-green-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Approved</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Pending</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-xl text-accent">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Subsidy Savings</p>
                <p className="text-2xl font-bold">$1,420</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Track the live status of your requests</CardDescription>
            </div>
            <Button variant="ghost" className="text-primary">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-bold">{app.category}</p>
                      <p className="text-xs text-muted-foreground">{app.id} • {app.date}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={`px-3 py-1 rounded-full ${app.statusColor}`}>
                    {app.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="shadow-sm">
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

import Link from "next/link";
import { BrainCircuit, Sprout } from "lucide-react";
