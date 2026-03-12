import React from "react";
import { Sparkles, ArrowRight, Zap, Brain, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/blocks/Footer";

export default function LyrixAIPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground selection:bg-purple-500/20 selection:text-purple-700">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex flex-col items-center justify-center overflow-hidden border-b border-border/50 bg-gradient-to-b from-purple-900/40 via-purple-950/20 to-background pt-24 pb-16">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        
        <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-700 text-sm font-medium mb-6 border border-purple-700/50 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span>Intelligent Content Generation</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            Meet <span className="text-purple-700">Lyrix AI</span>
          </h1>
          
          <p className="text-lg md:text-xl max-w-[700px] mx-auto mb-8 font-light">
            Stop staring at blank pages. Lyrix AI understands your brand voice and helps you draft, refine, and translate content instantly within the editor.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl h-12 px-8 font-semibold transition-all">
              Try Lyrix AI <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-xl h-12 px-8 border-purple-500/30 hover:bg-purple-500/10">
              View Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Details Section */}
      <section className="py-24 container px-4 md:px-6 mx-auto">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 rounded-2xl bg-card border border-border/50 flex flex-col items-start hover:border-purple-500/30 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Instant Generation</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Generate entire blog posts, landing page copy, or product descriptions from a simple prompt.
            </p>
          </div>
          
          <div className="p-6 rounded-2xl bg-card border border-border/50 flex flex-col items-start hover:border-purple-500/30 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Context Aware</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Lyrix AI analyzes your existing content to match your brand's unique tone and style automatically.
            </p>
          </div>
          
          <div className="p-6 rounded-2xl bg-card border border-border/50 flex flex-col items-start hover:border-purple-500/30 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Inline Editing</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Highlight any text block to rewrite, expand, summarize, or change the tone without leaving the editor.
            </p>
          </div>
        </div>
        
        <div className="mt-24 text-center">
            <Link href="/" className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center transition-colors">
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Back to Home
            </Link>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
