"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinalizeMonthActivities = void 0;
class FinalizeMonthActivities {
    constructor(repositoryFactory) {
        this.activityRepositoy = repositoryFactory.createActivityRepository();
    }
    async execute({ month, year, consultingEmail }) {
        let activities = await this.activityRepositoy.findActivities(month, year, consultingEmail);
        for (let activity of activities) {
            activity.finalize();
            await this.activityRepositoy.updateActivity(activity);
        }
    }
}
exports.FinalizeMonthActivities = FinalizeMonthActivities;
