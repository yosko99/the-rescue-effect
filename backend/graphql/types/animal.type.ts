module.exports = `#graphql
    union AnimalResult = Animal | NotFoundError
    union DeleteAnimalResult =  SuccessfullRequest | NotFoundError

    scalar Date

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
        isAdopted: Boolean!
        description: String!
        category: AnimalTypes!
        imageURL: String!
        createdAt: Date!
        updatedAt: Date!
    }
    
    type Query {
        animals: [Animal]
        getAnimalsForAdoption: [Animal]
        getAnimal(id: String!): Animal
    }

    enum AnimalTypes {
        CAT
        DOG
    }
`;
