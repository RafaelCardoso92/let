"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import Image from "next/image";

interface FeaturedProduct {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
}

const featuredProducts: FeaturedProduct[] = [
  {
    id: 0,
    name: "Mesa Rústica",
    description: "Mesas de madeira rústica que combinam charme tradicional com elegância contemporânea.",
    image: "/images/products-hd/mesa-rustica-2026.webp",
    category: "Mobiliário",
  },
  {
    id: 1,
    name: "Cadeira Tiffany Decapé",
    description: "Em madeira clara, traz elegância e um estilo atemporal para qualquer evento.",
    image: "/images/products-hd/cadeira-tiffany-decape-2026.webp",
    category: "Mobiliário",
  },
  {
    id: 2,
    name: "Cadeira Ferro Preta",
    description: "Linhas elegantes em ferro preto, um clássico que se adapta a qualquer ambiente.",
    image: "/images/products-hd/cadeira-ferro-preta.webp",
    category: "Mobiliário",
  },
  {
    id: 3,
    name: "Sofá Veludo Azul",
    description: "Veludo azul suave e madeira trabalhada, para zonas lounge cheias de charme.",
    image: "/images/products-hd/sofa-veludo-azul.webp",
    category: "Lounge",
  },
  {
    id: 4,
    name: "Sofá Bamboo",
    description: "Natural e descontraído, perfeito para eventos ao ar livre e ambientes boho.",
    image: "/images/products-hd/sofa-bamboo.webp",
    category: "Lounge",
  },
  {
    id: 5,
    name: "Sofá Veludo Bege",
    description: "Um toque clássico e acolhedor que dá conforto e sofisticação a qualquer espaço.",
    image: "/images/products-hd/sofa-veludo-bege.webp",
    category: "Lounge",
  },
  {
    id: 6,
    name: "Copo Vinho Dourado",
    description: "Cristal fino com aro dourado, para brindar com requinte.",
    image: "/images/products-hd/copo-vinho-dourado.webp",
    category: "Cristalaria",
  },
  {
    id: 7,
    name: "Prato Sublima Dourado",
    description: "Porcelana branca com aro dourado que eleva qualquer mesa.",
    image: "/images/products-hd/prato-sublima-dourado.webp",
    category: "Mesa",
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
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">Produtos em destaque</h2>
          <p className="text-lg text-muted-foreground font-light">Uma seleção de peças do nosso catálogo</p>
        </div>

        <div
          className="grid md:grid-cols-2 gap-12 md:gap-20 items-center"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          onFocus={() => setIsAutoPlaying(false)}
          aria-roledescription="carrossel"
        >
          {/* Product in an arched window; images are cut-outs on white */}
          <div className="relative mx-auto w-full max-w-md aspect-[6/7] arch frame overflow-hidden bg-white">
            <Image
              key={currentProduct.id}
              src={currentProduct.image}
              alt={currentProduct.name}
              fill
              className="object-contain px-4 pt-14 pb-4 animate-fade-in"
              sizes="(max-width: 768px) 90vw, 40vw"
            />
          </div>

          <div key={currentProduct.id} className="animate-fade-in text-center md:text-left" aria-live="polite">
            <p className="font-serif italic text-xl text-accent-ink mb-3">{currentProduct.category}</p>

            <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">{currentProduct.name}</h3>

            <p className="text-lg md:text-xl text-muted-foreground font-light mb-10 max-w-md mx-auto md:mx-0">
              {currentProduct.description}
            </p>

            <div className="flex items-center gap-6 justify-center md:justify-start">
              <div className="flex gap-3">
                <Button variant="outline" size="icon" onClick={goToPrev} aria-label="Produto anterior" className="rounded-full h-12 w-12 border border-border bg-transparent hover:bg-card hover:border-accent hover:text-foreground shadow-none active:scale-100">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" onClick={goToNext} aria-label="Produto seguinte" className="rounded-full h-12 w-12 border border-border bg-transparent hover:bg-card hover:border-accent hover:text-foreground shadow-none active:scale-100">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              <span className="text-sm text-muted-foreground tabular-nums">
                {currentIndex + 1} de {featuredProducts.length}
              </span>
              <div className="hidden sm:flex items-center gap-2">
                {featuredProducts.map((product, index) => (
                  <button
                    key={product.id}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Ver ${product.name}`}
                    aria-current={index === currentIndex}
                    className={"h-1.5 rounded-full transition-all duration-300 " +
                      (index === currentIndex ? "w-8 bg-accent" : "w-1.5 bg-foreground/20 hover:bg-foreground/40")}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-12 border-t border-border flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
          <p className="font-serif text-2xl md:text-3xl">Todas as peças no catálogo 2026-2027</p>
          <Button variant="outline" size="lg" asChild className="rounded-full px-8 border border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground hover:border-primary shadow-none active:scale-100 font-medium">
            <a href="/catalogo-2026-2027.pdf" download>
              <Download className="h-4 w-4" />
              Descarregar catálogo (PDF)
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
