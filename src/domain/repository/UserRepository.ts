import { User } from "@domain/entity/User";

export interface UserRepository {
  get(email: string): Promise<User>;
}