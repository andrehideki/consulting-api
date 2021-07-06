import { Consulting } from "@entity/Consulting";

export interface ConsultingRepository {
    count(): Promise<Number>;
    getByEmail(email: String): Promise<Consulting>;
    getById(id: number): Promise<Consulting>;
    save(consulting): Promise<Consulting>;
}
