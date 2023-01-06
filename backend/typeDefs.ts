const { mergeTypeDefs } = require('@graphql-tools/merge');

const animalType = require('./graphql/types/animal.type');
const errorsType = require('./graphql/types/errors.type');

const schemas = [animalType, errorsType];

const typeDefs = mergeTypeDefs(schemas);

export default typeDefs;
