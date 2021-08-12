import RepositoryFactory from "@domain/factory/RepositoryFactory";

export default class SecurityController {
  constructor(private repositoryFactory: RepositoryFactory) {}

  async isAuthenticated(params: any, body: any, headers: any): Promise<void> {
    
  }
}