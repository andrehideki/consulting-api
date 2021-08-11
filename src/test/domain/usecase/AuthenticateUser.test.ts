import * as database from "@infra/database/db.json";
import { RepositoryFactoryJson } from "@adapter/factory/RepositoryFactoryJson";
import { AuthenticateUser } from "@domain/usecase/AuthenticateUser";
import { DataEncriptorBcrypt } from "@infra/services/DataEncriptorBcrypt";

let authenticateUser: AuthenticateUser;

describe("User Authentication Test", function() {
   
    beforeEach(async () => {
        const repositoryFactory = new RepositoryFactoryJson(database, new DataEncriptorBcrypt());
        authenticateUser = new AuthenticateUser(repositoryFactory);
    });

    test("Should authenticate with login and password", async () => {
        let output = await authenticateUser.execute({ email: "fulano@mail.com", password: "1234" });
        expect(output.email).toBe("fulano@mail.com");
    });

    test("Should throw error when password is incorrect", async () => {
        try {
            await authenticateUser.execute({ email: "fulano@mail.com", password: "invalid password" });
        } catch (e) {
            expect(e.message).toBe("Invalid password");
        }
    });
});