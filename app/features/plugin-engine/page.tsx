import React from "react";
import { Blocks, ArrowRight, Puzzle, Wrench, PackagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Footer } from "@/components/blocks/Footer";

export default function PluginEnginePage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground selection:bg-amber-700/70 selection:text-amber-50">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex flex-col items-center justify-center overflow-hidden border-b border-border/50 bg-gradient-to-b from-amber-900/40 via-amber-950/20 to-background pt-24 pb-16">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent" />

        <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 text-sm font-medium mb-6 border border-amber-700/50 backdrop-blur-sm">
            <Blocks className="w-4 h-4" />
            <span>Extend Anytime, Anywhere</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            <span className="text-amber-700">Plugin</span> Engine
          </h1>

          <p className="text-lg md:text-xl max-w-[700px] mx-auto mb-8 font-light">
            Don't fight restrictive APIs. In Lyrix, creating a plugin to modify behavior or add new editing capabilities is as simple as writing a TypeScript function.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl h-12 px-8 font-semibold transition-all">
              Explore Plugins <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Details Section */}
      <section className="py-24 container px-4 md:px-6 mx-auto">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 rounded-2xl bg-card border border-border/50 flex flex-col items-start hover:border-amber-600/30 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Puzzle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Function-Based Hooks</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Tap into Lyrix's lifecycles simply by exporting hooks. Hook into saving, publishing, or rendering effortlessly.
            </p>
          </div>
          
          <div className="p-6 rounded-2xl bg-card border border-border/50 flex flex-col items-start hover:border-amber-600/30 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <PackagePlus className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Custom Field Types</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Need a color picker? A map coordinate selector? Register custom UI fields that your content team can use anywhere.
            </p>
          </div>
          
          <div className="p-6 rounded-2xl bg-card border border-border/50 flex flex-col items-start hover:border-amber-600/30 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Developer Native</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              No proprietary DSLs. Use the React and TypeScript knowledge you already have to extend the platform.
            </p>
          </div>
        </div>
        
        <div className="mt-24 text-center">
            <Link href="/" className="text-amber-500 hover:text-amber-400 font-medium inline-flex items-center transition-colors">
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Back to Home
            </Link>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
