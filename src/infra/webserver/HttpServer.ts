import { RepositoryFactory } from "@domain/factory/RepositoryFactory";
import { ConsultingRoute } from "../routes/ConsultingRoute";
import { UserRoute } from "../routes/UserRoute";

const express = require("express");
const bodyParser = require("body-parser");

export class HttpServer {
    app: any;
    port: number;
    repositoryFactory: RepositoryFactory;

    constructor(repositoryFactory) {
        this.app = express();
        this.port = 3000;
        this.repositoryFactory = repositoryFactory;
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    }

    async start() {
        this.configureRoutes();        
        this.app.listen(this.port, () => console.log(`Application is running at http://localhost:${this.port}`));

    }

    async configureRoutes() {
        await new ConsultingRoute(this.app, this.repositoryFactory).configure();
        await new UserRoute(this.app, this.repositoryFactory).configure();
    }
}