export class Name {
    
    constructor(private firstName: String, private lastName: String) {
        if (!firstName || !lastName) {
            throw new Error("Invalid Name");
        }
        this.firstName = firstName;
        this.lastName = lastName;
    }

    get value() {
        return `${this.firstName} ${this.lastName}`;
    }

    get first() {
        return this.firstName;
    }

    get last() {
        return this.lastName;
    }
}
