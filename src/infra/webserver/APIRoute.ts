import express from 'express';

export interface APIRoute {
  router: express.Router;
}