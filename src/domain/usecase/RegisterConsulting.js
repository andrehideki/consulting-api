const Consulting = require("../entity/Consulting");
const Email = require("../entity/Email");
const Name = require("../entity/Name");

module.exports = class RegisterConsulting {
    consultingRepository;

    constructor(repositoryFacotory) {
        this.consultingRepository = repositoryFacotory.createConsultingRepository();
    }

    async execute({firstName, lastName, birthDate, emailAddress}) {
        const name = new Name(firstName, lastName);
        const email = new Email(emailAddress);
        birthDate = new Date(birthDate);
        let consulting = new Consulting({
            name, email, birthDate
        });
        consulting = await this.consultingRepository.save(consulting);
        return {
            id: consulting.id,
            name: consulting.name.value,
            email: consulting.email.value,
            birthDate: consulting.birthDate.toISOString()
        };
    }
}