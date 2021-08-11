import { Activity } from "@domain/entity/Activity";
import { Tag } from "@domain/entity/Tag";
import { ActivityRepository } from "@domain/repository/ActivityRepository";

export class ActivityRepositoryJson implements ActivityRepository {
    database: any;

    constructor(database: any) {
        this.database = database;
    }
    
    private async getSequence(name): Promise<number> {
        const sequence = this.database.sequences[name];
        this.database.sequences[name] += 1;
        return sequence;
    }

    async saveActivity(activity: Activity): Promise<Activity> {
        activity.id = await this.getSequence("activity");
        this.database.tables.activity[`${activity.id}`] = {
            id: activity.id,
            name: activity.name,
            description: activity.description,
            date: activity.date.toISOString().substring(0, 10),
            consulting: activity.consulting,
            hours: activity.hours,
            tags: activity.tags
        };
        return activity;
    }

    async updateActivity(activity: Activity): Promise<Activity> {
        this.database.tables.activity[`${activity.id}`] = {
            id: activity.id,
            name: activity.name,
            description: activity.description,
            date: activity.date.toString(),
            consulting: activity.consulting,
            hours: activity.hours,
            tags: activity.tags
        };
        return activity;
    }
    
    async saveTag(tag: Tag): Promise<Tag> {
        this.database.tables.tag[tag.name.toLowerCase()] = { 
            name: tag.name
        };
        return tag;
    }

    async existsTag(tagName: string): Promise<Boolean> {
        return !!this.database.tables.tag[tagName.toLowerCase()];
    }

    async findActivities(consultingId: number, month: number, year: number): Promise<Activity[]> {
        let findedActivities = [];
        for (let id of Object.keys(this.database.tables.activity)) {
            let activity = this.database.tables.activity[id];
            let activityDate = new Date(`${activity.date}:`);
            if (activity.consulting === consultingId && (activityDate.getMonth() + 1) === month && activityDate.getFullYear() === year) {
                findedActivities.push(new Activity(activity.id, activity.name, activity.description, activityDate, activity.consulting, 
                    activity.responsible, activity.hours, activity.tags, activity.status));
            }
        }
        return findedActivities;
    }

    async getActivity(activityId: number): Promise<Activity> {
        let activity = this.database.tables.activity[activityId];
        if (!activity) {
            throw new Error("Activity not found");
        }
        //id: number, name: string, description: string, date: Date, consulting: number, responsible: Responsible, hours: number, tags: Tag[], status: string) {
        return new Activity(activity.id, activity.name, activity.description, new Date(`${activity.date}:`), activity.consulting,
            activity.responsible, activity.hours, activity.tags, activity.status);
    }

    async findTag(tagName: string): Promise<Tag[]> {
        let tag = this.database.tables.tag[tagName.toLowerCase()];
        if (!!tag) return [new Tag(tag.name)];
        return [];
    }

    async getAllTags(): Promise<Tag[]> {
        return Object.keys(this.database.tables.tag)
            .map(key => new Tag(this.database.tables.tag[key].name));
    }
}