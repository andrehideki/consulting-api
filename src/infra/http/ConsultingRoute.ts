import { APIRoute } from "@infra/http/APIRoute";
import { ConsultingController } from "src/adapter/controller/ConsultingController";
import RepositoryFactory from "@domain/factory/RepositoryFactory";
import express from 'express';
import { Request, Response } from "express";

export class ConsultingRoute implements APIRoute {

  private route = "/consulting";
  public router: express.Router;
  private repositoryFactory;

  constructor(repositoryFactory: RepositoryFactory) {
    this.router = express.Router();
    this.repositoryFactory = repositoryFactory;
  }

  configure() {
    this.router.get(`${this.route}`, async (req: Request, res: Response, next: any) => {
      try {
        const consultingController = new ConsultingController(this.repositoryFactory);
        let getConsultingOutput = await consultingController.getConsulting(req.query.email);
        res.json(getConsultingOutput);
      } catch (error) {
        next(error);
      }
    });
  }
}