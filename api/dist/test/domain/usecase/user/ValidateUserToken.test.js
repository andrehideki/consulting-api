"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RepositoryFactoryMemory_1 = __importDefault(require("../../../../adapter/factory/RepositoryFactoryMemory"));
const LoginUser_1 = __importDefault(require("../../../../domain/usecase/user/LoginUser"));
const ValidateUserToken_1 = __importDefault(require("../../../../domain/usecase/user/ValidateUserToken"));
const DataEncriptorBcrypt_1 = __importDefault(require("../../../../infra/services/DataEncriptorBcrypt"));
const TokenGeneratorJWT_1 = __importDefault(require("../../../../infra/services/TokenGeneratorJWT"));
describe("Validate User Token Test", function () {
    let loginUser;
    let validateUserToken;
    let tokenGenerator;
    beforeEach(async () => {
        const repositoryFactory = new RepositoryFactoryMemory_1.default(new DataEncriptorBcrypt_1.default());
        tokenGenerator = new TokenGeneratorJWT_1.default("CHAVE", "10s");
        validateUserToken = new ValidateUserToken_1.default(tokenGenerator);
        loginUser = new LoginUser_1.default(repositoryFactory, tokenGenerator);
    });
    test("Should validate token", async () => {
        let output = await loginUser.execute({ email: "fulano@mail.com", password: "1234" });
        expect(await validateUserToken.execute({ token: output.token })).toBeTruthy();
    });
    test("Should throw error when invalid token", async () => {
        try {
            await validateUserToken.execute({ token: 'invalid token' });
        }
        catch (e) {
            expect(e.message).toBe('Invalid token');
        }
    });
});
