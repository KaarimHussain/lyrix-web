"use client";

import { motion } from "framer-motion";

export function PluginHero() {
    return (
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 flex items-center bg-dot-grid overflow-hidden border-b border-border">

            <div className="container-layout relative z-10 flex flex-col items-start max-w-5xl mx-auto w-full">

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="inline-flex items-center rounded-sm border border-border px-2 py-0.5 text-[10px] md:text-xs font-mono uppercase tracking-widest text-muted-foreground bg-muted/20 mb-6"
                >
                    Lyrix Ecosystem
                </motion.div>

                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-tight mb-6">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="block font-medium text-foreground"
                    >
                        Plugin Marketplace
                    </motion.span>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-lg md:text-xl text-muted-foreground max-w-[40rem] font-sans leading-relaxed"
                >
                    Official and community-built integrations for Lyrix. Extend your block editor with auth, analytics, data sources, and UI frameworks instantly via CLI.
                </motion.p>
            </div>
        </section>
    );
}
