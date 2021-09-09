"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GetActivity_1 = require("../../../../domain/usecase/activity/GetActivity");
const RepositoryFactoryMemory_1 = __importDefault(require("../../../../adapter/factory/RepositoryFactoryMemory"));
const DataEncriptorBcrypt_1 = __importDefault(require("../../../../infra/services/DataEncriptorBcrypt"));
describe("Get Activity", () => {
    let getActivity;
    beforeEach(() => {
        const repositoryFactory = new RepositoryFactoryMemory_1.default(new DataEncriptorBcrypt_1.default());
        getActivity = new GetActivity_1.GetActivity(repositoryFactory);
    });
    test("Should get an activity by id", async () => {
        const getActivityOuputData = await getActivity.execute(1);
        expect(getActivityOuputData.name).toBe("Nova atividade");
    });
    test("Should throw error when activity not found", async () => {
        try {
            await getActivity.execute(999);
        }
        catch (err) {
            expect(err.toString()).toBe("Error: Activity not found");
        }
    });
});
