"use client";

import Image from "next/image";
import { Package, Truck, Wrench, LucideIcon } from "lucide-react";

interface Service {
  title: string;
  description: string;
  icon: string;
  image?: string;
}

const defaultServices: Service[] = [
  {
    title: "Aluguer de Material",
    description: "Uma vasta coleção de equipamentos de catering premium, desde porcelana fina e talheres de prata até mobiliário de design exclusivo.",
    icon: "Package",
    image: "/images/services/aluguer-material.webp",
  },
  {
    title: "Transporte Dedicado",
    description: "Serviço de transporte especializado com equipa profissional, garantindo que cada peça chega em perfeitas condições.",
    icon: "Truck",
    image: "/images/services/transporte.webp",
  },
  {
    title: "Montagem Profissional",
    description: "Instalação meticulosa por especialistas que transformam o seu espaço numa experiência memorável e sofisticada.",
    icon: "Wrench",
    image: "/images/services/montagem.webp",
  },
];

const iconMap: Record<string, LucideIcon> = {
  Package,
  Truck,
  Wrench,
};

export function ServicesGrid({ services = defaultServices }) {
  return (
    <section className="py-24 md:py-32 bg-card border-y border-border">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">Os nossos serviços</h2>
          <p className="text-lg text-muted-foreground font-light">Da escolha das peças à montagem final</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Package;
            return (
              <div key={service.title} className="group relative overflow-hidden rounded-sm border border-border bg-background md:min-h-[22rem]">
                {/* Photo revealed on hover */}
                {service.image && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Image src={service.image} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/20" />
                  </div>
                )}

                <div className="relative h-full p-8 md:p-10 flex flex-col">
                  <Icon className="h-8 w-8 text-primary group-hover:text-white transition-colors duration-500" strokeWidth={1.25} />
                  <h3 className="font-serif text-3xl mt-14 mb-4 group-hover:text-white transition-colors duration-500">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground font-light group-hover:text-white/90 transition-colors duration-500">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
