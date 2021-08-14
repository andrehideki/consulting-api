import { ActivityRepository } from "@domain/repository/ActivityRepository";
import { ConsultingRepository } from "@domain/repository/ConsultingRepository";
import RepositoryFactory from "@domain/factory/RepositoryFactory";

export class GetConsultingActivities {
  activityRepository: ActivityRepository;
  consultingRepository: ConsultingRepository

  constructor(repositoryFactory: RepositoryFactory) {
    this.activityRepository = repositoryFactory.createActivityRepository();
    this.consultingRepository = repositoryFactory.createConsultingRepository();
  }

  async execute({ consultingId, month, year }) {
    const activities = await this.activityRepository.findActivities(consultingId, month, year);
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
