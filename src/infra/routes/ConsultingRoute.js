const ConsultingController = require("../../adapter/controller/ConsultingController");

module.exports = class ConsultingRoute {
    route = "/consulting";
    
    constructor(app, repositoryFactory) {
        app.get(`${this.route}`, (req, res) => {
            try {
                const consultingController = new ConsultingController(repositoryFactory);
                let getConsultingOutput = consultingController.getConsulting(req.query.email);
                res.json(getConsultingOutput);
            } catch(error) {
                res.status(404);
                res.json([]);
            }
        });
    }
}