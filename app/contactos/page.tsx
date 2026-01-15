import { Hero } from "@/components/sections/hero";
import { ContactForm } from "@/components/sections/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Facebook, Instagram } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://let.rafaelcardoso.co.uk/contactos",
  },
  keywords: [
    "contacto let rent",
    "orçamento eventos portugal",
    "aluguer material eventos contacto",
  ],
  title: "Contactos",
  description:
    "Entre em contacto com a Let'Rent. Estamos disponíveis para responder às suas questões e ajudar a planear o seu evento.",
  openGraph: {
    title: "Contactos | Let'Rent",
    description: "Entre em contacto connosco. Estamos disponíveis para responder às suas questões e ajudar a planear o seu evento.",
    images: ["/images/hero/hero-2.jpg"],
  },
};

export default function ContactPage() {
  return (
    <>
      <Hero
        title="Contacte-nos"
        subtitle="Tem alguma questão ou pretende solicitar um orçamento? Estamos aqui para ajudar a tornar o seu evento perfeito."
        backgroundImage="/images/hero/hero-2.jpg"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Informações de Contacto
                </h2>
                <p className="text-muted-foreground mb-8">
                  Preencha o formulário ou entre em contacto através dos seguintes
                  meios:
                </p>
              </div>

              <Card className="border-2">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {}
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-semibold">Email</h3>
                      </div>
                      <a
                        href="mailto:geral@let-rent.pt"
                        className="text-muted-foreground hover:text-primary transition-colors pl-11"
                      >
                        geral@let-rent.pt
                      </a>
                    </div>

                    {}
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-semibold">Telefone</h3>
                      </div>
                      <div className="flex flex-col gap-2 pl-11">
                        <a
                          href="tel:+351936890024"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          936 890 024
                        </a>
                        <a
                          href="tel:+351934085870"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          934 085 870
                        </a>
                      </div>
                    </div>

                    {}
                    <div>
                      <h3 className="font-semibold mb-4">Redes Sociais</h3>
                      <div className="flex gap-4 pl-11">
                        <a
                          href="https://facebook.com/profile.php?id=61573953476342"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                        >
                          <Facebook className="h-5 w-5 text-primary" />
                        </a>
                        <a
                          href="https://instagram.com/let.rent.lda"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                        >
                          <Instagram className="h-5 w-5 text-primary" />
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 bg-primary/5">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Horário de Atendimento</h3>
                  <p className="text-sm text-muted-foreground">
                    Segunda a Sexta: 9h00 - 18h00
                    <br />
                    Sábado: 9h00 - 13h00
                    <br />
                    Domingo: Encerrado
                  </p>
                </CardContent>
              </Card>
            </div>

            {}
            <div className="md:col-span-3">
              <h2 className="text-2xl font-bold mb-6">Envie-nos uma Mensagem</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
