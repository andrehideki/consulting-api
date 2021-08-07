import * as database from "@database/db.json";
import { RepositoryFactoryJson } from "@factoryImpl/RepositoryFactoryJson";
import { AuthenticateUser } from "@domain/usecase/AuthenticateUser";

let authenticateUser: AuthenticateUser;

describe("User Authentication Test", function() {
   
    beforeEach(async () => {
        const repositoryFactory = new RepositoryFactoryJson(database);
        authenticateUser = new AuthenticateUser(repositoryFactory);
    });

    test.only("Should authenticate with login and password", async () => {
        let output = authenticateUser.execute({ email: "fulano@mail.com", password: "teste" });
        expect(output.email).toBe("fulano@mail.com");
    });
});