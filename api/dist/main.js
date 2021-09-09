"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RepositoryFactoryMemory_1 = __importDefault(require("./adapter/factory/RepositoryFactoryMemory"));
const HttpServer_1 = __importDefault(require("./infra/http/HttpServer"));
const DataEncriptorBcrypt_1 = __importDefault(require("./infra/services/DataEncriptorBcrypt"));
const TokenGeneratorJWT_1 = __importDefault(require("./infra/services/TokenGeneratorJWT"));
const dataEncriptor = new DataEncriptorBcrypt_1.default();
const tokenGenerator = new TokenGeneratorJWT_1.default("CONSULTING_API_KEY", "1h");
const repositoryFactory = new RepositoryFactoryMemory_1.default(dataEncriptor);
HttpServer_1.default.start(repositoryFactory, tokenGenerator);
