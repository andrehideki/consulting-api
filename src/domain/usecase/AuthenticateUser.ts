import { RepositoryFactory } from "@domain/factory/RepositoryFactory";
import { UserRepository } from "@domain/repository/UserRepository";

interface AuthenticateUserInput {
  email: string;
  password: string;
}

interface AuthenticateUserOuput {
  email: string;
  userCategory: string;
}

export class AuthenticateUser {

  userRepository: UserRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.userRepository = repositoryFactory.createUserRepository();
  }

  execute(input: AuthenticateUserInput): AuthenticateUserOuput {
    let user = this.userRepository.get(input.email);
    return {
      email: user.email,
      userCategory: ""
    }
  }
  
}