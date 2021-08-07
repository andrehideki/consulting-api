import { Email } from "@domain/entity/Email";
import { UserCategory, getUserCategory } from "@domain/vo/UserCategory";
import { DataEncriptor } from "./DataEncriptor";

export class User {
  email: Email;
  password: string;
  category: UserCategory;
  encryptor: DataEncriptor;

  constructor(email: string, password: string, category: string, encryptor: DataEncriptor) {
    this.email = new Email(email);
    this.password = password;
    this.category = getUserCategory(category);
  }

  async authenticate(password: string): Promise<boolean> {
    return await this.encryptor.match(password, this.password);
  }
}