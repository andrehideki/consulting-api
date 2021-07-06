import { Name } from "@entity/Name";
import { Email } from "@entity/Email";

export class Consulting {
    id: Number;
    name: Name;
    email: Email;
    birthDate: Date;
    
    constructor(id: Number, firstName: String, lastName: String, email: String, birthDate: Date) {
        this.id = id;
        this.name = new Name(firstName, lastName);
        this.email = new Email(email);
        this.birthDate = birthDate;
    }
}