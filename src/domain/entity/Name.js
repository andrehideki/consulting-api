class Name {
    value;
    constructor(firstName, lastName) {
        if (!firstName || !lastName) {
            throw new Error("Invalid Name");
        }
        this.value = `${firstName} ${lastName}`;
    }

    get first() {
        return this.value.split(" ")[0];
    }

    get last() {
        return this.value.split(" ")[1];
    }
}

module.exports = Name;