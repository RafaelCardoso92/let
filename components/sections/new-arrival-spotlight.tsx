import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function NewArrivalSpotlight() {
  return (
    <section className="py-24 md:py-32 bg-card border-y border-border">
      <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="relative aspect-[4/3] frame rounded-sm overflow-hidden bg-muted">
          <Image
            src="/images/products-hd/mesa-serpentina.webp"
            alt="Mesa Serpentina, novidade Let'Rent 2026"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div>
          <p className="font-serif italic text-2xl text-accent-ink mb-3">Novidade 2026</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">Mesa Serpentina</h2>
          <p className="text-lg text-muted-foreground font-light mb-8 max-w-prose">
            A nossa nova mesa em serpentina combina elegância e versatilidade, criando disposições únicas que transformam qualquer espaço. Uma peça singular que se adapta a diferentes configurações, ideal para eventos que exigem sofisticação e originalidade.
          </p>

          <ul className="space-y-3 mb-10">
            {[
              "Design sinuoso e elegante para disposições únicas",
              "Perfeita para banquetes, casamentos e eventos corporativos",
              "Combinável em múltiplas configurações",
            ].map((item) => (
              <li key={item} className="flex items-baseline gap-4 text-foreground/80 font-light">
                <span className="h-px w-5 shrink-0 bg-accent translate-y-[-0.3em]" />
                {item}
              </li>
            ))}
          </ul>

          <Button size="lg" asChild className="rounded-full px-8 font-medium">
            <Link href="/contactos">Pedir orçamento</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
