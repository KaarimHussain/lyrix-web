import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import VerificationOtp from "@/models/VerificationOtp";
import { generateOtp, OTP_EXPIRY_MINUTES } from "@/lib/otp";
import { sendOtpEmail } from "@/lib/mail";

/** POST — Send OTP to user's email */
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.emailVerified) {
      return NextResponse.json({ error: "Email already verified" }, { status: 400 });
    }

    // Delete any existing OTPs for this user
    await VerificationOtp.deleteMany({ userId: user._id });

    // Create new OTP
    const otp = generateOtp();
    await VerificationOtp.create({
      userId: user._id,
      email: user.email,
      otp,
      expiresAt: new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000),
    });

    // Send email
    await sendOtpEmail(user.email, otp, user.name);

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Send OTP error:", error);
    return NextResponse.json(
      { error: "Failed to send OTP. Please try again." },
      { status: 500 }
    );
  }
}
