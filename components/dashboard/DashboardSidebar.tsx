"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Blocks, BookOpen, Layers, LogOut, Settings } from "lucide-react";
import { signOut } from "next-auth/react";
import Logo from "@/components/logo";

export type SidebarUser = {
    name: string;
    email?: string;
    plan: string;
    avatar: string;
};

const sidebarLinks = [
    { href: "/dashboard", label: "Projects", icon: Layers, exact: true },
    { href: "/dashboard/plugins", label: "Plugins", icon: Blocks },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

function isActivePath(pathname: string, href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardSidebar({
    user,
    showSignOut = true,
}: {
    user: SidebarUser;
    showSignOut?: boolean;
}) {
    const pathname = usePathname();

    return (
        <aside
            aria-label="Dashboard sidebar"
            className="hidden md:flex md:w-[240px] lg:w-[260px] shrink-0 flex-col border-r border-border bg-background"
        >
            <div className="sticky top-0 flex h-screen flex-col">
                <div className="h-16 border-b border-border px-5 flex items-center">
                    <Link href="/" aria-label="Go to homepage">
                        <Logo height={36} width={36} text="Lyrix" textClassName="text-lg font-bold" />
                    </Link>
                </div>

                <div className="px-4 pt-5 pb-2">
                    <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Workspace</p>
                </div>

                <nav aria-label="Sidebar navigation" className="flex-1 px-3 py-1 flex flex-col gap-1">
                    {sidebarLinks.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            aria-current={isActivePath(pathname, item.href, item.exact) ? "page" : undefined}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isActivePath(pathname, item.href, item.exact)
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                }`}
                        >
                            <item.icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="px-3 pb-3">
                    <Link
                        href="/docs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        <BookOpen className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Docs</span>
                    </Link>
                </div>

                <div className="border-t border-border p-4 flex flex-col gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                            {user.avatar}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-medium text-foreground truncate">{user.name}</span>
                            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                                {user.plan}
                            </span>
                        </div>
                    </div>

                    {showSignOut && (
                        <button
                            type="button"
                            onClick={() => signOut({ callbackUrl: "/login" })}
                            className="w-full rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring flex items-center gap-2"
                            aria-label="Sign out"
                        >
                            <LogOut className="w-4 h-4" aria-hidden="true" />
                            Sign out
                        </button>
                    )}
                </div>
            </div>
        </aside>
    );
}
