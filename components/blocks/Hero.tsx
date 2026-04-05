"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center bg-dot-grid overflow-hidden pt-10 pb-16">
            <div className="container-layout relative z-10 grid gap-8 md:grid-cols-12 items-center">
                <div className="md:col-span-12 lg:col-span-10 xl:col-span-11 flex flex-col items-start gap-8 ml-0 md:ml-4 lg:ml-8">

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs sm:text-sm text-muted-foreground bg-background/50 backdrop-blur-sm"
                    >
                        Early Development
                    </motion.div>

                    <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[5.5rem] leading-[0.9] tracking-tight">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="block font-normal"
                        >
                            Build Pages.
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="block italic"
                        >
                            <span className="text-primary underline decoration-1 underline-offset-[5px] sm:underline-offset-[7px]">Own</span> Your Code.
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="block font-normal"
                        >
                            Ship Faster.
                        </motion.span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-xl md:text-2xl text-muted-foreground max-w-[42rem] font-sans"
                    >
                        Developer Focused and Friendly CMS for Next.js. No lock-in.
                    </motion.p>

                    <div className="flex flex-col items-start gap-6 w-full pt-4">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                        >
                            <Link href="/register">
                                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans px-8 h-12 text-base">
                                    Get Started
                                </Button>
                            </Link>
                            <Link href="https://github.com/KaarimHussain/Lyrix">
                                <Button size="lg" variant="outline" className="font-sans px-8 h-12 text-base border-border hover:bg-accent/50 bg-background/50 backdrop-blur-sm w-full">
                                    Star on GitHub ↗
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground/70 font-mono tracking-tight"
                        >
                            <span>Open-source</span>
                            <span>·</span>
                            <span>MIT</span>
                            <span>·</span>
                            <span>App Router Native</span>
                            <span>·</span>
                            <span>TypeScript</span>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
