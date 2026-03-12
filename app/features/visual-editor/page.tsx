import React from "react";
import { MousePointer2, ArrowRight, LayoutTemplate, Layers, Move } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Footer } from "@/components/blocks/Footer";

export default function VisualEditorPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground selection:bg-blue-700/50 selection:text-blue-700">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex flex-col items-center justify-center overflow-hidden border-b border-border/50 bg-gradient-to-b from-blue-900/40 via-blue-950/20 to-background pt-24 pb-16">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

        <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-700 text-sm font-medium mb-6 border border-blue-700/50 backdrop-blur-sm">
            <MousePointer2 className="w-4 h-4" />
            <span>Drag & Drop Interface</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            The <span className="text-blue-700">Visual Editor</span>
          </h1>

          <p className="text-lg md:text-xl max-w-[700px] mx-auto mb-8 font-light">
            Compose pages visually without losing control over the code. Lyrix's Visual Editor bridges the gap between developers and content creators.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 px-8 font-semibold transition-all">
              Try the Editor <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Details Section */}
      <section className="py-24 container px-4 md:px-6 mx-auto">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 rounded-2xl bg-card border border-border/50 flex flex-col items-start hover:border-blue-500/30 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <LayoutTemplate className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Code-First Blocks</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Every visual element maps directly to your React components, keeping your codebase clean and predictable.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border/50 flex flex-col items-start hover:border-blue-500/30 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Move className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">True Drag & Drop</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Rearrange sections, adjust layouts, and see changes in real-time, exactly as your users will see them.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border/50 flex flex-col items-start hover:border-blue-500/30 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Nested Composition</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Build complex, responsive layouts by nesting blocks within slots, giving you unlimited design flexibility.
            </p>
          </div>
        </div>

        <div className="mt-24 text-center">
          <Link href="/" className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center transition-colors">
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Back to Home
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
