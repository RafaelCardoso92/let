"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Facebook, Instagram } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/servicos", label: "Serviços" },
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
    <nav className={"fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b " +
      (isScrolled || isOpen
        ? "bg-background/95 backdrop-blur border-border py-2"
        : "bg-background border-transparent py-3")
    }>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/images/logos/logo.png"
              alt="Let'Rent"
              width={100}
              height={100}
              className={"transition-all duration-300 w-auto " + (isScrolled ? "h-12 md:h-14" : "h-14 md:h-16")}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative py-2 text-[15px] text-foreground hover:text-primary transition-colors after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-accent after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
            
            <div className="flex items-center gap-1 pl-6 border-l border-border">
              <a
                href="https://facebook.com/profile.php?id=61573953476342"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://instagram.com/let.rent.lda"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
            

          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-full text-foreground hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-6 border-t border-border -mx-4 px-4 mt-2">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-serif text-2xl text-foreground hover:text-primary transition-colors py-1"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center space-x-4 pt-4 border-t border-border">
                <a href="https://facebook.com/profile.php?id=61573953476342" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://instagram.com/let.rent.lda" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>

            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
