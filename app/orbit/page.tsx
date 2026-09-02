import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./orbit.css";
import { OrbitProviders } from "./_components/OrbitProviders";
import { OrbitNav } from "./_components/OrbitNav";
import { ScrollProgressBar } from "./_components/ScrollProgressBar";
import { HeroSection } from "./_components/HeroSection";
import {
  DiscoverSection,
  LearnSection,
  PracticeSection,
  ProgressSection,
  CategoriesSection,
  WhySection,
  InstructorsSection,
  TestimonialsSection,
  FinalCtaSection,
  OrbitFooter,
} from "./_components/SectionsPlaceholder";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orbit — Learning Reimagined",
  description: "A premium e-learning platform designed for the modern learner.",
};

export default function OrbitPage() {
  return (
    <div className={`ob-root ${bricolage.variable} ${inter.variable}`}>
      <OrbitProviders>
        <ScrollProgressBar />
        <OrbitNav />
        <main style={{ paddingTop: "70px" }}>
          <HeroSection />
          <DiscoverSection />
          <LearnSection />
          <PracticeSection />
          <ProgressSection />
          <CategoriesSection />
          <WhySection />
          <InstructorsSection />
          <TestimonialsSection />
          <FinalCtaSection />
          <OrbitFooter />
        </main>
      </OrbitProviders>
    </div>
  );
}
