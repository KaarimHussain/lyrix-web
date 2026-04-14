import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { RecentActivityService } from "@/lib/services/recent-activity.service";

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limitRaw = Number.parseInt(searchParams.get("limit") || "5", 10);
    const limit = Number.isFinite(limitRaw) ? limitRaw : 5;

    const activity = await RecentActivityService.getRecentByOwner(session.user.id, limit);

    return NextResponse.json({ activity }, { status: 200 });
  } catch (error) {
    console.error("GET /api/activity/recent failed:", error);
    return NextResponse.json(
      { error: "Unable to load recent activity right now." },
      { status: 500 }
    );
  }
}
