import { Consulting } from "@domain/entity/Consulting";
import { ConsultingRepository } from "@domain/repository/ConsultingRepository";


export class ConsultingRepositoryMemory implements ConsultingRepository {
    private consultings: Consulting[] = [];

    constructor() {
        this.consultings.push(new Consulting(1, "Beltrano", "Beltranino", "beltrano@mail.com", new Date(2000, 9,15)));
        this.consultings.push(new Consulting(2, "Fulano", "Fulanino", "fulano@hotmail.com", new Date(1997, 12, 5)));
    }

    async getById(id: number): Promise<Consulting> {
        let consulting = this.consultings.find(consulting => consulting.id === id);
        if (!consulting) throw new Error("Consulting not found");
        return consulting;
    }

    private async getSequence(): Promise<number> {
        const sequence = this.consultings.length + 1;
        return sequence;
    }

    async count(): Promise<number> {
        return this.consultings.length;
    }
    
    async getByEmail(email: String): Promise<Consulting> {
      let consulting = this.consultings.find(consulting => consulting.email.equals(email));
      if (!consulting) throw new Error("Consulting not found");
      return consulting;
    }

    async save(consulting: Consulting): Promise<Consulting> {
        consulting.id = await this.getSequence();
        this.consultings.push(consulting);
        return consulting;
    }
}
