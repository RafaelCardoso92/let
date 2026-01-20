import { Hero } from "@/components/sections/hero";
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
        backgroundImage="/images/hero/hero-2.jpg"
      />

      <FeaturedSlider />

      <ServicesGrid />

      <CTASection />
    </>
  );
}
