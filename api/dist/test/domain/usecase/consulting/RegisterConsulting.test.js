"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RepositoryFactoryMemory_1 = __importDefault(require("../../../../adapter/factory/RepositoryFactoryMemory"));
const RegisterConsulting_1 = require("../../../../domain/usecase/consulting/RegisterConsulting");
const DataEncriptorBcrypt_1 = __importDefault(require("../../../../infra/services/DataEncriptorBcrypt"));
let registerConsulting;
let consultingRepository;
describe("Register Consulting Test", function () {
    beforeEach(async () => {
        const repositoryFactory = new RepositoryFactoryMemory_1.default(new DataEncriptorBcrypt_1.default());
        registerConsulting = new RegisterConsulting_1.RegisterConsulting(repositoryFactory);
        consultingRepository = registerConsulting.consultingRepository;
    });
    test("Should register consulting", async () => {
        const originalSize = await consultingRepository.count();
        await registerConsulting.execute({
            firstName: "André",
            lastName: "Watanabe",
            birthDate: "1997-12-05",
            emailAddress: "andre.hkiw@gmail.com"
        });
        const afterRegisteringSize = await consultingRepository.count();
        expect(afterRegisteringSize).toBe(originalSize + 1);
    });
    test("Should generate consulting id", async () => {
        const consultingOuput = await registerConsulting.execute({
            firstName: "André",
            lastName: "Watanabe",
            birthDate: "1997-12-05",
            emailAddress: "andre.hkiw@gmail.com"
        });
        expect(consultingOuput.id).not.toBeNull();
    });
});
