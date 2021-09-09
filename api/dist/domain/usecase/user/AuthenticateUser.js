"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUser = void 0;
class AuthenticateUser {
    constructor(tokenGenerator) {
        this.tokenGenerator = tokenGenerator;
    }
    async execute(input) {
        const decodedToken = this.tokenGenerator.decode(input.token);
        return {
            email: decodedToken.email,
            userCategory: decodedToken.userCategory
        };
    }
}
exports.AuthenticateUser = AuthenticateUser;
