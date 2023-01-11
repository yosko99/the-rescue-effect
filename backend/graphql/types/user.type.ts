module.exports = `#graphql
    type LoginResponse {
        message: String!
        token: String!
    }

    type CreateUserResponse {
        user: User!
        message: String!
        token: String!
    }

    input CreateUserInput {
        name: String!
        email: String!
        gender: Genders!
        password: String!
        animalPreferences: AnimalTypes!
    }

    input UpdateUserInput {
        id: String!
        name: String
        gender: Genders
        animalPreferences: AnimalTypes
    }

    input LoginInput {
        email: String!
        password: String!
    }

    type Mutation {
        createUser(input: CreateUserInput!): CreateUserResponse
        updateUser(input: UpdateUserInput!): User
        deleteUser(id: String!): SuccessfullRequest
        login(input: LoginInput!): LoginResponse
        adoptAnimal(animalID: String!): SuccessfullRequest
    }

    type User {
        id: String!
        name: String!
        email: String!
        gender: Genders!
        animalPreferences: AnimalTypes!
        imageURL: String!
        animals: [Animal]
    }
    
    type Query {
        users: [User]!
        getUser(id: String!): User
    }

    enum Genders {
        MALE
        FEMALE
    }
`;
