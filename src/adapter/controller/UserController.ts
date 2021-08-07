import { RepositoryFactory } from "@domain/factory/RepositoryFactory";
import { AuthenticateUser, AuthenticateUserInput } from "@domain/usecase/AuthenticateUser";

export class UserController {
    repositoryFactory: RepositoryFactory;

    constructor(repositoryFactory: RepositoryFactory) {
        this.repositoryFactory = repositoryFactory;
    }

    async authenticateUser(input: AuthenticateUserInput) {
        const authenticateUser = new AuthenticateUser(this.repositoryFactory);
        let output = await authenticateUser.execute(input);
        return output;
    }
}