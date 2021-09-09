export class Email {
  value: string;

  constructor(emailAddress: string) {
    if (!emailAddress || !/^.+@[a-z]+\.[a-z]+$/.test(emailAddress.toString())) {
      throw new Error("Invalid email");
    }
    this.value = emailAddress;
  }

  equals(email): boolean {
    return this.value === email;
  }
}
