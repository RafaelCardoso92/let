import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface HeroProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  backgroundImage?: string;
}

export function Hero({ title, subtitle, ctaText, ctaHref, backgroundImage }: HeroProps) {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background Image - CSS-only parallax */}
      {backgroundImage && (
        <>
          <div className="absolute inset-0 z-0">
            <Image
              src={backgroundImage}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority
              quality={85}
            />
          </div>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-[1]" />
        </>
      )}

      {/* Simple gold ambient glow - reduced blur */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl z-[1]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl z-[1]" />

      <div className="container mx-auto px-4 relative z-10 py-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Gold decorative divider */}
          <div className="flex items-center justify-center mb-12 animate-fade-in">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-accent/60" />
            <div className="mx-6 flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-accent/40" />
              <div className="h-1.5 w-1.5 rounded-full bg-accent" />
              <div className="h-1 w-1 rounded-full bg-accent/40" />
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-accent/60" />
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-10 leading-[1.05] tracking-tight animate-fade-in-up">
            <span className="text-white font-serif">
              {title}
            </span>
          </h1>

          {subtitle && (
            <p className="text-xl sm:text-2xl md:text-3xl text-white/85 mb-14 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-100 font-light tracking-wide">
              {subtitle}
            </p>
          )}

          {ctaText && ctaHref && (
            <div className="animate-fade-in-up animation-delay-200">
              <Button
                size="lg"
                asChild
                className="group bg-primary hover:bg-primary/90 text-white font-semibold text-lg px-12 py-8 rounded-full shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-300"
              >
                <Link href={ctaHref}>
                  <span className="tracking-wide">{ctaText}</span>
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
          )}

          {/* Bottom decoration */}
          <div className="flex items-center justify-center mt-16 animate-fade-in animation-delay-300">
            <div className="h-px w-32 bg-gradient-to-r from-transparent to-accent/30" />
            <div className="h-0.5 w-0.5 mx-4 rounded-full bg-accent/50" />
            <div className="h-px w-32 bg-gradient-to-l from-transparent to-accent/30" />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
