import { RepositoryFactory } from "@domain/factory/RepositoryFactory";
import { UserController } from "@adapter/controller/UserController";
import express from 'express';
import { APIRoute } from "@infra/webserver/APIRoute";

export class UserRoute implements APIRoute {

  private route = "/user";
  private repositoryFactory: RepositoryFactory;

  public router: express.Router;

  constructor(app: express.Application, repositoryFactory) {
    this.router = express.Router();
    this.repositoryFactory = repositoryFactory;
    this.configure();
  }

  configure() {
    this.router.post(`${this.route}`, async (req, res) => {
      try {
        const userController = new UserController(this.repositoryFactory);
        const { email, password } = req.body;
        let authenticateUserOutput = await userController.authenticateUser({
          email,
          password
        });
        res.json(authenticateUserOutput);
      } catch (error) {
        console.log(error)
        res.status(403);
        res.json(error.toString());
      }
    });
  }
}