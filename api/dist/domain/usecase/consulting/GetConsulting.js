"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetConsulting = void 0;
class GetConsulting {
    constructor(repositoryFactory) {
        this.consultingRepository = repositoryFactory.createConsultingRepository();
    }
    async execute(input) {
        const consulting = await this.consultingRepository.getByEmail(input.email);
        return {
            name: consulting.name.value,
            email: consulting.email.value,
            birthDate: consulting.birthDate.toISOString().substring(0, 10)
        };
    }
}
exports.GetConsulting = GetConsulting;
