
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sprout, Droplets, FlaskConical, CheckCircle2, ArrowRight, BrainCircuit, ShieldCheck } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-farm');
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={heroImg?.imageUrl || ""} 
            alt={heroImg?.description || ""}
            fill
            className="object-cover brightness-[0.85]"
            priority
            data-ai-hint="green farm sunrise"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl space-y-6">
            <Badge className="bg-primary/20 text-primary border-primary/30 py-1.5 px-4 text-sm font-medium">
              Agricultural Revolution 2.0
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Smart Subsidies for <span className="text-primary italic">Better Yields</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              Access Fertilizer, Seed, and Irrigation subsidies with our AI-powered platform. Fast approval, transparent tracking, and regional language support.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="rounded-full text-lg px-8 h-14 shadow-xl shadow-primary/20" asChild>
                <Link href="/apply">Apply for Subsidy</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full text-lg px-8 h-14 bg-white/50 backdrop-blur-sm" asChild>
                <Link href="/eligibility">Check Eligibility</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Subsidy Categories */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Comprehensive Support Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the category that fits your farming needs. Each program is tailored to maximize your farm's productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Fertilizer Subsidy",
              description: "Direct discounts on NPK, Urea, and organic fertilizers based on soil health reports.",
              icon: FlaskConical,
              img: 'fertilizer-cat',
              color: "bg-blue-50 text-blue-600"
            },
            {
              title: "Seed Subsidy",
              description: "Access high-yield variety (HYV) and climate-resilient seeds at competitive prices.",
              icon: Sprout,
              img: 'seeds-cat',
              color: "bg-green-50 text-green-600"
            },
            {
              title: "Irrigation Subsidy",
              description: "Support for drip irrigation, sprinklers, and solar pump installations.",
              icon: Droplets,
              img: 'irrigation-cat',
              color: "bg-cyan-50 text-cyan-600"
            }
          ].map((cat, idx) => (
            <Card key={idx} className="group overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="relative h-48">
                <Image 
                  src={PlaceHolderImages.find(i => i.id === cat.img)?.imageUrl || ""} 
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              </div>
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center mb-4`}>
                  <cat.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl">{cat.title}</CardTitle>
                <CardDescription className="text-base line-clamp-2">{cat.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" className="p-0 text-primary font-bold group" asChild>
                  <Link href="/subsidies" className="flex items-center gap-2">
                    Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* AI Tool CTA */}
      <section className="py-24 bg-accent text-accent-foreground relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
          <BrainCircuit size={400} />
        </div>
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">Unsure about <span className="text-primary">eligibility?</span></h2>
            <p className="text-xl text-accent-foreground/80 leading-relaxed">
              Our AI-powered assistant analyzes your farm profile against dozens of government schemes to find your best matches in seconds.
            </p>
            <ul className="space-y-4">
              {[
                "Instant eligibility check",
                "Document requirements list",
                "Personalized improvement tips",
                "Step-by-step guidance"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary w-5 h-5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button size="lg" variant="secondary" className="rounded-full px-8 h-12 font-bold" asChild>
              <Link href="/eligibility">Try Eligibility AI</Link>
            </Button>
          </div>
          <div className="relative glass-morphism p-8 rounded-3xl border-primary/20">
            <div className="space-y-6">
              <div className="flex items-center gap-4 border-b border-primary/10 pb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <ShieldCheck className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold">Trust & Security</h4>
                  <p className="text-xs opacity-60">Verified Government Data Interface</p>
                </div>
              </div>
              <div className="space-y-4 text-sm">
                <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                  <p className="italic opacity-80">"The AI guide helped me find three subsidies I didn't even know existed for my orange grove."</p>
                  <p className="mt-2 font-bold text-primary">— Ramesh K., Farmer</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <div className="text-2xl font-bold text-primary">98%</div>
                    <div className="text-xs opacity-60">Accuracy Rate</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <div className="text-2xl font-bold text-primary">24h</div>
                    <div className="text-xs opacity-60">Avg. Response</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 container mx-auto px-4 border-t">
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
           <div className="flex items-center gap-2 font-bold text-2xl">MINISTRY <span className="text-primary">OF AGRI</span></div>
           <div className="flex items-center gap-2 font-bold text-2xl">DIGITAL <span className="text-primary">INDIA</span></div>
           <div className="flex items-center gap-2 font-bold text-2xl">FARMER <span className="text-primary">FIRST</span></div>
           <div className="flex items-center gap-2 font-bold text-2xl">RURAL <span className="text-primary">DEV</span></div>
        </div>
      </section>
    </div>
  );
}
