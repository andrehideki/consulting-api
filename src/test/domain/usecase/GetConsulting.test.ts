import { GetConsulting } from "@domain/usecase/GetConsulting";
import { RepositoryFactoryJson } from "@adapter/factory/RepositoryFactoryJson";
import * as database from "@infra/database/db.json";
import { DataEncriptorBcrypt } from "@infra/services/DataEncriptorBcrypt";

let getConsulting;


describe("Get Consultings Test", function() {

    beforeEach(async () => {
        const repositoryFactory = new RepositoryFactoryJson(database, new DataEncriptorBcrypt());    
        getConsulting = new GetConsulting(repositoryFactory);
    });

    test("Should get and consulting by email", async () => {
        const consulting = await getConsulting.execute("beltrano@mail.com");
        expect(consulting.email).toBe("beltrano@mail.com");
        expect(consulting.name).toBe("Beltrano Beltranino");
        expect(consulting.birthDate).toBe("2000-10-15");
    });
});
