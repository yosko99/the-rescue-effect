const typeDefs = `#graphql
    type Animal {
        id: Int!
        name: String!
        age: Int!
        description: String!
        category: String!
        imageURL: String!
    }

    interface BaseError {
        message: String!
    }

    type InvalidInputError implements BaseError {
        message: String!
    }
    
    type NotFoundError implements BaseError {
        message: String!
    }
    
    type UnknownError implements BaseError {
        message: String!
    }
    
    type NotAllowedError implements BaseError {
        message: String!
    }

    type SuccessfullRequest {
        message: String!
    }
 
    union AnimalResult = Animal | NotFoundError
    union DeleteAnimalResult =  SuccessfullRequest | NotFoundError

    type Query {
        animals: [Animal!]
        getAnimal(id: Int!): AnimalResult
    }

    input CreateAnimalInput {
        name: String!
        age: Int!
        description: String!
        category: String!
    }

    input UpdateAnimalInput {
        id: Int!
        name: String
        age: Int
        description: String
        category: String
    }

    type Mutation {
        createAnimal(input: CreateAnimalInput!): Animal!
        updateAnimal(input: UpdateAnimalInput!): AnimalResult
        deleteAnimal(id: Int!): DeleteAnimalResult
    }
`;

export default typeDefs;
