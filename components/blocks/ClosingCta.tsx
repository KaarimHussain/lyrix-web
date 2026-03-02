"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ClosingCta() {
    return (
        <section
            className="relative py-32 md:py-48 overflow-hidden flex flex-col items-center justify-center border-t border-white/5"
            style={{ backgroundColor: "oklch(0.13 0.01 85)", color: "oklch(0.98 0.01 85)" }}
        >

            <div className="container-layout relative z-10 flex flex-col items-center text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
                >
                    Start building with Lyrix.
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl md:text-2xl text-white/50 font-sans mb-12 tracking-tight"
                >
                    Open-source. Zero lock-in. Fully yours.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-20"
                >
                    <Link href="https://github.com/KaarimHussain/Lyrix">
                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans px-8 h-12 text-base border-none outline-none">
                            View on GitHub ↗
                        </Button>
                    </Link>
                    <Button size="lg" variant="outline" disabled className="font-sans px-8 h-12 text-base border-white/10 hover:bg-white/5 bg-white/5 text-white/40 disabled:opacity-70">
                        Read the Docs
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-4 text-xs font-mono text-white/30"
                >
                    <span>MIT License</span>
                    <span>·</span>
                    <span>© {new Date().getFullYear()} Lyrix</span>
                </motion.div>
            </div>
        </section>
    );
}
