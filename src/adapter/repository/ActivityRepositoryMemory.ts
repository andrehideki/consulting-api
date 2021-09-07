import { Activity } from "@domain/entity/Activity";
import { Responsible } from "@domain/entity/Responsible";
import { Tag } from "@domain/entity/Tag";
import { ActivityRepository } from "@domain/repository/ActivityRepository";
import { ResponsibleCategory } from "@domain/valueobject/ReponsibleCategory";

export class ActivityRepositoryMemory implements ActivityRepository {

  private activities: Activity[] = [];
  private tags: Tag[] = [];

  constructor() {
    this.activities.push(new Activity(1, "Nova atividade", "Realizar nova atividade...", new Date(2021, 0, 1), 1, new Responsible(1, ResponsibleCategory.CONSULTING), 8, [new Tag("test")], "opened"));
    this.activities.push(new Activity(2, "Atividade 2", "Realizar nova atividade...", new Date(2021, 0, 1), 1, new Responsible(1, ResponsibleCategory.CONSULTING), 2, [], "opened"));
    this.activities.push(new Activity(3, "Atividade 3", "Realizar nova atividade...", new Date(2021, 1, 1), 1, new Responsible(1, ResponsibleCategory.CONSULTING), 2, [], "opened"));
    this.tags.push(new Tag("test"));
    this.tags.push(new Tag("test 1"));
    this.tags.push(new Tag("bayer"));
  }

  private async getSequence(name): Promise<number> {
    if (name === "activity") return this.activities.length + 1;
    return this.tags.length + 1;
  }
 
  async findActivities(consultingId: number, month: number, year: number): Promise<Activity[]> {
    return this.activities.filter(activity => activity.consulting === consultingId && activity.month === month && activity.year === year);
  }
  
  async getActivity(activityId: number): Promise<Activity> {
    let activity = this.activities.find(activity => activity.id == activityId);
    if (!activity) throw new Error("Activity not found");
    return activity;
  }

  async saveActivity(activity: Activity): Promise<Activity> {
    activity.id = await this.getSequence("activity");
    this.activities.push(activity);
    return activity;
  }

  async updateActivity(activity: Activity): Promise<Activity> {
    let updatedActivity = this.activities.find(act => act.id === activity.id);
    if (!updatedActivity) throw new Error("Activity not found");
    Object.assign(updatedActivity, activity);
    return updatedActivity;
  }

  async saveTag(tag: Tag): Promise<Tag> {
    this.tags.push(tag);
    return tag;
  }

  async existsTag(tagName: string): Promise<Boolean> {
    return !!this.tags.find(tag => tag.name == tagName);
  }

  async findTag(tagName: string): Promise<Tag[]> {
    return this.tags.filter(tag => tagName === tag.name);
  }

  async getAllTags(): Promise<Tag[]> {
    return this.tags;
  }
}