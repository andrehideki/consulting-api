import { User } from "@domain/entity/User";
import { UserRepository } from "@domain/repository/UserRepository";
import DataEncriptor from "@domain/entity/DataEncriptor";


export class UserRepositoryMemory implements UserRepository {
    
    private users: User[] = [];
    
    constructor(dataEncryptor: DataEncriptor) {
        /*
            1234 = $2b$04$UzfaPfNyxfGVq0ma.RuCrOvCuDhuKjmQjJgLhT6ZhcE9VihFzsZ5G
            4321 = $2b$04$86GW68Xys0s9XexRe4acq.KAdbuZYDHqfKe6BPWkcnXICL8PVhTaq
            admin = $2b$10$oBg7O3eWXww21N898Fbt3uVflWjLu2jb4H2mC8l78use7i1KipW/m
            owner = $2b$10$QbdimKOXFWd7gOYrSVpK5uwwkzXCe9rNWVx8atZviqPnKiXbUpkLu
        */
        this.users.push(new User(1, "fulano@mail.com", "$2b$04$UzfaPfNyxfGVq0ma.RuCrOvCuDhuKjmQjJgLhT6ZhcE9VihFzsZ5G", "CONSULTING", dataEncryptor));
        this.users.push(new User(2, "beltrano@mail.com", "$2b$04$86GW68Xys0s9XexRe4acq.KAdbuZYDHqfKe6BPWkcnXICL8PVhTaq", "CONSULTING", dataEncryptor));
        this.users.push(new User(3, "admin@mail.com", "$2b$10$oBg7O3eWXww21N898Fbt3uVflWjLu2jb4H2mC8l78use7i1KipW/m", "ADMIN", dataEncryptor));
        this.users.push(new User(4, "owner@mail.com", "$2b$10$QbdimKOXFWd7gOYrSVpK5uwwkzXCe9rNWVx8atZviqPnKiXbUpkLu", "OWNER", dataEncryptor));
    }

    async get(email: string): Promise<User> {
        let user = this.users.find(user => user.email.value === email);
        if (!user) throw new Error("User not found");
        return user;
    }

}