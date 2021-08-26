import RepositoryFactory  from "@domain/factory/RepositoryFactory";
import { GetConsultingActivities } from "@domain/usecase/activity/GetConsultingActivities";

export class AcvitivityController {

  constructor(private repositoryFactory: RepositoryFactory) { }

  async getConsultingActivities(query: any, body: any, params: any) {
    const { consultingId } = params;
    const { month, year } = query;
    const getConsultingActivities = new GetConsultingActivities(this.repositoryFactory);
    let activites = await getConsultingActivities.execute({ 
      consultingId: parseInt(consultingId), 
      month: parseInt(month), 
      year: parseInt(year) 
    });
    return activites;
  }
}