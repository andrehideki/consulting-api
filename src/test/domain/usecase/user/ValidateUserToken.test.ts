import RepositoryFactoryMemory from "@adapter/factory/RepositoryFactoryMemory";
import TokenGenerator from "@domain/entity/TokenGenerator";
import LoginUser from "@domain/usecase/user/LoginUser";
import ValidateUserToken from "@domain/usecase/user/ValidateUserToken";
import DataEncriptorBcrypt from "@infra/services/DataEncriptorBcrypt";
import TokenGeneratorJWT from "@infra/services/TokenGeneratorJWT";

describe("Validate User Token Test", function () {

  let loginUser: LoginUser;
  let validateUserToken: ValidateUserToken;
  let tokenGenerator: TokenGenerator;

  beforeEach(async () => {
    const repositoryFactory = new RepositoryFactoryMemory(new DataEncriptorBcrypt());
    tokenGenerator = new TokenGeneratorJWT("CHAVE", "10s");
    validateUserToken = new ValidateUserToken(tokenGenerator);
    loginUser = new LoginUser(repositoryFactory, tokenGenerator);
  });

  test("Should validate token", async () => {
    let output = await loginUser.execute({ email: "fulano@mail.com", password: "1234" });
    expect(await validateUserToken.execute({ token: output.token })).toBeTruthy();
  });

  test("Should throw error when invalid token", async () => {
    try {
      await validateUserToken.execute({ token: 'invalid token' });
    } catch (e) {
      expect(e.message).toBe('Invalid token');
    }
  });

});