import * as database from "@database/db.json";
import { RepositoryFactoryJson } from "@factoryImpl/RepositoryFactoryJson";
import { HttpServer } from "./infra/webserver/HttpServer";

const server = new HttpServer(new RepositoryFactoryJson(database));
server.start();