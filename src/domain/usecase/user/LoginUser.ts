import TokenGenerator from "@domain/entity/TokenGenerator";
import { AuthenticationError } from "@domain/error/AuthenticationError";
import RepositoryFactory from "@domain/factory/RepositoryFactory";
import { ConsultingRepository } from "@domain/repository/ConsultingRepository";
import { UserRepository } from "@domain/repository/UserRepository";

export interface AuthenticateUserInput {
  email: string;
  password: string;
}

export interface AuthenticateUserOuput {
  id: number;
  name: string;
  email: string;
  userCategory: string;
  token: string;
}

export default class LoginUser {

  userRepository: UserRepository;
  consultingRepository: ConsultingRepository;

  constructor(repositoryFactory: RepositoryFactory, 
    private tokenGenerator: TokenGenerator) {
    this.userRepository = repositoryFactory.createUserRepository();
    this.consultingRepository = repositoryFactory.createConsultingRepository();
  }

  async execute(input: AuthenticateUserInput): Promise<AuthenticateUserOuput> {
    let user = await this.userRepository.get(input.email);
    let isAuthenticated = await user.authenticate(input.password);
    let consulting = await this.consultingRepository.getByEmail(user.email.value);
    if (!isAuthenticated) throw new AuthenticationError("Invalid password");
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