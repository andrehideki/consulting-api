import { ActivityRepository } from "@domain/repository/ActivityRepository";
import { ConsultingRepository } from "@domain/repository/ConsultingRepository";
import RepositoryFactory from "@domain/factory/RepositoryFactory";

export interface GetActivityOutput {
  id: number;
  name: string;
  description: string;
  date: string;
  hours: number;
  consultingCompleteName: string;
  consultingEmail: string;
  tags: string[];
  status: string;
}

export class GetActivity {
  activityRepository: ActivityRepository;
  consultingRepository: ConsultingRepository

  constructor(repositoryFactory: RepositoryFactory) {
    this.activityRepository = repositoryFactory.createActivityRepository();
    this.consultingRepository = repositoryFactory.createConsultingRepository();
  }

  async execute(activityId: number): Promise<GetActivityOutput> {
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
