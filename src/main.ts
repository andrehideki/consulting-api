import * as database from "@infra/database/db.json";
import { RepositoryFactoryJson } from '@adapter/factory/RepositoryFactoryJson';
import { HttpServer } from '@infra/webserver/HttpServer';
import { DataEncriptorBcrypt } from "@infra/services/DataEncriptorBcrypt";

const server = new HttpServer(new RepositoryFactoryJson(database, new DataEncriptorBcrypt()));
server.start();