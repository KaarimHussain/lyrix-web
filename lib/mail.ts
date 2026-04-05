import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOtpEmail(email: string, otp: string, name: string) {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || `"Lyrix" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Verify your Lyrix account",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px; background: #09090b; color: #fafafa; border-radius: 16px;">
          <h1 style="font-size: 24px; font-weight: 700; margin: 0 0 8px; color: #fafafa;">Verify your email</h1>
          <p style="font-size: 14px; color: #a1a1aa; margin: 0 0 32px;">Hey ${name}, use this code to verify your Lyrix account:</p>
          <div style="background: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 24px; text-align: center; margin: 0 0 32px;">
            <span style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #fafafa; font-family: monospace;">${otp}</span>
          </div>
          <p style="font-size: 12px; color: #71717a; margin: 0;">This code expires in 10 minutes. If you didn't create a Lyrix account, ignore this email.</p>
        </div>
      `,
    });

    console.log("OTP email sent successfully to:", email, "MessageID:", info.messageId);
  } catch (err) {
    console.error("Failed to send email via Nodemailer/SMTP:", err);
    throw err;
  }
}

export async function sendPasswordResetEmail(email: string, otp: string, name: string) {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || `"Lyrix" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Reset your Lyrix password",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px; background: #09090b; color: #fafafa; border-radius: 16px;">
          <h1 style="font-size: 24px; font-weight: 700; margin: 0 0 8px; color: #fafafa;">Reset your password</h1>
          <p style="font-size: 14px; color: #a1a1aa; margin: 0 0 32px;">Hey ${name}, use this code to reset your Lyrix account password:</p>
          <div style="background: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 24px; text-align: center; margin: 0 0 32px;">
            <span style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #fafafa; font-family: monospace;">${otp}</span>
          </div>
          <p style="font-size: 12px; color: #71717a; margin: 0;">This code expires in 10 minutes. If you didn't request a password reset, you can safely ignore this email.</p>
        </div>
      `,
    });

    console.log("Password reset email sent successfully to:", email, "MessageID:", info.messageId);
  } catch (err) {
    console.error("Failed to send password reset email:", err);
    throw err;
  }
}
