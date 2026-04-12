"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Activity,
  ArrowUpRight,
  Bell,
  Blocks,
  Copy,
  ChevronLeft,
  ChevronRight,
  Clock,
  Edit3,
  FileJson,
  Globe,
  Layers,
  Loader2,
  MoreHorizontal,
  PencilRuler,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { useNotification } from "@/components/providers/notification-provider";

type ApiProject = {
  _id: string;
  name: string;
  slug: string;
  url?: string | null;
  status: "live" | "draft";
  blocksCount: number;
  pagesCount: number;
  updatedAt: string;
};

type ApiProjectsPayload = {
  projects?: ApiProject[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  stats?: {
    totalProjects: number;
    liveProjects: number;
    totalBlocks: number;
    totalPages: number;
  };
  error?: string;
};

type Project = {
  id: string;
  name: string;
  slug: string;
  url: string;
  blocks: number;
  pages: number;
  lastUpdated: string;
  status: "live" | "draft";
};

type ActivityItem = {
  action: string;
  target: string;
  project: string;
  time: string;
};

type DashboardUser = {
  name: string;
  email: string;
  plan: string;
  avatar: string;
};

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
};

const PAGE_SIZE = 6;

const recentActivity: ActivityItem[] = [
  {
    action: "Published page",
    target: "Home",
    project: "Personal Portfolio",
    time: "2h ago",
  },
  {
    action: "Added block",
    target: "HeroBlock",
    project: "Acme Corp Landing",
    time: "5h ago",
  },
  {
    action: "Created project",
    target: "Nexus SaaS",
    project: "Nexus SaaS",
    time: "3d ago",
  },
];

const notifications: NotificationItem[] = [
  {
    id: "notif_01",
    title: "Project published",
    message: "Personal Portfolio is now live on your domain.",
    time: "2m ago",
    unread: true,
  },
  {
    id: "notif_02",
    title: "Plugin update available",
    message: "Lyrix AI Copy has a new version ready to install.",
    time: "1h ago",
    unread: true,
  },
  {
    id: "notif_03",
    title: "Security check complete",
    message: "No suspicious sign-ins were detected in the last 24 hours.",
    time: "Yesterday",
    unread: false,
  },
];

function formatRelativeTime(input: string): string {
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return "Just now";

  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString();
}

function mapApiProject(project: ApiProject): Project {
  return {
    id: project._id,
    name: project.name,
    slug: project.slug,
    url: project.url?.trim() ? project.url : "-",
    blocks: project.blocksCount ?? 0,
    pages: project.pagesCount ?? 0,
    lastUpdated: formatRelativeTime(project.updatedAt),
    status: project.status,
  };
}

function ProjectCard({
  project,
  onDelete,
  onToggleStatus,
  onCopyId,
}: {
  project: Project;
  onDelete: (project: Project) => void;
  onToggleStatus: (project: Project) => void;
  onCopyId: (project: Project) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onOutsideClick = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, []);

  return (
    <article className="group rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 focus-within:border-primary/40 focus-within:shadow-lg focus-within:shadow-primary/5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex flex-col gap-1">
          <h3 className="text-base font-semibold text-foreground leading-tight truncate">
            {project.name}
          </h3>
          <p className="text-xs font-mono text-muted-foreground flex items-center gap-1.5 truncate">
            <Globe className="w-3 h-3 shrink-0" aria-hidden="true" />
            <span className="truncate">{project.url}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest font-mono ${
              project.status === "live"
                ? "border-primary/20 bg-primary/10 text-primary"
                : "border-border bg-muted text-muted-foreground"
            }`}
          >
            {project.status}
          </span>

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              aria-label={`Open options for ${project.name}`}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="rounded-md p-1 text-muted-foreground transition-opacity hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"
              aria-expanded={menuOpen}
              aria-haspopup="menu"
            >
              <MoreHorizontal className="w-4 h-4" aria-hidden="true" />
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 z-30 mt-2 w-52 overflow-hidden rounded-xl border border-border bg-card shadow-xl"
              >
                <Link
                  href={`/dashboard/projects/${project.id}/edit`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm text-foreground hover:bg-muted/40"
                >
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  Open Details
                </Link>
                <Link
                  href={`/dashboard/projects/${project.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm text-foreground hover:bg-muted/40"
                >
                  <Edit3 className="h-4 w-4 text-muted-foreground" />
                  Edit Project
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onToggleStatus(project);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-foreground hover:bg-muted/40"
                >
                  <PencilRuler className="h-4 w-4 text-muted-foreground" />
                  {project.status === "live" ? "Move to Draft" : "Mark as Live"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onCopyId(project);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-foreground hover:bg-muted/40"
                >
                  <Copy className="h-4 w-4 text-muted-foreground" />
                  Copy Project ID
                </button>
                <div className="h-px bg-border" />
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete(project);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Project
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Blocks className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{project.blocks} blocks</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <FileJson className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{project.pages} pages</span>
        </div>
      </div>

      <div className="mt-4 border-t border-border/60 pt-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" aria-hidden="true" />
          <span>{project.lastUpdated}</span>
        </div>

        <Link
          href={`/dashboard/projects/${project.id}`}
          className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-1 py-0.5 flex items-center gap-1 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"
          aria-label={`Open project ${project.name}`}
        >
          Open
          <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const { notify } = useNotification();
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, limit: PAGE_SIZE, total: 0, totalPages: 1 });
  const [stats, setStats] = useState({ totalProjects: 0, liveProjects: 0, totalBlocks: 0, totalPages: 0 });
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationMenuRef = useRef<HTMLDivElement | null>(null);

  const user: DashboardUser = {
    name: session?.user?.name || "User",
    email: session?.user?.email || "",
    plan: "Community",
    avatar: session?.user?.name
      ? session.user.name
          .split(" ")
          .map((namePart: string) => namePart[0])
          .join("")
          .toUpperCase()
      : "U",
  };

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setCurrentPage(1);
    }, 350);

    return () => window.clearTimeout(handle);
  }, [searchInput]);

  const fetchProjects = useCallback(async (showToastOnError = false) => {
    setProjectsLoading(true);
    setProjectsError(null);

    try {
      const params = new URLSearchParams({
        page: String(currentPage),
        limit: String(PAGE_SIZE),
      });
      if (search) params.set("q", search);

      const response = await fetch(`/api/projects?${params.toString()}`, {
        method: "GET",
        cache: "no-store",
      });

      let payload: ApiProjectsPayload = {};
      try {
        payload = await response.json();
      } catch {
        payload = {};
      }

      if (!response.ok) {
        const message = payload.error || "Unable to load projects.";
        setProjectsError(message);
        if (showToastOnError) {
          notify({
            type: "error",
            title: "Failed to load projects",
            description: message,
          });
        }
        return;
      }

      const mapped = (payload.projects || []).map(mapApiProject);
      setProjects(mapped);
      if (payload.pagination) {
        setPagination(payload.pagination);
      }
      if (payload.stats) {
        setStats(payload.stats);
      }
    } catch {
      const offlineMessage =
        "Network error while loading projects. Check your internet connection and try again.";
      setProjectsError(offlineMessage);
      if (showToastOnError) {
        notify({
          type: "error",
          title: "Connection issue",
          description: offlineMessage,
        });
      }
    } finally {
      setProjectsLoading(false);
    }
  }, [notify, currentPage, search]);

  const handleDeleteProject = useCallback(
    async (project: Project) => {
      const confirmed = window.confirm(
        `Delete "${project.name}"? This action cannot be undone.`
      );
      if (!confirmed) return;

      try {
        const response = await fetch(`/api/projects/${project.id}`, {
          method: "DELETE",
        });
        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          notify({
            type: "error",
            title: "Delete failed",
            description: payload.error || "Could not delete this project.",
          });
          return;
        }

        notify({
          type: "success",
          title: "Project deleted",
          description: `"${project.name}" has been removed.`,
        });

        const isLastOnPage = projects.length === 1 && currentPage > 1;
        if (isLastOnPage) {
          setCurrentPage((prev) => Math.max(1, prev - 1));
        } else {
          void fetchProjects(false);
        }
      } catch {
        notify({
          type: "error",
          title: "Connection issue",
          description: "We couldn't delete this project due to a network issue.",
        });
      }
    },
    [notify, projects.length, currentPage, fetchProjects]
  );

  const handleToggleStatus = useCallback(
    async (project: Project) => {
      const nextStatus = project.status === "live" ? "draft" : "live";
      try {
        const response = await fetch(`/api/projects/${project.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: nextStatus }),
        });
        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          notify({
            type: "error",
            title: "Status update failed",
            description: payload.error || "Could not update project status.",
          });
          return;
        }

        notify({
          type: "success",
          title: "Project updated",
          description:
            nextStatus === "live"
              ? `"${project.name}" is now live.`
              : `"${project.name}" moved to draft.`,
        });
        void fetchProjects(false);
      } catch {
        notify({
          type: "error",
          title: "Connection issue",
          description: "Network error while updating project status.",
        });
      }
    },
    [notify, fetchProjects]
  );

  const handleCopyProjectId = useCallback(
    async (project: Project) => {
      try {
        await navigator.clipboard.writeText(project.id);
        notify({
          type: "success",
          title: "Project ID copied",
          description: "The MongoDB project ID has been copied to your clipboard.",
        });
      } catch {
        notify({
          type: "error",
          title: "Copy failed",
          description: "Could not copy project ID.",
        });
      }
    },
    [notify]
  );

  useEffect(() => {
    void fetchProjects(false);
  }, [fetchProjects]);

  const statsCards = [
    { label: "Total Projects", value: stats.totalProjects, icon: Layers },
    { label: "Live Sites", value: stats.liveProjects, icon: Zap },
    { label: "Total Blocks", value: stats.totalBlocks, icon: Blocks },
    { label: "Total Pages", value: stats.totalPages, icon: FileJson },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!notificationMenuRef.current) return;
      if (!notificationMenuRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center" role="status" aria-live="polite">
        <Loader2 className="w-8 h-8 animate-spin text-primary" aria-hidden="true" />
        <span className="sr-only">Loading dashboard</span>
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
              <h1 className="text-sm font-semibold text-foreground">Projects</h1>
              <span className="text-xs text-muted-foreground hidden sm:inline">{pagination.total} results</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative" ref={notificationMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsNotificationOpen((prev) => !prev)}
                  className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Open notifications"
                  aria-expanded={isNotificationOpen}
                  aria-haspopup="menu"
                >
                  <Bell className="w-4 h-4" aria-hidden="true" />
                  {notifications.some((item) => item.unread) && (
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
                  )}
                </button>

                {isNotificationOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-[320px] max-w-[calc(100vw-2rem)] rounded-xl border border-border bg-card shadow-xl z-30 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                      <p className="text-sm font-semibold text-foreground">Notifications</p>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                        {notifications.filter((item) => item.unread).length} unread
                      </span>
                    </div>

                    <div className="max-h-80 overflow-auto">
                      {notifications.map((item) => (
                        <div key={item.id} className="px-4 py-3 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors">
                          <div className="flex items-start gap-2">
                            <span className={`mt-1 inline-block h-2 w-2 rounded-full ${item.unread ? "bg-primary" : "bg-muted-foreground/30"}`} />
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-foreground">{item.title}</p>
                              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.message}</p>
                              <p className="text-[10px] font-mono text-muted-foreground mt-1">{item.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-2 border-t border-border bg-background/70">
                      <Link
                        href="/dashboard/notifications"
                        onClick={() => setIsNotificationOpen(false)}
                        className="w-full inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        View all notifications
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/dashboard/projects/new">
                <Button size="sm" className="h-8 gap-1.5" aria-label="Create new project">
                  <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                  New Project
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8 flex flex-col gap-8">
          <section aria-labelledby="welcome-heading" className="flex flex-col gap-1">
            <h2 id="welcome-heading" className="text-2xl font-bold tracking-tight text-foreground">
              Good morning, {user.name.split(" ")[0]}
            </h2>
            <p className="text-sm text-muted-foreground">
              You have {stats.totalProjects} projects. {stats.liveProjects} are live.
            </p>
          </section>

          <section aria-label="Project statistics" className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statsCards.map((stat) => (
              <article key={stat.label} className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{stat.label}</span>
                  <stat.icon className="w-3.5 h-3.5 text-muted-foreground/60" aria-hidden="true" />
                </div>
                <p className="text-3xl font-bold font-display tracking-tight text-foreground">{stat.value}</p>
              </article>
            ))}
          </section>

          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_300px] gap-8 items-start">
            <section aria-labelledby="projects-heading" className="flex flex-col gap-4 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h3 id="projects-heading" className="text-sm font-semibold text-foreground">Your Projects</h3>

                <div className="relative w-full sm:w-56">
                  <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
                  <label htmlFor="project-search" className="sr-only">Search projects</label>
                  <input
                    id="project-search"
                    type="search"
                    placeholder="Search projects"
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                    className="h-9 w-full rounded-lg border border-border bg-muted/40 pl-8 pr-3 text-sm placeholder:text-muted-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-describedby="project-search-results"
                  />
                </div>
              </div>

              <p id="project-search-results" className="sr-only" aria-live="polite">
                {pagination.total} projects found
              </p>

              {projectsLoading ? (
                <div className="rounded-2xl border border-border bg-card p-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading projects...
                </div>
              ) : projectsError ? (
                <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
                  <p className="text-sm font-semibold text-destructive">Could not load projects</p>
                  <p className="text-xs text-destructive/85 mt-1">{projectsError}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 h-8 gap-1.5"
                    onClick={() => {
                      void fetchProjects(true);
                    }}
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Retry
                  </Button>
                </div>
              ) : projects.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-6 text-center">
                  <p className="text-sm font-medium text-foreground">
                    {search ? "No projects matched your search." : "No projects yet."}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {search ? "Try a different keyword or clear the search." : "Create your first project to get started."}
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {projects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onDelete={handleDeleteProject}
                        onToggleStatus={handleToggleStatus}
                        onCopyId={handleCopyProjectId}
                      />
                    ))}

                    <Link
                      href="/dashboard/projects/new"
                      className="min-h-[180px] rounded-2xl border-2 border-dashed border-border p-5 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group"
                      aria-label="Create a new project"
                    >
                      <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center transition-colors group-hover:bg-primary/10">
                        <Plus className="w-4 h-4 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden="true" />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">New Project</span>
                    </Link>
                  </div>

                  {pagination.totalPages > 1 && (
                    <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-3 py-2">
                      <p className="text-xs text-muted-foreground">
                        Page {pagination.page} of {pagination.totalPages}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 gap-1"
                          disabled={pagination.page <= 1 || projectsLoading}
                          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          Prev
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 gap-1"
                          disabled={pagination.page >= pagination.totalPages || projectsLoading}
                          onClick={() =>
                            setCurrentPage((prev) => Math.min(pagination.totalPages, prev + 1))
                          }
                        >
                          Next
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </section>

            <aside aria-label="Recent activity and plan" className="flex flex-col gap-4">
              <section aria-labelledby="activity-heading" className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 id="activity-heading" className="text-sm font-semibold text-foreground">Recent Activity</h3>
                  <Activity className="w-3.5 h-3.5 text-muted-foreground/50" aria-hidden="true" />
                </div>

                <ol className="rounded-2xl border border-border bg-card overflow-hidden">
                  {recentActivity.map((item, index) => (
                    <li
                      key={`${item.action}-${item.target}-${item.time}`}
                      className={`p-4 flex flex-col gap-1 ${index < recentActivity.length - 1 ? "border-b border-border" : ""}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs font-medium text-foreground">{item.action}</p>
                        <time className="text-[10px] font-mono text-muted-foreground">{item.time}</time>
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        <span className="font-mono text-primary">{item.target}</span> - {item.project}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="rounded-2xl border border-primary/20 bg-primary/5 p-4 flex flex-col gap-3" aria-labelledby="plan-heading">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" aria-hidden="true" />
                  <h3 id="plan-heading" className="text-xs font-semibold text-foreground">Community Plan</h3>
                </div>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  Upgrade to Pro for cloud sync, version history, and team collaboration.
                </p>
                <Link href="/pricing" className="w-full">
                  <Button size="sm" className="w-full h-8 text-xs gap-1" aria-label="Upgrade to Pro plan">
                    Upgrade to Pro
                    <ChevronRight className="w-3 h-3" aria-hidden="true" />
                  </Button>
                </Link>
              </section>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
