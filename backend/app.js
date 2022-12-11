const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const PORT = process.env.PORT !== undefined ? process.env.PORT : 3000;

app.use(express.static('public'));
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
      res
    };
  }
});

app.listen(PORT, async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });
  console.log(`app is listening to port ${PORT}`);
});
