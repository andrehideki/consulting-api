"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConsultingController_1 = require("../../adapter/controller/ConsultingController");
const UserController_1 = require("../../adapter/controller/UserController");
const SecurityController_1 = __importDefault(require("../../adapter/controller/SecurityController"));
const ExpressConverter_1 = __importDefault(require("./ExpressConverter"));
const express_1 = __importDefault(require("express"));
const ActivityController_1 = require("../../adapter/controller/ActivityController");
class Router {
    static build(repositoryFactory, tokenGenerator) {
        const router = express_1.default.Router();
        const securityController = new SecurityController_1.default(repositoryFactory, tokenGenerator);
        const userController = new UserController_1.UserController(repositoryFactory, tokenGenerator);
        const consultingController = new ConsultingController_1.ConsultingController(repositoryFactory);
        const activityController = new ActivityController_1.AcvitivityController(repositoryFactory);
        router.post("/token", ExpressConverter_1.default.execute(securityController.isTokenValid.bind(securityController)));
        router.post("/login", ExpressConverter_1.default.authenticate(userController.authenticateUser.bind(userController)));
        router.all("*", ExpressConverter_1.default.filter(securityController.isAuthenticated.bind(securityController)));
        router.get("/consulting", ExpressConverter_1.default.execute(consultingController.getConsulting.bind(consultingController)));
        router.get("/consulting/:consultingId/activity", ExpressConverter_1.default.execute(activityController.getConsultingActivities.bind(activityController)));
        return router;
    }
}
exports.default = Router;
