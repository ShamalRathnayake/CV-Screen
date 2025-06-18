import {
  createApp,
  connectDatabase,
  startServer,
  shutdownServer,
} from './server';
import { config } from './shared/config/env.config';

(async () => {
  await connectDatabase();
  const app = createApp();
  startServer(app, config.port);
})();

process.on('SIGINT', shutdownServer);
process.on('SIGTERM', shutdownServer);
