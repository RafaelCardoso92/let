import { Hero } from "@/components/sections/hero";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Truck, Wrench, CheckCircle } from "lucide-react";
import { CTASection } from "@/components/sections/cta-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serviços de Aluguer para Eventos",
  description:
    "Aluguer premium de material para eventos em Portugal. Serviço completo de transporte e montagem profissional. Equipamentos de catering, mobiliário de luxo e cristalaria fina.",
  keywords: [
    "aluguer material eventos",
    "transporte eventos portugal",
    "montagem eventos profissional",
    "catering eventos",
    "serviços eventos completos",
  ],
  alternates: {
    canonical: "https://let.rafaelcardoso.co.uk/servicos",
  },
  openGraph: {
    title: "Serviços de Aluguer para Eventos | Let'Rent",
    description:
      "Aluguer premium, transporte dedicado e montagem profissional. Soluções completas para eventos em Portugal.",
    url: "https://let.rafaelcardoso.co.uk/servicos",
    images: [
      {
        url: "/images/hero/hero-1.jpg",
        width: 1200,
        height: 630,
        alt: "Serviços Let'Rent - Aluguer para Eventos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Serviços de Aluguer para Eventos | Let'Rent",
    description: "Aluguer premium, transporte e montagem profissional para eventos.",
    images: ["/images/hero/hero-1.jpg"],
  },
};

const services = [
  {
    icon: Package,
    title: "Aluguer de Material",
    description:
      "Uma coleção premium de equipamentos de catering, desde porcelana fina e talheres de prata até mobiliário de design exclusivo.",
    features: [
      "Pratos e talheres de alta qualidade",
      "Copos de cristal e taças premium",
      "Mobiliário elegante para eventos",
      "Atoalhados e decoração de mesa",
      "Utensílios de cozinha profissionais",
      "Equipamento completo para buffet",
    ],
  },
  {
    icon: Truck,
    title: "Transporte Dedicado",
    description:
      "Serviço de transporte especializado com equipa profissional, garantindo que cada peça chega em perfeitas condições.",
    features: [
      "Entrega e recolha no local do evento",
      "Transporte seguro e pontual",
      "Equipa profissional e cuidadosa",
      "Cobertura em todo Portugal",
      "Flexibilidade total de horários",
      "Seguro de transporte incluído",
    ],
  },
  {
    icon: Wrench,
    title: "Montagem Profissional",
    description:
      "Instalação meticulosa por especialistas que transformam o seu espaço numa experiência memorável e sofisticada.",
    features: [
      "Montagem profissional completa",
      "Configuração personalizada",
      "Verificação rigorosa de qualidade",
      "Desmontagem após o evento",
      "Equipa altamente experiente",
      "Atenção obsessiva aos detalhes",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Hero
        title="Os Nossos Serviços"
        subtitle="Soluções completas para tornar o seu evento perfeito. Da escolha do material à montagem final, estamos consigo em cada passo."
        ctaText="Solicitar Orçamento"
        ctaHref="/contactos"
        backgroundImage="/images/hero/hero-1.jpg"
      />

      <section className="py-28 md:py-40">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <div className="flex items-center justify-center mb-8">
              <div className="h-px w-16 bg-accent/50" />
              <div className="mx-4 h-1.5 w-1.5 rounded-full bg-accent" />
              <div className="h-px w-16 bg-accent/50" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
              Excelência em cada detalhe
            </h2>
            <p className="text-xl text-muted-foreground font-light">
              Desde o primeiro contacto até ao final do seu evento, oferecemos um
              serviço completo e personalizado para garantir que tudo corre na
              perfeição.
            </p>
          </div>

          <div className="space-y-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="overflow-hidden border-0 shadow-premium hover:shadow-premium-hover transition-all duration-500"
                >
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div
                        className={`p-10 md:p-14 ${
                          index % 2 === 0
                            ? "bg-primary/5"
                            : "bg-accent/5"
                        } flex flex-col justify-center`}
                      >
                        <div className="mb-8 inline-flex p-5 bg-white rounded-2xl shadow-lg w-fit">
                          <Icon className="h-10 w-10 text-primary" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-5 font-serif">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground text-lg font-light leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      <div className="p-10 md:p-14 bg-white flex flex-col justify-center">
                        <h4 className="font-semibold text-lg mb-8 text-primary">
                          O que está incluído:
                        </h4>
                        <ul className="space-y-5">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-4">
                              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
