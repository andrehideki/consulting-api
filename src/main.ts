import * as database from "@infra/database/db.json";
import { RepositoryFactoryMemory } from '@adapter/factory/RepositoryFactoryMemory';
import { HttpServer } from '@infra/webserver/HttpServer';
import { DataEncriptorBcrypt } from "@infra/services/DataEncriptorBcrypt";

const server = new HttpServer(new RepositoryFactoryMemory(database, new DataEncriptorBcrypt()));
server.start();