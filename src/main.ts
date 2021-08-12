import RepositoryFactoryMemory  from '@adapter/factory/RepositoryFactoryMemory';
import HttpServer from '@infra/http/HttpServer';
import DataEncriptorBcrypt from "@infra/services/DataEncriptorBcrypt";

const dataEncriptor = new DataEncriptorBcrypt();
const repositoryFactory = new RepositoryFactoryMemory(dataEncriptor);

HttpServer.start(repositoryFactory);