const FinalizeMonthActivities = require("../../../domain/usecase/FinalizeMonthActivities");
const RepositoryFactoryJSON = require("../../../adapter/factory/RepositoryFactoryJSON");
const JSONDatabaseManager = require("../../../infra/database/JSONDatabaseManager");

let finalizeMonthActivities;
let activitiesRepository;


describe("Finalize month Activities Test", function() {
   
    beforeEach(async () => {
        const jsonDatabaseManager = new JSONDatabaseManager();
        const database = await jsonDatabaseManager.read();
        const repositoryFactory = new RepositoryFactoryJSON(JSON.stringify(database), jsonDatabaseManager);
        finalizeMonthActivities = new FinalizeMonthActivities(repositoryFactory);
        activitiesRepository = repositoryFactory.createActivityRepository();
    });

    test.only("Should finalize Activities", async () => {
        await finalizeMonthActivities.execute({ month: 1, year: 2021, consultingEmail: "fulano@hotmail.com"});
        const activities = await activitiesRepository.findActivities({ month: 1, year: 2021, consultingEmail: "fulano@hotmail.com"});
        activities.forEach(act => expect(act.status).toBe("finalized"));
    });
});