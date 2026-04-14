import { NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/mongoose";
import Project from "@/models/Project";
import { RecentActivityService } from "@/lib/services/recent-activity.service";
import mongoose from "mongoose";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim() || "";
    const status = searchParams.get("status")?.trim() || "";
    const page = Math.max(1, Number.parseInt(searchParams.get("page") || "1", 10) || 1);
    const limitRaw = Number.parseInt(searchParams.get("limit") || "8", 10) || 8;
    const limit = Math.min(50, Math.max(1, limitRaw));
    const skip = (page - 1) * limit;

    await dbConnect();

    const query: Record<string, unknown> = { ownerId: session.user.id };
    if (status === "live" || status === "draft") {
      query.status = status;
    }
    if (q) {
      const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      query.$or = [{ name: regex }, { slug: regex }, { url: regex }];
    }

    const [projects, totalFiltered, totalProjectsCount, statsAggregate] = await Promise.all([
      Project.find(query).sort({ updatedAt: -1 }).skip(skip).limit(limit).lean(),
      Project.countDocuments(query),
      Project.countDocuments({ ownerId: session.user.id }),
      Project.aggregate([
        { $match: { ownerId: new mongoose.Types.ObjectId(session.user.id) } },
        {
          $group: {
            _id: null,
            totalBlocks: { $sum: "$blocksCount" },
            totalPages: { $sum: "$pagesCount" },
            liveProjects: {
              $sum: {
                $cond: [{ $eq: ["$status", "live"] }, 1, 0],
              },
            },
          },
        },
      ]),
    ]);

    const statsDoc = statsAggregate[0] || {
      totalBlocks: 0,
      totalPages: 0,
      liveProjects: 0,
    };

    return NextResponse.json(
      {
        projects,
        pagination: {
          page,
          limit,
          total: totalFiltered,
          totalPages: Math.max(1, Math.ceil(totalFiltered / limit)),
        },
        stats: {
          totalProjects: totalProjectsCount,
          liveProjects: statsDoc.liveProjects ?? 0,
          totalBlocks: statsDoc.totalBlocks ?? 0,
          totalPages: statsDoc.totalPages ?? 0,
        },
        filters: {
          q,
          status: status === "live" || status === "draft" ? status : "",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/projects failed:", error);
    return NextResponse.json(
      { error: "We couldn't load your projects right now. Please try again." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const incomingSlug = typeof body?.slug === "string" ? body.slug.trim() : "";
    const slug = slugify(incomingSlug || name);
    const type = typeof body?.type === "string" ? body.type : "website";
    const environment =
      typeof body?.environment === "string" ? body.environment : "development";
    const enableVersioning = body?.enableVersioning !== false;
    const enableTeamCollab = body?.enableTeamCollab === true;

    if (!name) {
      return NextResponse.json(
        { error: "Project name is required." },
        { status: 400 }
      );
    }

    if (!slug) {
      return NextResponse.json(
        { error: "Project slug is required." },
        { status: 400 }
      );
    }

    if (!["website", "landing", "docs", "app"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid project type." },
        { status: 400 }
      );
    }

    if (!["development", "staging", "production"].includes(environment)) {
      return NextResponse.json(
        { error: "Invalid project environment." },
        { status: 400 }
      );
    }

    await dbConnect();

    const existing = await Project.findOne({ ownerId: session.user.id, slug })
      .select("_id")
      .lean();
    if (existing) {
      return NextResponse.json(
        { error: "A project with this slug already exists. Choose a different slug." },
        { status: 409 }
      );
    }

    const project = await Project.create({
      ownerId: session.user.id,
      name,
      slug,
      type,
      environment,
      status: "draft",
      url: null,
      enableVersioning,
      enableTeamCollab,
      blocksCount: 0,
      pagesCount: 0,
    });

    try {
      await RecentActivityService.logProjectCreated({
        ownerId: session.user.id,
        projectName: project.name,
      });
    } catch (activityError) {
      console.warn("Failed to write recent activity for project creation:", activityError);
    }

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects failed:", error);
    return NextResponse.json(
      { error: "Project creation failed. Please try again." },
      { status: 500 }
    );
  }
}
