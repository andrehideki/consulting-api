"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Email_1 = require("../../../domain/entity/Email");
describe("Email", () => {
    test("Should throw error when email is black", () => {
        expect(() => {
            new Email_1.Email("");
        }).toThrow("Invalid email");
    });
    test("Should throw error when email is undefined", () => {
        expect(() => {
            new Email_1.Email(undefined);
        }).toThrow("Invalid email");
    });
    test("Should throw error when email has a invalid format", () => {
        expect(() => {
            new Email_1.Email("andre.mail.com");
        }).toThrow("Invalid email");
    });
    test("Should create an email with a valid email address", () => {
        const emailAddress = "andre.hkiw@mail.com";
        const email = new Email_1.Email(emailAddress);
        expect(email.value).toBe(emailAddress);
    });
});
