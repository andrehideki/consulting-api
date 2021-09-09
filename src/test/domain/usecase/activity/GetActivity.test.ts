import { GetActivity } from "@domain/usecase/activity/GetActivity";
import RepositoryFactoryMemory from "@adapter/factory/RepositoryFactoryMemory";
import DataEncriptorBcrypt from "@infra/services/DataEncriptorBcrypt";
describe("Get Activity", () => {
  let getActivity: GetActivity;

  beforeEach(() =>{
    const repositoryFactory = new RepositoryFactoryMemory(new DataEncriptorBcrypt());
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