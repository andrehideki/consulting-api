"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consulting = void 0;
const Name_1 = require("./Name");
const Email_1 = require("./Email");
class Consulting {
    constructor(id, firstName, lastName, email, birthDate) {
        this.id = id;
        this.name = new Name_1.Name(firstName, lastName);
        this.email = new Email_1.Email(email);
        this.birthDate = birthDate;
    }
}
exports.Consulting = Consulting;
