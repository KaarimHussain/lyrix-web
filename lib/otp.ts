import crypto from "crypto";

/** Generate a 6-digit numeric OTP */
export function generateOtp(): string {
  return crypto.randomInt(100000, 999999).toString();
}

/** OTP validity duration in minutes */
export const OTP_EXPIRY_MINUTES = 10;
