import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import VerificationOtp from "@/models/VerificationOtp";
import { generateOtp, OTP_EXPIRY_MINUTES } from "@/lib/otp";
import { sendPasswordResetEmail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json({ error: "No account found with this email" }, { status: 404 });
    }

    // Don't allow password resets for Google OAuth users (they have no password)
    if (!user.password) {
       return NextResponse.json({ error: "This account uses Google sign-in. Please use that instead." }, { status: 400 });
    }

    // Delete existing OTPs
    await VerificationOtp.deleteMany({ userId: user._id });

    // Create OTP
    const otp = generateOtp();
    await VerificationOtp.create({
      userId: user._id,
      email: user.email,
      otp,
      expiresAt: new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000),
    });

    // Send email
    await sendPasswordResetEmail(user.email, otp, user.name);

    return NextResponse.json({ message: "Reset code sent successfully." });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Failed to send reset email. Please try again." },
      { status: 500 }
    );
  }
}
