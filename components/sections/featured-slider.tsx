"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import Image from "next/image";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

interface FeaturedProduct {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
}

const featuredProducts: FeaturedProduct[] = [
  {
    id: 1,
    name: "Serviço de Mesa Clássico",
    description: "Elegância atemporal para eventos sofisticados. Inclui pratos marcadores dourados, talheres de prata e cristalaria fina.",
    image: "/images/products-hd/prato-marcador-gold.jpg",
    category: "Mesa",
  },
  {
    id: 2,
    name: "Cadeiras de Design",
    description: "Cadeiras Tiffany e Paris que transformam qualquer espaço num ambiente de requinte incomparável.",
    image: "/images/products-hd/cadeira-tiffany.jpg",
    category: "Mobiliário",
  },
  {
    id: 3,
    name: "Cristalaria Premium",
    description: "Copos de cristal com design exclusivo que elevam a experiência gastronómica do seu evento.",
    image: "/images/products-hd/copos-bicos.jpg",
    category: "Cristalaria",
  },
  {
    id: 4,
    name: "Lounge Elegante",
    description: "Sofás e puffs de alta qualidade para criar áreas de descanso verdadeiramente sofisticadas.",
    image: "/images/products-hd/sofa-branco.jpg",
    category: "Lounge",
  },
  {
    id: 5,
    name: "Mesas Rústicas",
    description: "Mesas de madeira rústica que combinam charme tradicional com elegância contemporânea.",
    image: "/images/products-hd/mesa-rustica.png",
    category: "Mobiliário",
  },
];

export function FeaturedSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, goToNext]);

  const currentProduct = featuredProducts[currentIndex];

  return (
    <section className="py-28 md:py-40 bg-[#0A0A0A] relative overflow-hidden">
      {/* Grain texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.65%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%3E')]" />

      {/* Optimized gold ambient lighting - reduced blur for performance */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-accent/[0.08] rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/[0.05] rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimateOnScroll animation="fade-up" className="text-center mb-20">
          {/* Premium gold divider */}
          <div className="flex items-center justify-center mb-10">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-accent/40" />
            <div className="mx-6 flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-accent/30" />
              <div className="h-1.5 w-1.5 rounded-full bg-accent" />
              <div className="h-1 w-1 rounded-full bg-accent/30" />
            </div>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-accent/40" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white tracking-tight font-serif">
            Produtos em <span className="text-accent">Destaque</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
            Uma seleção curada de peças excepcionais
          </p>
        </AnimateOnScroll>

        {/* Premium Slider */}
        <div
          className="relative max-w-7xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Image */}
            <div className="relative order-2 md:order-1">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                {/* Elegant gold border frame */}
                <div className="absolute -inset-[1px] bg-gradient-to-br from-accent/40 via-accent/20 to-accent/40 rounded-2xl" />
                
                <div className="absolute inset-[1px] rounded-2xl overflow-hidden bg-black">
                  <Image
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  
                  {/* Vignette */}
                  <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.4)]" />
                  
                  {/* Bottom gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category badge */}
                  <div className="absolute top-6 left-6 px-5 py-2.5 bg-black/60 backdrop-blur-sm rounded-full border border-accent/30">
                    <span className="text-accent text-sm font-medium tracking-widest uppercase">
                      {currentProduct.category}
                    </span>
                  </div>

                  {/* Shine effect - GPU accelerated */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                </div>
              </div>

              {/* Decorative corners */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-accent/20 rounded-2xl hidden md:block" />
              <div className="absolute -top-6 -left-6 w-20 h-20 border border-accent/10 rounded-xl hidden md:block" />
            </div>

            {/* Content */}
            <div className="order-1 md:order-2 text-center md:text-left">
              <div key={currentProduct.id} className="animate-fade-in">
                <span className="inline-block px-5 py-2 mb-8 text-xs font-medium tracking-[0.2em] text-accent/80 uppercase bg-accent/5 rounded-full border border-accent/20">
                  {String(currentIndex + 1).padStart(2, "0")} — {String(featuredProducts.length).padStart(2, "0")}
                </span>

                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 font-serif leading-[1.1] tracking-tight">
                  {currentProduct.name}
                </h3>

                <p className="text-xl md:text-2xl text-white/50 mb-12 leading-relaxed font-light max-w-xl mx-auto md:mx-0">
                  {currentProduct.description}
                </p>

                {/* Navigation dots */}
                <div className="flex items-center gap-4 justify-center md:justify-start mb-10">
                  {featuredProducts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={"relative h-2 rounded-full transition-all duration-300 " + 
                        (index === currentIndex
                          ? "w-16 bg-accent"
                          : "w-2 bg-white/20 hover:bg-white/40")
                      }
                    />
                  ))}
                </div>

                {/* Navigation arrows */}
                <div className="flex items-center gap-4 justify-center md:justify-start">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToPrev}
                    className="rounded-full border border-accent/30 bg-transparent hover:bg-accent/10 hover:border-accent text-white/70 hover:text-accent transition-colors duration-200 h-14 w-14"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToNext}
                    className="rounded-full border border-accent/30 bg-transparent hover:bg-accent/10 hover:border-accent text-white/70 hover:text-accent transition-colors duration-200 h-14 w-14"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Download button */}
        <AnimateOnScroll animation="fade-up" delay={200} className="mt-24 text-center">
          <div className="inline-flex flex-col items-center">
            <p className="text-white/40 mb-6 text-sm tracking-[0.15em] uppercase font-light">
              Catálogo Completo
            </p>
            <Button
              size="lg"
              asChild
              className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-white font-medium text-sm sm:text-base md:text-lg px-6 sm:px-10 md:px-14 py-4 sm:py-6 md:py-8 rounded-full shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300"
            >
              <a href="/catalogo-2025-2026.pdf" download>
                <span className="relative z-10 flex items-center gap-4 tracking-wide">
                  <Download className="h-5 w-5" />
                  Descarregar Catálogo 2025-2026
                </span>
              </a>
            </Button>
            <p className="text-white/30 mt-4 text-xs tracking-wide">
              PDF • Lista completa com preços
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
