import { ActivityRepository } from "@domain/repository/ActivityRepository";
import { ConsultingRepository } from "@domain/repository/ConsultingRepository";
import RepositoryFactory from "@domain/factory/RepositoryFactory";
import { GetActivityOutput } from "./get_activity/GetActivityOuput";

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
        return new GetActivityOutput(
            activity.id,
            activity.name.toString(),
            activity.description.toString(),
            activity.date.toISOString().substring(0, 10),
            activity.hours,
            consulting.name.value,
            consulting.email.value,
            activity.tags.map(tag => tag.name),
            activity.status
        );
    }
}
