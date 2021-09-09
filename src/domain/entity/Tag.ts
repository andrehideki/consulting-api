export class Tag {
    name: string;

    constructor(name: string) {
        if (!name) {
            throw new Error("Names is required");
        }
        this.name = name.trim().toLowerCase();
    }
}