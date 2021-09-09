"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RepositoryFactoryMemory_1 = __importDefault(require("../../../../adapter/factory/RepositoryFactoryMemory"));
const FinalizeMonthActivities_1 = require("../../../../domain/usecase/activity/FinalizeMonthActivities");
const DataEncriptorBcrypt_1 = __importDefault(require("../../../../infra/services/DataEncriptorBcrypt"));
let finalizeMonthActivities;
let activitiesRepository;
describe("Finalize month Activities Test", function () {
    beforeEach(async () => {
        const repositoryFactory = new RepositoryFactoryMemory_1.default(new DataEncriptorBcrypt_1.default());
        finalizeMonthActivities = new FinalizeMonthActivities_1.FinalizeMonthActivities(repositoryFactory);
        activitiesRepository = repositoryFactory.createActivityRepository();
    });
    test.only("Should finalize Activities", async () => {
        await finalizeMonthActivities.execute({ month: 1, year: 2021, consultingEmail: "fulano@hotmail.com" });
        const activities = await activitiesRepository.findActivities({ month: 1, year: 2021, consultingEmail: "fulano@hotmail.com" });
        activities.forEach(act => expect(act.status).toBe("finalized"));
    });
});
