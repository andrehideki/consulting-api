"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RepositoryFactoryMemory_1 = __importDefault(require("../../../../adapter/factory/RepositoryFactoryMemory"));
const GetTags_1 = require("../../../../domain/usecase/activity/GetTags");
const DataEncriptorBcrypt_1 = __importDefault(require("../../../../infra/services/DataEncriptorBcrypt"));
let getTags;
describe("Get Tags Test", function () {
    beforeEach(async () => {
        const repositoryFactory = new RepositoryFactoryMemory_1.default(new DataEncriptorBcrypt_1.default());
        getTags = new GetTags_1.GetTags(repositoryFactory);
    });
    test("Should get tag by name", async () => {
        const tagName = "test";
        const tags = await getTags.execute(tagName);
        expect(tags[0]).toBe("test");
    });
    test("Should return all tags when tagName is Empty or null", async () => {
        const tags = await getTags.execute("");
        expect(tags.length).toBe(3);
    });
});
