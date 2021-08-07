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
        /*
            1234 = $2b$04$UzfaPfNyxfGVq0ma.RuCrOvCuDhuKjmQjJgLhT6ZhcE9VihFzsZ5G
            4321 = $2b$04$86GW68Xys0s9XexRe4acq.KAdbuZYDHqfKe6BPWkcnXICL8PVhTaq
        */
        const users = [
            { 
                email: "fulano@mail.com",
                password: "$2b$04$UzfaPfNyxfGVq0ma.RuCrOvCuDhuKjmQjJgLhT6ZhcE9VihFzsZ5G"
            },
            { 
                email: "beltrano@mail.com",
                password: "$2b$04$86GW68Xys0s9XexRe4acq.KAdbuZYDHqfKe6BPWkcnXICL8PVhTaq"
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
