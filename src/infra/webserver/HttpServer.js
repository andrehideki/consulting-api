const express = require("express");
const ConsultingRoute = require("../routes/ConsultingRoute");

module.exports = class HttpServer {
    app;
    port;
    repositoryFactory;

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