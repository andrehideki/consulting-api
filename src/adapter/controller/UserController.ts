import RepositoryFactory from "@domain/factory/RepositoryFactory";
import { AuthenticateUser } from "@domain/usecase/AuthenticateUser";

export class UserController {

  constructor(private repositoryFactory: RepositoryFactory) { }

  async authenticateUser(params: any, body: any) {
    const authenticateUser = new AuthenticateUser(this.repositoryFactory);
    let output = await authenticateUser.execute({
      email: body.email,
      password: body.password
    });
    return output;
  }
}