"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticationError_1 = require("../../error/AuthenticationError");
class LoginUser {
    constructor(repositoryFactory, tokenGenerator) {
        this.tokenGenerator = tokenGenerator;
        this.userRepository = repositoryFactory.createUserRepository();
        this.consultingRepository = repositoryFactory.createConsultingRepository();
    }
    async execute(input) {
        let user = await this.userRepository.get(input.email);
        let isAuthenticated = await user.authenticate(input.password);
        let consulting = await this.consultingRepository.getByEmail(user.email.value);
        if (!isAuthenticated)
            throw new AuthenticationError_1.AuthenticationError("Invalid password");
        return {
            id: consulting.id,
            name: consulting.name.value,
            email: user.email.value,
            userCategory: user.category.toString(),
            token: this.tokenGenerator.generate({
                email: user.email.value,
                userCategory: user.category.toString()
            })
        };
    }
}
exports.default = LoginUser;
