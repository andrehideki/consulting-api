import RepositoryFactoryMemory from "@adapter/factory/RepositoryFactoryMemory";
import { RegisterActivity } from "@domain/usecase/activity/RegisterActivity";
import { ActivityRepository } from "@domain/repository/ActivityRepository";
import DataEncriptorBcrypt from "@infra/services/DataEncriptorBcrypt";
import fs from 'fs';
import { HDFileService } from "@adapter/service/HDFileService";

let registerActivity: RegisterActivity;
let activityRepository: ActivityRepository;

describe("Register Activity Test", function () {

  beforeEach(async () => {
    const repositoryFactory = new RepositoryFactoryMemory(new DataEncriptorBcrypt());
    registerActivity = new RegisterActivity(repositoryFactory, new HDFileService("C:/test"));
    activityRepository = registerActivity.activityRepositoy;
  });

  test("Should register activity", async () => {
    await registerActivity.execute({
      name: "Nova atividade",
      description: "Realizar nova atividade...",
      date: "2021-01-01",
      consultingId: 2,
      amountOfHours: 8,
      responsibleId: 2,
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
      responsibleId: 2
    });
    const afterRegisteringActivitySize = await (await activityRepository.findActivities(2, 1, 2021)).length;
    expect(afterRegisteringActivitySize).toBe(2);
  });

  test("Should should throw error when unknow consulting", async () => {
    try {
      await registerActivity.execute({
        name: "Nova atividade",
        description: "Realizar nova atividade...",
        date: "2021-01-01",
        consultingId: 999,
        amountOfHours: 8,
        responsibleId: 2,
        tags: []
      });
    } catch (err) {
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
        responsibleId: 2,
        tags: []
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
        date: "2021-01-01",
        amountOfHours: 10,
        consultingId: 2,
        responsibleId: 2,
        tags: []
      });
    } catch (err) {
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
      responsibleId: 2,
      amountOfHours: 10
    });
    const newTag = await activityRepository.findTag(tagName.toLowerCase());
    expect(newTag).not.toBeNull();
    expect(newTag[0].name).toBe(tagName.toLowerCase());
  });

  test("Should register save file into server", async () => {
    await fs.readFile('src/test/resources/file.txt', async (err, data) => {
      if (err) return;
      await registerActivity.execute({
        name: "Atividade",
        description: "Realizar nova atividade...",
        date: "2021-01-01",
        consultingId: 2,
        responsibleId: 2,
        amountOfHours: 10,
        files: [{
          file: data,
          name: 'file.txt'
        }]
      });
    });
  });
});