import { ResponsibleCategory } from "@domain/valueobject/ReponsibleCategory";

export class Responsible {
  id: number;
  category: ResponsibleCategory;

  constructor(id: number, category: ResponsibleCategory) {
    this.id = id;
    this.category = category;
  }
}