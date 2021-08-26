import { ActivityRepository } from "@domain/repository/ActivityRepository";
import { ConsultingRepository } from "@domain/repository/ConsultingRepository";
import RepositoryFactory from "@domain/factory/RepositoryFactory";

export interface GetConsultingActivitiesInput {
  consultingId: number;
  month: number;
  year: number;
}

export class GetConsultingActivities {
  activityRepository: ActivityRepository;
  consultingRepository: ConsultingRepository

  constructor(repositoryFactory: RepositoryFactory) {
    this.activityRepository = repositoryFactory.createActivityRepository();
    this.consultingRepository = repositoryFactory.createConsultingRepository();
  }

  async execute(input: GetConsultingActivitiesInput) {
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
