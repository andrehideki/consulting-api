import { GetActivity } from "@domain/usecase/GetActivity";
import * as database from "@infra/database/db.json";
import { RepositoryFactoryJson } from "@adapter/factory/RepositoryFactoryJson";
import { DataEncriptorBcrypt } from "@infra/services/DataEncriptorBcrypt";
describe("Get Activity", () => {
  let getActivity: GetActivity;

  beforeEach(() =>{
    const repositoryFactory = new RepositoryFactoryJson(database, new DataEncriptorBcrypt());
    getActivity = new GetActivity(repositoryFactory);
  });
  test("Should get an activity by id", async () => {
    const getActivityOuputData = await getActivity.execute(1);
    expect(getActivityOuputData.name).toBe("Nova atividade");
  });

  test("Should throw error when activity not found", async() => {
    try {
      await getActivity.execute(999);
    } catch(err) {
      expect(err.toString()).toBe("Error: Activity not found");
    }
  });
});