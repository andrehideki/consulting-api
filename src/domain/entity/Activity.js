class Activity {
    id;
    name;
    description;
    date;
    hours;
    consulting;
    tags;
    status;

    constructor({id, name, description, date, consulting, hours, tags=[], status}) {
        if (!name) throw new Error("Name is required");
        if (!hours || hours < 1) throw new Error("Invalid Hour");
        if (!consulting) throw new Error("Consulting is required");
        if (!date) {
            this.date = new Date();
        } else {
            this.date = new Date(date);
        }
        if (!!id) {
            this.id = id;
        }
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

module.exports = Activity;