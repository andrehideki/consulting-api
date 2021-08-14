import RepositoryFactory from '@domain/factory/RepositoryFactory';
import Router from '@infra/http/Router';
import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import TokenGenerator from '@domain/entity/TokenGenerator';

export default class HttpServer {

  static start(repositoryFactory: RepositoryFactory, tokenGenerator: TokenGenerator) {
    const app = express();
    const port = 3333;
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors());
    app.use((req: express.Request, resp: express.Response, next: express.NextFunction) => {
      console.log(`${req.method} > ${req.get('host') + req.originalUrl}`);
      next();
    });
    app.use(Router.build(repositoryFactory, tokenGenerator));
    app.listen(port, () => console.log(`Application is running at http://localhost:${port}`));
  }
}