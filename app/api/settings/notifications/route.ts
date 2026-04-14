import { NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

type NotificationPreferences = {
  projectUpdates: boolean;
  pluginReleases: boolean;
  billing: boolean;
  changelog: boolean;
  marketing: boolean;
};

const DEFAULT_PREFS: NotificationPreferences = {
  projectUpdates: true,
  pluginReleases: false,
  billing: true,
  changelog: true,
  marketing: false,
};

function sanitize(input: unknown): NotificationPreferences {
  const value = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;
  return {
    projectUpdates: typeof value.projectUpdates === "boolean" ? value.projectUpdates : DEFAULT_PREFS.projectUpdates,
    pluginReleases: typeof value.pluginReleases === "boolean" ? value.pluginReleases : DEFAULT_PREFS.pluginReleases,
    billing: typeof value.billing === "boolean" ? value.billing : DEFAULT_PREFS.billing,
    changelog: typeof value.changelog === "boolean" ? value.changelog : DEFAULT_PREFS.changelog,
    marketing: typeof value.marketing === "boolean" ? value.marketing : DEFAULT_PREFS.marketing,
  };
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const user = await User.findById(session.user.id)
      .select("notificationPreferences")
      .lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { notifications: sanitize(user.notificationPreferences) },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/settings/notifications failed:", error);
    return NextResponse.json({ error: "Unable to load notification settings." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const notifications = sanitize(body?.notifications);

    await dbConnect();

    const user = await User.findByIdAndUpdate(
      session.user.id,
      { $set: { notificationPreferences: notifications } },
      { new: true }
    )
      .select("notificationPreferences")
      .lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { notifications: sanitize(user.notificationPreferences) },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /api/settings/notifications failed:", error);
    return NextResponse.json({ error: "Unable to update notification settings." }, { status: 500 });
  }
}
