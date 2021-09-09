"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetConsultingActivities = void 0;
class GetConsultingActivities {
    constructor(repositoryFactory) {
        this.activityRepository = repositoryFactory.createActivityRepository();
        this.consultingRepository = repositoryFactory.createConsultingRepository();
    }
    async execute(input) {
        const activities = await this.activityRepository.findActivities(input.consultingId, input.month, input.year);
        return activities.map(atv => {
            return {
                id: atv.id,
                date: atv.date.toISOString(),
                year: atv.year,
                month: atv.month,
                name: atv.name,
                hours: atv.hours,
                status: atv.status
            };
        });
    }
}
exports.GetConsultingActivities = GetConsultingActivities;
