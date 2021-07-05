class Tag {
    name;
    constructor(name) {
        if (!name) {
            throw new Error("Names is required");
        }
        this.name = name.trim().toLowerCase();
    }
}

module.exports = Tag;