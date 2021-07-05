const ConsultingRepositoryMemory = require("../repository/memory/ConsultingRepositoryMemory");
const RepositoryFactory = require("../../domain/factory/RepositoryFactory");
const ActivityRepositoyMemory = require("../repository/memory/ActivityRepositoyMemory");

class RepositoryFactoryMemory extends RepositoryFactory {
    repositories = {};

    createConsultingRepository() {
        if (!this.repositories["consultingRepositoryMemory"])
            this.repositories["consultingRepositoryMemory"] = new ConsultingRepositoryMemory();
        return this.repositories["consultingRepositoryMemory"];
    }

    createActivityRepository() {
        if (!this.repositories["activityRepository"])
            this.repositories["activityRepository"] = new ActivityRepositoyMemory();
        return this.repositories["activityRepository"];
    }
}

module.exports = RepositoryFactoryMemory;