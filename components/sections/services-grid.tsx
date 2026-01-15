"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Package, Truck, Wrench, LucideIcon } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

interface Service {
  title: string;
  description: string;
  icon: string;
}

const defaultServices: Service[] = [
  {
    title: "Aluguer de Material",
    description: "Uma vasta coleção de equipamentos de catering premium, desde porcelana fina e talheres de prata até mobiliário de design exclusivo.",
    icon: "Package",
  },
  {
    title: "Transporte Dedicado",
    description: "Serviço de transporte especializado com equipa profissional, garantindo que cada peça chega em perfeitas condições.",
    icon: "Truck",
  },
  {
    title: "Montagem Profissional",
    description: "Instalação meticulosa por especialistas que transformam o seu espaço numa experiência memorável e sofisticada.",
    icon: "Wrench",
  },
];

const iconMap: Record<string, LucideIcon> = {
  Package,
  Truck,
  Wrench,
};

export function ServicesGrid({ services = defaultServices }) {
  return (
    <section className="py-28 md:py-40 relative overflow-hidden bg-[#FAFAFA]">
      {/* Subtle grain texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.65%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%3E')]" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimateOnScroll animation="fade-up" className="text-center mb-24">
          {/* Premium gold divider */}
          <div className="flex items-center justify-center mb-10">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-accent/50" />
            <div className="mx-6 flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-accent/40" />
              <div className="h-1.5 w-1.5 rounded-full bg-accent" />
              <div className="h-1 w-1 rounded-full bg-accent/40" />
            </div>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-accent/50" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-foreground tracking-tight font-serif">
            Os Nossos <span className="text-primary">Serviços</span>
          </h2>
          <p className="text-xl md:text-2xl text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
            Excelência em cada detalhe do seu evento
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Package;
            return (
              <AnimateOnScroll key={index} animation="fade-up" delay={index * 200}>
                <Card className="group bg-white border-0 shadow-premium hover:shadow-premium-hover transition-all duration-700 hover:-translate-y-4 h-full relative overflow-hidden">
                  {/* Subtle top gold line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                  
                  <CardContent className="p-10 md:p-12">
                    {/* Icon with premium styling */}
                    <div className="mb-8 inline-flex p-6 bg-primary/5 rounded-2xl group-hover:bg-primary/10 transition-all duration-500 relative">
                      <Icon className="h-10 w-10 text-primary relative z-10" strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold mb-5 text-foreground group-hover:text-primary transition-colors duration-500 font-serif tracking-tight">
                      {service.title}
                    </h3>
                    
                    <p className="text-foreground/60 leading-relaxed text-lg font-light">
                      {service.description}
                    </p>

                    {/* Bottom gold accent on hover */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-24 h-0.5 bg-accent transition-all duration-500" />
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
