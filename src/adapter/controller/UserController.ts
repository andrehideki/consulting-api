import TokenGenerator from "@domain/entity/TokenGenerator";
import RepositoryFactory from "@domain/factory/RepositoryFactory";
import LoginUser from "@domain/usecase/user/LoginUser";

export class UserController {

  constructor(
    private repositoryFactory: RepositoryFactory, 
    private tokenGenerator: TokenGenerator) { }

  async authenticateUser(params: any, body: any) {
    const authenticateUser = new LoginUser(this.repositoryFactory, this.tokenGenerator);
    return await authenticateUser.execute({
      email: body.email,
      password: body.password
    });
  }
}