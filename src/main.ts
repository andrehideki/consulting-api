import RepositoryFactoryMemory  from '@adapter/factory/RepositoryFactoryMemory';
import DataEncriptor from '@domain/entity/DataEncriptor';
import TokenGenerator from '@domain/entity/TokenGenerator';
import RepositoryFactory from '@domain/factory/RepositoryFactory';
import HttpServer from '@infra/http/HttpServer';
import DataEncriptorBcrypt from "@infra/services/DataEncriptorBcrypt";
import TokenGeneratorJWT from '@infra/services/TokenGeneratorJWT';

const dataEncriptor: DataEncriptor = new DataEncriptorBcrypt();
const tokenGenerator: TokenGenerator = new TokenGeneratorJWT("CONSULTING_API_KEY", "1h");
const repositoryFactory: RepositoryFactory = new RepositoryFactoryMemory(dataEncriptor);

HttpServer.start(repositoryFactory, tokenGenerator);