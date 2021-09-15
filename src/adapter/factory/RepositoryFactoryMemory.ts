import { UserRepository } from "@domain/repository/UserRepository";
import RepositoryFactory from "@domain/factory/RepositoryFactory";
import DataEncriptor from "@domain/entity/DataEncriptor";

import { ActivityRepositoryMemory } from "@adapter/repository/ActivityRepositoryMemory";
import { ConsultingRepositoryMemory } from "@adapter/repository/ConsultingRepositoryMemory";
import { UserRepositoryMemory } from "@adapter/repository/UserRepositoryMemory";
import { ActivityRepositoryMemorySingleton } from "@adapter/repository/singleton/ActivityRepositoryMemory";


export default class RepositoryFactoryMemory implements RepositoryFactory {

  constructor(private dataEncryptor: DataEncriptor) {}

  createConsultingRepository() {
    return new ConsultingRepositoryMemory();
  }

  createActivityRepository() {
    // return new ActivityRepositoryMemory();
    return ActivityRepositoryMemorySingleton.getInstance();
  }

  createUserRepository(): UserRepository {
    return new UserRepositoryMemory(this.dataEncryptor);
  }
}
