"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GetConsulting_1 = require("../../../../domain/usecase/consulting/GetConsulting");
const RepositoryFactoryMemory_1 = __importDefault(require("../../../../adapter/factory/RepositoryFactoryMemory"));
const DataEncriptorBcrypt_1 = __importDefault(require("../../../../infra/services/DataEncriptorBcrypt"));
let getConsulting;
describe("Get Consultings Test", function () {
    beforeEach(async () => {
        const repositoryFactory = new RepositoryFactoryMemory_1.default(new DataEncriptorBcrypt_1.default());
        getConsulting = new GetConsulting_1.GetConsulting(repositoryFactory);
    });
    test("Should get and consulting by email", async () => {
        const consulting = await getConsulting.execute({
            email: "beltrano@mail.com"
        });
        expect(consulting.email).toBe("beltrano@mail.com");
        expect(consulting.name).toBe("Beltrano Beltranino");
        expect(consulting.birthDate).toBe("2000-10-15");
    });
});
