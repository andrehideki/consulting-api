import { UserRepository } from "@domain/repository/UserRepository";
import { RepositoryFactory } from "@domain/factory/RepositoryFactory";
import { ActivityRepositoryJson } from "@adapter/repository/ActivityRepositoryJson";
import { ConsultingRepositoryJson } from "@adapter/repository/ConsultingRepositoryJson";
import { UserRepositoryMemory } from "@adapter/repository/UserRepositoryMemory";
import { DataEncriptor } from "@domain/entity/DataEncriptor";

export class RepositoryFactoryJson implements RepositoryFactory {
    databaseJson: any;

    constructor(databaseJson, private dataEncryptor: DataEncriptor) {
        this.databaseJson = JSON.parse(JSON.stringify(databaseJson));
    }

    createConsultingRepository() {
        return new ConsultingRepositoryJson(this.databaseJson);
    }

    createActivityRepository() {
        return new ActivityRepositoryJson(this.databaseJson);
    }

    createUserRepository(): UserRepository {
        return new UserRepositoryMemory(this.dataEncryptor);
    }
}
