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
    this.encryptor = encryptor;
  }

  async authenticate(password: string): Promise<boolean> {
    console.log(await this.encryptor.match(password, this.password))
    return await this.encryptor.match(password, this.password);
  }
}