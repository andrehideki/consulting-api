"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const Email_1 = require("./Email");
const UserCategory_1 = require("../vo/UserCategory");
class User {
    constructor(email, password, category, encryptor) {
        this.email = new Email_1.Email(email);
        this.password = password;
        this.category = UserCategory_1.getUserCategory(category);
        this.encryptor = encryptor;
    }
    async authenticate(password) {
        return await this.encryptor.match(password, this.password);
    }
}
exports.User = User;
