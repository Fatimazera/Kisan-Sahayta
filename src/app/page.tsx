import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sprout, Droplets, FlaskConical, CheckCircle2, ArrowRight, BrainCircuit, ShieldCheck } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { AnimatedBackground } from "@/components/AnimatedBackground";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[92vh] min-h-[750px] flex items-center overflow-hidden">
        {/* Cinematic Animated Background Sequence */}
        <div className="absolute inset-0 z-0">
          <AnimatedBackground />
          
          {/* Layered Overlays for Optimal Text Readability & Depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 z-10" />
          <div className="absolute inset-0 bg-black/30 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-10" />
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl space-y-10">
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <Badge className="bg-primary/20 text-primary border-primary/40 py-2.5 px-8 text-sm font-bold backdrop-blur-3xl rounded-full mb-10 shadow-[0_0_40px_rgba(162,217,150,0.2)]">
                AGRICULTURAL TECHNOLOGY 3.0
              </Badge>
              <h1 className="text-6xl md:text-9xl font-bold leading-[0.95] text-white tracking-tighter">
                Smart Subsidies <br />
                <span className="text-primary italic">Better Yields</span>
              </h1>
            </div>

            <p className="text-xl md:text-3xl text-white/80 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
              Access Fertilizer, Seed, and Irrigation subsidies with our AI-powered platform. Fast approval, transparent tracking, and comprehensive regional support.
            </p>

            <div className="flex flex-wrap gap-6 pt-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
              <Button size="lg" className="rounded-full text-xl px-14 h-20 shadow-2xl shadow-primary/40 font-bold transition-all hover:scale-105 active:scale-95 text-primary-foreground bg-primary" asChild>
                <Link href="/apply">Apply for Subsidy</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full text-xl px-14 h-20 bg-white/5 backdrop-blur-3xl border-white/20 text-white hover:bg-white/15 transition-all hover:scale-105 active:scale-95" asChild>
                <Link href="/eligibility">Check Eligibility</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Visualizer */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden md:block opacity-60">
          <div className="w-1 h-20 bg-gradient-to-b from-primary/0 via-primary to-primary/0 rounded-full shadow-[0_0_20px_rgba(162,217,150,0.8)]" />
        </div>
      </section>

      {/* Subsidy Categories */}
      <section className="py-32 container mx-auto px-4 bg-background">
        <div className="text-center space-y-6 mb-24 max-w-3xl mx-auto">
          <Badge variant="outline" className="rounded-full px-5 py-1.5 text-primary border-primary font-bold tracking-widest uppercase text-[10px]">National Programs</Badge>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Comprehensive Support</h2>
          <p className="text-muted-foreground text-xl leading-relaxed">
            Choose the category that fits your farming needs. Each program is tailored to maximize your farm's productivity and long-term sustainability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
            <Card key={idx} className="group overflow-hidden border-none shadow-2xl hover:shadow-primary/5 transition-all duration-500 rounded-[3rem] bg-muted/20">
              <div className="relative h-72 overflow-hidden">
                <Image 
                  src={PlaceHolderImages.find(i => i.id === cat.img)?.imageUrl || ""} 
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                  <Badge className="bg-white/20 backdrop-blur-md text-white border-white/20">Active Program</Badge>
                </div>
              </div>
              <CardHeader className="pt-10 px-10">
                <div className={`w-16 h-16 rounded-2xl ${cat.color} flex items-center justify-center mb-8 shadow-md transform group-hover:rotate-6 transition-transform`}>
                  <cat.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-3xl font-bold tracking-tight">{cat.title}</CardTitle>
                <CardDescription className="text-lg leading-relaxed mt-2">{cat.description}</CardDescription>
              </CardHeader>
              <CardContent className="px-10 pb-10">
                <Button variant="link" className="p-0 text-primary font-bold group h-auto text-lg" asChild>
                  <Link href="/subsidies" className="flex items-center gap-3">
                    Learn More <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* AI Tool CTA */}
      <section className="py-32 bg-accent text-accent-foreground relative overflow-hidden">
        <div className="absolute right-[-15%] top-[-15%] opacity-5 pointer-events-none rotate-12">
          <BrainCircuit size={800} className="text-primary" />
        </div>
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-24 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-6 py-2.5 rounded-full font-bold text-sm tracking-widest uppercase">
              <BrainCircuit className="w-6 h-6" />
              Agri-Intelligence Activated
            </div>
            <h2 className="text-6xl md:text-7xl font-bold leading-[1.1] tracking-tighter">Unsure about <br /><span className="text-primary italic">eligibility?</span></h2>
            <p className="text-2xl text-accent-foreground/80 leading-relaxed max-w-xl">
              Our AI-powered assistant analyzes your farm profile against dozens of current government schemes to find your best matches in seconds.
            </p>
            <ul className="space-y-6">
              {[
                "Instant eligibility check with 98.4% accuracy",
                "Personalized document requirements list",
                "Actionable improvement tips for applications",
                "Step-by-step guidance in 12 regional languages"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-5 text-xl">
                  <div className="bg-primary/20 p-1.5 rounded-full">
                    <CheckCircle2 className="text-primary w-6 h-6" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button size="lg" variant="secondary" className="rounded-full px-12 h-18 font-bold text-xl hover:scale-105 transition-transform shadow-xl shadow-black/20" asChild>
              <Link href="/eligibility">Try Eligibility AI</Link>
            </Button>
          </div>
          <div className="relative glass-morphism p-12 rounded-[4rem] border-primary/20 shadow-[0_0_80px_rgba(162,217,150,0.1)]">
            <div className="space-y-10">
              <div className="flex items-center gap-6 border-b border-primary/10 pb-8">
                <div className="w-16 h-16 rounded-3xl bg-primary/20 flex items-center justify-center">
                  <ShieldCheck className="text-primary w-10 h-10" />
                </div>
                <div>
                  <h4 className="font-bold text-3xl text-foreground tracking-tight">Verified & Secure</h4>
                  <p className="text-sm text-muted-foreground uppercase font-bold tracking-widest opacity-60">Gov-API Secure Interface</p>
                </div>
              </div>
              <div className="space-y-8">
                <div className="p-8 bg-primary/5 rounded-[3rem] border border-primary/10 relative overflow-hidden group">
                  <div className="absolute left-0 top-0 w-1.5 h-full bg-primary" />
                  <p className="italic text-xl text-foreground/90 leading-relaxed">"The AI guide helped me find three subsidies I didn't even know existed for my orange grove. It's a game changer for rural farmers."</p>
                  <p className="mt-6 font-bold text-primary text-2xl">— Ramesh K., Nashik District</p>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="p-8 rounded-[3rem] bg-white/5 border border-white/10 text-center transition-all hover:bg-white/10 hover:border-primary/30">
                    <div className="text-4xl font-bold text-primary mb-2">98.4%</div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Precision Rate</div>
                  </div>
                  <div className="p-8 rounded-[3rem] bg-white/5 border border-white/10 text-center transition-all hover:bg-white/10 hover:border-primary/30">
                    <div className="text-4xl font-bold text-primary mb-2">&lt; 24h</div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Avg. Approval</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-24 container mx-auto px-4 border-t border-muted bg-muted/5">
        <div className="flex flex-wrap justify-center items-center gap-16 md:gap-40 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
           <div className="flex items-center gap-4 font-bold text-4xl tracking-tighter">MINISTRY <span className="text-primary italic">OF AGRI</span></div>
           <div className="flex items-center gap-4 font-bold text-4xl tracking-tighter">DIGITAL <span className="text-primary italic">INDIA</span></div>
           <div className="flex items-center gap-4 font-bold text-4xl tracking-tighter">FARMER <span className="text-primary italic">FIRST</span></div>
           <div className="flex items-center gap-4 font-bold text-4xl tracking-tighter">RURAL <span className="text-primary italic">DEV</span></div>
        </div>
      </section>
    </div>
  );
}
