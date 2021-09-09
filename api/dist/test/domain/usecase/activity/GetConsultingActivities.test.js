"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RepositoryFactoryMemory_1 = __importDefault(require("../../../../adapter/factory/RepositoryFactoryMemory"));
const GetConsultingActivities_1 = require("../../../../domain/usecase/activity/GetConsultingActivities");
const DataEncriptorBcrypt_1 = __importDefault(require("../../../../infra/services/DataEncriptorBcrypt"));
let getActivity;
describe("Get Activities Test", function () {
    beforeEach(async () => {
        const repositoryFactory = new RepositoryFactoryMemory_1.default(new DataEncriptorBcrypt_1.default());
        getActivity = new GetConsultingActivities_1.GetConsultingActivities(repositoryFactory);
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
