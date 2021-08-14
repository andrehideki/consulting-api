import { Activity } from "@domain/entity/Activity";
import { Tag } from "@domain/entity/Tag";
import RepositoryFactory from "@domain/factory/RepositoryFactory";
import { ActivityRepository } from "@domain/repository/ActivityRepository";
import { ConsultingRepository } from "@domain/repository/ConsultingRepository";


export class RegisterActivity {
  activityRepositoy: ActivityRepository;
  consultingRepository: ConsultingRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.activityRepositoy = repositoryFactory.createActivityRepository();
    this.consultingRepository = repositoryFactory.createConsultingRepository();
  }

  async execute({ name, description, date, consultingId, amountOfHours, responsible, tags }) {
    const consulting = await this.consultingRepository.getById(consultingId);
    const activity = new Activity(
      undefined,
      name,
      description,
      new Date(`${date}T00:00:00`),
      consulting.id,
      responsible,
      amountOfHours,
      tags.map(tagName => new Tag(tagName)),
      "Opened");
    await this.activityRepositoy.saveActivity(activity);
    if (tags) {
      for (let tag of activity.tags) {
        let existsTag = await this.activityRepositoy.existsTag(tag.name);
        if (!existsTag) {
          await this.activityRepositoy.saveTag(tag)
        }
      }
    }
  }
}
