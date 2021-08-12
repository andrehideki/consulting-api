import { ConsultingRepository } from "@domain/repository/ConsultingRepository";
import { ActivityRepository } from "@domain/repository/ActivityRepository";
import { UserRepository } from "@domain/repository/UserRepository";

export default interface RepositoryFactory {
    createConsultingRepository(): ConsultingRepository;
    createActivityRepository(): ActivityRepository;
    createUserRepository(): UserRepository;
}
