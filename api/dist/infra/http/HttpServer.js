"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = __importDefault(require("./Router"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
class HttpServer {
    static start(repositoryFactory, tokenGenerator) {
        const app = express_1.default();
        const port = 3333;
        app.use(express_1.default.json());
        app.use(cookie_parser_1.default());
        app.use(cors_1.default({
            preflightContinue: true,
            credentials: true,
            origin: '*',
        }));
        app.all('*', function (req, res, next) {
            res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        app.options("*", function (req, res) {
            res.end();
        });
        app.use((req, resp, next) => {
            console.log(`${req.method} > ${req.get('host') + req.originalUrl}`);
            next();
        });
        app.use(Router_1.default.build(repositoryFactory, tokenGenerator));
        app.listen(port, () => console.log(`Application is running at http://localhost:${port}`));
    }
}
exports.default = HttpServer;
