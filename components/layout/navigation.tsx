"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/servicos", label: "Serviços" },
  { href: "/inspiracao", label: "Inspiração" },
  { href: "/visualizador", label: "Visualizador" },
  { href: "/disponibilidade", label: "Disponibilidade" },
  { href: "/contactos", label: "Contactos" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={"fixed top-0 left-0 right-0 z-50 transition-all duration-500 " + 
      (isScrolled 
        ? "bg-white/95 backdrop-blur-xl shadow-lg py-2" 
        : "bg-transparent py-4")
    }>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/images/logos/logo.png"
              alt="Let'Rent"
              width={160}
              height={53}
              className={"transition-all duration-500 group-hover:scale-105 " +
                (isScrolled ? "h-14 md:h-16" : "h-16 md:h-20") + " w-auto"
              }
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={"relative font-medium transition-colors py-2 group text-sm " +
                  (isScrolled ? "text-foreground hover:text-primary" : "text-white hover:text-accent")
                }
              >
                {link.label}
                <span className={"absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 rounded-full " +
                  (isScrolled ? "bg-primary" : "bg-accent")
                } />
              </Link>
            ))}
            
            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-current/10">
              <a
                href="https://facebook.com/profile.php?id=61573953476342"
                target="_blank"
                rel="noopener noreferrer"
                className={"transition-all duration-300 hover:scale-110 p-2 rounded-full " +
                  (isScrolled 
                    ? "text-foreground/60 hover:text-primary hover:bg-primary/10" 
                    : "text-white/70 hover:text-white hover:bg-white/10")
                }
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/let.rent.lda"
                target="_blank"
                rel="noopener noreferrer"
                className={"transition-all duration-300 hover:scale-110 p-2 rounded-full " +
                  (isScrolled 
                    ? "text-foreground/60 hover:text-primary hover:bg-primary/10" 
                    : "text-white/70 hover:text-white hover:bg-white/10")
                }
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
            
            <Button 
              asChild 
              className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 rounded-full px-6"
            >
              <Link href="/orcamento">Pedir Orçamento</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className={"lg:hidden p-2 rounded-lg transition-colors duration-300 " +
              (isScrolled ? "hover:bg-primary/10" : "hover:bg-white/10")
            }
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen 
              ? <X className={isScrolled ? "h-6 w-6 text-primary" : "h-6 w-6 text-white"} /> 
              : <Menu className={isScrolled ? "h-6 w-6" : "h-6 w-6 text-white"} />
            }
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-6 border-t border-accent/10 bg-white/95 backdrop-blur-xl -mx-4 px-4 mt-2 rounded-b-2xl shadow-lg">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center space-x-4 pt-4 border-t border-accent/10">
                <a href="https://facebook.com/profile.php?id=61573953476342" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://instagram.com/let.rent.lda" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
              <Button asChild className="bg-primary hover:bg-primary/90 rounded-full">
                <Link href="/orcamento" onClick={() => setIsOpen(false)}>Pedir Orçamento</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
