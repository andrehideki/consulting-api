import { RepositoryFactory } from "@domain/factory/RepositoryFactory";
import { UserRepository } from "@domain/repository/UserRepository";

export interface AuthenticateUserInput {
  email: string;
  password: string;
}

export interface AuthenticateUserOuput {
  email: string;
  userCategory: string;
}

export class AuthenticateUser {

  userRepository: UserRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.userRepository = repositoryFactory.createUserRepository();
  }

  async execute(input: AuthenticateUserInput): Promise<AuthenticateUserOuput> {
    let user = await this.userRepository.get(input.email);
    let isAuthenticated = await user.authenticate(input.password);
    if (!isAuthenticated) {
      console.log("here")
      throw new Error("Invalid password");
    }
    return {
      email: user.email.value,
      userCategory: user.category.toString()
    }
  }
  
}