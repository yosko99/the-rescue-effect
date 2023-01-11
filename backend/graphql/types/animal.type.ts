module.exports = `#graphql
    union AnimalResult = Animal | NotFoundError
    union DeleteAnimalResult =  SuccessfullRequest | NotFoundError

    input CreateAnimalInput {
        name: String!
        age: Int!
        description: String!
        category: AnimalTypes!
    }

    input UpdateAnimalInput {
        id: String!
        name: String
        age: Int
        description: String
        category: AnimalTypes
    }

    type Mutation {
        createAnimal(input: CreateAnimalInput!): Animal
        updateAnimal(input: UpdateAnimalInput!): Animal
        deleteAnimal(id: String!): SuccessfullRequest
    }
    type Animal {
        id: String!
        name: String!
        age: Int!
        description: String!
        category: AnimalTypes!
        imageURL: String!
    }
    type Query {
        animals: [Animal!]
        getAnimal(id: String!): Animal
    }

    enum AnimalTypes {
        CAT
        DOG
    }
`;
