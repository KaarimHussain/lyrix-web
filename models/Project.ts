import { Schema, model, models, Document, Types } from "mongoose";

export type ProjectType = "website" | "landing" | "docs" | "app";
export type ProjectEnvironment = "development" | "staging" | "production";
export type ProjectStatus = "draft" | "live";

export interface IProject extends Document {
  ownerId: Types.ObjectId;
  name: string;
  slug: string;
  type: ProjectType;
  environment: ProjectEnvironment;
  status: ProjectStatus;
  url?: string | null;
  enableVersioning: boolean;
  enableTeamCollab: boolean;
  blocksCount: number;
  pagesCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
      maxlength: 120,
    },
    slug: {
      type: String,
      required: [true, "Project slug is required"],
      trim: true,
      lowercase: true,
      maxlength: 120,
      match: [/^[a-z0-9-]+$/, "Slug may only contain lowercase letters, numbers, and hyphens"],
    },
    type: {
      type: String,
      enum: ["website", "landing", "docs", "app"],
      default: "website",
      required: true,
    },
    environment: {
      type: String,
      enum: ["development", "staging", "production"],
      default: "development",
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "live"],
      default: "draft",
      required: true,
    },
    url: {
      type: String,
      default: null,
      trim: true,
    },
    enableVersioning: {
      type: Boolean,
      default: true,
    },
    enableTeamCollab: {
      type: Boolean,
      default: false,
    },
    blocksCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    pagesCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

ProjectSchema.index({ ownerId: 1, slug: 1 }, { unique: true });

const Project = models.Project || model<IProject>("Project", ProjectSchema);

export default Project;
