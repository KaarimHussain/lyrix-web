"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, ShieldCheck, Download, Box, LayoutPanelLeft, Database, Globe, Tag } from "lucide-react";
import { useState, useMemo } from "react";
import LyrixInput from "@/components/LyrixInput";

const plugins = [
    {
        name: "Supabase Auth",
        package: "@lyrix/auth-supabase",
        description: "Drop-in authentication blocks using Supabase GoTrue. Handles login, registration, and session management state natively.",
        icon: ShieldCheck,
        downloads: "124k",
        verified: true,
        category: "Auth",
        version: "v2.1.0",
        tags: ["identity", "oauth"]
    },
    {
        name: "Stripe Checkout",
        package: "@lyrix/pay-stripe",
        description: "PCI-compliant payment blocks. Compose pricing tables, one-click checkout flows, and customer portal links visually.",
        icon: Box,
        downloads: "89k",
        verified: true,
        category: "Monetization",
        version: "v1.4.2",
        tags: ["payments", "billing"]
    },
    {
        name: "Sanity CMS",
        package: "@lyrix/cms-sanity",
        description: "Map Sanity GROQ queries directly to Lyrix block props. Live preview support built-in for the studio.",
        icon: Database,
        downloads: "210k",
        verified: true,
        category: "Data",
        version: "v3.0.1",
        tags: ["content", "headless"]
    },
    {
        name: "Vercel Analytics",
        package: "@lyrix/analytics-vercel",
        description: "Zero-config analytics wrapper block. Automatically tracks page views and custom events emitted by other blocks.",
        icon: Globe,
        downloads: "340k",
        verified: true,
        category: "Analytics",
        version: "v1.0.5",
        tags: ["tracking", "metrics"]
    },
    {
        name: "Tailwind UI Core",
        package: "@lyrix/ui-tailwind",
        description: "A gigantic collection of un-styled, primitive blocks mapping directly to Tailwind UI's HTML structure.",
        icon: LayoutPanelLeft,
        downloads: "612k",
        verified: false,
        category: "UI",
        version: "v4.0.0",
        tags: ["components", "styling"]
    },
    {
        name: "Resend Email",
        package: "@lyrix/email-resend",
        description: "Contact form and newsletter capture blocks that hook directly into Resend's API without intermediate routes.",
        icon: ShieldCheck,
        downloads: "45k",
        verified: false,
        category: "Communication",
        version: "v1.1.0",
        tags: ["email", "forms"]
    },
];

const CATEGORIES = ["All", "Auth", "Data", "UI", "Analytics", "Monetization", "Communication"];

export function PluginGrid() {
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const handleCopy = (pkgName: string) => {
        navigator.clipboard.writeText(`npm install ${pkgName}`);
        setCopiedId(pkgName);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const filteredPlugins = useMemo(() => {
        return plugins.filter((plugin) => {
            const matchesCategory = activeCategory === "All" || plugin.category === activeCategory;
            const searchTerm = searchQuery.toLowerCase();
            const matchesSearch = 
                plugin.name.toLowerCase().includes(searchTerm) || 
                plugin.description.toLowerCase().includes(searchTerm) ||
                plugin.package.toLowerCase().includes(searchTerm) ||
                plugin.tags.some(tag => tag.toLowerCase().includes(searchTerm));
            
            return matchesCategory && matchesSearch;
        });
    }, [searchQuery, activeCategory]);

    return (
        <section className="relative py-16 md:py-24 bg-background z-10 w-full min-h-screen">
            <div className="container-layout max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Search & Filter Controls */}
                <div className="flex flex-col space-y-6 mb-12">
                    {/* Top Row: Search and Stats */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border pb-6">
                        <div className="w-full md:max-w-md relative">
                            <label htmlFor="plugin-search" className="sr-only">Search Plugins</label>
                                <LyrixInput 
                                    id="plugin-search"
                                    variant="search"
                                    placeholder="Search plugins, packages, or tags..." 
                                    className="h-12 w-full bg-muted/20 border-border focus-visible:ring-primary shadow-sm rounded-xl text-base"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    clearable
                                    onClear={() => setSearchQuery("")}
                                />
                        </div>
                        <div className="text-sm font-medium text-foreground whitespace-nowrap bg-muted/50 px-4 py-2 rounded-lg border border-border">
                            Showing <span className="text-primary font-mono font-bold mx-1">{filteredPlugins.length}</span> Plugins
                        </div>
                    </div>

                    {/* Bottom Row: Accessible Category Pills */}
                    <div className="flex flex-wrap gap-2 items-center" role="tablist" aria-label="Plugin Categories">
                        {CATEGORIES.map((category) => {
                            const isActive = activeCategory === category;
                            return (
                                <button
                                    key={category}
                                    role="tab"
                                    aria-selected={isActive}
                                    onClick={() => setActiveCategory(category)}
                                    className={`
                                        px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border
                                        ${isActive 
                                            ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-105' 
                                            : 'bg-background text-muted-foreground border-border hover:bg-muted hover:text-foreground hover:border-border/80'}
                                    `}
                                >
                                    {category}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* The Plugin Grid */}
                {filteredPlugins.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border rounded-2xl bg-muted/10">
                        <Box className="w-12 h-12 text-muted-foreground/50 mb-4" />
                        <h3 className="text-xl font-semibold text-foreground mb-2">No plugins found</h3>
                        <p className="text-muted-foreground max-w-md">
                            We couldn't find any plugins matching your search criteria. Try adjusting your filters or search query.
                        </p>
                        <button 
                            onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                            className="mt-6 text-primary hover:text-primary/80 font-medium underline underline-offset-4"
                        >
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredPlugins.map((plugin, i) => (
                                <motion.div
                                    layout
                                    key={plugin.package}
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3, delay: i * 0.03 }}
                                    className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 relative"
                                >
                                    {/* Top decorative gradient line */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-500" />
                                    
                                    <div className="p-6 flex flex-col h-full">
                                        {/* Header Area */}
                                        <div className="flex justify-between items-start mb-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center border border-border/50 group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors">
                                                    <plugin.icon className="w-6 h-6 text-foreground/70 group-hover:text-primary transition-colors" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg text-foreground flex items-center gap-2 tracking-tight">
                                                        {plugin.name}
                                                        {plugin.verified && (
                                                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center" title="Official Integration">
                                                                <Check className="w-3 h-3 text-emerald-500" strokeWidth={3} />
                                                            </span>
                                                        )}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mt-1">
                                                        <span>{plugin.version}</span>
                                                        <span>&bull;</span>
                                                        <span className="bg-muted px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider font-sans font-semibold">{plugin.category}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-sm text-muted-foreground leading-relaxed font-sans mb-6 flex-1">
                                            {plugin.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {plugin.tags.map(tag => (
                                                <span key={tag} className="inline-flex items-center gap-1 text-xs font-medium text-foreground/60 bg-muted/30 px-2.5 py-1 rounded-md border border-border/50">
                                                    <Tag className="w-3 h-3 opacity-50" />
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Footer / CTA Area */}
                                        <div className="flex flex-col border-t border-border/50 pt-5 mt-auto gap-4">
                                            <div className="flex items-center justify-between w-full text-xs font-medium text-muted-foreground">
                                                <div className="flex items-center gap-1.5">
                                                    <Download className="w-4 h-4" />
                                                    <span>{plugin.downloads} installs</span>
                                                </div>
                                            </div>

                                            <div
                                                className="flex items-center w-full bg-muted/20 border border-border rounded-lg overflow-hidden cursor-pointer hover:border-primary/40 focus-within:ring-2 focus-within:ring-primary transition-all group/cmd relative"
                                                onClick={() => handleCopy(plugin.package)}
                                                role="button"
                                                tabIndex={0}
                                                onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') handleCopy(plugin.package) }}
                                                aria-label={`Copy npm install command for ${plugin.name}`}
                                            >
                                                <div className="px-4 py-2.5 flex-1 text-xs font-mono text-foreground/90 truncate select-none">
                                                    npm i <span className="text-primary font-semibold">{plugin.package}</span>
                                                </div>
                                                <div className="bg-muted px-4 py-2.5 border-l border-border flex items-center justify-center flex-shrink-0 group-hover/cmd:bg-primary group-hover/cmd:border-primary transition-colors">
                                                    {copiedId === plugin.package ? (
                                                        <Check className="w-4 h-4 text-emerald-500 group-hover/cmd:text-white" />
                                                    ) : (
                                                        <Copy className="w-4 h-4 text-muted-foreground group-hover/cmd:text-white transition-colors" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </section>
    );
}
