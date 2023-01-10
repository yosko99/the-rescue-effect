import { PrismaClient } from '@prisma/client';
const { mergeResolvers } = require('@graphql-tools/merge');

const animalResolvers = require('./graphql/resolvers/animal.resolvers');
const personResolvers = require('./graphql/resolvers/person.resolvers');

const resolvers = mergeResolvers([animalResolvers, personResolvers]);

export default resolvers;
