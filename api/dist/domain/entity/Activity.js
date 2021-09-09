"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
class Activity {
    constructor(id, name, description, date, consulting, responsible, hours, tags, status) {
        if (!name)
            throw new Error("Name is required");
        if (!hours || hours < 1)
            throw new Error("Invalid Hour");
        if (!consulting)
            throw new Error("Consulting is required");
        if (!date) {
            this.date = new Date();
        }
        else {
            this.date = date;
        }
        this.id = id || undefined;
        this.name = name;
        this.description = description;
        this.consulting = consulting;
        this.responsible = responsible;
        this.hours = hours;
        this.tags = tags;
        this.status = status;
    }
    finalize() {
        this.status = "finalized";
    }
    get month() {
        return this.date.getMonth() + 1;
    }
    get year() {
        return this.date.getUTCFullYear();
    }
}
exports.Activity = Activity;
