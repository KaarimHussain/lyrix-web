"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import {
  ArrowLeft,
  ArrowUpRight,
  Blocks,
  CalendarDays,
  CheckCircle2,
  Edit3,
  FileJson,
  Globe,
  Loader2,
  PencilRuler,
  RefreshCw,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { useNotification } from "@/components/providers/notification-provider";

type ProjectDetail = {
  _id: string;
  name: string;
  slug: string;
  type: "website" | "landing" | "docs" | "app";
  environment: "development" | "staging" | "production";
  status: "draft" | "live";
  url?: string | null;
  enableVersioning: boolean;
  enableTeamCollab: boolean;
  blocksCount: number;
  pagesCount: number;
  createdAt: string;
  updatedAt: string;
};

export default function ProjectDetailsPage() {
  const { data: session, status } = useSession();
  const { notify } = useNotification();
  const params = useParams<{ id: string }>();
  const projectId = params?.id;

  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const fetchProject = useCallback(
    async (showToastOnError = false) => {
      if (!projectId) return;

      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/projects/${projectId}`, {
          method: "GET",
          cache: "no-store",
        });

        let payload: { project?: ProjectDetail; error?: string } = {};
        try {
          payload = await response.json();
        } catch {
          payload = {};
        }

        if (!response.ok) {
          const message = payload.error || "Failed to load project details.";
          setError(message);
          if (showToastOnError) {
            notify({
              type: "error",
              title: "Could not load project",
              description: message,
            });
          }
          return;
        }

        setProject(payload.project || null);
      } catch {
        const message =
          "Network error while loading this project. Check your connection and try again.";
        setError(message);
        if (showToastOnError) {
          notify({
            type: "error",
            title: "Connection issue",
            description: message,
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [notify, projectId]
  );

  useEffect(() => {
    void fetchProject(false);
  }, [fetchProject]);

  const createdLabel = useMemo(() => {
    if (!project?.createdAt) return "-";
    return new Date(project.createdAt).toLocaleString();
  }, [project?.createdAt]);

  const updatedLabel = useMemo(() => {
    if (!project?.updatedAt) return "-";
    return new Date(project.updatedAt).toLocaleString();
  }, [project?.updatedAt]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center" role="status" aria-live="polite">
        <Loader2 className="w-8 h-8 animate-spin text-primary" aria-hidden="true" />
        <span className="sr-only">Loading project</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <DashboardSidebar user={user} />

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-20 h-16 border-b border-border bg-background/90 backdrop-blur-md">
          <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            <h1 className="text-sm font-semibold">Project Details</h1>
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="h-8 gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Projects
              </Button>
            </Link>
          </div>
        </header>

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          {loading ? (
            <div className="rounded-2xl border border-border bg-card p-10 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading project details...
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
              <p className="text-sm font-semibold text-destructive">Could not load project</p>
              <p className="text-xs text-destructive/85 mt-1">{error}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 h-8 gap-1.5"
                onClick={() => {
                  void fetchProject(true);
                }}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retry
              </Button>
            </div>
          ) : !project ? (
            <div className="rounded-2xl border border-border bg-card p-10 text-center">
              <p className="text-sm font-semibold">Project not found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-6">
              <section className="rounded-2xl border border-border bg-card p-6 space-y-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">{project.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground font-mono">/{project.slug}</p>
                  </div>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest font-mono ${
                      project.status === "live"
                        ? "border-primary/20 bg-primary/10 text-primary"
                        : "border-border bg-muted text-muted-foreground"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link href={`/dashboard/projects/${project._id}/edit`}>
                    <Button size="sm" className="h-8 gap-1.5">
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit Project
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button variant="outline" size="sm" className="h-8 gap-1.5">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      Open Dashboard
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <InfoRow icon={Globe} label="Type" value={project.type} />
                  <InfoRow icon={ShieldCheck} label="Environment" value={project.environment} />
                  <InfoRow icon={Blocks} label="Blocks" value={String(project.blocksCount)} />
                  <InfoRow icon={FileJson} label="Pages" value={String(project.pagesCount)} />
                  <InfoRow icon={CalendarDays} label="Created" value={createdLabel} />
                  <InfoRow icon={CalendarDays} label="Updated" value={updatedLabel} />
                </div>

                <section className="rounded-xl border border-border bg-background/70 p-4">
                  <h3 className="text-sm font-semibold">Project Summary</h3>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      Internal ID: <span className="font-mono text-foreground">{project._id}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      Project route slug: <span className="font-mono text-foreground">{project.slug}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      Current environment is <span className="font-semibold text-foreground">{project.environment}</span>
                    </li>
                  </ul>
                </section>
              </section>

              <aside className="space-y-4">
                <section className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold">Feature Flags</h3>
                  <div className="mt-4 space-y-2 text-sm">
                    <FlagRow label="Version history" enabled={project.enableVersioning} />
                    <FlagRow label="Team collaboration" enabled={project.enableTeamCollab} icon={Users} />
                  </div>
                  <div className="mt-5 border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground">
                      Project URL: <span className="font-mono text-foreground">{project.url?.trim() || "-"}</span>
                    </p>
                  </div>
                </section>

                <section className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold">Quick Actions</h3>
                  <div className="mt-3 space-y-2">
                    <Link href={`/dashboard/projects/${project._id}/edit`} className="block">
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <Edit3 className="h-4 w-4" />
                        Edit Configuration
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                      onClick={() => {
                        const nextStatus = project.status === "live" ? "draft" : "live";
                        notify({
                          type: "info",
                          title: "Status action available",
                          description: `Use the dashboard card menu to move this project to ${nextStatus}.`,
                        });
                      }}
                    >
                      <PencilRuler className="h-4 w-4" />
                      Toggle Status
                    </Button>
                  </div>
                </section>
              </aside>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-background/60 px-3 py-2.5">
      <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">{label}</p>
      <div className="mt-1 flex items-center gap-2">
        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

function FlagRow({
  label,
  enabled,
  icon: Icon,
}: {
  label: string;
  enabled: boolean;
  icon?: React.ElementType;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2">
      <div className="flex items-center gap-2">
        {Icon ? <Icon className="h-3.5 w-3.5 text-muted-foreground" /> : null}
        <span>{label}</span>
      </div>
      <span
        className={`rounded-full border px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider ${
          enabled
            ? "border-primary/20 bg-primary/10 text-primary"
            : "border-border bg-muted text-muted-foreground"
        }`}
      >
        {enabled ? "Enabled" : "Disabled"}
      </span>
    </div>
  );
}