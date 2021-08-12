import RepositoryFactory from '@domain/factory/RepositoryFactory';
import Router from '@infra/http/Router';
import express from 'express';
import cors from "cors";

export default class HttpServer {

  static start(repositoryFactory: RepositoryFactory) {
    const app = express();
    const port = 3333;
    app.use(express.json());
    app.use(cors());
    app.use((req: express.Request, resp: express.Response, next: express.NextFunction) => {
      console.log(`${req.method} > ${req.get('host') + req.originalUrl}`);
      next();
    });
    app.use(Router.build(repositoryFactory));
    app.listen(port, () => console.log(`Application is running at http://localhost:${port}`));
  }
}