"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetActivity = void 0;
class GetActivity {
    constructor(repositoryFactory) {
        this.activityRepository = repositoryFactory.createActivityRepository();
        this.consultingRepository = repositoryFactory.createConsultingRepository();
    }
    async execute(activityId) {
        const activity = await this.activityRepository.getActivity(activityId);
        const consulting = await this.consultingRepository.getById(activity.consulting);
        return {
            id: activity.id,
            name: activity.name.toString(),
            description: activity.description.toString(),
            date: activity.date.toISOString().substring(0, 10),
            hours: activity.hours,
            consultingCompleteName: consulting.name.value,
            consultingEmail: consulting.email.value,
            tags: activity.tags.map(tag => tag.name),
            status: activity.status
        };
    }
}
exports.GetActivity = GetActivity;
