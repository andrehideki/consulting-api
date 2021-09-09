"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterConsulting = void 0;
const Consulting_1 = require("../../entity/Consulting");
class RegisterConsulting {
    constructor(repositoryFacotory) {
        this.consultingRepository = repositoryFacotory.createConsultingRepository();
    }
    async execute({ firstName, lastName, birthDate, emailAddress }) {
        let consulting = new Consulting_1.Consulting(undefined, firstName, lastName, emailAddress, new Date(`${birthDate}:`));
        consulting = await this.consultingRepository.save(consulting);
        return {
            id: consulting.id,
            name: consulting.name.value,
            email: consulting.email.value,
            birthDate: consulting.birthDate.toISOString()
        };
    }
}
exports.RegisterConsulting = RegisterConsulting;
