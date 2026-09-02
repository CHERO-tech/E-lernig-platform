import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import TracksSection from "@/components/TracksSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import DifferenceSection from "@/components/DifferenceSection";
import TestimonialSection from "@/components/TestimonialSection";
import CTABand from "@/components/CTABand";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <HeroSection />
        <StatsSection />
        <TracksSection />
        <HowItWorksSection />
        <DifferenceSection />
        <TestimonialSection />
        <CTABand />
      </main>
      <SiteFooter />
    </>
  );
}
