import { Activity } from "@entity/Activity";
import { Tag } from "@entity/Tag";

export interface ActivityRepository {
    // Activity
    saveActivity(activity: Activity): Promise<Activity>;
    updateActivity(activity: Activity): Promise<Activity>;
    findActivities(consultingId: number, month: number, year: number): Promise<Activity[]>;
    getActivity(activityId: number): Promise<Activity>;
    // Tag
    saveTag(tag: Tag): Promise<Tag>;
    existsTag(tag): Promise<Boolean>;
    findTag(tagName: String): Promise<Tag[]>;
    getAllTags(): Promise<Tag[]>;
}
