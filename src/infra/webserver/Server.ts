import { RepositoryFactory } from "@domain/factory/RepositoryFactory";
import { ConsultingRoute } from "../routes/ConsultingRoute";
import { UserRoute } from "../routes/UserRoute";
import express from 'express';
import cors from "cors";
import { APIRoute } from "./APIRoute";


export class HttpServer {
  private app: express.Application;
  private port: number;


  constructor(app: express.Application, routes: APIRoute[]) {
    this.app = app;
    this.port = 3000;
    this.configureMiddleWares();
    this.configureRoutes(routes);
  }

  public listen() {
    this.app.listen(this.port, () => console.log(`Application is running at http://localhost:${this.port}`));
  }

  private configureMiddleWares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(function(req, resp, next) {
      console.log(`${req.method} > ${req.get('host') + req.originalUrl}`);
      next();
    });
  }

  private configureRoutes(routes: APIRoute[]) {
    routes.forEach(route => this.app.use("/", route.router));
  }
}