"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LoginUser_1 = __importDefault(require("../../../../domain/usecase/user/LoginUser"));
const RepositoryFactoryMemory_1 = __importDefault(require("../../../../adapter/factory/RepositoryFactoryMemory"));
const DataEncriptorBcrypt_1 = __importDefault(require("../../../../infra/services/DataEncriptorBcrypt"));
const TokenGeneratorJWT_1 = __importDefault(require("../../../../infra/services/TokenGeneratorJWT"));
const AuthenticateUser_1 = require("../../../../domain/usecase/user/AuthenticateUser");
describe("User Authentication Test", function () {
    let authenticateUser;
    let loginUser;
    let tokenGenerator;
    beforeEach(async () => {
        const repositoryFactory = new RepositoryFactoryMemory_1.default(new DataEncriptorBcrypt_1.default());
        tokenGenerator = new TokenGeneratorJWT_1.default("CHAVE", "5s");
        authenticateUser = new AuthenticateUser_1.AuthenticateUser(tokenGenerator);
        loginUser = new LoginUser_1.default(repositoryFactory, tokenGenerator);
    });
    test("Should authenticate with token", async () => {
        const token = (await loginUser.execute({ email: "fulano@mail.com", password: "1234" })).token;
        const output = await authenticateUser.execute({ token });
        expect(output.email).toBe("fulano@mail.com");
        expect(output.userCategory).toBe("CONSULTING");
    });
    test("Should throw error when token is expired", async () => {
        const expiredToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bGFub0BtYWlsLmNvbSIsInVzZXJDYXRlZ29yeSI6IkNPTlNVTFRJTkciLCJpYXQiOjE2Mjg5NjA2MDcsImV4cCI6MTYyODk2MDYxN30.twqcZnyZleVSPLUEGl70B254U8cbVaGGigclwc1tVko";
        try {
            await authenticateUser.execute({ token: expiredToken });
        }
        catch (error) {
            expect(error.message).toBe('Invalid token');
        }
    });
    test("Should throw error when token is invalid", async () => {
        const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bGFub0BtYWlsLmNvbSIsInVzZXJDYXRlZ29yeSI6IkNPTlNVTFRJTkciLCJpYXQiOjE2Mjg5NjI5MDksImV4cCI6MTYyODk2MjkxNH0.unRukSvDdtxgBwu2PuwANLcL9SWOhBALL9RsdUFpa_Y";
        try {
            await authenticateUser.execute({ token: invalidToken });
        }
        catch (error) {
            expect(error.message).toBe('Invalid token');
        }
    });
});
