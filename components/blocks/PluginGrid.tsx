"use client";

import { motion } from "framer-motion";
import { Check, Copy, ShieldCheck, Download, Box, LayoutPanelLeft, Database, Globe } from "lucide-react";
import { useState } from "react";

const plugins = [
    {
        name: "Supabase Auth",
        package: "@lyrix/auth-supabase",
        description: "Drop-in authentication blocks using Supabase GoTrue. Handles login, registration, and session management state natively.",
        icon: ShieldCheck,
        downloads: "124k",
        verified: true,
    },
    {
        name: "Stripe Checkout",
        package: "@lyrix/pay-stripe",
        description: "PCI-compliant payment blocks. Compose pricing tables, one-click checkout flows, and customer portal links visually.",
        icon: Box,
        downloads: "89k",
        verified: true,
    },
    {
        name: "Sanity CMS",
        package: "@lyrix/cms-sanity",
        description: "Map Sanity GROQ queries directly to Lyrix block props. Live preview support built-in for the studio.",
        icon: Database,
        downloads: "210k",
        verified: true,
    },
    {
        name: "Vercel Analytics",
        package: "@lyrix/analytics-vercel",
        description: "Zero-config analytics wrapper block. Automatically tracks page views and custom events emitted by other blocks.",
        icon: Globe,
        downloads: "340k",
        verified: true,
    },
    {
        name: "Tailwind UI Core",
        package: "@lyrix/ui-tailwind",
        description: "A gigantic collection of un-styled, primitive blocks mapping directly to Tailwind UI's HTML structure.",
        icon: LayoutPanelLeft,
        downloads: "612k",
        verified: false,
    },
    {
        name: "Resend Email",
        package: "@lyrix/email-resend",
        description: "Contact form and newsletter capture blocks that hook directly into Resend's API without intermediate routes.",
        icon: ShieldCheck,
        downloads: "45k",
        verified: false,
    },
];

export function PluginGrid() {
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopy = (pkgName: string) => {
        navigator.clipboard.writeText(`npm install ${pkgName}`);
        setCopiedId(pkgName);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <section className="relative py-16 md:py-24 bg-background z-10">
            <div className="container-layout max-w-5xl mx-auto">

                {/* Controls / Filter Bar Mimic */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 border-b border-border pb-6 gap-4">
                    <div className="text-sm font-medium text-foreground">
                        Showing <span className="text-primary font-mono ml-1">{plugins.length}</span> Official Plugins
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground font-mono">
                        <span className="text-foreground border-b border-foreground pb-1 cursor-pointer">All</span>
                        <span className="cursor-pointer hover:text-foreground transition-colors">Auth</span>
                        <span className="cursor-pointer hover:text-foreground transition-colors">Data</span>
                        <span className="cursor-pointer hover:text-foreground transition-colors">UI</span>
                    </div>
                </div>

                {/* The Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {plugins.map((plugin, i) => {
                        return (
                            <motion.div
                                key={plugin.package}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                                className="group flex flex-col bg-card border border-border rounded-xl p-6 transition-colors hover:border-primary/50"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center border border-white/5">
                                            <plugin.icon className="w-5 h-5 text-foreground/80" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                                                {plugin.name}
                                                {plugin.verified && (
                                                    <span className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center" title="Official Integration">
                                                        <Check className="w-2.5 h-2.5 text-primary" strokeWidth={3} />
                                                    </span>
                                                )}
                                            </h3>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-sm text-muted-foreground leading-relaxed font-sans mb-8 flex-1">
                                    {plugin.description}
                                </p>

                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mt-auto">
                                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                                        <Download className="w-3.5 h-3.5" />
                                        <span>{plugin.downloads} installs</span>
                                    </div>

                                    <div
                                        className="flex items-center w-full sm:w-auto bg-muted/30 border border-border rounded-md overflow-hidden cursor-pointer hover:border-border/80 transition-colors"
                                        onClick={() => handleCopy(plugin.package)}
                                    >
                                        <div className="px-3 py-1.5 text-xs font-mono text-foreground/80 truncate max-w-[180px] select-none">
                                            npm i {plugin.package}
                                        </div>
                                        <div className="bg-muted px-3 py-1.5 border-l border-border flex items-center justify-center flex-shrink-0">
                                            {copiedId === plugin.package ? (
                                                <Check className="w-3.5 h-3.5 text-primary" />
                                            ) : (
                                                <Copy className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
