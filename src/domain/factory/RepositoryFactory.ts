import { ConsultingRepository } from "@repository/ConsultingRepository";
import { ActivityRepository } from "@repository/ActivityRepository";
import { UserRepository } from "@repository/UserRepository";

export interface RepositoryFactory {
    createConsultingRepository(): ConsultingRepository;
    createActivityRepository(): ActivityRepository;
    createUserRepository(): UserRepository;
}
