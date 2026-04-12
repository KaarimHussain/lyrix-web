"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import {
    Blocks,
    Download,
    ExternalLink,
    Filter,
    Loader2,
    Puzzle,
    Search,
    ShieldCheck,
    Sparkles,
    Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

type InstalledPlugin = {
    id: string;
    name: string;
    category: "editor" | "ai" | "rendering" | "integration";
    version: string;
    status: "enabled" | "update_available";
    installs: string;
    description: string;
};

const installedPlugins: InstalledPlugin[] = [
    {
        id: "plugin_markdown",
        name: "Markdown Blocks",
        category: "editor",
        version: "1.4.0",
        status: "enabled",
        installs: "12k",
        description: "Write long-form docs and blog blocks with markdown shortcuts and live preview.",
    },
    {
        id: "plugin_ai-copy",
        name: "Lyrix AI Copy",
        category: "ai",
        version: "0.9.2",
        status: "update_available",
        installs: "8.7k",
        description: "Generate and refine content from prompts directly in the editor sidebar.",
    },
    {
        id: "plugin_schema",
        name: "JSON Schema Guard",
        category: "integration",
        version: "2.1.1",
        status: "enabled",
        installs: "5.1k",
        description: "Validate block payloads against schema rules before publishing.",
    },
    {
        id: "plugin_renderer",
        name: "Native Renderer Pack",
        category: "rendering",
        version: "1.2.5",
        status: "enabled",
        installs: "9.3k",
        description: "Performance-focused block renderers with hydration-safe defaults.",
    },
];

const categories = [
    { key: "all", label: "All" },
    { key: "editor", label: "Editor" },
    { key: "ai", label: "AI" },
    { key: "rendering", label: "Rendering" },
    { key: "integration", label: "Integration" },
] as const;

export default function DashboardPluginsPage() {
    const { data: session, status } = useSession();
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]["key"]>("all");

    const user = {
        name: session?.user?.name || "User",
        email: session?.user?.email || "",
        plan: "Community",
        avatar: session?.user?.name
            ? session.user.name
                .split(" ")
                .map((part: string) => part[0])
                .join("")
                .toUpperCase()
            : "U",
    };

    const filtered = useMemo(() => {
        const normalized = search.trim().toLowerCase();

        return installedPlugins.filter((plugin) => {
            const matchesCategory = activeCategory === "all" || plugin.category === activeCategory;
            const matchesSearch =
                !normalized ||
                plugin.name.toLowerCase().includes(normalized) ||
                plugin.description.toLowerCase().includes(normalized);
            return matchesCategory && matchesSearch;
        });
    }, [search, activeCategory]);

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center" role="status" aria-live="polite">
                <Loader2 className="w-8 h-8 animate-spin text-primary" aria-hidden="true" />
                <span className="sr-only">Loading plugins dashboard</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            <DashboardSidebar user={user} />

            <div className="flex-1 min-w-0 flex flex-col">
                <header className="sticky top-0 z-20 h-16 border-b border-border bg-background/90 backdrop-blur-md">
                    <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                            <h1 className="text-sm font-semibold text-foreground">Plugins</h1>
                            <span className="text-xs text-muted-foreground hidden sm:inline">
                                {installedPlugins.length} installed
                            </span>
                        </div>

                        <Link href="/plugins">
                            <Button size="sm" className="h-8 gap-1.5" aria-label="Browse plugin marketplace">
                                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                                Explore Marketplace
                            </Button>
                        </Link>
                    </div>
                </header>

                <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8 flex flex-col gap-7">
                    <section className="rounded-2xl border border-border bg-card p-5 sm:p-6 flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Plugin Health</p>
                                <h2 className="mt-1 text-xl sm:text-2xl font-semibold tracking-tight">Your extension stack is stable</h2>
                                <p className="mt-1 text-sm text-muted-foreground">1 plugin has an update available. Review and update when ready.</p>
                            </div>
                            <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <Metric label="Installed" value={installedPlugins.length} icon={Blocks} />
                            <Metric label="Enabled" value={installedPlugins.filter((p) => p.status === "enabled").length} icon={Zap} />
                            <Metric label="Updates" value={installedPlugins.filter((p) => p.status === "update_available").length} icon={Download} />
                            <Metric label="Categories" value={4} icon={Filter} />
                        </div>
                    </section>

                    <section className="flex flex-col gap-4">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                            <div className="relative w-full lg:w-72">
                                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                                <label htmlFor="plugins-search" className="sr-only">Search plugins</label>
                                <input
                                    id="plugins-search"
                                    type="search"
                                    placeholder="Search installed plugins"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    className="h-10 w-full rounded-lg border border-border bg-muted/40 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                            </div>

                            <div className="flex items-center gap-2 overflow-x-auto pb-1">
                                {categories.map((category) => (
                                    <button
                                        key={category.key}
                                        type="button"
                                        onClick={() => setActiveCategory(category.key)}
                                        className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${activeCategory === category.key
                                                ? "border-primary/30 bg-primary/10 text-primary"
                                                : "border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted/40"
                                            }`}
                                    >
                                        {category.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {filtered.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-7 text-center">
                                <p className="text-sm font-medium text-foreground">No plugins match your filters.</p>
                                <p className="mt-1 text-xs text-muted-foreground">Try another keyword or category.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                                {filtered.map((plugin) => (
                                    <article
                                        key={plugin.id}
                                        className="rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <h3 className="text-base font-semibold truncate">{plugin.name}</h3>
                                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{plugin.description}</p>
                                            </div>
                                            <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider ${plugin.status === "enabled"
                                                    ? "border-primary/20 bg-primary/10 text-primary"
                                                    : "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                                }`}>
                                                {plugin.status === "enabled" ? "Enabled" : "Update"}
                                            </span>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1.5">
                                                <Puzzle className="w-3.5 h-3.5" />
                                                {plugin.category}
                                            </span>
                                            <span className="font-mono">v{plugin.version}</span>
                                            <span>{plugin.installs} installs</span>
                                        </div>

                                        <div className="mt-4 pt-3 border-t border-border/70 flex items-center justify-between">
                                            <button className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                                                Configure
                                            </button>
                                            <button className="text-xs font-medium text-primary hover:opacity-80 transition-opacity flex items-center gap-1">
                                                Open Docs
                                                <ExternalLink className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
}

function Metric({
    label,
    value,
    icon: Icon,
}: {
    label: string;
    value: number;
    icon: React.ElementType;
}) {
    return (
        <article className="rounded-xl border border-border bg-background/60 p-3">
            <div className="flex items-center justify-between">
                <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">{label}</p>
                <Icon className="w-3.5 h-3.5 text-muted-foreground/70" />
            </div>
            <p className="mt-2 text-2xl font-bold font-display tracking-tight">{value}</p>
        </article>
    );
}
