const typeDefs = `#graphql
    type Book {
        title: String
        author: String
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
 
    union BookResult = Book | NotFoundError

    type Query {
        books: [Book]
        getBook(title: String!): BookResult
    }
`;

module.exports = typeDefs;
