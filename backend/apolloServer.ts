import { ApolloServer } from 'apollo-server-express';

import resolvers from './resolvers';
import typeDefs from './typeDefs';

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

export default apolloServer;
