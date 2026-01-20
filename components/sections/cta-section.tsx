"use client";

import { Button } from "@/components/ui/button";
import { Download, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useConfetti } from "@/lib/use-confetti";

export function CTASection() {
  const { fireConfetti } = useConfetti();

  return (
    <section className="py-32 md:py-44 bg-primary relative overflow-hidden">
      {/* Grain texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.65%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%3E')]" />

      {/* Ambient lighting */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] animate-float-slow" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] animate-float-slow" style={{ animationDelay: '3s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Gold decorative element */}
          <div className="flex items-center justify-center mb-12 animate-slide-up">
            <div className="h-px w-20 bg-accent/40" />
            <div className="mx-6 flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-accent/30" />
              <div className="h-1.5 w-1.5 rounded-full bg-accent" />
              <div className="h-1 w-1 rounded-full bg-accent/30" />
            </div>
            <div className="h-px w-20 bg-accent/40" />
          </div>

          <h2 
            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-10 leading-[1.1] tracking-tight font-serif animate-slide-up"
            style={{ animationDelay: '100ms' }}
          >
            Pronto para criar{" "}
            <span className="relative inline-block">
              <span className="relative z-10">momentos únicos</span>
              <div className="absolute bottom-2 md:bottom-3 left-0 right-0 h-3 md:h-4 bg-accent/30 -rotate-1 rounded" />
            </span>
            ?
          </h2>

          <p 
            className="text-xl md:text-2xl mb-14 text-white/80 leading-relaxed animate-slide-up font-light max-w-2xl mx-auto"
            style={{ animationDelay: '200ms' }}
          >
            Entre em contacto connosco para transformar o seu evento numa experiência verdadeiramente memorável.
          </p>

          <div 
            className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up"
            style={{ animationDelay: '300ms' }}
          >
            {/* Primary CTA */}
            <Button
              size="lg"
              asChild
              className="group relative overflow-hidden bg-white text-primary hover:bg-white/95 font-semibold text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-12 py-4 sm:py-6 md:py-8 rounded-full shadow-2xl hover:shadow-white/30 hover:scale-105 transition-all duration-500"
              onClick={fireConfetti}
            >
              <Link href="/contactos" onClick={fireConfetti}>
                <span className="relative z-10 tracking-wide">Contacte-nos</span>
                <ArrowRight className="ml-3 h-5 w-5 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </Button>
            
            {/* Secondary CTA */}
            <Button
              size="lg"
              variant="outline"
              asChild
              className="group relative overflow-hidden border-2 border-accent/50 bg-accent/10 text-white hover:bg-accent hover:text-black hover:border-accent transition-all duration-500 px-6 sm:px-8 md:px-12 py-4 sm:py-6 md:py-8 rounded-full text-sm sm:text-base md:text-lg font-semibold backdrop-blur-sm hover:scale-105"
            >
              <a href="/catalogo-2025-2026.pdf" download>
                <Download className="mr-3 h-5 w-5 relative z-10 group-hover:animate-bounce" />
                <span className="relative z-10 tracking-wide">Catálogo</span>
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
}
