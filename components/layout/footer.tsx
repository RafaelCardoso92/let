import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-muted to-muted/80 mt-auto border-t border-accent/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {}
          <div>
            <Image
              src="/images/logos/logo.png"
              alt="Let'Rent"
              width={140}
              height={47}
              className="h-12 w-auto mb-4 drop-shadow-sm"
            />
            <p className="text-muted-foreground mb-4 font-light leading-relaxed">
              Criando valor e elegância a cada passo. Soluções completas e luxuosas para o seu evento.
            </p>
          </div>

          {}
          <div>
            <h4 className="font-semibold text-lg mb-4 font-serif">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-accent transition-colors font-light"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos"
                  className="text-muted-foreground hover:text-accent transition-colors font-light"
                >
                  Serviços
                </Link>
              </li>
              <li>
                <Link
                  href="/contactos"
                  className="text-muted-foreground hover:text-accent transition-colors font-light"
                >
                  Contactos
                </Link>
              </li>
            </ul>
          </div>

          {}
          <div>
            <h4 className="font-semibold text-lg mb-4 font-serif">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-accent" />
                <a
                  href="mailto:geral@let-rent.pt"
                  className="hover:text-accent transition-colors font-light"
                >
                  geral@let-rent.pt
                </a>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-accent" />
                <div className="flex flex-col">
                  <a
                    href="tel:+351936890024"
                    className="hover:text-accent transition-colors font-light"
                  >
                    936 890 024
                  </a>
                  <a
                    href="tel:+351934085870"
                    className="hover:text-accent transition-colors font-light"
                  >
                    934 085 870
                  </a>
                </div>
              </li>
            </ul>
            <div className="flex items-center space-x-4 mt-4">
              <a
                href="https://facebook.com/profile.php?id=61573953476342"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-all hover:scale-110 duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/let.rent.lda"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-all hover:scale-110 duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-accent/20 mt-8 pt-8 text-center text-muted-foreground">
          <p className="font-light">
            &copy; {new Date().getFullYear()} Let'Rent, Lda - Todos os direitos reservados
          </p>
          <p className="font-light mt-2">
            Criado por{' '}
            <a
              href="https://rafaelcardoso.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline font-semibold"
            >
              Rafael Cardoso
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
