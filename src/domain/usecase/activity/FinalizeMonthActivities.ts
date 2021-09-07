import RepositoryFactory from "@domain/factory/RepositoryFactory";
import { ActivityRepository } from "@domain/repository/ActivityRepository";

export interface FinalizeMonthActivitiesInput {
  month: number;
  year: number;
  consultingEmail: number;
}

export class FinalizeMonthActivities {

  activityRepositoy: ActivityRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.activityRepositoy = repositoryFactory.createActivityRepository();
  }

  async execute({ month, year, consultingEmail }: FinalizeMonthActivitiesInput): Promise<void> {
    let activities = await this.activityRepositoy.findActivities(month, year, consultingEmail);
    for (let activity of activities) {
      activity.finalize();
      await this.activityRepositoy.updateActivity(activity);
    }
  }
}
