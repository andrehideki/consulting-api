import TokenGenerator from "@domain/entity/TokenGenerator";

export interface AuthenticateUserInput {
  token: string;
}

export interface AuthenticateUserOutput {
  email: string;
  userCategory: string;
}

export class AuthenticateUser {

  constructor(private tokenGenerator: TokenGenerator) {}

  async execute(input: AuthenticateUserInput): Promise<AuthenticateUserOutput> {
    const decodedToken = this.tokenGenerator.decode(input.token);
    return {
      email: decodedToken.email,
      userCategory: decodedToken.userCategory
    };
  }
}