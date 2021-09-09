"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidateUserToken {
    constructor(tokenGenerator) {
        this.tokenGenerator = tokenGenerator;
    }
    async execute(input) {
        const decodedToken = this.tokenGenerator.decode(input.token);
        return !!decodedToken;
    }
}
exports.default = ValidateUserToken;
