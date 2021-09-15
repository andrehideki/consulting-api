import { UserRepository } from "@domain/repository/UserRepository";
import RepositoryFactory from "@domain/factory/RepositoryFactory";
import DataEncriptor from "@domain/entity/DataEncriptor";

import { UserRepositoryMemory } from "@adapter/repository/UserRepositoryMemory";
import { ActivityRepositoryMemorySingleton } from "@adapter/repository/singleton/ActivityRepositoryMemorySingleton";
import { ConsultingRepositoryMemorySingleton } from "@adapter/repository/singleton/ConsultingRepositoryMemorySingleton";
import { ConsultingRepository } from "@domain/repository/ConsultingRepository";
import { ActivityRepository } from "@domain/repository/ActivityRepository";


export default class RepositoryFactoryMemory implements RepositoryFactory {

  constructor(private dataEncryptor: DataEncriptor) {}

  createConsultingRepository(): ConsultingRepository {
    // return new ConsultingRepositoryMemory();
    return ConsultingRepositoryMemorySingleton.getInstance();
  }

  createActivityRepository(): ActivityRepository {
    // return new ActivityRepositoryMemory();
    return ActivityRepositoryMemorySingleton.getInstance();
  }

  createUserRepository(): UserRepository {
    return new UserRepositoryMemory(this.dataEncryptor);
  }
}
