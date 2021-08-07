import { UserRepository } from "@domain/repository/UserRepository";
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

    createUserRepository(): UserRepository {
        const users = [
            { 
                email: "fulano@mail.com",
                password: "1234"
            },
            { 
                email: "beltrano@mail.com",
                password: "4321"
            }
        ];

        return {
            get(email: string) {
                let user = users.filter(user => user.email === email)[0];
                if (!user) throw new Error("User not found");
                return user;
            }
        };
    }
}
