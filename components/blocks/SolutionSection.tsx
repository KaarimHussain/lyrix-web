"use client";

import { motion } from "framer-motion";
import { Braces, Database, Layers } from "lucide-react";

const concepts = [
    {
        icon: Braces,
        label: "CODE-FIRST BLOCKS",
        title: "Define blocks in Next.js",
        description: "Write React components with full TypeScript support. No proprietary templating languages.",
        className: "col-span-1"
    },
    {
        icon: Database,
        label: "PAGES ARE DATA",
        title: "Visual composition, JSON output",
        description: "Editors build pages visually. Your app receives typed JSON data. Total separation of concerns.",
        className: "col-span-1"
    },
    {
        icon: Layers,
        label: "RENDERING IS YOURS",
        title: "No hidden abstraction layers",
        description: "Fetch the JSON, loop through it, and map to your React components. You own the entire rendering lifecycle.",
        className: "col-span-1 md:col-span-2"
    }
];

export function SolutionSection() {
    return (
        <section className="relative py-24 md:py-32 bg-background">
            <div className="container-layout">

                <div className="flex flex-col items-start md:items-center md:text-center gap-4 mb-16 md:mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-xs font-mono text-muted-foreground uppercase tracking-wider"
                    >
                        02 / HOW IT WORKS
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl"
                    >
                        Blocks are code. Pages are data. Rendering is yours.
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {concepts.map((concept, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                            className={`group flex flex-col gap-4 p-8 rounded-2xl bg-card border border-border transition-all duration-300 hover:border-primary hover:glow-shadow ${concept.className}`}
                        >
                            <div className="text-primary mb-2 opacity-90">
                                <concept.icon strokeWidth={1} size={32} />
                            </div>
                            <p className="text-xs font-mono text-muted-foreground font-semibold tracking-wider mt-4">{concept.label}</p>
                            <h3 className="font-bold text-xl text-foreground font-sans tracking-tight">{concept.title}</h3>
                            <p className="text-muted-foreground leading-relaxed font-sans">{concept.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
