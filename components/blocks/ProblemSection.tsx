"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

export function ProblemSection() {
    return (
        <section className="relative py-24 md:py-32 bg-background">
            <div className="container-layout">
                <hr className="border-border mb-16 md:mb-24" />

                <div className="flex flex-col items-start gap-4 mb-16 md:mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-xs font-mono text-muted-foreground uppercase tracking-wider"
                    >
                        01 / THE PROBLEM
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                    >
                        Traditional CMS is a developer nightmare.
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-24">
                    {[
                        {
                            label: "External State",
                            description: "Complex schemas that live outside your codebase",
                        },
                        {
                            label: "Closed Ecosystems",
                            description: "Vendor lock-in with no local dev story",
                        },
                        {
                            label: "Disconnect",
                            description: "Abstraction layers between your code and content",
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                            className="flex flex-col gap-4 p-6 sm:p-8 rounded-2xl border border-border/40 bg-card/30 hover:bg-card/50 backdrop-blur-md shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-500 group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-background/0 to-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                            <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-destructive/10 text-destructive/80 mb-2 group-hover:scale-110 group-hover:bg-destructive/20 group-hover:text-destructive transition-all duration-300 ring-1 ring-destructive/20">
                                <X className="w-5 h-5" />
                            </div>
                            <div className="relative z-10 flex flex-col gap-2">
                                <h3 className="font-semibold text-lg md:text-xl text-foreground tracking-tight">{item.label}</h3>
                                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex items-center gap-4"
                >
                    <div className="h-[1px] w-12 bg-border" />
                    <p className="text-primary font-medium tracking-tight">Lyrix is the alternative.</p>
                </motion.div>
            </div>
        </section>
    );
}
