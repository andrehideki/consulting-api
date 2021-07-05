module.exports = class Hour {
    
    constructor(hour) {
        if (!hour) {
            throw new Error("Hour is required");
        }
        if (hour < 0) {
            throw new Error("Hour is invalid");
        }
        this.value = hour;
    }
}