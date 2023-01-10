module.exports = `#graphql
    union GetPersonResult = Person | NotFoundError
    union CreatePersonResult = Person | NotAllowedError
    union DeletePersonResult =  SuccessfullRequest | NotFoundError

    input CreatePersonInput {
        name: String!
        email: String!
        gender: Genders!
        animalPreferences: AnimalTypes!
    }

    input UpdatePersonInput {
        id: String!
        name: String
        gender: Genders
        animalPreferences: AnimalTypes
    }

    type Mutation {
        createPerson(input: CreatePersonInput!): CreatePersonResult
        updatePerson(input: UpdatePersonInput!): GetPersonResult
        deletePerson(id: String!): DeletePersonResult
    }

    type Person {
        id: String!
        name: String!
        email: String!
        gender: Genders!
        animalPreferences: AnimalTypes!
        imageURL: String!
        animals: [Animal]
    }
    
    type Query {
        persons: [Person]!
        getPerson(id: String!): GetPersonResult
    }

    enum Genders {
        MALE
        FEMALE
    }
`;
