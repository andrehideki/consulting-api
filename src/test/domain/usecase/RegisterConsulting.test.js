const RegisterConsulting = require("../../../domain/usecase/RegisterConsulting");
const RepositoryFactoryJSON = require("../../../adapter/factory/RepositoryFactoryJSON");
const JSONDatabaseManager = require("../../../infra/database/JSONDatabaseManager");

let registerConsulting;
let consultingRepository;

describe("Register Consulting Test", function() {
    
    beforeEach(async () => {
        const jsonDatabaseManager = new JSONDatabaseManager();
        const database = await jsonDatabaseManager.read();
        const repositoryFactory = new RepositoryFactoryJSON(JSON.stringify(database));
        registerConsulting = new RegisterConsulting(repositoryFactory);
        consultingRepository = registerConsulting.consultingRepository;
    });
    
    test("Should register consulting", async () => {
        const originalSize = await consultingRepository.count();
        await registerConsulting.execute({
            firstName: "André",
            lastName: "Watanabe",
            birthDate: "1997-12-05",
            emailAddress: "andre.hkiw@gmail.com"
        });
        const afterRegisteringSize = await consultingRepository.count();
        expect(afterRegisteringSize).toBe(originalSize + 1);
    });
    
    test("Should generate consulting id", async () => {
        const consultingOuput = await registerConsulting.execute({
            firstName: "André",
            lastName: "Watanabe",
            birthDate: "1997-12-05",
            emailAddress: "andre.hkiw@gmail.com"
        });
        expect(consultingOuput.id).not.toBeNull();
    });
});
