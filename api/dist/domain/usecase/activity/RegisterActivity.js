"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterActivity = void 0;
const Activity_1 = require("../../entity/Activity");
const Tag_1 = require("../../entity/Tag");
class RegisterActivity {
    constructor(repositoryFactory) {
        this.activityRepositoy = repositoryFactory.createActivityRepository();
        this.consultingRepository = repositoryFactory.createConsultingRepository();
    }
    async execute({ name, description, date, consultingId, amountOfHours, responsible, tags }) {
        const consulting = await this.consultingRepository.getById(consultingId);
        const activity = new Activity_1.Activity(undefined, name, description, new Date(`${date}T00:00:00`), consulting.id, responsible, amountOfHours, tags.map(tagName => new Tag_1.Tag(tagName)), "Opened");
        await this.activityRepositoy.saveActivity(activity);
        if (tags) {
            for (let tag of activity.tags) {
                let existsTag = await this.activityRepositoy.existsTag(tag.name);
                if (!existsTag) {
                    await this.activityRepositoy.saveTag(tag);
                }
            }
        }
    }
}
exports.RegisterActivity = RegisterActivity;
