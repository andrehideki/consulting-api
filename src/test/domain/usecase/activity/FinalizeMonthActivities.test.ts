import RepositoryFactoryMemory from "@adapter/factory/RepositoryFactoryMemory";
import { FinalizeMonthActivities } from "@domain/usecase/activity/FinalizeMonthActivities";
import DataEncriptorBcrypt from "@infra/services/DataEncriptorBcrypt";

let finalizeMonthActivities;
let activitiesRepository;


describe("Finalize month Activities Test", function() {
   
    beforeEach(async () => {
        const repositoryFactory = new RepositoryFactoryMemory(new DataEncriptorBcrypt());
        finalizeMonthActivities = new FinalizeMonthActivities(repositoryFactory);
        activitiesRepository = repositoryFactory.createActivityRepository();
    });

    test.only("Should finalize Activities", async () => {
        await finalizeMonthActivities.execute({ month: 1, year: 2021, consultingEmail: "fulano@hotmail.com"});
        const activities = await activitiesRepository.findActivities({ month: 1, year: 2021, consultingEmail: "fulano@hotmail.com"});
        activities.forEach(act => expect(act.status).toBe("finalized"));
    });
});