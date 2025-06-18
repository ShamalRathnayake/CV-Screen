import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { config } from './shared/config/env.config';
import { errorHandler } from './shared/middlewares/errorHandler';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import http from 'http';
import { commonConfig } from './shared/config/common.config';
import router from './shared/routes';
import { notFoundHandler } from './shared/middlewares/notFoundHandler';

let server: http.Server;

export function createApp(): Application {
  const app = express();

  app.use(helmet());

  app.use(cors());

  app.use(compression());

  app.use(
    rateLimit({
      windowMs: 15 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
    })
  );

  app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'));

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  app.use(commonConfig.apiPath, router);

  app.use(notFoundHandler);

  app.use(errorHandler);

  return app;
}

export async function connectDatabase() {
  try {
    await mongoose.connect(config.databaseUrl);
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
}

export function startServer(app: Application, port: number) {
  server = app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
}

export function shutdownServer() {
  if (server) {
    server.close(() => {
      console.log('🛑 HTTP server closed');
      mongoose.connection.close().then(() => {
        console.log('🛑 MongoDB connection closed');
        process.exit(0);
      });
    });
  }
}
