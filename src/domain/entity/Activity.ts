import { Tag } from "@entity/Tag";

export class Activity {
    id: number;
    name: string;
    description: string;
    date: Date;
    hours: number;
    consulting: number;
    tags: Tag[];
    status: string;

    constructor(id: number, name: string, description: string, date: Date, consulting: number, hours: number, tags: Tag[], status: string) {
        if (!name) throw new Error("Name is required");
        if (!hours || hours < 1) throw new Error("Invalid Hour");
        if (!consulting) throw new Error("Consulting is required");
        if (!date) {
            this.date = new Date();
        } else {
            this.date = date;
        }
        this.id = id || undefined;
        this.name = name;
        this.description = description;
        this.consulting = consulting;
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