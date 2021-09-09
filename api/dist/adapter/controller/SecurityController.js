"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticateUser_1 = require("../../domain/usecase/user/AuthenticateUser");
const ValidateUserToken_1 = __importDefault(require("../../domain/usecase/user/ValidateUserToken"));
class SecurityController {
    constructor(repositoryFactory, tokenGenerator) {
        this.repositoryFactory = repositoryFactory;
        this.tokenGenerator = tokenGenerator;
    }
    async isAuthenticated(params, body, headers, cookie) {
        const authenticateUser = new AuthenticateUser_1.AuthenticateUser(this.tokenGenerator);
        await authenticateUser.execute({ token: cookie.auth });
    }
    async isTokenValid(params, body, headers) {
        return await new ValidateUserToken_1.default(this.tokenGenerator).execute({ token: body.token });
    }
    isAuthorized() {
    }
}
exports.default = SecurityController;
