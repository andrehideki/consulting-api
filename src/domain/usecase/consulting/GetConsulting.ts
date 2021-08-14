import RepositoryFactory from "@domain/factory/RepositoryFactory";
import { ConsultingRepository } from "@domain/repository/ConsultingRepository";

export interface GetConsultingInput {
  email: string
}

export class GetConsulting {
  consultingRepository: ConsultingRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.consultingRepository = repositoryFactory.createConsultingRepository();
  }

  async execute(input: GetConsultingInput): Promise<any> {
    const consulting = await this.consultingRepository.getByEmail(input.email);
    return {
      name: consulting.name.value,
      email: consulting.email.value,
      birthDate: consulting.birthDate.toISOString().substring(0, 10)
    };
  }
}
