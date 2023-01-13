import { IncomingMessage, Server, ServerResponse } from 'http';

import apolloServer from './apolloServer';
import app from './app';

require('dotenv').config();

const PORT = process.env.PORT || 5000;

let server: Server<typeof IncomingMessage, typeof ServerResponse>;

const initServer = (port: number) => {
  server = app.listen(port, async () => {
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path: '/graphql' });
  });

  return server;
};

if (process.env.NODE_ENV === 'test') {
  server = initServer(5001);
} else {
  server = initServer(PORT === undefined ? PORT : 5000);
}

export default server;
