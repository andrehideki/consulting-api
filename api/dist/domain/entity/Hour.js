"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hour = void 0;
class Hour {
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
exports.Hour = Hour;
