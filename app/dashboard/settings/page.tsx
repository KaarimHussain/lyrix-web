"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
    User,
    Bell,
    CreditCard,
    Shield,
    Trash2,
    ChevronRight,
    Check,
    Github,
    Moon,
    Sun,
    Zap,
    AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import LyrixInput from "@/components/LyrixInput";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { useNotification } from "@/components/providers/notification-provider";

// ─── Shared Sidebar (same as dashboard) ──────────────────────────────────────

const defaultNotificationSettings = {
    projectUpdates: true,
    pluginReleases: false,
    billing: true,
    changelog: true,
    marketing: false,
};

// ─── Section Shell ────────────────────────────────────────────────────────────

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-5 pb-8 border-b border-border last:border-0 last:pb-0">
            <div>
                <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
            </div>
            {children}
        </div>
    );
}

// ─── Settings Tabs ────────────────────────────────────────────────────────────

const TABS = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "security", label: "Security", icon: Shield },
];

// ─── Tab: Profile ─────────────────────────────────────────────────────────────

function ProfileTab({
    profile,
    draftName,
    onDraftNameChange,
    onSave,
    loading,
}: {
    profile: { name: string; email: string; avatar: string };
    draftName: string;
    onDraftNameChange: (name: string) => void;
    onSave: (name: string) => Promise<void>;
    loading: boolean;
}) {
    const [saved, setSaved] = useState(false);

    const handleSave = async () => {
        await onSave(draftName);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="flex flex-col gap-8">
            <Section title="Personal Information" description="Update your display name and email address.">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
                    <LyrixInput
                        label="Full Name"
                        value={draftName}
                        onChange={(e) => onDraftNameChange(e.target.value)}
                    />
                    <LyrixInput
                        label="Email"
                        type="email"
                        value={profile.email}
                        hint="Contact support to change your email."
                        disabled
                    />
                </div>
                <div>
                    <Button size="sm" className="h-9 gap-2" onClick={handleSave} disabled={loading}>
                        {saved ? <><Check className="w-3.5 h-3.5" /> Saved</> : "Save Changes"}
                    </Button>
                </div>
            </Section>

            <Section title="Avatar" description="Your avatar is auto-generated from your initials.">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 text-primary flex items-center justify-center text-2xl font-bold">
                        {profile.avatar}
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-sm text-muted-foreground">Custom avatar uploads coming in a future update.</p>
                        <span className="text-xs font-mono text-muted-foreground/60">Planned — v0.2.0</span>
                    </div>
                </div>
            </Section>
        </div>
    );
}

// ─── Tab: Notifications ───────────────────────────────────────────────────────

function NotificationsTab({
    settings,
    onToggle,
    loading,
}: {
    settings: typeof defaultNotificationSettings;
    onToggle: (key: keyof typeof defaultNotificationSettings, value: boolean) => Promise<void>;
    loading: boolean;
}) {

    const items = [
        { key: "projectUpdates", label: "Project Updates", desc: "Notified when a collaborator edits a project." },
        { key: "pluginReleases", label: "Plugin Releases", desc: "New versions of installed plugins." },
        { key: "billing", label: "Billing Alerts", desc: "Invoices, payment failures, and plan changes." },
        { key: "changelog", label: "Changelog", desc: "New Lyrix features and releases." },
        { key: "marketing", label: "Tips & Tutorials", desc: "Occasional product tips from the Lyrix team." },
    ] as const;

    return (
        <div className="flex flex-col gap-8">
            <Section title="Email Notifications" description="Choose what you want to be notified about.">
                <div className="flex flex-col gap-0 rounded-xl border border-border overflow-hidden max-w-lg">
                    {items.map((item, i) => (
                        <div key={item.key} className={`flex items-center justify-between p-4 ${i < items.length - 1 ? "border-b border-border" : ""}`}>
                            <div>
                                <p className="text-sm font-medium text-foreground">{item.label}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                            </div>
                            <Switch
                                checked={settings[item.key]}
                                onCheckedChange={(checked) => onToggle(item.key, checked)}
                                disabled={loading}
                            />
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    );
}

// ─── Tab: Billing ─────────────────────────────────────────────────────────────

function BillingTab() {
    return (
        <div className="flex flex-col gap-8">
            <Section title="Current Plan" description="You are on the Community (free) plan.">
                <div className="flex flex-col gap-4 p-5 rounded-xl bg-card border border-border max-w-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-foreground">Community</p>
                            <p className="text-xs text-muted-foreground">Free forever. No credit card required.</p>
                        </div>
                        <span className="text-2xl font-bold font-display text-foreground">$0</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        {["Local visual editor", "Unlimited blocks", "JSON serialization", "Community support"].map((f) => (
                            <div key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                                {f}
                            </div>
                        ))}
                    </div>
                    <Link href="/pricing">
                        <Button className="w-full h-9 gap-2 text-sm">
                            <Zap className="w-3.5 h-3.5" />
                            Upgrade to Pro — $29/mo
                            <ChevronRight className="w-3.5 h-3.5 ml-auto" />
                        </Button>
                    </Link>
                </div>
            </Section>

            <Section title="Billing History" description="No invoices yet — you're on the free plan.">
                <div className="flex flex-col items-center justify-center py-10 rounded-xl border border-dashed border-border text-center max-w-lg">
                    <CreditCard className="w-8 h-8 text-muted-foreground/40 mb-3" />
                    <p className="text-sm text-muted-foreground">No invoices to show.</p>
                </div>
            </Section>
        </div>
    );
}

// ─── Tab: Security ────────────────────────────────────────────────────────────

function SecurityTab() {
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    return (
        <div className="flex flex-col gap-8">
            <Section title="Change Password" description="Update the password used to sign in.">
                <div className="flex flex-col gap-4 max-w-sm">
                    <LyrixInput variant="password" label="Current Password" placeholder="••••••••" />
                    <LyrixInput variant="password" label="New Password" placeholder="••••••••" />
                    <LyrixInput variant="password" label="Confirm New Password" placeholder="••••••••" />
                    <Button size="sm" className="h-9 w-fit">Update Password</Button>
                </div>
            </Section>

            <Section title="Appearance" description="Choose your preferred theme.">
                <div className="flex items-center gap-3">
                    {(["light", "dark"] as const).map((t) => (
                        <button
                            key={t}
                            onClick={() => setTheme(t)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${theme === t ? "bg-primary/10 text-primary border-primary/30" : "bg-card text-muted-foreground border-border hover:border-border/80"}`}
                        >
                            {t === "light" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                    ))}
                </div>
            </Section>

            <Section title="Active Sessions" description="Devices currently signed into your account.">
                <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border max-w-lg">
                    <div>
                        <p className="text-sm font-medium text-foreground">Chrome on Windows</p>
                        <p className="text-xs text-muted-foreground">Karachi, PK · Current session</p>
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        Active
                    </span>
                </div>
            </Section>

            <Section title="Danger Zone" description="Irreversible actions. Proceed with caution.">
                <div className="flex flex-col gap-3 p-5 rounded-xl border border-destructive/20 bg-destructive/5 max-w-lg">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-semibold text-foreground">Delete Account</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                Permanently deletes your account and all associated projects. This cannot be undone.
                            </p>
                        </div>
                    </div>
                    <Button variant="destructive" size="sm" className="h-9 w-fit gap-2">
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete My Account
                    </Button>
                </div>
            </Section>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");
    const { data: session } = useSession();
    const { notify } = useNotification();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState({ name: "User", email: "", avatar: "U" });
    const [profileDraftName, setProfileDraftName] = useState("User");
    const [notificationSettings, setNotificationSettings] = useState(defaultNotificationSettings);

    const sidebarUser = {
        name: profile.name || session?.user?.name || "User",
        email: profile.email || session?.user?.email || "",
        plan: "Community",
        avatar:
            profile.name
                ?.split(" ")
                .map((part) => part[0])
                .join("")
                .toUpperCase()
                .slice(0, 2) || "U",
    };

    useEffect(() => {
        const loadSettings = async () => {
            setLoading(true);
            try {
                const [profileRes, notificationsRes] = await Promise.all([
                    fetch("/api/settings/profile", { cache: "no-store" }),
                    fetch("/api/settings/notifications", { cache: "no-store" }),
                ]);

                if (profileRes.ok) {
                    const payload = await profileRes.json();
                    const name = payload?.profile?.name || "User";
                    const email = payload?.profile?.email || "";
                    setProfile({
                        name,
                        email,
                        avatar: name
                            .split(" ")
                            .map((part: string) => part[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2) || "U",
                    });
                    setProfileDraftName(name);
                }

                if (notificationsRes.ok) {
                    const payload = await notificationsRes.json();
                    setNotificationSettings({
                        ...defaultNotificationSettings,
                        ...(payload?.notifications || {}),
                    });
                }
            } catch {
                notify({
                    type: "error",
                    title: "Settings load failed",
                    description: "We couldn't load your settings right now.",
                });
            } finally {
                setLoading(false);
            }
        };

        void loadSettings();
    }, [notify]);

    const saveProfile = async (name: string) => {
        if (!name.trim()) {
            notify({ type: "error", title: "Name required", description: "Please enter your full name." });
            return;
        }

        setSaving(true);
        try {
            const response = await fetch("/api/settings/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name.trim() }),
            });
            const payload = await response.json().catch(() => ({}));
            if (!response.ok) {
                notify({
                    type: "error",
                    title: "Profile update failed",
                    description: payload.error || "Could not save profile changes.",
                });
                return;
            }
            const newName = payload?.profile?.name || name.trim();
            const email = payload?.profile?.email || profile.email;
            setProfile({
                name: newName,
                email,
                avatar: newName
                    .split(" ")
                    .map((part: string) => part[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2) || "U",
            });
            setProfileDraftName(newName);
            notify({ type: "success", title: "Profile updated", description: "Your profile changes were saved." });
        } catch {
            notify({
                type: "error",
                title: "Connection issue",
                description: "Could not save profile settings due to a network issue.",
            });
        } finally {
            setSaving(false);
        }
    };

    const toggleNotification = async (key: keyof typeof defaultNotificationSettings, value: boolean) => {
        const next = { ...notificationSettings, [key]: value };
        setNotificationSettings(next);
        try {
            const response = await fetch("/api/settings/notifications", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ notifications: next }),
            });
            if (!response.ok) {
                throw new Error("failed");
            }
        } catch {
            setNotificationSettings(notificationSettings);
            notify({
                type: "error",
                title: "Update failed",
                description: "Could not update notification settings.",
            });
        }
    };

    const renderTab = () => {
        switch (activeTab) {
            case "profile": return <ProfileTab profile={profile} draftName={profileDraftName} onDraftNameChange={setProfileDraftName} onSave={saveProfile} loading={loading || saving} />;
            case "notifications": return <NotificationsTab settings={notificationSettings} onToggle={toggleNotification} loading={loading} />;
            case "billing": return <BillingTab />;
            case "security": return <SecurityTab />;
            default: return null;
        }
    };

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <DashboardSidebar user={sidebarUser} showSignOut={false} />

            <div className="flex-1 flex flex-col min-w-0">
                {/* Topbar */}
                <header className="h-16 border-b border-border flex items-center px-6 sticky top-0 bg-background/80 backdrop-blur-md z-10">
                    <h1 className="text-sm font-semibold text-foreground">Settings</h1>
                </header>

                <main className="flex-1 p-6 md:p-8 max-w-4xl mx-auto w-full">
                    <div className="flex flex-col gap-1 mb-8">
                        <h2 className="text-2xl font-bold tracking-tight">Account Settings</h2>
                        <p className="text-sm text-muted-foreground">Manage your profile, notifications, billing, and security.</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Tabs sidebar */}
                        <nav className="flex md:flex-col gap-1 md:w-44 shrink-0 overflow-x-auto">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                        }`}
                                >
                                    <tab.icon className="w-4 h-4 shrink-0" />
                                    {tab.label}
                                </button>
                            ))}
                        </nav>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            {renderTab()}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
