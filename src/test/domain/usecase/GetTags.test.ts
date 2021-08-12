import RepositoryFactoryMemory from "@adapter/factory/RepositoryFactoryMemory";
import { GetTags } from "@domain/usecase/GetTags";
import DataEncriptorBcrypt from "@infra/services/DataEncriptorBcrypt";

let getTags;

describe("Get Tags Test", function() {
  
    beforeEach(async () => {
        const repositoryFactory = new RepositoryFactoryMemory(new DataEncriptorBcrypt());
        getTags = new GetTags(repositoryFactory);
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