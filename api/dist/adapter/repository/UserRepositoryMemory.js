"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryMemory = void 0;
const User_1 = require("../../domain/entity/User");
class UserRepositoryMemory {
    constructor(dataEncryptor) {
        this.users = [];
        this.users.push(new User_1.User("fulano@mail.com", "$2b$04$UzfaPfNyxfGVq0ma.RuCrOvCuDhuKjmQjJgLhT6ZhcE9VihFzsZ5G", "CONSULTING", dataEncryptor));
        this.users.push(new User_1.User("beltrano@mail.com", "$2b$04$86GW68Xys0s9XexRe4acq.KAdbuZYDHqfKe6BPWkcnXICL8PVhTaq", "CONSULTING", dataEncryptor));
    }
    async get(email) {
        let user = this.users.find(user => user.email.value === email);
        if (!user)
            throw new Error("User not found");
        return user;
    }
}
exports.UserRepositoryMemory = UserRepositoryMemory;
