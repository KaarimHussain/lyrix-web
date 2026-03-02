import { PluginHero } from "@/components/blocks/PluginHero";
import { PluginGrid } from "@/components/blocks/PluginGrid";
import { ClosingCta } from "@/components/blocks/ClosingCta";
import { Footer } from "@/components/blocks/Footer";

export default function PluginMarketplacePage() {
    return (
        <main className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
            <PluginHero />
            <PluginGrid />
            <ClosingCta />
            <Footer />
        </main>
    );
}
