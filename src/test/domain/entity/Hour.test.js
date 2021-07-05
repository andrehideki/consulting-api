const Hour = require("../../../domain/entity/Hour");
describe("Hour", () => {

    test("Should throw error with undefined or null hour", () => {
        expect(() => new Hour()).toThrow("Hour is required");
        expect(() => new Hour(null)).toThrow("Hour is required");
        expect(() => new Hour(undefined)).toThrow("Hour is required");
    });

    test("Should throw error with negative hour", () => {
        expect(() => new Hour(-1)).toThrow("Hour is invalid");
    });
    
    test("Should create hour with positive hour", () => {
        const hour = new Hour(10);
        expect(hour.value).toBe(10);
    });
});