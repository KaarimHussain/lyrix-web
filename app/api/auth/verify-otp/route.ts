import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import VerificationOtp from "@/models/VerificationOtp";

/** POST — Verify OTP and mark email as verified */
export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const record = await VerificationOtp.findOne({
      email: email.toLowerCase(),
      otp,
    });

    if (!record) {
      return NextResponse.json(
        { error: "Invalid or expired code" },
        { status: 400 }
      );
    }

    if (record.expiresAt < new Date()) {
      await VerificationOtp.deleteOne({ _id: record._id });
      return NextResponse.json(
        { error: "Code has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Mark email as verified
    await User.updateOne(
      { _id: record.userId },
      { emailVerified: new Date() }
    );

    // Clean up OTPs
    await VerificationOtp.deleteMany({ email: email.toLowerCase() });

    return NextResponse.json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json(
      { error: "Verification failed. Please try again." },
      { status: 500 }
    );
  }
}
