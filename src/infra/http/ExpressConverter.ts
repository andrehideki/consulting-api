import express from "express";

export default class ExpressConverter {
  
  static execute(fn: Function) {
    return async function(req: express.Request, resp: express.Response, next: express.NextFunction) {
      try {
        const result = await fn(req.query, req.body, req.headers);
        resp.json(result);
      } catch (e) {
        resp.status(422);
        resp.json({
          message: e.message
        });
      }
    }
  }
}