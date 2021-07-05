class GetActivities {
    activityRepositoy;
    
    constructor(repositoryFactory) {
        this.activityRepositoy = repositoryFactory.createActivityRepository();        
        this.consultingRepository = repositoryFactory.createConsultingRepository();
    }

    async execute({ consultingId, month, year }) {
        const activities = await this.activityRepositoy.findActivities({ consultingId, month, year });
        return activities.map(atv => {
            return {
                date: atv.date.toISOString(),
                year: atv.year,
                month: atv.month,
                name: atv.name,
                description: atv.description,
                hours: atv.hours,
                status: atv.status
            };
        });
    }
}

module.exports = GetActivities;