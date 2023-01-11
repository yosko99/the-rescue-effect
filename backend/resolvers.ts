import { PrismaClient } from '@prisma/client';
const { mergeResolvers } = require('@graphql-tools/merge');

const animalResolvers = require('./graphql/resolvers/animal.resolvers');
const userResolvers = require('./graphql/resolvers/user.resolvers');

const resolvers = mergeResolvers([animalResolvers, userResolvers]);

export default resolvers;
