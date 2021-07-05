class GetConsulting {
    consultingRepository;

    constructor(repositoryFactory) {
        this.consultingRepository = repositoryFactory.createConsultingRepository();
    }

    async execute(emailAddress = "") {
        const consulting = await this.consultingRepository.getByEmail(emailAddress);
        return {
            name: consulting.name.value,
            email: consulting.email.value,
            birthDate: consulting.birthDate.toISOString().substring(0, 10)
        };
    }
}

module.exports = GetConsulting;