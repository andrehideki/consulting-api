const RepositoryFactory = require("../../domain/factory/RepositoryFactory");
const ActivityRepositoryJSON = require("../repository/json/ActivityRepositoryJSON");
const ConsultingRepositoryJSON = require("../repository/json/ConsultingRepositoryJSON");

module.exports = class RepositoryFactoryJSON extends RepositoryFactory {
    databaseJSON;

    constructor(databaseJSON) {
        super();
        this.databaseJSON = databaseJSON;
    }

    createConsultingRepository() {
        return new ConsultingRepositoryJSON(JSON.parse(this.databaseJSON));
    }

    createActivityRepository() {
        return new ActivityRepositoryJSON(JSON.parse(this.databaseJSON));
    }
}
