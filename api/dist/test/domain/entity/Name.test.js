"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Name_1 = require("../../../domain/entity/Name");
describe("Name", () => {
    test("Shoud create Name with correct First name and last name", () => {
        const name = new Name_1.Name("Fulano", "Beltranino");
        expect(name.value).toBe("Fulano Beltranino");
    });
    test("Shoud throw error when First name is empty", () => {
        expect(() => {
            new Name_1.Name("", "Beltranino");
        }).toThrow("Invalid Name");
    });
    test("Shoud throw error when Last name is empty", () => {
        expect(() => {
            new Name_1.Name("Fulano", "");
        }).toThrow("Invalid Name");
    });
});
