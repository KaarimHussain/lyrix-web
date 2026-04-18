import React from "react";
import { 
  Sparkles, 
  ArrowRight, 
  Share2, 
  RefreshCw, 
  ShieldCheck, 
  Database, 
  Layers, 
  History,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Footer } from "@/components/blocks/Footer";
import Image from "next/image";

export default function StudioPage() {
    return (
        <main className="flex min-h-[50vh] flex-col bg-background text-foreground selection:bg-rose-500/20 selection:text-rose-700">
            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden border-b border-border/50 pb-16">
                <Image
                    src="/svgs/Studio-BG.svg"
                    alt=""
                    aria-hidden="true"
                    priority
                    width={1920}
                    height={1080}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-rose-950/20 via-background/40 to-background/80" />
                
                {/* Background glow effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-rose-600/15 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />

                <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 text-sm font-medium mb-6 border border-rose-500/30 backdrop-blur-sm">
                        <Activity className="w-4 h-4" />
                        <span>Advanced Content Infrastructure</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                        The <span className="text-rose-600">Studio</span>
                    </h1>

                    <p className="text-lg md:text-xl max-w-[800px] mx-auto mb-8 font-light text-muted-foreground leading-relaxed">
                        Deep tools for serious projects. Visualize your content graph, manage schema migrations, inspect block dependencies, and keep large-scale Lyrix projects healthy at every layer.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl h-12 px-8 font-semibold transition-all w-full sm:w-auto">
                            Launch Studio <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-xl h-12 px-8 border-rose-500/20 hover:bg-rose-500/5 backdrop-blur-sm">
                            View API Docs
                        </Button>
                    </div>
                </div>
            </section>

            {/* Feature Details Section */}
            <section className="py-24 container px-4 md:px-6 mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {/* Content Graph */}
                    <div className="p-8 rounded-3xl bg-card/50 border border-border/50 flex flex-col items-start hover:border-rose-500/30 transition-all group hover:bg-rose-500/[0.02]">
                        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ring-1 ring-rose-500/20">
                            <Share2 className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">Content Graph</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                            Live visual map of every block ↔ page relationship. Blast radius on delete. Dependency highlighting on hover.
                        </p>
                    </div>

                    {/* Schema Migrations */}
                    <div className="p-8 rounded-3xl bg-card/50 border border-border/50 flex flex-col items-start hover:border-rose-500/30 transition-all group hover:bg-rose-500/[0.02]">
                        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ring-1 ring-rose-500/20">
                            <RefreshCw className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Schema Migrations</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                            Visual diff when block schemas change. Inline migration script editor. Run against staging before production.
                        </p>
                    </div>

                    {/* Content Health */}
                    <div className="p-8 rounded-3xl bg-card/50 border border-border/50 flex flex-col items-start hover:border-rose-500/30 transition-all group hover:bg-rose-500/[0.02]">
                        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ring-1 ring-rose-500/20">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Content Health</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                            Orphaned blocks, broken references, and empty required fields. Like a lint check for your content.
                        </p>
                    </div>

                    {/* Block Registry */}
                    <div className="p-8 rounded-3xl bg-card/50 border border-border/50 flex flex-col items-start hover:border-rose-500/30 transition-all group hover:bg-rose-500/[0.02]">
                        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ring-1 ring-rose-500/20">
                            <Database className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Block Registry</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                            Every registered block, its schema version, usage count, and last modified timestamps. Single source of truth.
                        </p>
                    </div>

                    {/* Bulk Operations */}
                    <div className="p-8 rounded-3xl bg-card/50 border border-border/50 flex flex-col items-start hover:border-rose-500/30 transition-all group hover:bg-rose-500/[0.02]">
                        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ring-1 ring-rose-500/20">
                            <Layers className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Bulk Operations</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                            Select 50 pages and update a shared block field across all of them instantly. Simplified workflow.
                        </p>
                    </div>

                    {/* Audit Log */}
                    <div className="p-8 rounded-3xl bg-card/50 border border-border/50 flex flex-col items-start hover:border-rose-500/30 transition-all group hover:bg-rose-500/[0.02]">
                        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ring-1 ring-rose-500/20">
                            <History className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Audit Log</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                            Who changed what block, when, with a full version diff. Essential for team collaboration and security.
                        </p>
                    </div>
                </div>

                <div className="mt-24 text-center">
                    <Link href="/" className="text-rose-500 hover:text-rose-400 font-medium inline-flex items-center transition-colors group">
                        <ArrowRight className="w-4 h-4 mr-2 rotate-180 transition-transform group-hover:-translate-x-1" /> Back to Home
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
