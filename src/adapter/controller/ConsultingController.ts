import { GetConsulting } from "@domain/usecase/GetConsulting";

export class ConsultingController {
    repositoryFactory;

    constructor(repositoryFactory) {
        this.repositoryFactory = repositoryFactory;
    }

    async getConsulting(emailAddress) {
        const getConsulting = new GetConsulting(this.repositoryFactory);
        let consulting = await getConsulting.execute(emailAddress);
        return consulting;
    }
}