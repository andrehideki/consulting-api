const GetTags = require("../../../domain/usecase/GetTags");
const RepositoryFactoryJSON = require("../../../adapter/factory/RepositoryFactoryJSON");
const JSONDatabaseManager = require("../../../infra/database/JSONDatabaseManager");

let getTags;

describe("Get Tags Test", function() {
  
    beforeEach(async () => {
        const jsonDatabaseManager = new JSONDatabaseManager();
        const database = await jsonDatabaseManager.read();
        const repositoryFactory = new RepositoryFactoryJSON(JSON.stringify(database), jsonDatabaseManager);
        getTags = new GetTags(repositoryFactory);
    });

    test("Should get tag by name", async () => {
        const tagName = "Test";
        const tags = await getTags.execute(tagName);
        expect(tags[0]).toBe("test");
    });
    
    test("Should return all tags when tagName is Empty or null", async () => {
        const tags = await getTags.execute("");
        expect(tags.length).toBe(3);
    });
});