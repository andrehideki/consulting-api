"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultingController = void 0;
const GetConsulting_1 = require("../../domain/usecase/consulting/GetConsulting");
class ConsultingController {
    constructor(repositoryFactory) {
        this.repositoryFactory = repositoryFactory;
    }
    async getConsulting(params) {
        const getConsulting = new GetConsulting_1.GetConsulting(this.repositoryFactory);
        let consulting = await getConsulting.execute({ email: params.email });
        return consulting;
    }
}
exports.ConsultingController = ConsultingController;
