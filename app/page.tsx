import { Hero } from "@/components/sections/hero";
import { NewArrivalSpotlight } from "@/components/sections/new-arrival-spotlight";
import { ServicesGrid } from "@/components/sections/services-grid";
import { FeaturedSlider } from "@/components/sections/featured-slider";
import { CTASection } from "@/components/sections/cta-section";

export default function Home() {
  return (
    <>
      <Hero
        title="Let'Rent - Aluguer de Material para Eventos"
        subtitle="Oferecemos uma ampla variedade de equipamentos de catering, mobiliário e serviços completos para tornar o seu evento inesquecível."
        ctaText="Descubra os nossos serviços"
        ctaHref="/servicos"
        backgroundImage="/images/hero/hero-2-optimized.webp"
      />

      <NewArrivalSpotlight />

      <FeaturedSlider />

      <ServicesGrid />

      <CTASection />
    </>
  );
}
