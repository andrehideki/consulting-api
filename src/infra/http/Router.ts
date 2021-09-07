import RepositoryFactory from "@domain/factory/RepositoryFactory";
import TokenGenerator from "@domain/entity/TokenGenerator";
import { ConsultingController } from "@adapter/controller/ConsultingController";
import { UserController } from "@adapter/controller/UserController";
import SecurityController from "@adapter/controller/SecurityController";
import ExpressConverter from "@infra/http/ExpressConverter";

import express from "express";
import { AcvitivityController } from "@adapter/controller/ActivityController";

export default class Router {
  
  static build(repositoryFactory: RepositoryFactory, tokenGenerator: TokenGenerator): express.Router {
    const router = express.Router();
    const securityController = new SecurityController(repositoryFactory, tokenGenerator);
    const userController = new UserController(repositoryFactory, tokenGenerator);
    const consultingController = new ConsultingController(repositoryFactory);
    const activityController = new AcvitivityController(repositoryFactory);
    router.post("/token", ExpressConverter.execute(securityController.isTokenValid.bind(securityController)));
    router.post("/login", ExpressConverter.authenticate(userController.authenticateUser.bind(userController)));
    router.all("*", ExpressConverter.filter(securityController.isAuthenticated.bind(securityController)));
    // router.post("/user", ExpressConverter.execute(userController.authenticateUser.bind(userController)));
    router.get("/consulting", ExpressConverter.execute(consultingController.getConsulting.bind(consultingController)));
    router.post("/consulting", ExpressConverter.execute(consultingController.registerConsulting.bind(consultingController)));
    router.get("/consulting/:consultingId/activity", ExpressConverter.execute(activityController.getConsultingActivities.bind(activityController)));
    return router;
  }
}