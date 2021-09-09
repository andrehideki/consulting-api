"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const LoginUser_1 = __importDefault(require("../../domain/usecase/user/LoginUser"));
class UserController {
    constructor(repositoryFactory, tokenGenerator) {
        this.repositoryFactory = repositoryFactory;
        this.tokenGenerator = tokenGenerator;
    }
    async authenticateUser(params, body) {
        const authenticateUser = new LoginUser_1.default(this.repositoryFactory, this.tokenGenerator);
        return await authenticateUser.execute({
            email: body.email,
            password: body.password
        });
    }
}
exports.UserController = UserController;
