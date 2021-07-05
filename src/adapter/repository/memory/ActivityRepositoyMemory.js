const ActivityRepositoy = require("../../../domain/repository/ActivityRepositoy");
const Tag = require("../../../domain/entity/Tag");
const Name = require("../../../domain/entity/Name");
const Email = require("../../../domain/entity/Email");
const Activity = require("../../../domain/entity/Activity");
const Consulting = require("../../../domain/entity/Consulting");

class ActivityRepositoyMemory extends ActivityRepositoy {
    activities = {};
    tags = {};
    
    constructor() {
        super();
        this.tags["test"] = new Tag("Test");
        this.tags["tag 1"] = new Tag("Tag 1");
        this.tags["bayer"] = new Tag("Bayer");
        this.activities["1"] = new Activity({
            id: 1, 
            name: "Nova atividade", 
            description: "Realizar nova atividade...", 
            date: "2021-1-1", 
            consulting: new Consulting({
                name: new Name("Fulano", "Fulanino"),
                email: new Email("fulano@hotmail.com"),
                birthDate: new Date("1997-12-05")
                }), 
            hours: 8, 
            tags: ["test"], 
            status: "opened"
        });
        this.activities["2"] = new Activity({
            id: 2, 
            name: "Atividade 2",
            description: "Realizar nova atividade...",
            date: "2021-1-1",
            consulting: new Consulting({
                name: new Name("Fulano", "Fulanino"),
                email: new Email("fulano@hotmail.com"),
                birthDate: new Date("1997-12-05")
                }), 
            hours: 2, 
            status: "opened"
        });
        this.activities["3"] = new Activity({
            id: 3, 
            name: "Atividade 3",
            description: "Realizar nova atividade...",
            date: "2021-2-1",
            consulting: new Consulting({
                name: new Name("Fulano", "Fulanino"),
                email: new Email("fulano@hotmail.com"),
                birthDate: new Date("1997-12-05")
                }), 
            hours: 4,  
            status: "opened"
        });
    }

    getSequence(collection) {
        return Object.keys(collection).length + 1;
    }
    
    countActivities() {
        return Object.keys(this.activities).length;
    }

    saveActivity(activity) {
        super.saveActivity(activity);
        activity.id = this.getSequence(this.activities);
        this.activities[activity.id] = activity;
        return activity;
    }

    updateActivity(activity) {
        super.updateActivity(activity);
        this.activities[activity.id] = activity;
        return activity;
    }
    
    saveTag(tag) {
        this.tags[tag.name.toLowerCase()] = tag;
        return tag;
    }

    existsTag(tagName) {
        return !!this.tags[tagName.toLowerCase()];
    }

    findActivities({ consultingId, month, year }) {
        let findedActivities = [];
        for (let key of Object.keys(this.activities)) {
            let activity = this.activities[key];
            if (activity.consulting.id === consultingId && activity.month === month && activity.year === year) {
                findedActivities.push(activity);
            }
        }
        return findedActivities;
    }

    findTag(tagName) {
        let tag = this.tags[tagName.toLowerCase()];
        if (!!tag) return [tag];
        return [];
    }
    
    getAllTags() {
        return Object.keys(this.tags)
            .map(key => new Tag(this.tags[key]));
    }
}

module.exports = ActivityRepositoyMemory;