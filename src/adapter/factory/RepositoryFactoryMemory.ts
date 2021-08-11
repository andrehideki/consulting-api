import { UserRepository } from "@domain/repository/UserRepository";
import { RepositoryFactory } from "@domain/factory/RepositoryFactory";
import { DataEncriptor } from "@domain/entity/DataEncriptor";

import { ActivityRepositoryMemory } from "@adapter/repository/ActivityRepositoryMemory";
import { ConsultingRepositoryMemory } from "@adapter/repository/ConsultingRepositoryMemory";
import { UserRepositoryMemory } from "@adapter/repository/UserRepositoryMemory";


export class RepositoryFactoryMemory implements RepositoryFactory {

  constructor(private dataEncryptor: DataEncriptor) {}

  createConsultingRepository() {
    return new ConsultingRepositoryMemory();
  }

  createActivityRepository() {
    return new ActivityRepositoryMemory();
  }

  createUserRepository(): UserRepository {
    return new UserRepositoryMemory(this.dataEncryptor);
  }
}
