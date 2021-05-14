import { Server } from 'http';
import app from './app';
import config from './config/config';
import db from './config/db';
import logger from './config/logger';

let server: Server;

const onSigterm = () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
};

const unexpectedErrorHandler = (error: any) => {
  logger.error(error);
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

(async () => {
  await db.connect();
  server = app.listen(config.port);

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);
  process.on('SIGTERM', onSigterm);
})();
