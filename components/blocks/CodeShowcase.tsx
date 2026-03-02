"use client";

import { motion } from "framer-motion";

const codeLines = [
    <span key={0}><span className="text-[#C792EA]">import</span> <span className="text-[#89DDFF]">{"{"}</span> <span className="text-[#82AAFF]">defineBlock</span> <span className="text-[#89DDFF]">{"}"}</span> <span className="text-[#C792EA]">from</span> <span className="text-[#C3E88D]">"lyrix/blocks"</span>;</span>,
    <span key={1}><span className="text-[#C792EA]">import</span> <span className="text-[#89DDFF]">{"{"}</span> <span className="text-[#82AAFF]">Button</span> <span className="text-[#89DDFF]">{"}"}</span> <span className="text-[#C792EA]">from</span> <span className="text-[#C3E88D]">"@/components/ui/button"</span>;</span>,
    <span key={2}></span>,
    <span key={3}><span className="text-[#C792EA]">export const</span> <span className="text-[#FFCB6B]">HeroBlock</span> <span className="text-[#89DDFF]">=</span> <span className="text-[#82AAFF]">defineBlock</span><span className="text-[#89DDFF]">({"{"}</span></span>,
    <span key={4}>{"  "}<span className="text-[#F07178]">name</span><span className="text-[#89DDFF]">:</span> <span className="text-[#C3E88D]">"Hero"</span><span className="text-[#EEFFFF]">,</span></span>,
    <span key={5}>{"  "}<span className="text-[#F07178]">schema</span><span className="text-[#89DDFF]">:</span> <span className="text-[#89DDFF]">{"{"}</span></span>,
    <span key={6}>{"    "}<span className="text-[#F07178]">title</span><span className="text-[#EEFFFF]">:</span> <span className="text-[#89DDFF]">{"{"}</span> <span className="text-[#F07178]">type</span><span className="text-[#EEFFFF]">:</span> <span className="text-[#C3E88D]">"string"</span><span className="text-[#EEFFFF]">,</span> <span className="text-[#F07178]">required</span><span className="text-[#EEFFFF]">:</span> <span className="text-[#F78C6C]">true</span> <span className="text-[#89DDFF]">{"}"}</span><span className="text-[#EEFFFF]">,</span></span>,
    <span key={7}>{"    "}<span className="text-[#F07178]">subtitle</span><span className="text-[#EEFFFF]">:</span> <span className="text-[#89DDFF]">{"{"}</span> <span className="text-[#F07178]">type</span><span className="text-[#EEFFFF]">:</span> <span className="text-[#C3E88D]">"string"</span> <span className="text-[#89DDFF]">{"}"}</span><span className="text-[#EEFFFF]">,</span></span>,
    <span key={8}>{"  "}<span className="text-[#89DDFF]">{"}"}</span><span className="text-[#EEFFFF]">,</span></span>,
    <span key={9}>{"  "}<span className="text-[#F07178]">render</span><span className="text-[#EEFFFF]">:</span> <span className="text-[#89DDFF]">({"{"}</span> <span className="text-[#EEFFFF]">title</span><span className="text-[#EEFFFF]">,</span> <span className="text-[#EEFFFF]">subtitle</span> <span className="text-[#89DDFF]">{"}"}</span><span className="text-[#89DDFF]">)</span> <span className="text-[#C792EA]">{`=>`}</span> <span className="text-[#89DDFF]">(</span></span>,
    <span key={10}>{"    "}<span className="text-[#89DDFF]">{'<'}</span><span className="text-[#F07178]">section</span> <span className="text-[#82AAFF]">className</span><span className="text-[#89DDFF]">=</span><span className="text-[#C3E88D]">"py-24"</span><span className="text-[#89DDFF]">{'>'}</span></span>,
    <span key={11}>{"      "}<span className="text-[#89DDFF]">{'<'}</span><span className="text-[#F07178]">h1</span><span className="text-[#89DDFF]">{'>'}</span><span className="text-[#89DDFF]">{"{"}</span><span className="text-[#EEFFFF]">title</span><span className="text-[#89DDFF]">{"}"}</span><span className="text-[#89DDFF]">{'</'}</span><span className="text-[#F07178]">h1</span><span className="text-[#89DDFF]">{'>'}</span></span>,
    <span key={12}>{"      "}<span className="text-[#89DDFF]">{"{"}</span><span className="text-[#EEFFFF]">subtitle</span> <span className="text-[#C792EA]">{'&&'}</span> <span className="text-[#89DDFF]">{'<'}</span><span className="text-[#F07178]">p</span><span className="text-[#89DDFF]">{'>'}</span><span className="text-[#89DDFF]">{"{"}</span><span className="text-[#EEFFFF]">subtitle</span><span className="text-[#89DDFF]">{"}"}</span><span className="text-[#89DDFF]">{'</'}</span><span className="text-[#F07178]">p</span><span className="text-[#89DDFF]">{'>'}</span><span className="text-[#89DDFF]">{"}"}</span></span>,
    <span key={13}>{"      "}<span className="text-[#89DDFF]">{'<'}</span><span className="text-[#FFCB6B]">Button</span><span className="text-[#89DDFF]">{'>'}</span><span className="text-[#EEFFFF]">Get Started</span><span className="text-[#89DDFF]">{'</'}</span><span className="text-[#FFCB6B]">Button</span><span className="text-[#89DDFF]">{'>'}</span></span>,
    <span key={14}>{"    "}<span className="text-[#89DDFF]">{'</'}</span><span className="text-[#F07178]">section</span><span className="text-[#89DDFF]">{'>'}</span></span>,
    <span key={15}>{"  "}<span className="text-[#89DDFF]">),</span></span>,
    <span key={16}><span className="text-[#89DDFF]">{"}"}</span><span className="text-[#89DDFF]">);</span></span>,
];

export function CodeShowcase() {
    return (
        <section className="relative py-24 md:py-32 bg-background">
            <div className="container-layout">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

                    {/* Left Column */}
                    <div className="flex flex-col items-start gap-8 lg:pr-12">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-xs font-mono text-muted-foreground uppercase tracking-wider"
                        >
                            03 / IN PRACTICE
                        </motion.p>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="font-display text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1]"
                        >
                            A block is just a component.
                        </motion.h2>

                        <motion.ul
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-col gap-6 mt-4"
                        >
                            {[
                                "Strongly typed props from JSON schema.",
                                "Zero proprietary wrappers or APIs.",
                                "Full access to your styling system."
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <div className="mt-2 h-2 w-2 rounded-full bg-primary/80 shadow-[0_0_10px_oklch(0.55_0.12_155_/_0.8)] flex-shrink-0" />
                                    <span className="text-lg text-muted-foreground font-sans leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </motion.ul>

                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="mt-6 text-muted-foreground/40 font-sans cursor-not-allowed text-sm hover:text-muted-foreground/40 transition-none"
                            aria-disabled="true"
                        >
                            Read the docs →
                        </motion.span>
                    </div>

                    {/* Right Column (Code Editor) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full relative group"
                    >
                        {/* Dark background forced */}
                        <div
                            className="rounded-xl border border-white/5 overflow-hidden shadow-2xl relative z-10"
                            style={{ backgroundColor: "oklch(0.13 0.01 85)", color: "oklch(0.98 0.01 85)" }}
                        >
                            {/* Window Chrome */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                                <div className="flex gap-2 w-20">
                                    <div className="w-3 h-3 rounded-full bg-white/10" />
                                    <div className="w-3 h-3 rounded-full bg-white/10" />
                                    <div className="w-3 h-3 rounded-full bg-white/10" />
                                </div>
                                <div className="px-3 py-1 rounded-md bg-white/5 text-xs font-mono text-white/50 border border-white/5">
                                    block.tsx
                                </div>
                                <div className="w-20" /> {/* Spacer for centering */}
                            </div>

                            {/* Code Area */}
                            <div className="p-6 overflow-x-auto text-[13px] md:text-sm font-mono leading-relaxed">
                                {codeLines.map((line, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.3, delay: 0.4 + (i * 0.05) }}
                                        className="whitespace-pre flex"
                                    >
                                        <span className="w-8 text-white/20 select-none mr-4 text-right inline-block">{i + 1}</span>
                                        <span className="text-white/80">{line}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Subtle green glow */}
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-32 bg-primary/10 blur-[80px] pointer-events-none rounded-full z-0" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
