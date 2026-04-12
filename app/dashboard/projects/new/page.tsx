"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
    ArrowLeft,
    Crown,
    FileCode2,
    Globe,
    Loader2,
    Sparkles,
    Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { useNotification } from "@/components/providers/notification-provider";

type ProjectType = "website" | "landing" | "docs" | "app";
type Environment = "development" | "staging" | "production";

const projectTypeOptions: { key: ProjectType; title: string; description: string; icon: React.ElementType }[] = [
    { key: "website", title: "Website", description: "Multi-page marketing or content site.", icon: Globe },
    { key: "landing", title: "Landing Page", description: "Single conversion-focused campaign page.", icon: Sparkles },
    { key: "docs", title: "Documentation", description: "Structured docs with versioned content.", icon: FileCode2 },
    { key: "app", title: "Web App UI", description: "Product interface and feature surfaces.", icon: Users },
];

export default function NewProjectPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { notify } = useNotification();

    const [projectName, setProjectName] = useState("");
    const [slug, setSlug] = useState("");
    const [projectType, setProjectType] = useState<ProjectType>("website");
    const [environment, setEnvironment] = useState<Environment>("development");
    const [enableVersioning, setEnableVersioning] = useState(true);
    const [enableTeamCollab, setEnableTeamCollab] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const normalizedSlug = useMemo(() => {
        if (slug.trim()) return slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
        return projectName.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
    }, [slug, projectName]);

    const handleCreateProject = async () => {
        if (isSubmitting) return;

        if (!projectName.trim()) {
            notify({
                type: "error",
                title: "Project name required",
                description: "Please enter a project name before creating your project.",
            });
            return;
        }

        if (!normalizedSlug) {
            notify({
                type: "error",
                title: "Invalid slug",
                description: "Please provide a valid project slug.",
            });
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: projectName.trim(),
                    slug: normalizedSlug,
                    type: projectType,
                    environment,
                    enableVersioning,
                    enableTeamCollab,
                }),
            });

            let payload: { error?: string; project?: { slug?: string } } = {};
            try {
                payload = await response.json();
            } catch {
                payload = {};
            }

            if (!response.ok) {
                notify({
                    type: "error",
                    title: "Project creation failed",
                    description: payload.error || "Please check your input and try again.",
                });
                return;
            }

            notify({
                type: "success",
                title: "Project created",
                description: "Your new project is ready.",
            });

            router.push("/dashboard");
            router.refresh();
        } catch {
            notify({
                type: "error",
                title: "Connection issue",
                description: "We couldn't create your project due to a network error. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center" role="status" aria-live="polite">
                <Loader2 className="w-8 h-8 animate-spin text-primary" aria-hidden="true" />
                <span className="sr-only">Loading new project page</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            <DashboardSidebar user={user} />

            <div className="flex-1 min-w-0 flex flex-col">
                <header className="sticky top-0 z-20 h-16 border-b border-border bg-background/90 backdrop-blur-md">
                    <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <h1 className="text-sm font-semibold">Create Project</h1>
                        </div>
                        <Link href="/dashboard">
                            <Button variant="outline" size="sm" className="h-8 gap-1.5">
                                <ArrowLeft className="w-3.5 h-3.5" />
                                Back
                            </Button>
                        </Link>
                    </div>
                </header>

                <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                    <section className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-7 max-w-4xl">
                        <div>
                            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Step 1</p>
                            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mt-1">Project Identity</h2>
                            <p className="text-sm text-muted-foreground mt-1">These fields map directly to project metadata and routing keys.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label htmlFor="project-name" className="text-sm font-medium">Project Name</label>
                                <input
                                    id="project-name"
                                    type="text"
                                    value={projectName}
                                    onChange={(event) => setProjectName(event.target.value)}
                                    placeholder="Acme Marketing Site"
                                    className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label htmlFor="project-slug" className="text-sm font-medium">Project Slug</label>
                                <input
                                    id="project-slug"
                                    type="text"
                                    value={slug}
                                    onChange={(event) => setSlug(event.target.value)}
                                    placeholder="acme-marketing-site"
                                    className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                            </div>
                        </div>

                        <div className="rounded-xl border border-border bg-muted/20 px-3 py-2">
                            <p className="text-xs text-muted-foreground">
                                Generated route key:
                                <span className="font-mono text-foreground ml-2">/{normalizedSlug || "your-project-slug"}</span>
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Step 2</p>
                            <h3 className="text-lg font-semibold mb-1">Project Type</h3>
                            <p className="text-sm text-muted-foreground mb-4">Select a type to pre-configure recommended structure and defaults.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {projectTypeOptions.map((option) => (
                                    <button
                                        key={option.key}
                                        type="button"
                                        onClick={() => setProjectType(option.key)}
                                        className={`rounded-xl border p-4 text-left transition-all ${projectType === option.key
                                                ? "border-primary/30 bg-primary/10"
                                                : "border-border bg-background hover:border-border/70"
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <option.icon className="w-4 h-4" />
                                            <p className="text-sm font-semibold">{option.title}</p>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-2">{option.description}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">Step 3</p>
                                <h3 className="text-base font-semibold mb-3">Default Environment</h3>
                                <div className="space-y-2">
                                    {[
                                        { key: "development", label: "Development" },
                                        { key: "staging", label: "Staging" },
                                        { key: "production", label: "Production" },
                                    ].map((env) => (
                                        <button
                                            key={env.key}
                                            type="button"
                                            onClick={() => setEnvironment(env.key as Environment)}
                                            className={`w-full rounded-lg border px-3 py-2 text-sm text-left transition-colors ${environment === env.key
                                                    ? "border-primary/30 bg-primary/10 text-primary"
                                                    : "border-border bg-background hover:bg-muted/40"
                                                }`}
                                        >
                                            {env.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">Step 4</p>
                            <h3 className="text-base font-semibold mb-3">Feature Flags</h3>
                            <div className="space-y-2">
                                <ToggleRow
                                    label="Enable version history"
                                    description="Track and restore content states."
                                    enabled={enableVersioning}
                                    onToggle={() => setEnableVersioning((prev) => !prev)}
                                />
                                <ToggleRow
                                    label="Enable team collaboration"
                                    description="Prepare multi-user roles and workspace sharing."
                                    enabled={enableTeamCollab}
                                    onToggle={() => setEnableTeamCollab((prev) => !prev)}
                                    premium
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 pt-2">
                            <Button
                                className="h-10 px-5"
                                onClick={handleCreateProject}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    "Create Project"
                                )}
                            </Button>
                            <Button
                                variant="outline"
                                className="h-10 px-5"
                                onClick={handleCreateProject}
                                disabled={isSubmitting}
                            >
                                Save as Draft
                            </Button>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

function ToggleRow({
    label,
    description,
    enabled,
    onToggle,
    premium = false,
}: {
    label: string;
    description: string;
    enabled: boolean;
    onToggle: () => void;
    premium?: boolean;
}) {
    return (
        <button
            type="button"
            onClick={onToggle}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 flex items-center justify-between gap-3 text-left hover:bg-muted/30 transition-colors"
        >
            <div>
                <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{label}</p>
                    {premium && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                            <Crown className="h-3 w-3" />
                            Pro
                        </span>
                    )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
            </div>
            <span className={`h-6 w-10 rounded-full relative transition-colors ${enabled ? "bg-primary" : "bg-muted"}`}>
                <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${enabled ? "translate-x-5" : "translate-x-1"}`} />
            </span>
        </button>
    );
}
