import { Consulting } from "@domain/entity/Consulting";
import { ConsultingRepository } from "@repository/ConsultingRepository";


export class ConsultingRepositoryJson implements ConsultingRepository {
    database: any;

    constructor(database: any) {
        this.database = database;
    }

    async getById(id: number): Promise<Consulting> {
        let consulting = this.database.tables.consulting[id];
        if (!consulting) {
            throw new Error("Consulting not found");
        }
        return new Consulting(consulting.id, consulting.first_name, consulting.last_name, consulting.email, consulting.birth_date);
    }

    private async getSequence(): Promise<Number> {
        const sequence = this.database.sequences["consulting"];
        this.database.sequences["consulting"] += 1;
        return sequence;
    }

    async count(): Promise<number> {
        return Object.keys(this.database.tables.consulting).length;
    }
    
    async getByEmail(email: String): Promise<Consulting> {
        for (let id of Object.keys(this.database.tables.consulting)) {
            let consulting = this.database.tables.consulting[id];
            if (consulting.email === email) {
                return new Consulting(consulting.id, consulting.first_name, consulting.last_name, consulting.email, consulting.birth_date);
            }
        }
        throw new Error("Consulting not found");
    }

    async save(consulting): Promise<Consulting> {
        consulting.id = await this.getSequence();
        this.database.tables.consulting[consulting.id] = {
            id: consulting.id,
            first_name: consulting.name.first,
            last_name: consulting.name.last,
            email: consulting.email.value,
            birth_date: consulting.birthDate.toISOString().substring(0, 10)
        };
        return consulting;
    }
}
