import * as bodyParser from 'body-parser';
import express from 'express';
import path from 'path';

import apolloServer from './apolloServer';

const app = express();

require('dotenv').config();

const PORT = process.env.PORT !== undefined ? process.env.PORT : 5000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.listen(PORT, async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });
  console.log(`app is listening to port ${PORT}`);
});
