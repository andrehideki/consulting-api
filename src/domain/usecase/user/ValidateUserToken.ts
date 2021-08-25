import TokenGenerator from "@domain/entity/TokenGenerator";

export interface ValidateUserTokenInput {
  token: string;
}

export default class ValidateUserToken {
  constructor(private tokenGenerator: TokenGenerator) {}

  async execute(input: ValidateUserTokenInput): Promise<boolean> {
    const decodedToken = this.tokenGenerator.decode(input.token);
    return !!decodedToken;
  }
}