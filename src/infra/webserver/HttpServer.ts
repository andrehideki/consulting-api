import { RepositoryFactory } from "@domain/factory/RepositoryFactory";
import { ConsultingRoute } from "../routes/ConsultingRoute";

const express = require("express");

export class HttpServer {
    app: any;
    port: number;
    repositoryFactory: RepositoryFactory;

    constructor(repositoryFactory) {
        this.app = express();
        this.port = 3000;
        this.repositoryFactory = repositoryFactory;
    }

    start() {
        this.configureRoutes();        
        this.app.listen(this.port, () => console.log(`Application is running at http://localhost:${this.port}`));
    }

    configureRoutes() {
        new ConsultingRoute(this.app, this.repositoryFactory);
    }
}