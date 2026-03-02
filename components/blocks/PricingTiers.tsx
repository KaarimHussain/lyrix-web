"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
    {
        name: "Community",
        price: "Free",
        description: "For individuals and small open-source projects.",
        features: [
            "Local visual editor",
            "Unlimited blocks",
            "JSON serialization",
            "Community support",
        ],
        buttonText: "Start Building",
        buttonVariant: "outline" as const,
        highlight: false,
    },
    {
        name: "Pro",
        price: "$29",
        period: "/mo",
        description: "For professionals and growing teams doing real work.",
        features: [
            "Everything in Community",
            "Cloud sync & collaboration",
            "Version history (30 days)",
            "Priority email support",
            "Custom domains",
        ],
        buttonText: "Upgrade to Pro",
        buttonVariant: "default" as const,
        highlight: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "For large organizations with complex needs.",
        features: [
            "Everything in Pro",
            "Unlimited version history",
            "SSO & advanced security",
            "Dedicated account manager",
            "SLA guarantees",
        ],
        buttonText: "Contact Sales",
        buttonVariant: "outline" as const,
        highlight: false,
    },
];

export function PricingTiers() {
    return (
        <section className="relative py-16 md:py-24 bg-background">
            <div className="container-layout">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 * i }}
                            className={`relative flex flex-col p-8 rounded-2xl border transition-all duration-300 hover:glow-shadow ${tier.highlight
                                ? "bg-muted/30 border-primary"
                                : "bg-card border-border hover:border-primary/50"
                                }`}
                        >
                            {tier.highlight && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-foreground mb-2 mt-2">{tier.name}</h3>
                                <p className="text-sm text-muted-foreground min-h-[40px]">{tier.description}</p>
                            </div>

                            <div className="mb-8 flex items-baseline gap-1">
                                <span className="text-4xl md:text-5xl font-display font-medium tracking-tight text-foreground">
                                    {tier.price}
                                </span>
                                {tier.period && (
                                    <span className="text-sm font-mono text-muted-foreground">{tier.period}</span>
                                )}
                            </div>

                            <div className="flex-1">
                                <ul className="flex flex-col gap-4 mb-8">
                                    {tier.features.map((feature, j) => (
                                        <li key={j} className="flex items-start gap-3 text-sm text-foreground/80">
                                            <div className="mt-0.5 rounded-full bg-primary/20 p-0.5 flex-shrink-0">
                                                <Check className="w-3 h-3 text-primary" strokeWidth={3} />
                                            </div>
                                            <span className="leading-snug">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Button
                                variant={tier.buttonVariant}
                                className={`w-full py-6 mt-auto rounded-xl font-medium`}
                            >
                                {tier.buttonText}
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
