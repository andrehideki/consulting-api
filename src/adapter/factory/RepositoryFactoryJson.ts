import { Email } from "@domain/entity/Email";
import { User } from "@domain/entity/User";
import { UserRepository } from "@domain/repository/UserRepository";
import { UserCategory } from "@domain/vo/UserCategory";
import { RepositoryFactory } from "@factory/RepositoryFactory";
import { ActivityRepositoryJson } from "@repositoryImpl/ActivityRepositoryJson";
import { ConsultingRepositoryJson } from "@repositoryImpl/ConsultingRepositoryJson";
import { DataEncriptorBcrypt } from "src/infra/services/DataEncriptorBcrypt";

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
        const users: User[] = [
            new User("fulano@mail.com", "$2b$04$UzfaPfNyxfGVq0ma.RuCrOvCuDhuKjmQjJgLhT6ZhcE9VihFzsZ5G", "CONSULTING", new DataEncriptorBcrypt()),
            new User("beltrano@mail.com", "$2b$04$86GW68Xys0s9XexRe4acq.KAdbuZYDHqfKe6BPWkcnXICL8PVhTaq", "CONSULTING", new DataEncriptorBcrypt()),
        ];

        return {
            get(email: string): User {
                let user = users.filter(user => user.email.value === email)[0];
                if (!user) throw new Error("User not found");
                return user;
            }
        };
    }
}
