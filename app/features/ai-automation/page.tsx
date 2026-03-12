import React from "react";
import { Workflow, ArrowRight, Bot, GitPullRequestDraft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Footer } from "@/components/blocks/Footer";

export default function AIAutomationPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground selection:bg-orange-700/50 selection:text-orange-100">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex flex-col items-center justify-center overflow-hidden border-b border-border/50 bg-gradient-to-b from-orange-900/40 via-orange-950/20 to-background pt-24 pb-16">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

        <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-700 text-sm font-medium mb-6 border border-orange-700/50 backdrop-blur-sm">
            <Workflow className="w-4 h-4" />
            <span>Next-Gen Workflows</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            <span className="text-orange-700">AI</span> Automation
          </h1>

          <p className="text-lg md:text-xl max-w-[700px] mx-auto mb-8 font-light">
            Automate your tedious publishing pipelines. Tell Lyrix to cross-post to socials, generate SEO tags, and translate content automatically upon publishing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl h-12 px-8 font-semibold transition-all">
              Setup Workflows <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Details Section */}
      <section className="py-24 container px-4 md:px-6 mx-auto">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 rounded-2xl bg-card border border-border/50 flex flex-col items-start hover:border-orange-500/30 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Auto SEO & Tags</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Whenever you hit publish, Lyrix dynamically generates meta descriptions, tags, and open graph data based on your page's content.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border/50 flex flex-col items-start hover:border-orange-500/30 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Content Translation</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Create a new locale and watch the AI translate your blocks while maintaining the correct structure and custom components.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border/50 flex flex-col items-start hover:border-orange-500/30 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <GitPullRequestDraft className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Scheduled Pipelines</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Trigger GitHub Actions or external webhooks automatically when specific content conditions are met.
            </p>
          </div>
        </div>

        <div className="mt-24 text-center">
          <Link href="/" className="text-orange-400 hover:text-orange-300 font-medium inline-flex items-center transition-colors">
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Back to Home
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
