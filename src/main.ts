import { RepositoryFactoryMemory } from '@adapter/factory/RepositoryFactoryMemory';
import { HttpServer } from '@infra/webserver/Server';
import { DataEncriptorBcrypt } from "@infra/services/DataEncriptorBcrypt";
import { APIRoute } from '@infra/webserver/APIRoute';
import { UserRoute } from '@infra/routes/UserRoute';
import express from 'express';
import { ConsultingRoute } from '@infra/routes/ConsultingRoute';

const dataEncriptor = new DataEncriptorBcrypt();
const repositoryFactory = new RepositoryFactoryMemory(dataEncriptor);
const app = express();
const routes: APIRoute[] = [
  new UserRoute(app, repositoryFactory),
  new ConsultingRoute(app, repositoryFactory)
];
const server = new HttpServer(app, routes);

server.listen();