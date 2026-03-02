import { PricingHero } from "@/components/blocks/PricingHero";
import { PricingTiers } from "@/components/blocks/PricingTiers";
import { PricingFaq } from "@/components/blocks/PricingFaq";
import { ClosingCta } from "@/components/blocks/ClosingCta";
import { Footer } from "@/components/blocks/Footer";

export default function PricingPage() {
    return (
        <main className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
            <PricingHero />
            <PricingTiers />
            <PricingFaq />
            <ClosingCta />
            <Footer />
        </main>
    );
}
