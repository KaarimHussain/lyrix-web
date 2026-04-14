import dbConnect from "@/lib/mongoose";
import RecentActivity from "@/models/RecentActivity";

export type RecentActivityRecord = {
  id: string;
  action: string;
  target: string;
  project: string;
  createdAt: string;
};

export class RecentActivityService {
  static async createActivity(input: {
    ownerId: string;
    action: string;
    target: string;
    project: string;
  }) {
    await dbConnect();

    return RecentActivity.create({
      ownerId: input.ownerId,
      action: input.action,
      target: input.target,
      project: input.project,
    });
  }

  static async logProjectCreated(input: {
    ownerId: string;
    projectName: string;
  }) {
    return RecentActivityService.createActivity({
      ownerId: input.ownerId,
      action: "Created project",
      target: input.projectName,
      project: input.projectName,
    });
  }

  static async getRecentByOwner(ownerId: string, limit = 5): Promise<RecentActivityRecord[]> {
    await dbConnect();

    const safeLimit = Math.min(20, Math.max(1, limit));

    const docs = await RecentActivity.find({ ownerId })
      .sort({ createdAt: -1 })
      .limit(safeLimit)
      .lean();

    return docs.map((doc) => ({
      id: String(doc._id),
      action: doc.action,
      target: doc.target,
      project: doc.project,
      createdAt: new Date(doc.createdAt).toISOString(),
    }));
  }
}
