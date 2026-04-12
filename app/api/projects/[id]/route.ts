import { NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/mongoose";
import Project from "@/models/Project";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();

    const project = await Project.findOne({
      _id: id,
      ownerId: session.user.id,
    }).lean();

    if (!project) {
      return NextResponse.json(
        { error: "Project not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    console.error("GET /api/projects/[id] failed:", error);
    return NextResponse.json(
      { error: "Unable to load this project right now." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const updates: Record<string, unknown> = {};

    if (typeof body?.name === "string") {
      const name = body.name.trim();
      if (!name) {
        return NextResponse.json(
          { error: "Project name cannot be empty." },
          { status: 400 }
        );
      }
      updates.name = name;
    }

    if (typeof body?.slug === "string") {
      const slug = body.slug.trim().toLowerCase();
      if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
        return NextResponse.json(
          { error: "Invalid slug. Use lowercase letters, numbers, and hyphens only." },
          { status: 400 }
        );
      }
      updates.slug = slug;
    }

    if (typeof body?.url === "string" || body?.url === null) {
      updates.url = typeof body.url === "string" ? body.url.trim() : null;
    }

    if (typeof body?.type === "string") {
      if (!["website", "landing", "docs", "app"].includes(body.type)) {
        return NextResponse.json({ error: "Invalid project type." }, { status: 400 });
      }
      updates.type = body.type;
    }

    if (typeof body?.environment === "string") {
      if (!["development", "staging", "production"].includes(body.environment)) {
        return NextResponse.json({ error: "Invalid environment." }, { status: 400 });
      }
      updates.environment = body.environment;
    }

    if (typeof body?.status === "string") {
      if (!["draft", "live"].includes(body.status)) {
        return NextResponse.json(
          { error: "Invalid status. Use 'draft' or 'live'." },
          { status: 400 }
        );
      }
      updates.status = body.status;
    }

    if (typeof body?.enableVersioning === "boolean") {
      updates.enableVersioning = body.enableVersioning;
    }

    if (typeof body?.enableTeamCollab === "boolean") {
      updates.enableTeamCollab = body.enableTeamCollab;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No valid fields provided for update." },
        { status: 400 }
      );
    }

    await dbConnect();

    if (typeof updates.slug === "string") {
      const existingSlug = await Project.findOne({
        ownerId: session.user.id,
        slug: updates.slug,
        _id: { $ne: id },
      })
        .select("_id")
        .lean();

      if (existingSlug) {
        return NextResponse.json(
          { error: "A project with this slug already exists. Choose another slug." },
          { status: 409 }
        );
      }
    }

    const project = await Project.findOneAndUpdate(
      { _id: id, ownerId: session.user.id },
      { $set: updates },
      { new: true }
    ).lean();

    if (!project) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    console.error("PATCH /api/projects/[id] failed:", error);
    return NextResponse.json(
      { error: "Unable to update this project right now." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();

    const deleted = await Project.findOneAndDelete({
      _id: id,
      ownerId: session.user.id,
    }).lean();

    if (!deleted) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/projects/[id] failed:", error);
    return NextResponse.json(
      { error: "Unable to delete this project right now." },
      { status: 500 }
    );
  }
}
