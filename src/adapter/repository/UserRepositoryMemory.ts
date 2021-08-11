import { User } from "@domain/entity/User";
import { UserRepository } from "@domain/repository/UserRepository";
import { DataEncriptor } from "@domain/entity/DataEncriptor";


export class UserRepositoryMemory implements UserRepository {
    
    private users: User[] = [];
    
    constructor(dataEncryptor: DataEncriptor) {
        /*
            1234 = $2b$04$UzfaPfNyxfGVq0ma.RuCrOvCuDhuKjmQjJgLhT6ZhcE9VihFzsZ5G
            4321 = $2b$04$86GW68Xys0s9XexRe4acq.KAdbuZYDHqfKe6BPWkcnXICL8PVhTaq
        */
        this.users.push(new User("fulano@mail.com", "$2b$04$UzfaPfNyxfGVq0ma.RuCrOvCuDhuKjmQjJgLhT6ZhcE9VihFzsZ5G", "CONSULTING", dataEncryptor));
        this.users.push(new User("beltrano@mail.com", "$2b$04$86GW68Xys0s9XexRe4acq.KAdbuZYDHqfKe6BPWkcnXICL8PVhTaq", "CONSULTING", dataEncryptor));
    }

    async get(email: string): Promise<User> {
        let user = this.users.find(user => user.email.value === email);
        if (!user) throw new Error("User not found");
        return user;
    }

}