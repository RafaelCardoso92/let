"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

export function NewArrivalSpotlight() {
  return (
    <section className="relative py-24 md:py-36 bg-[#0A0A0A] overflow-hidden">
      {/* Grain texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.65%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%3E')]" />

      {/* Dramatic gold ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-accent/[0.06] rounded-full blur-[150px]" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/[0.04] rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/[0.04] rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* NOVIDADE badge */}
        <AnimateOnScroll animation="fade-up" className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-accent/10 border border-accent/30 rounded-full mb-10">
            <Sparkles className="h-5 w-5 text-accent animate-pulse" />
            <span className="text-accent text-sm font-semibold tracking-[0.25em] uppercase">
              Novidade 2026
            </span>
            <Sparkles className="h-5 w-5 text-accent animate-pulse" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight font-serif leading-[1.05]">
            Mesa <span className="text-accent">Serpentina</span>
          </h2>
        </AnimateOnScroll>

        {/* Main showcase */}
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Image — dramatic presentation */}
            <AnimateOnScroll animation="fade-up" delay={100}>
              <div className="relative">
                {/* Decorative gold ring behind image */}
                <div className="absolute -inset-4 bg-gradient-to-br from-accent/20 via-transparent to-accent/20 rounded-3xl blur-sm" />

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                  {/* Gold border */}
                  <div className="absolute -inset-[2px] bg-gradient-to-br from-accent/50 via-accent/20 to-accent/50 rounded-2xl" />

                  <div className="absolute inset-[2px] rounded-2xl overflow-hidden bg-[#0A0A0A]">
                    <Image
                      src="/images/products-hd/mesa-serpentina.jpg"
                      alt="Mesa Serpentina — Novidade Let'Rent 2026"
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                      quality={90}
                    />

                    {/* Vignette */}
                    <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.3)]" />

                    {/* Bottom gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* NOVIDADE badge on image */}
                    <div className="absolute top-6 left-6 px-5 py-2.5 bg-accent text-black rounded-full shadow-lg shadow-accent/30">
                      <span className="text-sm font-bold tracking-widest uppercase">
                        Novidade
                      </span>
                    </div>

                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                  </div>
                </div>

                {/* Decorative corners */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-accent/20 rounded-2xl hidden md:block" />
                <div className="absolute -top-6 -left-6 w-20 h-20 border border-accent/10 rounded-xl hidden md:block" />
              </div>
            </AnimateOnScroll>

            {/* Content */}
            <AnimateOnScroll animation="fade-up" delay={200}>
              <div className="text-center md:text-left">
                <span className="inline-block px-5 py-2 mb-8 text-xs font-medium tracking-[0.2em] text-accent/80 uppercase bg-accent/5 rounded-full border border-accent/20">
                  Novo Modelo
                </span>

                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 font-serif leading-[1.1] tracking-tight">
                  O design que será{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10">tendência</span>
                    <div className="absolute bottom-1 md:bottom-2 left-0 right-0 h-3 md:h-4 bg-accent/30 -rotate-1 rounded" />
                  </span>{" "}
                  este ano
                </h3>

                <p className="text-lg md:text-xl text-white/60 mb-8 leading-relaxed font-light max-w-xl mx-auto md:mx-0">
                  A nossa nova mesa em serpentina combina elegância e versatilidade, criando disposições únicas que transformam qualquer espaço. Uma peça singular que se adapta a diferentes configurações, ideal para eventos que exigem sofisticação e originalidade.
                </p>

                <ul className="space-y-4 mb-12 text-left max-w-md mx-auto md:mx-0">
                  {[
                    "Design sinuoso e elegante para disposições únicas",
                    "Perfeita para banquetes, casamentos e eventos corporativos",
                    "Combinável em múltiplas configurações",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/50">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                      <span className="text-base font-light">{item}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  size="lg"
                  asChild
                  className="group relative overflow-hidden bg-accent hover:bg-accent/90 text-black font-semibold text-sm sm:text-base md:text-lg px-8 sm:px-10 md:px-14 py-4 sm:py-6 md:py-8 rounded-full shadow-xl shadow-accent/20 hover:shadow-accent/40 hover:scale-[1.02] transition-all duration-300"
                >
                  <Link href="/contactos">
                    <span className="relative z-10 flex items-center gap-3 tracking-wide">
                      Peça já o seu orçamento
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </span>
                  </Link>
                </Button>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
    </section>
  );
}
