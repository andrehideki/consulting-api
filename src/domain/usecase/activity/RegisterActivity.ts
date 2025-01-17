import { Activity } from "@domain/entity/Activity";
import { Responsible } from "@domain/entity/Responsible";
import { Tag } from "@domain/entity/Tag";
import RepositoryFactory from "@domain/factory/RepositoryFactory";
import { ActivityRepository } from "@domain/repository/ActivityRepository";
import { ConsultingRepository } from "@domain/repository/ConsultingRepository";
import { FileService } from "@domain/service/FileService";
import { ResponsibleCategory } from "@domain/valueobject/ReponsibleCategory";

export interface RegisterActivityInput {
  name: string;
  description?: string;
  date: string;
  consultingId: number;
  amountOfHours: number;
  responsibleId: number;
  tags?: string[];
  files?: AcvitivityFile[];
}

export class AcvitivityFile {
  name: string;
  file: Buffer;
}

export class RegisterActivity {
  activityRepositoy: ActivityRepository;
  consultingRepository: ConsultingRepository;
  fileService: FileService;

  constructor(repositoryFactory: RepositoryFactory, fileService: FileService) {
    this.activityRepositoy = repositoryFactory.createActivityRepository();
    this.consultingRepository = repositoryFactory.createConsultingRepository();
    this.fileService = fileService;
  }

  async execute({ name, description, date, consultingId, amountOfHours, responsibleId, tags, files }: RegisterActivityInput) {
    const consulting = await this.consultingRepository.getById(consultingId);
    const responsible = new Responsible(responsibleId, ResponsibleCategory.CONSULTING);
    let activity = new Activity(
      undefined,
      name,
      description,
      new Date(`${date}T00:00:00`),
      consulting.id,
      responsible,
      amountOfHours,
      tags?.map(tagName => new Tag(tagName)),
      "Opened");
    activity = await this.activityRepositoy.saveActivity(activity);
    activity.tags?.forEach(async tag => {
      let existsTag = await this.activityRepositoy.existsTag(tag.name);
      if (!existsTag) await this.activityRepositoy.saveTag(tag)
    });
    files?.forEach(file => this.fileService.save(file.name, file.file));
    return activity;
  }
}
