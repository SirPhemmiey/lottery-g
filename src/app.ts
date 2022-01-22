import express, { Request, Response, NextFunction } from 'express';
import Logger from './core/Logger';
import bodyParser from 'body-parser';
import { NotFoundError, ApiError, InternalError } from './core/ApiError';
import { ticketRoute } from './routes/v1/ticket/resource';
import { getEnv } from './env';
import Boom from 'boom';
import { ResponseFormat } from './core/ResponseFormat';
import morgan from 'morgan';
import { getRedisClient } from './redis';
const response = new ResponseFormat();


process.on('uncaughtException', (e) => {
  console.error(e.message);
  Logger.error(e.message);
});

const app = express();

app.set("port", process.env.PORT || 3001);

//this is more like a health check endpoint
app.get("/api/v1/health", (req, res) => {
  const connected = getRedisClient().connected;
  if (connected) {
    res.json({ status: "up", database: "up" });
  }
  res.json({ status: "down", database: "down" });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("tiny"));

// Routes
app.use('/api/v1/ticket', ticketRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

// Middleware Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
  } else {
    if (getEnv().NODE_ENV === 'development') {
      Logger.error(err.message);
      console.error(err.message);
      const { output } = Boom.badRequest(err.message);
      return response.handleError(res, output);
      //return res.status(500).send(err.message);
    }
    ApiError.handle(new InternalError(), res);
  }
});

export default app;