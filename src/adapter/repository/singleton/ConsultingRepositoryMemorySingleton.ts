import { ConsultingRepository } from "@domain/repository/ConsultingRepository";
import { ConsultingRepositoryMemory } from "../ConsultingRepositoryMemory";

export class ConsultingRepositoryMemorySingleton {

  private static consultingRepositoryMemory: ConsultingRepository;

  static getInstance(): ConsultingRepository {
    if (!ConsultingRepositoryMemorySingleton.consultingRepositoryMemory) {
      ConsultingRepositoryMemorySingleton.consultingRepositoryMemory = new ConsultingRepositoryMemory();
    }
    return ConsultingRepositoryMemorySingleton.consultingRepositoryMemory;
  }

  static destroy(): void {
    ConsultingRepositoryMemorySingleton.consultingRepositoryMemory = undefined;
  }
}