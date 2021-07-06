export class Hour {
    value: number;

    constructor(hour: number) {
        if (!hour) {
            throw new Error("Hour is required");
        }
        if (hour < 0) {
            throw new Error("Hour is invalid");
        }
        this.value = hour;
    }
}