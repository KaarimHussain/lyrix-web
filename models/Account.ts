import mongoose, { Schema, model, models, Document, Types } from "mongoose";

export interface IAccount extends Document {
  userId: Types.ObjectId;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
}

const AccountSchema = new Schema<IAccount>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  providerAccountId: {
    type: String,
    required: true,
  },
  refresh_token: String,
  access_token: String,
  expires_at: Number,
  token_type: String,
  scope: String,
  id_token: String,
  session_state: String,
});

// Compound index for provider lookups
AccountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

const Account = models.Account || model<IAccount>("Account", AccountSchema);

export default Account;
