import { Name } from "@domain/entity/Name";
import { Email } from "@domain/entity/Email";

export class Consulting {
    id: number;
    name: Name;
    email: Email;
    birthDate: Date;
    
    constructor(id: number, firstName: string, lastName: string, email: string, birthDate: Date) {
        this.id = id;
        this.name = new Name(firstName, lastName);
        this.email = new Email(email);
        this.birthDate = birthDate;
    }
}