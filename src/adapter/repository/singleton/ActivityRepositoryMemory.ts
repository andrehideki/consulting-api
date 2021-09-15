import { ActivityRepository } from "@domain/repository/ActivityRepository";
import { ActivityRepositoryMemory } from "@adapter/repository/ActivityRepositoryMemory";

export class ActivityRepositoryMemorySingleton {

  private static activityRepository: ActivityRepository;

  static getInstance(): ActivityRepository {
    if (!ActivityRepositoryMemorySingleton.activityRepository) {
      ActivityRepositoryMemorySingleton.activityRepository = new ActivityRepositoryMemory();
    }
    return ActivityRepositoryMemorySingleton.activityRepository;
  }

  static destroy(): void {
    ActivityRepositoryMemorySingleton.activityRepository = undefined;
  }
}