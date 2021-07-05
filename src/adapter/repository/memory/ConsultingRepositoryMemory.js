const Consulting = require("../../../domain/entity/Consulting");
const Name = require("../../../domain/entity/Name");
const Email = require("../../../domain/entity/Email");
const ConsultingRepository = require("../../../domain/repository/ConsultingRepository");

class ConsultingRepositoryMemory extends ConsultingRepository {
    consultings = {};
    
    constructor() {
        super();
        this.save(new Consulting({
            name: new Name("Beltrano", "Beltranino"),
            email: new Email("beltrano@mail.com"),
            birthDate: new Date("2000-10-15")
        }));
        this.save(new Consulting({
            name: new Name("Fulano", "Fulanino"),
            email: new Email("fulano@hotmail.com"),
            birthDate: new Date("1997-12-05")
        }));
    }

    getSequence() {
        return Object.keys(this.consultings).length + 1;
    }

    count() {
        return Object.keys(this.consultings).length;
    }
    
    getByEmail(email) {
        for (let key of Object.keys(this.consultings)) {
            let consulting = this.consultings[key];
            if (consulting.email.value === email)
                return consulting;
        }
        throw new Error("Consulting not found");
    }

    save(consulting) {
        consulting.id = this.getSequence();
        this.consultings[consulting.id] = consulting;
        return consulting;
    }
}

module.exports = ConsultingRepositoryMemory;