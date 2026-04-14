import { Document, Schema, Types, model, models } from "mongoose";

export interface IRecentActivity extends Document {
  ownerId: Types.ObjectId;
  action: string;
  target: string;
  project: string;
  createdAt: Date;
  updatedAt: Date;
}

const RecentActivitySchema = new Schema<IRecentActivity>(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    action: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    target: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },
    project: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },
  },
  {
    timestamps: true,
  }
);

RecentActivitySchema.index({ ownerId: 1, createdAt: -1 });

const RecentActivity =
  models.RecentActivity || model<IRecentActivity>("RecentActivity", RecentActivitySchema);

export default RecentActivity;
