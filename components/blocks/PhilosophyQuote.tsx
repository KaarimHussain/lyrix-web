"use client";

import { motion } from "framer-motion";

export function PhilosophyQuote() {
    return (
        <section className="relative bg-muted overflow-hidden border-y border-border">
            {/* Noise overlay */}
            <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none" />

            <div className="container-layout relative z-10">

                <div className="py-24 md:py-32 flex flex-col items-center text-center max-w-4xl mx-auto px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="font-display italic text-3xl md:text-4xl lg:text-5xl leading-[1.2] font-normal text-foreground"
                    >
                        "Developers should own their content structure as much as they own their code."
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-8 text-sm font-mono text-muted-foreground uppercase tracking-[0.2em]"
                    >
                        — Lyrix Philosophy
                    </motion.p>
                </div>

            </div>
        </section>
    );
}
