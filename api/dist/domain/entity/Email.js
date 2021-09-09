"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
class Email {
    constructor(emailAddress) {
        if (!emailAddress || !/^.+@[a-z]+\.[a-z]+$/.test(emailAddress.toString())) {
            throw new Error("Invalid email");
        }
        this.value = emailAddress;
    }
    equals(email) {
        return this.value === email;
    }
}
exports.Email = Email;
