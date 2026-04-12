"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { useNotification } from "@/components/providers/notification-provider";

type ProjectEdit = {
  _id: string;
  name: string;
  slug: string;
  url?: string | null;
  type: "website" | "landing" | "docs" | "app";
  environment: "development" | "staging" | "production";
  status: "draft" | "live";
  enableVersioning: boolean;
  enableTeamCollab: boolean;
};

export default function EditProjectPage() {
  const { data: session, status } = useSession();
  const { notify } = useNotification();
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const projectId = params?.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [project, setProject] = useState<ProjectEdit | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState<ProjectEdit["type"]>("website");
  const [environment, setEnvironment] = useState<ProjectEdit["environment"]>("development");
  const [statusValue, setStatusValue] = useState<ProjectEdit["status"]>("draft");
  const [enableVersioning, setEnableVersioning] = useState(true);
  const [enableTeamCollab, setEnableTeamCollab] = useState(false);

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

  const hasChanges = useMemo(() => {
    if (!project) return false;
    return (
      name !== project.name ||
      slug !== project.slug ||
      url !== (project.url || "") ||
      type !== project.type ||
      environment !== project.environment ||
      statusValue !== project.status ||
      enableVersioning !== project.enableVersioning ||
      enableTeamCollab !== project.enableTeamCollab
    );
  }, [project, name, slug, url, type, environment, statusValue, enableVersioning, enableTeamCollab]);

  useEffect(() => {
    const load = async () => {
      if (!projectId) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/projects/${projectId}`, { cache: "no-store" });
        const payload = await res.json().catch(() => ({}));
        if (!res.ok) {
          notify({
            type: "error",
            title: "Failed to load project",
            description: payload.error || "Please try again.",
          });
          router.push("/dashboard");
          return;
        }
        const data = payload.project as ProjectEdit;
        setProject(data);
        setName(data.name);
        setSlug(data.slug);
        setUrl(data.url || "");
        setType(data.type);
        setEnvironment(data.environment);
        setStatusValue(data.status);
        setEnableVersioning(data.enableVersioning);
        setEnableTeamCollab(data.enableTeamCollab);
      } catch {
        notify({
          type: "error",
          title: "Connection issue",
          description: "We couldn't load this project due to a network error.",
        });
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [projectId, notify, router]);

  const save = async () => {
    if (!projectId || !hasChanges || saving) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          slug: slug.trim().toLowerCase(),
          url: url.trim(),
          type,
          environment,
          status: statusValue,
          enableVersioning,
          enableTeamCollab,
        }),
      });

      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        notify({
          type: "error",
          title: "Update failed",
          description: payload.error || "Could not save changes.",
        });
        return;
      }

      notify({
        type: "success",
        title: "Project updated",
        description: "Your changes have been saved.",
      });
      router.push(`/dashboard/projects/${projectId}`);
      router.refresh();
    } catch {
      notify({
        type: "error",
        title: "Connection issue",
        description: "Network error while saving changes.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <DashboardSidebar user={user} />
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-20 h-16 border-b border-border bg-background/90 backdrop-blur-md">
          <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            <h1 className="text-sm font-semibold">Edit Project</h1>
            <Link href={`/dashboard/projects/${projectId}`}>
              <Button variant="outline" size="sm" className="h-8 gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </Button>
            </Link>
          </div>
        </header>

        <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <section className="rounded-2xl border border-border bg-card p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Project Name" value={name} onChange={setName} />
              <Field label="Slug" value={slug} onChange={setSlug} />
              <Field label="URL (optional)" value={url} onChange={setUrl} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <SelectField
                label="Type"
                value={type}
                onChange={(v) => setType(v as ProjectEdit["type"])}
                options={["website", "landing", "docs", "app"]}
              />
              <SelectField
                label="Environment"
                value={environment}
                onChange={(v) => setEnvironment(v as ProjectEdit["environment"])}
                options={["development", "staging", "production"]}
              />
              <SelectField
                label="Status"
                value={statusValue}
                onChange={(v) => setStatusValue(v as ProjectEdit["status"])}
                options={["draft", "live"]}
              />
            </div>

            <div className="space-y-2">
              <Toggle label="Enable version history" enabled={enableVersioning} onToggle={() => setEnableVersioning((p) => !p)} />
              <Toggle label="Enable team collaboration (Pro)" enabled={enableTeamCollab} onToggle={() => setEnableTeamCollab((p) => !p)} />
            </div>

            <div className="flex gap-3 pt-2">
              <Button onClick={save} disabled={!hasChanges || saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
              <Link href={`/dashboard/projects/${projectId}`}>
                <Button variant="outline">Cancel</Button>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="space-y-1.5">
      <span className="text-sm font-medium">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="space-y-1.5">
      <span className="text-sm font-medium">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function Toggle({
  label,
  enabled,
  onToggle,
}: {
  label: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 flex items-center justify-between gap-3 text-left hover:bg-muted/30 transition-colors"
    >
      <span className="text-sm">{label}</span>
      <span className={`h-6 w-10 rounded-full relative transition-colors ${enabled ? "bg-primary" : "bg-muted"}`}>
        <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${enabled ? "translate-x-5" : "translate-x-1"}`} />
      </span>
    </button>
  );
}
