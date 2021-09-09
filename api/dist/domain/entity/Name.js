"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Name = void 0;
class Name {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
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
exports.Name = Name;
