import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { StructuredData } from "@/components/structured-data";
import { ScrollToTop } from "@/components/scroll-to-top";
import { MouseGradient } from "@/components/ui/mouse-gradient";

// Optimized font loading with Next.js
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://let.rafaelcardoso.co.uk"),
  title: {
    default: "Let'Rent - Aluguer Premium de Material para Eventos | Portugal",
    template: "%s | Let'Rent",
  },
  description:
    "Aluguer premium de material para eventos em Portugal. Equipamentos de catering de luxo, mobiliário elegante, cristalaria fina. Transporte e montagem profissional incluídos. Transforme o seu evento numa experiência inesquecível.",
  keywords: [
    "aluguer material eventos",
    "aluguer material eventos portugal",
    "catering eventos",
    "mobiliário eventos luxo",
    "aluguer pratos casamento",
    "aluguer copos cristal",
    "aluguer mesas eventos",
    "aluguer cadeiras tiffany",
    "eventos portugal",
    "equipamentos eventos premium",
    "montagem eventos profissional",
    "transporte material eventos",
    "decoração eventos",
    "casamentos portugal",
    "festas empresariais",
    "aluguer lounge eventos",
  ],
  authors: [{ name: "Let'Rent", url: "https://let.rafaelcardoso.co.uk" }],
  creator: "Let'Rent",
  publisher: "Let'Rent",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://let.rafaelcardoso.co.uk",
    languages: {
      "pt-PT": "https://let.rafaelcardoso.co.uk",
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: "https://let.rafaelcardoso.co.uk",
    siteName: "Let'Rent",
    title: "Let'Rent - Aluguer Premium de Material para Eventos",
    description:
      "Transforme o seu evento numa experiência inesquecível. Equipamentos de catering de luxo, mobiliário elegante e serviços profissionais.",
    images: [
      {
        url: "/images/hero/hero-2.jpg",
        width: 1200,
        height: 630,
        alt: "Let'Rent - Material Premium para Eventos",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Let'Rent - Aluguer Premium de Material para Eventos",
    description:
      "Equipamentos de catering de luxo e mobiliário elegante para eventos em Portugal.",
    images: ["/images/hero/hero-2.jpg"],
    creator: "@letrent",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  category: "business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="pt" 
      className={`${playfair.variable} ${inter.variable}`}
    >
      <head>
        <StructuredData />
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch */}
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        {/* Favicon */}
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        {/* Manifest for PWA */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} antialiased flex flex-col min-h-screen`}>
        <MouseGradient />
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
