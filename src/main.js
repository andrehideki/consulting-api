const HttpServer = require("./infra/webserver/HttpServer");
const RepositoryFactoryMemory = require("./adapter/factory/RepositoryFactoryMemory");

const repositoryFactoryMemory = new RepositoryFactoryMemory();
const server = new HttpServer(repositoryFactoryMemory);
server.start();