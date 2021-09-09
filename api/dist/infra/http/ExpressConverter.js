"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticationError_1 = require("../../domain/error/AuthenticationError");
class ExpressConverter {
    static execute(fn) {
        return async function (req, resp, next) {
            try {
                const result = await fn(req.query, req.body, req.params, req.headers);
                resp.json(result);
                next();
            }
            catch (e) {
                console.error(e);
                if (e instanceof AuthenticationError_1.AuthenticationError)
                    resp.status(401);
                else
                    resp.status(422);
                resp.json({
                    message: e.message
                });
            }
        };
    }
    static authenticate(fn) {
        return async function (req, resp, next) {
            try {
                const result = await fn(req.query, req.body, req.headers);
                resp.cookie('auth', result.token);
                resp.send(result);
            }
            catch (e) {
                if (e instanceof AuthenticationError_1.AuthenticationError)
                    resp.status(401);
                else
                    resp.status(422);
                resp.json({
                    message: e.message
                });
            }
        };
    }
    static filter(fn) {
        return async function (req, resp, next) {
            try {
                await fn(req.query, req.body, req.headers, req.cookies);
                next();
            }
            catch (e) {
                resp.status(422);
                resp.json({
                    message: e.message
                });
            }
        };
    }
}
exports.default = ExpressConverter;
