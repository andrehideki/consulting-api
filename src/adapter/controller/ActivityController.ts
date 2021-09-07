import RepositoryFactory from "@domain/factory/RepositoryFactory";
import { FinalizeMonthActivities } from "@domain/usecase/activity/FinalizeMonthActivities";
import { GetActivity } from "@domain/usecase/activity/GetActivity";
import { GetConsultingActivities } from "@domain/usecase/activity/GetConsultingActivities";
import { GetTags } from "@domain/usecase/activity/GetTags";
import { RegisterActivity } from "@domain/usecase/activity/RegisterActivity";

export default class AcvitivityController {

  constructor(private repositoryFactory: RepositoryFactory) { }

  async getActivity(query: any, body: any, { id }) {
    const getActivity: GetActivity = new GetActivity(this.repositoryFactory);
    const activity = await getActivity.execute(parseInt(id));
    return activity;
  }

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

  async registerActivity(query: any, { name, description, date, consultingId, amountOfHours, responsibleId, tags }) {
    const registerActivity: RegisterActivity = new RegisterActivity(this.repositoryFactory);
    const activity = await registerActivity.execute({ name, description, date, consultingId, amountOfHours, responsibleId, tags });
    return activity;
  }

  async getTags({ tagName }): Promise<any> {
    const getTags: GetTags = new GetTags(this.repositoryFactory);
    const tags = getTags.execute(tagName);
    return tags;
  }

  async finalizeMonthActivities(query: any, { consultingEmail }, { month, year }): Promise<any> {
    const finalizeMonthActivities: FinalizeMonthActivities = new FinalizeMonthActivities(this.repositoryFactory);
    await finalizeMonthActivities.execute({ 
      month: parseInt(month), 
      year: parseInt(year), 
      consultingEmail });
  }
}