const GetActivities = require("../../../domain/usecase/GetActivities");
const RepositoryFactoryJSON = require("../../../adapter/factory/RepositoryFactoryJSON");
const JSONDatabaseManager = require("../../../infra/database/JSONDatabaseManager");

let getActivity;

describe("Get Activities Test", function() {
    
    beforeEach(async () => {
        const jsonDatabaseManager = new JSONDatabaseManager();
        const database = await jsonDatabaseManager.read();
        const repositoryFactory = new RepositoryFactoryJSON(JSON.stringify(database), jsonDatabaseManager);
        getActivity = new GetActivities(repositoryFactory);
    });

    test("Should get Activities", async () => {
        const activities = await getActivity.execute({
            consultingId: 1, 
            month: 1, 
            year: 2021
        });
        expect(activities.length).toBe(2);
    });
});
