import express from 'express';
import * as httpStatus from 'http-status';

class errorHandler {
  notFound(req: express.Request, res: express.Response) {
    res.status(httpStatus.NOT_FOUND);
    res.json({
      success: false,
      message: 'Requested Resource Not Found',
    });
    res.end();
  }

  internalServerError(err: any, req: express.Request, res: express.Response) {
    res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR);
    res.json({
      message: err.message,
      extra: err.extra,
      errors: err,
    });
    res.end();
  }
}

export default new errorHandler();
