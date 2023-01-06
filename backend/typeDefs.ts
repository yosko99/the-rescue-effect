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
 
    union AnimaResult = Animal | NotFoundError
    union DeleteAnimalResult =  SuccessfullRequest | NotFoundError

    type Query {
        animals: [Animal!]
        getAnimal(id: Int!): AnimaResult
    }

    input CreateAnimalInput {
        title: String!
        price: String!
        description: String!
        category: String!
        image: String!
    }

    input UpdateAnimalInput {
        id: Int!
        title: String
        price: Float
        description: String
        category: String
        image: String
    }

    type Mutation {
        createAnimal(input: CreateAnimalInput!): Animal!
        updateAnimal(input: UpdateAnimalInput!): AnimaResult
        deleteAnimal(id: Int!): NotFoundError!
    }
`;

export default typeDefs;
