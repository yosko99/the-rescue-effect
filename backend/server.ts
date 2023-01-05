import { ApolloServer } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import express from 'express';
import path from 'path';

import resolvers from './resolvers';
import typeDefs from './typeDefs';

const app = express();

require('dotenv').config();

const PORT = process.env.PORT !== undefined ? process.env.PORT : 5000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

const apolloServer = new ApolloServer({
  introspection: true,
  typeDefs,
  resolvers,
  formatError: (error) => {
    return error;
  },
  context: ({ req, res }) => {
    return {
      req,
      res,
    };
  },
});

app.listen(PORT, async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });
  console.log(`app is listening to port ${PORT}`);
});
