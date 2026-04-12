"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { ArrowLeft, Bell, CheckCheck, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

type NotificationRecord = {
    id: string;
    title: string;
    message: string;
    time: string;
    category: "security" | "project" | "plugin";
    unread: boolean;
};

const notifications: NotificationRecord[] = [
    {
        id: "n1",
        title: "Project published",
        message: "Personal Portfolio was successfully published to kaarim.dev.",
        time: "2m ago",
        category: "project",
        unread: true,
    },
    {
        id: "n2",
        title: "Plugin update available",
        message: "Lyrix AI Copy v1.0.0 is available and ready to update.",
        time: "1h ago",
        category: "plugin",
        unread: true,
    },
    {
        id: "n3",
        title: "Security check complete",
        message: "No suspicious login attempts were detected in the last 24 hours.",
        time: "Yesterday",
        category: "security",
        unread: false,
    },
];

function badgeClass(category: NotificationRecord["category"]) {
    if (category === "project") return "border-primary/20 bg-primary/10 text-primary";
    if (category === "plugin") return "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400";
    return "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
}

export default function NotificationsPage() {
    const { data: session, status } = useSession();

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

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center" role="status" aria-live="polite">
                <Loader2 className="w-8 h-8 animate-spin text-primary" aria-hidden="true" />
                <span className="sr-only">Loading notifications</span>
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
                            <h1 className="text-sm font-semibold text-foreground">Notifications</h1>
                            <span className="text-xs text-muted-foreground hidden sm:inline">
                                {notifications.filter((n) => n.unread).length} unread
                            </span>
                        </div>
                        <Link href="/dashboard">
                            <Button variant="outline" size="sm" className="h-8 gap-1.5">
                                <ArrowLeft className="w-3.5 h-3.5" />
                                Back to Dashboard
                            </Button>
                        </Link>
                    </div>
                </header>

                <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                    <section className="rounded-2xl border border-border bg-card p-5 sm:p-6 mb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Inbox</p>
                                <h2 className="text-2xl font-semibold tracking-tight mt-1">Stay on top of workspace activity</h2>
                                <p className="text-sm text-muted-foreground mt-1">Project events, plugin updates, and security alerts all in one place.</p>
                            </div>
                            <Button variant="outline" size="sm" className="h-9 gap-2 w-fit">
                                <CheckCheck className="w-4 h-4" />
                                Mark all as read
                            </Button>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-border bg-card overflow-hidden">
                        {notifications.map((item, index) => (
                            <article
                                key={item.id}
                                className={`px-5 py-4 sm:px-6 ${index < notifications.length - 1 ? "border-b border-border" : ""}`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`mt-1 h-2.5 w-2.5 rounded-full ${item.unread ? "bg-primary" : "bg-muted-foreground/30"}`} />
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between gap-3">
                                            <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                                            <time className="text-[10px] font-mono text-muted-foreground">{item.time}</time>
                                        </div>
                                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.message}</p>
                                        <div className="mt-3 flex items-center gap-2">
                                            <span className={`rounded-full border px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider ${badgeClass(item.category)}`}>
                                                {item.category}
                                            </span>
                                            {item.category === "security" && <ShieldCheck className="w-3.5 h-3.5 text-muted-foreground" />}
                                            {item.category === "project" && <Bell className="w-3.5 h-3.5 text-muted-foreground" />}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </section>
                </main>
            </div>
        </div>
    );
}
