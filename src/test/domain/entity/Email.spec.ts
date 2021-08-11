import { Email } from '@domain/entity/Email';

describe("Email", () => {
    test("Should throw error when email is black", () => {
        expect(() => {
            new Email("");
        }).toThrow("Invalid email");
    });
    
    test("Should throw error when email is undefined", () => {
        expect(() => {
            new Email(undefined);
        }).toThrow("Invalid email");
    })
    
    test("Should throw error when email has a invalid format", () => {
        expect(() => {
            new Email("andre.mail.com");
        }).toThrow("Invalid email");
    });
    
    test("Should create an email with a valid email address", () => {
        const emailAddress = "andre.hkiw@mail.com"
        const email = new Email(emailAddress);
        expect(email.value).toBe(emailAddress);
    });
});