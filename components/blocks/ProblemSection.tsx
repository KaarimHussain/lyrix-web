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
                        The CMS is a developer tax.
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-20 md:mb-24">
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
                            className="flex flex-col gap-3"
                        >
                            <div className="text-destructive/70 text-sm mb-1"><X /></div>
                            <h3 className="font-bold text-lg text-foreground">{item.label}</h3>
                            <p className="text-muted-foreground leading-relaxed">{item.description}</p>
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
