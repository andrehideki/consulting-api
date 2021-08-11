import { GetConsulting } from "@domain/usecase/GetConsulting";
import { RepositoryFactoryMemory } from "@adapter/factory/RepositoryFactoryMemory";
import { DataEncriptorBcrypt } from "@infra/services/DataEncriptorBcrypt";

let getConsulting: GetConsulting;


describe("Get Consultings Test", function() {

    beforeEach(async () => {
        const repositoryFactory = new RepositoryFactoryMemory(new DataEncriptorBcrypt());    
        getConsulting = new GetConsulting(repositoryFactory);
    });

    test("Should get and consulting by email", async () => {
        const consulting = await getConsulting.execute("beltrano@mail.com");
        expect(consulting.email).toBe("beltrano@mail.com");
        expect(consulting.name).toBe("Beltrano Beltranino");
        expect(consulting.birthDate).toBe("2000-10-15");
    });
});
