import DataEncriptor from "@domain/entity/DataEncriptor";
import * as bcrypt from "bcrypt";

export default class DataEncriptorBcrypt implements DataEncriptor {

  match(source: string, target: string): Promise<boolean> {
    return bcrypt.compare(source, target);
  }

  encrypt(data: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  
  desencrypt(data: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

}