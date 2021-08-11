import { RepositoryFactory } from "@domain/factory/RepositoryFactory";
import { ConsultingRepository } from "@domain/repository/ConsultingRepository";

export class GetConsulting {
    consultingRepository: ConsultingRepository;

    constructor(repositoryFactory: RepositoryFactory) {
        this.consultingRepository = repositoryFactory.createConsultingRepository();
    }

    async execute(emailAddress = ""): Promise<any> {
        const consulting = await this.consultingRepository.getByEmail(emailAddress);
        return {
            name: consulting.name.value,
            email: consulting.email.value,
            birthDate: consulting.birthDate.toISOString().substring(0, 10)
        };
    }
}
