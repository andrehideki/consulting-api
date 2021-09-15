import { UserRepository } from "@domain/repository/UserRepository";
import { UserRepositoryMemory } from "../UserRepositoryMemory";
import DataEncriptor from "@domain/entity/DataEncriptor";

export class UserRepositoryMemorySingleton {

  private static userRepository: UserRepository;

  static getInstance(dataEncryptor: DataEncriptor): UserRepository {
    if (!UserRepositoryMemorySingleton.userRepository) {
      UserRepositoryMemorySingleton.userRepository = new UserRepositoryMemory(dataEncryptor);
    }
    return UserRepositoryMemorySingleton.userRepository;
  }

  static destroy(): void {
    UserRepositoryMemorySingleton.userRepository = undefined;
  }
}