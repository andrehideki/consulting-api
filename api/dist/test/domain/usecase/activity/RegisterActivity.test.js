"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RepositoryFactoryMemory_1 = __importDefault(require("../../../../adapter/factory/RepositoryFactoryMemory"));
const RegisterActivity_1 = require("../../../../domain/usecase/activity/RegisterActivity");
const DataEncriptorBcrypt_1 = __importDefault(require("../../../../infra/services/DataEncriptorBcrypt"));
let registerActivity;
let activityRepository;
describe("Register Activity Test", function () {
    beforeEach(async () => {
        const repositoryFactory = new RepositoryFactoryMemory_1.default(new DataEncriptorBcrypt_1.default());
        registerActivity = new RegisterActivity_1.RegisterActivity(repositoryFactory);
        activityRepository = registerActivity.activityRepositoy;
    });
    test("Should register activity", async () => {
        await registerActivity.execute({
            name: "Nova atividade",
            description: "Realizar nova atividade...",
            date: "2021-01-01",
            consultingId: 2,
            amountOfHours: 8,
            responsible: 2,
            tags: []
        });
        const afterRegisteringActivitySize = await (await activityRepository.findActivities(2, 1, 2021)).length;
        expect(afterRegisteringActivitySize).toBe(1);
    });
    test("Should register activity with consulting as responsible", async () => {
        await registerActivity.execute({
            name: "Nova atividade",
            description: "Realizar nova atividade...",
            date: "2021-01-01",
            consultingId: 2,
            amountOfHours: 8,
            tags: [],
            responsible: 2
        });
        const afterRegisteringActivitySize = await (await activityRepository.findActivities(2, 1, 2021)).length;
        expect(afterRegisteringActivitySize).toBe(1);
    });
    test("Should should throw error when unknow consulting", async () => {
        try {
            await registerActivity.execute({
                name: "Nova atividade",
                description: "Realizar nova atividade...",
                date: "2021-01-01",
                consultingId: 999,
                amountOfHours: 8,
                responsible: 2,
                tags: []
            });
        }
        catch (err) {
            expect(err).not.toBeNull();
            expect(err.toString()).toBe("Error: Consulting not found");
        }
    });
    test("Should throw error when hour less than 1", async () => {
        try {
            await registerActivity.execute({
                name: "Nova atividade",
                description: "Realizar nova atividade...",
                date: "2021-01-01",
                consultingId: 2,
                amountOfHours: 0,
                responsible: 2,
                tags: []
            });
        }
        catch (err) {
            expect(err).not.toBeNull();
            expect(err.toString()).toBe("Error: Invalid Hour");
        }
    });
    test("Should throw error when name is blank", async () => {
        try {
            await registerActivity.execute({
                name: "",
                description: "Realizar nova atividade...",
                date: "2021-01-01",
                amountOfHours: 10,
                consultingId: 2,
                responsible: 2,
                tags: []
            });
        }
        catch (err) {
            expect(err).not.toBeNull();
            expect(err.toString()).toBe("Error: Name is required");
        }
    });
    test("Should register Tags when Registering an activity", async () => {
        let tagName = "Minha nova tag";
        await registerActivity.execute({
            name: "Atividade",
            description: "Realizar nova atividade...",
            tags: [tagName],
            date: "2021-01-01",
            consultingId: 2,
            responsible: 2,
            amountOfHours: 10
        });
        const newTag = await activityRepository.findTag(tagName.toLowerCase());
        expect(newTag).not.toBeNull();
        expect(newTag[0].name).toBe(tagName.toLowerCase());
    });
});
