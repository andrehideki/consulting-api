import { Consulting } from "@domain/entity/Consulting";

export interface ConsultingRepository {
    count(): Promise<number>;
    getByEmail(email: string): Promise<Consulting>;
    getById(id: number): Promise<Consulting>;
    save(consulting: Consulting): Promise<Consulting>;
}
