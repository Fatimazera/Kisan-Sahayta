
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BrainCircuit, Loader2, CheckCircle2, AlertCircle, FileText, ArrowRight } from "lucide-react";
import { aiPoweredEligibilityGuidance, type AIPoweredEligibilityGuidanceOutput } from "@/ai/flows/ai-powered-eligibility-guidance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Link from "next/link";

const formSchema = z.object({
  farmLocation: z.string().min(2, "Location is required"),
  farmSizeAcres: z.coerce.number().min(0.1, "Farm size must be at least 0.1 acres"),
  primaryCrops: z.string().optional(),
  annualIncomeINR: z.coerce.number().optional(),
  additionalDetails: z.string().optional(),
});

export default function EligibilityChecker() {
  const [result, setResult] = useState<AIPoweredEligibilityGuidanceOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      farmLocation: "",
      farmSizeAcres: 0,
      primaryCrops: "",
      annualIncomeINR: 0,
      additionalDetails: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const cropsArray = values.primaryCrops ? values.primaryCrops.split(',').map(s => s.trim()) : [];
      const data = await aiPoweredEligibilityGuidance({
        farmLocation: values.farmLocation,
        farmSizeAcres: values.farmSizeAcres,
        primaryCrops: cropsArray,
        annualIncomeINR: values.annualIncomeINR,
        additionalDetails: values.additionalDetails,
      });
      setResult(data);
    } catch (error) {
      console.error("Failed to check eligibility:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-medium">
          <BrainCircuit className="w-5 h-5" />
          Powered by AgriAI 3.0
        </div>
        <h1 className="text-4xl md:text-5xl font-bold">Eligibility AI Assistant</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Instantly find out which subsidies you qualify for and get a custom application guide.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <Card className="shadow-2xl border-primary/10">
            <CardHeader>
              <CardTitle>Your Farm Profile</CardTitle>
              <CardDescription>Enter details about your farming operation</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="farmLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Farm Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Nashik, Maharashtra, India" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="farmSizeAcres"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Size (Acres)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="5.0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="annualIncomeINR"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Annual Income (₹)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="150000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="primaryCrops"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Crops</FormLabel>
                        <FormControl>
                          <Input placeholder="Wheat, Rice, Corn (comma separated)" {...field} />
                        </FormControl>
                        <FormDescription>What do you primarily grow?</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="additionalDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Context</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Soil type, irrigation challenges, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full h-12 rounded-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing Data...
                      </>
                    ) : (
                      "Check Eligibility Now"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-7">
          {!result && !loading ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-3xl opacity-60">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                <BrainCircuit className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No Results Yet</h3>
              <p>Complete the form to see your personalized subsidy guidance.</p>
            </div>
          ) : loading ? (
            <div className="h-full space-y-8 p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-muted rounded w-1/3"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-24 bg-muted rounded-xl animate-pulse"></div>
                <div className="h-24 bg-muted rounded-xl animate-pulse"></div>
              </div>
              <div className="h-40 bg-muted rounded-xl animate-pulse"></div>
            </div>
          ) : result ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Eligibility Analysis</h2>
                <p className="text-muted-foreground">{result.eligibilitySummary}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-green-50 border-green-100 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-green-700 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Eligible Programs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {result.eligibleSubsidies.map((s, i) => (
                      <div key={i} className="text-sm font-bold text-green-900 bg-white/50 px-3 py-1.5 rounded-lg border border-green-200">
                        {s}
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card className="bg-orange-50 border-orange-100 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-orange-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" /> Ineligible / More Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {result.ineligibleSubsidies.map((s, i) => (
                      <div key={i} className="text-sm font-medium text-orange-900 bg-white/50 px-3 py-1.5 rounded-lg border border-orange-200">
                        {s}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" /> Required Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {result.requiredDocuments.map((doc, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm bg-muted/50 p-2 rounded-lg">
                        <CheckCircle2 className="w-3 h-3 text-primary" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="p-6 bg-accent text-accent-foreground rounded-2xl space-y-4">
                <h3 className="font-bold text-xl">Next Steps</h3>
                <p className="text-sm opacity-90 leading-relaxed">{result.nextSteps}</p>
                <Button className="w-full rounded-full group" asChild>
                  <Link href="/apply">
                    Start Application <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
