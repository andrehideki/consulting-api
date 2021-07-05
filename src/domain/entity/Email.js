class Email {
    value;
    constructor(emailAddress) {
        if (!emailAddress || !/^.+@[a-z]+\.[a-z]+$/.test(emailAddress)) {
            throw new Error("Invalid email");
        }
        this.value = emailAddress;
    }
}

module.exports = Email;