import { Schema, model, models, Document, Types } from "mongoose";

export interface IVerificationOtp extends Document {
  userId: Types.ObjectId;
  email: string;
  otp: string;
  expiresAt: Date;
  createdAt: Date;
}

const VerificationOtpSchema = new Schema<IVerificationOtp>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Auto-delete expired OTPs
VerificationOtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const VerificationOtp =
  models.VerificationOtp ||
  model<IVerificationOtp>("VerificationOtp", VerificationOtpSchema);

export default VerificationOtp;
