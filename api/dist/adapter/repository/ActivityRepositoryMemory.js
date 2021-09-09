"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityRepositoryMemory = void 0;
const Activity_1 = require("../../domain/entity/Activity");
const Responsible_1 = require("../../domain/entity/Responsible");
const Tag_1 = require("../../domain/entity/Tag");
const ReponsibleCategory_1 = require("../../domain/valueobject/ReponsibleCategory");
class ActivityRepositoryMemory {
    constructor() {
        this.activities = [];
        this.tags = [];
        this.activities.push(new Activity_1.Activity(1, "Nova atividade", "Realizar nova atividade...", new Date(2021, 0, 1), 1, new Responsible_1.Responsible(1, ReponsibleCategory_1.ResponsibleCategory.CONSULTING), 8, [new Tag_1.Tag("test")], "opened"));
        this.activities.push(new Activity_1.Activity(2, "Atividade 2", "Realizar nova atividade...", new Date(2021, 0, 1), 1, new Responsible_1.Responsible(1, ReponsibleCategory_1.ResponsibleCategory.CONSULTING), 2, [], "opened"));
        this.activities.push(new Activity_1.Activity(3, "Atividade 3", "Realizar nova atividade...", new Date(2021, 1, 1), 1, new Responsible_1.Responsible(1, ReponsibleCategory_1.ResponsibleCategory.CONSULTING), 2, [], "opened"));
        this.tags.push(new Tag_1.Tag("test"));
        this.tags.push(new Tag_1.Tag("test 1"));
        this.tags.push(new Tag_1.Tag("bayer"));
    }
    async getSequence(name) {
        if (name === "activity")
            return this.activities.length + 1;
        return this.tags.length + 1;
    }
    async findActivities(consultingId, month, year) {
        return this.activities.filter(activity => activity.consulting === consultingId && activity.month === month && activity.year === year);
    }
    async getActivity(activityId) {
        let activity = this.activities.find(activity => activity.id === activityId);
        if (!activity)
            throw new Error("Activity not found");
        return activity;
    }
    async saveActivity(activity) {
        activity.id = await this.getSequence("activity");
        this.activities.push(activity);
        return activity;
    }
    async updateActivity(activity) {
        let updatedActivity = this.activities.find(act => act.id === activity.id);
        if (!updatedActivity)
            throw new Error("Activity not found");
        Object.assign(updatedActivity, activity);
        return updatedActivity;
    }
    async saveTag(tag) {
        this.tags.push(tag);
        return tag;
    }
    async existsTag(tagName) {
        return !!this.tags.find(tag => tag.name == tagName);
    }
    async findTag(tagName) {
        return this.tags.filter(tag => tagName === tag.name);
    }
    async getAllTags() {
        return this.tags;
    }
}
exports.ActivityRepositoryMemory = ActivityRepositoryMemory;
