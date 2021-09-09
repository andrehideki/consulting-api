"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActivityRepositoryMemory_1 = require("../repository/ActivityRepositoryMemory");
const ConsultingRepositoryMemory_1 = require("../repository/ConsultingRepositoryMemory");
const UserRepositoryMemory_1 = require("../repository/UserRepositoryMemory");
class RepositoryFactoryMemory {
    constructor(dataEncryptor) {
        this.dataEncryptor = dataEncryptor;
    }
    createConsultingRepository() {
        return new ConsultingRepositoryMemory_1.ConsultingRepositoryMemory();
    }
    createActivityRepository() {
        return new ActivityRepositoryMemory_1.ActivityRepositoryMemory();
    }
    createUserRepository() {
        return new UserRepositoryMemory_1.UserRepositoryMemory(this.dataEncryptor);
    }
}
exports.default = RepositoryFactoryMemory;
