import { GetConsulting } from "@domain/usecase/GetConsulting";
import { RepositoryFactoryJson } from "@factoryImpl/RepositoryFactoryJson";
import * as database from "@database/db.json";

let getConsulting;


describe("Get Consultings Test", function() {

    beforeEach(async () => {
        const repositoryFactory = new RepositoryFactoryJson(database);    
        getConsulting = new GetConsulting(repositoryFactory);
    });

    test("Should get and consulting by email", async () => {
        const consulting = await getConsulting.execute("beltrano@mail.com");
        expect(consulting.email).toBe("beltrano@mail.com");
        expect(consulting.name).toBe("Beltrano Beltranino");
        expect(consulting.birthDate).toBe("2000-10-15");
    });
});
