"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
class Tag {
    constructor(name) {
        if (!name) {
            throw new Error("Names is required");
        }
        this.name = name.trim().toLowerCase();
    }
}
exports.Tag = Tag;
