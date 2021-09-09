"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTags = void 0;
class GetTags {
    constructor(repositoryFactory) {
        this.activityRepository = repositoryFactory.createActivityRepository();
    }
    async execute(tagName) {
        let tags;
        if (!tagName) {
            tags = await this.activityRepository.getAllTags();
        }
        else {
            tags = await this.activityRepository.findTag(tagName);
        }
        return tags.map(tag => tag.name);
    }
}
exports.GetTags = GetTags;
