export class GetActivityOutput {
  id: number;
  name: string;
  description: string;
  date: string;
  hours: number;
  consultingCompleteName: string;
  consultingEmail: string;
  tags: string[];
  status: string;
  constructor(
    id: number,
    name: string,
    description: string,
    date: string,
    hours: number,
    consultingCompleteName: string,
    consultingEmail: string,
    tags: string[],
    status: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.date = date;
    this.hours = hours;
    this.consultingCompleteName = consultingCompleteName;
    this.consultingEmail = consultingEmail;
    this.tags = tags;
    this.status = status;
  }
}