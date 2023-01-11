const { mergeTypeDefs } = require('@graphql-tools/merge');

const animalType = require('./graphql/types/animal.type');
const errorsType = require('./graphql/types/errors.type');
const userType = require('./graphql/types/user.type');

const schemas = [animalType, errorsType, userType];

const typeDefs = mergeTypeDefs(schemas);

export default typeDefs;
