
import Image from "next/image";
import Link from "next/link";
import { FlaskConical, Sprout, Droplets, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";

export default function SubsidiesPage() {
  const subsidies = [
    {
      id: "fertilizer",
      title: "Fertilizer Subsidy Scheme",
      icon: FlaskConical,
      img: 'fertilizer-cat',
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Direct assistance to farmers to offset the high cost of essential chemical and organic fertilizers. This ensures soil nutrition and crop health.",
      benefits: [
        "Up to 50% discount on NPK and Urea",
        "Support for organic compost purchases",
        "Free soil health testing at regional labs",
        "Home delivery for large cooperative orders"
      ],
      criteria: [
        "Registered farmer ID (Kisan Card)",
        "Minimum land holding of 0.5 acres",
        "Proof of current crop cultivation",
        "No major outstanding loans with govt. banks"
      ]
    },
    {
      id: "seeds",
      title: "Quality Seed Program",
      icon: Sprout,
      img: 'seeds-cat',
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Providing certified, high-yield variety (HYV) and climate-resilient seeds to increase productivity per acre and ensure food security.",
      benefits: [
        "Provision of hybrid seeds for major cereals",
        "80% subsidy for climate-resilient pulses",
        "Replacement support for crop failure",
        "Workshops on seed storage and treatment"
      ],
      criteria: [
        "Active membership in local Farmer Group",
        "Aadhar or National ID linked to land records",
        "Verification of seed usage in previous seasons",
        "Priority for women-led farming households"
      ]
    },
    {
      id: "irrigation",
      title: "Pradhan Irrigation Initiative",
      icon: Droplets,
      img: 'irrigation-cat',
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      description: "Transforming traditional irrigation with modern water-saving technologies like drip and sprinklers to maximize 'More Crop Per Drop'.",
      benefits: [
        "90% subsidy for small/marginal farmers on drip systems",
        "Solar pump installation grants (up to 70%)",
        "Community pond construction support",
        "Free maintenance for the first 3 years"
      ],
      criteria: [
        "Reliable water source (borewell/canal)",
        "Topographical map of the farm area",
        "Electricity connection for pump sets (if solar not used)",
        "Commitment to sustainable water management"
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-20 space-y-24">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold">Government Subsidy <span className="text-primary">Programs</span></h1>
        <p className="text-muted-foreground text-lg">
          Explore detailed information about our three primary pillars of agricultural support. Each program is designed to lower your input costs and increase your profits.
        </p>
      </div>

      <div className="space-y-32">
        {subsidies.map((sub, idx) => (
          <div key={sub.id} id={sub.id} className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-16 items-center`}>
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <div className={`w-16 h-16 rounded-2xl ${sub.bgColor} flex items-center justify-center`}>
                  <sub.icon className={`w-8 h-8 ${sub.color}`} />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">{sub.title}</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {sub.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" /> Key Benefits
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {sub.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold flex items-center gap-2">
                    <Badge variant="outline" className="rounded-full">Eligibility</Badge> Requirements
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {sub.criteria.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-1.5 shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <Button size="lg" className="rounded-full px-8" asChild>
                  <Link href="/apply">Apply for this Subsidy</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
                  <Link href="/eligibility">Check Detailed Eligibility</Link>
                </Button>
              </div>
            </div>

            <div className="flex-1 relative w-full aspect-square md:aspect-auto md:h-[500px] group">
              <div className="absolute -inset-4 bg-primary/5 rounded-[40px] rotate-3 -z-10 transition-transform group-hover:rotate-1" />
              <div className="absolute inset-0 bg-primary/10 rounded-[30px] -rotate-3 -z-10 transition-transform group-hover:rotate-0" />
              <Image 
                src={PlaceHolderImages.find(i => i.id === sub.img)?.imageUrl || ""} 
                alt={sub.title}
                fill
                className="object-cover rounded-[30px] shadow-2xl"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
