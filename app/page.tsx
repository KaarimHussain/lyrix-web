import { Hero } from "@/components/blocks/Hero";
import { ProblemSection } from "@/components/blocks/ProblemSection";
import { SolutionSection } from "@/components/blocks/SolutionSection";
import { CodeShowcase } from "@/components/blocks/CodeShowcase";
import { PhilosophyQuote } from "@/components/blocks/PhilosophyQuote";
import { RoadmapTeaser } from "@/components/blocks/RoadmapTeaser";
import { ClosingCta } from "@/components/blocks/ClosingCta";
import { Footer } from "@/components/blocks/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <CodeShowcase />
      <PhilosophyQuote />
      <RoadmapTeaser />
      <ClosingCta />
      <Footer />
    </main>
  );
}
