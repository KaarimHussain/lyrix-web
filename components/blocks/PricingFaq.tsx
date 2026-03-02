"use client";

import { motion } from "framer-motion";

const faqs = [
    {
        question: "Do I have to pay to use the visual editor locally?",
        answer: "No. The local visual editor and block registry are completely free and open-source under the MIT license. You can build as many pages as you want.",
    },
    {
        question: "What exactly am I paying for in the Pro tier?",
        answer: "You are paying for managed infrastructure: cloud synchronization of your content schemas, multi-user collaboration, hosting of the editor UI if you don't want to self-host, and prioritized support.",
    },
    {
        question: "Does Lyrix lock me into a specific hosting provider?",
        answer: "Absolutely not. Lyrix outputs pure JSON data. You can fetch this data in Next.js and render it anywhere—Vercel, AWS, Cloudflare, or a VPS. We have zero opinions on your deployment target.",
    },
    {
        question: "Can I self-host the entire Pro tier?",
        answer: "Currently, the collaboration and cloud sync features are managed by us. However, the core block resolution and rendering engine are completely open-source and run in your own infrastructure.",
    },
];

export function PricingFaq() {
    return (
        <section className="relative py-24 md:py-32 bg-muted/30 border-t border-border">
            {/* Subtle Noise for texture */}
            <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

            <div className="container-layout relative z-10 max-w-4xl mx-auto">
                <div className="flex flex-col items-center mb-16 text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4"
                    >
                        01 / FAQ
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground"
                    >
                        Questions?
                    </motion.h2>
                </div>

                <div className="flex flex-col gap-8 md:gap-12">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 * i }}
                            className="flex flex-col md:flex-row gap-4 md:gap-8 group"
                        >
                            <h3 className="md:w-1/2 font-sans font-bold text-lg md:text-xl text-foreground leading-snug group-hover:text-primary transition-colors">
                                {faq.question}
                            </h3>
                            <p className="md:w-1/2 font-sans text-muted-foreground leading-relaxed text-sm md:text-base">
                                {faq.answer}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
