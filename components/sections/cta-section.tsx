import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        {/* Invitation card: green stock, inset gold rule */}
        <div className="relative max-w-4xl mx-auto bg-primary text-primary-foreground rounded-sm px-6 py-16 md:px-16 md:py-20 text-center">
          <div className="absolute inset-3 md:inset-4 border border-accent/60 rounded-sm pointer-events-none" />

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">
            Vamos preparar o seu evento?
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 font-light max-w-xl mx-auto mb-10">
            Diga-nos a data, o local e o que imagina. Respondemos com uma proposta à medida.
          </p>

          <div className="relative flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="rounded-full px-8 bg-card text-primary hover:bg-card/90 shadow-none font-medium">
              <Link href="/contactos">Pedir orçamento</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full px-8 border border-primary-foreground/50 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground hover:border-primary-foreground shadow-none font-medium">
              <a href="/catalogo-2026-2027.pdf" download>
                <Download className="h-4 w-4" />
                Catálogo 2026-2027
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
