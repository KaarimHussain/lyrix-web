import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  password: string | null; // null for OAuth-only users
  notificationPreferences: {
    projectUpdates: boolean;
    pluginReleases: boolean;
    billing: boolean;
    changelog: boolean;
    marketing: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    emailVerified: {
      type: Date,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      default: null,
    },
    notificationPreferences: {
      projectUpdates: { type: Boolean, default: true },
      pluginReleases: { type: Boolean, default: false },
      billing: { type: Boolean, default: true },
      changelog: { type: Boolean, default: true },
      marketing: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model<IUser>("User", UserSchema);

export default User;
