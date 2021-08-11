import { Name } from "@domain/entity/Name";

describe("Name", () => {
    test("Shoud create Name with correct First name and last name", () => {
        const name = new Name("Fulano", "Beltranino");
        expect(name.value).toBe("Fulano Beltranino");
    });
    
    test("Shoud throw error when First name is empty", () => {
        expect(() => {
            new Name("", "Beltranino");
        }).toThrow("Invalid Name");
    });
    
    test("Shoud throw error when Last name is empty", () => {
        expect(() => {
            new Name("Fulano", "");
        }).toThrow("Invalid Name");
    });
});
