import RepositoryFactory  from "@domain/factory/RepositoryFactory";
import { GetConsulting } from "@domain/usecase/consulting/GetConsulting";

export class ConsultingController {
  constructor(private repositoryFactory: RepositoryFactory) { }

  async getConsulting(params: any) {
    const getConsulting: GetConsulting = new GetConsulting(this.repositoryFactory);
    let consulting = await getConsulting.execute({ email: params.email });
    return consulting;
  }
}