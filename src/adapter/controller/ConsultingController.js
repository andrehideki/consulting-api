const GetConsulting = require("../../domain/usecase/GetConsulting");

module.exports = class ConsultingController {
    repositoryFactory;

    constructor(repositoryFactory) {
        this.repositoryFactory = repositoryFactory;
    }

    getConsulting(emailAddress) {
        const getConsulting = new GetConsulting(this.repositoryFactory);
        let consulting = getConsulting.execute(emailAddress);
        return consulting;
    }
}