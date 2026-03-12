import React from "react";
import { Users2, ArrowRight, History, MessageSquareShare, FileLock2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Footer } from "@/components/blocks/Footer";

export default function TeamSyncPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground selection:bg-slate-700/70 selection:text-slate-50">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex flex-col items-center justify-center overflow-hidden border-b border-border/50 bg-gradient-to-b from-slate-800/40 via-slate-900/20 to-background pt-24 pb-16">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-slate-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-500/30 to-transparent" />

        <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 text-slate-700 text-sm font-medium mb-6 border border-slate-700/70 backdrop-blur-sm">
            <Users2 className="w-4 h-4" />
            <span>Collaborate in Real Time</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            <span className="text-slate-700">Team</span> Sync
          </h1>

          <p className="text-lg md:text-xl max-w-[700px] mx-auto mb-8 font-light">
            Bring writers, designers, and developers together. Edit pages synchronously, leave comments, and manage permissions with enterprise-grade controls.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white rounded-xl h-12 px-8 font-semibold transition-all">
              Invite Your Team <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Details Section */}
      <section className="py-24 container px-4 md:px-6 mx-auto">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 rounded-2xl bg-card border border-border/50 flex flex-col items-start hover:border-slate-500/30 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-slate-500/10 text-slate-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MessageSquareShare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Multiplayer Editing</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              See who is editing what, with presence indicators and real-time cursor syncing. No more overwriting each other's work.
            </p>
          </div>
          
          <div className="p-6 rounded-2xl bg-card border border-border/50 flex flex-col items-start hover:border-slate-500/30 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-slate-500/10 text-slate-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <History className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Granular History</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Every save, publish, and revert is tracked. Easily rollback to previous versions of a page with one click.
            </p>
          </div>
          
          <div className="p-6 rounded-2xl bg-card border border-border/50 flex flex-col items-start hover:border-slate-500/30 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-slate-500/10 text-slate-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FileLock2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Roles & Permissions</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Control exactly who can edit content, modify schemas, or push to production environments.
            </p>
          </div>
        </div>
        
        <div className="mt-24 text-center">
            <Link href="/" className="text-slate-400 hover:text-slate-300 font-medium inline-flex items-center transition-colors">
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Back to Home
            </Link>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
