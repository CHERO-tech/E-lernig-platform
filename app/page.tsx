import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import TracksSection from "@/components/TracksSection";
import FeaturedCoursesSection from "@/components/FeaturedCoursesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PricingSection from "@/components/PricingSection";
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
        <FeaturedCoursesSection />
        <HowItWorksSection />
        <PricingSection />
        <CTABand />
      </main>
      <SiteFooter />
    </>
  );
}
