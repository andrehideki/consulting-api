const GetConsulting = require("../../../domain/usecase/GetConsulting");
const RepositoryFactoryJSON = require("../../../adapter/factory/RepositoryFactoryJSON");
const JSONDatabaseManager = require("../../../infra/database/JSONDatabaseManager");

let getConsulting;


describe("Get Consultings Test", function() {

    beforeEach(async () => {
        const jsonDatabaseManager = new JSONDatabaseManager();
        const database = await jsonDatabaseManager.read();
        const repositoryFactory = new RepositoryFactoryJSON(JSON.stringify(database));    
        getConsulting = new GetConsulting(repositoryFactory);
    });

    test("Should get and consulting by email", async () => {
        const consulting = await getConsulting.execute("beltrano@mail.com");
        expect(consulting.email).toBe("beltrano@mail.com");
        expect(consulting.name).toBe("Beltrano Beltranino");
        expect(consulting.birthDate).toBe("2000-10-15");
    });
});
