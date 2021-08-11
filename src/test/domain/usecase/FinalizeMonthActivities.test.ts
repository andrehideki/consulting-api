import * as database from "@infra/database/db.json";
import { RepositoryFactoryJson } from "@adapter/factory/RepositoryFactoryJson";
import { FinalizeMonthActivities } from "@domain/usecase/FinalizeMonthActivities";

let finalizeMonthActivities;
let activitiesRepository;


describe("Finalize month Activities Test", function() {
   
    beforeEach(async () => {
        const repositoryFactory = new RepositoryFactoryJson(database);
        finalizeMonthActivities = new FinalizeMonthActivities(repositoryFactory);
        activitiesRepository = repositoryFactory.createActivityRepository();
    });

    test.only("Should finalize Activities", async () => {
        await finalizeMonthActivities.execute({ month: 1, year: 2021, consultingEmail: "fulano@hotmail.com"});
        const activities = await activitiesRepository.findActivities({ month: 1, year: 2021, consultingEmail: "fulano@hotmail.com"});
        activities.forEach(act => expect(act.status).toBe("finalized"));
    });
});