"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RepositoryFactoryMemory_1 = __importDefault(require("../../../../adapter/factory/RepositoryFactoryMemory"));
const LoginUser_1 = __importDefault(require("../../../../domain/usecase/user/LoginUser"));
const DataEncriptorBcrypt_1 = __importDefault(require("../../../../infra/services/DataEncriptorBcrypt"));
const TokenGeneratorJWT_1 = __importDefault(require("../../../../infra/services/TokenGeneratorJWT"));
describe("User Authentication Test", function () {
    let loginUser;
    let tokenGenerator;
    beforeEach(async () => {
        const repositoryFactory = new RepositoryFactoryMemory_1.default(new DataEncriptorBcrypt_1.default());
        tokenGenerator = new TokenGeneratorJWT_1.default("CHAVE", "10s");
        loginUser = new LoginUser_1.default(repositoryFactory, tokenGenerator);
    });
    test("Should authenticate with login and password", async () => {
        let output = await loginUser.execute({ email: "fulano@mail.com", password: "1234" });
        expect(output.email).toBe("fulano@mail.com");
    });
    test("Should throw error when password is incorrect", async () => {
        try {
            await loginUser.execute({ email: "fulano@mail.com", password: "invalid password" });
        }
        catch (e) {
            expect(e.message).toBe("Invalid password");
        }
    });
    test("Should get a token", async () => {
        let output = await loginUser.execute({ email: "fulano@mail.com", password: "1234" });
        expect(output.token.length > 0).toBeTruthy();
        expect(tokenGenerator.decode(output.token).email).toBe("fulano@mail.com");
    });
});
