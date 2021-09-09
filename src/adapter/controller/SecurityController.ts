import RepositoryFactory from "@domain/factory/RepositoryFactory";
import { AuthenticateUser } from "@domain/usecase/user/AuthenticateUser";
import TokenGenerator from "@domain/entity/TokenGenerator";
import ValidateUserToken from "@domain/usecase/user/ValidateUserToken";

export default class SecurityController {
  constructor(
    private repositoryFactory: RepositoryFactory, 
    private tokenGenerator: TokenGenerator) {}

  async isAuthenticated(params: any, body: any, headers: any, cookie: any): Promise<void> {
    const authenticateUser: AuthenticateUser = new AuthenticateUser(this.tokenGenerator);
    await authenticateUser.execute({ token: cookie.auth });
  }

  async isTokenValid(params: any, body: any, headers: any) {
      return await new ValidateUserToken(this.tokenGenerator).execute({ token: body.token });
  }

  isAuthorized() {
    
  }
}