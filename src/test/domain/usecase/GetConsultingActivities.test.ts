import * as database from "@database/db.json";
import { RepositoryFactoryJson } from "@factoryImpl/RepositoryFactoryJson";
import { GetConsultingActivities } from "@domain/usecase/GetConsultingActivities";

let getActivity: GetConsultingActivities;

describe("Get Activities Test", function() {
    
    beforeEach(async () => {
        const repositoryFactory = new RepositoryFactoryJson(database);
        getActivity = new GetConsultingActivities(repositoryFactory);
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
