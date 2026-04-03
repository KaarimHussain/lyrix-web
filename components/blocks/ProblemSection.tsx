"use client";

import { motion } from "framer-motion";

const problems = [
    {
        tag: "Plugin hell",
        title: "Need a custom block? Build a plugin.",
        description:
            "WordPress forces you into a PHP plugin architecture just to add a simple repeatable section. What should be a component is now a registered post type, a meta box, and 200 lines of boilerplate.",
    },
    {
        tag: "Vendor lock-in",
        title: "Your content is theirs, not yours.",
        description:
            "Schemas live in the database, not in your codebase. Switch CMS and you're migrating everything manually. There's no local dev story, no version control, no git history for content structure.",
    },
    {
        tag: "Dead performance",
        title: "Every plugin is a performance tax.",
        description:
            "A fresh WordPress install with 10 plugins routinely scores sub-60 on PageSpeed. You spend more time optimizing bloat than building features — and the client still asks why the site is slow.",
    },
    {
        tag: "Security nightmares",
        title: "43% of the web. 90% of the CVEs.",
        description:
            "Outdated plugins, exposed wp-admin, SQL injection via poorly written themes — maintaining WordPress in production means babysitting a security checklist indefinitely.",
    },
    {
        tag: "Code disconnect",
        title: "Your components live in two places.",
        description:
            "The frontend is React. The CMS is PHP. The schema is in a MySQL table. Nothing is co-located, nothing is typed, and onboarding a new dev means explaining a system that makes no architectural sense.",
    },
    {
        tag: "Ancient DX",
        title: "Built in 2003. Feels like it.",
        description:
            "No TypeScript, no hot reload, no modern tooling. Gutenberg tried to modernize but layered React on top of a PHP monolith — the worst of both worlds, not the best.",
    },
];

export function ProblemSection() {
    return (
        <section className="relative py-24 md:py-32 bg-background">
            <div className="container-layout">
                <hr className="border-border mb-16 md:mb-24" />

                <div className="flex flex-col items-start gap-4 mb-6">
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

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed"
                    >
                        You didn't sign up to fight your tools. But here you are — three days deep in a plugin that should've taken an afternoon.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20 md:mb-24">
                    {problems.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                            className="flex flex-col gap-3 p-6 rounded-2xl border border-border/40 bg-card/30 hover:bg-card/50 backdrop-blur-md hover:border-border/80 transition-all duration-500"
                        >
                            <span className="text-xs font-medium text-destructive bg-destructive/10 px-3 py-1 rounded-md w-fit">
                                {item.tag}
                            </span>
                            <h3 className="font-semibold text-base md:text-lg text-foreground tracking-tight">
                                {item.title}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="flex items-center gap-4"
                >
                    <div className="h-[1px] w-12 bg-border" />
                    <p className="text-primary font-medium tracking-tight">Lyrix is the alternative.</p>
                </motion.div>
            </div>
        </section>
    );
}