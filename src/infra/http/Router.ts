import RepositoryFactory from "@domain/factory/RepositoryFactory";
import { UserController } from "@adapter/controller/UserController";
import ExpressConverter from "@infra/http/ExpressConverter";

import express from "express";
import { ConsultingController } from "@adapter/controller/ConsultingController";
import SecurityController from "@adapter/controller/SecurityController";

export default class Router {
  
  static build(repositoryFactory: RepositoryFactory): express.Router {
    const router = express.Router();
    const securityController = new SecurityController(repositoryFactory);
    const userController = new UserController(repositoryFactory);
    const consultingController = new ConsultingController(repositoryFactory);
    // router.all("*", ExpressConverter.filter(securityController.isAuthenticated.bind(securityController)));
    router.post("/user", ExpressConverter.execute(userController.authenticateUser.bind(userController)));
    router.get("/consulting", ExpressConverter.execute(consultingController.getConsulting.bind(consultingController)));
    return router;
  }
}