import { RepositoryFactory } from "@factory/RepositoryFactory";
import { ActivityRepository } from "@repository/ActivityRepository";

export class FinalizeMonthActivities {
    
    activityRepositoy: ActivityRepository;

    constructor(repositoryFactory: RepositoryFactory) {
        this.activityRepositoy = repositoryFactory.createActivityRepository();    
    }

    async execute({month, year,  consultingEmail}): Promise<void> {
        let activities = await this.activityRepositoy.findActivities(month, year,  consultingEmail);
        for (let activity of activities) {
            activity.finalize();
            await this.activityRepositoy.updateActivity(activity);
        }
    }
}
