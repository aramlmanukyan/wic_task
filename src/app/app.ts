import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import express from 'express';

import errorHandler from './helpers/errorHandler';
import v1 from './routes/v1';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.setMiddlewares();
    this.mountRoutes();
    this.catchErrors();
  }

  private setMiddlewares(): void {
    this.express.use(cors());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(helmet());
  }

  private mountRoutes(): void {
    this.express.use('/v1', v1);
  }

  private catchErrors(): void {
    this.express.use(errorHandler.notFound);
    this.express.use(errorHandler.internalServerError);
  }
}

export default new App().express;
