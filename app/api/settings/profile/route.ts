import { NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const user = await User.findById(session.user.id)
      .select("name email")
      .lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ profile: { name: user.name, email: user.email } }, { status: 200 });
  } catch (error) {
    console.error("GET /api/settings/profile failed:", error);
    return NextResponse.json({ error: "Unable to load profile settings." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";

    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findByIdAndUpdate(
      session.user.id,
      { $set: { name } },
      { new: true }
    )
      .select("name email")
      .lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ profile: { name: user.name, email: user.email } }, { status: 200 });
  } catch (error) {
    console.error("PATCH /api/settings/profile failed:", error);
    return NextResponse.json({ error: "Unable to update profile settings." }, { status: 500 });
  }
}
