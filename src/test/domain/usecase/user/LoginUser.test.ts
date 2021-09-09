import RepositoryFactoryMemory from "@adapter/factory/RepositoryFactoryMemory";
import TokenGenerator from "@domain/entity/TokenGenerator";
import LoginUser from "@domain/usecase/user/LoginUser";
import DataEncriptorBcrypt from "@infra/services/DataEncriptorBcrypt";
import TokenGeneratorJWT from "@infra/services/TokenGeneratorJWT";



describe("User Authentication Test", function () {

  let loginUser: LoginUser;
  let tokenGenerator: TokenGenerator;

  beforeEach(async () => {
    const repositoryFactory = new RepositoryFactoryMemory(new DataEncriptorBcrypt());
    tokenGenerator = new TokenGeneratorJWT("CHAVE", "10s");
    loginUser = new LoginUser(repositoryFactory, tokenGenerator);
  });

  test("Should authenticate with login and password", async () => {
    let output = await loginUser.execute({ email: "fulano@mail.com", password: "1234" });
    expect(output.email).toBe("fulano@mail.com");
  });

  test("Should throw error when password is incorrect", async () => {
    try {
      await loginUser.execute({ email: "fulano@mail.com", password: "invalid password" });
    } catch (e) {
      expect(e.message).toBe("Invalid password");
    }
  });

  test("Should get a token", async () => {
    let output = await loginUser.execute({ email: "fulano@mail.com", password: "1234" });
    expect(output.token.length > 0).toBeTruthy();
    expect(tokenGenerator.decode(output.token).email).toBe("fulano@mail.com");
  });
});