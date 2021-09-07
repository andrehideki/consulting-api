import RepositoryFactory  from "@domain/factory/RepositoryFactory";
import { GetConsulting } from "@domain/usecase/consulting/GetConsulting";
import { RegisterConsulting } from "@domain/usecase/consulting/RegisterConsulting";

export class ConsultingController {
  constructor(private repositoryFactory: RepositoryFactory) { }

  async getConsulting(params: any) {
    const getConsulting: GetConsulting = new GetConsulting(this.repositoryFactory);
    let consulting = await getConsulting.execute({ email: params.email });
    return consulting;
  }

  async registerConsulting(params: any, body: any) {
    const registerConsulting: RegisterConsulting = new RegisterConsulting(this.repositoryFactory);
    const consulting = await registerConsulting.execute({
      firstName: body.firstName,
      lastName: body.lastName,
      birthDate: body.birthDate, 
      emailAddress: body.emailAddress
    });
    return consulting;
  }
}