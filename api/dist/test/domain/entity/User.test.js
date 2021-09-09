"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../../domain/entity/User");
const DataEncriptorBcrypt_1 = __importDefault(require("../../../infra/services/DataEncriptorBcrypt"));
describe("User", () => {
    test("Should create a valid user", () => {
        let user = new User_1.User("fulano@mail.com", "$2b$04$UzfaPfNyxfGVq0ma.RuCrOvCuDhuKjmQjJgLhT6ZhcE9VihFzsZ5G", "CONSULTING", new DataEncriptorBcrypt_1.default());
        expect(user.email.value).toBe("fulano@mail.com");
        expect(user.category).toBe("CONSULTING");
    });
    test("Should authenticate password", () => {
        let user = new User_1.User("fulano@mail.com", "$2b$04$UzfaPfNyxfGVq0ma.RuCrOvCuDhuKjmQjJgLhT6ZhcE9VihFzsZ5G", "CONSULTING", new DataEncriptorBcrypt_1.default());
        expect(user.authenticate("1234")).toBeTruthy();
    });
});
