const Activity = require("../../../domain/entity/Activity");
const Tag = require("../../../domain/entity/Tag");
const ActivityRepositoy = require("../../../domain/repository/ActivityRepositoy");

module.exports = class ActivityRepositoryJSON extends ActivityRepositoy {
    database;

    constructor(database) {
        super();
        this.database = database;
    }

    async getSequence(name) {
        const sequence = this.database.sequences[name];
        this.database.sequences[name] += 1;
        return sequence;
    }

    async countActivities() {
        return Object.keys(this.database.tables.activity).length;
    }

    async saveActivity(activity) {
        super.saveActivity(activity);
        activity.id = await this.getSequence("activity");
        this.database.tables.activity[activity.id] = {
            id: activity.id,
            name: activity.name,
            description: activity.description,
            date: activity.date.toISOString().substring().substring(0, 10),
            consulting: activity.consulting.id,
            hours: activity.hours,
            tags: activity.tags
        };
        return activity;
    }

    async updateActivity(activity) {
        super.updateActivity(activity);
        this.database.tables.activity[activity.id] = {
            id: activity.id,
            name: activity.name,
            description: activity.description,
            date: activity.date.toISOString().substring().substring(0, 10),
            consulting: activity.consulting.id,
            hours: activity.hours,
            tags: activity.tags
        };
        return activity;
    }
    
    async saveTag(tag) {
        super.saveTag(tag);
        this.database.tables.tag[tag.name.toLowerCase()] = { 
            name: tag.name
        };
        return tag;
    }

    async existsTag(tagName) {
        return !!this.database.tables.tag[tagName.toLowerCase()];
    }

    async findActivities({ consultingId, month, year }) {
        let findedActivities = [];
        for (let id of Object.keys(this.database.tables.activity)) {
            let activity = this.database.tables.activity[id];
            let activityDate = new Date(activity.date);
            if (activity.consulting === consultingId && (activityDate.getMonth() + 1) === month && activityDate.getFullYear() === year) {
                findedActivities.push(new Activity({ 
                    id: activity.id,
                    consulting: activity.consulting,
                    date: activityDate,
                    name: activity.name,
                    description: activity.description,
                    hours: activity.hours,
                    status: activity.status,
                    tags: activity.tags
                }));
            }
        }
        return findedActivities;
    }

    async findTag(tagName) {
        let tag = this.database.tables.tag[tagName.toLowerCase()];
        if (!!tag) return [tag];
        return [];
    }

    async getAllTags() {
        return Object.keys(this.database.tables.tag)
            .map(key => new Tag(this.database.tables.tag[key].name));
    }
}