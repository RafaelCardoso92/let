import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

interface HeroProps {
  title: ReactNode;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  backgroundImage?: string;
  backgroundAlt?: string;
}

export function Hero({ title, subtitle, ctaText, ctaHref, backgroundImage, backgroundAlt }: HeroProps) {
  const text = (
    <>
      <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl mb-6 text-balance animate-fade-in-up">
        {title}
      </h1>

      {subtitle && (
        <p className="text-lg md:text-xl text-muted-foreground font-light max-w-xl mb-10 animate-fade-in-up animation-delay-100">
          {subtitle}
        </p>
      )}

      {ctaText && ctaHref && (
        <div className="animate-fade-in-up animation-delay-200">
          <Button size="lg" asChild className="rounded-full px-8 font-medium">
            <Link href={ctaHref}>{ctaText}</Link>
          </Button>
        </div>
      )}
    </>
  );

  if (!backgroundImage) {
    return (
      <section className="pt-36 md:pt-44 pb-12 md:pb-16">
        <div className="container mx-auto px-4 max-w-3xl text-center [&_p]:mx-auto">{text}</div>
      </section>
    );
  }

  return (
    <section className="pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 grid md:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-20 items-center">
        <div>{text}</div>

        <div className="relative mx-auto w-full max-w-sm md:max-w-md animate-fade-in">
          <div className="relative aspect-[4/5] arch frame overflow-hidden bg-muted">
            <Image
              src={backgroundImage}
              alt={backgroundAlt || ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 40vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
