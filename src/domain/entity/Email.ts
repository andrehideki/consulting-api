export class Email {
    value: String;

    constructor(emailAddress: String) {
        if (!emailAddress || !/^.+@[a-z]+\.[a-z]+$/.test(emailAddress.toString())) {
            throw new Error("Invalid email");
        }
        this.value = emailAddress;
    }
}
