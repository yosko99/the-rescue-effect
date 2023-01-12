import apolloServer from './apolloServer';
import app from './app';

require('dotenv').config();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });
});

export default server;
