"use client";

import { motion } from "framer-motion";

export function PricingHero() {
    return (
        <section className="relative pt-32 pb-16 md:pt-20 md:pb-24 flex items-center bg-dot-grid overflow-hidden">

            <div className="container-layout relative z-10 flex flex-col items-center text-center">

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs sm:text-sm text-muted-foreground bg-background/50 backdrop-blur-sm mb-8"
                >
                    Pricing
                </motion.div>

                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-tight mb-8">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="block font-medium"
                    >
                        Fair, transparent
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="block italic"
                    >
                        <span className="text-primary underline decoration-1 underline-offset-[10px] sm:underline-offset-[14px]">pricing.</span>
                    </motion.span>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-xl md:text-2xl text-muted-foreground max-w-[36rem] font-sans"
                >
                    Open-core software designed for scale. Predictable pricing, NO hidden fees, NO per-user abstraction taxes.
                </motion.p>
            </div>
        </section>
    );
}
