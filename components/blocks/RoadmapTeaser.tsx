"use client";

import { motion } from "framer-motion";

const roadmapItems = [
    { name: "App Router support", status: "in-progress" },
    { name: "Block registry & runtime renderer", status: "in-progress" },
    { name: "JSON-based serialization", status: "in-progress" },
    { name: "Visual page editor", status: "planned" },
    { name: "Plugin system", status: "planned" },
    { name: "Playground & examples", status: "planned" },
];

export function RoadmapTeaser() {
    return (
        <section className="relative py-24 md:py-32 bg-background">
            <div className="container-layout">
                <div className="flex flex-col items-center text-center gap-4 mb-12 md:mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-xs font-mono text-muted-foreground uppercase tracking-wider"
                    >
                        04 / WHAT'S COMING
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="font-display text-4xl md:text-5xl font-bold tracking-tight"
                    >
                        The roadmap.
                    </motion.h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto"
                >
                    {roadmapItems.map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-border bg-card/40 text-sm font-mono transition-colors hover:border-primary/50 cursor-default"
                        >
                            <div
                                className={`w-2 h-2 rounded-full flex-shrink-0 ${item.status === "in-progress"
                                        ? "bg-primary shadow-[0_0_8px_oklch(0.55_0.12_155_/_0.8)]"
                                        : "bg-muted-foreground/30"
                                    }`}
                            />
                            <span className={item.status === "in-progress" ? "text-foreground font-medium" : "text-muted-foreground"}>
                                {item.name}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex justify-center gap-8 mt-12 text-xs font-mono text-muted-foreground/60"
                >
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>In progress</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                        <span>Planned</span>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
