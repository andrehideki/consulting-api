import { Email } from "@domain/entity/Email";
import { UserCategory, getUserCategory } from "@domain/vo/UserCategory";
import DataEncriptor from "./DataEncriptor";

export class User {
  id: number;
  email: Email;
  password: string;
  category: UserCategory;
  encryptor: DataEncriptor;

  constructor(id: number, email: string, password: string, category: string, encryptor: DataEncriptor) {
    this.id = id;
    this.email = new Email(email);
    this.password = password;
    this.category = getUserCategory(category);
    this.encryptor = encryptor;
  }

  async authenticate(password: string): Promise<boolean> {
    return await this.encryptor.match(password, this.password);
  }
}