import { User } from "@domain/entity/User";
import DataEncriptorBcrypt from "@infra/services/DataEncriptorBcrypt";

describe("User", () => {

  test("Should create a valid user", () => {
    let user = new User("fulano@mail.com", "$2b$04$UzfaPfNyxfGVq0ma.RuCrOvCuDhuKjmQjJgLhT6ZhcE9VihFzsZ5G", "CONSULTING", new DataEncriptorBcrypt());
    expect(user.email.value).toBe("fulano@mail.com");
    expect(user.category).toBe("CONSULTING");
  });

  test("Should authenticate password", () => {
    let user = new User("fulano@mail.com", "$2b$04$UzfaPfNyxfGVq0ma.RuCrOvCuDhuKjmQjJgLhT6ZhcE9VihFzsZ5G", "CONSULTING", new DataEncriptorBcrypt());
    expect(user.authenticate("1234")).toBeTruthy();
  });

});