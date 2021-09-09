"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcvitivityController = void 0;
const GetConsultingActivities_1 = require("../../domain/usecase/activity/GetConsultingActivities");
class AcvitivityController {
    constructor(repositoryFactory) {
        this.repositoryFactory = repositoryFactory;
    }
    async getConsultingActivities(query, body, params) {
        const { consultingId } = params;
        const { month, year } = query;
        const getConsultingActivities = new GetConsultingActivities_1.GetConsultingActivities(this.repositoryFactory);
        let activites = await getConsultingActivities.execute({
            consultingId: parseInt(consultingId),
            month: parseInt(month),
            year: parseInt(year)
        });
        return activites;
    }
}
exports.AcvitivityController = AcvitivityController;
