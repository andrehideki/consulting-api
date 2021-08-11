import { RepositoryFactory } from "@domain/factory/RepositoryFactory";
import { ConsultingRoute } from "../routes/ConsultingRoute";
import { UserRoute } from "../routes/UserRoute";
import express from 'express';

const bodyParser = require("body-parser");
const cors = require("cors");

export class HttpServer {
    repositoryFactory: RepositoryFactory;
    app: express.Application;
    port: number;
    

    constructor(repositoryFactory) {
        this.app = express();
        this.port = 3000;
        this.repositoryFactory = repositoryFactory;
    }

    async start() {
        this.configureRoutes();        
        this.configureMiddleWares();
        this.app.listen(this.port, () => console.log(`Application is running at http://localhost:${this.port}`));
    }

    private configureMiddleWares() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(cors());
    }

    async configureRoutes() {
        await new ConsultingRoute(this.app, this.repositoryFactory).configure();
        await new UserRoute(this.app, this.repositoryFactory).configure();
    }
}