module.exports = `#graphql
    union AnimalResult = Animal | NotFoundError
    union DeleteAnimalResult =  SuccessfullRequest | NotFoundError

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
    type Animal {
        id: Int!
        name: String!
        age: Int!
        description: String!
        category: String!
        imageURL: String!
    }
    type Query {
        animals: [Animal!]
        getAnimal(id: Int!): AnimalResult
    }
`;
