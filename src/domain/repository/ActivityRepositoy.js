const Activity = require("./../entity/Activity");
const Tag = require("./../entity/Tag");

module.exports = class ActivityRepositoy {
    
    constructor() {
    }
    
    async saveActivity(activity) {
        this.checkCorrectType(activity, Activity);
    }

    async updateActivity(activity) {
        this.checkCorrectType(activity, Activity);
    }

    async saveTag(tag) {
        this.checkCorrectType(tag, Tag);
    }

    async existsTag(tag) {}
    async findActivities({ consultingId, month, year }) {}
    async findTag(tagName) {}
    async getAllTags() {}

    checkCorrectType(target, clazz) {
        if (!(target instanceof clazz)) {
            throw new Error("incompatible types");
        }
    }
}
