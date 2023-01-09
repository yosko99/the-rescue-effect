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
        id: String!
        name: String
        age: Int
        description: String
        category: String
    }

    type Mutation {
        createAnimal(input: CreateAnimalInput!): Animal!
        updateAnimal(input: UpdateAnimalInput!): AnimalResult
        deleteAnimal(id: String!): DeleteAnimalResult
    }
    type Animal {
        id: String!
        name: String!
        age: Int!
        description: String!
        category: String!
        imageURL: String!
    }
    type Query {
        animals: [Animal!]
        getAnimal(id: String!): AnimalResult
    }
`;
