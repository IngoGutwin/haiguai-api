import 'dotenv/config';
import { createServer, Server } from 'http';
import app from './app';
const { APP_PORT } = process.env as NodeJS.ProcessEnv;

const server: Server = createServer(app);

function stopServer(): void {
  server.close();
}

function startServer(): void {
  server.listen(APP_PORT, () => {
    console.log(`server is listening on port: ${APP_PORT}...`);
  });
}

startServer();

export { startServer, stopServer };
