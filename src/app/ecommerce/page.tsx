
"use client";

import { useLanguage } from "@/context/LanguageContext";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShieldCheck, ShoppingCart, TrendingDown } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function EcommercePage() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const products = [
    {
      id: 1,
      category: t('ecommerce.categories.fertilizers'),
      name: "Organic NPK 10-10-10 (50kg)",
      price: "₹3,450",
      rating: 4.8,
      img: "prod-npk",
      discount: "10% OFF"
    },
    {
      id: 2,
      category: t('ecommerce.categories.fertilizers'),
      name: "Premium Soluble Urea (25kg)",
      price: "₹2,250",
      rating: 4.6,
      img: "fertilizer-cat",
      discount: "5% OFF"
    },
    {
      id: 3,
      category: t('ecommerce.categories.seeds'),
      name: "HYV Wheat Seeds (Certified 10kg)",
      price: "₹1,800",
      rating: 4.9,
      img: "prod-seeds",
      discount: "New"
    },
    {
      id: 4,
      category: t('ecommerce.categories.seeds'),
      name: "Hybrid Basmati Rice Seeds (10kg)",
      price: "₹4,500",
      rating: 4.7,
      img: "seeds-cat",
      discount: "Best Seller"
    },
    {
      id: 5,
      category: t('ecommerce.categories.irrigation'),
      name: "Solar Powered Water Pump (3HP)",
      price: "₹65,000",
      rating: 4.5,
      img: "prod-pump",
      discount: "Subsidy Eligible"
    },
    {
      id: 6,
      category: t('ecommerce.categories.irrigation'),
      name: "Precision Drip Kit (1 Acre)",
      price: "₹8,500",
      rating: 4.4,
      img: "irrigation-cat",
      discount: "90% Grant"
    }
  ];

  const handleBuy = (productName: string) => {
    toast({
      title: "Order Initiated",
      description: `${productName} has been added to your secure procurement list.`,
    });
  };

  return (
    <div className="min-h-screen bg-muted/20 pb-20">
      {/* Header */}
      <section className="bg-black text-white pt-40 pb-24 text-center">
        <div className="container mx-auto px-4 space-y-6">
          <Badge className="bg-primary text-primary-foreground font-bold tracking-widest uppercase text-[10px] rounded-full px-6 py-1">
            {t('ecommerce.verified')}
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            {t('ecommerce.title')}
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            {t('ecommerce.subtitle')}
          </p>
        </div>
      </section>

      {/* Marketplace */}
      <div className="container mx-auto px-4 -mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group border-none shadow-xl overflow-hidden rounded-[2.5rem] bg-white hover:scale-[1.02] transition-transform duration-500">
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src={PlaceHolderImages.find(i => i.id === product.img)?.imageUrl || ""} 
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  data-ai-hint={PlaceHolderImages.find(i => i.id === product.img)?.imageHint}
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-black/80 backdrop-blur-md text-white border-none rounded-full px-3 py-1 text-[10px] font-bold">
                    {product.category}
                  </Badge>
                  <Badge variant="secondary" className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-[10px] font-bold">
                    {product.discount}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pt-8">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-bold">{product.name}</CardTitle>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn("w-3 h-3", i < Math.floor(product.rating) ? "text-primary fill-primary" : "text-muted")} 
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1 font-bold">{product.rating}</span>
                    </div>
                  </div>
                  <p className="text-2xl font-black text-primary">{product.price}</p>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded-xl border border-dashed">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>100% Quality Guaranteed by Ministry of Agriculture</span>
                </div>
              </CardContent>

              <CardFooter className="pb-8">
                <Button 
                  onClick={() => handleBuy(product.name)}
                  className="w-full h-14 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/20 group"
                >
                  <ShoppingCart className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                  {t('ecommerce.buyNow')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Info Banner */}
        <div className="mt-20 p-12 bg-accent text-accent-foreground rounded-[3rem] shadow-2xl relative overflow-hidden">
          <TrendingDown className="absolute right-10 top-1/2 -translate-y-1/2 w-64 h-64 opacity-5 rotate-12" />
          <div className="max-w-2xl space-y-6">
            <h3 className="text-3xl font-bold">Why Buy from the Official Portal?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <h4 className="font-bold text-primary flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" /> Direct Subsidies
                </h4>
                <p className="text-sm opacity-70">Prices are automatically adjusted based on your farmer profile and eligible national schemes in INR.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-primary flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" /> Lab Tested
                </h4>
                <p className="text-sm opacity-70">Every batch of packaged seeds and fertilizers is tested at regional labs for maximum efficacy and soil safety.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
