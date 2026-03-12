import React from "react";
import { Zap, ArrowRight, Gauge, Cpu, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Footer } from "@/components/blocks/Footer";

export default function RendererPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground selection:bg-green-700/70 selection:text-green-50">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex flex-col items-center justify-center overflow-hidden border-b border-border/50 bg-gradient-to-b from-green-900/40 via-green-950/20 to-background pt-24 pb-16">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-green-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />

        <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-700 text-sm font-medium mb-6 border border-green-700/50 backdrop-blur-sm">
            <Zap className="w-4 h-4" />
            <span>High-Performance Delivery</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            Native <span className="text-green-700">Renderer</span>
          </h1>

          <p className="text-lg md:text-xl max-w-[700px] mx-auto mb-8 font-light">
            Skip the bloated iframes. Lyrix renders your visual compositions directly inside your Next.js application for maximum performance and SEO.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white rounded-xl h-12 px-8 font-semibold transition-all">
              See Benchmarks <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Details Section */}
      <section className="py-24 container px-4 md:px-6 mx-auto">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 rounded-2xl bg-card border border-border/50 flex flex-col items-start hover:border-green-500/30 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Gauge className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              App Router friendly and fully compatible with React Server Components, delivering tiny payloads.
            </p>
          </div>
          
          <div className="p-6 rounded-2xl bg-card border border-border/50 flex flex-col items-start hover:border-green-500/30 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">No Runtime Hacks</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Your pages are serialized as clean JSON and rendered using standard React rendering pipelines. No magic, just code.
            </p>
          </div>
          
          <div className="p-6 rounded-2xl bg-card border border-border/50 flex flex-col items-start hover:border-green-500/30 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Network className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Edge Ready</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Deploy your content globally to the Edge. Lyrix's lightweight renderer runs instantly everywhere.
            </p>
          </div>
        </div>
        
        <div className="mt-24 text-center">
            <Link href="/" className="text-green-400 hover:text-green-300 font-medium inline-flex items-center transition-colors">
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Back to Home
            </Link>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
