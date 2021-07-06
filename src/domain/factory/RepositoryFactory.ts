import { ConsultingRepository } from "@repository/ConsultingRepository";
import { ActivityRepository } from "@domain/repository/ActivityRepository";

export interface RepositoryFactory {
    createConsultingRepository(): ConsultingRepository;
    createActivityRepository(): ActivityRepository;
}
