import createError from 'http-errors';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { createConnection, getRepository } from 'typeorm';
import { TypeormStore } from 'typeorm-store';

import config from '../config/config';
import { AppRoutes } from './routes';
import errorHandler from './middlewares/errorHandler';
import { reconnect } from './utils/reconnect';
import { Session } from './entities/Session';

const app = express();

createConnection()
  .catch(async (error) => {
    console.error(error);
    await reconnect();
  })
  .then(() => {
    const repository = getRepository(Session);

    app.use(
      cors({
        origin: config.frontDomain,
        credentials: true,
        exposedHeaders: ['Content-Range']
      })
    );
    app.use(logger('dev'));
    app.use(express.json({ limit: '10mb', extended: true }));
    app.use(express.urlencoded({ limit: '10mb', extended: true }));
    app.use(cookieParser());
    app.use(
      session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        store: new TypeormStore({ repository })
      })
    );

    AppRoutes.forEach((route) => {
      app[route.method](route.path, (req, res, next) => {
        route
          .action(req, res)
          .then(() => next)
          .catch((err) => next(err));
      });
    });

    app.use(function(req, res, next) {
      next(createError(404));
    });
    app.use(errorHandler);

    app.listen({ port: config.port }, () => {
      console.log(`App listening on port ${config.port}!`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(-1);
  });
