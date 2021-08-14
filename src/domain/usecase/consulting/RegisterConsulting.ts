import { Consulting } from "@domain/entity/Consulting";
import { ConsultingRepository } from "@domain/repository/ConsultingRepository";
import RepositoryFactory from "@domain/factory/RepositoryFactory";

export class RegisterConsulting {
    consultingRepository: ConsultingRepository;

    constructor(repositoryFacotory: RepositoryFactory) {
        this.consultingRepository = repositoryFacotory.createConsultingRepository();
    }

    async execute({firstName, lastName, birthDate, emailAddress}) {
        let consulting = new Consulting(undefined, firstName, lastName, emailAddress, new Date(`${birthDate}:`));
        consulting = await this.consultingRepository.save(consulting);
        return {
            id: consulting.id,
            name: consulting.name.value,
            email: consulting.email.value,
            birthDate: consulting.birthDate.toISOString()
        };
    }
}