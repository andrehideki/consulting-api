const Consulting = require("../../../domain/entity/Consulting");
const Name = require("../../../domain/entity/Name");
const Email = require("../../../domain/entity/Email");
const ConsultingRepository = require("../../../domain/repository/ConsultingRepository");

class ConsultingRepositoryJSON extends ConsultingRepository {
    database;
    constructor(database) {
        super();
        this.database = database;
    }

    async getSequence() {
    const sequence = this.database.sequences["consulting"];
        this.database.sequences["consulting"] += 1;
        return sequence;
    }

    async count() {
        return Object.keys(this.database.tables.consulting).length;
    }
    
    async getByEmail(email) {
        for (let id of Object.keys(this.database.tables.consulting)) {
            let consulting = this.database.tables.consulting[id];
            if (consulting.email === email)
                return new Consulting({
                    id: consulting.id,
                    name: new Name(consulting.first_name, consulting.last_name),
                    birthDate: new Date(consulting.birth_date),
                    email: new Email(consulting.email)
                });
        }
        throw new Error("Consulting not found");
    }

    async save(consulting) {
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

module.exports = ConsultingRepositoryJSON;