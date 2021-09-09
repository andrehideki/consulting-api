"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultingRepositoryMemory = void 0;
const Consulting_1 = require("../../domain/entity/Consulting");
class ConsultingRepositoryMemory {
    constructor() {
        this.consultings = [];
        this.consultings.push(new Consulting_1.Consulting(1, "Beltrano", "Beltranino", "beltrano@mail.com", new Date(2000, 9, 15)));
        this.consultings.push(new Consulting_1.Consulting(2, "Fulano", "Fulanino", "fulano@mail.com", new Date(1997, 12, 5)));
    }
    async getById(id) {
        let consulting = this.consultings.find(consulting => consulting.id === id);
        if (!consulting)
            throw new Error("Consulting not found");
        return consulting;
    }
    async getSequence() {
        const sequence = this.consultings.length + 1;
        return sequence;
    }
    async count() {
        return this.consultings.length;
    }
    async getByEmail(email) {
        let consulting = this.consultings.find(consulting => consulting.email.equals(email));
        if (!consulting)
            throw new Error("Consulting not found");
        return consulting;
    }
    async save(consulting) {
        consulting.id = await this.getSequence();
        this.consultings.push(consulting);
        return consulting;
    }
}
exports.ConsultingRepositoryMemory = ConsultingRepositoryMemory;
