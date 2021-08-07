import { ConsultingController } from "src/adapter/controller/ConsultingController";


export class ConsultingRoute {
    private route = "/consulting";
    private app;
    private repositoryFactory;
    constructor(app, repositoryFactory) {
        this.app = app;
        this.repositoryFactory = repositoryFactory;
    }

    async configure() {
        this.app.get(`${this.route}`, async (req, res) => {
            try {
                const consultingController = new ConsultingController(this.repositoryFactory);
                let getConsultingOutput = await consultingController.getConsulting(req.query.email);
                console.log(getConsultingOutput)
                res.json(getConsultingOutput);
            } catch(error) {
                console.log(error);
                res.status(404);
                res.json([]);
            }
        });
    }
}