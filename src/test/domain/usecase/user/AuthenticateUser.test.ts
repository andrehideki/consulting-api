import TokenGenerator from "@domain/entity/TokenGenerator";
import LoginUser from "@domain/usecase/LoginUser";
import RepositoryFactoryMemory from "@adapter/factory/RepositoryFactoryMemory";
import DataEncriptorBcrypt from "@infra/services/DataEncriptorBcrypt";
import TokenGeneratorJWT from "@infra/services/TokenGeneratorJWT";
import { AuthenticateUser } from "@domain/usecase/user/AuthenticateUser";

describe("User Authentication Test", function () {

  let authenticateUser: AuthenticateUser;
  let loginUser: LoginUser;
  let tokenGenerator: TokenGenerator;

  beforeEach(async () => {
    const repositoryFactory = new RepositoryFactoryMemory(new DataEncriptorBcrypt());
    tokenGenerator = new TokenGeneratorJWT("CHAVE", "5s");
    authenticateUser = new AuthenticateUser(tokenGenerator);
    loginUser = new LoginUser(repositoryFactory, tokenGenerator);
  });

  test("Should authenticate with token", async () => {
    const token = (await loginUser.execute({ email: "fulano@mail.com", password: "1234" })).token;
    const output = await authenticateUser.execute({ token });
    expect(output.email).toBe("fulano@mail.com");
    expect(output.userCategory).toBe("CONSULTING");
  });

  test("Should throw error when token is expired", async () => {
    const expiredToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bGFub0BtYWlsLmNvbSIsInVzZXJDYXRlZ29yeSI6IkNPTlNVTFRJTkciLCJpYXQiOjE2Mjg5NjA2MDcsImV4cCI6MTYyODk2MDYxN30.twqcZnyZleVSPLUEGl70B254U8cbVaGGigclwc1tVko";
    try {
      await authenticateUser.execute({ token: expiredToken })
    } catch (error) {
      expect(error.message).toBe('Invalid token')
    }
  });

  test("Should throw error when token is invalid", async () => {
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bGFub0BtYWlsLmNvbSIsInVzZXJDYXRlZ29yeSI6IkNPTlNVTFRJTkciLCJpYXQiOjE2Mjg5NjI5MDksImV4cCI6MTYyODk2MjkxNH0.unRukSvDdtxgBwu2PuwANLcL9SWOhBALL9RsdUFpa_Y";
    try {
      await authenticateUser.execute({ token: invalidToken });
    } catch (error) {
      expect(error.message).toBe('Invalid token')
    }
  });
});