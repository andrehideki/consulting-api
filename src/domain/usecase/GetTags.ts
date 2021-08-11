import { RepositoryFactory } from "@domain/factory/RepositoryFactory";
import { ActivityRepository } from "@domain/repository/ActivityRepository";

export class GetTags {
    activityRepository: ActivityRepository;
    
    constructor(repositoryFactory: RepositoryFactory) {
        this.activityRepository = repositoryFactory.createActivityRepository();        
    }

    async execute(tagName): Promise<any> {
        let tags;
        if (!tagName) {
            tags = await this.activityRepository.getAllTags();
        } else {
            tags = await this.activityRepository.findTag(tagName);    
        }
        return tags.map(tag => tag.name);
    }
}