import * as database from "@infra/database/db.json";
import { RepositoryFactoryJson } from '@adapter/factory/RepositoryFactoryJson';
import { HttpServer } from '@infra/webserver/HttpServer';

const server = new HttpServer(new RepositoryFactoryJson(database));
server.start();