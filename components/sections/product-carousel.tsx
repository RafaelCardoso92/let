"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

interface Product {
  name: string;
  category: string;
  image?: string;
  imageHd?: string;
}

const defaultProducts: Product[] = [
  { name: "Prato Marcador Gold", category: "Pratos", image: "/images/products/prato-marcador-gold.jpg", imageHd: "/images/products-hd/prato-marcador-gold.jpg" },
  { name: "Prato Spirit", category: "Pratos", image: "/images/products/prato-spirit.jpg", imageHd: "/images/products-hd/prato-spirit.jpg" },
  { name: "Copos Bico", category: "Copos", image: "/images/products/copos-bicos.jpg", imageHd: "/images/products-hd/copos-bicos.jpg" },
  { name: "Mesa Rústica", category: "Mobiliário", image: "/images/products/mesa-rustica.png", imageHd: "/images/products-hd/mesa-rustica.png" },
  { name: "Cadeira Tiffany", category: "Mobiliário", image: "/images/products/cadeira-tiffany.jpg", imageHd: "/images/products-hd/cadeira-tiffany.jpg" },
  { name: "Cadeira Paris", category: "Mobiliário", image: "/images/products/cadeira-paris.jpg", imageHd: "/images/products-hd/cadeira-paris.jpg" },
  { name: "Sofá Branco", category: "Mobiliário", image: "/images/products/sofa-branco.jpg", imageHd: "/images/products-hd/sofa-branco.jpg" },
  { name: "Puff Branco", category: "Mobiliário", image: "/images/products/puff-branco.jpg", imageHd: "/images/products-hd/puff-branco.jpg" },
  { name: "Mesa Bistrô", category: "Mobiliário", image: "/images/products/mesa-bistro.jpg", imageHd: "/images/products-hd/mesa-bistro.jpg" },
  { name: "Prato Marcador Preto", category: "Pratos", image: "/images/products/prato-marcador-preto.jpg", imageHd: "/images/products-hd/prato-marcador-preto.jpg" },
];

export function ProductCarousel({ products = defaultProducts }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const itemsPerView = 3;

  const goToNext = () => {
    setCurrentIndex((prev) => prev + itemsPerView >= products.length ? 0 : prev + 1);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => prev === 0 ? Math.max(0, products.length - itemsPerView) : prev - 1);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(goToNext, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  return (
    <section className="py-28 md:py-40 bg-white relative overflow-hidden">
      {/* Subtle grain */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.65%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%3E')]" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimateOnScroll animation="fade-up" className="text-center mb-20">
          {/* Premium divider */}
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
            Os Nossos <span className="text-primary">Produtos</span>
          </h2>
          <p className="text-xl md:text-2xl text-foreground/50 max-w-2xl mx-auto font-light leading-relaxed">
            Qualidade excepcional em cada peça
          </p>
        </AnimateOnScroll>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: "translateX(-" + (currentIndex * (100 / itemsPerView)) + "%)" }}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {products.map((product, index) => (
                <div key={index} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4">
                  <Card className="group h-full bg-white border-0 shadow-premium hover:shadow-premium-hover transition-all duration-700 hover:-translate-y-4 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="aspect-square relative overflow-hidden">
                        {product.image && (
                          <>
                            <Image
                              src={product.imageHd || product.image}
                              alt={product.name}
                              fill
                              className="object-cover transition-transform duration-1000 group-hover:scale-110"
                              sizes="(max-width: 768px) 100vw, 33vw"
                              loading="lazy"
                            />
                            {/* Vignette */}
                            <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.1)] group-hover:shadow-[inset_0_0_80px_rgba(0,0,0,0.15)] transition-all duration-500" />
                            {/* Shine */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                          </>
                        )}
                      </div>
                      <div className="p-8">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-500 font-serif mb-3">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          <p className="text-sm text-foreground/50 font-medium tracking-widest uppercase">
                            {product.category}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-6 mt-12">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrev}
              className="rounded-full border border-foreground/10 hover:border-primary hover:bg-primary/5 transition-all duration-300 h-14 w-14"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="rounded-full border border-foreground/10 hover:border-primary hover:bg-primary/5 transition-all duration-300 h-14 w-14"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {Array.from({ length: Math.ceil(products.length / itemsPerView) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * itemsPerView)}
                className={"h-2 rounded-full transition-all duration-500 " +
                  (Math.floor(currentIndex / itemsPerView) === index
                    ? "bg-primary w-12"
                    : "bg-foreground/10 w-2 hover:bg-foreground/20")
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
