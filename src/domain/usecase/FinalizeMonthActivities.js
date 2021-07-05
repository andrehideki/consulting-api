class FinalizeMonthActivities {
    activityRepositoy;
    constructor(repositoryFactory) {
        this.activityRepositoy = repositoryFactory.createActivityRepository();    
    }

    async execute({month, year,  consultingEmail}) {
        let activities = await this.activityRepositoy.findActivities({month, year,  consultingEmail});
        for (let activity of activities) {
            activity.finalize();
            await this.activityRepositoy.updateActivity(activity);
        }
    }
}

module.exports = FinalizeMonthActivities;