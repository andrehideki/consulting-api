
module.exports = class GetTags {
    activityRepositoy;
    
    constructor(repositoryFactory) {
        this.activityRepositoy = repositoryFactory.createActivityRepository();        
    }

    async execute(tagName) {
        let tags;
        if (!tagName) {
            tags = await this.activityRepositoy.getAllTags();
        } else {
            tags = await this.activityRepositoy.findTag(tagName);    
        }
        return tags.map(tag => tag.name);
    }
}