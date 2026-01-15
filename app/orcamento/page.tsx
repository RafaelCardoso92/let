import { Suspense } from "react";
import { Hero } from "@/components/sections/hero";
import { QuoteForm } from "@/components/booking/QuoteForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pedir Orçamento | Let'Rent",
  description: "Peça um orçamento personalizado para o aluguer de material para o seu evento. Selecione os produtos, indique a data e local, e receba uma proposta detalhada.",
  alternates: {
    canonical: "https://let.rafaelcardoso.co.uk/orcamento",
  },
};

function QuoteFormLoader() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="animate-pulse text-gold-400">A carregar formulário...</div>
    </div>
  );
}

export default function OrcamentoPage() {
  return (
    <>
      <Hero
        title="Pedir Orçamento"
        subtitle="Selecione os produtos para o seu evento e receba uma proposta personalizada da nossa equipa."
        backgroundImage="/images/hero/hero-2.jpg"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Suspense fallback={<QuoteFormLoader />}>
            <QuoteForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
