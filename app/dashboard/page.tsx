"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
    Plus,
    Globe,
    Clock,
    MoreHorizontal,
    Blocks,
    FileJson,
    Zap,
    ArrowUpRight,
    Search,
    Bell,
    Settings,
    ChevronRight,
    Activity,
    Layers,
    LogOut,
    Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const projects = [
    {
        id: "proj_01",
        name: "Personal Portfolio",
        slug: "personal-portfolio",
        url: "kaarim.dev",
        blocks: 12,
        pages: 4,
        lastUpdated: "2 hours ago",
        status: "live",
    },
    {
        id: "proj_02",
        name: "Acme Corp Landing",
        slug: "acme-corp",
        url: "acmecorp.io",
        blocks: 34,
        pages: 9,
        lastUpdated: "Yesterday",
        status: "live",
    },
    {
        id: "proj_03",
        name: "Nexus SaaS",
        slug: "nexus-saas",
        url: "nexus.app",
        blocks: 7,
        pages: 2,
        lastUpdated: "3 days ago",
        status: "draft",
    },
    {
        id: "proj_04",
        name: "Blog Template",
        slug: "blog-template",
        url: "—",
        blocks: 5,
        pages: 1,
        lastUpdated: "1 week ago",
        status: "draft",
    },
];

const recentActivity = [
    { action: "Published page", target: "Home", project: "Personal Portfolio", time: "2h ago" },
    { action: "Added block", target: "HeroBlock", project: "Acme Corp Landing", time: "5h ago" },
    { action: "Created project", target: "Nexus SaaS", project: "Nexus SaaS", time: "3d ago" },
];

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function Sidebar({ user }: { user: any }) {
    return (
        <aside className="hidden md:flex flex-col w-[220px] shrink-0 border-r border-border bg-background h-screen sticky top-0">
            {/* Logo */}
            <div className="h-16 flex items-center px-5 border-b border-border">
                <Link href="/">
                    <Logo height={36} width={36} text="Lyrix" textClassName="text-lg font-bold" />
                </Link>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
                <SidebarLink href="/dashboard" icon={Layers} label="Projects" active />
                <SidebarLink href="/dashboard/settings" icon={Settings} label="Settings" />
            </nav>

            {/* User */}
            <div className="border-t border-border p-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                        {user.avatar}
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-foreground truncate">{user.name}</span>
                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{user.plan}</span>
                    </div>
                </div>
                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full"
                >
                    <LogOut className="w-4 h-4" />
                    Sign out
                </button>
            </div>
        </aside>
    );
}

function SidebarLink({
    href,
    icon: Icon,
    label,
    active,
}: {
    href: string;
    icon: React.ElementType;
    label: string;
    active?: boolean;
}) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
        >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
        </Link>
    );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
    return (
        <div className="group flex flex-col gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                    <h3 className="font-semibold text-foreground text-base leading-tight">
                        {project.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                        <Globe className="w-3 h-3" />
                        {project.url}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span
                        className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${project.status === "live"
                                ? "bg-primary/10 text-primary border-primary/20"
                                : "bg-muted text-muted-foreground border-border"
                            }`}
                    >
                        {project.status}
                    </span>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-muted text-muted-foreground">
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Blocks className="w-3.5 h-3.5" />
                    <span>{project.blocks} blocks</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <FileJson className="w-3.5 h-3.5" />
                    <span>{project.pages} pages</span>
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-border/60">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{project.lastUpdated}</span>
                </div>
                <Link
                    href={`/dashboard/projects/${project.slug}`}
                    className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                >
                    Open
                    <ArrowUpRight className="w-3 h-3" />
                </Link>
            </div>
        </div>
    );
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const [search, setSearch] = useState("");

    if (status === "loading") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    const user = {
        name: session?.user?.name || "User",
        email: session?.user?.email || "",
        plan: "Community",
        avatar: session?.user?.name ? session.user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase() : "U",
    };

    const filtered = projects.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <Sidebar user={user} />

            {/* Main */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Topbar */}
                <header className="h-16 border-b border-border flex items-center justify-between px-6 sticky top-0 bg-background/80 backdrop-blur-md z-10">
                    <h1 className="text-sm font-semibold text-foreground">Projects</h1>
                    <div className="flex items-center gap-3">
                        <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                            <Bell className="w-4 h-4" />
                        </button>
                        <Button size="sm" className="h-8 gap-1.5">
                            <Plus className="w-3.5 h-3.5" />
                            New Project
                        </Button>
                    </div>
                </header>

                <main className="flex-1 p-6 md:p-8 flex flex-col gap-8 max-w-6xl mx-auto w-full">

                    {/* Welcome */}
                    <div className="flex flex-col gap-1">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">
                            Good morning, {user.name.split(" ")[0]} 👋
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            You have {projects.length} projects. {projects.filter((p: any) => p.status === "live").length} are live.
                        </p>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: "Total Projects", value: projects.length, icon: Layers },
                            { label: "Live Sites", value: projects.filter((p: any) => p.status === "live").length, icon: Zap },
                            { label: "Total Blocks", value: projects.reduce((a: number, p: any) => a + p.blocks, 0), icon: Blocks },
                            { label: "Total Pages", value: projects.reduce((a: number, p: any) => a + p.pages, 0), icon: FileJson },
                        ].map((stat) => (
                            <div key={stat.label} className="flex flex-col gap-3 p-4 rounded-xl bg-card border border-border">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                                        {stat.label}
                                    </span>
                                    <stat.icon className="w-3.5 h-3.5 text-muted-foreground/50" />
                                </div>
                                <span className="text-3xl font-bold font-display tracking-tight text-foreground">
                                    {stat.value}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Projects + Activity grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">

                        {/* Projects */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-foreground">Your Projects</h3>
                                {/* Search */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                                    <input
                                        type="text"
                                        placeholder="Search projects..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="h-8 pl-8 pr-3 text-xs bg-muted/40 border border-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground w-44"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {filtered.map((p) => (
                                    <ProjectCard key={p.id} project={p} />
                                ))}

                                {/* New Project CTA */}
                                <button className="flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 border-dashed border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group min-h-[160px]">
                                    <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                        <Plus className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                        New Project
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
                                <Activity className="w-3.5 h-3.5 text-muted-foreground/50" />
                            </div>
                            <div className="flex flex-col gap-0 rounded-2xl bg-card border border-border overflow-hidden">
                                {recentActivity.map((item, i) => (
                                    <div
                                        key={i}
                                        className={`flex flex-col gap-1 p-4 ${i < recentActivity.length - 1 ? "border-b border-border" : ""
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-medium text-foreground">
                                                {item.action}
                                            </span>
                                            <span className="text-[10px] font-mono text-muted-foreground">
                                                {item.time}
                                            </span>
                                        </div>
                                        <span className="text-[11px] text-muted-foreground">
                                            <span className="text-primary font-mono">{item.target}</span>
                                            {" "}&mdash; {item.project}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Upgrade CTA for Community plan */}
                            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-4 flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-primary" />
                                    <span className="text-xs font-semibold text-foreground">Community Plan</span>
                                </div>
                                <p className="text-[11px] text-muted-foreground leading-relaxed">
                                    Upgrade to Pro for cloud sync, version history, and team collaboration.
                                </p>
                                <Link href="/pricing">
                                    <Button size="sm" className="w-full h-8 text-xs gap-1">
                                        Upgrade to Pro
                                        <ChevronRight className="w-3 h-3" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}