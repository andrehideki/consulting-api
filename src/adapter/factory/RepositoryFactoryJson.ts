import { RepositoryFactory } from "@factory/RepositoryFactory";
import { ActivityRepositoryJson } from "@repositoryImpl/ActivityRepositoryJson";
import { ConsultingRepositoryJson } from "@repositoryImpl/ConsultingRepositoryJson";

export class RepositoryFactoryJson implements RepositoryFactory {
    databaseJson: any;

    constructor(databaseJson) {
        this.databaseJson = JSON.parse(JSON.stringify(databaseJson));
    }

    createConsultingRepository() {
        return new ConsultingRepositoryJson(this.databaseJson);
    }

    createActivityRepository() {
        return new ActivityRepositoryJson(this.databaseJson);
    }
}
