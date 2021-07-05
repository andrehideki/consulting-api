const RegisterActivity = require("../../../domain/usecase/RegisterActivity");
const RepositoryFactoryJSON = require("../../../adapter/factory/RepositoryFactoryJSON");
const JSONDatabaseManager = require("../../../infra/database/JSONDatabaseManager");

let registerActivity;
let activityRepository;

describe("Register Activity Test", function() {
  
    beforeEach(async () => {
        const jsonDatabaseManager = new JSONDatabaseManager();
        const database = await jsonDatabaseManager.read();
        const repositoryFactory = new RepositoryFactoryJSON(JSON.stringify(database), jsonDatabaseManager);
        registerActivity = new RegisterActivity(repositoryFactory);
        activityRepository = registerActivity.activityRepositoy;
    });

    test("Should register activity", async () => {
        const originalSize = await activityRepository.countActivities();
        await registerActivity.execute({
            name: "Nova atividade",
            description: "Realizar nova atividade...",
            date: "2021-01-01",
            consultingEmail: "fulano@hotmail.com",
            amountOfHours: 8
        });
        const afterRegisteringActivitySize = await activityRepository.countActivities();
        expect(afterRegisteringActivitySize).toBe(originalSize + 1);
    });

    test("Should should throw error when unknow consulting", async () => {
        try {
            await registerActivity.execute({
                name: "Nova atividade",
                description: "Realizar nova atividade...",
                consultingEmail: "unknow@mail.com",
                amountOfHours: 8
            });
        } catch(err) {
            expect(err).not.toBeNull();
            expect(err.toString()).toBe("Error: Consulting not found");
        }
    });

    test("Should throw error when hour less than 1", async () => {
        try {
            await registerActivity.execute({
                name: "Nova atividade",
                description: "Realizar nova atividade...",
                data: "2021-01-01",
                consultingEmail: "fulano@hotmail.com",
                amountOfHours: 0
            });
        } catch (err) {
            expect(err).not.toBeNull();
            expect(err.toString()).toBe("Error: Invalid Hour");
        }
    });

    test("Should throw error when name is blank", async () => {
        try {
            await registerActivity.execute({
                name: "",
                description: "Realizar nova atividade...",
                data: "2021-01-01",
                consultingEmail: "fulano@hotmail.com",
                amountOfHours: 0
            });
        } catch (err) {
            expect(err).not.toBeNull();
            expect(err.toString()).toBe("Error: Name is required");
        }
    });


    test("Should register Actvity Tags when Registering an activity", async () => {
        let tagName = "Minha nova tag";
        await registerActivity.execute({
            name: "Atividade",
            description: "Realizar nova atividade...",
            tags: [ tagName ],
            data: "2021-01-01",
            consultingEmail: "fulano@hotmail.com",
            amountOfHours: 10
        });
        const newTag = await activityRepository.findTag(tagName);
        expect(newTag).not.toBeNull();
        expect(newTag[0].name).toBe(tagName.toLowerCase());
    });
});