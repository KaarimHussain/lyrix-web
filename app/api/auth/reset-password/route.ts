import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import VerificationOtp from "@/models/VerificationOtp";

export async function POST(req: NextRequest) {
  try {
    const { email, otp, newPassword } = await req.json();

    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        { error: "Email, OTP and new password are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Verify OTP
    const record = await VerificationOtp.findOne({
      email: email.toLowerCase(),
      otp,
    });

    if (!record) {
      return NextResponse.json(
        { error: "Invalid or expired reset code" },
        { status: 400 }
      );
    }

    if (record.expiresAt < new Date()) {
      await VerificationOtp.deleteOne({ _id: record._id });
      return NextResponse.json(
        { error: "Reset code has expired" },
        { status: 400 }
      );
    }

    // Hash and update password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await User.updateOne({ _id: record.userId }, { password: hashedPassword });

    // Clean up OTPs
    await VerificationOtp.deleteMany({ email: email.toLowerCase() });

    return NextResponse.json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Update failed. Please try again." },
      { status: 500 }
    );
  }
}
