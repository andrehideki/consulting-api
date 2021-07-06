import * as database from "@database/db.json";
import { RepositoryFactoryJson } from "@factoryImpl/RepositoryFactoryJson";
import { GetActivities } from "@domain/usecase/GetActivities";

let getActivity: GetActivities;

describe("Get Activities Test", function() {
    
    beforeEach(async () => {
        const repositoryFactory = new RepositoryFactoryJson(database);
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
