import RepositoryFactory  from "@domain/factory/RepositoryFactory";
import { GetConsulting } from "@domain/usecase/GetConsulting";

export class ConsultingController {
  constructor(private repositoryFactory: RepositoryFactory) { }

  async getConsulting(params: any) {
    const getConsulting = new GetConsulting(this.repositoryFactory);
    let consulting = await getConsulting.execute(params.email);
    return consulting;
  }
}