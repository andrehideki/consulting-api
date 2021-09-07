import RepositoryFactory  from "@domain/factory/RepositoryFactory";
import { GetConsultingActivities } from "@domain/usecase/activity/GetConsultingActivities";
import { GetTags } from "@domain/usecase/activity/GetTags";

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

  async getTags({ tagName }): Promise<any> {
    const getTags: GetTags = new GetTags(this.repositoryFactory);
    const tags = getTags.execute(tagName);
    return tags;
  }
}