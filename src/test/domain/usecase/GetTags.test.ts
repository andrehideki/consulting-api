import * as database from "@infra/database/db.json";
import { RepositoryFactoryJson } from "@adapter/factory/RepositoryFactoryJson";
import { GetTags } from "@domain/usecase/GetTags";
import { DataEncriptorBcrypt } from "@infra/services/DataEncriptorBcrypt";

let getTags;

describe("Get Tags Test", function() {
  
    beforeEach(async () => {
        const repositoryFactory = new RepositoryFactoryJson(database, new DataEncriptorBcrypt());
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