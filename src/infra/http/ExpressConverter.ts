import { AuthenticationError } from "@domain/error/AuthenticationError";
import express from "express";

export default class ExpressConverter {
  
  static execute(fn: Function) {
    return async function(req: express.Request, resp: express.Response, next: express.NextFunction) {
      try {
        const result = await fn(req.query, req.body, req.params, req.headers);
        resp.json(result);
        next();
      } catch (e) {
        if (e instanceof AuthenticationError) resp.status(401);
        else resp.status(422);
        resp.json({
          message: e.message
        });
      }
    }
  }

  static authenticate(fn: Function) {
    return async function(req: express.Request, resp: express.Response, next: express.NextFunction) {
      try {
        const result = await fn(req.query, req.body, req.headers);
        resp.cookie('auth', result.token);
        resp.send(result);
      } catch (e) {
        if (e instanceof AuthenticationError) resp.status(401);
        else resp.status(422);
        resp.json({
          message: e.message
        });
      }
    }
  }

  static filter(fn: Function) {
    return async function(req: express.Request, resp: express.Response, next: express.NextFunction) {
      try {
        await fn(req.query, req.body, req.headers, req.cookies);
        next();
      } catch (e) {
        resp.status(422);
        resp.json({
          message: e.message
        });
      }
    }
  }
}