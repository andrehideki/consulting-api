import * as database from "@infra/database/db.json";
import { RepositoryFactoryJson } from "@adapter/factory/RepositoryFactoryJson";
import { GetConsultingActivities } from "@domain/usecase/GetConsultingActivities";
import { DataEncriptorBcrypt } from "@infra/services/DataEncriptorBcrypt";

let getActivity: GetConsultingActivities;

describe("Get Activities Test", function() {
    
    beforeEach(async () => {
        const repositoryFactory = new RepositoryFactoryJson(database, new DataEncriptorBcrypt());
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
